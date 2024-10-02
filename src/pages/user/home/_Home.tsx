import HomeAbout from "./HomeAbout"
import ShopFeatured from "@/components/shop/ShopFeatured"
import HomeCarousel from "./HomeCrausel"
import useHomeStore from "@/features/home/store/homeStore"
import SideMenu from "./SideMenu"
import { useEffect } from "react"

export default function Home() {
  const { homeData, loading, fetchHomeData } = useHomeStore()

  useEffect(() => {
    fetchHomeData()
  }, [fetchHomeData])

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  if (!homeData) {
    return <div className="flex justify-center items-center h-screen">Error loading home page data</div>
  }

  return (
    <div className="w-full">
      <header className="w-full">
        <div className="flex flex-col md:flex-row gap-6 mx-auto max-w-7xl px-4 md:px-6">
          <SideMenu categories={homeData.selectedCategories} />
          <HomeCarousel carouselItems={homeData.carouselItems} />
        </div>
      </header>
      <main className="w-full">
        <section className=" md:px-6">
          <div className="grid gap-10 md:gap-20 mx-auto mt-5 md:mt-10 max-w-7xl">
            <div className="grid gap-10 md:gap-20">
              <ShopFeatured variant="fundraise_special" title="صندوق نزدیک به تکمیل شدن" sortBy="mostly_collected" sortOrder="desc" />
              <ShopFeatured variant="fundraise_normal" title="آخرین صندوق ها" supTitle="جدید ترین صندوق های خیریه" sortBy="created_at" sortOrder="desc" />
            </div>
            <ShopFeatured sortBy="created_at" variant="product_normal" title="جدیدترین کامل ها" supTitle="جدید ترین ایتم های مهربانی کامل" />
            <HomeAbout />
          </div>
        </section>
      </main>
    </div>
  )
}
