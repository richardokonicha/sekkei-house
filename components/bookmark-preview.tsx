"use client"

import { useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { Code2, ExternalLink, Github, Maximize2, Minimize2 } from "lucide-react"

import { cn } from "@/lib/utils"
import type { Bookmark } from "@/lib/bookmark-types"
import { bookmarkComponents } from "@/components/bookmarks/registry"

export function BookmarkPreview({ bookmark, className }: { bookmark: Bookmark; className?: string }) {
  const shouldReduceMotion = useReducedMotion()
  const [showCode, setShowCode] = useState(false)
  const [fullScreen, setFullScreen] = useState(false)
  const [source, setSource] = useState<string | null>(null)
  const [sourceLoading, setSourceLoading] = useState(false)
  const Preview = bookmarkComponents[bookmark.codename]
  const ease = [0.22, 1, 0.36, 1] as const

  const toggleCode = async () => {
    const next = !showCode
    setShowCode(next)
    if (next && source === null && bookmark.component_path) {
      setSourceLoading(true)
      try {
        const res = await fetch(`/api/component-source?path=${encodeURIComponent(bookmark.component_path)}`)
        setSource(res.ok ? await res.text() : "// Unable to load source")
      } catch {
        setSource("// Unable to load source")
      } finally {
        setSourceLoading(false)
      }
    }
  }

  const githubUrl =
    bookmark.github_url ||
    (bookmark.component_path ? `https://github.com/sekkei-house/sekkei-house/blob/main/${bookmark.component_path}` : null)

  return (
    <div className={cn("flex h-full flex-col overflow-hidden rounded-[24px] border border-zinc-200/80 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950", fullScreen && "fixed inset-0 z-50 rounded-none border-0", className)}>
      <div className="flex items-center justify-between gap-4 border-b border-zinc-200/80 px-5 py-4 dark:border-zinc-800">
        <div className="min-w-0">
          <h2 className="truncate text-lg font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">{bookmark.codename}</h2>
          <p className="mt-0.5 truncate text-sm text-zinc-500 dark:text-zinc-400">{bookmark.punchline}</p>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <motion.button type="button" whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }} onClick={toggleCode} className={cn("inline-flex h-9 items-center gap-1.5 rounded-xl border px-3 text-xs font-medium transition-colors", showCode ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900" : "border-zinc-200 text-zinc-600 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800")}>
            <Code2 className="h-3.5 w-3.5" />{showCode ? "Preview" : "View code"}
          </motion.button>
          <motion.button type="button" whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }} onClick={() => setFullScreen((v) => !v)} className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-zinc-200 px-3 text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800">
            {fullScreen ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}{fullScreen ? "Exit" : "Full screen"}
          </motion.button>
        </div>
      </div>
      <div className={cn("relative flex-1 overflow-hidden bg-zinc-50 dark:bg-zinc-900/40", fullScreen ? "min-h-0" : "min-h-[420px]")}>
        <AnimatePresence mode="wait" initial={false}>
          {showCode ? (
            <motion.div key="code" initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }} transition={{ duration: 0.2, ease }} className="h-full overflow-auto p-4 sm:p-5">
              <pre className="h-full min-h-[320px] overflow-auto rounded-2xl border border-zinc-200 bg-white p-4 text-[13px] leading-relaxed text-zinc-800 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200"><code>{sourceLoading ? "Loading source…" : source || "// No source available"}</code></pre>
            </motion.div>
          ) : (
            <motion.div key="preview" initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.99 }} animate={{ opacity: 1, scale: 1 }} exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.99 }} transition={{ duration: 0.22, ease }} className="flex h-full w-full items-center justify-center p-4 sm:p-8">
              <div className={cn("relative w-full overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950", fullScreen ? "h-full max-w-none" : "aspect-[16/10] max-w-4xl")}>
                {Preview ? <Preview /> : bookmark.logo_src ? <img src={bookmark.logo_src} alt={bookmark.codename} className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center text-sm text-zinc-500">No preview</div>}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-zinc-200/80 px-5 py-3.5 dark:border-zinc-800">
        <p className="line-clamp-2 max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{bookmark.description}</p>
        <div className="flex items-center gap-2">
          {githubUrl ? <a href={githubUrl} target="_blank" rel="noreferrer noopener" className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-zinc-200 px-3 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"><Github className="h-3.5 w-3.5" /> GitHub</a> : null}
          {bookmark.product_website ? <a href={bookmark.product_website} target="_blank" rel="noreferrer noopener" className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-zinc-900 px-3 text-xs font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"><ExternalLink className="h-3.5 w-3.5" /> Visit site</a> : null}
        </div>
      </div>
    </div>
  )
}
