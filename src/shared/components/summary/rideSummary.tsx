import { ArrowLineRightIcon } from "@/assets"
import { COMPOUNDING_TYPE_NAME, formatMoneyVND, getHoursName } from "@/helper"
import { CompoundingCarCustomer, CompoundingCarRes } from "@/models"
import moment from "moment"
import { ReactNode, useState } from "react"
import { AccordionItem } from "../accordion"
import { Map } from "../map"
import { CompoundingCarICon } from "../utilities"
import { RideSummaryInfo } from "./rideSummaryInfo"
import { RideSummaryRules } from "./rideSummaryRules"

interface RideSummaryProps {
  data: CompoundingCarCustomer | CompoundingCarRes
  view?: "page" | "modal"
  showFull?: boolean
  showMap?: boolean
  children?: ReactNode
}

const item = "flex-1 ml-24 text-14 text-right md:text-16 font-medium leading-26 text-blue-8"
const titleClassName = "text-12 font-normal leading-[18px]"

const RideSummary = ({
  data,
  view = "page",
  showFull = true,
  showMap = true,
  children = null,
}: RideSummaryProps) => {
  const [tabsActive, setTabsActive] = useState<number[]>([])

  const handleToggleTabsActive = (id: number) => {
    if (tabsActive.includes(id)) {
      setTabsActive([...tabsActive].filter((_id) => _id !== id))
    } else {
      setTabsActive([...tabsActive, id])
    }
  }

  return (
    <div
      className={`${view === "modal" ? "h-[calc(100vh-56px)] overflow-y-auto p-12 md:px-24" : ""}`}
    >
      <div className="bg-bg-primary rounded-[5px] p-12 md:p-24">
        <div className="flex items-center mb-[16px]">
          <div className="flex-1">
            <p className="text-[22px] xl:text-28 font-medium leading-[36px] mb-4 line-clamp-1">
              {data?.from_province.province_brief_name}
            </p>
            <p className="text-12 md:text-14 font-medium leading-26">
              {moment(data?.expected_going_on_date).format("HH:mm DD/MM/YYYY")}
            </p>
          </div>
          <div className="mx-8 flex-center flex-col">
            <ArrowLineRightIcon className="w-[14px] mb-12" />
            {/* <p className="text-xs">{COMPOUNDING_TYPE_NAME[data.compounding_type]}</p> */}
          </div>
          <div className="flex-1 flex items-end flex-col">
            <p className="text-[22px] xl:text-28 font-medium leading-[36px] mb-4 line-clamp-1">
              {data?.to_province.province_brief_name}
            </p>
            <p className="text-12 md:text-14 font-medium leading-26">
              {moment(data?.expected_going_on_date)
                .add(data.duration, "hours")
                .format("HH:mm DD/MM/YYYY")}
            </p>
          </div>
        </div>

        {showMap ? (
          <div className="h-[200px] mb-[16px]">
            <Map
              viewOnly
              directions={{
                destination: {
                  lat: Number(data.from_province.latitude),
                  lng: Number(data.from_province.longitude),
                },
                origin: {
                  lat: Number(data.to_province.latitude),
                  lng: Number(data.to_province.longitude),
                },
              }}
            />
          </div>
        ) : null}
        <ul>
          <li className="flex items-center justify-between mb-12">
            <p className="text-xs">Loại chuyến</p>
            <p className="ml-[16px] flex-1 text-right text-sm md:text-base">
              {COMPOUNDING_TYPE_NAME[data.compounding_type]}
            </p>
          </li>
          <li className="flex items-center justify-between mb-12">
            <p className="text-xs">Thời gian dự kiến</p>
            <p className="ml-[16px] flex-1 text-right text-sm md:text-base">
              {getHoursName(data.duration || 0)}
            </p>
          </li>
          <li className="flex items-center justify-between">
            <p className="text-xs">Lộ trình ước tính</p>
            <p className="ml-[16px] flex-1 text-right text-sm md:text-base">{data.distance} Km</p>
          </li>
        </ul>
      </div>

      {/* Price */}
      {showFull ? (
        <>
          <div className="lg:px-24 my-24">
            <div className="flex items-center justify-between mb-[16px]">
              <p className={titleClassName}>Thuế phí</p>
              <p className={item}>Đã bao gồm</p>
            </div>

            {data?.price_unit ? (
              <div className="flex items-baseline justify-between">
                <p className={titleClassName}>Giá vé</p>
                <p className={`font-medium text-orange-50 text-22 xl:text-28 leading-[36px]`}>
                  {formatMoneyVND(data?.price_unit?.price_unit)}
                </p>
              </div>
            ) : null}

            {(data as CompoundingCarCustomer)?.down_payment?.total ? (
              <div className="flex items-center justify-between my-[16px]">
                <p className="font-semibold uppercase">
                  CẦN ĐẶT CỌC ({((data as CompoundingCarCustomer)?.down_payment.percent || 0) * 100}
                  %)
                </p>
                <p className={`${item} text-error font-semibold md:font-semibold`}>
                  {formatMoneyVND((data as CompoundingCarCustomer)?.down_payment?.total)}
                </p>
              </div>
            ) : null}

            {(data as CompoundingCarCustomer)?.amount_due ? (
              <div className="flex items-center justify-between mb-[16px]">
                <p className={titleClassName}>Số tiền thanh toán sau</p>
                <p className={item}>
                  {formatMoneyVND((data as CompoundingCarCustomer)?.amount_due)}
                </p>
              </div>
            ) : null}
          </div>

          {children}

          <div className="lg:hidden">
            <p className="text-base uppercase font-semibold mb-24 mt-[40px] text-blue-7">
              Thông tin chuyến đi
            </p>
            <RideSummaryInfo data={data} />
          </div>

          <div className="lg:hidden">
            <p className="text-base uppercase font-semibold mb-24 mt-[40px] text-blue-7">
              Điều khoản sử dụng
            </p>
            <RideSummaryRules />
          </div>

          <div className="hidden lg:block">
            <AccordionItem
              allowTransition={false}
              onClick={() => handleToggleTabsActive(1)}
              className="px-24 py-[16px] md:px-24 md:py-[16px] bg-bg-primary rounded-[5px] mb-[16px]"
              titleClassName="text-base font-semibold text-blue-7 uppercase"
              title="Thông tin lộ trình:"
              isActive={tabsActive.includes(1)}
            >
              <RideSummaryInfo data={data} />
            </AccordionItem>
          </div>
          <div className="hidden lg:block">
            <AccordionItem
              allowTransition={false}
              onClick={() => handleToggleTabsActive(3)}
              title="Điều khoản sử dụng"
              isActive={tabsActive.includes(3)}
              className="px-24 py-[16px] md:px-24 md:py-[16px] bg-bg-primary rounded-[5px]"
              titleClassName="text-base font-semibold text-blue-7 uppercase"
            >
              <RideSummaryRules />
            </AccordionItem>
          </div>
        </>
      ) : null}
    </div>
  )
}

export { RideSummary }
