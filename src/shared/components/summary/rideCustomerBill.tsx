import { formatMoneyVND } from "@/helper"
import { CompoundingCarCustomer } from "@/models"
import { RidesSummaryHeader } from "./rideSummaryHeader"
import { RideSummaryInfo } from "./rideSummaryInfo"

interface RideCustomerBillProps {
  data: CompoundingCarCustomer
}

const RideCustomerBill = ({ data }: RideCustomerBillProps) => {
  return (
    <div className="p-12 md:p-24">
      <RidesSummaryHeader />
      <div className="my-[40px]">
        <p className="text-base font-semibold text-blue-7 uppercase mb-24">Thông tin đặt cọc</p>
        <ul>
          <li className="flex items-start justify-between mb-[16px]">
            <p className="text-xs">Giá tạm tính</p>
            <p className="text-sm md:text-base ml-[16px] whitespace-nowrap flex-1 text-right">
              {formatMoneyVND(data.amount_total)}
            </p>
          </li>
          <li className="flex items-start justify-between mb-[16px]">
            <p className="text-xs">Đã đặt cọc</p>
            <p className="text-sm md:text-base ml-[16px] whitespace-nowrap flex-1 text-right">
              {formatMoneyVND(data.down_payment)}
            </p>
          </li>
          <li className="flex items-start justify-between">
            <p className="text-xs">Số tiền còn lại cần thanh toán</p>
            <p className="text-sm md:text-base ml-[16px] whitespace-nowrap flex-1 text-right">
              {formatMoneyVND(data.amount_due)}
            </p>
          </li>
        </ul>
      </div>

      <div className="mb-[40px]">
        <p className="text-base font-semibold text-blue-7 uppercase mb-24">Thông tin chuyến đi</p>
        <ul>
          <RideSummaryInfo data={data} />
        </ul>
      </div>
    </div>
  )
}

export { RideCustomerBill }

