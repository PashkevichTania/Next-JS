import Slider from "react-slick"
import useResizeObserver from "@/hooks/useResizeObserver"

function getCarouselSize(width: number) {
  if (width > 1200) return 3
  if (width > 750) return 2
  return 1
}

export default function Carousel({ children }: { children: React.ReactNode }) {
  const { size, measuredRef } = useResizeObserver()
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: getCarouselSize(size.width),
    slidesToScroll: 1,
    // variableWidth: true,
    // centerMode: true,
    // centerPadding: "20px",
  }

  return (
    <div className="p-10" ref={measuredRef}>
      <Slider {...settings}>{children}</Slider>
    </div>
  )
}
