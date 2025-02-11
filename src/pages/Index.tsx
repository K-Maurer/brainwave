
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/providers/AuthProvider";
import { SearchBar, SearchParams } from "@/components/SearchBar";
import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { DocumentList } from "@/components/DocumentList";
import { StudyGroupList } from "@/components/StudyGroups/StudyGroupList";
import { LearningMetrics } from "@/components/dashboard/LearningMetrics";
import { LearningGoals } from "@/components/dashboard/LearningGoals";

interface Document {
  id: string;
  title: string;
  description: string | null;
  file_type: string;
  created_at: string;
  category: string | null;
  tags: string[] | null;
  learning_type: string | null;
  difficulty_level: string | null;
  view_count: number;
  last_viewed_at: string | null;
}

export default function Index() {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useState<SearchParams>({
    query: "",
    category: null,
    learningType: null,
    difficultyLevel: null,
    tags: [],
  });

  const { data: documents, isLoading } = useQuery({
    queryKey: ["documents", user?.id, searchParams],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("search_documents", {
        search_query: searchParams.query || null,
        category_filter: searchParams.category,
        difficulty_filter: searchParams.difficultyLevel,
        learning_type_filter: searchParams.learningType,
        tag_filter: searchParams.tags.length > 0 ? searchParams.tags : null,
      });

      if (error) throw error;
      return data as Document[];
    },
    enabled: !!user,
  });

  const { categories, learningTypes, difficultyLevels, allTags } = useMemo(() => {
    const cats = new Set<string>();
    const types = new Set<string>();
    const levels = new Set<string>();
    const tags = new Set<string>();

    documents?.forEach((doc) => {
      if (doc.category) cats.add(doc.category);
      if (doc.learning_type) types.add(doc.learning_type);
      if (doc.difficulty_level) levels.add(doc.difficulty_level);
      if (doc.tags) doc.tags.forEach((tag) => tags.add(tag));
    });

    return {
      categories: Array.from(cats),
      learningTypes: Array.from(types),
      difficultyLevels: Array.from(levels),
      allTags: Array.from(tags),
    };
  }, [documents]);

  if (!user) {
    return <WelcomeScreen />;
  }

  const hasFilters = Boolean(
    searchParams.query || 
    searchParams.category || 
    searchParams.difficultyLevel || 
    searchParams.tags.length > 0
  );

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Hochmoderner, technischer Hintergrund */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/30">
        {/* Binäre Matrix Regenmuster */}
        <div className="absolute inset-0 overflow-hidden opacity-[0.03] dark:opacity-[0.07]">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-xs animate-fall"
              style={{
                left: `${i * 10}%`,
                animationDelay: `${i * 0.3}s`,
                writingMode: 'vertical-rl'
              }}
            >
              {Array.from({ length: 20 }).map((_, j) => (
                <span key={j} className="inline-block my-1">
                  {Math.random() > 0.5 ? '1' : '0'}
                </span>
              ))}
            </div>
          ))}
        </div>

        {/* Futuristische Gitterlinien */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" 
               style={{ 
                 backgroundSize: '30px 30px',
                 backgroundImage: `
                   linear-gradient(to right, rgba(59, 130, 246, 0.05) 1px, transparent 1px),
                   linear-gradient(to bottom, rgba(59, 130, 246, 0.05) 1px, transparent 1px)
                 `
               }}
          />
        </div>

        {/* Dynamische Partikel-Wellen */}
        <div className="absolute inset-0">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-[600px] h-[600px] rounded-full mix-blend-multiply filter blur-3xl animate-wave opacity-10"
              style={{
                background: i === 0 ? 'radial-gradient(circle, rgba(59,130,246,1) 0%, rgba(59,130,246,0) 70%)' :
                           i === 1 ? 'radial-gradient(circle, rgba(147,51,234,1) 0%, rgba(147,51,234,0) 70%)' :
                                   'radial-gradient(circle, rgba(79,70,229,1) 0%, rgba(79,70,229,0) 70%)',
                top: `${20 + i * 30}%`,
                left: `${20 + i * 20}%`,
                animationDelay: `${i * 2}s`
              }}
            />
          ))}
        </div>

        {/* Leuchtende Energie-Linien */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent animate-pulse-translate"
              style={{
                width: `${200 + i * 100}px`,
                top: `${20 + i * 20}%`,
                left: `${i % 2 === 0 ? -100 : 'auto'}`,
                right: `${i % 2 === 0 ? 'auto' : -100}`,
                animationDelay: `${i * 0.5}s`,
                transform: `rotate(${i % 2 === 0 ? '15deg' : '-15deg'})`
              }}
            />
          ))}
        </div>

        {/* Hochtech-Gradientenkreise */}
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse-slow [animation-delay:2s]" />
      </div>

      {/* Hauptinhalt */}
      <Navigation />
      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8 relative">
        <div className="container mx-auto space-y-8 max-w-7xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-600 to-violet-600 bg-clip-text text-transparent dark:from-white dark:via-blue-400 dark:to-violet-400">
                Dashboard
              </h1>
              <p className="text-muted-foreground">
                Willkommen zurück bei Ihrem personalisierten Lernbereich
              </p>
            </div>
            <Button asChild className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 hover-lift hover-glow">
              <Link to="/upload" className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Neue Datei hochladen
              </Link>
            </Button>
          </div>

          <div className="rounded-xl glass-card p-6 hover:shadow-blue-500/10 transition-all duration-500">
            <LearningMetrics />
          </div>
          
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-8">
              <Card className="glass-card">
                <CardContent className="pt-6">
                  <SearchBar
                    onSearch={setSearchParams}
                    categories={categories}
                    learningTypes={learningTypes}
                    difficultyLevels={difficultyLevels}
                    allTags={allTags}
                  />
                </CardContent>
              </Card>

              <div className="rounded-xl glass-card p-6">
                <DocumentList 
                  documents={documents} 
                  isLoading={isLoading} 
                  hasFilters={hasFilters}
                />
              </div>
            </div>

            <div className="space-y-8">
              <div className="rounded-xl glass-card p-6">
                <LearningGoals />
              </div>
              <div className="rounded-xl glass-card p-6">
                <StudyGroupList />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
