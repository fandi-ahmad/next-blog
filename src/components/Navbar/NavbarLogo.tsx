"use client"
import Image from "next/image"
import Link from "next/link"

export default function NavbarLogo() {
  return (
    <Link href={'/'} className="flex justify-center items-center cursor-pointer">
      <Image src={'/vercel_logo.svg'} alt="vercel logo" width={40} height={40} priority />
      <span className="lg:text-2xl font-bold ps-2">NextWrite</span>
    </Link>
  )
}