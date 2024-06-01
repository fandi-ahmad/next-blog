"use client"
import FormInput from "@/app/(profileUser)/(components)/FormInput"
import { useState, useEffect } from "react"
import { useGlobalState } from "@/lib/state"
import { createClient } from "@/lib/supabase/client"
import { useParams, useRouter } from "next/navigation"

export default function EditArticle() {
  const supabase = createClient()
  const [isDisabledBtn, setIsDisabledBtn] = useState<boolean>(false)
  const { id_article } = useParams()
  const router = useRouter()

  const [usernameLogin, setUsernameLogin] = useGlobalState('usernameLogin')
  const [headPost, setHeadPost] = useGlobalState('headPost')
  const [bodyPost, setBodyPost] = useGlobalState('bodyPost')
  const [labelPost, setLabelPost] = useGlobalState('labelPost')

  const getArticleById = async () => {
    const { data: articles } = await supabase
    .from('articles')
    .select('*')
    .eq('id', id_article).maybeSingle()

    if (articles) {
      setHeadPost(articles.head_post)
      setBodyPost(articles.body_post)
      setLabelPost(articles.label)
    }
  
  }

  const updateArticle = async () => {
    setIsDisabledBtn(true)

    const { error } = await supabase
    .from('articles')
    .update({ head_post: headPost, body_post: bodyPost, label: labelPost })
    .eq('id', id_article)
    .select()

    if (!error) {
      router.push(`/${usernameLogin}`)
    }
    
    setIsDisabledBtn(false)
  }

  useEffect(() => {
    document.getElementById('uploadFileInput')?.classList.add('hidden')
    getArticleById()
  }, [])


  return (
    <div className="mt-10">
      <FormInput textButton="Update this article" disabledBtn={isDisabledBtn} action={updateArticle} />
    </div>
  )
}