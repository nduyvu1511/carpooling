import { AccountLayout, CustomerLayout } from "@/layout"
import { useDispatch } from "react-redux"

const Shedules = () => {
  const dispatch = useDispatch()

  return (
    <AccountLayout>
      <div className=""></div>
    </AccountLayout>
  )
}

Shedules.Layout = CustomerLayout
export default Shedules
