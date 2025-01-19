import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Upload as UploadIcon } from "lucide-react"

export default function Upload() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fdfcfb] to-[#e2d1c3] dark:from-slate-900 dark:to-slate-800 p-6">
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
                placeholder="z.B. Mathe Kapitel 1" 
                className="bg-white/50 dark:bg-slate-800/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Beschreibung (optional)</Label>
              <Input 
                id="description" 
                placeholder="Kurze Beschreibung der Unterlagen" 
                className="bg-white/50 dark:bg-slate-800/50"
              />
            </div>

            <div className="space-y-4">
              <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                <div className="flex flex-col items-center gap-2">
                  <UploadIcon className="h-12 w-12 text-slate-400 dark:text-slate-500" />
                  <div className="space-y-1">
                    <p className="text-slate-600 dark:text-slate-300">
                      Dateien hierher ziehen oder
                    </p>
                    <Button variant="secondary">
                      Dateien auswählen
                    </Button>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    PDF, Word, PowerPoint oder Bilder
                  </p>
                </div>
              </div>
            </div>

            <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white">
              Hochladen
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}