import { formatMoneyVND } from "@/helper"
import { CompoundingCarCustomer } from "@/models"
import moment from "moment"
import { DriverInfoSummary } from "../summary"

interface RideDetailInfoProps {
  data: CompoundingCarCustomer
}

export const RideDetailInfo = ({ data }: RideDetailInfoProps) => {
  return (
    <>
      <div className="mb-24">
        <DriverInfoSummary driver={data.car_driver_id} />
      </div>

      <ul>
        <p className="text-base font-semibold uppercase mb-16 md:mb-24">Thông tin thanh toán</p>
        <li className="flex items-center justify-between mb-12">
          <p className="text-xs">Giá vé</p>
          <p className="text-sm md:text-base ml-16 whitespace-nowrap flex-1 text-right">
            {formatMoneyVND(data?.amount_total)}
          </p>
        </li>
        <li className="flex items-center justify-between">
          <p className="text-base font-semibold">
            Số tiền đặt cọc ({Number(data.customer_deposit_percentage)}%)
          </p>
          <p className="text-14 md:text-16 ml-16 font-semibold whitespace-nowrap flex-1 text-right text-error">
            {formatMoneyVND(data.down_payment.total || (data as any).down_payment)}
          </p>
        </li>
        {data?.paid_date ? (
          <li className="flex items-center justify-between my-12">
            <p className="text-xs">Ngày đặt cọc</p>
            <p className="text-sm md:text-base ml-16 whitespace-nowrap flex-1 text-right">
              {moment(data.paid_date).format("DD/MM/YYYY")}
            </p>
          </li>
        ) : null}

        <li className="flex items-center justify-between my-12">
          <p className="text-xs">Số tiền thanh toán sau</p>
          <p className="text-sm md:text-base ml-16 whitespace-nowrap flex-1 text-right">
            {formatMoneyVND(data.amount_due + data.down_payment.total)}
          </p>
        </li>

        <p className="text-xs">(*) Chi phí trên chưa bao gồm phát sinh phí cầu đường, bến bãi.</p>
      </ul>
    </>
  )
}
