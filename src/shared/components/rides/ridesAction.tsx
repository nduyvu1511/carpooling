import { CompoundingCarCustomerState } from "@/models"
import { useMemo } from "react"

interface RidesActionsProps {
  state: CompoundingCarCustomerState
  compounding_car_customer_id: number
}

const RidesAction = ({ compounding_car_customer_id, state }: RidesActionsProps) => {
  const getBtnName: string = useMemo(() => {
    if (state === "confirm_paid") return "Đánh giá ngay"
    if (state === "waiting") return "Hủy chuyến đi"
    if (state === "assign") return "Hủy chuyến đi"
    return ""
  }, [state])

  return (
    <>
      {state !== "cancel" ? (
        <button
          className={`btn-primary ${state === "waiting" || state === "assign" ? "bg-error" : ""}`}
        >
          {getBtnName}
        </button>
      ) : null}
    </>
  )
}

export { RidesAction }
