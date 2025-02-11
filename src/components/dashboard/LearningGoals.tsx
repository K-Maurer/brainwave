
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/providers/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle2, Circle, Clock } from "lucide-react";

interface LearningGoal {
  id: string;
  title: string;
  target_date: string;
  status: string;
  priority: number;
}

export function LearningGoals() {
  const { user } = useAuth();

  const { data: goals } = useQuery({
    queryKey: ["learning-goals", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("learning_goals")
        .select("*")
        .eq("user_id", user?.id)
        .eq("status", "active")
        .order("priority", { ascending: false });

      if (error) throw error;
      return data as LearningGoal[];
    },
    enabled: !!user,
  });

  if (!goals || goals.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Aktuelle Lernziele</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {goals.map((goal) => (
            <div
              key={goal.id}
              className="flex items-center gap-4 rounded-lg border p-4"
            >
              {goal.status === "completed" ? (
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              ) : (
                <Circle className="h-5 w-5 text-orange-500" />
              )}
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">{goal.title}</p>
                {goal.target_date && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-1 h-4 w-4" />
                    {new Date(goal.target_date).toLocaleDateString()}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
