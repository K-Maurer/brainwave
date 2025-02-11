
import { useCallback } from "react"
import { Upload as UploadIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FileUploadZoneProps {
  onFileSelect: (files: File[]) => void;
}

export function FileUploadZone({ onFileSelect }: FileUploadZoneProps) {
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const droppedFiles = Array.from(e.dataTransfer.files)
    onFileSelect(droppedFiles)
  }, [onFileSelect])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    onFileSelect(selectedFiles)
  }, [onFileSelect])

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }, [])

  return (
    <div 
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
    >
      <div className="flex flex-col items-center gap-2">
        <UploadIcon className="h-12 w-12 text-slate-400 dark:text-slate-500" />
        <div className="space-y-1">
          <p className="text-slate-600 dark:text-slate-300">
            Dateien hierher ziehen oder
          </p>
          <label htmlFor="file-upload">
            <Button variant="secondary" className="cursor-pointer">
              Dateien auswählen
            </Button>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={handleFileSelect}
              multiple
              accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png"
            />
          </label>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          PDF, Word, PowerPoint oder Bilder
        </p>
      </div>
    </div>
  )
}
