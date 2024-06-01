"use client"
import { useGlobalState } from "@/lib/state";
import { useEffect } from "react";

export default function NavbarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isShowNavbar, setIsShowNavbar] = useGlobalState('isShowNavbar')

  useEffect(() => {
    setIsShowNavbar(true)
  }, [])

  return (
    <div>{isShowNavbar ? children : null}</div>
  )
}