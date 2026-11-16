"use client"

import { motion } from "framer-motion"

export function ManimMotionStudies() {
  return (
    <div className="flex h-full w-full items-center justify-center gap-6 p-8">
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="h-14 w-14 rounded-2xl bg-indigo-500"
          animate={{ y: [0, -18, 0], rotate: [0, 8, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 1.6, delay: i * 0.15, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  )
}

export default ManimMotionStudies
