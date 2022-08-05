import { ArrowLeftIcon } from "@/assets"
import { HeaderMobile, RidesSummaryLoading } from "@/components"
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
            <div className="lg:hidden pt-12 md:pt-24 lg:pt-0 lg:px-0 pl-12 pb-12 lg:pb-[24px] w-[calc(100vw-12px)] sm:w-full relative">
              <div className="absolute w-[200px] pointer-events-none top-0 bottom-0 right-0 linear-gradient-white"></div>
              {topNode}
            </div>
          ) : null}

          <div
            className={`flex ${
              reverse ? "flex-col" : "flex-col-reverse"
            } lg:grid lg:grid-cols-booking-grid-sm xl:grid-cols-booking-grid xl:gap-24`}
          >
            <div className={`${topNode ? "lg:pt-24" : ""}`}>
              {topNode ? (
                <div className="hidden lg:block lg:px-0 lg:pl-0 pb-[24px] lg:pb-0 lg:w-full">
                  {topNode}
                </div>
              ) : null}

              <div className="hidden lg:flex p-12 md:p-24 items-center">
                <button onClick={() => router.back()}>
                  <ArrowLeftIcon />
                </button>

                <h3 className="text-24 font-medium leading-[32px] text-blue-8 ml-32">{title}</h3>
              </div>

              {children}
            </div>

            <div
              className={`overflow-hidden lg:p-24 lg:h-fit lg:sticky lg:top-[80px] ${
                stickyRight ? "" : ""
              }`}
            >
              {showLoading ? <RidesSummaryLoading /> : rightNode}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export { BookingLayout }
