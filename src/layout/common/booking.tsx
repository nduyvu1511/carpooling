import { ArrowLeftIcon } from "@/assets"
import { RidesSummaryLoading } from "@/components"
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
}: BookingLayoutProps) => {
  const router = useRouter()

  return (
    <>
      <div className="flex items-center h-56px md:hidden fixed bg-white-color py-[16px] z-[1000] left-0 right-0 top-0 px-24 border-b border-border-color border-solid">
        <button onClick={() => (onBackBtnClick ? onBackBtnClick() : router.back())}>
          <ArrowLeftIcon />
        </button>
        <h3 className="text-base flex-1 text-center font-semibold line-clamp-1 ml-[16px]">
          {title}
        </h3>
      </div>

      <section className="container px-0 md:p-24 xl:px-0 pt-[56px] md:pt-0">
        <div className="grid xl:grid-cols-booking-grid gap-24">
          <div className="block-element h-fit">
            {topNode ? (
              <div className="bg-white-color pt-24 px-12 md:px-0 mb-[40px] md:mb-0 w-[calc(100vw-24px)] md:w-full">
                {topNode}
              </div>
            ) : null}
            <div className="hidden md:flex p-12 md:p-24 items-center">
              <button onClick={() => router.back()}>
                <ArrowLeftIcon />
              </button>

              <h3 className="text-24 font-medium leading-[32px] ml-32">{title}</h3>
            </div>
            {children}
          </div>

          <div
            className={`overflow-hidden h-fit block-element ${
              stickyRight ? "sticky top-[80px]" : ""
            }`}
          >
            {showLoading ? <RidesSummaryLoading /> : rightNode}
          </div>
        </div>
      </section>
    </>
  )
}

export { BookingLayout }
