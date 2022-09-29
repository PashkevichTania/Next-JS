import React from "react"
import { useRouter } from "next/router"
import { idsArrayToQuery } from "utils/apiUtils"


const API = () => {
  const router = useRouter()
  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault()
    const target = e.target as typeof e.target & {
      id: { value: string };
    }
    router.push(`api/games/${target.id.value}`)
  }
  const submitHandlerBrief = (e: React.SyntheticEvent) => {
    e.preventDefault()
    const target = e.target as typeof e.target & {
      ids: { value: string };
    }
    const q = idsArrayToQuery(JSON.parse(target.ids.value))
    console.log(q)
    router.push(`api/games/brief?${q}`)
  }


  return (
      <section className="mt-12 flex flex-col justify-center items-center">
        <div className="w-[80%] text-base">
          <h2>API Docs</h2>
          <ul className="mb-6">
            <li><a href="/" className="font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline">Back to
              main app</a></li>
            <li>All games info
              JSON: <a href="api/games/"
                       className="font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline">/api/games/</a>
            </li>
            <li>All games brief
              info JSON: <a href=""
                            className="font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline">/api/games/brief</a>
            </li>
          </ul>
          <div className="mb-6">
            <p>Or you can see brief info on specific games by it&apos;s ID. Like <span
              className="p-1 border-solid border-[1px] rounded-md border-gray-300 bg-slate-700">
              /api/games/brief?ids=[your_id_1]&ids=[your_id_2]
            </span>
            </p>
            <p>Enter game IDS below and check out.</p>
          </div>
          <form onSubmit={submitHandlerBrief} className="mb-6">
            <div className="mb-6">
              <label htmlFor="ids" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Game
                IDS</label>
              <input type="text" name="ids"
                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                     placeholder='["i960g6", "a884nl"]' defaultValue='["i960g6", "a884nl"]' required />
            </div>
            <button type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Go
            </button>
          </form>
          <div className="mb-6">
            <p>Or you can see full info on specific game by it&apos;s ID. Like <span
              className="p-1 border-solid border-[1px] rounded-md border-gray-300 bg-slate-700">/api/games/[your_id]</span>
            </p>
            <p>Enter game ID below and check out.</p>
          </div>
          <form onSubmit={submitHandler} className="mb-6">
            <div className="mb-6">
              <label htmlFor="id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Game
                ID</label>
              <input type="text" name="id"
                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                     placeholder="i960g6" defaultValue="i960g6" required />
            </div>
            <button type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Go
            </button>
          </form>
        </div>
      </section>
  )
}

export default API
