import Link from "next/link"
import { CONST } from "utils/constants"
import { BsInstagram,BsTwitter,BsGithub,FaVk  } from "react-icons/all"
import { Footer as FooterFB } from "flowbite-react"

export function Footer() {
  return (
    <FooterFB container={true}>
      <div className="w-full">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div>
            <FooterFB.Brand
              href="/#home_space"
              src="/assets/icons/game-console.png"
              alt="Logo"
              name="Logo"
            />
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <Link href="/">
              <a className="hover:underline">Home</a>
            </Link>
            <Link href="/about">
              <a className="hover:underline">About</a>
            </Link>
            <Link href={CONST.LINKS.GITHUB}>
              <a className="hover:underline">Contact</a>
            </Link>
          </div>
        </div>
        <FooterFB.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <FooterFB.Copyright
            href={CONST.LINKS.GITHUB}
            by={`${CONST.SITE_NAME}™`}
            year={2022}
          />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <FooterFB.Icon
              href={CONST.LINKS.GITHUB}
              icon={BsGithub}
            />
            <FooterFB.Icon
              href={CONST.LINKS.VK}
              icon={FaVk}
            />
            <FooterFB.Icon
              href="#"
              icon={BsInstagram}
            />
            <FooterFB.Icon
              href="#"
              icon={BsTwitter}
            />
          </div>
        </div>
      </div>
    </FooterFB>
  )
}
