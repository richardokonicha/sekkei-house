export default function Loading() {
  return (
    <div className="min-h-screen w-full sm:pl-64">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-8 space-y-4 animate-pulse">
          <div className="h-4 w-24 rounded-full bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-10 w-72 max-w-full rounded-xl bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-4 w-[28rem] max-w-full rounded-lg bg-zinc-100 dark:bg-zinc-900" />
          <div className="h-11 w-full max-w-md rounded-xl bg-zinc-100 dark:bg-zinc-900" />
          <div className="flex gap-2 pt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-8 w-20 rounded-full bg-zinc-100 dark:bg-zinc-900" />
            ))}
          </div>
        </div>
        <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="overflow-hidden rounded-[20px] border border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-zinc-950">
              <div className="aspect-[16/11] animate-pulse bg-zinc-100 dark:bg-zinc-900" />
              <div className="space-y-2.5 p-4">
                <div className="h-4 w-2/3 animate-pulse rounded bg-zinc-100 dark:bg-zinc-900" />
                <div className="h-3 w-full animate-pulse rounded bg-zinc-100 dark:bg-zinc-900" />
                <div className="h-3 w-4/5 animate-pulse rounded bg-zinc-100 dark:bg-zinc-900" />
                <div className="mt-2 flex items-center justify-between pt-1">
                  <div className="h-6 w-24 animate-pulse rounded-full bg-zinc-100 dark:bg-zinc-900" />
                  <div className="h-3 w-14 animate-pulse rounded bg-zinc-100 dark:bg-zinc-900" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
