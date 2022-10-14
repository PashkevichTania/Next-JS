import Image from "next/future/image"
import { MainLayout } from "components/MainLayout"
import { GameData } from "utils/intefaces"
import { getRatingColor, getRatingData } from "utils/func"
import stylesMain from "styles/main.module.scss"
import FormatSlash from "../../components/FormatSlash"
import { getGameById } from "../../server/AceDB"

interface GamePageProps {
  game: GameData
}

const Game = ({ game }: GamePageProps) => {
  const { img: ageRatingImg, tooltip: ageRatingTooltip } = getRatingData(game.ratingAge)

  return (
    <MainLayout title={game.name}>
      <div className="flex flex-col justify-center items-center h-[100%]">
        <div className="w-[100%] min-h-[calc(100vh_-_173px)] relative flex flex-col justify-center items-center pt-12 pb-12">
          <Image
            alt={game.name}
            src={`/assets/games/bg/${game.bg}`}
            className="absolute left-0 top-0 max-w-[100%] h-auto object-cover z-20"
            fill
            placeholder="blur"
            blurDataURL={`/assets/games/bg/blur/${game.bg.split(".")[0]}.jpg`}
          />
          <div className="w-[90%] z-30 text-white">
            <div className={stylesMain.glass2}>
              <div className="pt-12 pb-12 pr-10 pl-10 text-lg">
                <div className="grid grid-cols-2 mb-6">
                  <div>
                    <h2 className="text-4xl font-extrabold mb-3">{game.name}</h2>
                    <p>
                      <span className="font-bold">Developers: </span>
                      {game.developers.map((dev) => (
                        <span key={Math.random()}>{dev}; </span>
                      ))}
                    </p>
                    <p>
                      <span className="font-bold">Publisher: </span>
                      {game.publisher};
                    </p>
                    <p>
                      <span className="font-bold">Platforms: </span>
                      {game.platforms.map((value, index) =>
                        index + 1 === game.platforms.length ? (
                          <span key={Math.random()}>{value};</span>
                        ) : (
                          <span key={Math.random()}>
                            {value}
                            <FormatSlash className={"mr-1.5 ml-1.5"} />
                          </span>
                        )
                      )}
                    </p>
                    <p>
                      <span className="font-bold">Genre(s): </span>
                      {game.genres.map((value, index) =>
                        index + 1 === game.genres.length ? (
                          <span key={Math.random()}>{value};</span>
                        ) : (
                          <span key={Math.random()}>
                            {value}
                            <FormatSlash className={"mr-1.5 ml-1.5"} />
                          </span>
                        )
                      )}
                    </p>
                    <p>
                      <span className="font-bold">Release date: </span>
                      {game.releaseDate}
                    </p>
                  </div>
                  <div className="flex flex-row justify-center gap-4">
                    <div>
                      <span className="font-bold">Critics score: </span>
                      <div
                        className="rounded-md font-bold p-3 text-center text-3xl"
                        style={{ backgroundColor: getRatingColor(game.ratingCritics) }}
                      >
                        {game.ratingCritics}
                      </div>
                    </div>
                    <div>
                      <span className="font-bold">Users score: </span>
                      <div
                        className="rounded-md font-bold p-3 text-center text-3xl"
                        style={{ backgroundColor: getRatingColor(game.ratingUsers * 10) }}
                      >
                        {game.ratingUsers}
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="font-bold">ESRB age rating: </span>
                      <Image
                        alt="ESRB age rating"
                        src={ageRatingImg}
                        width={40}
                        height={40}
                        className="object-center object-contain"
                        title={ageRatingTooltip}
                      />
                    </div>
                  </div>
                </div>
                <p>{game.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

// executed during request
export async function getServerSideProps({ params }: { params: { id: string } }) {
  const result = await getGameById(params.id)

  return {
    props: {
      game: result,
    },
  }
}

export default Game
