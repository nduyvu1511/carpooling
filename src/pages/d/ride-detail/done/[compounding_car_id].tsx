import {
  RideDriverSummary,
  RideProgress,
  RidesSummaryHeader,
  RideSummaryLoading,
  RideSummaryMap,
  RideSummaryPassengerItem,
} from "@/components"
import { useBackRouter, useBreakpoint } from "@/hooks"
import { DriverBookingLayout } from "@/layout"
import { DriverCompoundingCarInvoiceRes } from "@/models"
import { ridesApi } from "@/services"
import Link from "next/link"
import { useRouter } from "next/router"
import useSWR from "swr"

const RideDone = () => {
  const breakpoints = useBreakpoint()
  const router = useRouter()
  const { compounding_car_id = "" } = router.query
  const { data: compoundingCar, isValidating } = useSWR<DriverCompoundingCarInvoiceRes | undefined>(
    compounding_car_id ? `get_driver_compounding_car_invoice_${compounding_car_id}` : null,
    () =>
      ridesApi
        .getDriverCompoundingCarInvoice({ compounding_car_id: Number(compounding_car_id) })
        .then((res) => res.result.data)
        .catch((err) => console.log(err))
  )

  useBackRouter({
    cb: (as) => {
      if (as.includes(`/d/ride-detail/in-process`)) {
        router.push("/d")
      }
    },
  })

  return (
    <DriverBookingLayout
      topNode={<RideProgress className="mb-[40px]" state={compoundingCar?.state} />}
      showLoading={isValidating}
      rightNode={
        compoundingCar ? (
          <>
            <RideSummaryMap showMap={false} data={compoundingCar as any} />
            <RideDriverSummary className="py-16 px-12 md:px-16 xl:px-24" ride={compoundingCar} />
          </>
        ) : null
      }
      title="Chuyến đi thành công"
      showHeaderDesktop={false}
    >
      {isValidating ? (
        <RideSummaryLoading view="lg" />
      ) : compoundingCar ? (
        <>
          <div className="mb-[40px]">
            <RidesSummaryHeader
              desc={
                <p className="text-sm md:text-base">
                  Chuyến đi của bạn đã được thanh toán, vui lòng kiểm tra chi tiết chuyến đi qua
                  email hoặc trang{" "}
                  <Link href="/d/account/activities">
                    <a className="text-primary font-semibold">Hoạt động.</a>
                  </Link>
                </p>
              }
              title="Chuyến đi đã được khởi tạo"
            />
          </div>

          {breakpoints < 1024 ? (
            <div className="mb-[40px]">
              <p className="title-uppercase">Thông tin thanh toán</p>
              <RideDriverSummary className="mb-24" ride={compoundingCar} />
            </div>
          ) : null}

          {compoundingCar && compoundingCar?.customer_invoice?.length > 0 ? (
            <ul className="mb-[40px]">
              {compoundingCar.customer_invoice.map((item, index) => (
                <li className="mb-24 last:mb-0" key={item.compounding_car_customer_id}>
                  <p className="text-xs mb-12">{index + 1},</p>
                  <RideSummaryPassengerItem data={item} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm md:text-base">Chưa có hành khách nào</p>
          )}

          <div className="flex-center lg:justify-start">
            <Link href="/d">
              <a className="btn-primary-outline">Về trang chủ</a>
            </Link>
          </div>
        </>
      ) : null}
    </DriverBookingLayout>
  )
}

export default RideDone
