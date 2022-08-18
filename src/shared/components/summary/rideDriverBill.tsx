import { CompoundingCarRes } from "@/models"
import { useState } from "react"
import { AccordionItem } from "../accordion"
import { DriverDepositInfo } from "./driverDepositInfo"
import { RideSummaryInfo } from "./rideSummaryInfo"
import { RideSummaryMap } from "./rideSummaryMap"
import { RideSummaryRules } from "./rideSummaryRules"

interface RideDriverBillProps {
  data: CompoundingCarRes
}

const RideDriverBill = ({ data }: RideDriverBillProps) => {
  const [tabsActive, setTabsActive] = useState<number[]>([])

  const handleToggleTabsActive = (id: number) => {
    if (tabsActive.includes(id)) {
      setTabsActive([...tabsActive].filter((_id) => _id !== id))
    } else {
      setTabsActive([...tabsActive, id])
    }
  }

  return (
    <div>
      <RideSummaryMap data={data} />

      <div className="lg:hidden">
        {data?.down_payment ? (
          <>
            <p className="text-base uppercase font-semibold mb-24 mt-[40px] text-blue-7">
              Thông tin chuyến đi
            </p>
            <DriverDepositInfo
              deposit_date={data?.deposit_date}
              amount_total={data?.amount_total || data?.price_unit?.price_unit}
              down_payment={data.down_payment}
            />
          </>
        ) : null}

        <p className="text-base uppercase font-semibold mb-24 mt-[40px] text-blue-7">
          Thông tin chuyến đi
        </p>
        <RideSummaryInfo data={data} />

        <p className="text-base uppercase font-semibold mb-24 mt-[40px] text-blue-7">
          Điều khoản sử dụng
        </p>
        <RideSummaryRules />
      </div>

      <div className="hidden lg:block mt-[16px]">
        {data?.down_payment ? (
          <AccordionItem
            allowTransition={false}
            onClick={() => handleToggleTabsActive(2)}
            className="px-24 py-[16px] md:px-24 md:py-[16px] bg-bg-primary rounded-[5px] mb-[16px]"
            titleClassName="text-base font-semibold text-blue-7 uppercase"
            title="Thông tin đặt cọc"
            isActive={tabsActive.includes(2)}
          >
            {data?.down_payment ? (
              <DriverDepositInfo
                amount_total={data?.amount_total || data?.price_unit?.price_unit}
                down_payment={data.down_payment}
                deposit_date={data.deposit_date}
              />
            ) : null}
          </AccordionItem>
        ) : null}
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
    </div>
  )
}

export { RideDriverBill }
