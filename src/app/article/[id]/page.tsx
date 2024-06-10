"use client"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { AccessTime, AccountCircle, LocalOffer } from "@mui/icons-material"
import { DateFormat } from "@/utils/DateFormat"

export default function ArticleId() {
  const { id } = useParams()
  const supabase = createClient()

  const [headPost, setHeadPost] = useState<string>('')
  const [bodyPost, setBodyPost] = useState<string>('')
  const [label, setLabel] = useState<string>('')
  const [createdAt, setCreatedAt] = useState<string>('')
  const [username, setUsername] = useState<string>('')

  const getArticleById = async () => {
    let { data: articles, error } = await supabase
    .from('articles')
    .select("*")
    .eq('id', id).maybeSingle()

    if (articles) {
      setHeadPost(articles.head_post)
      setBodyPost(articles.body_post)
      setLabel(articles.label)
      setCreatedAt(articles.created_at)
      getUserByUserId(articles.id_user)
    }
  }

  const getUserByUserId = async (id: string | number) => {
    let { data, error } = await supabase
    .from('users')
    .select("*")
    .eq('id', id).maybeSingle()

    if (data) {
      setUsername(data.username)
    }
  }

  useEffect(() => {
    getArticleById()
  }, [])

  return (
    <main className="mt-10">
      <h2 className="text-2xl sm:text-4xl lg:text-5xl font-semibold mb-1">{headPost}</h2>

      <div className="text-xs mt-2 flex flex-row mb-4 sm:mb-6">
        <div>
          <AccessTime fontSize="small" />
          <span className="ps-1 my-auto">{DateFormat(createdAt)}</span>
        </div>
        <div className="ps-4">
          <AccountCircle fontSize="small" />
          <span className="ps-1 my-auto">{username}</span>
        </div>
        <div className="ps-4">
          <LocalOffer fontSize="small" />
          <span className="ps-1 my-auto">{label}</span>
        </div>
      </div>
      
      <p className="mb-4 text-sm sm:text-base">{bodyPost}</p>
    </main>
  )
}