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
  onShowDetail,
}: BookingLayoutProps) => {
  return (
    <DriverLayout>
      <BookingLayout
        topNode={topNode}
        showLoading={showLoading}
        rightNode={rightNode}
        title={title}
        onShowDetail={onShowDetail}
        onBackBtnClick={onBackBtnClick}
      >
        {children}
      </BookingLayout>
    </DriverLayout>
  )
}

export { DriverBookingLayout }
