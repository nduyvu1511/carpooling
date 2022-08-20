import { RootState } from "@/core/store"
import { formatMoneyVND } from "@/helper"
import { CompoundingCarCustomer, CompoundingCarRes } from "@/models"
import { ReactNode, useState } from "react"
import { useSelector } from "react-redux"
import { AccordionItem } from "../accordion"
import { RideSummaryInfo } from "./rideSummaryInfo"
import { RideSummaryMap } from "./rideSummaryMap"
import { RideSummaryRules } from "./rideSummaryRules"

interface RideSummaryProps {
  data: CompoundingCarCustomer | CompoundingCarRes
  view?: "page" | "modal"
  showFull?: boolean
  showMap?: boolean
  children?: ReactNode
  showDeposit?: boolean
}

const item = "flex-1 ml-24 text-14 text-right md:text-16 font-medium leading-26 text-blue-8"
const titleClassName = "text-12 font-normal leading-[18px]"

const RideSummary = ({
  data,
  view = "page",
  showFull = true,
  showMap = true,
  children = null,
  showDeposit = true,
}: RideSummaryProps) => {
  const [tabsActive, setTabsActive] = useState<number[]>([])
  const userInfo = useSelector((state: RootState) => state.userInfo.userInfo)

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
        view === "modal" ? "h-[calc(100vh-56px)] overflow-y-auto p-12 md:px-24 pb-[56px]" : ""
      }`}
    >
      <RideSummaryMap data={data} showMap={showMap} />

      {showFull ? (
        <>
          <div className="lg:px-24 my-24">
            <div className="flex items-center justify-between mb-[16px]">
              <p className={titleClassName}>Thuế phí</p>
              <p className={item}>Đã bao gồm</p>
            </div>

            <div className="flex items-baseline justify-between">
              <p className={titleClassName}>Giá vé</p>
              <p className={`font-medium text-orange-50 text-22 xl:text-28 leading-[36px]`}>
                {formatMoneyVND(
                  userInfo?.car_account_type === "car_driver"
                    ? data?.price_unit?.price_unit || data?.amount_total || 0
                    : data?.amount_total || data?.price_unit?.price_unit || 0
                )}
              </p>
            </div>

            {showDeposit && (data?.state === "confirm" || data?.state === "draft") ? (
              <>
                {(data as CompoundingCarCustomer)?.down_payment?.total ? (
                  <div className="flex items-center justify-between my-[16px]">
                    <p className="font-semibold uppercase">
                      CẦN ĐẶT CỌC (
                      {((data as CompoundingCarCustomer)?.down_payment.percent || 0) * 100}
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
              </>
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
