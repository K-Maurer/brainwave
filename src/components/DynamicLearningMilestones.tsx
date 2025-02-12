
import { useAuth } from '@/providers/AuthProvider';
import { Trophy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MilestoneItem } from './milestones/MilestoneItem';
import { useMilestones } from '@/hooks/useMilestones';

interface DynamicLearningMilestonesProps {
  documentId: string;
}

export function DynamicLearningMilestones({ documentId }: DynamicLearningMilestonesProps) {
  const { user } = useAuth();
  const { milestones, adaptiveGoals } = useMilestones(documentId, user?.id || '');

  const completedMilestones = milestones.filter(
    m => (m.current_value / m.target_value) * 100 >= 100
  ).length;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          <div className="flex flex-col">
            <span>Lernmeilensteine</span>
            {milestones.length > 0 && (
              <span className="text-sm font-normal text-muted-foreground">
                {completedMilestones} von {milestones.length} erreicht
              </span>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {milestones.map((milestone) => (
          <MilestoneItem
            key={milestone.id}
            milestone={milestone}
            adaptiveGoal={adaptiveGoals[milestone.milestone_type]}
          />
        ))}
      </CardContent>
    </Card>
  );
}
