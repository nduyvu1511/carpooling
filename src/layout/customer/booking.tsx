import { BookingLayoutProps } from "@/models"
import { BookingLayout } from "../common"
import { CustomerLayout } from "./customer"

const CustomerBookingLayout = ({
  children,
  rightNode,
  title,
  showLoading,
  topNode,
}: BookingLayoutProps) => {
  return (
    <CustomerLayout showHeaderOnMobile={false}>
      <BookingLayout
        topNode={topNode}
        showLoading={showLoading}
        rightNode={rightNode}
        title={title}
      >
        {children}
      </BookingLayout>
    </CustomerLayout>
  )
}

export { CustomerBookingLayout }
