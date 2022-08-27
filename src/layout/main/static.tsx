/* eslint-disable react/no-unescaped-entities */
import { handShakeBg } from "@/assets"
import { ButtonCall, Footer, Header, Spinner } from "@/components"
import { ReactNode } from "react"

interface StaticLayoutProps {
  children: ReactNode
  heading?: string
  subHeading?: string
  sticky?: boolean
  showLoading?: boolean
  bg?: string
  showBg?: boolean
  topNode?: ReactNode
  lastNode?: ReactNode
}

export const StaticLayout = ({
  children,
  heading,
  subHeading,
  sticky = false,
  showLoading = false,
  showBg = true,
  bg = handShakeBg,
  topNode = null,
  lastNode = null,
}: StaticLayoutProps) => {
  return (
    <>
      <Header />
      <main>
        {showBg ? (
          <div
            style={{ backgroundImage: `url(${bg})` }}
            className="relative w-full aspect-[3/1] max-h-[500px] bg-center bg-no-repeat bg-cover"
          ></div>
        ) : null}
        {topNode}
        {showLoading ? (
          <Spinner className="py-[120px]" size={80} />
        ) : (
          <div
            className={`relative top-0 ${
              sticky
                ? "md:top-[-80px] lg:top-[-100px] border-border-color rounded-[5px] md:max-w-[628px] w-full lg:max-w-[956px] xl:max-w-[1156px] md:border border-solid md:shadow-shadow-1 bg-white-color"
                : "container px-16 md:px-24"
            } w-full mx-auto px-16 md:px-[40px] lg:px-[80px] xl:px-[120px] py-[40px] lg:py-[100px] xl:py-[120px]`}
          >
            {heading || subHeading ? (
              <div className="flex-col flex-center mb-[40px] md:mb-[64px] lg:mb-[80px]">
                {subHeading ? (
                  <p className="font-normal text-14 md:text-16 lg:text-[24px] leading-[26px] mb-16 md:mb-24">
                    {subHeading}
                  </p>
                ) : null}
                {heading ? (
                  <h1 className="h1 text-primary text-center font-semibold lg:font-medium">
                    {heading}
                  </h1>
                ) : null}
              </div>
            ) : null}
            {children}
          </div>
        )}

        {lastNode ? (
          <div className="container mt-[24px] md:mt-0 py-0 mb-40 md:mb-[80px] lg:mb-[120px]">
            {lastNode}
          </div>
        ) : null}
      </main>

      <ButtonCall />

      <Footer />
    </>
  )
}
