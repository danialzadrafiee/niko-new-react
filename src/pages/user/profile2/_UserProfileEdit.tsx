import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { useUserStore } from "@/features/user/store/userStore"
import { userUpdateSchema } from "@/features/user/schemas/userSchema"
import useAuthStore from "@/features/auth/store/authStore"
import { User } from "@/types/user"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import Avvvatars from "avvvatars-react"
import PersonalInfoTab from "@/components/profile/PersonalInfoTab"
import SocialMediaTab from "@/components/profile/SocialMediaTab"
import FinancialInfoTab from "@/components/profile/FinancialInfoTab"
import { getImageUrl } from "@/utils/env"

const PERSONAL_INFO = "اطلاعات شخصی"
const SOCIAL_MEDIA = "رسانه‌های اجتماعی"
const FINANCIAL_INFO = "اطلاعات مالی"
const SAVE_CHANGES = "ذخیره تغییرات"
const LOADING = "در حال بارگذاری..."

const UserProfileEdit: React.FC = () => {
  const { updateUser } = useUserStore()
  const { user, fetchUser } = useAuthStore()
  useEffect(() => {
    fetchUser()
  }, [fetchUser])
  const form = useForm<User>({
    resolver: zodResolver(userUpdateSchema),
    defaultValues: user || {},
  })

  const onSubmit = async (data: User) => {
    if (user) {
      const formData = new FormData()
      Object.entries(data).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== "") {
          if (key === "avatar" || key === "banner" || key === "kyc_picture") {
            if (value instanceof File) {
              formData.append(key, value, value.name)
            } else if (typeof value === "string" && value.startsWith("data:")) {
              fetch(value)
                .then((res) => res.blob())
                .then((blob) => {
                  const file = new File([blob], `${key}.jpg`, { type: "image/jpeg" })
                  formData.append(key, file)
                })
            }
          } else {
            formData.append(key, value.toString())
          }
        }
      })
      formData.append("_method", "PUT")
      await updateUser(user.id, formData)
      window.location.reload()
    }
  }

  if (!user) return <div>{LOADING}</div>
  const displayName = user.username || `${user.first_name || ""} ${user.last_name || ""}`.trim() || user.phone
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Avatar className="w-12 h-12">{user.avatar ? <AvatarImage src={getImageUrl(user.avatar)} /> : <Avvvatars size={48} value={displayName} />}</Avatar>
          <CardTitle className="text-2xl">{displayName}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Tabs dir="rtl" defaultValue="personal">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="personal">{PERSONAL_INFO}</TabsTrigger>
              <TabsTrigger value="social">{SOCIAL_MEDIA}</TabsTrigger>
              <TabsTrigger value="financial">{FINANCIAL_INFO}</TabsTrigger>
            </TabsList>
            <TabsContent value="personal">
              <PersonalInfoTab form={form} />
            </TabsContent>
            <TabsContent value="social">
              <SocialMediaTab form={form} />
            </TabsContent>
            <TabsContent value="financial">
              <FinancialInfoTab form={form} />
            </TabsContent>
          </Tabs>
          <Button type="submit" className="mt-4">
            {SAVE_CHANGES}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default UserProfileEdit
