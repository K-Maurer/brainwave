
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { formatDistanceToNow } from "date-fns";
import { de } from "date-fns/locale";
import { useAuth } from "@/providers/AuthProvider";

interface Document {
  id: string;
  title: string;
  description: string | null;
  file_type: string;
  created_at: string;
}

export default function Index() {
  const { user } = useAuth();
  const { data: documents, isLoading } = useQuery({
    queryKey: ["documents", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("documents")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Document[];
    },
    enabled: !!user,
  });

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

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-slate-600 dark:text-slate-300" />
            </div>
          ) : !documents?.length ? (
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-none shadow-lg">
              <CardContent className="flex flex-col items-center justify-center p-12 text-center">
                <FileText className="h-16 w-16 text-slate-400 dark:text-slate-500 mb-4" />
                <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-2">
                  Keine Dokumente vorhanden
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-6 max-w-md">
                  Sie haben noch keine Lernmaterialien hochgeladen. Beginnen Sie damit,
                  Ihre ersten Unterlagen hochzuladen.
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
                <Card
                  key={doc.id}
                  className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-none shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-slate-800 dark:text-slate-100">
                      {doc.title}
                    </CardTitle>
                    <CardDescription>
                      Hochgeladen{" "}
                      {formatDistanceToNow(new Date(doc.created_at), {
                        addSuffix: true,
                        locale: de,
                      })}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {doc.description && (
                      <p className="text-slate-600 dark:text-slate-300 mb-4">
                        {doc.description}
                      </p>
                    )}
                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                      <FileText className="h-4 w-4" />
                      {doc.file_type}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
