import { blankAvatar, LocationThinIcon, MessageIcon, PhoneIcon2 } from "@/assets"
import {
  formatMoneyVND,
  RIDE_STATE_BG,
  RIDE_STATE_NAME,
  RIDE_STATE_TEXT_COLOR,
  toImageUrl,
} from "@/helper"
import { CompoundingCarCustomer } from "@/models"
import moment from "moment"
import Image from "next/image"
import { Countdown } from "../common"
import { SummaryItem } from "../summary"

interface RidePassengerItemProps {
  data: CompoundingCarCustomer
  onClickViewMap?: Function
  onClickPickUp?: Function
  onClickWaiting?: Function
  onClickConfirm?: Function
  onClickPaid?: Function
  onCancelWaiting?: Function
  onChat?: (id: number) => void
}

const RidePassengerItem = ({
  data,
  onClickWaiting,
  onClickPickUp,
  onClickViewMap,
  onClickConfirm,
  onClickPaid,
  onCancelWaiting,
  onChat,
}: RidePassengerItemProps) => {
  const { partner, from_address, to_address, expected_going_on_date } = data

  return (
    <div
      className={`relative ${
        data?.state === "cancel" ? "opacity-50 select-none pointer-events-none" : ""
      }`}
    >
      <div className="">
        <div className="flex items-center mb-16 justify-between">
          <div className="flex items-center flex-1 sm:flex-none sm:mr-16">
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
            <div className="text-sm md:text-base mr-12 flex items-stretch flex-1 ml-8 w-full text-primary">
              <span className="flex-1 my-auto font-semibold text-14 md:text-16">
                {partner.partner_name}
              </span>
            </div>

            <span
              style={{
                color: (RIDE_STATE_TEXT_COLOR as any)?.[data.state],
                backgroundColor: (RIDE_STATE_BG as any)?.[data.state],
              }}
              className="h-fit ml-auto sm:ml-unset whitespace-nowrap text-[10px] sm:text-12 px-[8px] py-[4px] rounded-[5px] right-0"
            >
              {(RIDE_STATE_NAME as any)?.[data.state]}
            </span>
          </div>

          <div className="items-center hidden sm:flex">
            <a className="mr-16" href={`tel:${data.partner.phone}`}>
              <PhoneIcon2 className="w-[18px] h-[18px]" />
            </a>
            <button onClick={() => onChat?.(partner.partner_id)}>
              <MessageIcon className="text-primary w-[24px] h-[24px]" />
            </button>
          </div>
        </div>

        <ul className="sm:ml]">
          <SummaryItem label="Điểm đón" value={from_address} />
          {data?.to_address ? <SummaryItem label="Điểm đến" value={to_address} /> : null}
          <SummaryItem
            label="Giờ đi"
            value={moment(expected_going_on_date).format("HH:mm DD/MM/YYYY")}
          />
          <SummaryItem label="Ghi chú" value={data?.note || "Không có ghi chú nào"} />
          <SummaryItem
            labelClassName="text-14 md:text-16 font-semibold"
            label="Số tiền phải trả"
            valueClassName="text-14 md:text-16 font-semibold text-error"
            value={formatMoneyVND(data.amount_due)}
          />
        </ul>

        <div className="flex md:hidden mt-16">
          <a
            href={`tel:${partner.phone}`}
            className="w-[44px] h-[44px] bg-bg-blue rounded-[8px] flex-center mr-12"
          >
            <PhoneIcon2 className="w-[18px] h-[18px] text-primary" />
          </a>
          <button
            onClick={() => onChat?.(partner.partner_id)}
            className="w-[44px] h-[44px] bg-bg-blue rounded-[8px] flex-center mr-12"
          >
            <MessageIcon className="w-[24px] h-[24px] text-primary" />
          </button>
          <button
            onClick={() => onClickViewMap?.()}
            className="w-[44px] h-[44px] bg-bg-blue rounded-[8px] flex-center"
          >
            <LocationThinIcon className="w-[18px] h-[20px] text-primary" />
          </button>
        </div>
      </div>

      {data.state === "waiting_customer" ? (
        <div className="mt-12">
          <p className="flex items-center mb-12">
            <span className="mr-[8px] text-xs">Thời gian chờ khách: </span>
            <Countdown
              className="text-base font-semibold"
              secondsRemains={data.second_waiting_remains}
              onExpiredCoundown={() => onCancelWaiting?.()}
            />
          </p>

          <p className="text-sm leading-[22px] text-gray-color-7">
            *Nếu quá thời gian chờ, bạn có quyền bỏ đón hành khách này
          </p>
        </div>
      ) : null}

      {data.state === "cancel" || data.state === "confirm_paid" ? null : (
        <div className="flex mt-16 md:mt-24">
          {data.state === "deposit" || data.state === "waiting" || data.state === "assign" ? (
            <button
              onClick={() => onClickWaiting?.()}
              className="btn bg-gray-color-2 flex-1 sm:flex-none mr-12 sm:px-[32px] text-white-color px-12"
            >
              Chờ khách
            </button>
          ) : null}

          {data?.state === "in_process" ? (
            <button
              onClick={() => onClickConfirm?.()}
              className="flex-1 sm:flex-none btn-primary sm:px-[32px] bg-warning hover:bg-warning px-12"
            >
              Trả khách
            </button>
          ) : data?.state === "done" ? (
            <button
              onClick={() => onClickPaid?.()}
              className="flex-1 sm:flex-none btn-primary bg-success hover:bg-success px-[32px]"
            >
              Thanh toán
            </button>
          ) : (
            <button
              onClick={() => onClickPickUp?.()}
              className="flex-1 sm:flex-none btn-primary sm:px-[32px] px-12"
            >
              <span>Đón khách</span>
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export { RidePassengerItem }
