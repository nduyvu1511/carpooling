/* eslint-disable react/no-unescaped-entities */
import { handShakeBg } from "@/assets"
import { AuthHeader, ButtonCall, Footer, Header, Spinner } from "@/components"
import { RootState } from "@/core/store"
import { ReactNode } from "react"
import { useSelector } from "react-redux"

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
  const userInfo = useSelector((state: RootState) => state.userInfo.userInfo)

  return (
    <>
      {userInfo?.car_account_type ? <AuthHeader /> : <Header />}
      <main>
        {showBg ? (
          <div
            style={{ backgroundImage: `url(${bg})` }}
            className="relative w-full aspect-[3/1] max-h-[500px] bg-center bg-no-repeat bg-cover"
          ></div>
        ) : null}
        {topNode}
        {showLoading ? (
          <Spinner className="my-[120px]" size={30} />
        ) : (
          <div
            className={`relative top-0 ${
              sticky
                ? `md:top-[-80px] lg:top-[-100px] border-border-color rounded-[5px] md:max-w-[628px] w-full lg:max-w-[956px]
                   xl:max-w-[1156px] md:border border-solid md:shadow-shadow-1 bg-white-color py-[64px] px-12 md:p-[40px] lg:p-[120px]`
                : "container py-[64px] md:py-[80px] lg:py-[120px]"
            } w-full mx-auto`}
          >
            {heading || subHeading ? (
              <div className="flex-col flex-center mb-[32px] lg:mb-[80px]">
                {subHeading ? (
                  <p className="font-normal text-14 md:text-16 md:font-medium lg:text-[24px] leading-[20px] md:leading-[22px ] lg:leading-[30px ] lg:font-normal mb-8 md:mb-12 lg:mb-24">
                    {subHeading}
                  </p>
                ) : null}
                {heading ? (
                  <h1 className="text-24 leading-[34px] font-semibold md:text-28 md:leading-[36px] md:font-medium lg:font-medium lg:text-[48px] lg:leading-[56px] text-primary text-center">
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
