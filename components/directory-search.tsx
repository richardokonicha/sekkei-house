"use client"

import { useEffect, useState, useTransition } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Search } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"

import { cn } from "@/lib/utils"

export function DirectorySearch() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const shouldReduceMotion = useReducedMotion()
  const [isPending, startTransition] = useTransition()
  const [mounted, setMounted] = useState(false)
  const currentSearch = searchParams.get("search") ?? ""
  const [value, setValue] = useState(currentSearch)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    setValue(currentSearch)
  }, [currentSearch])

  useEffect(() => {
    const trimmed = value.trim()
    if (trimmed === currentSearch) return
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(window.location.search)
      if (trimmed) params.set("search", trimmed)
      else params.delete("search")
      startTransition(() => {
        router.replace(`${pathname}${params.toString() ? `?${params.toString()}` : ""}`, { scroll: false })
      })
    }, 300)
    return () => clearTimeout(timeout)
  }, [value, currentSearch, pathname, router])

  const motionProps = !mounted || shouldReduceMotion ? {} : { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.3, delay: 0.08, ease: [0.22, 1, 0.36, 1] } }

  return (
    <motion.div
      className="relative w-full max-w-md"
      {...motionProps}
    >
      <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
      <input
        type="search"
        id="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search components..."
        className={cn(
          "peer h-11 w-full rounded-xl border border-zinc-200 bg-white pl-10 pr-10 text-sm text-zinc-900 shadow-sm shadow-zinc-100/50 placeholder:text-zinc-400 transition-all duration-200",
          "hover:border-zinc-300 hover:shadow-md hover:shadow-zinc-100/60",
          "focus:border-zinc-300 focus:outline-none focus:ring-4 focus:ring-zinc-100",
          "dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:shadow-none dark:placeholder:text-zinc-500 dark:hover:border-zinc-700 dark:focus:border-zinc-700 dark:focus:ring-zinc-800/70"
        )}
      />
      {isPending ? (
        <span className="absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin rounded-full border-2 border-zinc-200 border-t-zinc-600 dark:border-zinc-700 dark:border-t-zinc-300" />
      ) : null}
    </motion.div>
  )
}
