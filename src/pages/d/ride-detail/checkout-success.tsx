import {
  RideProgress,
  RidesDetailLoading,
  RidesSummaryHeader,
  RideSummary,
  RideSummaryPassengerItem,
} from "@/components"
import { useBackRouter, useCompoundingCarDriver, useEffectOnce } from "@/hooks"
import { BookingLayout, DriverLayout } from "@/layout"
import Link from "next/link"
import { useRouter } from "next/router"

const CheckoutSuccess = () => {
  const router = useRouter()
  const { compounding_car_id } = router.query
  const {
    data: compoundingCar,
    isValidating,
    mutate,
  } = useCompoundingCarDriver({
    key: "get_compounding_car_customer_detail_checkout",
    type: "once",
    compounding_car_id: Number(compounding_car_id),
  })

  useBackRouter({
    cb: () => {
      router.push("/d")
    },
  })

  useEffectOnce(() => {
    return () => {
      mutate(undefined, false)
    }
  })

  return (
    <BookingLayout
      topNode={<RideProgress state={compoundingCar?.state} />}
      showLoading={isValidating}
      reverse
      rightNode={
        compoundingCar ? (
          <div className="px-12">
            <RideSummary showMap={false} data={compoundingCar as any} />
          </div>
        ) : null
      }
      title="Đặt cọc thành công"
    >
      <div className="bg-white-color block-element pt-24 px-12 md:px-24">
        {isValidating ? (
          <RidesDetailLoading />
        ) : (
          <>
            <div className="mb-[40px]">
              <RidesSummaryHeader />
            </div>
            <h3 className="text-base uppercase font-semibold md:normal-case md:font-medium mb-24">
              Danh sách hành khách
            </h3>
            {compoundingCar?.state === "confirm_deposit" &&
            compoundingCar.compounding_car_customers?.length > 0 ? (
              <ul className="">
                {compoundingCar.compounding_car_customers.map((item) => (
                  <li className="mb-24 last:mb-0" key={item.compounding_car_customer_id}>
                    <RideSummaryPassengerItem data={item} />
                  </li>
                ))}
              </ul>
            ) : null}
            {/* {compoundingCar ? <RideDriverSummary ride={compoundingCar} /> : null} */}
          </>
        )}
      </div>

      {!isValidating ? (
        <div className="max-w-[1280px] mx-auto fixed bottom-0 right-0 left-0 bg-white-color z-10 p-12">
          <Link href="/d">
            <a className="btn-primary-outline mx-auto">Về trang chủ</a>
          </Link>
        </div>
      ) : null}
    </BookingLayout>
  )
}

CheckoutSuccess.Layout = DriverLayout
export default CheckoutSuccess
