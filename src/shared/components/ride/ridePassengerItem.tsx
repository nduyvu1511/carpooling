import {
  blankAvatar,
  CalendarIcon,
  LocationIcon3,
  LocationIcon4,
  NoteIcon,
  PhoneIcon,
} from "@/assets"
import { toImageUrl } from "@/helper"
import { CompoundingCarCustomer } from "@/models"
import moment from "moment"
import Image from "next/image"
import { Countdown } from "../countdown"

interface RidePassengerItemProps {
  rides: CompoundingCarCustomer
  onClickViewMap?: Function
  onClickPickUp?: Function
  onClickWaiting?: Function
  onClickConfirm?: Function
  onClickPaid?: Function
  onCancelWaiting?: Function
  readonly?: boolean
}

const RidePassengerItem = ({
  rides,
  onClickWaiting,
  onClickPickUp,
  onClickViewMap,
  onClickConfirm,
  onClickPaid,
  onCancelWaiting,
  readonly = false,
}: RidePassengerItemProps) => {
  const { partner, from_address, to_address, expected_going_on_date } = rides

  return (
    <div
      className={`relative ${
        rides?.state === "cancel" ? "opacity-50 select-none pointer-events-none" : ""
      }`}
    >
      <div className="">
        <div className="flex items-center justify-between">
          <div className="flex items-center mb-16 flex-1">
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
            <div className="text-sm md:text-base flex items-stretch flex-1 ml-16 w-full text-primary">
              <span className="flex-1 my-auto">{partner.partner_name}</span>
              <span
                className={`h-fit ml-12 whitespace-nowrap text-[10px] sm:text-12 px-[8px] py-[4px] rounded-[5px] ${
                  rides.state === "cancel"
                    ? "bg-bg-error text-error"
                    : rides.state === "in_process"
                    ? "bg-primary-opacity text-primary"
                    : rides.state === "done"
                    ? "bg-warning-opacity text-warning"
                    : rides.state === "confirm_paid"
                    ? "bg-bg-success text-success"
                    : "bg-bg text-gray-color-3"
                } right-0`}
              >
                {rides.state === "cancel"
                  ? "Đã hủy"
                  : rides.state === "in_process"
                  ? "Đã đón khách"
                  : rides.state === "done"
                  ? "Đã trả khách"
                  : rides.state === "confirm_paid"
                  ? "Đã thanh toán"
                  : "Chưa đón khách"}
              </span>
            </div>
          </div>

          {/* {rides.state === "cancel" ||
          rides.state === "confirm_paid" ||
          rides.state === "done" ||
          rides.state === "deposit" ? (
            <span
              className={`text-xs text-white-color px-[8px] py-[4px] rounded-[5px] ${
                rides.state === "cancel" ? "bg-bg-error text-error" : "bg-bg-success text-success"
              } right-0`}
            >
              {rides.state === "cancel" ? "Đã hủy" : "Đã thanh toán"}
            </span>
          ) : null} */}
        </div>

        <ul className="pl-12 md:pl-[24px]">
          <li className="flex items-baseline mb-[12px]">
            <p className="flex items-center">
              <PhoneIcon className="mr-12" />
              <span className="hidden sm:block text-xs w-[150px]">Số điện thoại: </span>
            </p>
            <a href={`tel:${partner.phone}`} className="text-sm flex-1 text-primary underline">
              {partner.phone}
            </a>
          </li>

          <li className="flex items-baseline mb-[12px]">
            <p className="flex items-center">
              <LocationIcon3 className="mr-12" />
              <span className="hidden sm:block text-xs w-[150px]">Điểm đón: </span>
            </p>
            <p className="text-sm flex-1 flex items-start">
              <span className="flex-1 mr-12">{from_address}</span>

              {!readonly ? (
                rides?.state === "waiting" ||
                rides?.state === "in_process" ||
                rides?.state === "deposit" ||
                rides?.state === "assign" ? (
                  <button
                    onClick={() => onClickViewMap?.()}
                    className="hidden xl:block text-sm text-primary"
                  >
                    Xem đường đi
                  </button>
                ) : null
              ) : null}
            </p>
          </li>

          {rides?.to_address ? (
            <li className="flex items-baseline mb-[12px]">
              <p className="flex items-center">
                <LocationIcon4 className="mr-12" />
                <span className="hidden sm:block text-xs w-[150px]">Điểm đến: </span>
              </p>
              <span className="text-sm flex-1">{to_address}</span>
            </li>
          ) : null}

          <li className="flex items-baseline mb-[12px]">
            <p className="flex items-center">
              <CalendarIcon className="mr-12" />
              <span className="hidden sm:block text-xs w-[150px]">Giờ đi: </span>
            </p>
            <span className="text-sm flex-1">
              {moment(expected_going_on_date).format("HH:mm DD/MM/YYYY")}
            </span>
          </li>

          {rides?.note ? (
            <li className="flex items-baseline">
              <p className="flex items-center">
                <NoteIcon className="mr-12" />
                <span className="hidden sm:block text-xs w-[150px]">Ghi chú: </span>
              </p>
              <span className="text-sm flex-1">{rides.note}</span>
            </li>
          ) : null}
        </ul>

        <div className="flex xl:hidden mt-24">
          <a
            href={`tel:${partner.phone}`}
            className="w-[56px] h-[56px] bg-primary-opacity rounded-[5px] flex-center mr-12"
          >
            <PhoneIcon className="w-[18px] h-[18px] text-primary" />
          </a>
          <button
            onClick={() => onClickViewMap?.()}
            className="w-[56px] h-[56px] bg-primary-opacity rounded-[5px] flex-center"
          >
            <LocationIcon4 className="w-[18px] h-[18px] text-primary" />
          </button>
        </div>
      </div>

      {rides.state === "waiting_customer" ? (
        <div className="mt-24">
          <p className="flex items-center mb-12">
            <span className="mr-[8px] text-xs">Thời gian chờ khách: </span>
            <Countdown
              className="text-base font-semibold"
              secondsRemains={rides.second_waiting_remains}
              onExpiredCoundown={() => onCancelWaiting?.()}
            />
          </p>

          <p className="text-sm text-warning">
            *Nếu quá thời gian chờ, bạn có quyền bỏ đón hành khách này
          </p>
        </div>
      ) : null}

      {!readonly ? (
        rides.state === "cancel" || rides.state === "confirm_paid" ? null : (
          <div className="flex mt-24">
            {rides.state === "deposit" || rides.state === "waiting" || rides.state === "assign" ? (
              <button
                onClick={() => onClickWaiting?.()}
                className="btn bg-gray-color-2 flex-1 sm:flex-none mr-12 sm:px-[32px] text-white-color px-12"
              >
                Chờ khách
              </button>
            ) : null}

            {rides?.state === "in_process" ? (
              <button
                onClick={() => onClickConfirm?.()}
                className="flex-1 sm:flex-none btn-primary sm:px-[32px] bg-warning hover:bg-warning px-12"
              >
                Trả khách
              </button>
            ) : rides?.state === "done" ? (
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
        )
      ) : null}
    </div>
  )
}

export { RidePassengerItem }
