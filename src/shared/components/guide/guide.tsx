import { useState } from "react"
import { Switch } from "../common"
import { CustomerGuide } from "./customerGuide"
import { DriverGuide } from "./driverGuide"

type SwitchType = "customer" | "driver"

const Guide = () => {
  const [type, setType] = useState<SwitchType>("customer")

  return (
    <div>
      <div className="mt-[40px] md:mt-[60px] lg:mt-[80px]">
        <div className="flex-center">
          <Switch
            list={[
              { label: "Khách hàng", value: "customer" },
              { label: "Tài xế", value: "driver" },
            ]}
            value={type}
            onChange={(type) => setType(type as SwitchType)}
          />
        </div>
      </div>
      <div className="mt-[60px] md:mt-[80px] lg:mt-[120px]">
        {type === "customer" ? <CustomerGuide /> : <DriverGuide />}
      </div>
    </div>
  )
}

export { Guide }
