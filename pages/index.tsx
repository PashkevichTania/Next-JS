import type {NextPage} from 'next'
import {MainLayout} from "../components/MainLayout";
import dynamic from 'next/dynamic'

const HomeBG = dynamic(() => import('../components/HomeBG'), {
  ssr: false,
})

const Home: NextPage = () => {
  return (
      <MainLayout title={"Create Next App"}>
        <HomeBG/>
        <div>
          <h1>NEXT</h1>
        </div>
      </MainLayout>
  )
}

export default Home
