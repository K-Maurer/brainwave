
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Clock, BookOpen, Tags } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { de } from "date-fns/locale";
import { Link } from "react-router-dom";

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

export function DocumentCard({ document }: { document: Document }) {
  return (
    <Link to={`/document/${document.id}`}>
      <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-none shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="text-xl font-semibold text-slate-800 dark:text-slate-100">
              {document.title}
            </CardTitle>
            {document.difficulty_level && (
              <DifficultyBadge level={document.difficulty_level} />
            )}
          </div>
          <CardDescription className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4" />
              {formatDistanceToNow(new Date(document.created_at), {
                addSuffix: true,
                locale: de,
              })}
            </div>
            {document.view_count > 0 && (
              <div className="flex items-center gap-2 text-sm">
                <BookOpen className="h-4 w-4" />
                {document.view_count} mal angesehen
              </div>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {document.description && (
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              {document.description}
            </p>
          )}
          <div className="space-y-3">
            {document.category && (
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                <span className="text-sm text-slate-600 dark:text-slate-300">
                  {document.category}
                </span>
              </div>
            )}
            {document.tags && document.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <Tags className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                {document.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
            {document.learning_type && (
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                <span className="text-sm text-slate-600 dark:text-slate-300">
                  {document.learning_type}
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
