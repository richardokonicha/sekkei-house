import { DirectorySearch } from "@/components/directory-search"
import { ResourceCardGrid } from "@/components/directory-card-grid"
import { NavSidebar } from "@/components/nav"
import { PageHeader } from "@/components/page-header"
import { FilterPills } from "@/components/filter-pills"
import { MobileHeader } from "@/components/mobile-header"
import { getCachedFilters } from "../actions/cached_actions"
import { getProducts } from "../actions/product"

export const dynamic = "force-dynamic"

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: {
    search?: string
    category?: string
    label?: string
  }
}) {
  const { search, category, label } = searchParams
  const data = await getProducts(search, category, label)
  const filters = await getCachedFilters()
  const activeFilter = search || category || label
  const filterType = search ? "Search" : category ? "Category" : label ? "Label" : null

  return (
    <>
      <NavSidebar
        categories={filters.categories}
        labels={filters.labels}
      />
      <MobileHeader categories={filters.categories} labels={filters.labels} />
      <ResourceCardGrid sortedData={data} filteredFeaturedData={null}>
        <div className="space-y-5">
          <div className="space-y-1">
            {filterType ? (
              <p className="text-sm font-medium text-zinc-500">{filterType}</p>
            ) : null}
            <PageHeader title={activeFilter || "All bookmarks"} count={data.length} />
          </div>
          <DirectorySearch />
          <FilterPills categories={filters.categories} />
        </div>
      </ResourceCardGrid>
    </>
  )
}
