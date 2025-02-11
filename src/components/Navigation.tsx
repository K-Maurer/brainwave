
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/AuthProvider";
import { Link } from "react-router-dom";
import { Upload, BookOpen, LogOut } from "lucide-react";

export function Navigation() {
  const { user, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <BookOpen className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">
              LernPlattform
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center space-x-2">
            <Button asChild variant="ghost">
              <Link to="/">
                <BookOpen className="h-4 w-4 mr-2" />
                Lernen
              </Link>
            </Button>
            <Button asChild variant="ghost">
              <Link to="/upload">
                <Upload className="h-4 w-4 mr-2" />
                Hochladen
              </Link>
            </Button>
          </nav>
          <div className="flex items-center space-x-4">
            <span className="hidden text-sm text-muted-foreground md:block">
              {user?.email}
            </span>
            <Button variant="ghost" size="icon" onClick={signOut}>
              <LogOut className="h-4 w-4" />
              <span className="sr-only">Abmelden</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
