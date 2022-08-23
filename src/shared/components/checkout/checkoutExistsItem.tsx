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
          <p className="text-xs mr-[8px]">Tên chuyến đi: </p>
          <p className="text-sm md:text-base text-right flex-1">{compounding_car_name}</p>
        </li>
        <li className="flex items-baseline mb-10">
          <p className="text-xs mr-[8px]">Ngày đi: </p>
          <p className="text-sm md:text-base text-right flex-1">{date}</p>
        </li>
        <li className="flex items-baseline mb-10">
          <p className="text-xs mr-[8px]">Số tiền: </p>
          <p className="text-sm md:text-base text-right flex-1">{formatMoneyVND(amount)}</p>
        </li>

        <li className="flex items-baseline">
          <p className="text-xs mr-[8px]">Thời gian còn lại: </p>
          <Countdown
            className="text-14 md:text-16 text-right flex-1 text-error font-semibold"
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

      {/* <div className="flex-center">
        <button
          onClick={() => onClickCancel?.()}
          className="btn bg-error px-16 py-[8px] mr-12 md:mr-24"
        >
          Huỷ giao dịch
        </button>
        <button
          onClick={() => onClickCheckout?.()}
          className="btn bg-primary text-white-color px-16 py-[8px]"
        >
          Đến thanh toán
        </button>
      </div> */}
    </div>
  )
}
