import "server-only"

import bookmarks from "@/data/bookmarks.json"
import type { Bookmark } from "@/lib/bookmark-types"

export type { Bookmark }

export type LocalFilters = {
  categories: string[]
  labels: string[]
  tags: string[]
}

export const useLocalData =
  process.env.NEXT_PUBLIC_USE_LOCAL_DATA === "true"

const data = bookmarks as Bookmark[]

const unique = (values: (string | null | undefined)[]) =>
  Array.from(new Set(values.filter((v): v is string => Boolean(v))))

export function getLocalBookmarks(): Bookmark[] {
  return data
}

export function getLocalFilters(): LocalFilters {
  return {
    categories: unique(data.map((item) => item.categories)),
    labels: unique(data.flatMap((item) => item.labels ?? [])),
    tags: unique(data.flatMap((item) => item.tags ?? [])),
  }
}

export function searchLocalBookmarks(
  searchTerm?: string,
  category?: string,
  label?: string,
  tag?: string
): Bookmark[] {
  let results = [...data]

  if (searchTerm) {
    const term = searchTerm.toLowerCase()
    results = results.filter((item) =>
      [item.codename, item.description, item.punchline]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(term))
    )
  }

  if (category) {
    results = results.filter((item) => item.categories === category)
  }

  if (label) {
    results = results.filter((item) => (item.labels ?? []).includes(label))
  }

  if (tag) {
    results = results.filter((item) => (item.tags ?? []).includes(tag))
  }

  return results
}

export function getLocalBookmarkById(id?: string): Bookmark[] {
  if (!id) return []
  const item = data.find((bookmark) => bookmark.id === id)
  return item ? [item] : []
}
