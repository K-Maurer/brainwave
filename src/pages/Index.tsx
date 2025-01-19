import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, BookOpen, Library } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-purple-900">Meine Lern-Plattform</h1>
        <p className="text-center text-gray-600 mb-12">
          Organisiere und lerne deine Unterlagen effizient
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/upload">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <Upload className="w-12 h-12 text-purple-600 mb-2" />
                <CardTitle>Unterlagen hochladen</CardTitle>
                <CardDescription>
                  Lade deine Lernmaterialien hoch
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  Unterstützt verschiedene Dateiformate wie PDF, Word und PowerPoint
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/learn">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <BookOpen className="w-12 h-12 text-purple-600 mb-2" />
                <CardTitle>Lernen</CardTitle>
                <CardDescription>
                  Starte deine Lernsession
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  Organisiere deinen Lernprozess und verfolge deinen Fortschritt
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/library">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <Library className="w-12 h-12 text-purple-600 mb-2" />
                <CardTitle>Bibliothek</CardTitle>
                <CardDescription>
                  Durchsuche deine Materialien
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  Finde und organisiere deine hochgeladenen Unterlagen
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;