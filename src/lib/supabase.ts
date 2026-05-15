// Supabase a été remplacé par @vercel/postgres.
// Ce fichier est conservé pour éviter les erreurs d'import résiduels.
export function createServerClient(): never {
  throw new Error('Supabase supprimé — utiliser @vercel/postgres via src/lib/db.ts')
}
export function getSupabase(): never {
  throw new Error('Supabase supprimé — utiliser @vercel/postgres via src/lib/db.ts')
}
export const supabase = getSupabase
