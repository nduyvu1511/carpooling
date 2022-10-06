import { CompoundingCarCustomer, CompoundingCarRes } from "@/models"
import { ReactNode, useState } from "react"
import { AccordionItem } from "../common"
import { RideSummaryInfo } from "./rideSummaryInfo"
import { RideSummaryMap } from "./rideSummaryMap"
import { RideSummaryRules } from "./rideSummaryRules"

interface RideSummaryProps {
  data: CompoundingCarCustomer | CompoundingCarRes
  view?: "page" | "modal"
  showFull?: boolean
  showMap?: boolean
  children?: ReactNode
}

export const RideSummary = ({
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
      className={`${
        view === "modal" ? "h-[calc(100vh-56px)] overflow-y-auto p-custom pb-[56px]" : ""
      }`}
    >
      <div className="mb-16">
        <RideSummaryMap showInfo={view === "page"} data={data} showMap={showMap} />
      </div>

      {showFull ? (
        <>
          {children}

          <div className="lg:hidden">
            <p className="text-base uppercase font-semibold mb-16 md:mb-24 mt-[40px] text-blue-7">
              Thông tin chuyến đi
            </p>
            <RideSummaryInfo data={data} />
          </div>

          <div className="lg:hidden">
            <p className="text-base uppercase font-semibold mb-16 md:mb-24 mt-[40px] text-blue-7">
              Điều khoản sử dụng
            </p>
            <RideSummaryRules />
          </div>

          <div className="hidden lg:block">
            <AccordionItem
              showBg
              allowTransition={false}
              onClick={() => handleToggleTabsActive(1)}
              className="px-24 py-16 md:px-24 md:py-16 rounded-[5px] mb-16 border-t-0"
              titleClassName="text-base font-semibold text-blue-7 uppercase"
              title="Thông tin lộ trình:"
              isActive={tabsActive.includes(1)}
            >
              <RideSummaryInfo showRideType={view === "modal"} data={data} />
            </AccordionItem>
          </div>
          <div className="hidden lg:block">
            <AccordionItem
              showBg
              allowTransition={false}
              onClick={() => handleToggleTabsActive(3)}
              title="Điều khoản sử dụng"
              isActive={tabsActive.includes(3)}
              className="px-24 py-16 md:px-24 md:py-16 rounded-[5px] border-t-0"
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
