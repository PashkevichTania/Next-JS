import { MainLayout } from "@/components/MainLayout"
import stylesMain from "@/styles/main.module.scss"
import Link from "next/link"
import { CONST } from "@/utils/constants"

const About = () => {
  return (
    <MainLayout title={"About"}>
      <section className="mt-64 flex flex-col justify-center items-center">
        <div className="w-[80%] text-base">
          <div className={stylesMain.glass}>
            <div className="p-5">
              <p>
                This website created with{" "}
                <a
                  href="https://nextjs.org"
                  className="font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline"
                >
                  NextJS
                </a>{" "}
                and styled with{" "}
                <a
                  href="https://tailwindcss.com"
                  className="font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline"
                >
                  TailwindCSS
                </a>{" "}
                and{" "}
                <a
                  href="https://flowbite.com"
                  className="font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline"
                >
                  Flowbite
                </a>
                .
              </p>
              <p>
                This is a Demo version of the app without full functionality.
                You can get full example from <a
                className="font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline"
                href={CONST.LINKS.PROJECT}>GitHub
              </a>
              </p>
              <br/>
              <p>
                Space background on home page is{" "}
                <a
                  href="https://www.freepik.com/free-vector/alien-night-planet-landscape-space-game-background_28590659.htm#page=3&query=space%20vector&position=26&from_view=author"
                  className="font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline"
                >
                  Image by upklyak
                </a>{" "}
                on Freepik. <br />
                Some other icons is also from{" "}
                <a
                  href="https://www.freepik.com"
                  className="font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline"
                >
                  Freepik
                </a>
              </p>
              <p>
                Other images, like glass planet and ps4 controller on the home page, I drew myself
                in Adobe Illustrator.
              </p>
              <p>
                There is also an API that can be accessed by /api url, check quick docs here:{" "}
                <Link href="/apiPage">
                  <a className="font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline">
                    API
                  </a>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}

export default About
