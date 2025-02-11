import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Upload as UploadIcon } from "lucide-react"
import { useCallback, useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { Navigation } from "@/components/Navigation"

export default function Upload() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const { toast } = useToast()

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      setFile(droppedFile)
    }
  }, [])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
    }
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }, [])

  const handleUpload = async () => {
    if (!file || !title.trim()) {
      toast({
        title: "Fehler",
        description: "Bitte geben Sie einen Titel ein und wählen Sie eine Datei aus.",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('title', title)
      if (description.trim()) {
        formData.append('description', description)
      }

      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        toast({
          title: "Fehler",
          description: "Sie müssen angemeldet sein, um Dateien hochzuladen.",
          variant: "destructive",
        })
        return
      }

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

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Fehler beim Hochladen')
      }

      toast({
        title: "Erfolg",
        description: "Die Datei wurde erfolgreich hochgeladen.",
      })

      // Reset form
      setTitle("")
      setDescription("")
      setFile(null)
    } catch (error) {
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
                Dateien auswählen
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Titel der Unterlagen</Label>
                <Input 
                  id="title" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="z.B. Mathe Kapitel 1" 
                  className="bg-white/50 dark:bg-slate-800/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Beschreibung (optional)</Label>
                <Input 
                  id="description" 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Kurze Beschreibung der Unterlagen" 
                  className="bg-white/50 dark:bg-slate-800/50"
                />
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
                        {file ? file.name : "Dateien hierher ziehen oder"}
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
                          accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png"
                        />
                      </label>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      PDF, Word, PowerPoint oder Bilder
                    </p>
                  </div>
                </div>
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
