import {
  CarpoolingCompoundingForm,
  OneWayCompoundingForm,
  RideProgress,
  RidesDetailLoading,
  RideSummaryMobile,
  RideSummary,
  RideSummaryModal,
  RideToolTip,
  TwoWayCompoundingForm,
} from "@/components"
import {
  useCompoundingCarActions,
  useCompoundingCarCustomer,
  useCompoundingForm,
  useEffectOnce,
} from "@/hooks"
import { CustomerBookingLayout } from "@/layout"
import { CreateCompoundingCar } from "@/models"
import { setShowSummaryDetail } from "@/modules"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

const ConfirmBookingCustomer = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { compounding_car_customer_id } = router.query
  const { confirmCompoundingCar, updateCompoundingCar } = useCompoundingCarActions()
  const { data: compoundingCar, isInitialLoading } = useCompoundingCarCustomer({
    compounding_car_customer_id: Number(compounding_car_customer_id),
    key: `confirm_booking_compounding_car_customer_${compounding_car_customer_id}`,
    type: "once",
  })
  const {
    clearCarpoolingWayCompoundingCar,
    clearOneWayCompoundingCar,
    clearTwoWayCompoundingCar,
    compoundingCarCustomerResToOneWayForm,
    compoundingCarCustomerResToTwoWayForm,
    compoundingCarCustomerResToCarpoolingForm,
  } = useCompoundingForm()

  useEffect(() => {
    if (compoundingCar?.state === "deposit") {
      router.push(
        `/c/booking/checkout-success?compounding_car_customer_id=${compounding_car_customer_id}`
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [compoundingCar])

  useEffectOnce(() => {
    return () => {
      dispatch(setShowSummaryDetail(false))
    }
  })

  const handleConfirmCompoundingCar = (params: CreateCompoundingCar) => {
    if (!compoundingCar?.compounding_car_customer_id) return

    if (compoundingCar.state === "confirm") {
      router.push(`/c/booking/checkout?compounding_car_customer_id=${compounding_car_customer_id}`)
      return
    }

    updateCompoundingCar({
      params: {
        compounding_car_customer_id: compoundingCar.compounding_car_customer_id,
        ...params,
      },
      onSuccess: () => {
        confirmCompoundingCar({
          params: { compounding_car_customer_id: compoundingCar.compounding_car_customer_id },
          onSuccess: () => {
            router.push(
              `/c/booking/checkout?compounding_car_customer_id=${compounding_car_customer_id}`
            )
            // Clear form from localstorage
            if (compoundingCar?.compounding_type === "compounding") {
              clearCarpoolingWayCompoundingCar()
            } else if (compoundingCar?.compounding_type === "one_way") {
              clearOneWayCompoundingCar()
            } else {
              clearTwoWayCompoundingCar()
            }
          },
        })
      },
    })
  }

  return (
    <CustomerBookingLayout
      topNode={<RideProgress state={compoundingCar?.state} />}
      showLoading={isInitialLoading}
      rightNode={
        compoundingCar ? (
          <>
            <div className="hidden lg:block">
              <RideSummary data={compoundingCar} />
            </div>
            <div className="lg:hidden mx-12 mb-12 md:mb-24 md:mx-24 rounded-[5px] overflow-hidden">
              <RideSummaryMobile rides={compoundingCar} />
            </div>
          </>
        ) : null
      }
      title="Xác nhận chuyến đi"
    >
      <div className="p-12 md:p-24 pt-0 md:pt-0 bg-white-color rounded-[5px] shadow-shadow-1 h-fit">
        {isInitialLoading ? (
          <RidesDetailLoading />
        ) : (
          <>
            {compoundingCar?.compounding_type ? (
              <>
                <RideToolTip
                  className="mb-24"
                  percentage={compoundingCar?.customer_deposit_percentage}
                  desc="Phần chi phí còn lại hành khách sẽ thanh toán cho tài xế sau khi hoàn tất chuyến đi."
                />
                {compoundingCar.compounding_type === "one_way" ? (
                  <OneWayCompoundingForm
                    view="page"
                    defaultValues={compoundingCarCustomerResToOneWayForm(compoundingCar)}
                    mode={"confirm"}
                    onSubmit={(data) => {
                      handleConfirmCompoundingCar(data)
                    }}
                  />
                ) : compoundingCar.compounding_type === "two_way" ? (
                  <TwoWayCompoundingForm
                    view="page"
                    defaultValues={compoundingCarCustomerResToTwoWayForm(compoundingCar)}
                    mode={"confirm"}
                    onSubmit={(data) => {
                      handleConfirmCompoundingCar(data)
                    }}
                  />
                ) : (
                  <CarpoolingCompoundingForm
                    view="page"
                    mode={"confirm"}
                    defaultValues={compoundingCarCustomerResToCarpoolingForm(compoundingCar)}
                    onSubmit={(data) => {
                      handleConfirmCompoundingCar(data)
                    }}
                  />
                )}
              </>
            ) : null}
          </>
        )}
      </div>
      {compoundingCar ? <RideSummaryModal rides={compoundingCar} /> : null}
    </CustomerBookingLayout>
  )
}

export default ConfirmBookingCustomer
