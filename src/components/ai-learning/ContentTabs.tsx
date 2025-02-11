
import React from 'react';
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, BrainCircuit, Layers, Network } from "lucide-react";

type TabType = 'summary' | 'quiz' | 'flashcards' | 'mindmap';

interface ContentTabsProps {
  activeTab: TabType;
  onTabChange: (value: TabType) => void;
}

export function ContentTabs({ activeTab, onTabChange }: ContentTabsProps) {
  return (
    <TabsList className="grid grid-cols-4 mb-4">
      <TabsTrigger value="summary" className="flex items-center gap-2">
        <BookOpen className="h-4 w-4" />
        <span className="hidden sm:inline">Zusammenfassung</span>
      </TabsTrigger>
      <TabsTrigger value="quiz" className="flex items-center gap-2">
        <BrainCircuit className="h-4 w-4" />
        <span className="hidden sm:inline">Quiz</span>
      </TabsTrigger>
      <TabsTrigger value="flashcards" className="flex items-center gap-2">
        <Layers className="h-4 w-4" />
        <span className="hidden sm:inline">Lernkarten</span>
      </TabsTrigger>
      <TabsTrigger value="mindmap" className="flex items-center gap-2">
        <Network className="h-4 w-4" />
        <span className="hidden sm:inline">Mindmap</span>
      </TabsTrigger>
    </TabsList>
  );
}
