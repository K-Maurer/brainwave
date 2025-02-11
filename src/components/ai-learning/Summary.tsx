
import React from 'react';

interface SummaryProps {
  content: string;
}

export function Summary({ content }: SummaryProps) {
  return (
    <div className="prose dark:prose-invert max-w-none">
      {content}
    </div>
  );
}
