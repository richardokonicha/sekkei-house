import React from "react"
import Link from "next/link"
import { PlusIcon, Sparkles } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function Hero({ children }: { children?: React.ReactNode }) {
  const useLocalData = process.env.NEXT_PUBLIC_USE_LOCAL_DATA === "true"

  return (
    <div className="flex flex-col items-center justify-center gap-3 md:ml-6 md:items-start md:px-2">
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-5xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50 md:text-6xl">
          Sekkei House
        </h1>
        <Badge variant="secondary" className="border-2 border-zinc-950 dark:border-zinc-100">
          <Sparkles className="mr-1 h-3.5 w-3.5" /> Gear 5
        </Badge>
      </div>
      <div className="flex flex-col items-center md:items-start">
        <p className="max-w-xl text-center text-base font-medium text-zinc-700 dark:text-zinc-300 md:text-left md:text-lg">
          A free, local-first treasury of UI inspiration, components, brand visuals,
          motion, and playful graphics. Browse, preview, and remix without friction.
        </p>
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-3">
        {!useLocalData ? (
          <Button variant="default" asChild>
            <Link href="/submit" className="flex items-center">
              <PlusIcon className="mr-1 h-4 w-4" /> Submit
            </Link>
          </Button>
        ) : null}
        <Badge variant="outline" className="bg-white dark:bg-zinc-900">
          Local mode: GitHub-backed bookmarks
        </Badge>
      </div>
      {children}
    </div>
  )
}
