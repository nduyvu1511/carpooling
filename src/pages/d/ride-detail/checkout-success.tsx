import { RidesDetailLoading, RidesPassengerItem, RidesProgress, RidesSummary } from "@/components"
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
      topNode={<RidesProgress state={compoundingCar?.state} />}
      showLoading={isValidating}
      rightNode={
        compoundingCar ? (
          <RidesSummary
            showRules={false}
            desc={
              <span>
                Chuyến đi của bạn đã được đặt cọc và xác nhận, vui lòng kiểm tra chi tiết chuyến đi
                qua email hoặc trang{" "}
                <Link href="/d/activities">
                  <a className="text-primary font-semibold">Hoạt động</a>
                </Link>
                .
              </span>
            }
            title="Hoàn thành đặt chuyến"
            car_account_type="car_driver"
            type="bill"
            rides={compoundingCar as any}
          />
        ) : null
      }
      title="Đặt cọc thành công"
    >
      <div className="bg-white-color block-element pt-24 px-12 md:px-24">
        {isValidating ? (
          <RidesDetailLoading />
        ) : (
          <>
            {/* <div className="mb-[40px]">
              <RidesSummaryHeader />
            </div> */}
            <h3 className="text-base uppercase font-semibold md:normal-case md:font-medium mb-24">
              Danh sách hành khách
            </h3>
            {compoundingCar?.state === "confirm_deposit" &&
            compoundingCar.compounding_car_customers?.length > 0 ? (
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

      {!isValidating ? (
        <div className="content-container fixed bottom-0 right-0 left-0 bg-white-color z-10 p-12">
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
