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
  className,
  showHeaderDesktop,
  stickyRight,
}: BookingLayoutProps) => {
  return (
    <DriverLayout showHeaderOnMobile={showHeaderOnMobile}>
      <BookingLayout
        stickyRight={stickyRight}
        showHeaderDesktop={showHeaderDesktop}
        className={className}
        topNode={topNode}
        showLoading={showLoading}
        rightNode={rightNode}
        title={title}
        onBackBtnClick={onBackBtnClick}
      >
        {children}
      </BookingLayout>
    </DriverLayout>
  )
}

export { DriverBookingLayout }
