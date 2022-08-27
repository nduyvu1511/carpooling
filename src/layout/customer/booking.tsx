import { BookingLayoutProps } from "@/models"
import { BookingLayout } from "../common"
import { CustomerLayout } from "./customer"

const CustomerBookingLayout = ({
  children,
  rightNode,
  title,
  showLoading,
  topNode,
  onBackBtnClick,
  className,
  showHeaderDesktop,
  showHeaderOnMobile,
  stickyRight,
}: BookingLayoutProps) => {
  return (
    <CustomerLayout showHeaderOnMobile={false}>
      <BookingLayout
        topNode={topNode}
        showLoading={showLoading}
        rightNode={rightNode}
        title={title}
        onBackBtnClick={onBackBtnClick}
        className={className}
        showHeaderDesktop={showHeaderDesktop}
        showHeaderOnMobile={showHeaderOnMobile}
        stickyRight={stickyRight}
      >
        {children}
      </BookingLayout>
    </CustomerLayout>
  )
}

export { CustomerBookingLayout }
