"use client"
import { useRouter } from "next/navigation"

interface navbarMenuProps {
  href: string,
  text: string,
  className?: string,
}

export default function NavbarMenu(props: navbarMenuProps) {
  const router = useRouter()
  return (
    <span onClick={() => router.push(props.href)} className={`${props.className} ms-4 sm:ms-6 cursor-pointer font-medium hover:text-gray-600`}>
      {props.text}
    </span>
  )
}