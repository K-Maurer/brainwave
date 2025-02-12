
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
