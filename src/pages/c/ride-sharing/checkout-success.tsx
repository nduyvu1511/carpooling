import { HeaderMobile, RideCustomerBill, RideProgress, RideSummaryLoading } from "@/components"
import { useBackRouter, useCompoundingCarCustomer } from "@/hooks"
import { CustomerLayout } from "@/layout"
import Link from "next/link"
import { useRouter } from "next/router"

const RideDoneCustomer = () => {
  const router = useRouter()
  const { compounding_car_customer_id = "" } = router.query
  const { data, isInitialLoading } = useCompoundingCarCustomer({
    key: `get_compounding_car_customer_invoice_${compounding_car_customer_id}`,
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

  return (
    <>
      <HeaderMobile showHomeBtn className="lg:hidden" title="Thông tin hóa đơn" />
      <CustomerLayout showHeaderOnMobile={false}>
        <div className="pt-[56px] lg:pt-0 content-container block-element md:mt-24 md:px-12 lg:px-0 flex-1 bg-white-color pb-[64px]">
          {isInitialLoading ? (
            <div className="p-12 md:p-24">
              <RideSummaryLoading view="lg" />
            </div>
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
