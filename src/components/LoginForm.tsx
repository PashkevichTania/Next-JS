import { Label, TextInput, Button } from "flowbite-react"
import useAuth from "@/hooks/useAuth"

export default function LoginForm() {
  const { login } = useAuth()

  const submitHandler = (
    e: React.FormEvent<
      HTMLFormElement & {
        name: { value: string }
        password: { value: string }
      }
    >
  ) => {
    e.preventDefault()
    const target = e.currentTarget

    login({
      name: target.name.value,
      password: target.password.value,
    })
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={submitHandler}>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="name" value="User name" />
        </div>
        <TextInput name="name" type="name" placeholder="admin" autoComplete="on" required={true} />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password" value="Password" />
        </div>
        <TextInput
          name="password"
          type="password"
          autoComplete="current-password"
          required={true}
        />
      </div>
      <Button type="submit" gradientDuoTone="purpleToBlue">
        Log in
      </Button>
    </form>
  )
}
