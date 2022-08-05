import { HeaderMobile, RideDriverSummary, RidesSummaryLoading } from "@/components"
import { useEffectOnce } from "@/hooks"
import { DriverLayout } from "@/layout"
import { DriverCompoundingCarInvoiceRes } from "@/models"
import { ridesApi } from "@/services"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect } from "react"
import useSWR from "swr"

const RideDone = () => {
  const router = useRouter()
  const { compounding_car_id = "" } = router.query
  const { data, mutate, error, isValidating } = useSWR<DriverCompoundingCarInvoiceRes | undefined>(
    compounding_car_id ? "get_driver_compounding_car_invoice" : null,
    () =>
      ridesApi
        .getDriverCompoundingCarInvoice({ compounding_car_id: Number(compounding_car_id) })
        .then((res) => res.result.data)
        .catch((err) => console.log(err))
  )

  useEffect(() => {
    router.beforePopState(({ as }) => {
      if (as.includes(`/d/ride-detail/in-process`)) {
        router.push("/d")
      }
      return true
    })

    return () => {
      router.beforePopState(() => true)
    }
  }, [router])

  useEffectOnce(() => {
    return () => {
      mutate(undefined, false)
    }
  })

  return (
    <>
      <HeaderMobile className="lg:hidden" title="Thông tin hóa đơn" />
      <DriverLayout>
        <div className="content-container pt-[56px] lg:pt-0 block-element md:mt-24 px-12 sm:px-24 flex-1 bg-white-color pb-[64px]">
          {data === undefined && error === undefined ? (
            <RidesSummaryLoading view="lg" />
          ) : data ? (
            <div className="py-24">
              <RideDriverSummary ride={data} />
            </div>
          ) : null}
        </div>
      </DriverLayout>

      {!isValidating ? (
        <div className="content-container fixed bottom-0 right-0 left-0 bg-white-color z-10 p-12">
          <Link href="/d">
            <a className="btn-primary-outline mx-auto">Về trang chủ</a>
          </Link>
        </div>
      ) : null}
    </>
  )
}

export default RideDone