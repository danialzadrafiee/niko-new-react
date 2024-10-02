import React from "react"
import useAuthStore from "@/features/auth/store/authStore"
import AuthPhoneForm from "./AuthPhoneForm"
import AuthLoginForm from "./AuthLoginForm"
import AuthSignupForm from "./AuthSignupForm"

const Auth: React.FC = () => {
  const { isExistingUser, authStage, token, logout } = useAuthStore()

  if (token) {
    return (
      <div className="max-w-md p-6 mx-auto mt-10 rounded ">
        <h2 className="mb-6 text-2xl font-bold text-center">شما وارد شده‌اید</h2>
        <button onClick={logout} className="w-full p-2 text-white transition-colors bg-red-500 rounded hover:bg-red-600">
          خروج
        </button>
      </div>
    )
  }

  const renderForm = () => {
    switch (authStage) {
      case "phone":
        return <AuthPhoneForm />
      case "login":
        return <AuthLoginForm />
      case "signup":
        return <AuthSignupForm />
      default:
        return null
    }
  }

  return (
    <div className="max-w-md p-6 mx-auto mt-10 bg-white rounded shadow-md">
      <h2 className="mb-6 text-xl font-bold text-center">{authStage === "phone" ? "شماره تلفن  خود را وارد کنید" : isExistingUser ? "ورود" : "ثبت نام"}</h2>
      {renderForm()}
    </div>
  )
}

export default Auth
