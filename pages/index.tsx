import { MainLayout } from "components/MainLayout"
import dynamic from "next/dynamic"
import { GameDataBrief } from "utils/apiUtils"
import Carousel from "components/Carousel"
import { GameCard } from "components/GameCard"

const HomeBG = dynamic(() => import("../components/HomeBG"), {
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

const arrayToQuery = (array: string[]) => {
  const query = new URLSearchParams()
  array.forEach((v) => query.append("ids", v))
  return query
}

const Home = ({ games }: HomePageProps) => {
  return (
    <MainLayout title={"Home"}>
      <HomeBG />
      <div
        id="home_main"
        className="flex bg-gradient-to-b from-[#070f4d] to-[#000515] pr-10 pl-10 pt-24 pb-32"
      >
        <div className="w-[35%]">
          <h1>NEXT</h1>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industrys standard dummy text ever since the 1500s, when an unknown printer
            took a galley of type and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting, remaining
            essentially unchanged. It was popularised in the 1960s with the release of Letraset
            sheets containing Lorem Ipsum passages, and more recently with desktop publishing
            software like Aldus PageMaker including versions of Lorem Ipsum.
          </p>
        </div>
        <div className="w-[65%]">
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
    </MainLayout>
  )
}

export async function getStaticProps() {
  const queryParams = arrayToQuery(gamesToPreview)

  const response = await fetch(`${process.env.API_URL}games/brief?${queryParams}`)
  const { result } = await response.json()

  return {
    props: { games: result as GameDataBrief[] },
  }
}

export default Home
