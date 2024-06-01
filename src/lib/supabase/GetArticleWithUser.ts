import Supabase from "./SupabaseConfig"

export const GetArticleWithUser = async () => {
  let { data: articles, error: articlesError } = await Supabase
    .from('articles')
    .select('*')

  if (articlesError) {
    return articlesError
  }

  // Mendapatkan semua id_user dari tabel articles
  const userIds: any = articles?.map(article => article.id_user)

  // Mendapatkan data users berdasarkan id_user dari tabel articles
  let { data: users, error: usersError } = await Supabase
    .from('users')
    .select('id, username')
    .in('id', userIds)

  if (usersError) {
    return usersError
  }

  // Menggabungkan data articles dengan data users
  const articlesWithUsers = articles?.map(article => {
    return {
      ...article,
      user: users?.find(user => user.id === article.id_user)
    }
  })

  return articlesWithUsers
}