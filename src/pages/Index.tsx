
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, BookOpen, Library, Trophy, Users, BarChart } from "lucide-react";
import { Link } from "react-router-dom";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-purple-100 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900">
        {/* Sidebar */}
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/upload" className="flex items-center gap-2">
                        <Upload className="w-4 h-4" />
                        <span>Hochladen</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/learn" className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        <span>Lernen</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/library" className="flex items-center gap-2">
                        <Library className="w-4 h-4" />
                        <span>Bibliothek</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="container mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-20 space-y-8">
              <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 dark:from-purple-400 dark:via-indigo-400 dark:to-blue-400 bg-clip-text text-transparent mb-8 animate-fade-in">
                Deine persönliche Lernplattform
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
                Organisiere deine Unterlagen, lerne effizient und verfolge deinen Fortschritt
                in einer benutzerfreundlichen Umgebung.
              </p>
              <Button size="lg" className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-700 hover:via-indigo-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                Jetzt starten
              </Button>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-purple-100 dark:border-purple-900 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105">
                <CardHeader>
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-100 via-indigo-100 to-blue-100 dark:from-purple-900 dark:via-indigo-900 dark:to-blue-900 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                    <Upload className="w-10 h-10 text-purple-600 dark:text-purple-400" />
                  </div>
                  <CardTitle className="text-center text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Materialien hochladen
                  </CardTitle>
                  <CardDescription className="text-center text-base mt-2">
                    Organisiere deine Lernunterlagen
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                      <span className="text-green-500 text-lg">✓</span>
                      <span>PDF, Word, PowerPoint</span>
                    </li>
                    <li className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                      <span className="text-green-500 text-lg">✓</span>
                      <span>Automatische Sortierung</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-purple-100 dark:border-purple-900 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105">
                <CardHeader>
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-100 via-indigo-100 to-blue-100 dark:from-purple-900 dark:via-indigo-900 dark:to-blue-900 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                    <Trophy className="w-10 h-10 text-purple-600 dark:text-purple-400" />
                  </div>
                  <CardTitle className="text-center text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Lernfortschritt
                  </CardTitle>
                  <CardDescription className="text-center text-base mt-2">
                    Verfolge deine Entwicklung
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                      <span className="text-green-500 text-lg">✓</span>
                      <span>Statistiken & Analysen</span>
                    </li>
                    <li className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                      <span className="text-green-500 text-lg">✓</span>
                      <span>Persönliche Ziele</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-purple-100 dark:border-purple-900 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105">
                <CardHeader>
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-100 via-indigo-100 to-blue-100 dark:from-purple-900 dark:via-indigo-900 dark:to-blue-900 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                    <Users className="w-10 h-10 text-purple-600 dark:text-purple-400" />
                  </div>
                  <CardTitle className="text-center text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Gemeinsam Lernen
                  </CardTitle>
                  <CardDescription className="text-center text-base mt-2">
                    Vernetze dich mit anderen
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                      <span className="text-green-500 text-lg">✓</span>
                      <span>Lerngruppen</span>
                    </li>
                    <li className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                      <span className="text-green-500 text-lg">✓</span>
                      <span>Materialien teilen</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Statistics Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-100 via-indigo-100 to-blue-100 dark:from-purple-900 dark:via-indigo-900 dark:to-blue-900 rounded-full flex items-center justify-center shadow-inner">
                    <BarChart className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-center mb-3 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">1000+</h3>
                <p className="text-gray-600 dark:text-gray-300 text-center text-lg">Aktive Nutzer</p>
              </div>

              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-100 via-indigo-100 to-blue-100 dark:from-purple-900 dark:via-indigo-900 dark:to-blue-900 rounded-full flex items-center justify-center shadow-inner">
                    <Library className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-center mb-3 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">5000+</h3>
                <p className="text-gray-600 dark:text-gray-300 text-center text-lg">Lernmaterialien</p>
              </div>

              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-100 via-indigo-100 to-blue-100 dark:from-purple-900 dark:via-indigo-900 dark:to-blue-900 rounded-full flex items-center justify-center shadow-inner">
                    <Trophy className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-center mb-3 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">10k+</h3>
                <p className="text-gray-600 dark:text-gray-300 text-center text-lg">Erfolgreiche Lernziele</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
