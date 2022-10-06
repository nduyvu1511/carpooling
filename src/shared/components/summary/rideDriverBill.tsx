import { CompoundingCarDriverRes } from "@/models"
import { useState } from "react"
import { AccordionItem } from "../common"
import { DriverDepositInfo } from "./driverDepositInfo"
import { RideSummaryInfo } from "./rideSummaryInfo"
import { RideSummaryMap } from "./rideSummaryMap"
import { RideSummaryRules } from "./rideSummaryRules"

interface RideDriverBillProps {
  data: CompoundingCarDriverRes
  showHeader?: boolean
  showDepositInfo?: boolean
}

const RideDriverBill = ({
  data,
  showHeader = true,
  showDepositInfo = true,
}: RideDriverBillProps) => {
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
      {showHeader ? <RideSummaryMap data={data} /> : null}

      {showDepositInfo ? (
        <div className="px-custom py-16">
          {data?.down_payment ? (
            <DriverDepositInfo
              discount_after_tax={data?.discount_after_tax}
              amount_total={data?.amount_undiscounted || data.amount_total || 0}
              down_payment={data.down_payment}
              deposit_date={data.deposit_date}
            />
          ) : null}
        </div>
      ) : null}

      <AccordionItem
        allowTransition={false}
        onClick={() => handleToggleTabsActive(1)}
        className="px-24 py-16 md:px-24 md:py-16 bg-bg-primary rounded-[5px] mb-16 border-t-0"
        titleClassName="text-base font-semibold text-blue-7 uppercase"
        title="Thông tin lộ trình"
        isActive={tabsActive.includes(1)}
      >
        <RideSummaryInfo data={data} />
      </AccordionItem>

      <AccordionItem
        allowTransition={false}
        onClick={() => handleToggleTabsActive(3)}
        title="Điều khoản sử dụng"
        isActive={tabsActive.includes(3)}
        className="px-24 py-16 md:px-24 md:py-16 bg-bg-primary rounded-[5px] border-t-0"
        titleClassName="text-base font-semibold text-blue-7 uppercase"
      >
        <RideSummaryRules />
      </AccordionItem>
    </div>
  )
}

export { RideDriverBill }
