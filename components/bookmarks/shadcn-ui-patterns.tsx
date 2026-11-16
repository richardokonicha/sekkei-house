"use client"

import { motion } from "framer-motion"

export function ShadcnUiPatterns() {
  return (
    <div className="flex h-full w-full items-center justify-center gap-3 p-8">
      {[
        { label: "Primary", cls: "bg-zinc-900 text-white shadow-lg shadow-zinc-900/20 dark:bg-white dark:text-zinc-900" },
        { label: "Secondary", cls: "border border-zinc-200 bg-white text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100" },
        { label: "Ghost", cls: "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300" },
      ].map((btn, i) => (
        <motion.button
          key={btn.label}
          whileHover={{ y: -3, scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 20, delay: i * 0.02 }}
          className={`rounded-xl px-5 py-2.5 text-sm font-medium transition-shadow ${btn.cls}`}
        >
          {btn.label}
        </motion.button>
      ))}
    </div>
  )
}

export default ShadcnUiPatterns
