"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { motion, useReducedMotion } from "framer-motion"
import { Box, Github, Home, Menu, Search } from "lucide-react"

import { cn } from "@/lib/utils"
import { ModeToggle } from "@/app/providers"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export function MobileHeader({ categories = [], labels = [] }: { categories?: string[]; labels?: string[] }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const shouldReduceMotion = useReducedMotion()
  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)
  const activeCategory = searchParams.get("category")
  const activeLabel = searchParams.get("label")

  useEffect(() => {
    setMounted(true)
  }, [])

  const HeaderTag = !mounted || shouldReduceMotion ? "header" : motion.header
  const motionProps = !mounted || shouldReduceMotion ? {} : { initial: { opacity: 0, y: -8 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }

  return (
    <HeaderTag
      {...motionProps}
      className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-zinc-200/80 bg-white/90 px-4 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/90 sm:hidden"
    >
      <div className="flex items-center gap-1.5">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button type="button" className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900" aria-label="Open menu">
              <Menu className="h-4 w-4" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px] overflow-y-auto px-4">
            <SheetHeader className="mb-4 text-left">
              <SheetTitle className="text-base">Browse</SheetTitle>
            </SheetHeader>
            <div className="space-y-6 pb-6">
              <nav className="space-y-1">
                <Link href="/" onClick={() => setOpen(false)} className={cn("flex items-center gap-2 rounded-xl px-2.5 py-2 text-sm", pathname === "/" && !searchParams.toString() ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-50" : "text-zinc-600 dark:text-zinc-400")}>
                  <Home className="h-4 w-4" /> Browse all
                </Link>
                <Link href="/products" onClick={() => setOpen(false)} className={cn("flex items-center gap-2 rounded-xl px-2.5 py-2 text-sm", pathname === "/products" && !searchParams.toString() ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-50" : "text-zinc-600 dark:text-zinc-400")}>
                  <Search className="h-4 w-4" /> Directory
                </Link>
              </nav>
              {categories.length > 0 ? (
                <div>
                  <p className="mb-2 px-2.5 text-xs font-medium uppercase tracking-wide text-zinc-400">Categories</p>
                  <nav className="space-y-1">
                    {categories.map((category) => (
                      <Link key={category} href={`/products?category=${encodeURIComponent(category)}`} onClick={() => setOpen(false)} className={cn("flex items-center gap-2 rounded-xl px-2.5 py-2 text-sm", activeCategory === category ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-50" : "text-zinc-600 dark:text-zinc-400")}>
                        <Box className="h-4 w-4" /> <span className="truncate">{category}</span>
                      </Link>
                    ))}
                  </nav>
                </div>
              ) : null}
              {labels.length > 0 ? (
                <div>
                  <p className="mb-2 px-2.5 text-xs font-medium uppercase tracking-wide text-zinc-400">Labels</p>
                  <div className="flex flex-wrap gap-1.5 px-1">
                    {labels.slice(0, 20).map((label) => (
                      <Link key={label} href={`/products?label=${encodeURIComponent(label)}`} onClick={() => setOpen(false)} className={cn("rounded-lg border border-zinc-200 px-2.5 py-1 text-xs", activeLabel === label ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-50" : "text-zinc-600 dark:border-zinc-800 dark:text-zinc-400")}>
                        {label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </SheetContent>
        </Sheet>
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 text-xs dark:border-zinc-800 dark:bg-zinc-900">S</span>
          Sekkei
        </Link>
      </div>
      <div className="flex items-center gap-1">
        <a
          href="https://github.com/richardokonicha/sekkei-house"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub repository"
          className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900"
        >
          <Github className="h-4 w-4" />
        </a>
        <ModeToggle />
      </div>
    </HeaderTag>
  )
}
