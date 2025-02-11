
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Plus, Lock, Unlock } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { CreateStudyGroupDialog } from "./CreateStudyGroupDialog";
import { toast } from "sonner";

interface StudyGroup {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
  created_by: string;
  is_private: boolean;
  max_members: number;
  member_count?: number;
}

export function StudyGroupList() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const { data: studyGroups, isLoading } = useQuery({
    queryKey: ["study-groups"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('study_groups')
        .select(`
          *,
          member_count:group_members(count)
        `);

      if (error) {
        toast.error("Fehler beim Laden der Lerngruppen");
        throw error;
      }

      return data as StudyGroup[];
    }
  });

  const handleCreateSuccess = () => {
    setIsCreateDialogOpen(false);
    toast.success("Lerngruppe erfolgreich erstellt");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
          Meine Lerngruppen
        </h2>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Neue Gruppe erstellen
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-none shadow-lg">
              <CardHeader className="space-y-2 animate-pulse">
                <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
              </CardHeader>
              <CardContent className="animate-pulse">
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full mb-2"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : studyGroups?.length === 0 ? (
        <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-none shadow-lg">
          <CardContent className="flex flex-col items-center justify-center p-12 text-center">
            <Users className="h-16 w-16 text-slate-400 dark:text-slate-500 mb-4" />
            <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-2">
              Keine Lerngruppen gefunden
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mb-6 max-w-md">
              Sie sind noch keiner Lerngruppe beigetreten. Erstellen Sie eine neue Gruppe oder treten Sie einer bestehenden bei.
            </p>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Erste Gruppe erstellen
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studyGroups?.map((group) => (
            <Card 
              key={group.id}
              className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-none shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl font-semibold text-slate-800 dark:text-slate-100">
                    {group.name}
                  </CardTitle>
                  {group.is_private ? (
                    <Lock className="h-4 w-4 text-slate-500" />
                  ) : (
                    <Unlock className="h-4 w-4 text-slate-500" />
                  )}
                </div>
                <CardDescription>
                  {group.member_count} Mitglieder
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-300">
                  {group.description || "Keine Beschreibung verfügbar"}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <CreateStudyGroupDialog 
        open={isCreateDialogOpen} 
        onOpenChange={setIsCreateDialogOpen}
        onSuccess={handleCreateSuccess}
      />
    </div>
  );
}
