"use client"
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CheckUser() {
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    const checkUserLogin = async () => {
      const {data: { user } } = await supabase.auth.getUser();
  
      if (user) {
        router.push("/")
      }
    }
    checkUserLogin()
  }, [])

  return (<></>)
}