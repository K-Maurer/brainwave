import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, BookOpen, Library, Trophy, Users, BarChart } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-purple-900 dark:text-purple-100 mb-6 animate-fade-in">
            Deine persönliche Lernplattform
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            Organisiere deine Unterlagen, lerne effizient und verfolge deinen Fortschritt
            in einer benutzerfreundlichen Umgebung.
          </p>
          <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
            Jetzt starten
          </Button>
        </div>

        {/* Hauptfunktionen */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Link to="/upload" className="transform transition-all hover:scale-105">
            <Card className="h-full border-2 border-purple-100 dark:border-purple-900">
              <CardHeader className="space-y-4">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto">
                  <Upload className="w-8 h-8 text-purple-600 dark:text-purple-300" />
                </div>
                <CardTitle className="text-2xl text-center">Unterlagen hochladen</CardTitle>
                <CardDescription className="text-center text-base">
                  Lade deine Lernmaterialien hoch und organisiere sie nach Fächern
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li>✓ Unterstützt PDF, Word, PowerPoint</li>
                  <li>✓ Automatische Kategorisierung</li>
                  <li>✓ Schnelle Suche</li>
                </ul>
              </CardContent>
            </Card>
          </Link>

          <Link to="/learn" className="transform transition-all hover:scale-105">
            <Card className="h-full border-2 border-purple-100 dark:border-purple-900">
              <CardHeader className="space-y-4">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto">
                  <BookOpen className="w-8 h-8 text-purple-600 dark:text-purple-300" />
                </div>
                <CardTitle className="text-2xl text-center">Lernen</CardTitle>
                <CardDescription className="text-center text-base">
                  Starte deine personalisierte Lernsession
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li>✓ Interaktive Lernkarten</li>
                  <li>✓ Fortschrittsverfolgung</li>
                  <li>✓ Personalisierte Empfehlungen</li>
                </ul>
              </CardContent>
            </Card>
          </Link>

          <Link to="/library" className="transform transition-all hover:scale-105">
            <Card className="h-full border-2 border-purple-100 dark:border-purple-900">
              <CardHeader className="space-y-4">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto">
                  <Library className="w-8 h-8 text-purple-600 dark:text-purple-300" />
                </div>
                <CardTitle className="text-2xl text-center">Bibliothek</CardTitle>
                <CardDescription className="text-center text-base">
                  Verwalte deine Lernmaterialien
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li>✓ Übersichtliche Organisation</li>
                  <li>✓ Einfaches Teilen</li>
                  <li>✓ Offline-Verfügbarkeit</li>
                </ul>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Zusätzliche Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center space-x-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <Trophy className="w-12 h-12 text-yellow-500" />
            <div>
              <h3 className="font-semibold text-lg">Gamification</h3>
              <p className="text-gray-600 dark:text-gray-300">Sammle Punkte und Auszeichnungen</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <Users className="w-12 h-12 text-blue-500" />
            <div>
              <h3 className="font-semibold text-lg">Gemeinsam Lernen</h3>
              <p className="text-gray-600 dark:text-gray-300">Tausche dich mit anderen aus</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <BarChart className="w-12 h-12 text-green-500" />
            <div>
              <h3 className="font-semibold text-lg">Fortschrittsanalyse</h3>
              <p className="text-gray-600 dark:text-gray-300">Verfolge deinen Lernfortschritt</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;