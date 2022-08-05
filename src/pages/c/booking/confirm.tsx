import {
  CarpoolingCompoundingForm,
  Map,
  OneWayCompoundingForm,
  RidesDetailLoading,
  RidesProgress,
  RidesSummaryMobile,
  RideSummary,
  RideSummaryModal,
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
import { useRouter } from "next/router"
import { useEffect } from "react"

const ConfirmBookingCustomer = () => {
  const router = useRouter()
  const { compounding_car_customer_id } = router.query
  const { confirmCompoundingCar, updateCompoundingCar } = useCompoundingCarActions()
  const {
    data: compoundingCar,
    isInitialLoading,
    mutate: mutateCompoundingCar,
  } = useCompoundingCarCustomer({
    compounding_car_customer_id: Number(compounding_car_customer_id),
    key: "confirm_booking_compounding_car_customer",
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
      mutateCompoundingCar(undefined, false)
    }
  })

  const handleConfirmCompoundingCar = (params: CreateCompoundingCar) => {
    if (!compoundingCar?.compounding_car_customer_id) return

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
      topNode={<RidesProgress state={compoundingCar?.state} />}
      showLoading={isInitialLoading}
      rightNode={
        compoundingCar ? (
          <>
            <div className="hidden lg:block">
              <RideSummary data={compoundingCar} />
            </div>
            <div className="lg:hidden mx-12 mb-12 md:mb-0 md:mx-24 rounded-[5px] overflow-hidden">
              <RidesSummaryMobile rides={compoundingCar} />
            </div>
          </>
        ) : null
      }
      title="Xác nhận chuyến đi"
    >
      <div className="p-12 md:p-24 pt-0 bg-white-color rounded-[5px] shadow-shadow-1 h-fit">
        {isInitialLoading ? (
          <RidesDetailLoading />
        ) : (
          <>
            {/* <div className="h-[300px] mb-12">
              <Map viewOnly />
            </div> */}

            <div className="">
              {compoundingCar?.compounding_type ? (
                <>
                  {compoundingCar.compounding_type === "one_way" ? (
                    <OneWayCompoundingForm
                      defaultValues={compoundingCarCustomerResToOneWayForm(compoundingCar)}
                      mode={"confirm"}
                      onSubmit={(data) => {
                        handleConfirmCompoundingCar(data)
                      }}
                    />
                  ) : compoundingCar.compounding_type === "two_way" ? (
                    <TwoWayCompoundingForm
                      defaultValues={compoundingCarCustomerResToTwoWayForm(compoundingCar)}
                      mode={"confirm"}
                      onSubmit={(data) => {
                        handleConfirmCompoundingCar(data)
                      }}
                    />
                  ) : (
                    <CarpoolingCompoundingForm
                      mode={"confirm"}
                      defaultValues={compoundingCarCustomerResToCarpoolingForm(compoundingCar)}
                      onSubmit={(data) => {
                        handleConfirmCompoundingCar(data)
                      }}
                    />
                  )}
                </>
              ) : null}
            </div>
          </>
        )}
      </div>
      {compoundingCar ? <RideSummaryModal rides={compoundingCar} /> : null}
    </CustomerBookingLayout>
  )
}

export default ConfirmBookingCustomer
