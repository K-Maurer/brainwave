
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/AuthProvider";
import { Link } from "react-router-dom";
import { Upload, BookOpen, LogOut } from "lucide-react";

export function Navigation() {
  const { user, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link to="/" className="mr-6 flex items-center space-x-3 group relative">
            <div className="relative">
              <img 
                src="/lovable-uploads/4ec65eac-403b-498b-9880-28bb854b37c6.png" 
                alt="Brainwave Logo" 
                className="h-9 w-9 transition-transform duration-300 group-hover:scale-110 relative z-10"
              />
              {/* Logo Glow Effect */}
              <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full scale-150 animate-pulse-slow opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            <div className="hidden sm:flex flex-col items-start">
              <span className="font-bold text-xl gradient-text bg-gradient-to-r from-gray-900 via-blue-600 to-violet-600 dark:from-white dark:via-blue-400 dark:to-violet-400">
                Brainwave
              </span>
              <span className="text-xs text-muted-foreground">
                Intelligentes Lernen
              </span>
            </div>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center space-x-2">
            <Button 
              asChild 
              variant="ghost" 
              className="hover-lift hover:bg-blue-50 dark:hover:bg-blue-900/50 glass-card"
            >
              <Link to="/" className="flex items-center space-x-2">
                <BookOpen className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span>Lernen</span>
              </Link>
            </Button>
            <Button 
              asChild 
              variant="ghost" 
              className="hover-lift hover:bg-blue-50 dark:hover:bg-blue-900/50 glass-card"
            >
              <Link to="/upload" className="flex items-center space-x-2">
                <Upload className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span>Hochladen</span>
              </Link>
            </Button>
          </nav>
          <div className="flex items-center space-x-4">
            <span className="hidden text-sm text-muted-foreground md:block">
              {user?.email}
            </span>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={signOut}
              className="hover-lift hover:bg-red-50 dark:hover:bg-red-900/50 glass-card"
            >
              <LogOut className="h-4 w-4 text-red-600 dark:text-red-400" />
              <span className="sr-only">Abmelden</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
