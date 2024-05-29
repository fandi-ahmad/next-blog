"use client"
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import NotFound from "@/app/not-found";
import { useGlobalState } from "@/lib/state";
import ProfileData from "./ProfileData";
import LoadingData from "@/components/LoadingData";

type typeDataUser = {
  id: number,
  id_suth: string,
  username: string,
  email: string,
  created_at: string,
}

export default function Username() {
  const { username } = useParams()
  const supabase = createClient()
  const [dataUser, setDataUser] = useState<typeDataUser>()
  const [isShowNavbar, setIsShowNavbar] = useGlobalState('isShowNavbar')
  const [isShowLoading, setIsShowLoading] = useGlobalState('isShowLoading')

  const getUserByUsername = async () => {
    const { data: users, error } = await supabase
    .from('users')
    .select('*')
    .eq('username', username)

    if (users) {
      setDataUser(users[0])
    }
  }

  useEffect(() => {
    getUserByUsername()
  }, [])

  useEffect(() => {
    if (dataUser) {
      setIsShowNavbar(true)
    } else {
      setIsShowLoading(false)
    }
  }, [isShowNavbar, dataUser])

  return (
    <div>
      {isShowLoading ? <LoadingData/> : null}
      {dataUser ? <ProfileData/> : <NotFound/>}
    </div>
  )
}