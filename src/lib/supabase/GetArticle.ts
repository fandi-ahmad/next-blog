import Supabase from "./SupabaseConfig"

export const GetArticle = async () => {
  const result = await Supabase.from('articles').select('*')
  return result
}