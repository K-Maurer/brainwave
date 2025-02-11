
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/providers/AuthProvider";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { BookOpen, Brain, Clock, Target } from "lucide-react";

interface LearningMetric {
  study_time_minutes: number;
  focus_score: number;
  understanding_level: number;
  created_at: string;
}

export function LearningMetrics() {
  const { user } = useAuth();

  const { data: metrics } = useQuery({
    queryKey: ["learning-metrics", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("learning_metrics")
        .select("*")
        .eq("user_id", user?.id)
        .order("created_at", { ascending: true });

      if (error) throw error;
      return data as LearningMetric[];
    },
    enabled: !!user,
  });

  const totalStudyTime = metrics?.reduce((sum, metric) => sum + metric.study_time_minutes, 0) || 0;
  const averageFocusScore = metrics?.reduce((sum, metric) => sum + metric.focus_score, 0) / (metrics?.length || 1) || 0;
  const averageUnderstanding = metrics?.reduce((sum, metric) => sum + metric.understanding_level, 0) / (metrics?.length || 1) || 0;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Gesamte Lernzeit</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{Math.round(totalStudyTime / 60)} Stunden</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Fokus Score</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{averageFocusScore.toFixed(1)}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Verständnis</CardTitle>
          <Brain className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{averageUnderstanding.toFixed(1)}/10</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Aktive Dokumente</CardTitle>
          <BookOpen className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics?.length || 0}</div>
        </CardContent>
      </Card>

      {metrics && metrics.length > 0 && (
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>Lernfortschritt</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={metrics}>
                  <XAxis 
                    dataKey="created_at" 
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => new Date(value).toLocaleDateString()}
                  />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="understanding_level"
                    stroke="#8884d8"
                    name="Verständnis"
                  />
                  <Line
                    type="monotone"
                    dataKey="focus_score"
                    stroke="#82ca9d"
                    name="Fokus"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
