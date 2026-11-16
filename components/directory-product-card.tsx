"use client"

import React, { useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { Maximize2, X } from "lucide-react"

import { cn } from "@/lib/utils"
import type { Bookmark } from "@/lib/bookmark-types"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { BookmarkPreview } from "@/components/bookmark-preview"
import { incrementClickCount } from "@/app/actions/product"

export const getBasePath = (url: string) => {
  try {
    return new URL(url).hostname.replace("www.", "").split(".")[0]
  } catch {
    return "site"
  }
}

const previewStyles: Record<string, { bg: string; accent: string }> = {
  "shadcn-ui-patterns": { bg: "from-zinc-100 to-zinc-50 dark:from-zinc-900 dark:to-zinc-950", accent: "bg-zinc-900 dark:bg-zinc-100" },
  "linear-brand-moodboard": { bg: "from-zinc-900 to-zinc-800 dark:from-zinc-800 dark:to-zinc-950", accent: "bg-violet-500" },
  "manim-motion-studies": { bg: "from-indigo-50 to-blue-50 dark:from-indigo-950/40 dark:to-blue-950/30", accent: "bg-indigo-500" },
  "cult-directory-remix-notes": { bg: "from-zinc-100 to-stone-50 dark:from-zinc-900 dark:to-stone-950", accent: "bg-zinc-500" },
  "playful-cartoon-graphics": { bg: "from-amber-50 to-pink-50 dark:from-amber-950/30 dark:to-pink-950/30", accent: "bg-pink-400" },
}

function CardPoster({ bookmark }: { bookmark: Bookmark }) {
  const style = previewStyles[bookmark.codename]
  return (
    <div className={cn("absolute inset-0 bg-gradient-to-br", style?.bg || "from-zinc-100 to-zinc-200 dark:from-zinc-900 dark:to-zinc-800")}>
      {bookmark.logo_src ? (
        <img src={bookmark.logo_src} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-70 mix-blend-luminosity transition-transform duration-500 ease-out group-hover:scale-[1.04]" loading="lazy" />
      ) : null}
      <div className="absolute inset-0 flex items-center justify-center p-6">
        <div className="w-full max-w-[200px] space-y-3 rounded-2xl border border-white/60 bg-white/70 p-4 shadow-sm backdrop-blur-sm transition-transform duration-500 ease-out group-hover:scale-[1.03] dark:border-white/10 dark:bg-zinc-900/60">
          <div className={cn("h-2 w-14 rounded-full", style?.accent || "bg-zinc-400")} />
          <div className="space-y-2">
            <div className="h-2.5 w-full rounded bg-zinc-200/80 dark:bg-zinc-700/70" />
            <div className="h-2.5 w-3/4 rounded bg-zinc-200/60 dark:bg-zinc-700/50" />
          </div>
          <div className="flex gap-2 pt-1">
            <div className="h-6 w-14 rounded-lg bg-zinc-200/70 dark:bg-zinc-700/50" />
            <div className={cn("h-6 w-14 rounded-lg opacity-70", style?.accent || "bg-zinc-400")} />
          </div>
        </div>
      </div>
    </div>
  )
}

export const ResourceCard = React.forwardRef<HTMLElement, { data: Bookmark; order: number }>(
  ({ data, order }, ref) => {
    const shouldReduceMotion = useReducedMotion()
    const [open, setOpen] = useState(false)

    const handleOpen = () => {
      incrementClickCount(data.id)
      setOpen(true)
    }

    const ease = [0.22, 1, 0.36, 1] as const

    return (
      <>
        <motion.article
          ref={ref}
          layout
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.38, ease, delay: Math.min(order * 0.04, 0.24) }}
          whileHover={shouldReduceMotion ? undefined : { y: -5 }}
          whileTap={shouldReduceMotion ? undefined : { scale: 0.985 }}
          className="group w-full"
        >
        <button
          type="button"
          onClick={handleOpen}
          className="w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 rounded-[20px]"
        >
          <div className="relative flex h-full flex-col overflow-hidden rounded-[20px] border border-zinc-200/80 bg-white transition-all duration-300 ease-out group-hover:border-zinc-300 group-hover:shadow-xl group-hover:shadow-zinc-200/40 dark:border-zinc-800/80 dark:bg-zinc-950 dark:group-hover:border-zinc-700 dark:group-hover:shadow-black/40">
            <div className="relative aspect-[16/11] overflow-hidden bg-zinc-100 dark:bg-zinc-900">
              <CardPoster bookmark={data} />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/[0.04] via-transparent to-white/10 dark:from-black/20" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex translate-y-1 items-end justify-between p-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-medium text-zinc-700 shadow-sm backdrop-blur-sm dark:bg-zinc-900/90 dark:text-zinc-200">Live preview</span>
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 text-white shadow-sm dark:bg-white dark:text-zinc-900"><Maximize2 className="h-3.5 w-3.5" /></span>
              </div>
            </div>
            <div className="flex flex-1 flex-col px-4 pb-4 pt-3.5">
              <h3 className="text-[15px] font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">{data.codename}</h3>
              <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{data.punchline || data.description}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="inline-flex items-center rounded-full bg-zinc-100 px-2.5 py-1 text-[11px] font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">{data.categories || getBasePath(data.product_website)}</span>
                <span className="text-[11px] text-zinc-400 transition-colors group-hover:text-zinc-600 dark:text-zinc-500 dark:group-hover:text-zinc-300">{getBasePath(data.product_website)}</span>
              </div>
            </div>
          </div>
        </button>
        </motion.article>

        <Dialog open={open} onOpenChange={setOpen}>
          <AnimatePresence>
            {open ? (
              <DialogContent hideClose className="max-w-5xl overflow-hidden border-zinc-200/80 bg-transparent p-0 shadow-none sm:rounded-[24px]">
                <motion.div initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.98, y: 8 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98, y: 8 }} transition={{ duration: 0.25, ease }} className="relative">
                  <DialogTitle className="sr-only">{data.codename}</DialogTitle>
                  <DialogDescription className="sr-only">{data.punchline || data.description}</DialogDescription>
                  <DialogClose asChild>
                    <motion.button type="button" whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }} className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200/80 bg-white/90 text-zinc-500 shadow-sm backdrop-blur transition-colors hover:bg-white hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-950/90 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100" aria-label="Close">
                      <X className="h-4 w-4" />
                    </motion.button>
                  </DialogClose>
                  <BookmarkPreview bookmark={data} className="max-h-[88vh] bg-white shadow-2xl shadow-zinc-900/10 dark:bg-zinc-950 dark:shadow-black/50" />
                </motion.div>
              </DialogContent>
            ) : null}
          </AnimatePresence>
        </Dialog>
      </>
    )
  }
)

ResourceCard.displayName = "ResourceCard"
