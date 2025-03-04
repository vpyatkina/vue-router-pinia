import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://bhxeuwqnedqdmizpjkel.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJoeGV1d3FuZWRxZG1penBqa2VsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEwMDc1NjUsImV4cCI6MjA1NjU4MzU2NX0.i6jJk7lZK-5FouK0x7wfYIT9_uU8G4eHeQq0jbbfics',
)
