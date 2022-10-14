import "src/styles/globals.css"
import type { AppProps } from "next/app"
import wrapper from "src/RTK/store"
import { Provider } from "react-redux";
// https://nextjs.org/docs/advanced-features/custom-app

function MyApp({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
        <div className="relative flex flex-col justify-between bg-white dark:bg-gray-800/50 text-black dark:text-white">
          <Component {...props.pageProps} />
        </div>
    </Provider>
  )
}

export default MyApp
