import { BookingLayoutProps } from "@/models"
import { BookingLayout } from "../common"
import { CustomerLayout } from "./customer"

const CustomerBookingLayout = ({ children, rightNode, title, showLoading }: BookingLayoutProps) => {
  return (
    <CustomerLayout>
      <BookingLayout showLoading={showLoading} rightNode={rightNode} title={title}>
        {children}
      </BookingLayout>
    </CustomerLayout>
  )
}

export { CustomerBookingLayout }
