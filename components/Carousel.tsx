import { Head } from "next/document";
import Slider from "react-slick";

export default function Carousel(){
        const settings = {
            dots: false,
            infinite: true,
            speed: 500,
            autoplay: true,
            autoplaySpeed: 800,
            slidesToShow: 4,
            slidesToScroll: 1
        };
        return (
            <>
                <div className="bg-blue-800 pl-10 pr-10">
                    <h2> Single Item</h2>
                    <Slider {...settings}>
                        <div>
                            <h3>1</h3>
                        </div>
                        <div>
                            <h3>2</h3>
                        </div>
                        <div>
                            <h3>3</h3>
                        </div>
                        <div>
                            <h3>4</h3>
                        </div>
                        <div>
                            <h3>5</h3>
                        </div>
                        <div>
                            <h3>6</h3>
                        </div>
                    </Slider>
                </div>
            </>

        );
}