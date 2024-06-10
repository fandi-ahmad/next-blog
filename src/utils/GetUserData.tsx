"use client"
import { useGlobalState } from "@/lib/state"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

// in Navbar component
export default function GetUserData() {
  const supabase = createClient()
  const [dataAuth, setDataAuth] = useState()
  const [usernameLogin, setUsernameLogin] = useGlobalState('usernameLogin')

  const getDataAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setDataAuth(dataAuth)
      if (user.email) {
        getDataUser(user.id, user.email)
      }
    }
  }

  const getDataUser = async (id: string, email: string) => {
    const { data: users } = await supabase
      .from('users')
      .select('*').eq('id_auth', id).maybeSingle()
  
    if (users) {
      setUsernameLogin(users.username)
    } else {
      const username = email.split("@")[0];
      setUsernameLogin(username)
      const { data, error } = await supabase
      .from('users')
      .insert([{
        email: email,
        username: username,
        id_auth: id,
      }])
      .select()
    }
  }

  useEffect(() => {
    getDataAuth()
  }, [])

  return (
    <></>
  )
}