import { toast } from "react-toastify"

export const notifyError = (message: string) =>
  toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: document.documentElement.classList.contains("dark") ? "dark" : "light",
  })

export const notifySuccess = (message: string) =>
  toast.success(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: document.documentElement.classList.contains("dark") ? "dark" : "light",
  })
