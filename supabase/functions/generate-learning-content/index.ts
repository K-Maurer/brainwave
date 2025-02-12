
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

    const { documentId, contentType, text } = await req.json() as RequestBody
    if (!documentId || !contentType || !text) {
      throw new Error('Fehlende erforderliche Parameter');
    }

    const authHeader = req.headers.get('Authorization')!
    const user = await supabaseClient.auth.getUser(authHeader.replace('Bearer ', ''))

    if (!user.data.user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    let prompt = ''
    switch (contentType) {
      case 'summary':
        prompt = `Erstelle eine prägnante Zusammenfassung des folgenden Textes, strukturiert mit Hauptpunkten und Unterpunkten:\n\n${text}`
        break
      case 'quiz':
        prompt = `Erstelle 5 Multiple-Choice-Fragen basierend auf dem folgenden Text. Format: JSON mit "questions" Array, jede Frage hat "question", "options" (Array) und "correctAnswer" (Index):\n\n${text}`
        break
      case 'flashcards':
        prompt = `Erstelle 5 Lernkarten basierend auf dem folgenden Text. Format: JSON mit "flashcards" Array, jede Karte hat "front" und "back":\n\n${text}`
        break
      case 'mindmap':
        prompt = `Erstelle eine Mindmap-Struktur basierend auf dem folgenden Text. Format: JSON mit "central" (Hauptthema) und "branches" (Array von Zweigen mit "topic" und "subtopics" Array):\n\n${text}`
        break
      default:
        throw new Error('Ungültiger Content-Typ')
    }

    console.log(`Generating ${contentType} for document ${documentId}`)
    
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini", // Verwende das optimierte Modell
        messages: [
          {
            role: "system",
            content: "Du bist ein Experte für Bildung und Wissensvermittlung. Erstelle hochwertige Lernmaterialien basierend auf dem gegebenen Text."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
      });

      const generatedContent = completion.choices[0].message.content;

      if (!generatedContent) {
        throw new Error('Keine Inhalte generiert')
      }

      let parsedContent
      try {
        parsedContent = JSON.parse(generatedContent)
      } catch (parseError) {
        console.log('Parsing als JSON fehlgeschlagen, verwende Rohtext', parseError);
        parsedContent = { content: generatedContent }
      }

      console.log('Content generated successfully');

      // Speichern des generierten Inhalts in der Datenbank
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
        .single()

      if (dbError) {
        console.error('Database error:', dbError);
        throw dbError;
      }

      return new Response(
        JSON.stringify(savedContent),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )

    } catch (aiError) {
      console.error('OpenAI API error:', aiError);
      throw new Error(`Fehler bei der Generierung: ${aiError.message}`);
    }

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.cause || 'Keine weiteren Details verfügbar'
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})
