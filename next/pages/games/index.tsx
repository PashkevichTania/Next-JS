import {NextPage} from "next";
import styles from "../../styles/Home.module.css";
import {MainLayout} from "../../components/MainLayout";

const Games: NextPage = () => {
    return (
        <MainLayout>
            <h1>Games List</h1>
            <div className={styles.container}>
            </div>
        </MainLayout>
    )
}

export default Games
