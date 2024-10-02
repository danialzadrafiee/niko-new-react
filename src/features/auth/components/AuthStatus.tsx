import useAuthStore from "@/features/auth/store/authStore"
function AuthStatus() {
  const { token, user, logout } = useAuthStore()
  if (!token) {
    return <div className="hidden">No one is logged in.</div>
  }
  return (
    <div className="hidden">
      Logged in as: {user?.phone}{" "}
      <button onClick={logout} className="w-max text-xs mx-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
        Logout
      </button>
    </div>
  )
}

export default AuthStatus
