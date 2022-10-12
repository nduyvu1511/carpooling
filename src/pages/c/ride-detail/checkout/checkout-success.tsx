import { HeaderMobile, RideCustomerBill, RideProgress, RideSummaryLoading, Seo } from "@/components"
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
      if (as.includes(`/c/ride-detail/checkout`)) {
        router.push("/c")
      }
    },
  })

  return (
    <>
      <HeaderMobile showHomeBtn className="lg:hidden" title="Thông tin hóa đơn" />
      <Seo
        title="Thông tin hóa đơn"
        url={`c/ride-detail/checkout/checkout-success?compounding_car_customer_id=${compounding_car_customer_id}`}
      />

      <CustomerLayout showHeaderOnMobile={false}>
        <div className="mb-[56px] lg:mb-0"></div>
        <div className="content-container block-element md:mt-16 lg:mt-24 p-custom flex-1 pb-[70px]">
          {isInitialLoading ? (
            <div className="p-custom">
              <RideSummaryLoading view="lg" />
            </div>
          ) : data ? (
            <>
              <RideProgress className="pr-0 pb-0 mb-[40px]" state={data?.state} />

              <RideCustomerBill
                className="mb-[40px]"
                type="checkout"
                title="Hoàn thành chuyến đi"
                desc={
                  <p className="text-sm md:text-base leading-[22px]">
                    Chuyến đi của bạn đã được thanh toán, vui lòng kiểm tra chi tiết chuyến đi qua
                    email hoặc truy cập trang{" "}
                    <Link href={"/c/activities"}>
                      <a className="text-primary font-semibold">Hoạt động.</a>
                    </Link>
                  </p>
                }
                data={data}
              />

              <div className="my-24 border-border-color border-solid border-0 md:border-b"></div>

              <div className="mb-24">
                <p className="text-sm leading-[22px]">
                  Cảm ơn bạn đã sử dụng dịch vụ của ExxeVn, chúng tôi mong rằng bạn hài lòng với
                  dịch vụ mà chúng tôi cung cấp
                </p>
              </div>

              <div className="content-container fixed bottom-0 right-0 left-0 bg-white-color z-10 p-12 flex-center">
                <Link href="/c">
                  <a className="btn-primary-outline px-12 sm:px-[28px] h-[48px] mr-12 md:mr-16">
                    Trang chủ
                  </a>
                </Link>

                <Link href={`/c/ride-detail/${data.compounding_car_customer_id}`}>
                  <a className="btn-primary px-12 sm:px-[28px] h-[48px]">Đánh giá</a>
                </Link>
              </div>
            </>
          ) : null}
        </div>
      </CustomerLayout>
    </>
  )
}

export default RideDoneCustomer
