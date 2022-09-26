import {MainLayout} from '../../components/MainLayout'
import {GameCard} from "../../components/GameCard";
import Carousel from "../../components/Carousel";

const About = () => {
    return (
        <MainLayout title={"Games Page"}>
            <div className="mt-64 bg-white">
                <Carousel />
                <GameCard  cover="tlou.png" rating={90} name=
                    "The Last of Us Part I" id={"i960g6"} ratingAge="M"/>
            </div>
    </MainLayout>
)
}


export default About
