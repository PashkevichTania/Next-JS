import {useState, useEffect} from 'react'
import {MainLayout} from '../../components/MainLayout'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {NextPageContext} from 'next'

interface PostPageProps {
  post: any
}

export default function Post({ post: serverPost }: PostPageProps) {
  const [post, setPost] = useState(serverPost)
  const router = useRouter()

  useEffect(() => {
    async function load() {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${router.query.id}`)
      const data = await response.json()
      setPost(data)
    }

    if (!serverPost) {
      load()
    }
  }, [])

  if (!post) {
    return <MainLayout>
      <p>Loading ...</p>
    </MainLayout>
  }

  return(
      <MainLayout>
        <h1>{post.title}</h1>
        <hr />
        <p>{post.body}</p>
        <Link href={'/posts'}><a>Back to all posts</a></Link>
      </MainLayout>
  )
}

interface PostNextPageContext extends NextPageContext {
  query: {
    id: string
  }
}

Post.getInitialProps = async ({ query, req }: PostNextPageContext) => {
  if (!req) {
    return {post: null}
  }

  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${query.id}`)
  const post: any = await response.json()

  return {
    post
  }
}

// export async function getServerSideProps({ query, req }) {
//   // if (!req) {
//   //   return {post: null}
//   // }
//   const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${query.id}`)
//   const post = await response.json()
//
//   return {props: {post}}
// }
