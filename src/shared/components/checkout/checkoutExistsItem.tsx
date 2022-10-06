import { formatMoneyVND } from "@/helper"
import { Countdown } from "../common"

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
        <li className="flex items-baseline mb-10 justify-between">
          <p className="text-xs mr-[8px]">Tên chuyến đi: </p>
          <p className="text-sm md:text-base text-right flex-1">{compounding_car_name}</p>
        </li>
        <li className="flex items-baseline mb-10 justify-between">
          <p className="text-xs mr-[8px]">Ngày đi: </p>
          <p className="text-sm md:text-base text-right flex-1">{date}</p>
        </li>
        <li className="flex items-baseline mb-10 justify-between">
          <p className="text-xs mr-[8px]">Số tiền: </p>
          <p className="text-sm md:text-base text-right flex-1">{formatMoneyVND(amount)}</p>
        </li>

        <li className="flex items-baseline justify-between">
          <p className="text-xs mr-[8px]">Thời gian còn lại: </p>
          <Countdown
            className="text-14 md:text-16 text-right text-error font-semibold right-0 w-[40px] pl-[2px] mr-[2px]"
            onExpiredCoundown={() => {}}
            secondsRemains={second_remains}
          />
        </li>

        <div className="flex items-center justify-between">
          <button
            onClick={() => onClickCheckout?.()}
            className="text-sm font-semibold text-primary underline mt-12 inline-block cursor-pointer"
          >
            Đến thanh toán
          </button>
          <button
            onClick={() => onClickCancel?.()}
            className="text-sm font-semibold text-error mt-12 inline-block cursor-pointer"
          >
            Bỏ qua
          </button>
        </div>
      </ul>
    </div>
  )
}
