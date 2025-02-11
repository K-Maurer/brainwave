
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, Loader2, Clock, BookOpen, Tags } from "lucide-react";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { formatDistanceToNow } from "date-fns";
import { de } from "date-fns/locale";
import { useAuth } from "@/providers/AuthProvider";
import { Badge } from "@/components/ui/badge";
import { SearchBar, SearchParams } from "@/components/SearchBar";
import { useState, useMemo } from "react";

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

const DifficultyBadge = ({ level }: { level: string | null }) => {
  if (!level) return null;
  
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
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900">
        <Card className="w-full max-w-md bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-none shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Willkommen bei LernPlattform
            </CardTitle>
            <CardDescription className="text-center">
              Bitte melden Sie sich an, um Ihre Lernmaterialien zu sehen.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button asChild>
              <Link to="/auth">Anmelden</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-100 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900">
      <Navigation />
      <main className="flex-1 p-8">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
              Meine Lernmaterialien
            </h1>
            <Button asChild>
              <Link to="/upload" className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Neue Datei hochladen
              </Link>
            </Button>
          </div>

          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-none shadow-lg mb-8">
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

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-slate-600 dark:text-slate-300" />
            </div>
          ) : !documents?.length ? (
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-none shadow-lg">
              <CardContent className="flex flex-col items-center justify-center p-12 text-center">
                <FileText className="h-16 w-16 text-slate-400 dark:text-slate-500 mb-4" />
                <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-2">
                  Keine Dokumente gefunden
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-6 max-w-md">
                  {Object.values(searchParams).some((value) => 
                    Array.isArray(value) ? value.length > 0 : value
                  )
                    ? "Keine Dokumente entsprechen Ihren Suchkriterien. Versuchen Sie es mit anderen Filtern."
                    : "Sie haben noch keine Lernmaterialien hochgeladen. Beginnen Sie damit, Ihre ersten Unterlagen hochzuladen."}
                </p>
                <Button asChild>
                  <Link to="/upload" className="flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    Jetzt hochladen
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {documents.map((doc) => (
                <Link key={doc.id} to={`/document/${doc.id}`}>
                  <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-none shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl font-semibold text-slate-800 dark:text-slate-100">
                          {doc.title}
                        </CardTitle>
                        {doc.difficulty_level && (
                          <DifficultyBadge level={doc.difficulty_level} />
                        )}
                      </div>
                      <CardDescription className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4" />
                          {formatDistanceToNow(new Date(doc.created_at), {
                            addSuffix: true,
                            locale: de,
                          })}
                        </div>
                        {doc.view_count > 0 && (
                          <div className="flex items-center gap-2 text-sm">
                            <BookOpen className="h-4 w-4" />
                            {doc.view_count} mal angesehen
                          </div>
                        )}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {doc.description && (
                        <p className="text-slate-600 dark:text-slate-300 mb-4">
                          {doc.description}
                        </p>
                      )}
                      <div className="space-y-3">
                        {doc.category && (
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                            <span className="text-sm text-slate-600 dark:text-slate-300">
                              {doc.category}
                            </span>
                          </div>
                        )}
                        {doc.tags && doc.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            <Tags className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                            {doc.tags.map((tag, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="text-xs"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                        {doc.learning_type && (
                          <div className="flex items-center gap-2">
                            <BookOpen className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                            <span className="text-sm text-slate-600 dark:text-slate-300">
                              {doc.learning_type}
                            </span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
