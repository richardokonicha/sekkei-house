"use client"

import React, { Suspense } from "react"
import { AnimatePresence, motion } from "framer-motion"

import type { Bookmark } from "@/lib/bookmark-types"
import { ResourceCard } from "./directory-product-card"

export interface CardGridProps {
  sortedData: Bookmark[]
  filteredFeaturedData?: Bookmark[] | null
  children?: React.ReactNode
}

export const ResourceCardGrid: React.FC<CardGridProps> = ({ sortedData, children }) => {
  return (
    <div className="min-h-screen w-full sm:pl-64">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {children ? <div className="mb-10">{children}</div> : null}
        <Suspense fallback={<div className="text-sm text-zinc-500">Loading…</div>}>
          <DirectoryGrid filteredData={sortedData} />
        </Suspense>
      </div>
    </div>
  )
}

const DirectoryGrid: React.FC<{ filteredData: Bookmark[] }> = ({ filteredData }) => {
  if (!filteredData || filteredData.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50/70 px-6 py-14 text-center dark:border-zinc-800 dark:bg-zinc-900/40"
      >
        <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">No bookmarks found</p>
        <p className="mt-1 text-sm text-zinc-500">Try a different search or filter.</p>
      </motion.div>
    )
  }
  return (
    <motion.div layout className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4" initial={false}>
      <AnimatePresence mode="popLayout">
        {filteredData.map((data, index) => (
          <ResourceCard key={data.id} data={data} order={index} />
        ))}
      </AnimatePresence>
    </motion.div>
  )
}

export const FeaturedGrid: React.FC<{ featuredData: Bookmark[] }> = ({ featuredData }) => {
  if (!featuredData || featuredData.length === 0) return null
  return (
    <div className="mb-8">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Featured</h2>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {featuredData.map((data, index) => (
          <ResourceCard key={data.id} data={data} order={index} />
        ))}
      </div>
    </div>
  )
}

export const EmptyFeaturedGrid = () => null
