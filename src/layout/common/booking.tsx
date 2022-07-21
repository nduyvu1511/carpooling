import { ArrowLeftIcon } from "@/assets"
import { BookingLayoutProps } from "@/models"
import { useRouter } from "next/router"

const BookingLayout = ({
  children,
  rightNode,
  title,
  showLoading = false,
  topNode,
}: BookingLayoutProps) => {
  const router = useRouter()

  return (
    <section className="container py-24">
      <div className="grid grid-cols-booking-grid gap-24">
        <div className="block-element overflow-hidden h-fit">
          {topNode ? <div className="bg-white-color pt-24">{topNode}</div> : null}
          <div className="p-24 flex items-center">
            <button onClick={() => router.back()}>
              <ArrowLeftIcon />
            </button>

            <h3 className="text-24 font-medium leading-[32px] ml-32">{title}</h3>
          </div>
          {children}
        </div>

        <div className="overflow-hidden h-fit block-element">
          {showLoading ? (
            <div className="">
              <div className="h-[80px] skeleton"></div>
              <div className="p-24 block-element border border-solid border-border-color">
                <div className="flex items-center justify-between mb-[16px]">
                  <div className="skeleton h-[16px] w-[150px] rounded-[5px]"></div>
                  <div className="skeleton h-[16px] w-[150px] rounded-[5px]"></div>
                </div>
                <div className="h-[80px] skeleton mb-24 rounded-[5px]"></div>
                <div className="h-[150px] skeleton mb-24 rounded-[5px]"></div>
                <div className="h-[100px] skeleton mb-24 rounded-[5px]"></div>
              </div>
            </div>
          ) : (
            rightNode
          )}
        </div>
      </div>
    </section>
  )
}

export { BookingLayout }
