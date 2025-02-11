
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AILearningTools } from "@/components/AILearningTools";
import { DocumentDetails } from "./DocumentDetails";
import { Document } from "@/types/document";

interface DocumentContentProps {
  document: Document;
  documentContent: string;
}

export function DocumentContent({ document, documentContent }: DocumentContentProps) {
  return (
    <Tabs defaultValue="details" className="space-y-6">
      <TabsList className="glass-card">
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="learning">Lernhilfen</TabsTrigger>
      </TabsList>

      <TabsContent value="details" className="animate-fade-in">
        <DocumentDetails document={document} />
      </TabsContent>

      <TabsContent value="learning" className="animate-fade-in">
        <AILearningTools
          documentId={document.id}
          documentText={documentContent}
        />
      </TabsContent>
    </Tabs>
  );
}
