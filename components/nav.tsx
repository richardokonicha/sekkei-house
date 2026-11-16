"use client"

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { Box, Github, Home, Search } from "lucide-react"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ModeToggle } from "@/app/providers"

function NavItem({
  href,
  active,
  icon: Icon,
  label,
  delay = 0,
}: {
  href: string
  active: boolean
  icon: React.ComponentType<{ className?: string }>
  label: string
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ x: 2 }}
      whileTap={{ scale: 0.98 }}
    >
      <Link
        href={href}
        className={cn(
          "group flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-sm transition-colors",
          active
            ? "bg-zinc-100 text-zinc-950 dark:bg-zinc-900 dark:text-zinc-50"
            : "text-zinc-600 hover:bg-zinc-100/70 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900/70 dark:hover:text-zinc-50"
        )}
      >
        <Icon className={cn("h-4 w-4 transition-transform duration-200 group-hover:scale-110", active && "text-zinc-900 dark:text-zinc-100")} />
        <span className="truncate">{label}</span>
      </Link>
    </motion.div>
  )
}

export function NavSidebar({
  categories,
  labels,
}: {
  categories?: string[]
  labels?: string[]
}) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const isActive = (key: string, value?: string) => {
    if (!value) return pathname === "/" && !searchParams.toString()
    return searchParams.get(key) === value
  }

  return (
    <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 flex-col border-r border-zinc-200/80 bg-white/95 backdrop-blur-sm dark:border-zinc-800/80 dark:bg-zinc-950/95 sm:flex">
      <div className="flex h-16 items-center px-5">
        <Link href="/" className="group flex items-center gap-2.5 font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          <motion.span
            whileHover={{ rotate: -6, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-zinc-200 bg-gradient-to-b from-zinc-50 to-zinc-100 text-xs shadow-sm dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-800"
          >
            S
          </motion.span>
          Sekkei House
        </Link>
      </div>
      <ScrollArea className="flex-1 px-3 pb-6">
        <div className="space-y-7">
          <div>
            <p className="px-2.5 pb-2 text-xs font-medium uppercase tracking-wide text-zinc-400">Browse</p>
            <nav className="space-y-1">
              <NavItem href="/" active={pathname === "/" && !searchParams.toString()} icon={Home} label="Browse all" delay={0.02} />
              <NavItem href="/products" active={pathname === "/products" && !searchParams.toString()} icon={Search} label="Directory" delay={0.05} />
            </nav>
          </div>

          {categories && categories.length > 0 ? (
            <div>
              <p className="px-2.5 pb-2 text-xs font-medium uppercase tracking-wide text-zinc-400">Categories</p>
              <nav className="space-y-1">
                {categories.map((category, i) => (
                  <NavItem
                    key={category}
                    href={`/products?category=${encodeURIComponent(category)}`}
                    active={isActive("category", category)}
                    icon={Box}
                    label={category}
                    delay={0.06 + i * 0.02}
                  />
                ))}
              </nav>
            </div>
          ) : null}

          {labels && labels.length > 0 ? (
            <div>
              <p className="px-2.5 pb-2 text-xs font-medium uppercase tracking-wide text-zinc-400">Labels</p>
              <div className="flex flex-wrap gap-1.5 px-2">
                {labels.slice(0, 20).map((label, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, delay: 0.1 + i * 0.015 }}
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Link
                      href={`/products?label=${encodeURIComponent(label)}`}
                      className={cn(
                        "inline-flex rounded-lg border border-zinc-200 px-2.5 py-1 text-xs text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-50",
                        isActive("label", label) && "border-zinc-300 bg-zinc-100 text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
                      )}
                    >
                      {label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </ScrollArea>
      <div className="border-t border-zinc-200/80 p-3 dark:border-zinc-800/80">
        <div className="flex items-center justify-between px-2">
          <span className="text-xs text-zinc-500">Local mode</span>
          <div className="flex items-center gap-1.5">
            <a
              href="https://github.com/richardokonicha/sekkei-house"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub repository"
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-900 dark:hover:text-zinc-50"
            >
              <Github className="h-4 w-4" />
            </a>
            <ModeToggle />
          </div>
        </div>
      </div>
    </aside>
  )
}
