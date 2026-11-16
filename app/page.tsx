import { DirectorySearch } from "@/components/directory-search"
import { ResourceCardGrid } from "@/components/directory-card-grid"
import { NavSidebar } from "@/components/nav"
import { FilterPills } from "@/components/filter-pills"
import { PageHeader } from "@/components/page-header"
import { MobileHeader } from "@/components/mobile-header"
import { getCachedFilters } from "./actions/cached_actions"
import { getProducts } from "./actions/product"

async function Page({ searchParams }: { searchParams: { search?: string } }) {
  const data = await getProducts(searchParams.search)
  const filters = await getCachedFilters()

  return (
    <>
      <NavSidebar
        categories={filters.categories}
        labels={filters.labels}
      />
      <MobileHeader categories={filters.categories} labels={filters.labels} />
      <ResourceCardGrid sortedData={data} filteredFeaturedData={null}>
        <div className="space-y-5">
          <PageHeader
            title="Motion & components"
            description="Live component bookmarks you can preview, inspect, and remix. Click any card to expand, view source, or go full screen."
          />
          <DirectorySearch />
          <FilterPills categories={filters.categories} />
        </div>
      </ResourceCardGrid>
    </>
  )
}

export default Page
