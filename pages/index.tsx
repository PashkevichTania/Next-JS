import { useEffect, useRef, useState } from "react"

import dynamic from "next/dynamic"
import Image from "next/image"
import Link from "next/link"

import { MainLayout } from "components/MainLayout"
import { GameCard } from "components/GameCard"
import Loader from "components/Loader"

import { CONST } from "utils/constants"
import { getGameDataBrief } from "server/AceDB"
import { GameDataBrief } from "utils/intefaces"

import stylesMain from "styles/main.module.scss"
import styles from "styles/home.module.scss"

import controller from "public/assets/ps4controller.png"
import planet from "public/assets/glass_planet.png"

const HomeBG = dynamic(() => import("components/HomeBG"), {
  ssr: false,
})
const Carousel = dynamic(() => import("components/Carousel"), {
  ssr: false,
})

interface HomePageProps {
  games: GameDataBrief[]
}

const gamesToPreview = [
  "i960g6", //"The Last of Us Part I"
  "a884nl", //"The Last of Us Part II"
  "r63vpd", //"Disco Elysium: The Final Cut"
  "8swucl", //"BioShock Infinite"
  "kn15c7", //"Fortnite"
  "45ec0g", //"Cyberpunk 2077"
]

const Home = ({ games }: HomePageProps) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    isLoaded ? (ref.current.style.display = "none") : (ref.current.style.display = "fixed")
  }, [isLoaded])

  return (
    <MainLayout title={"Home"}>
      <div className="w-[100%] h-[100%] fixed bg-white dark:bg-gray-800 z-90" ref={ref}>
        <Loader />
      </div>
      <HomeBG setLoaded={setIsLoaded} />
      <div
        id="home_main"
        className="relative flex flex-col justify-center items-center bg-gradient-to-b from-[#070f4d] to-[#000515] pt-16 pb-32"
      >
        <div className="w-[90%] text-white">
          <div className={stylesMain.glass}>
            <div className="pt-12 pb-12 pr-10 pl-10">
              <div className="align-bottom mb-6">
                <h2 className="text-5xl font-extrabold mr-5 inline-block">
                  <span className="text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-fuchsia-300">
                    {CONST.SITE_NAME}
                  </span>
                </h2>
                <p className="text-3xl inline-block">
                  It&apos;s a website to explore gaming world!
                </p>
              </div>
              <div className="text-base text-lg">
                <p>
                  Hi! My name is Tania Pashkevich and I&apos;m a frontend developer. I created this
                  website as a demo project and to learn NextJS. I really like video games so I
                  decided to make a website about them. Here you can check out different games, read
                  about them and see metacritics score.
                </p>
                <p>
                  I love gaming, I have been playing since I was 8 years old. I have a PS5 and PC,
                  and I love playing games on both platforms. My favorite game series of all time is
                  the Last of Us, this is one of the best games I&apos;ve ever played. The story is
                  so powerful and the characters are so believable. And I am also a big fan of
                  Cyberpunk 2077 and S.T.A.L.K.E.R. I also enjoy indie games, like What Remains of
                  Edith Finch. I like when you can just explore the locations and see the beautiful
                  story unfold before you. I think games like this are so important in the industry
                  because they show that you don&apos;t need to have a huge budget to create
                  something beautiful and captivating.
                </p>
              </div>
              <div className="grid grid-cols-[40%_60%] gap-6">
                <div className="text-base flex flex-col justify-center items-center">
                  <h3 className="text-4xl font-extrabold mb-3">Best of the best</h3>
                  <p className="text-base text-lg mb-6">
                    Explore more games and find something you like.
                  </p>
                  <Link href="/games/">
                    <a
                      className="text-white bg-gradient-to-br from-purple-600 to-blue-500
                     hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300
                      dark:focus:ring-blue-800 shadow-lg shadow-blue-800
                       font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2
                       text-center inline-flex items-center
                       "
                    >
                      Browse more
                      <svg
                        aria-hidden="true"
                        className="ml-2 -mr-1 w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </Link>
                </div>
                <Carousel>
                  {games.map((game) => (
                    <GameCard
                      key={game.id}
                      cover={game.cover}
                      id={game.id}
                      name={game.name}
                      rating={game.rating}
                      ratingAge={game.ratingAge}
                    />
                  ))}
                </Carousel>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.controller}>
          <Image
            src={controller}
            width={controller.width / 2}
            height={controller.height / 2}
            alt="ps4 controller vector"
          />
        </div>
        <div className={styles.planet}>
          <Image
            src={planet}
            width={planet.width / 2}
            height={planet.height / 2}
            alt="glass planet vector"
          />
        </div>
      </div>
    </MainLayout>
  )
}

export async function getStaticProps() {
  //"You should not fetch an API route from getStaticProps..."
  const result = await getGameDataBrief(gamesToPreview)

  return {
    props: { games: result as GameDataBrief[] },
  }
}

export default Home
