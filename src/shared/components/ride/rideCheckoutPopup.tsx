import { WarningIcon } from "@/assets"
import { DepositCompoundingCarDriverFailureRes } from "@/models"
import { CheckoutExistsItem } from "../checkout"

interface RideCheckoutPopupProps {
  onCheckout?: (id: number) => void
  onCancelRide?: (id: number) => void
  desc?: string
  data: DepositCompoundingCarDriverFailureRes
  onClose?: Function
}

export const RideCheckoutPopup = ({
  data,
  desc,
  onCancelRide,
  onCheckout,
  onClose,
}: RideCheckoutPopupProps) => {
  return (
    <>
      <div
        className={`fixed transform left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 inset-0 flex flex-col pt-12 md:pt-24 z-[2000] max-w-[440px] 
        w-full max-h-[600px] h-full bg-white-color rounded-[10px]`}
      >
        <div className="flex-1 overflow-y-auto p-custom md:pt-0 pt-0">
          <div className="flex-center flex-col mb-24">
            <WarningIcon className="w-[66px] h-[66px] mb-24" />

            <p className="text-base font-semibold mb-16 text-center">
              Bạn có giao dịch khác cần thanh toán!
            </p>
            <p className="text-sm text-gray-color-8 text-center leading-[22px]">
              Bạn không thể thực hiện thanh toán cho chuyến đi này bởi vì bạn đang thực hiện giao
              dịch cho một chuyên đi khác
            </p>
          </div>

          {data && data.data?.length > 0 ? (
            <ul className="">
              {data?.data.map((item, index) => (
                <li
                  className="border-b border-solid border-border-color last:border-none mb-24"
                  key={index}
                >
                  <CheckoutExistsItem
                    amount={item.amount}
                    compounding_car_name={item.compounding_car.compounding_car_name}
                    date={item.date}
                    second_remains={item.second_remains}
                    onClickCancel={() => onCancelRide?.(item.compounding_car.compounding_car_id)}
                    onClickCheckout={() => onCheckout?.(item.compounding_car.compounding_car_id)}
                  />
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="flex-center p-16">
          <button onClick={() => onClose?.()} className="btn bg-disabled">
            Quay lại
          </button>
        </div>
      </div>

      <div className="fixed inset-0 z-[1999] bg-black-40"></div>
    </>
  )
}
