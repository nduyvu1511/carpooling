/* eslint-disable react/no-unescaped-entities */
import { guideBg } from "@/assets"
import { Footer, Header } from "@/components"
import Image from "next/image"
import { ReactNode } from "react"

interface StaticLayoutProps {
  children: ReactNode
  heading?: string
  subHeading?: string
  sticky?: boolean
}

export const StaticLayout = ({
  children,
  heading,
  subHeading,
  sticky = false,
}: StaticLayoutProps) => {
  return (
    <>
      <Header />
      <main>
        <div className="relative w-full aspect-[3/1] max-h-[500px] bg-hand-shake-bg"></div>
        <div
          className={`relative top-0 ${
            sticky
              ? "md:top-[-142px] border-border-color rounded-[10px] md:max-w-[628px] w-full lg:max-w-[956px] xl:max-w-[1156px] border border-solid block-element"
              : "container px-[16px] md:px-24"
          } w-full mx-auto px-[16px] md:px-[40px] lg:px-[120px] py-[64px] xl:py-[120px]`}
        >
          <div className="flex-col flex-center mb-[40px] md:mb-[64px] lg:mb-[80px]">
            {subHeading ? (
              <p className="font-normal text-14 md:text-16 lg:text-[24px] leading-[26px] mb-24">
                {subHeading}
              </p>
            ) : null}
            <h1 className="h1 text-primary text-center font-semibold lg:font-medium">{heading}</h1>
          </div>
          {children}
        </div>
      </main>
      <Footer />
    </>
  )
}
