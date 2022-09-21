import type {NextPage} from 'next'
import {MainLayout} from "../components/MainLayout";

const Home: NextPage = () => {
    return (
        <MainLayout title={"Create Next App"}>
            <div>
                <h1>NEXT</h1>
            </div>
        </MainLayout>
    )
}

export default Home
