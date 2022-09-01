import { CompoundingCarCustomer, CompoundingCarRes } from "@/models"
import { ReactNode, useState } from "react"
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

export const RideSummary = ({
  data,
  view = "page",
  showFull = true,
  showMap = true,
  children = null,
  showDeposit = true,
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
        <RideSummaryMap data={data} showMap={showMap} />
      </div>

      {showFull ? (
        <>
          {/* <div className="p-custom">
            <div className="flex items-center justify-between mb-16">
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
                  <div className="flex items-center justify-between my-16">
                    <p className="font-semibold uppercase">
                      CẦN ĐẶT CỌC (
                      {((data as CompoundingCarCustomer)?.down_payment.percent || 0) * 100}
                      %)
                    </p>
                    <p className={`${item} text-error font-semibold md:font-semibold`}>
                      {formatMoneyVND((data as CompoundingCarCustomer)?.down_payment?.total)}
                    </p>
                  </div>
                ) : (
                  <div className="mb-12"></div>
                )}

                {(data as CompoundingCarCustomer)?.amount_due ? (
                  <div className="flex items-center justify-between mb-12">
                    <p className={titleClassName}>Số tiền thanh toán sau</p>
                    <p className={item}>
                      {formatMoneyVND((data as CompoundingCarCustomer)?.amount_due)}
                    </p>
                  </div>
                ) : null}
              </>
            ) : null}
          </div> */}

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
              <RideSummaryInfo data={data} />
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
