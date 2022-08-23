import { HeaderMobile, RideCustomerBill, RideProgress, Seo, Spinner } from "@/components"
import { useBackRouter, useCompoundingCarCustomer } from "@/hooks"
import { CustomerLayout } from "@/layout"
import Link from "next/link"
import { useRouter } from "next/router"

const CheckoutSuccess = () => {
  const router = useRouter()
  const { compounding_car_customer_id } = router.query
  const { data: compoundingCarCustomer, isValidating } = useCompoundingCarCustomer({
    key: `get_compounding_car_customer_detail_checkout_${compounding_car_customer_id}`,
    type: "once",
    compounding_car_customer_id: Number(compounding_car_customer_id),
  })

  useBackRouter({
    cb: (as) => {
      if (as.includes("/c/booking/checkout")) {
        router.push("/c")
      }
    },
  })

  return (
    <CustomerLayout headerClassName="hidden md:flex" showHeaderOnMobile={false}>
      <Seo description="" thumbnailUrl="" title="Đặt chuyến thành công" url="" />
      <HeaderMobile className="md:hidden" title="Đặt chuyến thành công" />
      <div className="content-container sm:py-16 pb-[70px] mt-[56px] md:mt-0">
        {isValidating ? (
          <Spinner className="py-[60px]" size={40} />
        ) : (
          <div className="block-element p-custom">
            <RideProgress className="mb-24 md:mb-[40px]" state={compoundingCarCustomer?.state} />
            {compoundingCarCustomer?.compounding_car_customer_id ? (
              <RideCustomerBill type="deposit" data={compoundingCarCustomer} />
            ) : null}
          </div>
        )}
      </div>
      {!isValidating ? (
        <div className="content-container fixed bottom-0 right-0 left-0 bg-white-color z-10 p-12">
          <Link href="/c">
            <a className="btn-primary-outline mx-auto">Về trang chủ</a>
          </Link>
        </div>
      ) : null}
    </CustomerLayout>
  )
}

export default CheckoutSuccess
