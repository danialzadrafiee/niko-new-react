import { useState } from "react"
import { Product } from "@/types/product"
import numeral from "numeral"
import usePurchaseStore from "@/features/purchase/store/purchaseStore"
import { handleError } from "@/utils/errorHandler"

interface PurchaseSectionProps {
  product: Product
}

const PurchaseSection: React.FC<PurchaseSectionProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const createPurchase = usePurchaseStore((state) => state.createPurchase)

  const formatCurrency = (value: number) => {
    return numeral(value).format("0,0 تومان")
  }

  const incrementQuantity = () => setQuantity((prev) => prev + 1)
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1))

  const handlePurchase = async () => {
    setIsLoading(true)
    try {
      await createPurchase(product.id, quantity)
      // Optionally, you can reset the quantity or show a success message here
      setQuantity(1)
    } catch {
      handleError("خطا در خرید خدمت")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section>
      <div className="flex items-center mb-4 gap-[16px]">
        <div className="h-[32px] w-[16px] rounded bg-[#d6bbf7]"></div>
        <div className="text-lg font-semibold">خرید</div>
      </div>
      <div className="grid grid-cols-2 justify-start mobile:w-full w-[80%] gap-2 items-center">
        <div>
          <span>تعداد</span>
        </div>
        <div>
          <div className="flex gap-2">
            <button onClick={incrementQuantity} className="rounded shrink-0 border size-[38px] flex items-center justify-center">
              +
            </button>
            <input type="number" className="rounded border h-[38px] w-full text-center" value={quantity} readOnly />
            <button onClick={decrementQuantity} className="rounded shrink-0 border size-[38px] flex items-center justify-center">
              -
            </button>
          </div>
        </div>
        <div>
          <span>واحد</span>
        </div>
        <div>
          <span>{formatCurrency(product.price)}</span>
        </div>
        <div>
          <span>کل</span>
        </div>
        <div>
          <span className="text-xl font-semibold">{formatCurrency(product.price * quantity)}</span>
        </div>
        <div className="col-span-2">
          <button className={`btn btn-primary w-full mt-2 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`} onClick={handlePurchase} disabled={isLoading}>
            {isLoading ? "در حال پردازش..." : "خرید"}
          </button>
        </div>
      </div>
    </section>
  )
}

export default PurchaseSection
