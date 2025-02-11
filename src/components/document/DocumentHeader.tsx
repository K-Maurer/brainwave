
import { DifficultyBadge } from "./DifficultyBadge";

interface DocumentHeaderProps {
  title: string;
  difficultyLevel?: string;
}

export function DocumentHeader({ title, difficultyLevel }: DocumentHeaderProps) {
  return (
    <div className="flex justify-between items-start mb-8">
      <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 
                   bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent
                   animate-fade-in">
        {title}
      </h1>
      {difficultyLevel && (
        <DifficultyBadge level={difficultyLevel} />
      )}
    </div>
  );
}
