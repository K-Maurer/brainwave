
import React from 'react';

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

interface QuizProps {
  questions: QuizQuestion[];
}

export function Quiz({ questions }: QuizProps) {
  return (
    <div className="space-y-6">
      {questions?.map((q, i) => (
        <div key={i} className="space-y-2">
          <h3 className="font-medium">{q.question}</h3>
          <div className="space-y-1">
            {q.options.map((option, j) => (
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
}
