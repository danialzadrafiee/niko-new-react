import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Card from "@/components/shop/ShopCard"
import { Fundraise } from "@/types/fundraise"
import { Product } from "@/types/product"
import ShopFeaturedBreak from "./ShopFeaturedBreak"
import { fetchFundraises } from "@/features/fundraise/services/fundraiseService"
import { fetchProducts } from "@/features/product/services/productService"

interface ShopFeaturedProps {
  variant: "fundraise_special" | "fundraise_normal" | "product_normal"
  title: string
  supTitle?: string
  sortBy: "mostly_collected" | "created_at" | "deadline" | "price"
  sortOrder?: "asc" | "desc"
}

const ShopFeatured: React.FC<ShopFeaturedProps> = ({ variant, title, supTitle, sortBy, sortOrder = "desc" }) => {
  const [featuredItems, setFeaturedItems] = useState<(Fundraise | Product)[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const params = {
          page: 1,
          per_page: 4,
          sort_by: sortBy,
          sort_order: sortOrder,
        }

        let response
        if (variant.startsWith("fundraise")) {
          response = await fetchFundraises(params)
        } else {
          response = await fetchProducts(params)
        }

        const itemsArray = Object.values(response.data)
        setFeaturedItems(itemsArray)
      } catch (error) {
        console.error(`Error fetching ${variant.startsWith("fundraise") ? "fundraises" : "products"}:`, error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [variant, sortBy, sortOrder])

  const cardVariant = variant === "product_normal" ? "product" : "fundraise"

  const getItemLink = (item: Fundraise | Product) => {
    if ("product_id" in item) {
      return `/fundraises/${item.id}`
    } else {
      return `/products/${item.id}`
    }
  }

  return (
    <main className={`relative w-full `}>
      <div className={`${variant === "fundraise_special" ? "w-full lg:bg-none  bg-[url(/img/shapeMobile.png)] bg-no-repeat  lg:h-[460px] bg-right-top bg-cover" : ""}`}>
        {variant === "fundraise_special" && <img src="/img/shape1.png" className="hidden sm:block lg:h-[460px] absolute top-0 -z-10 left-0" alt="Background shape" />}
        <div className="px-0 sm:px-[88px] pt-[24px] sm:pt-12">
          {variant === "fundraise_special" ? (
            <header>
              <h1 className="sticky font-bold pr-[16px] sm:pr-0 text-2xl sm:text-4xl text-white">{title}</h1>
            </header>
          ) : (
            <div className="pr-[16px] sm:pr-0">
              <ShopFeaturedBreak title={title} supTitle={supTitle} />
            </div>
          )}
          <section className="overflow-x-scroll sm:overflow-x-visible w-[calc(100dvw-10px)] sm:w-auto">
            <div className="grid w-max lg:w-full grid-cols-4 pt-[24px] sm:pt-10 pb-4 sm:pb-0 pr-[16px] sm:pr-0 gap-[12px] sm:gap-[24px]">
              {loading ? (
                <div>Loading...</div>
              ) : (
                featuredItems.map((item) => (
                  <Link key={item.id} to={getItemLink(item)} className="cursor-pointer">
                    <Card variant={cardVariant} data={item} />
                  </Link>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}

export default ShopFeatured
