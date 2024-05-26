"use client"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function NavbarLogo() {
  const router = useRouter()

  return (
    <div onClick={() => router.push('/')}  className="flex justify-center items-center cursor-pointer">
      <Image src={'vercel_logo.svg'} alt="vercel logo" width={40} height={40} priority />
      <span className="lg:text-2xl font-bold ps-2">NextWrite</span>
    </div>
  )
}