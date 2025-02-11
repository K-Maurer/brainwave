
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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/30">
      <Navigation />
      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="container mx-auto space-y-8 max-w-7xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent dark:from-white dark:to-blue-400">
                Dashboard
              </h1>
              <p className="text-muted-foreground">
                Willkommen zurück bei Ihrem personalisierten Lernbereich
              </p>
            </div>
            <Button asChild className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
              <Link to="/upload" className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Neue Datei hochladen
              </Link>
            </Button>
          </div>

          <div className="rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg border border-gray-200 dark:border-gray-700 p-6">
            <LearningMetrics />
          </div>
          
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-8">
              <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg border-gray-200 dark:border-gray-700">
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

              <div className="rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg border border-gray-200 dark:border-gray-700 p-6">
                <DocumentList 
                  documents={documents} 
                  isLoading={isLoading} 
                  hasFilters={hasFilters}
                />
              </div>
            </div>

            <div className="space-y-8">
              <div className="rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg border border-gray-200 dark:border-gray-700 p-6">
                <LearningGoals />
              </div>
              <div className="rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg border border-gray-200 dark:border-gray-700 p-6">
                <StudyGroupList />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
