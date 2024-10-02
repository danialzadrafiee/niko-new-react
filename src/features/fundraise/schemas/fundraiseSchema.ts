import { z } from "zod"

export const fundraiseValidationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  amount: z.number().min(1, "Amount must be greater than 0"),
  price_per_single_product: z.number().min(0, "Price per product must be a positive number"),
  deadline: z.string().min(1, "Deadline is required"),
  describe: z.string().min(1, "Description is required"),
  picture: z.instanceof(File).nullable(),
  product_id: z.string().min(1, "Product is required"),
})

export type FundraiseFormValues = z.infer<typeof fundraiseValidationSchema>

export const fundraiseInitialValues: FundraiseFormValues = {
  title: "",
  amount: 0,
  price_per_single_product: 0,
  deadline: "",
  describe: "",
  picture: null,
  product_id: "",
}