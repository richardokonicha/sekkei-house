import Link from "next/link"

import { LoginForm } from "./form"

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { message: string }
}) {
  return (
    <div>
      <div className="absolute left-2 top-2">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-zinc-200 bg-zinc-50 text-xs dark:border-zinc-800 dark:bg-zinc-900">S</span>
          Sekkei House
        </Link>
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-2 pt-24">
        <LoginForm />

        {searchParams?.message && (
          <p className="mt-4 bg-foreground/10 p-4 text-center text-foreground">
            {searchParams.message}
          </p>
        )}
      </div>
    </div>
  )
}
