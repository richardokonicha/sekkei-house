import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full border-2 border-zinc-950 text-sm font-extrabold tracking-tight transition-[transform,box-shadow,background-color,color] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:border-zinc-100 active:translate-x-[2px] active:translate-y-[2px]",
  {
    variants: {
      variant: {
        default:
          "bg-purple-500 text-white shadow-[4px_4px_0px_0px_#09090B] hover:bg-purple-400 hover:shadow-[6px_6px_0px_0px_#09090B] active:shadow-[1px_1px_0px_0px_#09090B] dark:bg-purple-400 dark:text-zinc-950 dark:shadow-[4px_4px_0px_0px_#A855F7] dark:hover:shadow-[6px_6px_0px_0px_#C084FC] dark:active:shadow-[1px_1px_0px_0px_#C084FC]",
        destructive:
          "bg-red-500 text-white shadow-[4px_4px_0px_0px_#09090B] hover:bg-red-400",
        outline:
          "bg-white text-zinc-950 shadow-[4px_4px_0px_0px_#09090B] hover:bg-purple-100 dark:bg-zinc-900 dark:text-zinc-50 dark:shadow-[4px_4px_0px_0px_#A855F7]",
        secondary:
          "bg-yellow-400 text-zinc-950 shadow-[4px_4px_0px_0px_#09090B] hover:bg-yellow-300 dark:shadow-[4px_4px_0px_0px_#A855F7]",
        ghost:
          "border-transparent bg-transparent shadow-none hover:border-zinc-950 hover:bg-purple-100 hover:shadow-[3px_3px_0px_0px_#09090B] dark:hover:border-zinc-100 dark:hover:bg-zinc-800",
        link:
          "border-transparent bg-transparent shadow-none underline-offset-4 hover:underline active:translate-x-0 active:translate-y-0",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-11 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
