import { HeaderMobile, RideCustomerBill, RideProgress, RideSummaryLoading } from "@/components"
import { useBackRouter, useCompoundingCarCustomer, useEffectOnce } from "@/hooks"
import { CustomerLayout } from "@/layout"
import Link from "next/link"
import { useRouter } from "next/router"

const RideDoneCustomer = () => {
  const router = useRouter()
  const { compounding_car_customer_id = "" } = router.query
  const { data, isInitialLoading, mutate } = useCompoundingCarCustomer({
    key: "get_compounding_car_customer_invoice",
    type: "once",
    compounding_car_customer_id: Number(compounding_car_customer_id),
  })

  useBackRouter({
    cb: (as) => {
      if (as.includes(`/c/ride-sharing/checkout`)) {
        router.push("/c")
      }
    },
  })

  useEffectOnce(() => {
    return () => {
      mutate(undefined, false)
    }
  })

  return (
    <>
      <HeaderMobile showHomeBtn className="lg:hidden" title="Thông tin hóa đơn" />
      <CustomerLayout showHeaderOnMobile={false}>
        <div className="pt-[56px] lg:pt-0 content-container block-element md:mt-24 md:px-12 lg:px-0 flex-1 bg-white-color pb-[64px]">
          {isInitialLoading ? (
            <RideSummaryLoading view="lg" />
          ) : data ? (
            <div className="">
              <div className="p-12 md:pt-0 lg:py-24">
                <RideProgress state={data?.state} />
              </div>

              <div className=""></div>
              <RideCustomerBill
                type="checkout"
                title="Hoàn thành chuyến đi"
                desc={
                  <p>
                    Chuyến đi của bạn đã được đặt cọc thành công, vui lòng kiểm tra chi tiết hoá đơn
                    qua SMS
                  </p>
                }
                data={data}
              />
              {/* <div className="mb-[40px]">
                  <p className="text-base font-semibold uppercase text-primary md:text-blue-8 md:normal-case mb-24">
                    Thông tin thanh toán
                  </p>
                  <ul>
                    <li className="flex items-start mb-12">
                      <p className="text-xs w-[150px] leading-[26px]">Giá tạm tính</p>
                      <p className="text-sm whitespace-nowrap">
                        {formatMoneyVND(data.amount_total)}
                      </p>
                    </li>
                    <li className="flex items-start mb-12">
                      <p className="text-xs w-[150px] leading-[26px]">Đã đặt cọc</p>
                      <p className="text-sm whitespace-nowrap">
                        {formatMoneyVND(data.down_payment)}
                      </p>
                    </li>
                    <li className="flex items-start">
                      <p className="text-xs w-[150px] leading-[26px]">Đã thanh toán</p>
                      <p className="text-sm whitespace-nowrap">{formatMoneyVND(data.amount_due)}</p>
                    </li>
                    <div className="my-12 border-b border-solid border-border-color"></div>
                    <li className="flex items-start">
                      <p className="text-sm whitespace-nowrap w-[150px] leading-[26px] uppercas font-semibold ">
                        TỔNG GIÁ TRỊ
                      </p>
                      <p className="text-base font-semibold text-error">
                        {formatMoneyVND(data.amount_due + data.down_payment)}
                      </p>
                    </li>
                  </ul>
                </div>
                <DriverInfoSummary
                  titleClassName="text-primary md:text-blue-8"
                  driver={data.car_driver_id}
                />
              </RideCustomerBill> */}

              <div className="content-container fixed bottom-0 right-0 left-0 bg-white-color z-10 p-12">
                <Link href="/c">
                  <a className="btn-primary-outline mx-auto">Về trang chủ</a>
                </Link>
              </div>
            </div>
          ) : null}
        </div>
      </CustomerLayout>
    </>
  )
}

export default RideDoneCustomer
