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
}: BookingLayoutProps) => {
  const router = useRouter()

  return (
    <section className="container py-24">
      <div className="grid grid-cols-booking-grid gap-24">
        <div className="block-element h-fit">
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
          {showLoading ? <RidesSummaryLoading /> : rightNode}
        </div>
      </div>
    </section>
  )
}

export { BookingLayout }
