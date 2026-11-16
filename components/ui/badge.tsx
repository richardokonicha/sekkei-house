import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border-2 border-zinc-950 px-3 py-1 text-xs font-extrabold uppercase tracking-wider transition-colors dark:border-zinc-100",
  {
    variants: {
      variant: {
        default:
          "bg-purple-200 text-zinc-950 dark:bg-purple-500/30 dark:text-zinc-50",
        secondary:
          "bg-yellow-400 text-zinc-950",
        destructive:
          "bg-red-400 text-zinc-950",
        outline:
          "bg-white text-zinc-950 dark:bg-zinc-900 dark:text-zinc-50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
