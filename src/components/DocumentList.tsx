
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { DocumentCard } from "./DocumentCard";
import { Upload } from "lucide-react";
import { useState } from "react";

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

interface DocumentListProps {
  documents: Document[] | undefined;
  isLoading: boolean;
  hasFilters: boolean;
}

export function DocumentList({ documents: initialDocuments, isLoading, hasFilters }: DocumentListProps) {
  const [documents, setDocuments] = useState<Document[] | undefined>(initialDocuments);

  // Aktualisiere documents wenn sich initialDocuments ändert
  if (documents !== initialDocuments) {
    setDocuments(initialDocuments);
  }

  const handleDelete = (deletedId: string) => {
    setDocuments((prevDocs) => prevDocs?.filter((doc) => doc.id !== deletedId));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-slate-600 dark:text-slate-300" />
      </div>
    );
  }

  if (!documents?.length) {
    return (
      <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-none shadow-lg">
        <CardContent className="flex flex-col items-center justify-center p-12 text-center">
          <FileText className="h-16 w-16 text-slate-400 dark:text-slate-500 mb-4" />
          <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-2">
            Keine Dokumente gefunden
          </h3>
          <p className="text-slate-600 dark:text-slate-300 mb-6 max-w-md">
            {hasFilters
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
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {documents.map((doc) => (
        <DocumentCard key={doc.id} document={doc} onDelete={handleDelete} />
      ))}
    </div>
  );
}
