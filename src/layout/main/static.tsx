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
}

export const StaticLayout = ({
  children,
  heading,
  subHeading,
  sticky = false,
  showLoading = false,
  bg = handShakeBg,
}: StaticLayoutProps) => {
  return (
    <>
      <Header />
      <main>
        <div
          style={{ backgroundImage: `url(${bg})` }}
          className="relative w-full aspect-[3/1] max-h-[500px] bg-center bg-no-repeat bg-cover"
        ></div>
        {showLoading ? (
          <Spinner className="py-[120px]" size={80} />
        ) : (
          <div
            className={`relative top-0 ${
              sticky
                ? "md:top-[-142px] border-border-color rounded-[10px] md:max-w-[628px] w-full lg:max-w-[956px] xl:max-w-[1156px] border border-solid block-element"
                : "container px-[16px] md:px-24"
            } w-full mx-auto px-[16px] md:px-[40px] lg:px-[120px] py-[64px] xl:py-[120px]`}
          >
            {heading || subHeading ? (
              <div className="flex-col flex-center mb-[40px] md:mb-[64px] lg:mb-[80px]">
                {subHeading ? (
                  <p className="font-normal text-14 md:text-16 lg:text-[24px] leading-[26px] mb-24">
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
      </main>

      <ButtonCall />

      <Footer />
    </>
  )
}
