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
      getDataUser(user.id)
    }
  }

  const getDataUser = async (id: string) => {
    const { data: users } = await supabase
      .from('users')
      .select('*').eq('id_auth', id)
  
    users ? setUsernameLogin(users[0].username) : null
  }

  useEffect(() => {
    getDataAuth()
  }, [])

  return (
    <></>
  )
}