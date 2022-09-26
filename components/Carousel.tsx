import Slider from "react-slick"
import React from "react"
import { useWindowSize } from "utils/customHooks"

function getCarouselSize(width: number) {
  if (width > 1920) return 3
  if (width < 1300) return 1
  return 2
}

export default function Carousel({ children }: { children: React.ReactNode }) {
  const [width] = useWindowSize()
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: getCarouselSize(width),
    slidesToScroll: 1,
    // variableWidth: true,
    // centerMode: true,
    // centerPadding: "20px",
  }

  return (
    <>
      <div className="p-10">
        <Slider {...settings}>{children}</Slider>
      </div>
    </>
  )
}
