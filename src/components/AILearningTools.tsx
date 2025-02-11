
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, BrainCircuit } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Summary } from './ai-learning/Summary';
import { Quiz } from './ai-learning/Quiz';
import { Flashcards } from './ai-learning/Flashcards';
import { Mindmap } from './ai-learning/Mindmap';
import { ContentTabs } from './ai-learning/ContentTabs';
import { GenerateButton } from './ai-learning/GenerateButton';

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
        return <Summary content={content.content.content} />;
      case 'quiz':
        return <Quiz questions={content.content.questions} />;
      case 'flashcards':
        return <Flashcards flashcards={content.content.flashcards} />;
      case 'mindmap':
        return <Mindmap central={content.content.central} branches={content.content.branches} />;
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
          <ContentTabs activeTab={activeTab} onTabChange={setActiveTab} />

          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
          ) : (
            <>
              <GenerateButton isGenerating={isGenerating} onClick={generateContent} />

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
