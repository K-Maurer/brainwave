
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Flashcard {
  front: string;
  back: string;
}

interface FlashcardsProps {
  flashcards: Flashcard[];
}

export function Flashcards({ flashcards }: FlashcardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {flashcards?.map((card, i) => (
        <Card key={i} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg">{card.front}</CardTitle>
          </CardHeader>
          <CardContent className="bg-gray-50 dark:bg-gray-800/50">
            {card.back}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
