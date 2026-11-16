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
            title="An archive of attention"
            description="A quiet house for gathering art, design, and fragments of inspiration—held beyond medium or category, to be seen and returned to."
          />
          <DirectorySearch />
          <FilterPills categories={filters.categories} />
        </div>
      </ResourceCardGrid>
    </>
  )
}

export default Page
