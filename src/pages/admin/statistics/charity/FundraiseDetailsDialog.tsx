import React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Fundraise } from "./types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

interface FundraiseDetailsDialogProps {
  fundraise: Fundraise | null
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

const FundraiseDetailsDialog: React.FC<FundraiseDetailsDialogProps> = ({
  fundraise,
  isOpen,
  onOpenChange,
}) => {
  if (!fundraise) return null

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary">جزئیات صندوق</DialogTitle>
        </DialogHeader>
        <Separator className="my-4" />
        <div className="grid gap-6">
          <Card className="border-2 border-primary shadow-md">
            <CardHeader className="bg-primary/10">
              <CardTitle className="text-primary">اطلاعات اصلی</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-2 gap-4">
                {[
                  { label: "عنوان", value: fundraise.title },
                  { label: "توضیحات", value: fundraise.describe },
                  { label: "تعداد خدمت", value: fundraise.amount },
                  { label: "قیمت هر واحد", value: `${fundraise.price_per_single_product} تومان` },
                  { label: "قیمت کل", value: `${fundraise.price_total} تومان` },
                  { label: "وضعیت", value: <Badge variant="outline">{fundraise.status}</Badge> },
                  { label: "مهلت", value: new Date(fundraise.deadline).toLocaleDateString("fa-IR") },
                  { label: "مبلغ جمع‌آوری شده", value: `${fundraise.price_collected} تومان` },
                  { label: "مبلغ باقی‌مانده", value: `${fundraise.remaining_amount} تومان` },
                  { label: "درصد تکمیل", value: `${fundraise.completion_percentage.toFixed(2)}%` },
                ].map(({ label, value }) => (
                  <React.Fragment key={label}>
                    <dt className="font-semibold text-gray-600">{label}:</dt>
                    <dd className="text-gray-900">{value}</dd>
                  </React.Fragment>
                ))}
              </dl>
              <Progress value={fundraise.completion_percentage} className="mt-4" />
            </CardContent>
          </Card>

          <Card className="border-2 border-secondary shadow-md">
            <CardHeader className="bg-secondary/10">
              <CardTitle className="text-secondary">اطلاعات خدمت</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-2 gap-4">
                {[
                  { label: "نام خدمت", value: fundraise.product.title },
                  { label: "موجودی", value: fundraise.product.balance },
                  { label: "قیمت", value: `${fundraise.product.price} تومان` },
                  { label: "دسته‌بندی", value: fundraise.product.category.name },
                  { label: "موقعیت", value: fundraise.product.location },
                ].map(({ label, value }) => (
                  <React.Fragment key={label}>
                    <dt className="font-semibold text-gray-600">{label}:</dt>
                    <dd className="text-gray-900">{value}</dd>
                  </React.Fragment>
                ))}
              </dl>
            </CardContent>
          </Card>

          <Card className="border-2 border-accent shadow-md">
            <CardHeader className="bg-accent/10">
              <CardTitle className="text-accent">سرمایه‌گذاری‌ها</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="bg-accent/5">
                    <TableHead>شناسه سرمایه‌گذار</TableHead>
                    <TableHead>مبلغ</TableHead>
                    <TableHead>ناشناس</TableHead>
                    <TableHead>تاریخ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fundraise.invests.map((invest) => (
                    <TableRow key={invest.id} className="hover:bg-accent/5">
                      <TableCell>{invest.investor_id}</TableCell>
                      <TableCell>{invest.amount} تومان</TableCell>
                      <TableCell>{invest.anonymous ? "بله" : "خیر"}</TableCell>
                      <TableCell>{new Date(invest.created_at).toLocaleDateString("fa-IR")}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)} variant="outline" className="mt-4">بستن</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default FundraiseDetailsDialog