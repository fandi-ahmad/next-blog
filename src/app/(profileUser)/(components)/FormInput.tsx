"use client"
import { createClient } from "@/lib/supabase/client"
import { useGlobalState } from "@/lib/state"
import { useEffect } from "react"
import { Button, TextField } from "@mui/material"
import UploadFile from "./UploadFile"

interface formInputType {
  action: any,
  textButton: string,
  disabledBtn?: boolean,
}

export default function FormInput(props: formInputType) {
  const supabase = createClient()

  const [usernameLogin, setUsernameLogin] = useGlobalState('usernameLogin')
  const [idUser, setIdUser] = useGlobalState('idUser')
  const [headPost, setHeadPost] = useGlobalState('headPost')
  const [bodyPost, setBodyPost] = useGlobalState('bodyPost')
  const [label, setLabel] = useGlobalState('labelPost')

  const getUserByUsername = async () => {
    const { data: users, error } = await supabase
    .from('users')
    .select('*').eq('username', usernameLogin).maybeSingle()

    users.id ? setIdUser(users.id) : null
  }

  useEffect(() => {
    if (usernameLogin) {
      getUserByUsername()
    }
  }, [usernameLogin])

  return (
    <div>
      <UploadFile/>
      <form action={props.action}>
        <div>
          <TextField required label='Title Head' className="w-full mb-4" value={headPost} onChange={(e) => setHeadPost(e.target.value)} />
          <textarea required placeholder="Text Body"
            className="border border-1 border-gray-400 hover:border-gray-600 target:border-blue-500 outline-none rounded-md w-full py-2 px-4 mb-4"
            value={bodyPost}
            onChange={(e) => setBodyPost(e.target.value)}
          ></textarea>
          <TextField required label='Label' className="mb-4 mt-6" value={label} onChange={(e) => setLabel(e.target.value)} />
        </div>
        <div className="flex justify-end w-full mb-6">
          <Button type="submit" className="capitalize" variant="outlined" disabled={props.disabledBtn}>
            {props.textButton}
          </Button>
        </div>
      </form>
    </div>
  )
}