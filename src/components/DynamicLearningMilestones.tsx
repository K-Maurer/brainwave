
import { useEffect, useState } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { supabase } from "@/integrations/supabase/client";
import { Trophy, Target, Clock, Brain } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import confetti from 'canvas-confetti';
import { toast } from '@/components/ui/use-toast';

interface DynamicMilestone {
  id: string;
  milestone_type: string;
  target_value: number;
  current_value: number;
  completed: boolean;
}

interface AdaptiveMilestone {
  current_target: number;
  adjustment_factor: number;
}

interface DynamicLearningMilestonesProps {
  documentId: string;
}

export function DynamicLearningMilestones({ documentId }: DynamicLearningMilestonesProps) {
  const { user } = useAuth();
  const [milestones, setMilestones] = useState<DynamicMilestone[]>([]);
  const [adaptiveGoals, setAdaptiveGoals] = useState<Record<string, AdaptiveMilestone>>({});

  useEffect(() => {
    if (!user) return;

    const fetchMilestones = async () => {
      // Hole normale Meilensteine
      const { data, error } = await supabase
        .from('dynamic_learning_milestones')
        .select('*')
        .eq('document_id', documentId)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error fetching milestones:', error);
        return;
      }

      // Hole adaptive Ziele
      const { data: adaptiveData, error: adaptiveError } = await supabase
        .from('adaptive_learning_goals')
        .select('goal_type, current_target, adjustment_factor')
        .eq('document_id', documentId)
        .eq('user_id', user.id);

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
        // Erstelle Standard-Meilensteine, wenn keine existieren
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
              user_id: user.id,
              ...milestone
            });

          if (insertError) console.error('Error creating milestone:', insertError);
        }

        // Lade die neu erstellten Meilensteine
        const { data: newData } = await supabase
          .from('dynamic_learning_milestones')
          .select('*')
          .eq('document_id', documentId)
          .eq('user_id', user.id);

        if (newData) setMilestones(newData);
      } else if (data) {
        setMilestones(data);
      }
    };

    fetchMilestones();

    // Echtzeit-Updates für Meilensteine
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
        (payload) => {
          console.log('Milestone changed:', payload);
          fetchMilestones();
        }
      )
      .subscribe();

    // Echtzeit-Updates für adaptive Ziele
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
        (payload) => {
          console.log('Adaptive goal changed:', payload);
          fetchMilestones();
        }
      )
      .subscribe();

    return () => {
      milestonesSubscription.unsubscribe();
      adaptiveGoalsSubscription.unsubscribe();
    };
  }, [documentId, user]);

  const getMilestoneIcon = (type: string) => {
    switch (type) {
      case 'study_time':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'comprehension':
        return <Brain className="h-4 w-4 text-purple-500" />;
      case 'focus_score':
        return <Target className="h-4 w-4 text-green-500" />;
      default:
        return <Trophy className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getMilestoneTitle = (type: string) => {
    switch (type) {
      case 'study_time':
        return 'Lernzeit';
      case 'comprehension':
        return 'Verständnis';
      case 'focus_score':
        return 'Fokus Score';
      default:
        return type;
    }
  };

  const getAdaptiveInfo = (milestone: DynamicMilestone) => {
    const adaptiveGoal = adaptiveGoals[milestone.milestone_type];
    if (!adaptiveGoal) return null;

    const improvement = ((adaptiveGoal.current_target - milestone.target_value) / milestone.target_value * 100).toFixed(0);
    return `+${improvement}% Verbesserung`;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          Lernmeilensteine
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {milestones.map((milestone) => (
          <div key={milestone.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getMilestoneIcon(milestone.milestone_type)}
                <span className="text-sm font-medium">
                  {getMilestoneTitle(milestone.milestone_type)}
                </span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-sm text-muted-foreground">
                  {milestone.current_value}/{milestone.target_value}
                  {milestone.milestone_type === 'study_time' ? ' min' : '%'}
                </span>
                {getAdaptiveInfo(milestone) && (
                  <span className="text-xs text-green-500 font-medium">
                    {getAdaptiveInfo(milestone)}
                  </span>
                )}
              </div>
            </div>
            <Progress 
              value={(milestone.current_value / milestone.target_value) * 100} 
              className="h-2"
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
