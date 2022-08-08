import { ArrowLeftIcon } from "@/assets"
import { HeaderMobile, RideSummaryLoading } from "@/components"
import { BookingLayoutProps } from "@/models"
import { useRouter } from "next/router"

const BookingLayout = ({
  children,
  rightNode,
  title,
  showLoading = false,
  topNode,
  stickyRight = false,
  onBackBtnClick,
  reverse = false,
  className = "",
}: BookingLayoutProps) => {
  const router = useRouter()

  return (
    <>
      {title ? (
        <HeaderMobile className="lg:hidden" title={title} onBackBtnClick={onBackBtnClick} />
      ) : null}

      <section
        className={`container px-0 md:p-24 xl:px-0 mt-[56px] lg:mt-0 pb-[64px] flex-1 md:pb-24 bg-white-color md:bg-[transparent] ${className}`}
      >
        <div className="block-element h-full">
          {topNode ? (
            <div className="lg:hidden pt-12 md:pt-24 lg:pt-0 lg:px-0 pl-12 pb-12 lg:pb-[24px] w-[calc(100vw)] sm:w-full relative rounded-tr-[5px] overflow-hidden">
              <div className="absolute w-[200px] pointer-events-none top-0 h-[40px] right-0 linear-gradient-white"></div>
              {topNode}
            </div>
          ) : null}

          <div
            className={`flex ${
              reverse ? "flex-col pb-12 md:pb-24" : "flex-col-reverse"
            } lg:grid lg:grid-cols-booking-grid-sm xl:grid-cols-booking-grid`}
          >
            <div className={`${topNode ? "lg:pt-24" : ""}`}>
              {topNode ? (
                <div className="hidden lg:block lg:px-12 lg:pl-0 pb-[24px] lg:pb-0 lg:w-full">
                  {topNode}
                </div>
              ) : null}

              {showLoading ? (
                <div className="hidden lg:flex m-12 md:m-24 items-center h-[20px] rounded-[5px]">
                  <div className="skeleton w-[30px] h-[20px] rounded-[5px] mr-[32px]"></div>
                  <div className="skeleton max-w-[350px] w-full h-[20px] flex-1 rounded-[5px]"></div>
                </div>
              ) : (
                <div className="hidden lg:flex p-12 md:p-24 items-center">
                  <button onClick={() => router.back()}>
                    <ArrowLeftIcon />
                  </button>

                  <h3 className="text-24 font-medium leading-[32px] text-blue-8 ml-32">{title}</h3>
                </div>
              )}

              {children}
            </div>

            <div
              className={`overflow-hidden lg:p-24 pl-0 lg:h-fit lg:sticky lg:top-[80px] ${
                stickyRight ? "" : ""
              }`}
            >
              {showLoading ? <RideSummaryLoading /> : rightNode}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export { BookingLayout }
