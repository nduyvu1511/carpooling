import { EditIcon, TrashIcon } from "@/assets"
import { Star } from "@/components/star"
import { formatTimeType, toImageUrl } from "@/helper"
import { RatingRes } from "@/models"
import Image from "next/image"
import { VscReport } from "react-icons/vsc"
import { TagItem } from "../tag"
import { Tooltip } from "../tooltip"

interface RatingItemProps {
  rating: RatingRes | null
  onDelete?: (id: number) => void
  onUpdate?: (params: RatingRes) => void
  onReport?: Function
  car_account_type?: "car_driver" | "customer"
}

export const RatingItem = ({
  rating,
  onDelete,
  onUpdate,
  onReport,
  car_account_type = "customer",
}: RatingItemProps) => {
  if (rating === null)
    return (
      <div className="p-12 lg:p-24">
        <div className="flex items-start">
          <div className="w-[32px] h-[32px] rounded-[50%] skeleton mr-[16px]"></div>
          <div className="mr-[16px] flex-1">
            <div className="skeleton w-[120px] h-[8px] skeleton rounded-[5px] mb-[12px]"></div>
            <div className="skeleton w-[160px] h-[8px] skeleton rounded-[5px] mb-[12px]"></div>
            <div className="skeleton w-[80%] h-[8px] skeleton rounded-[5px] mb-[12px]"></div>
            <div className="skeleton w-[140px] h-[8px] skeleton rounded-[5px]"></div>
          </div>
          <div className="flex">
            <div className="skeleton w-[20px] h-[8px] rounded-[5px] mr-[16px]"></div>
            <div className="skeleton w-[20px] h-[8px] rounded-[5px]"></div>
          </div>
        </div>
      </div>
    )
  return (
    <div className="flex items-start py-[20px] md:py-[24px] w-full">
      <div className="relative w-[32px] h-[32px] rounded-[50%] overflow-hidden mr-[16px]">
        <Image
          src={toImageUrl(rating?.partner_id?.avatar_url.image_url || "")}
          layout="fill"
          alt=""
          objectFit="cover"
        />
      </div>

      <div className="flex-1">
        <div className="mb-[4px] flex items-center justify-between">
          <span className="flex-1 mr-[12px] text-xs">{rating?.partner_id.partner_name || ""}</span>
          <div className="flex items-center">
            {car_account_type === "customer" ? (
              <>
                <button
                  onClick={() => onUpdate && onUpdate(rating)}
                  className={`mr-[16px] relative group ${
                    rating.rating_editable === false
                      ? "pointer-events-none opacity-40 cursor-default"
                      : ""
                  }`}
                >
                  <Tooltip title="Sửa đánh giá" className="hidden lg:group-hover:block" />
                  <EditIcon className="w-[18px] md:w-[24px]" />
                </button>
                <button
                  className="relative group"
                  onClick={() => onDelete && onDelete(rating?.rating_id)}
                >
                  <Tooltip
                    title="Xóa đánh giá"
                    className="hidden lg:group-hover:block -left-[30px]"
                  />
                  <TrashIcon className="w-[18px] md:w-[24px]" />
                </button>
              </>
            ) : (
              <button
                onClick={() => onReport && onReport(rating?.rating_id)}
                className={`btn-reset relative group ${
                  rating.rating_reported ? "pointer-events-none opacity-40" : ""
                }`}
              >
                <Tooltip
                  title="Báo cáo đánh giá"
                  className="hidden lg:group-hover:block transform-none -left-[120px]"
                />
                <VscReport className="w-[18px] md:w-[24px] text-gray-color-4" />
              </button>
            )}
          </div>
        </div>

        <p className="mb-[12px]">
          <Star readonly ratingValue={rating?.rating_number * 20} size={14} allowHalfIcon />
        </p>

        <p className="text-sm leading-[24px] mb-[12px]">{rating?.rating_content}</p>

        <p className="text-sm text-gray-color-2">{`${rating?.duration.time_value} ${formatTimeType(
          rating?.duration.time_type || ""
        )} trước`}</p>

        {rating.rating_tag_ids?.length > 0 ? (
          <ul className="flex flex-wrap mt-[12px]">
            {rating.rating_tag_ids.map((item, index) => (
              <li className="mr-[8px] mb-[12px]" key={index}>
                <TagItem label={item.tag_content} />
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  )
}
