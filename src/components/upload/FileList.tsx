
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { X } from "lucide-react"

interface FileUpload {
  file: File;
  progress: number;
  status: 'pending' | 'uploading' | 'error' | 'complete';
  error?: string;
}

interface FileListProps {
  files: FileUpload[];
  onRemove: (index: number) => void;
}

export function FileList({ files, onRemove }: FileListProps) {
  if (files.length === 0) return null;

  return (
    <div className="space-y-2">
      {files.map((fileUpload, index) => (
        <div 
          key={index}
          className="flex items-center gap-2 p-2 bg-white/50 dark:bg-slate-800/50 rounded-lg"
        >
          <div className="flex-1 min-w-0">
            <p className="truncate text-sm font-medium">
              {fileUpload.file.name}
            </p>
            <Progress 
              value={fileUpload.progress} 
              className="h-1 mt-1"
            />
            {fileUpload.status === 'error' && (
              <p className="text-xs text-red-500 mt-1">
                {fileUpload.error}
              </p>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => onRemove(index)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  )
}
