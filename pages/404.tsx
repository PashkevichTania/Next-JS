import { MainLayout } from "components/MainLayout"
import { useRouter } from "next/router"
import { Button } from "flowbite-react"
import { RiArrowGoBackFill } from "react-icons/all"



export default function Error404() {
  const router = useRouter()
  return (
    <MainLayout title={"404 | Page not found"}>
      <div className="bg-white dark:bg-gray-800/50 h-[100%] relative flex flex-col grow justify-center items-center">
        <p className="text-base text-lg mb-6"><span className="text-xl border-solid border-r-2 border-gray-200 dark:border-gray-700 mr-2 pr-2">404</span>This page could not be found.</p>
        <div className="max-w-[200px]">
          <Button gradientDuoTone="purpleToBlue"  onClick={() => router.back()}>
            Go back
            <RiArrowGoBackFill className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </MainLayout>
  )
}
