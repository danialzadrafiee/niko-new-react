import { useEffect, useState } from "react"
import { useNavigate, useParams, useLocation } from "react-router-dom"
import { Category } from "@/types/category"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import ShopSidebar from "@/components/shared/ShopSidebar"
import Card from "@/components/shop/ShopCard"
import { FilterOption } from "@/components/shared/FilterOptions"

interface GenericListProps<T> {
  title: string
  items: {
    data: T[]
    last_page: number
  }
  categories: Category[]
  loading: boolean
  fetchItems: (params: any) => Promise<void>
  fetchCategories: () => void
  handleViewDetails: (id: number) => void
  getCardData: (item: T) => any
  filterOptions: FilterOption[]
  baseUrl: string
}

function GenericList<T extends { id: number }>({ title, items, categories, loading, fetchItems, fetchCategories, handleViewDetails, getCardData, filterOptions, baseUrl }: GenericListProps<T>) {
  const navigate = useNavigate()
  const location = useLocation()
  const { id: categoryId } = useParams<{ id: string }>()
  const [filters, setFilters] = useState({
    search: "",
    category_id: categoryId || "",
    min_price: "",
    max_price: "",
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [activeMainCategory, setActiveMainCategory] = useState<number | null>(null)
  const [activeSecondCategory, setActiveSecondCategory] = useState<number | null>(null)
  const [isFundraiseMode, setIsFundraiseMode] = useState(location.pathname.includes("fundraises"))
  const [cardVariant, setCardVariant] = useState<"fundraise" | "product">(location.pathname.includes("fundraises") ? "fundraise" : "product")
  const [breadcrumbItems, setBreadcrumbItems] = useState<Category[]>([])

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  useEffect(() => {
    const fetchData = async () => {
      const params = {
        ...filters,
        page: currentPage,
        per_page: 12,
      }
      await fetchItems(params)
    }
    fetchData()

    setCardVariant(isFundraiseMode ? "fundraise" : "product")
  }, [fetchItems, currentPage, filters, isFundraiseMode])

  useEffect(() => {
    if (categoryId && categories.length > 0) {
      const findCategoryPath = (categories: Category[], targetId: number, path: Category[] = []): Category[] | null => {
        for (const category of categories) {
          if (category.id === parseInt(targetId)) {
            return [...path, category]
          }
          if (category.children && category.children.length > 0) {
            const result = findCategoryPath(category.children, parseInt(targetId), [...path, category])
            if (result) return result
          }
        }
        return null
      }

      const path = findCategoryPath(categories, parseInt(categoryId))
      if (path) {
        setBreadcrumbItems(path)
      }
    } else {
      setBreadcrumbItems([])
    }
  }, [categoryId, categories])

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleCategoryClick = (category: Category) => {
    handleFilterChange("category_id", category.id.toString())
    navigate(`${baseUrl}/${category.id}`)
  }

  const handleModeSwitch = () => {
    const newMode = !isFundraiseMode
    setIsFundraiseMode(newMode)
    const currentPath = location.pathname
    const newPath = newMode ? currentPath.replace("/products", "/fundraises") : currentPath.replace("/fundraises", "/products")
    navigate(newPath)
  }

  return (
    <section className="w-full flex justify-center">
      <div className="max-w-6xl w-full gap-8 flex">
        <div className="w-1/4 sticky top-4 self-start">
          <ShopSidebar
            categories={categories}
            activeMainCategory={activeMainCategory}
            activeSecondCategory={activeSecondCategory}
            setActiveMainCategory={setActiveMainCategory}
            setActiveSecondCategory={setActiveSecondCategory}
            handleCategoryClick={handleCategoryClick}
            filters={filters}
            filterOptions={filterOptions}
            onFilterChange={handleFilterChange}
          />
        </div>

        <div className="w-3/4">
          {breadcrumbItems.length > 0 && (
            <Breadcrumb className="mb-4">
              <BreadcrumbList>
                {breadcrumbItems.map((item, index) => (
                  <BreadcrumbItem key={item.id}>
                    {index === breadcrumbItems.length - 1 ? (
                      <BreadcrumbPage>{item.name}</BreadcrumbPage>
                    ) : (
                      <>
                        <BreadcrumbLink href={`${baseUrl}/${item.id}`}>{item.name}</BreadcrumbLink>
                        <BreadcrumbSeparator />
                      </>
                    )}
                  </BreadcrumbItem>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          )}

          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">{title}</h1>
            <div className="flex items-center gap-2 bg-gray-200 rounded-full p-1">
              <button className={`text-sm py-1 px-3 rounded-full transition-colors ${!isFundraiseMode ? "bg-[#5432a1] text-white" : "bg-transparent text-gray-700"}`} onClick={() => handleModeSwitch(false)}>
                فردی
              </button>
              <button className={`text-sm py-1 px-3 rounded-full transition-colors ${isFundraiseMode ? "bg-[#5432a1] text-white" : "bg-transparent text-gray-700"}`} onClick={() => handleModeSwitch(true)}>
                مشارکتی
              </button>
            </div>
          </div>
          {loading ? (
            <div className="text-center">در حال بارگذاری...</div>
          ) : (
            <>
              <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {items.data.map((item) => (
                  <div key={item.id} onClick={() => handleViewDetails(item.id)}>
                    <Card variant={cardVariant} data={getCardData(item)} />
                  </div>
                ))}
              </div>
              {items.data.length === 0 ? (
                <div className="text-center">هیچ موردی یافت نشد.</div>
              ) : (
                <Pagination className="mt-8">
                  <PaginationContent>
                    {currentPage > 1 && (
                      <PaginationItem>
                        <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} />
                      </PaginationItem>
                    )}
                    {[...Array(items.last_page)].map((_, index) => (
                      <PaginationItem key={index + 1}>
                        <PaginationLink onClick={() => handlePageChange(index + 1)} isActive={currentPage === index + 1}>
                          {index + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    {currentPage < items.last_page && (
                      <PaginationItem>
                        <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
                      </PaginationItem>
                    )}
                  </PaginationContent>
                </Pagination>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default GenericList
