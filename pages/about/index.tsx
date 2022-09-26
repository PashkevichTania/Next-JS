import { MainLayout } from "components/MainLayout"
import { GameCard } from "components/GameCard"
import Carousel from "components/Carousel"

const About = () => {
  return (
    <MainLayout title={"Games Page"}>
      <div className="mt-64 bg-white">
        <Carousel>
          <GameCard
            cover="tlou.png"
            rating={90}
            name="The Last of Us Part I"
            id={"i960g6"}
            ratingAge="M"
          />
          <GameCard
            cover="tlou.png"
            rating={20}
            name="The Last of Us Part I"
            id={"i960g6"}
            ratingAge="t"
          />
          <GameCard
            cover="tlou.png"
            rating={40}
            name="The Last of Us Part I"
            id={"i960g6"}
            ratingAge="M"
          />
          <GameCard
            cover="tlou.png"
            rating={50}
            name="The Last of Us Part I"
            id={"i960g6"}
            ratingAge="M"
          />
          <GameCard
            cover="tlou.png"
            rating={10}
            name="The Last of Us Part I"
            id={"i960g6"}
            ratingAge="M"
          />
        </Carousel>
      </div>
    </MainLayout>
  )
}

export default About
