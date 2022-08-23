import {
  RideDriverBill,
  RideProgress,
  RidesDetailLoading,
  RidesSummaryHeader,
  RideSummaryPassengerItem,
} from "@/components"
import { useBackRouter, useCompoundingCarDriver } from "@/hooks"
import { BookingLayout, DriverLayout } from "@/layout"
import Link from "next/link"
import { useRouter } from "next/router"

const CheckoutSuccess = () => {
  const router = useRouter()
  const { compounding_car_id } = router.query
  const { data: compoundingCar, isValidating } = useCompoundingCarDriver({
    key: `get_compounding_car_customer_detail_checkout_${compounding_car_id}`,
    type: "once",
    compounding_car_id: Number(compounding_car_id),
  })

  useBackRouter({
    cb: () => {
      router.push("/d")
    },
  })

  return (
    <BookingLayout
      className="md:pb-[64px]"
      topNode={<RideProgress className="mb-12 md:mb-24" state={compoundingCar?.state} />}
      showLoading={isValidating}
      reverse
      rightNode={
        compoundingCar ? (
          <div className="px-custom lg:px-0">
            <RideDriverBill data={compoundingCar} />
          </div>
        ) : null
      }
      title="Đặt cọc thành công"
      showHeaderDesktop={false}
    >
      <div className="pt-24 px-custom">
        {isValidating ? (
          <RidesDetailLoading className="mb-[40px]" />
        ) : (
          <>
            <div className="mb-[40px]">
              <RidesSummaryHeader
                desc={
                  <p className="text-sm md:text-base">
                    Chuyến đi của bạn đã được đặt cọc và xác nhận, vui lòng kiểm tra chi tiết chuyến
                    đi qua email hoặc trang{" "}
                    <Link href="/d/account/activities">
                      <a className="text-primary">Hoạt động.</a>
                    </Link>
                  </p>
                }
                title="Chuyến đi đã được khởi tạo"
              />
            </div>
            <h3 className="text-base uppercase font-semibold mb-16 md:mb-24 text-blue-7">
              Danh sách hành khách
            </h3>

            {compoundingCar?.state === "confirm_deposit" &&
            compoundingCar.compounding_car_customers?.length > 0 ? (
              <ul className="mb-[40px]">
                {compoundingCar.compounding_car_customers.map((item, index) => (
                  <li className="mb-24 last:mb-0" key={item.compounding_car_customer_id}>
                    <p className="text-xs mb-12">{index + 1},</p>
                    <RideSummaryPassengerItem data={item} />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm md:text-base">Chưa có hành khách nào</p>
            )}
          </>
        )}
      </div>

      {!isValidating ? (
        <div className="max-w-[1280px] fixed bottom-0 right-0 left-0 bg-white-color xl:mx-auto md:mx-24 z-10 p-12">
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
