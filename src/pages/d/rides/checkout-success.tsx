import { RidesPassengerItem, RidesProgress, RidesSummary, RidesSummaryHeader } from "@/components"
import { useCompoundingCarDriver } from "@/hooks"
import { BookingLayout, DriverLayout } from "@/layout"
import { useRouter } from "next/router"

const CheckoutSuccess = () => {
  const router = useRouter()
  const { compounding_car_id } = router.query
  const { data: compoundingCar, isValidating } = useCompoundingCarDriver({
    key: "get_compounding_car_customer_detail_checkout",
    type: "once",
    compounding_car_id: Number(compounding_car_id),
  })

  if (compoundingCar?.state !== "confirm_deposit") return null
  return (
    <BookingLayout
      topNode={<RidesProgress state={compoundingCar.state} />}
      showLoading={isValidating}
      rightNode={
        compoundingCar ? (
          <RidesSummary car_account_type="car_driver" rides={compoundingCar as any} />
        ) : null
      }
      title="Chi tiết chuyến đi"
    >
      <div className="bg-white-color block-element p-24 pt-0">
        {isValidating ? (
          <div className="skeleton h-[500px]"></div>
        ) : (
          <>
            <div className="mb-[40px]">
              <RidesSummaryHeader />
            </div>
            <h3 className="text-base mb-24">Danh sách hành khách</h3>

            {compoundingCar.compounding_car_customers?.length > 0 ? (
              <ul className="">
                {compoundingCar.compounding_car_customers.map((item) => (
                  <li className="mb-24 last:mb-0" key={item.compounding_car_customer_id}>
                    <RidesPassengerItem readonly rides={item} />
                  </li>
                ))}
              </ul>
            ) : null}
          </>
        )}
      </div>
    </BookingLayout>
  )
}

CheckoutSuccess.Layout = DriverLayout
export default CheckoutSuccess
