"use client"

import { motion } from "framer-motion"

export function CultDirectoryRemixNotes() {
  return (
    <div className="flex h-full w-full items-center justify-center p-8">
      <div className="grid w-full max-w-sm grid-cols-2 gap-3">
        {["Cards", "Filters", "Layout", "Preview"].map((label, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.3 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="rounded-xl border border-zinc-200 bg-white p-4 text-sm font-medium text-zinc-800 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
          >
            <motion.div className="mb-3 h-16 rounded-lg bg-zinc-100 dark:bg-zinc-800" whileHover={{ backgroundColor: "rgb(228 228 231)" }} />
            {label}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default CultDirectoryRemixNotes
