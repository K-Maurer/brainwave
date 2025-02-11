
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export function WelcomeScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/30 overflow-hidden">
      <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02] pointer-events-none" />
      
      <div className="relative w-full max-w-4xl px-4 animate-fade-in">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 aspect-square w-1/2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-3xl opacity-10 animate-pulse" />
        
        <div className="text-center mb-8 relative">
          <div className="flex justify-center items-center mb-6 group">
            <img 
              src="/lovable-uploads/4ec65eac-403b-498b-9880-28bb854b37c6.png" 
              alt="Brainwave Logo" 
              className="h-24 w-24 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 dark:from-white dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent animate-slide-up">
            Willkommen bei Brainwave
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 animate-slide-up [animation-delay:200ms]">
            Entdecken Sie eine neue Dimension des Lernens mit unserer innovativen Plattform, die Technologie und menschliches Lernen perfekt verbindet.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 relative">
          <Card className="glass-card group animate-slide-up [animation-delay:400ms]">
            <CardHeader>
              <CardTitle className="gradient-text">Intelligentes Lernen</CardTitle>
              <CardDescription>
                Personalisierte Lernpfade und adaptive Technologien für optimalen Lernerfolg
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-muted-foreground">
              <p>• KI-gestützte Lernempfehlungen</p>
              <p>• Interaktive Übungen</p>
              <p>• Fortschrittsanalysen in Echtzeit</p>
            </CardContent>
          </Card>

          <Card className="glass-card group animate-slide-up [animation-delay:600ms]">
            <CardHeader>
              <CardTitle className="gradient-text">Gemeinsam Lernen</CardTitle>
              <CardDescription>
                Vernetzen Sie sich mit anderen Lernenden und profitieren Sie vom Gruppenwissen
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-muted-foreground">
              <p>• Kollaborative Lerngruppen</p>
              <p>• Live-Diskussionen</p>
              <p>• Peer-Learning & Mentoring</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center relative animate-slide-up [animation-delay:800ms]">
          <Button asChild className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 hover-lift group px-8">
            <Link to="/auth">
              Jetzt starten
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
