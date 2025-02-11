
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Branch {
  topic: string;
  subtopics: string[];
}

interface MindmapProps {
  central: string;
  branches: Branch[];
}

export function Mindmap({ central, branches }: MindmapProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-center">{central}</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {branches?.map((branch, i) => (
          <Card key={i} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg">{branch.topic}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-1">
                {branch.subtopics.map((subtopic, j) => (
                  <li key={j}>{subtopic}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
