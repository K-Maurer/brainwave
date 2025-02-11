
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Calendar, Eye, Tags, BookOpen, BarChart } from "lucide-react";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AILearningTools } from "@/components/AILearningTools";
import { ViewMilestoneCelebration } from "@/components/ViewMilestoneCelebration";
import { useEffect, useRef } from "react";

interface Document {
  id: string;
  title: string;
  description: string | null;
  file_type: string;
  file_path: string;
  created_at: string;
  category: string | null;
  tags: string[] | null;
  learning_type: string | null;
  difficulty_level: string | null;
  view_count: number;
  last_viewed_at: string | null;
}

export default function Document() {
  const { id } = useParams();
  const { toast } = useToast();
  const logoRef = useRef<HTMLImageElement>(null);

  // Logo Animation Effect
  useEffect(() => {
    const logo = logoRef.current;
    if (!logo) return;

    const pulseAnimation = () => {
      logo.style.transform = 'scale(1.05)';
      logo.style.filter = 'brightness(1.2) drop-shadow(0 0 10px rgba(59, 130, 246, 0.5))';
      
      setTimeout(() => {
        logo.style.transform = 'scale(1)';
        logo.style.filter = 'brightness(1) drop-shadow(0 0 5px rgba(59, 130, 246, 0.3))';
      }, 1000);
    };

    const interval = setInterval(pulseAnimation, 3000);
    return () => clearInterval(interval);
  }, []);

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

  const DifficultyBadge = ({ level }: { level: string }) => {
    const colors = {
      beginner: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
      intermediate: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
      advanced: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[level as keyof typeof colors]}`}>
        {level}
      </span>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-100 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900">
      <AnimatedBackground />
      
      {/* Floating Logo */}
      <div className="fixed top-4 right-4 z-50 pointer-events-none">
        <img
          ref={logoRef}
          src="/lovable-uploads/4ec65eac-403b-498b-9880-28bb854b37c6.png"
          alt="Brainwave Logo"
          className="w-16 h-16 transition-all duration-1000 ease-in-out"
          style={{
            filter: 'drop-shadow(0 0 5px rgba(59, 130, 246, 0.3))',
          }}
        />
      </div>

      {/* Add ViewMilestoneCelebration component */}
      {id && <ViewMilestoneCelebration documentId={id} />}

      <Navigation />
      <main className="flex-1 p-8 relative backdrop-blur-sm">
        <div className="container mx-auto">
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-8 w-1/3" />
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : document ? (
            <>
              <div className="flex justify-between items-start mb-8">
                <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 
                             bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent
                             animate-fade-in">
                  {document.title}
                </h1>
                {document.difficulty_level && (
                  <DifficultyBadge level={document.difficulty_level} />
                )}
              </div>

              <Tabs defaultValue="details" className="space-y-6">
                <TabsList className="glass-card">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="learning">Lernhilfen</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="animate-fade-in">
                  <Card className="glass-card border-none shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-xl">Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {document.description && (
                        <p className="text-slate-600 dark:text-slate-300">
                          {document.description}
                        </p>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-5 w-5 text-slate-500" />
                            <span className="text-sm text-slate-600 dark:text-slate-300">
                              Erstellt am {format(new Date(document.created_at), "PPP", { locale: de })}
                            </span>
                          </div>

                          {document.category && (
                            <div className="flex items-center gap-2">
                              <FileText className="h-5 w-5 text-slate-500" />
                              <span className="text-sm text-slate-600 dark:text-slate-300">
                                {document.category}
                              </span>
                            </div>
                          )}

                          {document.learning_type && (
                            <div className="flex items-center gap-2">
                              <BookOpen className="h-5 w-5 text-slate-500" />
                              <span className="text-sm text-slate-600 dark:text-slate-300">
                                {document.learning_type}
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center gap-2">
                            <Eye className="h-5 w-5 text-slate-500" />
                            <span className="text-sm text-slate-600 dark:text-slate-300">
                              {document.view_count} Aufrufe
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <BarChart className="h-5 w-5 text-slate-500" />
                            <span className="text-sm text-slate-600 dark:text-slate-300">
                              Dateityp: {document.file_type}
                            </span>
                          </div>

                          {document.tags && document.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 items-center">
                              <Tags className="h-5 w-5 text-slate-500" />
                              {document.tags.map((tag, index) => (
                                <Badge key={index} variant="secondary">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="learning" className="animate-fade-in">
                  <AILearningTools
                    documentId={document.id}
                    documentText={documentContent || ""}
                  />
                </TabsContent>
              </Tabs>
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
