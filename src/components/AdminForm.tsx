import { GameForm } from "@/components/GameForm"
import useAuth from "@/hooks/useAuth"
import LoginForm from "@/components/LoginForm"


const AdminForm = () => {
  const { isLoggedIn } = useAuth()

  return (
    <div
      className="h-[100%] p-5 overflow-y-auto rounded-lg bg-white text-sm font-medium
    text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
    >
      {isLoggedIn ? (
        <div>
          <h3>To add or edit game you need to be logged in!</h3>
          <GameForm />
        </div>
      ) : (
        <LoginForm />
      )}
    </div>
    )
}

export default AdminForm
