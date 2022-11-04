import { authActions } from "@/store/authSlice"
import { authSelector } from "@/store/selectors"
import { toast } from "react-toastify"
import { useAppDispatch, useAppSelector } from "@/store/hooks"

export default function useAuth() {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(authSelector).isAuth
  const userName = useAppSelector(authSelector).name

  const notifyError = () =>
    toast.error("Invalid name or password!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: document.documentElement.classList.contains("dark") ? "dark" : "light",
    })

  const notifySuccess = () =>
    toast.success("Logged in!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: document.documentElement.classList.contains("dark") ? "dark" : "light",
    })

  const login = ({ name, password }: { name: string; password: string }) => {
    if (name === process.env.ADMIN_NAME && password === process.env.ADMIN_PASSWORD) {
      localStorage.setItem("auth", name)
      dispatch(
        authActions.set({
          name,
          isAuth: true,
        })
      )
      notifySuccess()
      return true
    }
    notifyError()
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
  }
}
