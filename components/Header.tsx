import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import styles from "src/styles/main.module.scss"
import { CONST, ROUTES } from "src/utils/constants"
import { LoginMenu } from "./LoginMenu"
import { capitalize } from "src/utils/func"

export function Header() {
  const router = useRouter()

  const toggleTheme = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark")
    } else {
      document.documentElement.classList.add("dark")
    }
  }

  const activeStyles = styles.activeLink + " " + "text-cyan-600 dark:text-cyan-400"
  const defaultStyles =
    "relative block px-3 py-2 transition hover:text-cyan-600 dark:hover:text-cyan-400"

  return (
    <header className="fixed z-100 flex flex-col top-0 h-16 pt-6 w-full">
      <div className="relative flex flex-row justify-between content-center pl-10 pr-10">
        <div className="flex justify-start items-center">
          <div className="mr-5 h-10 w-10 rounded-full bg-white/90 p-0.5 shadow-lg shadow-zinc-800/5
           ring-1 ring-zinc-900/5 backdrop-blur dark:bg-gray-800 dark:ring-white/10">
            <LoginMenu
              component={
                <Image src="/assets/icons/radiation.png" alt="icon" width={40} height={40} />
              }
            />
          </div>
          <h1 className="text-2xl font-extrabold mr-5 inline-block">
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-fuchsia-300">
              {CONST.SITE_NAME}
            </span>
          </h1>
        </div>
        <nav className="pointer-events-auto hidden md:block">
          <ul className="flex rounded-full bg-white/90 px-4 text-sm font-medium text-zinc-800
          shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-gray-800
          dark:text-zinc-200 dark:ring-white/10">
            {ROUTES.map((route) => (
              <li key={route.path}>
                <Link href={route.path}>
                  <a
                    className={
                      defaultStyles + " " + (router.pathname == route.path ? activeStyles : "")
                    }
                  >
                    {capitalize(route.name)}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex">
          <div className="pointer-events-auto">
            <button
              onClick={toggleTheme}
              type="button"
              aria-label="Toggle dark mode"
              className="group rounded-full bg-white/90 px-3 py-2 shadow-lg shadow-zinc-800/5
               ring-1 ring-zinc-900/5 backdrop-blur transition dark:bg-gray-800 dark:ring-white/10
                dark:hover:ring-white/20"
            >
              <svg
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="h-6 w-6 fill-zinc-100 stroke-zinc-500 transition group-hover:fill-zinc-200
                 group-hover:stroke-zinc-700 dark:hidden [@media(prefers-color-scheme:dark)]:fill-teal-50
                  [@media(prefers-color-scheme:dark)]:stroke-teal-500
                  [@media(prefers-color-scheme:dark)]:group-hover:fill-teal-50
                  [@media(prefers-color-scheme:dark)]:group-hover:stroke-teal-600"
              >
                <path d="M8 12.25A4.25 4.25 0 0 1 12.25 8v0a4.25 4.25 0 0 1 4.25 4.25v0a4.25 4.25 0 0 1-4.25 4.25v0A4.25 4.25 0 0 1 8 12.25v0Z" />
                <path
                  d="M12.25 3v1.5M21.5 12.25H20M18.791 18.791l-1.06-1.06M18.791 5.709l-1.06 1.06M12.25 20v1.5M4.5 12.25H3M6.77 6.77 5.709 5.709M6.77 17.73l-1.061 1.061"
                  fill="none"
                />
              </svg>
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="hidden h-6 w-6 fill-zinc-700 stroke-zinc-500 transition dark:block
                [@media(prefers-color-scheme:dark)]:group-hover:stroke-zinc-400
                [@media_not_(prefers-color-scheme:dark)]:fill-teal-400/10
                [@media_not_(prefers-color-scheme:dark)]:stroke-teal-500"
              >
                <path
                  d="M17.25 16.22a6.937 6.937 0 0 1-9.47-9.47 7.451 7.451 0 1 0 9.47 9.47ZM12.75 7C17 7 17 2.75 17 2.75S17 7 21.25 7C17 7 17 11.25 17 11.25S17 7 12.75 7Z"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
