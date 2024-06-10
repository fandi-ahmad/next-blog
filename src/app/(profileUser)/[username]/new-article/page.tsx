"use client"
import { createClient } from "@/lib/supabase/client"
import FormInput from "../../(components)/FormInput"
import { useGlobalState } from "@/lib/state"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

export default function NewArticle() {
  const supabase = createClient()
  const router = useRouter()

  const [idUser, setIdUser] = useGlobalState('idUser')
  const [headPost, setHeadPost] = useGlobalState('headPost')
  const [bodyPost, setBodyPost] = useGlobalState('bodyPost')
  const [label, setLabel] = useGlobalState('labelPost')

  const [isDisabledBtn, setIsDisabledBtn] = useState<boolean>(false)

  const chechUser = async () => {
    const {data: { user } } = await supabase.auth.getUser();

    if (!user) {
      router.push('/')
    }
  }

  useEffect(() => {
    chechUser()
  }, [])

  const createNewArticle = async () => {
    setIsDisabledBtn(true)
    
    const { data, error } = await supabase
    .from('articles')
    .insert([{
      id_user: idUser,
      head_post: headPost,
      body_post: bodyPost,
      label: label,
    }])
    .select()

    if (!error) {
      router.push('/')
    }
    setIsDisabledBtn(false)
  }

  return (
    <div className="mt-10">
      <FormInput textButton="Post new article" disabledBtn={isDisabledBtn} action={createNewArticle} />
    </div>
  )
}