"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { createClient } from "@/db/supabase/client"

import { ChangePassword } from "./form"

const isLocalDataMode = process.env.NEXT_PUBLIC_USE_LOCAL_DATA === "true"

export default function ChangePasswordPage() {
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (isLocalDataMode) {
      router.replace("/")
      return
    }

    const supabase = createClient()
    ;(async () => {
      const session = (await supabase.auth.getSession()).data.session

      if (!session) {
        router.push("/login")
      } else {
        setLoading(false)
      }
    })()
  }, [router])

  if (loading) {
    return null
  }

  return <ChangePassword />
}
