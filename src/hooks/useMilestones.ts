
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { DynamicMilestone, AdaptiveMilestone } from '@/types/milestones';

export function useMilestones(documentId: string, userId: string) {
  const [milestones, setMilestones] = useState<DynamicMilestone[]>([]);
  const [adaptiveGoals, setAdaptiveGoals] = useState<Record<string, AdaptiveMilestone>>({});

  useEffect(() => {
    const fetchMilestones = async () => {
      const { data, error } = await supabase
        .from('dynamic_learning_milestones')
        .select('*')
        .eq('document_id', documentId)
        .eq('user_id', userId);

      if (error) {
        console.error('Error fetching milestones:', error);
        return;
      }

      const { data: adaptiveData, error: adaptiveError } = await supabase
        .from('adaptive_learning_goals')
        .select('goal_type, current_target, adjustment_factor')
        .eq('document_id', documentId)
        .eq('user_id', userId);

      if (adaptiveError) {
        console.error('Error fetching adaptive goals:', adaptiveError);
      } else if (adaptiveData) {
        const goalsMap = adaptiveData.reduce((acc, goal) => ({
          ...acc,
          [goal.goal_type]: {
            current_target: goal.current_target,
            adjustment_factor: goal.adjustment_factor
          }
        }), {});
        setAdaptiveGoals(goalsMap);
      }

      if (data && data.length === 0) {
        const defaultMilestones = [
          { milestone_type: 'study_time', target_value: 30, current_value: 0 },
          { milestone_type: 'comprehension', target_value: 80, current_value: 0 },
          { milestone_type: 'focus_score', target_value: 90, current_value: 0 },
        ];

        for (const milestone of defaultMilestones) {
          const { error: insertError } = await supabase
            .from('dynamic_learning_milestones')
            .insert({
              document_id: documentId,
              user_id: userId,
              ...milestone
            });

          if (insertError) console.error('Error creating milestone:', insertError);
        }

        const { data: newData } = await supabase
          .from('dynamic_learning_milestones')
          .select('*')
          .eq('document_id', documentId)
          .eq('user_id', userId);

        if (newData) setMilestones(newData);
      } else if (data) {
        setMilestones(data);
      }
    };

    fetchMilestones();

    const milestonesSubscription = supabase
      .channel('dynamic_learning_milestones_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'dynamic_learning_milestones',
          filter: `document_id=eq.${documentId}`,
        },
        () => fetchMilestones()
      )
      .subscribe();

    const adaptiveGoalsSubscription = supabase
      .channel('adaptive_learning_goals_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'adaptive_learning_goals',
          filter: `document_id=eq.${documentId}`,
        },
        () => fetchMilestones()
      )
      .subscribe();

    return () => {
      milestonesSubscription.unsubscribe();
      adaptiveGoalsSubscription.unsubscribe();
    };
  }, [documentId, userId]);

  return { milestones, adaptiveGoals };
}
