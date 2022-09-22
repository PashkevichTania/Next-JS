import {NextPage} from "next";
import {useEffect, useRef, useState} from "react";
import styles from "styles/home.module.scss";
import Image from "next/image";

import space from "public/assets/pages/home/space/space.jpg";
import r1 from "public/assets/pages/home/space/r1.png";
import r2 from "public/assets/pages/home/space/r2.png";
import r3 from "public/assets/pages/home/space/r3.png";
import r4 from "public/assets/pages/home/space/r4.png";
import r5 from "public/assets/pages/home/space/r5.png";
import r6 from "public/assets/pages/home/space/r6.png";
import r7 from "public/assets/pages/home/space/r7.png";
import l1 from "public/assets/pages/home/space/l1.png";
import l2 from "public/assets/pages/home/space/l2.png";
import l3 from "public/assets/pages/home/space/l3.png";
import l4 from "public/assets/pages/home/space/l4.png";

const HomeBG: NextPage = () => {
  const container = useRef<HTMLDivElement>(null)
  const [offsetWidth, setOffsetWidth] = useState(1)
  const [offsetHeight, setOffsetHeight] = useState(1)
  const resizeObserver = new ResizeObserver(([container]) => {
    setOffsetWidth((container.contentRect.width || space.width) / space.width)
    setOffsetHeight((container.contentRect.height || space.height) / space.height)
  })
  useEffect(() => {
    if (container.current) resizeObserver.observe(container.current)
    else resizeObserver.disconnect()
  }, [resizeObserver])
  return (
      <div className={styles.home_bg_main}>
        <div className={styles.bg_container} ref={container}>
          <Image src={space} alt="space-background" className={styles.spaceBG}/>
          <img src="/assets/pages/home/space/r1.png" style={{width:r1.width*offsetWidth,height:r1.height*offsetHeight}}  alt="space-rock" className={styles.r1}/>
          <img src="/assets/pages/home/space/r2.png" style={{width:r2.width*offsetWidth,height:r2.height*offsetHeight}}  alt="space-rock" className={styles.r2}/>
          <img src="/assets/pages/home/space/r3.png" style={{width:r3.width*offsetWidth,height:r3.height*offsetHeight}}  alt="space-rock" className={styles.r3}/>
          <img src="/assets/pages/home/space/r4.png" style={{width:r4.width*offsetWidth,height:r4.height*offsetHeight}}  alt="space-rock" className={styles.r4}/>
          <img src="/assets/pages/home/space/r5.png" style={{width:r5.width*offsetWidth,height:r5.height*offsetHeight}}  alt="space-rock" className={styles.r5}/>
          <img src="/assets/pages/home/space/r6.png" style={{width:r6.width*offsetWidth,height:r6.height*offsetHeight}}  alt="space-rock" className={styles.r6}/>
          <img src="/assets/pages/home/space/r7.png" style={{width:r7.width*offsetWidth,height:r7.height*offsetHeight}}  alt="space-rock" className={styles.r7}/>
          <img src="/assets/pages/home/space/l1.png" style={{width:l1.width*offsetWidth,height:l1.height*offsetHeight}}  alt="space-rock" className={styles.l1}/>
          <img src="/assets/pages/home/space/l2.png" style={{width:l2.width*offsetWidth,height:l2.height*offsetHeight}}  alt="space-rock" className={styles.l2}/>
          <img src="/assets/pages/home/space/l3.png" style={{width:l3.width*offsetWidth,height:l3.height*offsetHeight}}  alt="space-rock" className={styles.l3}/>
          <img src="/assets/pages/home/space/l4.png" style={{width:l4.width*offsetWidth,height:l4.height*offsetHeight}}  alt="space-rock" className={styles.l4}/>
        </div>
      </div>
)
}

export default HomeBG
