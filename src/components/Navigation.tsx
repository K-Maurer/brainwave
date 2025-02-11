
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
          <Link to="/" className="mr-6 flex items-center space-x-3">
            <img 
              src="/lovable-uploads/4ec65eac-403b-498b-9880-28bb854b37c6.png" 
              alt="Brainwave Logo" 
              className="h-9 w-9"
            />
            <span className="hidden font-bold text-xl bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent dark:from-white dark:to-blue-400 sm:inline-block">
              Brainwave
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center space-x-2">
            <Button asChild variant="ghost" className="hover:bg-blue-50 dark:hover:bg-blue-900/50">
              <Link to="/" className="flex items-center space-x-2">
                <BookOpen className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span>Lernen</span>
              </Link>
            </Button>
            <Button asChild variant="ghost" className="hover:bg-blue-50 dark:hover:bg-blue-900/50">
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
              className="hover:bg-red-50 dark:hover:bg-red-900/50"
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
