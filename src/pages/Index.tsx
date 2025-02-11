import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/providers/AuthProvider";
import { SearchBar, SearchParams } from "@/components/SearchBar";
import { useState, useMemo, useEffect, useCallback } from "react";
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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
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

  // Maus-Position-Handler für interaktive Effekte
  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePosition({
      x: (e.clientX / window.innerWidth) * 2 - 1,
      y: (e.clientY / window.innerHeight) * 2 - 1
    });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  if (!user) {
    return <WelcomeScreen />;
  }

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Verbesserter neuronaler Hintergrund */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900/30">
        {/* Neuronale Verbindungen */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={`neuron-${i}`}
              className="absolute opacity-[0.15]"
              style={{
                width: `${Math.random() * 400 + 100}px`,
                height: '1px',
                background: `linear-gradient(90deg, 
                  transparent,
                  rgba(59, 130, 246, ${0.3 + Math.random() * 0.4}),
                  transparent
                )`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                transform: `
                  rotate(${Math.random() * 360}deg)
                  translateX(${mousePosition.x * 20}px)
                  translateY(${mousePosition.y * 20}px)
                `,
                transition: 'transform 0.5s ease-out',
                animation: `pulse-translate ${8 + Math.random() * 4}s infinite`,
              }}
            />
          ))}
        </div>

        {/* Synapsen (Knotenpunkte) */}
        <div className="absolute inset-0">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={`synapse-${i}`}
              className="absolute rounded-full"
              style={{
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                background: `radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 70%)`,
                boxShadow: '0 0 10px rgba(59,130,246,0.3)',
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                transform: `
                  scale(${1 + Math.sin(Date.now() / 1000) * 0.2})
                  translateX(${mousePosition.x * 30}px)
                  translateY(${mousePosition.y * 30}px)
                `,
                transition: 'transform 0.8s ease-out',
                animation: `pulse-slow ${6 + Math.random() * 4}s infinite`,
              }}
            />
          ))}
        </div>

        {/* Gehirnwellen-Animation */}
        <div className="absolute inset-0">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={`wave-${i}`}
              className="absolute w-full h-1 opacity-[0.05]"
              style={{
                top: `${30 + i * 20}%`,
                background: `linear-gradient(90deg, 
                  transparent,
                  rgba(59, 130, 246, 0.5),
                  rgba(147, 51, 234, 0.5),
                  transparent
                )`,
                transform: `translateY(${Math.sin(Date.now() / 2000 + i) * 50}px)`,
                animation: `wave ${10 + i * 2}s infinite ease-in-out`,
              }}
            />
          ))}
        </div>

        {/* Verbessertes Gitternetz */}
        <div 
          className="absolute inset-0 bg-grid-white/[0.02]" 
          style={{ 
            backgroundSize: '30px 30px',
            backgroundImage: `
              linear-gradient(to right, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            transform: `
              translateX(${mousePosition.x * 10}px)
              translateY(${mousePosition.y * 10}px)
            `,
            transition: 'transform 1s ease-out',
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
                  hasFilters={Boolean(
                    searchParams.query || 
                    searchParams.category || 
                    searchParams.difficultyLevel || 
                    searchParams.tags.length > 0
                  )}
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
