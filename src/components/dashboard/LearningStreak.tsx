
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/providers/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { Flame, Medal, Trophy, Star } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface LearningStreak {
  current_streak: number;
  longest_streak: number;
  motivation_score: number;
  daily_goal_completed: boolean;
}

export function LearningStreak() {
  const { user } = useAuth();

  const { data: streak } = useQuery({
    queryKey: ["learning-streak", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("learning_streaks")
        .select("*")
        .eq("user_id", user?.id)
        .maybeSingle();

      if (error) throw error;
      
      // Wenn noch kein Streak existiert, erstellen wir einen
      if (!data) {
        const { data: newStreak, error: insertError } = await supabase
          .from("learning_streaks")
          .insert([{ user_id: user?.id }])
          .select()
          .single();

        if (insertError) throw insertError;
        return newStreak as LearningStreak;
      }

      return data as LearningStreak;
    },
    enabled: !!user,
  });

  if (!streak) return null;

  return (
    <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Flame className="h-5 w-5 text-orange-500" />
          Lernstreak
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-blue-500/10">
            <div className="flex items-center gap-2 text-2xl font-bold">
              {streak.current_streak}
              <Flame className="h-6 w-6 text-orange-500" />
            </div>
            <p className="text-sm text-muted-foreground">Aktuelle Serie</p>
          </div>
          <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-purple-500/10">
            <div className="flex items-center gap-2 text-2xl font-bold">
              {streak.longest_streak}
              <Trophy className="h-6 w-6 text-yellow-500" />
            </div>
            <p className="text-sm text-muted-foreground">Längste Serie</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium">Motivation</span>
            </div>
            <span className="text-sm font-medium">{streak.motivation_score}%</span>
          </div>
          <Progress value={streak.motivation_score} className="h-2" />
        </div>

        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="flex items-center gap-2">
            <Medal className={streak.daily_goal_completed ? "text-green-500" : "text-gray-400"} />
            <span className="text-sm font-medium">Tagesziel</span>
          </div>
          <span className="text-sm font-medium">
            {streak.daily_goal_completed ? "Erreicht!" : "In Bearbeitung"}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
