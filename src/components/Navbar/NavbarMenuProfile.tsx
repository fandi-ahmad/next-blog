"use client"
import NavbarMenu from "./NavbarMenu"
import { useGlobalState } from "@/lib/state"

interface props {
  user?: any,
}

export default function NavbarMenuProfile(props: props) {
  const [usernameLogin, setUsernameLogin] = useGlobalState('usernameLogin')

  return (
    <NavbarMenu href={props ? `/${usernameLogin}` : '/'} text="Profile" />
  )
}