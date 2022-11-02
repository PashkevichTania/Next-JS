import React from "react"
import { useRouter } from "next/router"
import { idsArrayToQuery } from "@/utils/back-end"
import { Button, TextInput } from "flowbite-react"

const API = () => {
  const router = useRouter()

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault()
    const target = e.target as typeof e.target & {
      id: { value: string }
    }
    router.push(`api/games/${target.id.value}`)
  }
  const submitHandlerBrief = (e: React.SyntheticEvent) => {
    e.preventDefault()
    const target = e.target as typeof e.target & {
      ids: { value: string }
    }
    const q = idsArrayToQuery(JSON.parse(target.ids.value))

    router.push(`api/games/brief?${q}`)
  }

  return (
    <section className="mt-12 flex flex-col justify-center items-center">
      <div className="w-[80%] text-base">
        <h2 className="font-bold text-xl mb-2">API Docs</h2>
        <ul className="mb-6">
          <li className="inline-block mb-4">
            <Button gradientDuoTone="purpleToBlue" onClick={() => router.push("/")}>
              Back to main app
            </Button>
          </li>
          <li>
            All games info JSON:{" "}
            <a
              href="api/games/"
              className="font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline"
            >
              /api/games/
            </a>
          </li>
          <li>
            All games brief info JSON:{" "}
            <a
              href="api/games/brief"
              className="font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline"
            >
              /api/games/brief
            </a>
          </li>
        </ul>
        <div className="mb-6">
          <p>
            Or you can see brief info on specific games by it&apos;s ID. Like{" "}
            <span className="p-1 border-solid border-[1px] rounded-md border-gray-300 bg-slate-700">
              /api/games/brief?ids=[your_id_1]&ids=[your_id_2]
            </span>
          </p>
          <p>Enter game IDS below and check out.</p>
        </div>
        <form onSubmit={submitHandlerBrief} className="mb-6">
          <div className="mb-6">
            <label
              htmlFor="ids"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Game IDS
            </label>
            <TextInput
              id="ids"
              name="ids"
              placeholder='["i960g6", "a884nl"]'
              defaultValue='["i960g6", "a884nl"]'
              required
            />
          </div>
          <div className="max-w-[55px]">
            <Button outline gradientDuoTone="purpleToBlue" type="submit">
              Go
            </Button>
          </div>
        </form>
        <div className="mb-6">
          <p>
            Or you can see full info on specific game by it&apos;s ID. Like{" "}
            <span className="p-1 border-solid border-[1px] rounded-md border-gray-300 bg-slate-700">
              /api/games/[your_id]
            </span>
          </p>
          <p>Enter game ID below and check out.</p>
        </div>
        <form onSubmit={submitHandler} className="mb-6">
          <div className="mb-6">
            <label
              htmlFor="id"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Game ID
            </label>
            <TextInput
              id="id"
              type="text"
              name="id"
              placeholder="i960g6"
              defaultValue="i960g6"
              required
            />
          </div>
          <div className="max-w-[55px]">
            <Button outline gradientDuoTone="purpleToBlue" type="submit">
              Go
            </Button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default API
