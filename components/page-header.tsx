"use client"

import { useEffect, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"

export function PageHeader({ title, description, count }: { title: string; description?: string; count?: number }) {
  const shouldReduceMotion = useReducedMotion()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || shouldReduceMotion) {
    return (
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-[2.25rem] sm:leading-tight">{title}</h1>
          {typeof count === "number" ? (
            <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-full bg-zinc-100 px-2 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">{count}</span>
          ) : null}
        </div>
        {description ? <p className="max-w-2xl text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400">{description}</p> : null}
      </div>
    )
  }

  return (
    <motion.div
      className="space-y-2"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-[2.25rem] sm:leading-tight">
          {title}
        </h1>
        {typeof count === "number" ? (
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="inline-flex h-7 min-w-7 items-center justify-center rounded-full bg-zinc-100 px-2 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
          >
            {count}
          </motion.span>
        ) : null}
      </div>
      {description ? (
        <p className="max-w-2xl text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400">{description}</p>
      ) : null}
    </motion.div>
  )
}
