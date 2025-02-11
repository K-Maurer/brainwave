
import { FileText, Calendar, Eye, Tags, BookOpen, BarChart } from "lucide-react";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DocumentDetailsProps {
  document: {
    description?: string | null;
    created_at: string;
    category?: string | null;
    learning_type?: string | null;
    view_count: number;
    file_type: string;
    tags?: string[] | null;
  };
}

export function DocumentDetails({ document }: DocumentDetailsProps) {
  return (
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
  );
}
