"use client"
import { useGlobalState } from "@/lib/state"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function NotFound() {
  const [isShowNavbar, setIsShowNavbar] = useGlobalState('isShowNavbar')
  const router = useRouter()

  const goHomeLink = () => {
    setIsShowNavbar(true)
    router.push('/')
  }

  useEffect(() => {
    setIsShowNavbar(false)
  }, [])

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold">404</h1>
        <p>This page is not found</p>
        <p>
          Back to <span onClick={goHomeLink} className="cursor-pointer text-blue-600 hover:underline">Home</span>
        </p>
      </div>
    </div>
  )
}