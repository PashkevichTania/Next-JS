import auth from "@/store/auth"
import { notifyError, notifySuccess } from "@/utils/notification"

export default function useAuth() {
  const isLoggedIn = auth.state.isAuth
  const userName = auth.state.name

  const login = ({ name, password }: { name: string; password: string }) => {
    if (name === process.env.ADMIN_NAME && password === process.env.ADMIN_PASSWORD) {
      localStorage.setItem("auth", name)
      auth.set({
          name,
          isAuth: true,
        })
      notifySuccess("Logged in!")
      return true
    }
    notifyError("Invalid name or password!")
    return false
  }

  const logOut = () => {
    localStorage.removeItem("auth")
    auth.clear()
  }

  return {
    isLoggedIn,
    userName,
    login,
    logOut,
  }
}
