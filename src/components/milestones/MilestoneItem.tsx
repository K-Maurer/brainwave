
import { Trophy, Target, Clock, Brain } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { DynamicMilestone, AdaptiveMilestone } from '@/types/milestones';

interface MilestoneItemProps {
  milestone: DynamicMilestone;
  adaptiveGoal?: AdaptiveMilestone;
}

export function MilestoneItem({ milestone, adaptiveGoal }: MilestoneItemProps) {
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

  const getAdaptiveInfo = () => {
    if (!adaptiveGoal) return null;
    const improvement = ((adaptiveGoal.current_target - milestone.target_value) / milestone.target_value * 100).toFixed(0);
    return `+${improvement}% Verbesserung`;
  };

  return (
    <div className="space-y-2">
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
          {getAdaptiveInfo() && (
            <span className="text-xs text-green-500 font-medium">
              {getAdaptiveInfo()}
            </span>
          )}
        </div>
      </div>
      <Progress 
        value={(milestone.current_value / milestone.target_value) * 100} 
        className="h-2"
      />
    </div>
  );
}
