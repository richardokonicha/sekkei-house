"use client"

import { useEffect, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { usePathname, useSearchParams } from "next/navigation"
import Link from "next/link"

import { cn } from "@/lib/utils"

export function FilterPills({ categories }: { categories: string[] }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const shouldReduceMotion = useReducedMotion()
  const [mounted, setMounted] = useState(false)
  const activeCategory = searchParams.get("category")
  const hasOtherFilter = Boolean(searchParams.get("label") || searchParams.get("search"))
  const allHref = pathname === "/" ? "/" : "/products"

  useEffect(() => {
    setMounted(true)
  }, [])

  const pills = [
    { label: "All", href: allHref, active: !activeCategory && !hasOtherFilter },
    ...categories.slice(0, 8).map((c) => ({
      label: c,
      href: `/products?category=${encodeURIComponent(c)}`,
      active: activeCategory === c,
    })),
  ]

  if (!mounted || shouldReduceMotion) {
    return (
      <div className="flex flex-wrap gap-2 pt-1">
        {pills.map((pill) => (
          <Link
            key={pill.label}
            href={pill.href}
            className={cn(
              "inline-flex rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors duration-200",
              pill.active
                ? "bg-zinc-900 text-white shadow-sm dark:bg-zinc-100 dark:text-zinc-900"
                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900 dark:bg-zinc-800/80 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
            )}
          >
            {pill.label}
          </Link>
        ))}
      </div>
    )
  }

  return (
    <motion.div
      className="flex flex-wrap gap-2 pt-1"
      initial="hidden"
      animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.035, delayChildren: 0.05 } } }}
    >
      {pills.map((pill) => (
        <motion.div
          key={pill.label}
          variants={{ hidden: { opacity: 0, y: 8, scale: 0.98 }, show: { opacity: 1, y: 0, scale: 1 } }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.96 }}
        >
          <Link
            href={pill.href}
            className={cn(
              "relative inline-flex rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors duration-200",
              pill.active
                ? "bg-zinc-900 text-white shadow-sm dark:bg-zinc-100 dark:text-zinc-900"
                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900 dark:bg-zinc-800/80 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
            )}
          >
            {pill.active ? (
              <motion.span
                layoutId="active-filter-pill"
                className="absolute inset-0 -z-10 rounded-full bg-zinc-900 dark:bg-zinc-100"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            ) : null}
            <span className="relative">{pill.label}</span>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  )
}
