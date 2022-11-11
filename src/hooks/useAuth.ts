import { authActions } from "@/store/authSlice"
import { authSelector } from "@/store/selectors"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { notifyError, notifySuccess } from "@/utils/notification"

export default function useAuth() {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(authSelector).isAuth
  const userName = useAppSelector(authSelector).name

  const ADMIN_REDIRECT = "ADMIN_REDIRECT"

  const login = ({ name, password }: { name: string; password: string }) => {
    if (name === process.env.ADMIN_NAME && password === process.env.ADMIN_PASSWORD) {
      localStorage.setItem("auth", name)
      dispatch(
        authActions.set({
          name,
          isAuth: true,
        })
      )
      notifySuccess("Logged in!")
      return true
    }
    notifyError("Invalid name or password!")
    return false
  }

  const logOut = () => {
    localStorage.removeItem("auth")
    dispatch(authActions.clear())
  }

  return {
    isLoggedIn,
    userName,
    login,
    logOut,
    ADMIN_REDIRECT,
  }
}
