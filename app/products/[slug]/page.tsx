import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"

import type { Bookmark } from "@/lib/bookmark-types"
import { NavSidebar } from "@/components/nav"
import { MobileHeader } from "@/components/mobile-header"
import { BookmarkPreview } from "@/components/bookmark-preview"
import { getCachedFilters } from "@/app/actions/cached_actions"
import { getProductById } from "@/app/actions/product"

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const [data, filters] = await Promise.all([
    getProductById(params.slug),
    getCachedFilters(),
  ])
  const product = (data as Bookmark[] | null)?.[0]
  if (!product) notFound()

  return (
    <>
      <NavSidebar categories={filters.categories} labels={filters.labels} />
      <MobileHeader />
      <div className="min-h-screen w-full sm:pl-64">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
          <Link
            href="/products"
            className="mb-5 inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            <ArrowLeft className="h-4 w-4" /> Back to directory
          </Link>
          <div className="space-y-6">
            <BookmarkPreview bookmark={product} className="min-h-[70vh]" />
            <div className="grid gap-4 rounded-2xl border border-zinc-200/80 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950 sm:grid-cols-3">
              <div className="sm:col-span-2">
                <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">Description</p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{product.description}</p>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">Category</p>
                  <p className="mt-1 text-sm text-zinc-800 dark:text-zinc-200">{product.categories || "—"}</p>
                </div>
                {product.labels && product.labels.length > 0 ? (
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">Labels</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {product.labels.map((label) => (
                        <Link key={label} href={`/products?label=${encodeURIComponent(label)}`} className="rounded-lg border border-zinc-200 px-2.5 py-1 text-xs text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100">
                          {label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
