
import React from 'react';
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface GenerateButtonProps {
  isGenerating: boolean;
  onClick: () => void;
}

export function GenerateButton({ isGenerating, onClick }: GenerateButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={isGenerating}
      className="w-full mb-4"
    >
      {isGenerating ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generiere Inhalte...
        </>
      ) : (
        'Neue Inhalte generieren'
      )}
    </Button>
  );
}
