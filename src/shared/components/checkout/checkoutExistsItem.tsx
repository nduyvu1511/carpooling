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
      <ul className="mb-24">
        <li className="flex items-baseline mb-10">
          <p className="text-xs mr-[8px] w-[150px]">Tên chuyến đi: </p>
          <p className="text-sm md:text-base flex-1">{compounding_car_name}</p>
        </li>
        <li className="flex items-baseline mb-10">
          <p className="text-xs mr-[8px] w-[150px]">Ngày đi: </p>
          <p className="text-sm md:text-base flex-1">{date}</p>
        </li>
        <li className="flex items-baseline mb-10">
          <p className="text-xs mr-[8px] w-[150px]">Số tiền: </p>
          <p className="text-sm md:text-base flex-1">{formatMoneyVND(amount)}</p>
        </li>

        <li className="flex items-baseline">
          <p className="text-xs mr-[8px] w-[150px]">Thời gian còn lại: </p>
          <Countdown
            className="text-sm md:text-base flex-1 text-error font-semibold"
            onExpiredCoundown={() => {}}
            secondsRemains={second_remains}
          />
        </li>
      </ul>

      <div className="flex-center">
        <button
          onClick={() => onClickCancel?.()}
          className="btn bg-error px-[16px] py-[8px] mr-12 md:mr-24"
        >
          Huỷ giao dịch
        </button>
        <button
          onClick={() => onClickCheckout?.()}
          className="btn bg-primary text-white-color px-[16px] py-[8px]"
        >
          Đến thanh toán
        </button>
      </div>
    </div>
  )
}
