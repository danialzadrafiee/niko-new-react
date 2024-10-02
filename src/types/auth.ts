import { User } from "./user"

export interface AuthResult {
  token: string
  user: User
}
export interface AuthState {
  token: string | null
  user: User | null
  resendTime: number | null
  isExistingUser: boolean | null
  phone: string
  authStage: "phone" | "login" | "signup"
  setToken: (token: string | null) => void
  setUser: (user: User | null) => void
  setResendTime: (time: number | null) => void
  handlePhoneSubmit: (values: { phone: string }) => Promise<void>
  handleAuth: (values: { phone: string; password: string; code?: string }) => Promise<void>
  handleResendCode: () => Promise<void>
  logout: () => void
  initializeAuth: () => void
  fetchUser: () => Promise<void>
}
