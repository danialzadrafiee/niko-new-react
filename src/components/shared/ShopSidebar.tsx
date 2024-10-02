import React from "react"
import { Category } from "@/types/category"
import CategoryFilter from "./CategoryFilter"
import FilterOptions, { FilterOption } from "./FilterOptions"

interface ShopSidebarProps {
  categories: Category[]
  activeMainCategory: number | null
  activeSecondCategory: number | null
  setActiveMainCategory: (id: number | null) => void
  setActiveSecondCategory: (id: number | null) => void
  handleCategoryClick: (category: Category) => void
  filters: Record<string, string>
  filterOptions: FilterOption[]
  onFilterChange: (key: string, value: string) => void
}

const ShopSidebar: React.FC<ShopSidebarProps> = ({
  categories,
  activeMainCategory,
  activeSecondCategory,
  setActiveMainCategory,
  setActiveSecondCategory,
  handleCategoryClick,
  filters,
  filterOptions,
  onFilterChange,
}) => {
  return (
    <div className="w-64 bg-white shadow-lg rounded-lg overflow-hidden sticky top-4">
      <div className="bg-[#5432a1] text-white p-4">
        <h2 className="text-xl font-semibold">فیلتر و دسته‌بندی</h2>
      </div>
      <FilterOptions filters={filters} filterOptions={filterOptions} onFilterChange={onFilterChange} />
      <CategoryFilter
        categories={categories}
        activeMainCategory={activeMainCategory}
        activeSecondCategory={activeSecondCategory}
        setActiveMainCategory={setActiveMainCategory}
        setActiveSecondCategory={setActiveSecondCategory}
        handleCategoryClick={handleCategoryClick}
      />
    </div>
  )
}

export default ShopSidebar
