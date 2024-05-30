"use client"
import { createClient } from "@/lib/supabase/client"
import { useGlobalState } from "@/lib/state"
import { useEffect, useState } from "react"
import { Button, TextField, TextareaAutosize } from "@mui/material"
import { useRouter } from "next/navigation"

export default function NewArticle() {
  const supabase = createClient()
  const router = useRouter()
  const [usernameLogin, setUsernameLogin] = useGlobalState('usernameLogin')
  const [idUser, setIdUser] = useState<number>()
  const [isDisabledBtn, setIsDisabledBtn] = useState<boolean>(false)

  const [headPost, setHeadPost] = useState<string>('')
  const [bodyPost, setBodyPost] = useState<string>('')
  const [label, setLabel] = useState<string>('')

  const getUserByUsername = async () => {
    const { data: users, error } = await supabase
    .from('users')
    .select('*').eq('username', usernameLogin).maybeSingle()

    users.id ? setIdUser(users.id) : null
  }

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

  useEffect(() => {
    if (usernameLogin) {
      getUserByUsername()
    }
  }, [usernameLogin])

  return (
    <div className="mt-10">
      <form action={createNewArticle}>
        <div>
          <TextField required label='Title Head' className="w-full mb-4" onChange={(e) => setHeadPost(e.target.value)} />
          <textarea required placeholder="Text Body"
            className="border border-1 border-gray-400 hover:border-gray-600 target:border-blue-500 outline-none rounded-md w-full py-2 px-4 mb-4"
            onChange={(e) => setBodyPost(e.target.value)}
          ></textarea>
          <TextField required label='Label' className="mb-4 mt-6" onChange={(e) => setLabel(e.target.value)} />
        </div>
        <div className="flex justify-end w-full mb-6">
          <Button type="submit" className="capitalize" variant="outlined" disabled={isDisabledBtn}>Post new article</Button>
        </div>
      </form>

    </div>
  )
}