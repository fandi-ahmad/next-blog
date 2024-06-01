"use client"
import Link from "next/link"

interface navbarMenuProps {
  href: string,
  text: string,
  className?: string,
}

export default function NavbarMenu(props: navbarMenuProps) {
  return (
    <Link href={props.href} className={`${props.className} ms-4 sm:ms-6 cursor-pointer font-medium hover:text-gray-600`}>
      {props.text}
    </Link>
  )
}