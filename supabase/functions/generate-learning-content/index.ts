
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import OpenAI from "https://esm.sh/openai@4.20.1";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface RequestBody {
  documentId: string;
  contentType: 'summary' | 'quiz' | 'flashcards' | 'mindmap';
  text: string;
}

const generatePrompt = (contentType: RequestBody['contentType'], text: string): string => {
  const prompts = {
    summary: `Als Bildungsexperte, erstelle eine klar strukturierte Zusammenfassung des folgenden Textes. 
    Fokussiere auf die wichtigsten Konzepte und organisiere sie in Hauptpunkte und relevante Unterpunkte.
    Stelle sicher, dass die Zusammenfassung leicht verständlich und logisch aufgebaut ist.\n\n${text}`,
    
    quiz: `Als Pädagoge, erstelle 5 lehrreiche Multiple-Choice-Fragen zum folgenden Text.
    Die Fragen sollen verschiedene kognitive Ebenen (Verstehen, Anwenden, Analysieren) abdecken.
    Formatiere die Ausgabe als JSON mit folgendem Schema:
    {
      "questions": [
        {
          "question": "Die Frage",
          "options": ["Option A", "Option B", "Option C", "Option D"],
          "correctAnswer": 0,
          "explanation": "Kurze Erklärung der richtigen Antwort"
        }
      ]
    }\n\n${text}`,
    
    flashcards: `Als Lernexperte, erstelle 5 effektive Lernkarten basierend auf dem Text.
    Jede Karte sollte ein wichtiges Konzept oder eine zentrale Information behandeln.
    Formatiere die Ausgabe als JSON mit folgendem Schema:
    {
      "flashcards": [
        {
          "front": "Frage oder Konzept",
          "back": "Detaillierte Erklärung oder Antwort"
        }
      ]
    }\n\n${text}`,
    
    mindmap: `Als Wissensvermittler, erstelle eine intuitive Mindmap-Struktur für den folgenden Text.
    Identifiziere das zentrale Thema und organisiere die Hauptideen mit ihren Verbindungen.
    Formatiere die Ausgabe als JSON mit folgendem Schema:
    {
      "central": "Hauptthema",
      "branches": [
        {
          "topic": "Hauptzweig",
          "subtopics": ["Unterthema 1", "Unterthema 2"]
        }
      ]
    }\n\n${text}`
  };

  return prompts[contentType];
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openaiApiKey) {
      console.error('OpenAI API key is not configured');
      throw new Error('OpenAI API key is not configured');
    }

    const openai = new OpenAI({
      apiKey: openaiApiKey,
    });

    const { documentId, contentType, text } = await req.json() as RequestBody;
    if (!documentId || !contentType || !text) {
      throw new Error('Fehlende erforderliche Parameter');
    }

    const authHeader = req.headers.get('Authorization')!;
    const user = await supabaseClient.auth.getUser(authHeader.replace('Bearer ', ''));

    if (!user.data.user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log(`Generating ${contentType} for document ${documentId}`);
    
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "Du bist ein erfahrener Bildungsexperte mit Fokus auf effektive Wissensvermittlung. Deine Aufgabe ist es, Lerninhalte so aufzubereiten, dass sie optimal zum Verständnis und zur Merkfähigkeit beitragen."
          },
          {
            role: "user",
            content: generatePrompt(contentType, text)
          }
        ],
        temperature: 0.7,
      });

      const generatedContent = completion.choices[0].message.content;
      if (!generatedContent) {
        throw new Error('Keine Inhalte generiert');
      }

      let parsedContent;
      try {
        parsedContent = JSON.parse(generatedContent);
      } catch (parseError) {
        console.log('Parsing als JSON fehlgeschlagen, verwende Rohtext:', parseError);
        parsedContent = { content: generatedContent };
      }

      console.log('Content generated successfully');

      const { data: savedContent, error: dbError } = await supabaseClient
        .from('ai_generated_content')
        .insert({
          user_id: user.data.user.id,
          document_id: documentId,
          content_type: contentType,
          title: `${contentType.charAt(0).toUpperCase() + contentType.slice(1)} - ${new Date().toLocaleString()}`,
          content: parsedContent
        })
        .select()
        .single();

      if (dbError) {
        console.error('Database error:', dbError);
        throw dbError;
      }

      // Aktualisiere die Lernstatistiken
      const { error: metricsError } = await supabaseClient
        .from('learning_metrics')
        .upsert({
          user_id: user.data.user.id,
          document_id: documentId,
          study_time_minutes: 5, // Standardwert für die Generierung von Lernmaterial
          focus_score: 8, // Hoher Fokus-Score für aktives Lernen
          understanding_level: 7, // Gutes Verständnisniveau durch Materialerstellung
          last_interaction: new Date().toISOString()
        }, {
          onConflict: 'user_id,document_id'
        });

      if (metricsError) {
        console.error('Metrics update error:', metricsError);
      }

      return new Response(
        JSON.stringify(savedContent),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );

    } catch (aiError) {
      console.error('OpenAI API error:', aiError);
      throw new Error(`Fehler bei der Generierung: ${aiError.message}`);
    }

  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.cause || 'Keine weiteren Details verfügbar'
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
