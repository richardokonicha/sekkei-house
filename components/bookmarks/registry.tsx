"use client"

import type React from "react"
import ShadcnUiPatterns from "./shadcn-ui-patterns"
import LinearBrandMoodboard from "./linear-brand-moodboard"
import ManimMotionStudies from "./manim-motion-studies"
import CultDirectoryRemixNotes from "./cult-directory-remix-notes"
import PlayfulCartoonGraphics from "./playful-cartoon-graphics"

export const bookmarkComponents: Record<string, React.ComponentType> = {
  "shadcn-ui-patterns": ShadcnUiPatterns,
  "linear-brand-moodboard": LinearBrandMoodboard,
  "manim-motion-studies": ManimMotionStudies,
  "cult-directory-remix-notes": CultDirectoryRemixNotes,
  "playful-cartoon-graphics": PlayfulCartoonGraphics,
}
