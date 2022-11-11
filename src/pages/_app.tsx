import type { AppProps } from "next/app"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "@/styles/globals.scss"
import { QueryClientProvider } from "react-query"
import { queryClient } from "src/query"
import { ReactQueryDevtools } from "react-query/devtools"

// https://nextjs.org/docs/advanced-features/custom-app

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <QueryClientProvider client={queryClient}>
        <div className="relative flex flex-col justify-between bg-white dark:bg-gray-800/50 text-black dark:text-white">
          <Component {...pageProps} />
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
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  )
}

export default MyApp
