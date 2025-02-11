
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function WelcomeScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900">
      <Card className="w-full max-w-md bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-none shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Willkommen bei LernPlattform
          </CardTitle>
          <CardDescription className="text-center">
            Bitte melden Sie sich an, um Ihre Lernmaterialien zu sehen.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Button asChild>
            <Link to="/auth">Anmelden</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
