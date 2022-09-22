import React, {useEffect} from "react";
import Head from 'next/head'
import {Footer, Navbar} from "flowbite-react";
import {useRouter} from "next/router";
import {BsFacebook, BsGithub, BsInstagram, BsTwitter} from "react-icons/all";
import {CONST} from "../utils/constants";

interface LayoutProps {
  children: React.ReactNode;
  title?: string
}

export function MainLayout({children, title = 'Next App'}: LayoutProps) {
  const router = useRouter()
  useEffect(() => {
    console.log(router.route)
  }, [router.route])
  return (
      <>
        <Head>
          <title>{title}</title>
          <meta name="keywords" content="next,javascript,nextjs,react"/>
          <meta name="description" content="this is youtube tutorial for next"/>
          <meta charSet="utf-8"/>
        </Head>
        <Navbar
            fluid={true}
            rounded={true}
        >
          <Navbar.Brand href="/">
            <img
                src="https://flowbite.com/docs/images/logo.svg"
                className="mr-3 h-6 sm:h-9"
                alt="Flowbite Logo"
            />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">{CONST.SITE_NAME}</span>
          </Navbar.Brand>
          <Navbar.Toggle/>
          <Navbar.Collapse>
            <Navbar.Link
                href="/"
                active={router.route === "/"}
            >
              Home
            </Navbar.Link>
            <Navbar.Link
                href="/about"
                active={router.route === "/about"}
            >
              About
            </Navbar.Link>
            <Navbar.Link href="/games" active={router.route === "/games"}>
              Games
            </Navbar.Link>
            <Navbar.Link href="/games" active={router.route === "/games"}>
              Find
            </Navbar.Link>
            <Navbar.Link href="/" active={router.route === "/"}>
              Contact
            </Navbar.Link>
          </Navbar.Collapse>
        </Navbar>
        <main className="relative">
          {children}
        </main>
        <Footer container={true}>
          <div className="w-full">
            <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
              <div>
                <Footer.Brand
                    href="/"
                    src="https://flowbite.com/docs/images/logo.svg"
                    alt="Flowbite Logo"
                    name={CONST.SITE_NAME}
                />
              </div>
              <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
                <div>
                  <Footer.Title title="about"/>
                  <Footer.LinkGroup col={true}>
                    <Footer.Link href="#">
                      Flowbite
                    </Footer.Link>
                    <Footer.Link href="#">
                      Tailwind CSS
                    </Footer.Link>
                  </Footer.LinkGroup>
                </div>
                <div>
                  <Footer.Title title="Follow us"/>
                  <Footer.LinkGroup col={true}>
                    <Footer.Link href="#">
                      Github
                    </Footer.Link>
                    <Footer.Link href="#">
                      Discord
                    </Footer.Link>
                  </Footer.LinkGroup>
                </div>
                <div>
                  <Footer.Title title="Legal"/>
                  <Footer.LinkGroup col={true}>
                    <Footer.Link href="#">
                      Privacy Policy
                    </Footer.Link>
                    <Footer.Link href="#">
                      Terms & Conditions
                    </Footer.Link>
                  </Footer.LinkGroup>
                </div>
              </div>
            </div>
            <Footer.Divider/>
            <div className="w-full sm:flex sm:items-center sm:justify-between">
              <Footer.Copyright
                  href={CONST.LINKS.GITHUB}
                  by="Jiorjinio™"
                  year={2022}
              />
              {/*<div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">*/}
              {/*  <Footer.Icon*/}
              {/*      href="#"*/}
              {/*      icon={BsFacebook}*/}
              {/*  />*/}
              {/*  <Footer.Icon*/}
              {/*      href="#"*/}
              {/*      icon={BsInstagram}*/}
              {/*  />*/}
              {/*  <Footer.Icon*/}
              {/*      href="#"*/}
              {/*      icon={BsTwitter}*/}
              {/*  />*/}
              {/*  <Footer.Icon*/}
              {/*      href={CONST.LINKS.GITHUB}*/}
              {/*      icon={BsGithub}*/}
              {/*  />*/}
              {/*</div>*/}
            </div>
          </div>
        </Footer>
      </>
  )
}
