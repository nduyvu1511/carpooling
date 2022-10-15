import { ArrowLeft2Icon } from "@/assets"
import { HeaderMobile, RideSummaryLoading } from "@/components"
import { toggleBodyOverflow } from "@/helper"
import { BookingLayoutProps } from "@/models"
import { useRouter } from "next/router"
import { useEffect } from "react"

const BookingLayout = ({
  children,
  rightNode,
  title,
  showLoading = false,
  topNode,
  stickyRight = false,
  onBackBtnClick,
  className = "",
  showHeaderDesktop = true,
  overflowHidden = true,
}: BookingLayoutProps) => {
  const router = useRouter()

  useEffect(() => {
    return () => {
      toggleBodyOverflow("unset")
    }
  }, [])

  return (
    <>
      {title ? (
        <HeaderMobile className="lg:hidden" title={title} onBackBtnClick={onBackBtnClick} />
      ) : null}

      <section
        className={`booking-layout container px-0 md:p-16 lg:p-24 xl:px-0 mt-[56px] lg:mt-0 pb-[64px] flex-1 md:pb-24 bg-white-color md:bg-[transparent] ${className}`}
      >
        <div className="md:block-element h-full">
          {topNode ? (
            <div className="lg:hidden p-custom pr-0 relative overflow-hidden rounded-tr-[5px]">
              <div className="absolute w-[200px] pointer-events-none top-0 h-[40px] right-0 linear-gradient-white"></div>
              {topNode}
            </div>
          ) : null}

          <div className="lg:grid lg:grid-cols-booking-grid-sm xl:grid-cols-booking-grid">
            <div className={`p-12 sm:p-16 lg:p-24 ${overflowHidden ? "overflow-hidden" : ""}`}>
              {topNode ? <div className="hidden lg:block lg:w-full mb-40">{topNode}</div> : null}

              {showLoading ? (
                <div className="hidden lg:flex my-12 md:my-24 md:mb-[40px] items-center h-[20px] rounded-[5px]">
                  <div className="skeleton w-[30px] h-[20px] rounded-[5px] mr-[32px]"></div>
                  <div className="skeleton max-w-[350px] w-full h-[20px] flex-1 rounded-[5px]"></div>
                </div>
              ) : showHeaderDesktop ? (
                <div className="hidden lg:flex pb-12 md:pb-24 items-center border-b border-border-color border-solid mb-24">
                  <button className="flex-center w-24 h-24" onClick={() => router.back()}>
                    <ArrowLeft2Icon className="w-[10px] h-[16px]" />
                  </button>

                  <h3 className="text-24 font-medium leading-[32px] text-blue-8 ml-16">{title}</h3>
                </div>
              ) : null}

              {children}
            </div>

            <div
              className={`overflow-hidden lg:p-24 pl-0 lg:h-fit lg:sticky lg:top-[80px] ${
                stickyRight ? "" : ""
              }`}
            >
              {showLoading ? (
                <div className="p-custom">
                  <RideSummaryLoading />
                </div>
              ) : (
                <div className="hidden lg:block">{rightNode}</div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export { BookingLayout }
