import "../styles/globals.css"
import type { AppProps } from "next/app"

// https://nextjs.org/docs/advanced-features/custom-app

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="relative flex flex-col">
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
