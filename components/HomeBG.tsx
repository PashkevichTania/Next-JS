import {NextPage} from "next";
import {useEffect, useRef, useState} from "react";
import space from "public/assets/pages/home/spaceBG.jpg";

import styles from "styles/home.module.scss";
import Image from "next/image";
import a1 from "public/assets/pages/home/Asset1.png";
import a2 from "public/assets/pages/home/Asset2.png";
import a3 from "public/assets/pages/home/Asset3.png";
import a4 from "public/assets/pages/home/Asset4.png";
import a5 from "public/assets/pages/home/Asset5.png";
import a6 from "public/assets/pages/home/Asset6.png";


const HomeBG: NextPage = () => {
  const container = useRef<HTMLDivElement>(null)
  const [offsetWidth, setOffsetWidth] = useState(1)
  const [offsetHeight, setOffsetHeight] = useState(1)
  const resizeObserver = new ResizeObserver(([container]) => {
    console.log(container.contentRect)
    setOffsetWidth((container.contentRect.width || space.width) / space.width * 3)
    setOffsetHeight((container.contentRect.height || space.height) / space.height * 3)
  })
  useEffect(() => {
    if (container.current) resizeObserver.observe(container.current)
    else resizeObserver.disconnect()
  }, [resizeObserver, container.current])
  return (
      <div className={styles.home_bg_main}>
        <div className={styles.bg_container} ref={container}>
          <Image src={space} alt="spaceBG" className={styles.spaceBG}/>
          <img src="/assets/pages/home/Asset1.png" style={{width:a1.width*offsetWidth,height:a1.height*offsetHeight}}  alt="spaceBG" className={styles.a1}/>
          <img src="/assets/pages/home/Asset2.png" style={{width:a2.width*offsetWidth,height:a2.height*offsetHeight}}  alt="spaceBG" className={styles.a2}/>
          <img src="/assets/pages/home/Asset3.png" style={{width:a3.width*offsetWidth,height:a3.height*offsetHeight}}  alt="spaceBG" className={styles.a3}/>
          <img src="/assets/pages/home/Asset4.png" style={{width:a4.width*offsetWidth,height:a4.height*offsetHeight}}  alt="spaceBG" className={styles.a4}/>
          <img src="/assets/pages/home/Asset5.png" style={{width:a5.width*offsetWidth,height:a5.height*offsetHeight}}  alt="spaceBG" className={styles.a5}/>
          <img src="/assets/pages/home/Asset6.png" style={{width:a6.width*offsetWidth,height:a6.height*offsetHeight}}  alt="spaceBG" className={styles.a6}/>
          {/*<Image src={a1} width={a1.width * offsetWidth} height={a1.height * offsetHeight} alt="spaceBG"*/}
          {/*       className={styles.a1} style={{position: "absolute"}}/>*/}
          {/*<Image src={a2} width={a2.width * offsetWidth} height={a2.height * offsetHeight} alt="spaceBG"*/}
          {/*       className={styles.a2}/>*/}
          {/*<Image src={a3} width={a3.width * offsetWidth} height={a3.height * offsetHeight} alt="spaceBG"*/}
          {/*       className={styles.a3}/>*/}
          {/*<Image src={a4} width={a4.width * offsetWidth} height={a4.height * offsetHeight} alt="spaceBG"*/}
          {/*       className={styles.a4}/>*/}
          {/*<Image src={a5} width={a5.width * offsetWidth} height={a5.height * offsetHeight} alt="spaceBG"*/}
          {/*       className={styles.a5} style={{position: "absolute"}}/>*/}
          {/*<Image src={a6} width={a6.width * offsetWidth} height={a6.height * offsetHeight} alt="spaceBG"*/}
          {/*       className={styles.a6} style={{position: "absolute"}}/>*/}
        </div>
      </div>
)
}

export default HomeBG
