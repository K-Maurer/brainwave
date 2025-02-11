
import { createClient } from '@supabase/supabase-js'
import { Database } from './types'

const supabaseUrl = 'https://xaxugthzwjaafuzamibn.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhheHVndGh6d2phYWZ1emFtaWJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkyOTkxMDgsImV4cCI6MjA1NDg3NTEwOH0.YHwp-1cJtloctICO9Cr3x2_ZtLavJ2IpnRDqZLG06No'

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)
