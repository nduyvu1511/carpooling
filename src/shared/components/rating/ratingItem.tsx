import { EditIcon, NoteIcon, ReportIcon, ThreeDotsIcon, TrashIcon } from "@/assets"
import { Star } from "@/components/star"
import { formatTimeType, toImageUrl } from "@/helper"
import { useClickOutside } from "@/hooks"
import { RatingRes } from "@/models"
import Image from "next/image"
import { useRouter } from "next/router"
import { useMemo, useRef, useState } from "react"
import { TagItem } from "../tag"

interface RatingItemProps {
  rating: RatingRes | null
  onDelete?: (id: number) => void
  onUpdate?: (params: RatingRes) => void
  onReport?: (id: number) => void
  car_account_type?: "car_driver" | "customer"
  showDetail?: boolean
}

interface RatingActions {
  Icon: any
  label: string
  onClick: Function
  name: "edit" | "delete" | "report" | "detail"
}

export const RatingItem = ({
  rating,
  onDelete,
  onUpdate,
  onReport,
  car_account_type = "customer",
  showDetail = false,
}: RatingItemProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const [showMenu, setShowMenu] = useState<boolean>(false)

  useClickOutside([ref], () => {
    setShowMenu(false)
  })

  const ratingActions = useMemo(() => {
    if (!rating) return []
    const initData = showDetail
      ? [
          {
            name: "detail",
            Icon: NoteIcon,
            label: "Xem chuyến đi",
            onClick: () =>
              router.push(`
        /${car_account_type === "car_driver" ? "d" : "c"}/ride-detail/${
                car_account_type === "car_driver"
                  ? rating?.compounding_car_id
                  : rating?.compounding_car_customer_id
              }
        `),
          },
        ]
      : []

    if (car_account_type === "customer")
      return [
        { name: "edit", Icon: EditIcon, label: "Sửa đánh giá", onClick: () => onUpdate?.(rating) },
        {
          name: "delete",
          Icon: TrashIcon,
          label: "Xóa đánh giá",
          onClick: () => onDelete?.(rating.rating_id),
        },
        ...initData,
      ]

    return [
      {
        name: "report",
        Icon: ReportIcon,
        label: "Báo cáo xấu",
        onClick: () => onReport?.(rating.rating_id),
      },
      ...initData,
    ]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (rating === null)
    return (
      <div className="p-12 lg:p-24">
        <div className="flex items-start">
          <div className="w-[32px] h-[32px] rounded-[50%] skeleton mr-[16px]"></div>
          <div className="mr-[16px] flex-1">
            <div className="skeleton w-[120px] h-[8px] skeleton rounded-[5px] mb-[12px]"></div>
            <div className="skeleton w-[140px] h-[14px] skeleton rounded-[5px] mb-[12px]"></div>
            <div className="skeleton w-[90%] h-[24px] skeleton rounded-[5px] mb-[12px]"></div>
            <div className="skeleton w-[140px] h-[12px] skeleton rounded-[5px]"></div>
          </div>
          <div className="flex">
            <div className="skeleton w-[30px] h-[15px] rounded-[5px] mr-[16px]"></div>
            <div className="skeleton w-[30px] h-[15px] rounded-[5px]"></div>
          </div>
        </div>
      </div>
    )
  return (
    <div className="flex items-start py-[20px] md:py-[24px] w-full overflow-hidden">
      <div className="relative w-[32px] h-[32px] rounded-[50%] overflow-hidden mr-[16px]">
        <Image
          src={toImageUrl(rating?.partner_id?.avatar_url.image_url || "")}
          layout="fill"
          alt=""
          objectFit="cover"
        />
      </div>

      <div className="flex-1">
        <div className="mb-[4px] flex items-center justify-between relative">
          <span className="flex-1 mr-[12px] text-xs">{rating?.partner_id.partner_name || ""}</span>
          <div ref={ref} className="">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="w-[44px] h-[44px] bg-gray-color-1 rounded-[8px] flex-center"
            >
              <ThreeDotsIcon className="h-[14px]" />
            </button>

            {showMenu ? (
              <ul className="bg-white-color p-8 w-[180px] border border-solid border-border-color block-element rounded-[8px] absolute z-[100] top-[calc(100%+5px)] right-0">
                {ratingActions.map(({ Icon, label, onClick, name }, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      setShowMenu(false)
                      onClick()
                    }}
                    className={`relative cursor-pointer px-8 py-4 mb-8 hover:bg-bg rounded-[5px] flex items-center text-sm last:mb-0 ${
                      (name === "edit" && rating.rating_editable === false) ||
                      (name === "report" && rating.rating_reported)
                        ? "pointer-events-none opacity-40 cursor-default"
                        : ""
                    }`}
                  >
                    <Icon className="w-[16px] h-[16px]" />
                    <span className="text-sm ml-[10px] leading-[26px]">{label}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>

        <p className="mb-[12px]">
          <Star readonly ratingValue={rating?.rating_number * 20} size={14} allowHalfIcon />
        </p>

        <p className="text-sm leading-[24px] mb-[12px]">{rating?.rating_content}</p>

        <div className="flex items-center justify-between flex-wrap">
          <p className="text-sm text-gray-color-2 mr-8">{`${
            rating?.duration.time_value
          } ${formatTimeType(rating?.duration.time_type || "")} trước`}</p>
        </div>

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
