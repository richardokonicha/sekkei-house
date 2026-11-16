export const rubberSpring = {
  type: "spring" as const,
  stiffness: 450,
  damping: 16,
  mass: 0.8,
}

export const rubberHover = {
  y: -5,
  scale: 1.025,
  rotate: -0.75,
}

export const rubberTap = {
  scale: 0.96,
  rotate: 0.5,
}

export const popInInitial = { opacity: 0, scale: 0.9, y: 12 }
export const popInAnimate = { opacity: 1, scale: 1, y: 0, rotate: 0 }
