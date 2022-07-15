import { BookingLayoutProps } from "@/models"
import { BookingLayout } from "../common"
import { DriverLayout } from "./driver"

const DriverBookingLayout = ({ children, rightNode, title, showLoading }: BookingLayoutProps) => {
  return (
    <DriverLayout>
      <BookingLayout rightNode={rightNode} showLoading={showLoading} title={title}>
        {children}
      </BookingLayout>
    </DriverLayout>
  )
}

export { DriverBookingLayout }
