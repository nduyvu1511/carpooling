import {
  RideProgress,
  RidesDetailLoading,
  RidesSummaryHeader,
  RideSummary,
  RideSummaryPassengerItem,
} from "@/components"
import { formatMoneyVND } from "@/helper"
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
      className="md:pb-[64px]"
      topNode={<RideProgress state={compoundingCar?.state} />}
      showLoading={isValidating}
      reverse
      rightNode={
        compoundingCar ? (
          <div className="px-12 md:px-24 lg:px-0">
            <RideSummary data={compoundingCar as any}>
              <ul className="lg:px-24 my-[40px]">
                <p className="text-base font-semibold mb-24">Chi tiết hoá đơn</p>
                <li className="flex items-center justify-between mb-12">
                  <p className="text-xs">Giá tạm tính</p>
                  <p className="text-sm md:text-base ml-12 flex-1 text-right">
                    {compoundingCar?.amount_total}
                  </p>
                </li>
                <li className="flex items-center justify-between mb-12">
                  <p className="text-xs">
                    Đã đặt cọc({(compoundingCar?.down_payment?.percent || 0) * 100}%)
                  </p>
                  <p className="text-sm md:text-base ml-12 flex-1 text-right">
                    {formatMoneyVND(compoundingCar?.down_payment?.total || 0)}
                  </p>
                </li>
              </ul>
            </RideSummary>
          </div>
        ) : null
      }
      title="Đặt cọc thành công"
    >
      <div className="bg-white-color block-element pt-24 px-12 md:px-24">
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
            <h3 className="text-base uppercase font-semibold mb-24">Danh sách hành khách</h3>

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
            ) : null}
          </>
        )}
      </div>

      {isValidating ? (
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
