
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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

    // Analyze document with OpenAI
    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `Du bist ein KI-Assistent für eine Lernplattform. Analysiere den folgenden Text und erstelle:
            1. Eine Liste von relevanten Tags (maximal 5)
            2. Eine Kategorie (z.B. Mathematik, Physik, Geschichte, etc.)
            3. Eine Einschätzung des Schwierigkeitsgrads (beginner, intermediate, advanced)
            4. Den am besten geeigneten Lerntyp (text, visual, audio, practical)
            
            Antworte im JSON-Format:
            {
              "tags": ["tag1", "tag2", ...],
              "category": "Kategorie",
              "difficulty_level": "Schwierigkeitsgrad",
              "learning_type": "Lerntyp"
            }`
          },
          {
            role: 'user',
            content: content
          }
        ]
      })
    })

    if (!openAIResponse.ok) {
      throw new Error('Failed to analyze document with OpenAI')
    }

    const analysis = await openAIResponse.json()
    const result = JSON.parse(analysis.choices[0].message.content)

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

  } catch (error) {
    console.error('Error in analyze-document function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
