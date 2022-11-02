import type { AppProps } from "next/app"
import { Provider } from "react-redux"
import wrapper from "@/store/store"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "@/styles/globals.scss"

// https://nextjs.org/docs/advanced-features/custom-app

function MyApp({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest)

  return (
    <Provider store={store}>
      <div className="relative flex flex-col justify-between bg-white dark:bg-gray-800/50 text-black dark:text-white">
        <Component {...props.pageProps} />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </Provider>
  )
}

export default MyApp
