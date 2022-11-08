import { Label, TextInput, Button } from "flowbite-react"
import { useState } from "react"
import useAuth from "@/hooks/useAuth"

export const LoginMenu = ({ component }: { component: JSX.Element }) => {
  const [open, setOpen] = useState(false)
  const { userName, isLoggedIn, login, logOut } = useAuth()

  const clickHandler = () => {
    setOpen(!open)
  }

  const submitHandler = (e: React.FormEvent<HTMLFormElement & {
    name: { value: string }
    password: { value: string }
  }>) => {
    e.preventDefault()
    const target = e.currentTarget
    console.debug(e.target)
    login({
      name: target.name.value,
      password: target.password.value,
    })
  }

  return (
    <div className="relative">
      <button onClick={clickHandler}>{component}</button>
      <div
        className="absolute bg-white dark:bg-gray-800 w-52 p-4 mt-2 rounded-lg"
        style={{ display: open ? "block" : "none" }}
      >
        {isLoggedIn ? (
          <div>
            <p className="text-center pb-4">
              Logged in as:{" "}
              <span className="font-semibold text-gray-900 underline dark:text-white decoration-blue-500">
                {userName}
              </span>
            </p>
            <Button type="submit" gradientDuoTone="purpleToBlue" onClick={logOut}>
              Log out
            </Button>
          </div>
        ) : (
          <form className="flex flex-col gap-4" onSubmit={submitHandler}>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Your user name" />
              </div>
              <TextInput id="name" name="name" type="name" placeholder="admin" required={true} />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Your password" />
              </div>
              <TextInput id="password" name="password" type="password" required={true} />
            </div>
            <Button type="submit" gradientDuoTone="purpleToBlue">
              Log in
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}
