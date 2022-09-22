import type {NextPage} from 'next'
import Image from 'next/image'
import {MainLayout} from "../components/MainLayout";
import styles from "../styles/home.module.scss";

const Home: NextPage = () => {
    return (
        <MainLayout title={"Create Next App"}>
          <div className={styles.mainBG}>
            <Image src={"/assets/"}></Image>
          </div>
            <div>
                <h1>NEXT</h1>
            </div>
        </MainLayout>
    )
}

export default Home
