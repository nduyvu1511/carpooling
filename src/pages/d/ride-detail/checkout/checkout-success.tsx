import {
  AccordionItem,
  DriverDepositInfo,
  RideDetailLoading,
  RideDriverBill,
  RideProgress,
  RidesSummaryHeader,
  RideSummaryPassengerItem,
  Seo,
} from "@/components"
import { useBackRouter, useBreakpoint, useChatActions, useCompoundingCarDriver } from "@/hooks"
import { BookingLayout, DriverLayout } from "@/layout"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"

const CheckoutSuccess = () => {
  const breakpoints = useBreakpoint()
  const router = useRouter()
  const { compounding_car_id } = router.query
  const { data: compoundingCar, isValidating } = useCompoundingCarDriver({
    key: `get_compounding_car_customer_detail_checkout_${compounding_car_id}`,
    type: "once",
    compounding_car_id: Number(compounding_car_id),
  })
  const { createSingleChat } = useChatActions()

  const [show, setShow] = useState<boolean>(true)

  useBackRouter({
    cb: () => {
      router.push("/d")
    },
  })

  return (
    <BookingLayout
      className="md:mb-[64px]"
      topNode={<RideProgress className="mb-12 md:mb-24" state={compoundingCar?.state} />}
      showLoading={isValidating}
      rightNode={compoundingCar ? <RideDriverBill data={compoundingCar} /> : null}
      title="Đặt cọc thành công"
      showHeaderDesktop={false}
    >
      <Seo
        title="Đặt cọc thành công"
        url={`/d/ride-detail/checkout-success?compounding_car_id=${compounding_car_id}`}
      />

      <>
        {isValidating ? (
          <RideDetailLoading className="mb-[40px]" />
        ) : (
          <>
            <RidesSummaryHeader
              desc={
                <p className="text-sm md:text-base">
                  Chuyến đi của bạn đã được đặt cọc và xác nhận, vui lòng kiểm tra chi tiết chuyến
                  đi qua email hoặc trang{" "}
                  <Link href="/d/account/activities">
                    <a className="text-primary font-semibold">Hoạt động.</a>
                  </Link>
                </p>
              }
              title="Chuyến đi đã được khởi tạo"
            />

            <div className="my-24 border-b border-solid border-border-color"></div>

            {compoundingCar?.down_payment ? (
              <div className="mb-24 lg:hidden">
                <p className="mb-16 uppercase font-semibold text-base text-primary">
                  Thông tin đặt cọc
                </p>
                <DriverDepositInfo
                  discount_after_tax={compoundingCar?.discount_after_tax}
                  amount_total={
                    compoundingCar?.amount_undiscounted || compoundingCar.amount_total || 0
                  }
                  down_payment={compoundingCar.down_payment}
                  deposit_date={compoundingCar.deposit_date}
                />
              </div>
            ) : null}

            <AccordionItem
              maxHeight={1000000}
              allowTransition={false}
              onClick={() => setShow(!show)}
              className="px-24 py-16 md:px-24 md:py-16 bg-bg-primary rounded-[5px] border-t-0 mb-16 lg:mb-40"
              titleClassName="text-base font-semibold text-blue-7 uppercase"
              title="Danh sách khách hàng"
              isActive={show}
            >
              {compoundingCar?.state === "confirm_deposit" &&
              compoundingCar.compounding_car_customers?.length > 0 ? (
                <ul className="">
                  {compoundingCar.compounding_car_customers.map((item, index) => (
                    <li className="mb-24 last:mb-0" key={item.compounding_car_customer_id}>
                      <RideSummaryPassengerItem
                        onChat={(partner_id) =>
                          createSingleChat({
                            params: { partner_id, compounding_car_id: item.compounding_car_id },
                            onSuccess: () => {},
                          })
                        }
                        data={item}
                      />
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm md:text-base">Chưa có hành khách nào</p>
              )}
            </AccordionItem>

            {breakpoints < 1024 && compoundingCar ? (
              <div className="mb-40">
                <RideDriverBill showHeader={false} showDepositInfo={false} data={compoundingCar} />
              </div>
            ) : null}

            <div className="flex justify-center lg:justify-start">
              <Link href="/d">
                <a className="btn-primary-outline">Về trang chủ</a>
              </Link>
            </div>
          </>
        )}
      </>
    </BookingLayout>
  )
}

CheckoutSuccess.Layout = DriverLayout
export default CheckoutSuccess
