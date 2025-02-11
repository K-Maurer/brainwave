
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Navigation } from "@/components/Navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { ViewMilestoneCelebration } from "@/components/ViewMilestoneCelebration";
import { DynamicLearningMilestones } from "@/components/DynamicLearningMilestones";
import { DocumentHeader } from "@/components/document/DocumentHeader";
import { DocumentContent } from "@/components/document/DocumentContent";
import { FloatingLogo } from "@/components/document/FloatingLogo";
import { Document } from "@/types/document";

export default function DocumentPage() {
  const { id } = useParams();
  const { toast } = useToast();

  const { data: document, isLoading } = useQuery({
    queryKey: ["document", id],
    queryFn: async () => {
      // Increment view count
      await supabase.rpc("increment_counter", { row_id: id });

      const { data, error } = await supabase
        .from("documents")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        toast({
          variant: "destructive",
          title: "Fehler beim Laden des Dokuments",
          description: error.message,
        });
        throw error;
      }

      return data as Document;
    },
  });

  const { data: documentContent } = useQuery({
    queryKey: ["document-content", id],
    queryFn: async () => {
      if (!document?.file_path) return null;

      const { data, error } = await supabase.storage
        .from("documents")
        .download(document.file_path);

      if (error) {
        toast({
          variant: "destructive",
          title: "Fehler beim Laden des Dokumenteninhalts",
          description: error.message,
        });
        throw error;
      }

      const text = await data.text();
      return text;
    },
    enabled: !!document?.file_path,
  });

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-100 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900">
      <AnimatedBackground />
      <FloatingLogo />
      
      {id && <ViewMilestoneCelebration documentId={id} />}

      <Navigation />
      <main className="flex-1 p-8 relative backdrop-blur-sm">
        <div className="container mx-auto">
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-8 w-1/3" />
              <Skeleton className="h-64 w-full" />
            </div>
          ) : document ? (
            <>
              <DocumentHeader 
                title={document.title}
                difficultyLevel={document.difficulty_level}
              />

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <div className="lg:col-span-2">
                  <DocumentContent 
                    document={document}
                    documentContent={documentContent || ""}
                  />
                </div>

                <div className="space-y-6">
                  {id && <DynamicLearningMilestones documentId={id} />}
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
                Dokument nicht gefunden
              </h2>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
