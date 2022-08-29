import { useState } from "react"
import { Switch } from "../common"
import { CustomerGuide } from "./customerGuide"
import { DriverGuide } from "./driverGuide"

type SwitchType = "customer" | "driver"

interface GuideProps {
  type?: SwitchType
}

const Guide = ({ type: typeProps = "customer" }: GuideProps) => {
  const [type, setType] = useState<SwitchType>(typeProps)

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
      <div className="mt-24 sm:mt-[32px] lg:mt-[40px]">
        {type === "customer" ? <CustomerGuide /> : <DriverGuide />}
      </div>
    </div>
  )
}

export { Guide }
