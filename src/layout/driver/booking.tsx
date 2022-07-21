import { BookingLayoutProps } from "@/models"
import { BookingLayout } from "../common"
import { DriverLayout } from "./driver"

const DriverBookingLayout = ({
  children,
  rightNode,
  title,
  showLoading,
  topNode,
}: BookingLayoutProps) => {
  return (
    <DriverLayout>
      <BookingLayout
        topNode={topNode}
        rightNode={rightNode}
        showLoading={showLoading}
        title={title}
      >
        {children}
      </BookingLayout>
    </DriverLayout>
  )
}

export { DriverBookingLayout }
