import "../styles/globals.css"
import type { AppProps } from "next/app"
import wrapper from "../RTK/store";

// https://nextjs.org/docs/advanced-features/custom-app

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="relative flex flex-col bg-white dark:bg-gray-800/50 text-black dark:text-white">
      <Component {...pageProps} />
    </div>
  )
}

export default wrapper.withRedux(MyApp)
