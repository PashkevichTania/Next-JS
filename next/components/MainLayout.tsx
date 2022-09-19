import React from "react";
import Link from 'next/link'
import Head from 'next/head'
import styles from "../styles/Home.module.css";

interface LayoutProps {
    children: React.ReactNode;
    title?: string
}

export function MainLayout({ children, title = 'Next App' }: LayoutProps) {
    return (
        <>
            <Head>
                <title>{title} | Next</title>
                <meta name="keywords" content="next,javascript,nextjs,react" />
                <meta name="description" content="this is youtube tutorial for next" />
                <meta charSet="utf-8" />
            </Head>
            <nav>
                <Link href={'/'}><a>Home</a></Link>
                <Link href={'/about'}><a>About</a></Link>
                <Link href={'/games'}><a>Games</a></Link>
                <Link href={'/posts'}><a>Posts</a></Link>
            </nav>
            <main className={styles.main}>
                {children}
            </main>
        </>
    )
}
