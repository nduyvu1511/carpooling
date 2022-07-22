import { blankAvatar } from "@/assets"
import { toImageUrl } from "@/helper"
import { CompoundingCarCustomer } from "@/models"
import moment from "moment"
import Image from "next/image"
import { Countdown } from "../countdown"

interface RidesPassengerItemProps {
  rides: CompoundingCarCustomer
  onClickViewMap?: Function
  onClickPickUp?: Function
  onClickWaiting?: Function
  onClickConfirm?: Function
  onClickPaid?: Function
  onCancelWaiting?: Function
  readonly?: boolean
}

const RidesPassengerItem = ({
  rides,
  onClickWaiting,
  onClickPickUp,
  onClickViewMap,
  onClickConfirm,
  onClickPaid,
  onCancelWaiting,
  readonly = false,
}: RidesPassengerItemProps) => {
  const { partner, from_address, to_address, expected_going_on_date } = rides

  return (
    <div className={`relative ${rides?.state === "cancel" ? "opacity-50 select-none" : ""}`}>
      <div className="">
        <div className="flex items-center justify-between">
          <div className="flex items-center mb-[16px]">
            <div className="relative w-[32px] h-[32px] rounded-[50%] overflow-hidden">
              <Image
                src={
                  partner?.avatar_url?.image_url
                    ? toImageUrl(partner?.avatar_url?.image_url)
                    : blankAvatar
                }
                layout="fill"
                objectFit="cover"
                alt={partner.partner_name}
              />
            </div>
            <span className="text-base flex-1 ml-[16px] text-primary">{partner.partner_name}</span>
          </div>

          {!readonly ? (
            rides?.state === "waiting" ||
            rides?.state === "in_process" ||
            rides?.state === "deposit" ||
            rides?.state === "assign" ? (
              <button
                onClick={() => onClickViewMap?.()}
                className="text-base text-primary underline"
              >
                Xem đường đi
              </button>
            ) : rides.state === "cancel" || rides.state === "confirm_paid" ? (
              <span
                className={`text-sm text-white-color px-[12px] py-[4px] rounded-[5px] ${
                  rides.state === "cancel" ? "bg-error" : "bg-success"
                } right-0`}
              >
                {rides.state === "cancel" ? "Đã hủy" : "Đã thanh toán"}
              </span>
            ) : null
          ) : null}
        </div>

        <ul className="pl-[24px]">
          <li className="flex items-baseline mb-[12px]">
            <span className="text-xs w-[150px]">Số điện thoại: </span>
            <span className="text-sm flex-1">{partner.phone}</span>
          </li>

          <li className="flex items-baseline mb-[12px]">
            <span className="text-xs w-[150px]">Điểm đón: </span>
            <span className="text-sm flex-1">{from_address}</span>
          </li>

          <li className="flex items-baseline mb-[12px]">
            <span className="text-xs w-[150px]">Điểm đến: </span>
            <span className="text-sm flex-1">{to_address}</span>
          </li>

          <li className="flex items-baseline mb-[12px]">
            <span className="text-xs w-[150px]">Giờ đi: </span>
            <span className="text-sm flex-1">
              {moment(expected_going_on_date).format("HH:mm DD/MM/YYYY")}
            </span>
          </li>

          {rides?.note ? (
            <li className="flex items-baseline">
              <span className="text-xs w-[150px]">Ghi chú: </span>
              <span className="text-sm flex-1">{rides.note}</span>
            </li>
          ) : null}
        </ul>
      </div>

      {!readonly ? (
        rides.state === "cancel" || rides.state === "confirm_paid" ? null : (
          <div className="mt-24">
            <div className="flex items-center justify-between">
              {rides.state === "deposit" ||
              rides.state === "waiting" ||
              rides.state === "assign" ? (
                <button
                  onClick={() => onClickWaiting?.()}
                  className="text-base font-medium text-error"
                >
                  Xác nhận chờ khách
                </button>
              ) : rides.state === "waiting_customer" ? (
                <div className="">
                  <p className="flex items-center mb-[16px]">
                    <span className="mr-[8px]">Thời gian chờ khách: </span>
                    <Countdown
                      className="font-semibold text-lg"
                      secondsRemains={rides.second_waiting_remains}
                      onExpiredCoundown={() => onCancelWaiting?.()}
                    />
                  </p>

                  <p className="text-sm text-warning">
                    *Nếu quá thời gian chờ, bạn có quyền bỏ đón hành khách này
                  </p>
                </div>
              ) : null}

              <div className="ml-auto">
                {rides?.state === "in_process" ? (
                  <button
                    onClick={() => onClickConfirm?.()}
                    className="btn-primary px-[16px] bg-orange-50 hover:bg-orange-50"
                  >
                    Xác nhận trả khách
                  </button>
                ) : rides?.state === "done" ? (
                  <button
                    onClick={() => onClickPaid?.()}
                    className="btn-primary bg-success hover:bg-success px-[16px]"
                  >
                    Xác nhận thanh toán
                  </button>
                ) : (
                  <button onClick={() => onClickPickUp?.()} className="btn-primary px-[16px]">
                    Xác nhận đón khách
                  </button>
                )}
              </div>
            </div>
          </div>
        )
      ) : null}
    </div>
  )
}

export { RidesPassengerItem }
