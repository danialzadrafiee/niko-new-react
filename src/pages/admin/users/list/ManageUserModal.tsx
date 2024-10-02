import React, { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { User } from "@/types/user"
import { getImageUrl } from "@/utils/env"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge, Clock } from "lucide-react"
import { Separator } from "@/components/ui/separator"

interface ManageUserModalProps {
  user: User
  onClose: () => void
  onUpdate: (userData: Partial<User>) => void
}

export const ManageUserModal: React.FC<ManageUserModalProps> = ({ user, onClose, onUpdate }) => {
  const [userData, setUserData] = useState<Partial<User>>({
    first_name: user.first_name || "",
    last_name: user.last_name || "",
    meli_code: user.meli_code || "",
    phone: user.phone || "",
    role: user.role || "",
    status: user.status || "",
    username: user.username || "",
    email: user.email || "",
    charity_status: user.charity_status || "",
    charity_reject_reason: user.charity_reject_reason || "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setUserData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string | number) => {
    setUserData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdate(userData)
  }

  const renderUserImage = (src: string | null, alt: string) => {
    return src ? (
      <div className="relative w-full h-40 rounded-lg overflow-hidden">
        <img src={getImageUrl(src)} alt={alt} className="object-cover w-full h-full" />
      </div>
    ) : (
      <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded-lg">
        <span className="text-gray-500">تصویر موجود نیست</span>
      </div>
    )
  }
  const CharityStatusBadge = ({ status }) => {
    const statusConfig = {
      none: { color: "bg-gray-500", label: "هیچکدام" },
      not_requested: { color: "bg-yellow-500", label: "درخواست نشده" },
      requested: { color: "bg-blue-500", label: "درخواست شده" },
      rejected: { color: "bg-red-500", label: "رد شده" },
      actived: { color: "bg-green-500", label: "فعال شده" },
    }

    const config = statusConfig[status] || statusConfig.none

    return <Badge className={`${config.color} text-white`}>{config.label}</Badge>
  }

  const InfoItem = ({ label, value, icon }) => (
    <div className="flex items-center space-x-2 space-x-reverse">
      {icon && icon}
      <div>
        <strong>{label}:</strong> {value || "ندارد"}
      </div>
    </div>
  )
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">مدیریت کاربر</DialogTitle>
          <DialogDescription>ویرایش و مشاهده اطلاعات کاربر</DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[75vh] pr-4">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Tabs defaultValue="basic-info" dir="rtl">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="basic-info">اطلاعات شخصی</TabsTrigger>
                <TabsTrigger value="charity-info">اطلاعات خیریه</TabsTrigger>
              </TabsList>

              <TabsContent value="basic-info">
                <Card>
                  <CardHeader>
                    <CardTitle>اطلاعات شخصی</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Input name="first_name" value={userData.first_name} onChange={handleInputChange} placeholder="نام" />
                      <Input name="last_name" value={userData.last_name} onChange={handleInputChange} placeholder="نام خانوادگی" />
                      <Input name="meli_code" value={userData.meli_code || ""} onChange={handleInputChange} placeholder="کد ملی" />
                      <Input name="phone" value={userData.phone} onChange={handleInputChange} placeholder="شماره تلفن" />
                      <Input name="username" value={userData.username || ""} onChange={handleInputChange} placeholder="نام کاربری" />
                      <Input name="email" value={userData.email || ""} onChange={handleInputChange} placeholder="ایمیل" />
                      <Select name="role" value={userData.role} onValueChange={(value) => handleSelectChange("role", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="انتخاب نقش" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="user">کاربر</SelectItem>
                          <SelectItem value="charity">خیریه</SelectItem>
                          <SelectItem value="admin">مدیر</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select name="status" value={userData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="انتخاب وضعیت" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">فعال</SelectItem>
                          <SelectItem value="deactive">غیرفعال</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-semibold mb-2">تصویر پروفایل</h3>
                        {renderUserImage(user.avatar, "Avatar")}
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">بنر</h3>
                        {renderUserImage(user.banner, "Banner")}
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <h3 className="font-semibold mb-2">شبکه‌های اجتماعی</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <InfoItem label="نام کاربری شبکه اجتماعی اول" value={user.social_media_username_fisrt} />
                        <InfoItem label="پلتفرم شبکه اجتماعی اول" value={user.social_media_platform_first} />
                        <InfoItem label="نام کاربری شبکه اجتماعی دوم" value={user.social_media_username_second} />
                        <InfoItem label="پلتفرم شبکه اجتماعی دوم" value={user.social_media_platform_second} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="charity-info">
                <Card>
                  <CardHeader>
                    <CardTitle>اطلاعات خیریه</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center justify-between">
                            وضعیت خیریه
                            <CharityStatusBadge status={userData.charity_status} />
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <Select name="charity_status" value={userData.charity_status} onValueChange={(value) => handleSelectChange("charity_status", value)}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="وضعیت خیریه" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">هیچکدام</SelectItem>
                              <SelectItem value="not_requested">درخواست نشده</SelectItem>
                              <SelectItem value="requested">درخواست شده</SelectItem>
                              <SelectItem value="rejected">رد شده</SelectItem>
                              <SelectItem value="actived">فعال شده</SelectItem>
                            </SelectContent>
                          </Select>
                          {userData.charity_status === "rejected" && (
                            <Textarea className="mt-4" name="charity_reject_reason" value={userData.charity_reject_reason || ""} onChange={handleInputChange} placeholder="دلیل رد درخواست خیریه" rows={4} />
                          )}
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle>تصویر KYC</CardTitle>
                        </CardHeader>
                        <CardContent>{renderUserImage(user.kyc_picture, "KYC Picture")}</CardContent>
                      </Card>
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle>اطلاعات مالی</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                          <InfoItem label="شبا" value={user.sheba_code} />
                          <InfoItem label="شماره کارت" value={user.card_number} />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>اطلاعات مکانی</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                          <InfoItem label="آدرس" value={user.address} />
                          <InfoItem label="موقعیت" value={user.location} />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>سایر اطلاعات</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <InfoItem label="نشان" value={user.badge} />
                          <Separator />
                          <div>
                            <strong>بیوگرافی:</strong>
                            <p className="bg-gray-100 p-3 rounded-lg mt-2">{user.bio || "ندارد"}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>تاریخچه</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                          <InfoItem label="تاریخ ایجاد" value={new Date(user.created_at).toLocaleString("fa-IR")} icon={<Clock className="h-4 w-4 text-blue-500" />} />
                          <InfoItem label="تاریخ به‌روزرسانی" value={new Date(user.updated_at).toLocaleString("fa-IR")} icon={<Clock className="h-4 w-4 text-green-500" />} />
                        </div>
                      </CardContent>
                    </Card>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <Button type="submit">به‌روزرسانی کاربر</Button>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}