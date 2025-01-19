import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, BookOpen, Library, Trophy, Users, BarChart } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent mb-8 animate-fade-in">
            Deine persönliche Lernplattform
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Organisiere deine Unterlagen, lerne effizient und verfolge deinen Fortschritt
            in einer benutzerfreundlichen Umgebung.
          </p>
          <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            Jetzt starten
          </Button>
        </div>

        {/* Hauptfunktionen */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          <Link to="/upload" className="transform transition-all duration-300 hover:scale-105">
            <Card className="h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-purple-100 dark:border-purple-900 shadow-lg hover:shadow-xl">
              <CardHeader className="space-y-4">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900 dark:to-blue-900 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <Upload className="w-10 h-10 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle className="text-2xl text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Unterlagen hochladen
                </CardTitle>
                <CardDescription className="text-center text-base">
                  Lade deine Lernmaterialien hoch und organisiere sie nach Fächern
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                  <li className="flex items-center space-x-2">
                    <span className="text-green-500">✓</span>
                    <span>Unterstützt PDF, Word, PowerPoint</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-green-500">✓</span>
                    <span>Automatische Kategorisierung</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-green-500">✓</span>
                    <span>Schnelle Suche</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </Link>

          <Link to="/learn" className="transform transition-all duration-300 hover:scale-105">
            <Card className="h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-purple-100 dark:border-purple-900 shadow-lg hover:shadow-xl">
              <CardHeader className="space-y-4">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900 dark:to-blue-900 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <BookOpen className="w-10 h-10 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle className="text-2xl text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Lernen
                </CardTitle>
                <CardDescription className="text-center text-base">
                  Starte deine personalisierte Lernsession
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                  <li className="flex items-center space-x-2">
                    <span className="text-green-500">✓</span>
                    <span>Interaktive Lernkarten</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-green-500">✓</span>
                    <span>Fortschrittsverfolgung</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-green-500">✓</span>
                    <span>Personalisierte Empfehlungen</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </Link>

          <Link to="/library" className="transform transition-all duration-300 hover:scale-105">
            <Card className="h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-purple-100 dark:border-purple-900 shadow-lg hover:shadow-xl">
              <CardHeader className="space-y-4">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900 dark:to-blue-900 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <Library className="w-10 h-10 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle className="text-2xl text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Bibliothek
                </CardTitle>
                <CardDescription className="text-center text-base">
                  Verwalte deine Lernmaterialien
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                  <li className="flex items-center space-x-2">
                    <span className="text-green-500">✓</span>
                    <span>Übersichtliche Organisation</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-green-500">✓</span>
                    <span>Einfaches Teilen</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-green-500">✓</span>
                    <span>Offline-Verfügbarkeit</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Zusätzliche Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center space-x-4 p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900 dark:to-yellow-800 rounded-full flex items-center justify-center shadow-inner">
              <Trophy className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <h3 className="font-semibold text-xl bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">Gamification</h3>
              <p className="text-gray-600 dark:text-gray-300">Sammle Punkte und Auszeichnungen</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 rounded-full flex items-center justify-center shadow-inner">
              <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold text-xl bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Gemeinsam Lernen</h3>
              <p className="text-gray-600 dark:text-gray-300">Tausche dich mit anderen aus</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900 dark:to-green-800 rounded-full flex items-center justify-center shadow-inner">
              <BarChart className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="font-semibold text-xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Fortschrittsanalyse</h3>
              <p className="text-gray-600 dark:text-gray-300">Verfolge deinen Lernfortschritt</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;