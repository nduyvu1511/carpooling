import { RideCustomerBill, RideProgress, Seo, Spinner } from "@/components"
import { useBackRouter, useCompoundingCarCustomer } from "@/hooks"
import { CustomerLayout } from "@/layout"
import Link from "next/link"
import { useRouter } from "next/router"

const CheckoutSuccess = () => {
  const router = useRouter()
  const { compounding_car_customer_id } = router.query
  const {
    data: compoundingCarCustomer,
    isValidating,
    mutate: mutateCompoundingCar,
  } = useCompoundingCarCustomer({
    key: `get_compounding_car_customer_detail_checkout_${compounding_car_customer_id}`,
    type: "once",
    compounding_car_customer_id: Number(compounding_car_customer_id),
  })

  useBackRouter({
    cb: () => {
      router.push("/c")
    },
  })

  return (
    <>
      <div className="content-container sm:py-24 pb-[64px]">
        {isValidating ? (
          <Spinner className="py-[60px]" size={40} />
        ) : (
          <div className="">
            <div className="block-element pt-24">
              <div className="pl-12 md:px12 mb-24">
                <RideProgress state={compoundingCarCustomer?.state} />
              </div>
              {compoundingCarCustomer?.compounding_car_customer_id ? (
                <RideCustomerBill data={compoundingCarCustomer} />
              ) : null}
            </div>
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
    </>
  )
}

CheckoutSuccess.Layout = CustomerLayout
export default CheckoutSuccess
