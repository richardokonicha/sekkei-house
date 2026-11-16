"use client"

import { motion } from "framer-motion"

export function LinearBrandMoodboard() {
  return (
    <div className="flex h-full w-full items-center justify-center p-8">
      <motion.div
        whileHover={{ y: -4, rotateX: 2, rotateY: -2 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="w-full max-w-sm rounded-2xl border border-white/10 bg-gradient-to-b from-zinc-800 to-zinc-950 p-6 text-white shadow-2xl"
        style={{ transformPerspective: 800 }}
      >
        <motion.div className="mb-4 h-2 w-16 rounded-full bg-violet-400/80" animate={{ width: [64, 92, 64] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
        <div className="space-y-2">
          <div className="h-4 w-3/4 rounded bg-white/90" />
          <div className="h-4 w-1/2 rounded bg-white/50" />
        </div>
        <div className="mt-6 flex gap-2">
          <motion.div whileHover={{ scale: 1.05 }} className="h-8 w-20 rounded-lg bg-white/10" />
          <motion.div whileHover={{ scale: 1.05 }} className="h-8 w-20 rounded-lg bg-violet-500/80" />
        </div>
      </motion.div>
    </div>
  )
}

export default LinearBrandMoodboard
