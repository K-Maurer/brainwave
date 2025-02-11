
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

interface DynamicLearningMilestonesProps {
  documentId: string;
}

export function DynamicLearningMilestones({ documentId }: DynamicLearningMilestonesProps) {
  const { user } = useAuth();
  const [milestones, setMilestones] = useState<DynamicMilestone[]>([]);

  useEffect(() => {
    if (!user) return;

    const fetchMilestones = async () => {
      const { data, error } = await supabase
        .from('dynamic_learning_milestones')
        .select('*')
        .eq('document_id', documentId)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error fetching milestones:', error);
        return;
      }

      if (data && data.length === 0) {
        // Erstelle Standard-Meilensteine, wenn keine existieren
        const defaultMilestones = [
          { milestone_type: 'study_time', target_value: 30, current_value: 0 }, // 30 Minuten Lernzeit
          { milestone_type: 'comprehension', target_value: 80, current_value: 0 }, // 80% Verständnis
          { milestone_type: 'focus_score', target_value: 90, current_value: 0 }, // 90% Fokus
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
              <span className="text-sm text-muted-foreground">
                {milestone.current_value}/{milestone.target_value}
                {milestone.milestone_type === 'study_time' ? ' min' : '%'}
              </span>
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
