import { formatMoneyVND } from "@/helper"
import { CompoundingCarCustomer } from "@/models"
import moment from "moment"
import { Snackbar } from "../common"
import { DriverInfoSummary, SummaryItem } from "../summary"

interface RideDetailInfoProps {
  data: CompoundingCarCustomer
  showSnackbar?: boolean
}

export const RideDetailInfo = ({ data, showSnackbar = true }: RideDetailInfoProps) => {
  const cancelDate = showSnackbar ? moment(data.expected_going_on_date).subtract(3, "hours") : null
  return (
    <>
      <DriverInfoSummary compounding_car_id={data.compounding_car_id} driver={data.car_driver_id} />
      <div className="my-24 border-b border-solid border-border-color"></div>
      <ul>
        <p className="text-base font-semibold uppercase mb-16 md:mb-24">Hóa đơn</p>
        <SummaryItem
          label="Chi phí tạm tính"
          value={formatMoneyVND(data?.amount_undiscounted || data?.amount_total || 0)}
        />
        {data?.discount_after_tax ? (
          <SummaryItem
            valueClassName="text-sm md:text-base text-error md:text-error"
            label="Khuyến mãi"
            value={formatMoneyVND(-data?.discount_after_tax)}
          />
        ) : null}
        {data?.paid_date ? (
          <SummaryItem label="Ngày đặt cọc" value={moment(data.paid_date).format("DD/MM/YYYY")} />
        ) : null}
        <SummaryItem label="Tổng tiền cần thanh toán" value={formatMoneyVND(data.amount_total)} />
        <SummaryItem
          label={`Số tiền đặt cọc (${Number(data.customer_deposit_percentage)}%)`}
          value={formatMoneyVND(data.down_payment.total || (data as any).down_payment)}
        />
        <SummaryItem
          className="mb-0"
          labelClassName="text-14 md:text-16 font-semibold"
          label="Số tiền thanh toán sau"
          value={formatMoneyVND(data.amount_due)}
          valueClassName="text-14 md:text-16 font-semibold"
        />

        {showSnackbar && cancelDate ? (
          <Snackbar
            className="mt-24"
            title={`Hủy miễn phí trước ${cancelDate.format("HH:mm")} ngày ${cancelDate.format(
              "DD/MM/YYYY"
            )}. Bạn sẽ không được hoàn tiền nếu hủy trong khoảng thời gian 3 giờ trước giờ khởi hành.`}
          />
        ) : null}
      </ul>
    </>
  )
}
