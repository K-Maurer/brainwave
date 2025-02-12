
export interface DynamicMilestone {
  id: string;
  milestone_type: string;
  target_value: number;
  current_value: number;
  completed: boolean;
}

export interface AdaptiveMilestone {
  current_target: number;
  adjustment_factor: number;
}
