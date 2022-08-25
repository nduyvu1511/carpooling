import {
  CarpoolingCompoundingForm,
  OneWayCompoundingForm,
  RideProgress,
  RidesDetailLoading,
  RideSummary,
  RideToolTip,
  TwoWayCompoundingForm,
} from "@/components"
import { useCompoundingCarActions, useCompoundingCarCustomer, useCompoundingForm } from "@/hooks"
import { CustomerBookingLayout } from "@/layout"
import { CreateCompoundingCar } from "@/models"
import { useRouter } from "next/router"

const ConfirmBookingCustomer = () => {
  const router = useRouter()
  const { compounding_car_customer_id } = router.query

  const {
    compoundingCarCustomerResToOneWayForm,
    compoundingCarCustomerResToTwoWayForm,
    compoundingCarCustomerResToCarpoolingForm,
  } = useCompoundingForm()
  const { confirmCompoundingCar, updateCompoundingCar } = useCompoundingCarActions()
  const { data: compoundingCar, isInitialLoading } = useCompoundingCarCustomer({
    compounding_car_customer_id: Number(compounding_car_customer_id),
    key: `confirm_booking_compounding_car_customer_${compounding_car_customer_id}`,
    type: "once",
  })

  const handleConfirmCompoundingCar = (params: CreateCompoundingCar) => {
    if (!compoundingCar?.compounding_car_customer_id) return

    if (compoundingCar.state === "confirm") {
      router.push(`/c/booking/checkout?compounding_car_customer_id=${compounding_car_customer_id}`)
      return
    }

    if (compoundingCar?.state === "deposit") {
      router.push(
        `/c/booking/checkout-success?compounding_car_customer_id=${compounding_car_customer_id}`
      )
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
          <div className="hidden lg:block">
            <RideSummary data={compoundingCar} />
          </div>
        ) : null
      }
      title="Xác nhận chuyến đi"
    >
      <div className=" bg-white-color rounded-[5px] h-fit">
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
                    onSubmit={handleConfirmCompoundingCar}
                  />
                ) : compoundingCar.compounding_type === "two_way" ? (
                  <TwoWayCompoundingForm
                    view="page"
                    defaultValues={compoundingCarCustomerResToTwoWayForm(compoundingCar)}
                    mode={"confirm"}
                    onSubmit={handleConfirmCompoundingCar}
                  />
                ) : (
                  <CarpoolingCompoundingForm
                    view="page"
                    mode={"confirm"}
                    defaultValues={compoundingCarCustomerResToCarpoolingForm(compoundingCar)}
                    onSubmit={handleConfirmCompoundingCar}
                  />
                )}
              </>
            ) : null}
          </>
        )}
      </div>
    </CustomerBookingLayout>
  )
}

export default ConfirmBookingCustomer
