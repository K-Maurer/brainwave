
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Upload as UploadIcon, X } from "lucide-react"
import { useCallback, useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { Navigation } from "@/components/Navigation"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface FileUpload {
  file: File;
  progress: number;
  status: 'pending' | 'uploading' | 'error' | 'complete';
  error?: string;
}

export default function Upload() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [tags, setTags] = useState("")
  const [learningType, setLearningType] = useState("")
  const [difficultyLevel, setDifficultyLevel] = useState<string>("")
  const [files, setFiles] = useState<FileUpload[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const { toast } = useToast()

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const droppedFiles = Array.from(e.dataTransfer.files)
    setFiles(prev => [
      ...prev,
      ...droppedFiles.map(file => ({
        file,
        progress: 0,
        status: 'pending' as const
      }))
    ])
  }, [])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    setFiles(prev => [
      ...prev,
      ...selectedFiles.map(file => ({
        file,
        progress: 0,
        status: 'pending' as const
      }))
    ])
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }, [])

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const uploadFile = async (fileUpload: FileUpload) => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      throw new Error('Nicht angemeldet')
    }

    const formData = new FormData()
    formData.append('file', fileUpload.file)
    formData.append('title', title)
    if (description.trim()) formData.append('description', description)
    if (category.trim()) formData.append('category', category)
    if (tags.trim()) formData.append('tags', tags)
    if (learningType.trim()) formData.append('learning_type', learningType)
    if (difficultyLevel) formData.append('difficulty_level', difficultyLevel)

    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/upload-document`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: formData,
      }
    )

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Fehler beim Hochladen')
    }

    return await response.json()
  }

  const handleUpload = async () => {
    if (!files.length || !title.trim()) {
      toast({
        title: "Fehler",
        description: "Bitte geben Sie einen Titel ein und wählen Sie mindestens eine Datei aus.",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)

    try {
      for (let i = 0; i < files.length; i++) {
        setFiles(prev => prev.map((f, index) => 
          index === i ? { ...f, status: 'uploading', progress: 0 } : f
        ))

        try {
          await uploadFile(files[i])
          setFiles(prev => prev.map((f, index) => 
            index === i ? { ...f, status: 'complete', progress: 100 } : f
          ))
        } catch (error: any) {
          setFiles(prev => prev.map((f, index) => 
            index === i ? { ...f, status: 'error', error: error.message, progress: 0 } : f
          ))
          console.error('Upload error:', error)
        }
      }

      toast({
        title: "Erfolg",
        description: "Alle Dateien wurden erfolgreich hochgeladen.",
      })

      // Reset form after successful upload
      setTitle("")
      setDescription("")
      setFiles([])
    } catch (error: any) {
      console.error('Upload error:', error)
      toast({
        title: "Fehler",
        description: "Beim Hochladen ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fdfcfb] to-[#e2d1c3] dark:from-slate-900 dark:to-slate-800">
      <Navigation />
      <div className="p-6">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-100">
              Lernmaterialien hochladen
            </h1>
            <p className="text-slate-600 dark:text-slate-300">
              Laden Sie hier Ihre Unterlagen hoch, um sie später zum Lernen zu verwenden
            </p>
          </div>

          <Card className="backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 border-none shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-slate-700 dark:text-slate-200">
                Dateien und Metadaten
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Titel der Unterlagen*</Label>
                  <Input 
                    id="title" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="z.B. Mathe Kapitel 1" 
                    className="bg-white/50 dark:bg-slate-800/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Kategorie</Label>
                  <Input 
                    id="category" 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="z.B. Mathematik" 
                    className="bg-white/50 dark:bg-slate-800/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Beschreibung</Label>
                  <Input 
                    id="description" 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Kurze Beschreibung der Unterlagen" 
                    className="bg-white/50 dark:bg-slate-800/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (mit Komma getrennt)</Label>
                  <Input 
                    id="tags" 
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="z.B. algebra, gleichungen, basics" 
                    className="bg-white/50 dark:bg-slate-800/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="learningType">Lerntyp</Label>
                  <Input 
                    id="learningType" 
                    value={learningType}
                    onChange={(e) => setLearningType(e.target.value)}
                    placeholder="z.B. Übungsaufgaben" 
                    className="bg-white/50 dark:bg-slate-800/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="difficultyLevel">Schwierigkeitsgrad</Label>
                  <Select value={difficultyLevel} onValueChange={setDifficultyLevel}>
                    <SelectTrigger className="bg-white/50 dark:bg-slate-800/50">
                      <SelectValue placeholder="Wählen Sie einen Schwierigkeitsgrad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Anfänger</SelectItem>
                      <SelectItem value="intermediate">Fortgeschritten</SelectItem>
                      <SelectItem value="advanced">Experte</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
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

                {files.length > 0 && (
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
                          onClick={() => removeFile(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Button 
                onClick={handleUpload}
                disabled={isUploading}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
              >
                {isUploading ? "Wird hochgeladen..." : "Hochladen"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
