"use client"

import { motion } from "framer-motion"

export function PlayfulCartoonGraphics() {
  return (
    <div className="flex h-full w-full items-center justify-center gap-4 p-8">
      <motion.div className="h-20 w-20 rounded-full bg-yellow-300 shadow-lg" whileHover={{ scale: 1.15, rotate: -8 }} animate={{ y: [0, -6, 0] }} transition={{ y: { duration: 2.4, repeat: Infinity, ease: "easeInOut" } }} />
      <motion.div className="h-24 w-24 rotate-6 rounded-3xl bg-pink-400 shadow-lg" whileHover={{ scale: 1.1, rotate: 0 }} animate={{ y: [0, -8, 0] }} transition={{ y: { duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.2 } }} />
      <motion.div className="h-20 w-28 -rotate-3 rounded-2xl bg-sky-400 shadow-lg" whileHover={{ scale: 1.1, rotate: 3 }} animate={{ y: [0, -5, 0] }} transition={{ y: { duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 } }} />
    </div>
  )
}

export default PlayfulCartoonGraphics
