
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { Navigation } from "@/components/Navigation"
import { FileUploadZone } from "@/components/upload/FileUploadZone"
import { FileList } from "@/components/upload/FileList"
import { MetadataForm } from "@/components/upload/MetadataForm"

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

  const handleFileSelect = (newFiles: File[]) => {
    setFiles(prev => [
      ...prev,
      ...newFiles.map(file => ({
        file,
        progress: 0,
        status: 'pending' as const
      }))
    ])
  }

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
      setCategory("")
      setTags("")
      setLearningType("")
      setDifficultyLevel("")
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
              <MetadataForm
                title={title}
                setTitle={setTitle}
                description={description}
                setDescription={setDescription}
                category={category}
                setCategory={setCategory}
                tags={tags}
                setTags={setTags}
                learningType={learningType}
                setLearningType={setLearningType}
                difficultyLevel={difficultyLevel}
                setDifficultyLevel={setDifficultyLevel}
              />

              <div className="space-y-4">
                <FileUploadZone onFileSelect={handleFileSelect} />
                <FileList files={files} onRemove={removeFile} />
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
