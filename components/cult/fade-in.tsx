"use client"

import { createContext, useContext } from "react"
import { motion, useReducedMotion } from "framer-motion"

import { rubberSpring } from "@/components/ui/motion"

const FadeInStaggerContext = createContext(false)

const viewport = { once: true, margin: "0px 0px -120px" }

export function FadeIn(props: any) {
  let shouldReduceMotion = useReducedMotion()
  let isInStaggerGroup = useContext(FadeInStaggerContext)

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16, scale: shouldReduceMotion ? 1 : 0.98 },
        visible: { opacity: 1, y: 0, scale: 1 },
      }}
      transition={shouldReduceMotion ? { duration: 0 } : rubberSpring}
      {...(isInStaggerGroup
        ? {}
        : {
            initial: "hidden",
            whileInView: "visible",
            viewport,
          })}
      {...props}
    />
  )
}
