import { create } from "zustand"
import * as authService from "@/features/auth/services/authService"
import * as verificationService from "@/features/auth/services/verificationService"
import { handleError, showSuccessToast } from "@/utils/errorHandler"
import Cookies from "js-cookie"
import { AuthState } from "@/types/auth"

const getInitialResendTime = () => {
  const storedTime = localStorage.getItem("resendTime")
  if (storedTime) {
    const parsedTime = parseInt(storedTime, 10)
    if (parsedTime > Date.now()) {
      return parsedTime
    }
  }
  return null
}

const getPersistedUser = () => {
  const storedUser = localStorage.getItem("user")
  return storedUser ? JSON.parse(storedUser) : null
}

const useAuthStore = create<AuthState>((set, get) => ({
  token: Cookies.get("auth_token") || null,
  user: getPersistedUser(),
  resendTime: getInitialResendTime(),
  isExistingUser: null,
  phone: "",
  authStage: "phone",

  initializeAuth: async () => {
    const token = Cookies.get("auth_token")
    if (token) {
      set({ token })
      try {
        const user = await authService.fetchUser()
        get().setUser(user)
      } catch (error) {
        handleError(error, "Error fetching user data")
        get().logout()
      }
    }
  },

  setToken: (token) => {
    set({ token })
    if (token) {
      Cookies.set("auth_token", token, { expires: 7 })
    } else {
      Cookies.remove("auth_token")
    }
  },

  setUser: (user) => {
    set({ user })
    if (user) {
      localStorage.setItem("user", JSON.stringify(user))
    } else {
      localStorage.removeItem("user")
    }
  },

  setResendTime: (time) => {
    if (time) {
      localStorage.setItem("resendTime", time.toString())
    } else {
      localStorage.removeItem("resendTime")
    }
    set({ resendTime: time })
  },

  handlePhoneSubmit: async (values) => {
    try {
      const exists = await authService.checkPhone(values.phone)
      set({ isExistingUser: exists, phone: values.phone, authStage: exists ? "login" : "signup" })
      if (!exists && !get().resendTime) {
        await get().handleResendCode()
      }
    } catch (error) {
      handleError(error, "Error checking phone number")
    }
  },

  handleAuth: async (values) => {
    try {
      let result
      if (get().isExistingUser) {
        result = await authService.login(values.phone, values.password)
      } else {
        result = await authService.signup(values.phone, values.code!, values.password)
      }
      get().setToken(result.token)
      get().setUser(result.user)
      showSuccessToast("Logged in successfully")
    } catch (error) {
      handleError(error, "Authentication failed")
    }
  },

  handleResendCode: async () => {
    try {
      const code = await verificationService.sendVerificationCode(get().phone)
      console.log("Verification code:", code)
      showSuccessToast("Verification code sent")
      const newResendTime = Date.now() + 60000 // 1 minute from now
      get().setResendTime(newResendTime)
    } catch (error) {
      handleError(error, "Error sending verification code")
    }
  },

  logout: () => {
    set({ token: null, user: null, isExistingUser: null, phone: "", authStage: "phone" })
    Cookies.remove("auth_token")
    localStorage.removeItem("user")
  },

  fetchUser: async () => {
    try {
      const user = await authService.fetchUser()
      get().setUser(user)
    } catch (error) {
      handleError(error, "Error fetching user data")
      get().logout()
    }
  },
}))

export default useAuthStore