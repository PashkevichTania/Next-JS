import { useState, useEffect } from "react"
import Head from "next/head"
import { MainLayout } from "../../components/MainLayout"
import Link from "next/link"
import { NextPageContext } from "next"

interface PostsPageProps {
  posts: any[]
}

export default function Posts({ posts: serverPosts }: PostsPageProps) {
  const [posts, setPosts] = useState(serverPosts)

  useEffect(() => {
    async function load() {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts")
      const json = await response.json()
      setPosts(json)
    }

    if (!serverPosts) {
      load()
    }
  }, [])

  if (!posts) {
    return (
      <MainLayout>
        <p>Loading ...</p>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <Head>
        <title>Posts Page | Next Course</title>
      </Head>
      <h1>Posts Page</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/[id]`} as={`/posts/${post.id}`}>
              <a>{post.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </MainLayout>
  )
}

Posts.getInitialProps = async ({ req }: NextPageContext) => {
  if (!req) {
    return { posts: null }
  }

  const response = await fetch(`https://jsonplaceholder.typicode.com/posts`)
  const posts: any[] = await response.json()

  return {
    posts,
  }
}
