import { useState } from "react"
import { Switch } from "../common"
import { CustomerGuide } from "./customerGuide"
import { DriverGuide } from "./driverGuide"

const Guide = () => {
  const [type, setType] = useState<"customer" | "driver">("customer")

  return (
    <div>
      <div className="mt-[80px]">
        <div className="flex-center">
          <Switch type={type} onChange={(type) => setType(type)} />
        </div>
      </div>
      <div className="mt-[120px]">{type === "customer" ? <CustomerGuide /> : <DriverGuide />}</div>
    </div>
  )
}

export { Guide }
