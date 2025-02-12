
import { Trophy, Target, Clock, Brain } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { DynamicMilestone, AdaptiveMilestone } from '@/types/milestones';
import { cn } from "@/lib/utils";

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

  const progress = (milestone.current_value / milestone.target_value) * 100;
  const isCompleted = progress >= 100;

  return (
    <div className={cn(
      "space-y-2 p-3 rounded-lg transition-all duration-300",
      isCompleted ? "bg-green-50 dark:bg-green-950/20" : "hover:bg-slate-50 dark:hover:bg-slate-800/50"
    )}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={cn(
            "p-1.5 rounded-full transition-colors",
            isCompleted ? "bg-green-100 dark:bg-green-900/30" : "bg-slate-100 dark:bg-slate-800"
          )}>
            {getMilestoneIcon(milestone.milestone_type)}
          </div>
          <span className="text-sm font-medium">
            {getMilestoneTitle(milestone.milestone_type)}
          </span>
        </div>
        <div className="flex flex-col items-end">
          <span className={cn(
            "text-sm transition-colors",
            isCompleted ? "text-green-600 dark:text-green-400" : "text-muted-foreground"
          )}>
            {milestone.current_value}/{milestone.target_value}
            {milestone.milestone_type === 'study_time' ? ' min' : '%'}
          </span>
          {getAdaptiveInfo() && (
            <span className="text-xs text-green-500 font-medium animate-in fade-in slide-in-from-bottom-1">
              {getAdaptiveInfo()}
            </span>
          )}
        </div>
      </div>
      <Progress 
        value={progress} 
        className={cn(
          "h-2 transition-all duration-500",
          isCompleted && "bg-green-100 dark:bg-green-900/30"
        )}
      />
      {isCompleted && (
        <div className="text-xs text-green-600 dark:text-green-400 font-medium animate-in fade-in slide-in-from-bottom-1">
          Meilenstein erreicht! 🎉
        </div>
      )}
    </div>
  );
}
