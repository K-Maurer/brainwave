import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, BookOpen, BrainCircuit, Layers, Network } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

interface AILearningToolsProps {
  documentId: string;
  documentText: string;
}

interface AIContent {
  id: string;
  content_type: 'summary' | 'quiz' | 'flashcards' | 'mindmap';
  title: string;
  content: any;
  created_at: string;
}

export function AILearningTools({ documentId, documentText }: AILearningToolsProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<'summary' | 'quiz' | 'flashcards' | 'mindmap'>('summary');
  const { toast } = useToast();

  const { data: aiContent, isLoading, refetch } = useQuery({
    queryKey: ['ai-content', documentId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ai_generated_content')
        .select('*')
        .eq('document_id', documentId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as AIContent[];
    }
  });

  const generateContent = async () => {
    setIsGenerating(true);
    try {
      const response = await supabase.functions.invoke('generate-learning-content', {
        body: {
          documentId,
          contentType: activeTab,
          text: documentText
        }
      });

      if (response.error) throw response.error;

      await refetch();
      toast({
        title: "Inhalt generiert",
        description: `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} wurde erfolgreich erstellt.`,
      });
    } catch (error) {
      console.error('Error generating content:', error);
      toast({
        title: "Fehler",
        description: "Beim Generieren des Inhalts ist ein Fehler aufgetreten.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const renderContent = (content: AIContent) => {
    switch (content.content_type) {
      case 'summary':
        return (
          <div className="prose dark:prose-invert max-w-none">
            {content.content.content}
          </div>
        );
      case 'quiz':
        return (
          <div className="space-y-6">
            {content.content.questions?.map((q: any, i: number) => (
              <div key={i} className="space-y-2">
                <h3 className="font-medium">{q.question}</h3>
                <div className="space-y-1">
                  {q.options.map((option: string, j: number) => (
                    <div
                      key={j}
                      className={`p-2 rounded-lg ${
                        j === q.correctAnswer
                          ? 'bg-green-500/10 border border-green-500/20'
                          : 'bg-gray-100 dark:bg-gray-800'
                      }`}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      case 'flashcards':
        return (
          <div className="grid gap-4 md:grid-cols-2">
            {content.content.flashcards?.map((card: any, i: number) => (
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
      case 'mindmap':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-center">{content.content.central}</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {content.content.branches?.map((branch: any, i: number) => (
                <Card key={i} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{branch.topic}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside space-y-1">
                      {branch.subtopics.map((subtopic: string, j: number) => (
                        <li key={j}>{subtopic}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BrainCircuit className="h-5 w-5 text-blue-500" />
          KI-Lernhilfen
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
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

          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
          ) : (
            <>
              <Button
                onClick={generateContent}
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

              <div className="space-y-6">
                {aiContent
                  ?.filter(content => content.content_type === activeTab)
                  .map(content => (
                    <div key={content.id} className="space-y-4">
                      <p className="text-sm text-gray-500">
                        Erstellt am: {new Date(content.created_at).toLocaleString()}
                      </p>
                      {renderContent(content)}
                    </div>
                  ))
                }
              </div>
            </>
          )}
        </Tabs>
      </CardContent>
    </Card>
  );
}
