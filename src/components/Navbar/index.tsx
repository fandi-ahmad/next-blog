"use client"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function Navbar() {
  const router = useRouter()

  return(
    <nav className="py-4 flex justify-between items-center">
      <div onClick={() => router.push('/')}  className="flex justify-center items-center cursor-pointer">
        <Image src={'vercel_logo.svg'} alt="" width={40} height={40} />
        <span className="lg:text-2xl font-bold ps-2">NextWrite</span>
      </div>
      <div className="text-sm lg:text-base">
        <span onClick={() => router.push('/')} className="cursor-pointer font-semibold hover:text-gray-600">Article</span>
        <span onClick={() => router.push('/login')} className="ms-4 sm:ms-6 cursor-pointer font-semibold hover:text-gray-600">Login</span>
      </div>
    </nav>
  )
}