import { ArrowLineRightIcon } from "@/assets"
import { formatMoneyVND } from "@/helper"
import { CompoundingCarCustomer, CompoundingCarRes } from "@/models"
import moment from "moment"
import { useState } from "react"
import { AccordionItem } from "../accordion"
import { Map } from "../map"
import { RideSummaryInfo } from "./rideSummaryInfo"
import { RideSummaryRules } from "./rideSummaryRules"

interface RideSummaryProps {
  data: CompoundingCarCustomer | CompoundingCarRes
  view?: "page" | "modal"
  showFull?: boolean
  showMap?: boolean
}

const item =
  "flex-1 flex justify-end ml-24 text-14 text-right md:text-16 font-medium leading-26 text-blue-8"
const titleClassName = "text-12 font-normal leading-[18px] w-[90px]"

const RideSummary = ({
  data,
  view = "page",
  showFull = true,
  showMap = true,
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
    <div className={`${view === "modal" ? "h-[calc(100vh-56px)] overflow-y-auto p-12" : ""}`}>
      <div className="bg-bg-primary rounded-[5px]">
        {showMap ? (
          <div className="h-[200px]">
            <Map
              direction={{
                destination: {
                  lat: Number(data.to_latitude),
                  lng: Number(data.to_longitude),
                },
                origin: {
                  lat: Number(data.from_latitude),
                  lng: Number(data.from_longitude),
                },
              }}
              viewOnly
            />
          </div>
        ) : null}
        <div className="p-12 md:p-24 bg-bg-primary rounded-[5px] flex items-center mb-12 md:mb-24">
          <div className="flex-1">
            <p className="text-[22px] md:text-28 font-medium leading-[36px] mb-8 line-clamp-1">
              {data?.from_province.province_brief_name}
            </p>
            <p className="text-12 md:text-14 font-medium leading-26">
              {moment(data?.expected_going_on_date).format("HH:mm")}
            </p>
          </div>
          <div className="mx-8">
            <ArrowLineRightIcon className="w-[14px]" />
          </div>
          <div className="flex-1 flex items-end flex-col">
            <p className="text-[22px] md:text-28 font-medium leading-[36px] mb-8 line-clamp-1">
              {data?.to_province.province_brief_name}
            </p>
            <p className="text-12 md:text-14 font-medium leading-26">
              {moment(data?.expected_going_on_date).add(data.duration, "hours").format("HH:mm")}
            </p>
          </div>
        </div>
      </div>

      {/* Price */}
      {showFull ? (
        <>
          <div className="lg:px-24 my-24">
            <div className="flex items-center justify-between mb-[16px]">
              <p className={titleClassName}>Thuế phí:</p>
              <p className={item}>Đã bao gồm</p>
            </div>

            {data?.price_unit ? (
              <div className="flex items-baseline justify-between">
                <p className={titleClassName}>Giá vé/khách:</p>
                <p className={`font-medium text-orange-50 text-22 md:text-28 leading-[36px]`}>
                  {formatMoneyVND(data?.price_unit?.price_unit)}
                </p>
              </div>
            ) : null}
          </div>

          <div className="lg:hidden">
            <p className="text-base uppercase font-semibold mb-24 mt-[40px] text-blue-7">
              Thông tin chuyến đi
            </p>
            <RideSummaryInfo data={data} />
          </div>

          <div className="lg:hidden">
            <p className="text-base uppercase font-semibold mb-24 mt-[40px] text-blue-7">
              Thông tin chuyến đi
            </p>
            <RideSummaryRules />
          </div>

          <div className="hidden lg:block">
            <AccordionItem
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
