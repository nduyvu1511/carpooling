import { ClockIcon, promotionShape1, promotionShape2 } from "@/assets"
import { formatTimeType } from "@/helper"
import { PromotionRes } from "@/models"
import moment from "moment"
import Image from "next/image"

interface PromotionItemProps {
  data: null | PromotionRes
  disabled?: boolean
  onApply?: (_: PromotionRes) => void
  onClick?: (id: number) => void
  onSave?: (_: PromotionRes) => void
  appliedPromotionId?: number
}

export const PromotionItem = ({
  data,
  disabled,
  onApply,
  onClick,
  onSave,
  appliedPromotionId,
}: PromotionItemProps) => {
  if (data === null)
    return (
      <div className="relative rounded-[16px] filter-shadow p-16 md:p-24 shadow-shadow-1 border border-solid border-border-color">
        <div className="flex items-center w-[80%] mb-16">
          <div className="h-[20px] skeleton rounded-[5px] flex-1 mr-16"></div>
          <div className="h-[20px] skeleton rounded-[5px] flex-1"></div>
        </div>
        <div className="skeleton h-16 rounded-[5px] w-[70%] mb-16"></div>
        <div className="flex items-center justify-between">
          <div className="skeleton h-12 rounded-[5px] w-[40%]"></div>
          <div className="skeleton h-[20px] rounded-[5px] w-[40px]"></div>
        </div>
      </div>
    )
  return (
    <div
      onClick={() => onClick?.(data.promotion_id)}
      className={`p-[16px] md:p-24 rounded-[16px] relative ${
        disabled ? "opacity-30 bg-[#D9D9D9] pointer-events-none select-none" : "bg-blue-10"
      }`}
    >
      {data.promotion_type === "percentage" ? (
        <span className="absolute top-[-4px] right-4 lg:right-24 bg-[#FDF3F3] py-12 px-6 rounded-bl-[20px] rounded-br-[20px] rounded-tl-[3px] rounded-tr-[3px] text-[10px] font-medium text-error">
          {data.promotion_value.value + "%"}
        </span>
      ) : null}

      <div className="absolute inset-0 overflow-hidden rounded-[16px]">
        <span className="absolute-vertical z-10  h-[18px] w-[18px] bg-white-color left-[-9px] rounded-[50%]"></span>
        <span className="absolute-vertical z-10 h-[18px] w-[18px] bg-white-color right-[-9px] rounded-[50%]"></span>
        <div className="absolute inset-0">
          <div className="absolute right-0 h-[60%] bottom-0 w-full">
            <Image src={promotionShape1} alt="" objectFit="cover" layout="fill" />
          </div>
          <div className="absolute right-0 bottom-0 h-[58%] w-full">
            <Image src={promotionShape2} alt="" objectFit="cover" layout="fill" />
          </div>
        </div>
      </div>

      <div className="z-10">
        <div
          className={`flex items-center mb-8 ${
            data.promotion_type === "percentage" ? "mr-24 lg:mr-[48px]" : ""
          }`}
        >
          <p className="text-14 md:text-16 font-semibold text-primary line-clamp-1 mr-8">
            {data.promotion_name}
          </p>
        </div>

        <div className="flex items-center mb-8">
          <p className="text-xs text-blue-8 z-10 line-clamp-1">
            {data.promotion_brief || data.promotion_name}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {data.duration_end?.time_type === "day" &&
            moment(data.date_end).add(3, "days").isAfter(moment()) ? (
              <span className="bg-white-color py-4 px-8 rounded-[5px] text-12 font-normal text-error z-10">
                còn {data.duration_end.time_value} {formatTimeType(data.duration_end.time_type)}
              </span>
            ) : (
              <>
                <ClockIcon className="mr-8 z-10" />
                <p className="text-[10px] sm:text-12 font-normal mr-8 text-blue-8 z-10">
                  {moment(data.date_start).format("DD/MM/YYYY")}
                  <span className="mx-8">-</span>
                  {moment(data.date_end).format("DD/MM/YYYY")}
                </p>
              </>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation()
              if (data.promotion_id === appliedPromotionId) return
              data.saved_promotion ? onApply?.(data) : onSave?.(data)
            }}
            className={`text-14 font-semibold z-10 ${
              appliedPromotionId === data?.promotion_id
                ? "pointer-events-none text-gray-color-6"
                : "text-primary"
            }`}
          >
            {data.saved_promotion
              ? appliedPromotionId === data.promotion_id
                ? "Đã áp dụng"
                : "Áp dụng"
              : "Lưu"}
          </button>
        </div>
      </div>
    </div>
  )
}
