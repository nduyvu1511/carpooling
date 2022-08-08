import { BookingLayoutProps } from "@/models"
import { BookingLayout } from "../common"
import { DriverLayout } from "./driver"

const DriverBookingLayout = ({
  children,
  rightNode,
  title,
  showLoading,
  topNode,
  onBackBtnClick,
  showHeaderOnMobile = false,
  reverse,
}: BookingLayoutProps) => {
  return (
    <DriverLayout showHeaderOnMobile={showHeaderOnMobile}>
      <BookingLayout
        topNode={topNode}
        showLoading={showLoading}
        rightNode={rightNode}
        title={title}
        reverse={reverse}
        onBackBtnClick={onBackBtnClick}
      >
        {children}
      </BookingLayout>
    </DriverLayout>
  )
}

export { DriverBookingLayout }
