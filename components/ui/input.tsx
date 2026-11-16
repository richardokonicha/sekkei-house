import * as React from "react"

import { cn } from "@/lib/utils"

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
    >
      <path
        d="M21 21l-4.35-4.35M19 11a8 8 0 11-16 0 8 8 0 0116 0z"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  hasIcon?: boolean
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <div>
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-xl border-2 border-zinc-950 bg-white px-3 py-2 text-sm font-medium text-zinc-950",
            "shadow-[4px_4px_0px_0px_#09090B] transition-all placeholder:text-zinc-400",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "dark:border-zinc-100 dark:bg-zinc-900 dark:text-zinc-50 dark:shadow-[4px_4px_0px_0px_#A855F7] dark:placeholder:text-zinc-500",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)
Input.displayName = "Input"

const InputButton = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, hasIcon, children, ...props }, ref) => {
    return (
      <div className="mt-2 flex w-full rounded-md">
        <div className={cn("relative w-full rounded-full")}>
          <input
            type={props.type ?? "search"}
            autoComplete={props.autoComplete ?? "off"}
            className={cn(
              "w-full rounded-full border-2 border-zinc-950 bg-white py-3.5 pr-6 text-base font-semibold text-zinc-900",
              "shadow-[4px_4px_0px_0px_#09090B] transition-all placeholder:text-zinc-400",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2",
              "disabled:cursor-not-allowed disabled:opacity-50",
              "dark:border-zinc-100 dark:bg-zinc-900 dark:text-zinc-50 dark:shadow-[4px_4px_0px_0px_#A855F7] dark:placeholder:text-zinc-500",
              hasIcon ? "pl-12" : "pl-5",
              className
            )}
            ref={ref}
            {...props}
          />
          {hasIcon ? (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-zinc-500 dark:text-zinc-400">
              <SearchIcon />
            </div>
          ) : null}
        </div>
        {children}
      </div>
    )
  }
)
InputButton.displayName = "InputButton"

export { Input, InputButton }
