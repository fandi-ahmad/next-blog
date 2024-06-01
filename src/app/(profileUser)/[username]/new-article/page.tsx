"use client"
import { createClient } from "@/lib/supabase/client"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import FormInput from "../../(components)/FormInput"
import { useGlobalState } from "@/lib/state"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function NewArticle() {
  const supabase = createClient()
  const componentClient = createClientComponentClient()
  const router = useRouter()

  const [thumbnailUpload, setThumbnailUpload] = useGlobalState('thumbnailUpload')
  const [thumbnailBlob, setThumbnailBlob] = useGlobalState('thumbnailBlob')

  const [idUser, setIdUser] = useGlobalState('idUser')
  const [headPost, setHeadPost] = useGlobalState('headPost')
  const [bodyPost, setBodyPost] = useGlobalState('bodyPost')
  const [label, setLabel] = useGlobalState('labelPost')

  const [isDisabledBtn, setIsDisabledBtn] = useState<boolean>(false)

  const createThumbnail = async () => {
    const { data, error } = await componentClient.storage
    .from('thumbnails')
    .upload(new Date().getTime() + '-' + thumbnailUpload.name, thumbnailUpload);

    interface resultType {
      fullPath?: string,
      id?: string,
      path?: string,
    }

    const result: null | resultType = data
    return result?.fullPath
  }

  const createNewArticle = async () => {
    setIsDisabledBtn(true)
    const thumbnailPath = await createThumbnail()
    
    const { data, error } = await supabase
    .from('articles')
    .insert([{
      id_user: idUser,
      head_post: headPost,
      body_post: bodyPost,
      label: label,
      thumbnail: thumbnailPath,
    }])
    .select()

    if (!error) {
      router.push('/')
      setThumbnailBlob('/blank-thumbnail.webp')
    }
    setIsDisabledBtn(false)
  }

  return (
    <div className="mt-10">
      <FormInput textButton="Post new article" disabledBtn={isDisabledBtn} action={createNewArticle} />
    </div>
  )
}