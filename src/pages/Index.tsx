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
      {/* Futuristischer, technischer Hintergrund */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900/30">
        {/* Neuronales Netzwerk Animation */}
        <div className="absolute inset-0 overflow-hidden opacity-[0.15]">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse-translate"
              style={{
                width: `${Math.random() * 300 + 200}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 360}deg)`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 10 + 5}s`
              }}
            />
          ))}
        </div>

        {/* 3D Geometrische Formen */}
        <div className="absolute inset-0">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-64 h-64 rounded-full mix-blend-overlay animate-wave opacity-30"
              style={{
                background: `radial-gradient(circle, 
                  ${i % 2 === 0 ? 'rgba(59,130,246,0.4)' : 'rgba(147,51,234,0.3)'} 0%, 
                  transparent 70%)`,
                top: `${20 + i * 15}%`,
                left: `${10 + i * 20}%`,
                transform: `scale(${1 + i * 0.5})`,
                animationDelay: `${i * 1.5}s`
              }}
            />
          ))}
        </div>

        {/* Digitale Partikel */}
        <div className="absolute inset-0">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-blue-400/30 animate-pulse-slow"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                transform: `scale(${Math.random() * 2 + 0.5})`
              }}
            />
          ))}
        </div>

        {/* Futuristische Gitterlinien */}
        <div className="absolute inset-0 bg-grid-white/[0.02]" 
             style={{ 
               backgroundSize: '30px 30px',
               backgroundImage: `
                 linear-gradient(to right, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                 linear-gradient(to bottom, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
               `
             }}
        />
      </div>

      {/* Hauptinhalt */}
      <Navigation />
      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8 relative">
        <div className="container mx-auto space-y-8 max-w-7xl">
          {/* Header mit 3D-Effekt */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transform hover:scale-[1.01] transition-all duration-500">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-400 to-blue-600 bg-clip-text text-transparent">
                Dashboard
              </h1>
              <p className="text-blue-200/70">
                Willkommen zurück bei Ihrem personalisierten Lernbereich
              </p>
            </div>
            <Button 
              asChild 
              className="bg-blue-600/80 hover:bg-blue-500/80 hover:shadow-lg hover:shadow-blue-500/20 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1"
            >
              <Link to="/upload" className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Neue Datei hochladen
              </Link>
            </Button>
          </div>

          {/* Metriken-Karte mit Glassmorphismus */}
          <div className="rounded-xl glass-card p-6 hover:shadow-blue-500/10 transition-all duration-500 transform hover:scale-[1.01]">
            <LearningMetrics />
          </div>
          
          {/* 3-Spalten-Layout mit schwebendem Effekt */}
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-8">
              <Card className="glass-card transform hover:scale-[1.01] transition-all duration-500">
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

              <div className="rounded-xl glass-card p-6 transform hover:scale-[1.01] transition-all duration-500">
                <DocumentList 
                  documents={documents} 
                  isLoading={isLoading} 
                  hasFilters={hasFilters}
                />
              </div>
            </div>

            <div className="space-y-8">
              <div className="rounded-xl glass-card p-6 transform hover:scale-[1.01] transition-all duration-500">
                <LearningGoals />
              </div>
              <div className="rounded-xl glass-card p-6 transform hover:scale-[1.01] transition-all duration-500">
                <StudyGroupList />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
