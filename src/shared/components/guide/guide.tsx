import { useState } from "react"
import { Switch } from "../common"
import { CustomerGuide } from "./customerGuide"
import { DriverGuide } from "./driverGuide"

type SwitchType = "customer" | "driver"

const Guide = () => {
  const [type, setType] = useState<SwitchType>("customer")

  return (
    <div>
      <div className="">
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
      <div className="mt-[32px] md:mt-[40px] lg:mt-[50px]">
        {type === "customer" ? <CustomerGuide /> : <DriverGuide />}
      </div>
    </div>
  )
}

export { Guide }
