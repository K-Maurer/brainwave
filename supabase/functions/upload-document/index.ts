
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const formData = await req.formData()
    const file = formData.get('file')
    const title = formData.get('title')
    const description = formData.get('description')
    const category = formData.get('category')
    const tags = formData.get('tags')
    const learningType = formData.get('learning_type')
    const difficultyLevel = formData.get('difficulty_level')

    if (!file || !title) {
      return new Response(
        JSON.stringify({ error: 'File and title are required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    // Create Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get user ID from the authorization header
    const authHeader = req.headers.get('Authorization')?.split('Bearer ')[1]
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'No authorization header' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
      )
    }

    const { data: { user }, error: userError } = await supabase.auth.getUser(authHeader)
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
      )
    }

    // Sanitize filename and get extension
    const fileName = (file as File).name.replace(/[^\x00-\x7F]/g, '')
    const fileExt = fileName.split('.').pop()
    const filePath = `${user.id}/${crypto.randomUUID()}.${fileExt}`

    // Convert File to ArrayBuffer for upload
    const fileArrayBuffer = await (file as File).arrayBuffer()

    // Upload file to storage
    const { data: storageData, error: storageError } = await supabase.storage
      .from('documents')
      .upload(filePath, fileArrayBuffer, {
        contentType: (file as File).type,
        upsert: false
      })

    if (storageError) {
      console.error('Storage error:', storageError)
      return new Response(
        JSON.stringify({ error: 'Failed to upload file', details: storageError }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      )
    }

    // Process tags if provided
    const tagArray = tags ? tags.toString().split(',').map(tag => tag.trim()) : null

    // Create document record in database
    const { data: documentData, error: documentError } = await supabase
      .from('documents')
      .insert({
        title: title,
        description: description || null,
        file_path: filePath,
        file_type: (file as File).type,
        owner_id: user.id,
        category: category || null,
        tags: tagArray,
        learning_type: learningType || null,
        difficulty_level: difficultyLevel || null,
        view_count: 0,
      })
      .select()
      .single()

    if (documentError) {
      console.error('Database error:', documentError)
      // Clean up the uploaded file if database insert fails
      await supabase.storage.from('documents').remove([filePath])
      return new Response(
        JSON.stringify({ error: 'Failed to create document record', details: documentError }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      )
    }

    // Return success response with the document data
    return new Response(
      JSON.stringify({ 
        message: 'Document uploaded successfully', 
        document: documentData,
        storage: storageData
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )
  } catch (error) {
    console.error('Unexpected error:', error)
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred', details: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
