import { CONST } from "@/utils/constants"


const AdminForm = () => {
  return (
    <div
      className="h-[100%] p-5 overflow-y-auto rounded-lg bg-white text-sm font-medium
    text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
    >
      <p className="text-xl font-semibold text-yellow-300">This is a Demo version of the app without full functionality.
        You can get full example from <a className="text-blue-300 underline" href={CONST.LINKS.PROJECT}>GitHub</a>.
      </p>
    </div>
    )
}

export default AdminForm
