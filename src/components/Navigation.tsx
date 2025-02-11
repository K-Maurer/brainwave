
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/AuthProvider";
import { Link } from "react-router-dom";
import { Upload, BookOpen, LogOut } from "lucide-react";
import { useState, useEffect } from "react";

export function Navigation() {
  const { user, signOut } = useAuth();
  const [scrolled, setScrolled] = useState(false);

  // Scroll-Handler für Farbänderung
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full border-b border-white/10 transition-all duration-300 ${
      scrolled 
        ? 'bg-gray-900/95 backdrop-blur-xl shadow-lg shadow-black/20' 
        : 'bg-gradient-to-b from-gray-900/90 to-gray-800/80 backdrop-blur-lg'
    }`}>
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link 
            to="/" 
            className="mr-6 flex items-center space-x-3 group relative"
          >
            <div className="relative">
              <img 
                src="/lovable-uploads/4ec65eac-403b-498b-9880-28bb854b37c6.png" 
                alt="Brainwave Logo" 
                className="h-9 w-9 transition-transform duration-300 group-hover:scale-110 relative z-10"
              />
              {/* Verbesserter Logo Glow Effekt */}
              <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full scale-150 animate-pulse-slow opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            <div className="hidden sm:flex flex-col items-start relative">
              <span className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-blue-400">
                Brainwave
              </span>
              <span className="text-xs text-blue-200/70">
                Intelligentes Lernen
              </span>
              {/* Dynamische Unterstreichung */}
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-300 group-hover:w-full transition-all duration-300"></div>
            </div>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center space-x-2">
            <Button 
              asChild 
              variant="ghost" 
              className="relative group px-4 py-2 hover:bg-transparent"
            >
              <Link to="/" className="flex items-center space-x-2">
                <BookOpen className="h-4 w-4 text-blue-300 group-hover:text-blue-400 transition-colors" />
                <span className="text-gray-200 group-hover:text-white transition-colors">Lernen</span>
                {/* Hover Effekt Hintergrund */}
                <div className="absolute inset-0 rounded-lg bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                {/* Hover Effekt Border */}
                <div className="absolute inset-0 rounded-lg border border-blue-500/20 group-hover:border-blue-400/50 transition-colors duration-300"></div>
              </Link>
            </Button>
            <Button 
              asChild 
              variant="ghost" 
              className="relative group px-4 py-2 hover:bg-transparent"
            >
              <Link to="/upload" className="flex items-center space-x-2">
                <Upload className="h-4 w-4 text-blue-300 group-hover:text-blue-400 transition-colors" />
                <span className="text-gray-200 group-hover:text-white transition-colors">Hochladen</span>
                {/* Hover Effekt Hintergrund */}
                <div className="absolute inset-0 rounded-lg bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                {/* Hover Effekt Border */}
                <div className="absolute inset-0 rounded-lg border border-blue-500/20 group-hover:border-blue-400/50 transition-colors duration-300"></div>
              </Link>
            </Button>
          </nav>
          <div className="flex items-center space-x-4">
            <span className="hidden text-sm text-gray-400 md:block">
              {user?.email}
            </span>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={signOut}
              className="relative group hover:bg-transparent"
            >
              <LogOut className="h-4 w-4 text-red-400 group-hover:text-red-300 transition-colors" />
              <span className="sr-only">Abmelden</span>
              {/* Hover Effekt für Logout */}
              <div className="absolute inset-0 rounded-lg bg-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 rounded-lg border border-red-500/20 group-hover:border-red-400/50 transition-colors duration-300"></div>
            </Button>
          </div>
        </div>
      </div>
      {/* Unterer Schatten/Glow Effekt */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
    </header>
  );
}
