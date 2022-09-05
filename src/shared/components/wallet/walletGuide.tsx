import React, { useState } from "react"
import { AccordionItem } from "../accordion"

export const WalletGuide = () => {
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
      <AccordionItem
        maxHeight={300}
        isActive={tabsActive.includes(1)}
        onClick={() => handleToggleTabsActive(1)}
        className="bg-bg-primary rounded-[5px] border-t-0 p-12 "
        titleClassName="text-base text-blue-7"
        title="How long does the withdrawal take?"
      >
        <p className="text-sm">Usually within 5 minutes. It may take up to 24 hours.</p>
      </AccordionItem>

      <AccordionItem
        maxHeight={300}
        isActive={tabsActive.includes(2)}
        onClick={() => handleToggleTabsActive(2)}
        className="bg-bg-primary rounded-[5px] p-12"
        titleClassName="text-base text-blue-7"
        title="Do card withdrawals work for all cards?"
      >
        <p className="text-sm">Usually within 5 minutes. It may take up to 24 hours.</p>
      </AccordionItem>
    </div>
  )
}
