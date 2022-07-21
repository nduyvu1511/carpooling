import { formatMoneyVND } from "@/helper"
import { Countdown } from "../countdown"

interface CheckoutExistsItemProps {
  second_remains: number
  amount: number
  compounding_car_name: string
  date: string
  onClickCheckout?: Function
  onClickCancel?: Function
}

export const CheckoutExistsItem = ({
  amount,
  compounding_car_name,
  date,
  second_remains,
  onClickCancel,
  onClickCheckout,
}: CheckoutExistsItemProps) => {
  return (
    <div className="">
      <ul className="mb-[40px]">
        <li className="flex items-baseline mb-10">
          <p className="text-xs mr-[8px] w-[150px]">Tên chuyến đi: </p>
          <p className="text-base">{compounding_car_name}</p>
        </li>
        <li className="flex items-baseline mb-10">
          <p className="text-xs mr-[8px] w-[150px]">Ngày đi: </p>
          <p className="text-base">{date}</p>
        </li>
        <li className="flex items-baseline mb-10">
          <p className="text-xs mr-[8px] w-[150px]">Số tiền: </p>
          <p className="text-base">{formatMoneyVND(amount)}</p>
        </li>

        <li className="flex items-baseline">
          <p className="text-xs mr-[8px] w-[150px]">Thời gian còn lại: </p>
          <Countdown
            className="text-base text-error font-semibold"
            onExpiredCoundown={() => {}}
            secondsRemains={second_remains}
          />
        </li>
      </ul>

      <div className="flex-center">
        <button
          onClick={() => onClickCancel?.()}
          className="btn bg-disabled px-[16px] py-[8px] mr-24"
        >
          Huỷ giao dịch
        </button>
        <button
          onClick={() => onClickCheckout?.()}
          className="btn bg-bg-warning text-warning px-[16px] py-[8px]"
        >
          Đến thanh toán
        </button>
      </div>
    </div>
  )
}
