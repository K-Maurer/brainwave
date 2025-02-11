
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Funktion zum Extrahieren des JSON aus der Antwort
function extractJSON(text: string): string {
  // Versuche, JSON-Objekt aus dem Text zu extrahieren
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Kein JSON in der Antwort gefunden');
  }
  return jsonMatch[0];
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { documentId, content } = await req.json()
    
    if (!documentId || !content) {
      return new Response(
        JSON.stringify({ error: 'Document ID and content are required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    const perplexityApiKey = Deno.env.get('PERPLEXITY_API_KEY')
    if (!perplexityApiKey) {
      console.error('Perplexity API key is not set')
      return new Response(
        JSON.stringify({ error: 'Perplexity API key is not configured' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      )
    }

    // Create Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get authentication details
    const authHeader = req.headers.get('Authorization')?.split('Bearer ')[1]
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'No authorization header' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
      )
    }

    // Verify user
    const { data: { user }, error: userError } = await supabase.auth.getUser(authHeader)
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
      )
    }

    console.log('Calling Perplexity API...')

    try {
      // Analyze document with Perplexity
      const perplexityResponse = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${perplexityApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.1-sonar-small-128k-online',
          messages: [
            {
              role: 'system',
              content: `Analysiere den folgenden Text und erstelle ein JSON-Objekt mit folgenden Eigenschaften:
              {
                "tags": ["tag1", "tag2", ...] (maximal 5 relevante Tags),
                "category": "Eine Kategorie (z.B. Mathematik, Physik, Geschichte)",
                "difficulty_level": "Schwierigkeitsgrad (beginner, intermediate, advanced)",
                "learning_type": "Bevorzugter Lerntyp (text, visual, audio, practical)"
              }
              
              Antworte NUR mit dem JSON-Objekt, ohne zusätzlichen Text.`
            },
            {
              role: 'user',
              content: content
            }
          ],
          temperature: 0.2,
          max_tokens: 1000
        })
      })

      if (!perplexityResponse.ok) {
        const errorData = await perplexityResponse.text()
        console.error('Perplexity API error:', errorData)
        throw new Error(`Perplexity API error: ${errorData}`)
      }

      const analysis = await perplexityResponse.json()
      console.log('Perplexity API response:', analysis)

      if (!analysis.choices?.[0]?.message?.content) {
        throw new Error('Invalid response format from Perplexity')
      }

      // Extrahiere das JSON aus der Antwort
      const jsonContent = extractJSON(analysis.choices[0].message.content);
      console.log('Extracted JSON:', jsonContent);
      const result = JSON.parse(jsonContent);

      // Update document with analysis results
      const { error: updateError } = await supabase
        .from('documents')
        .update({
          tags: result.tags,
          category: result.category,
          difficulty_level: result.difficulty_level,
          learning_type: result.learning_type
        })
        .eq('id', documentId)
        .eq('owner_id', user.id)

      if (updateError) {
        throw new Error('Failed to update document with analysis results')
      }

      return new Response(
        JSON.stringify({ 
          message: 'Document analyzed successfully',
          analysis: result
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )

    } catch (perplexityError) {
      console.error('Perplexity API call failed:', perplexityError)
      throw new Error(`Perplexity API call failed: ${perplexityError.message}`)
    }

  } catch (error) {
    console.error('Error in analyze-document function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
