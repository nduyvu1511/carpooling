import {
  AccordionItem,
  HeaderMobile,
  RideDriverSummary,
  RideProgress,
  RidesSummaryHeader,
  RideSummaryLoading,
  RideSummaryPassengerItem,
  Seo,
} from "@/components"
import { useBackRouter } from "@/hooks"
import { DriverLayout } from "@/layout"
import { DriverCompoundingCarInvoiceRes } from "@/models"
import { rideAPI } from "@/services"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import useSWR from "swr"

const RideDone = () => {
  const router = useRouter()
  const { compounding_car_id = "" } = router.query
  const { data: compoundingCar, isValidating } = useSWR<DriverCompoundingCarInvoiceRes | undefined>(
    compounding_car_id ? `get_driver_compounding_car_invoice_${compounding_car_id}` : null,
    () =>
      rideAPI
        .getDriverCompoundingCarInvoice({ compounding_car_id: Number(compounding_car_id) })
        .then((res) => res.result.data)
        .catch((err) => console.log(err))
  )

  const [show, setShow] = useState<boolean>()

  useBackRouter({
    cb: (as) => {
      if (as.includes(`/d/ride-detail/in-process`)) {
        router.push("/")
      }
    },
  })

  return (
    <DriverLayout>
      <Seo
        description="Hoàn thành chuyến đi"
        thumbnailUrl=""
        title="Hoàn thành chuyến đi"
        url={`d/ride-detail/in-process/${compoundingCar?.compounding_car_id}`}
      />
      <HeaderMobile
        onBackBtnClick={() => router.push("/")}
        title="Hoàn thành chuyến đi"
        className="lg:hidden"
      />
      <div className="content-container block-element p-custom md:mb-24 mt-24 sm:mt-[56px] md:mt-[80px] lg:mt-24">
        {isValidating ? (
          <>
            <RideProgress state={undefined} />
            <div className="mt-24"></div>
            <RideSummaryLoading view="lg" />
          </>
        ) : compoundingCar ? (
          <>
            <RideProgress state={compoundingCar.state} className="mb-24 md:mb-40" />

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
              title="Hoàn thành chuyến đi"
            />

            <div className="my-24 border-b border-solid border-border-color"></div>

            <div className="mb-24">
              <p className="title-uppercase mb-16">Hóa đơn</p>
              <RideDriverSummary data={compoundingCar} />
            </div>

            {compoundingCar && compoundingCar?.customer_invoice?.length > 0 ? (
              <ul className="mb-24">
                {/* <p className="title-uppercase mb-16">Danh sách hành khách</p> */}
                <AccordionItem
                  className="px-24 py-16 md:px-24 md:py-16 bg-bg-primary rounded-[5px] border-t-0"
                  // titleClassName="text-base font-semibold text-blue-7 uppercase"
                  titleClassName="title-uppercase mb-0"
                  title="Danh sách hành khách"
                  onClick={() => setShow(!show)}
                  maxHeight={10000000}
                  isActive={show}
                  allowTransition={false}
                >
                  {compoundingCar.customer_invoice.map((item, index) => (
                    <li className="mb-24 last:mb-0" key={item.compounding_car_customer_id}>
                      <RideSummaryPassengerItem showContactButtons={false} data={item} />
                    </li>
                  ))}
                </AccordionItem>
              </ul>
            ) : (
              <p className="text-sm md:text-base">Chưa có hành khách nào</p>
            )}

            <div className="my-24 border-t border-solid border-border-color"></div>

            <div className="">
              <p className="text-sm leading-[22px]">
                Cảm ơn bạn đã sử dụng dịch vụ của ExxeVn, Chúng tôi mong bạn sẽ thích và tiếp tục
                ủng hộ dịch vụ.
              </p>
            </div>

            <div className="flex-center mt-[40px]">
              <Link href="/">
                <a className="btn-primary-outline">Về trang chủ</a>
              </Link>
            </div>
          </>
        ) : null}
      </div>
    </DriverLayout>
  )
}

export default RideDone
