import {
  CarpoolingCompoundingForm,
  OneWayCompoundingForm,
  RideDetailLoading,
  RideProgress,
  RideSummary,
  RideSummaryMobile,
  RideSummaryModal,
  RideToolTip,
  Seo,
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
  const { updateCompoundingCar } = useCompoundingCarActions()
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
      return
    }

    updateCompoundingCar({
      params: {
        compounding_car_customer_id: compoundingCar.compounding_car_customer_id,
        ...params,
      },
      onSuccess: () => {
        router.push(
          `/c/booking/checkout?compounding_car_customer_id=${compounding_car_customer_id}`
        )
      },
    })
  }

  return (
    <CustomerBookingLayout
      topNode={<RideProgress state={compoundingCar?.state} />}
      showLoading={isInitialLoading}
      rightNode={compoundingCar ? <RideSummary data={compoundingCar} /> : null}
      title="Xác nhận chuyến đi"
    >
      <Seo
        title="Xác nhận chuyến đi"
        url={`c/booking/confirm?compounding_car_customer_id=${compounding_car_customer_id}`}
      />

      <div className=" bg-white-color rounded-[5px] h-fit">
        {isInitialLoading ? (
          <RideDetailLoading />
        ) : (
          <>
            {compoundingCar?.compounding_type ? (
              <>
                <RideToolTip
                  className="mb-24"
                  percentage={compoundingCar?.customer_deposit_percentage}
                  desc="Phần chi phí còn lại hành khách sẽ thanh toán cho tài xế sau khi hoàn tất chuyến đi."
                />
                <RideSummaryMobile className="mb-24 lg:hidden" rides={compoundingCar} />

                {compoundingCar.compounding_type === "one_way" ? (
                  <OneWayCompoundingForm
                    defaultValues={compoundingCarCustomerResToOneWayForm(compoundingCar)}
                    mode="create"
                    labelBtn="Xác nhận"
                    onSubmit={handleConfirmCompoundingCar}
                  />
                ) : compoundingCar.compounding_type === "two_way" ? (
                  <TwoWayCompoundingForm
                    view="page"
                    defaultValues={compoundingCarCustomerResToTwoWayForm(compoundingCar)}
                    mode="create"
                    labelBtn="Xác nhận"
                    onSubmit={handleConfirmCompoundingCar}
                  />
                ) : (
                  <CarpoolingCompoundingForm
                    view="page"
                    mode="create"
                    labelBtn="Xác nhận"
                    defaultValues={{
                      ...compoundingCarCustomerResToCarpoolingForm(compoundingCar),
                      from_location: compoundingCar?.is_picking_up_from_start
                        ? {
                            address: compoundingCar.from_address,
                            lat: Number(compoundingCar.from_latitude),
                            lng: Number(compoundingCar.from_longitude),
                            province_id: Number(compoundingCar.from_province.province_id),
                          }
                        : undefined,
                    }}
                    onSubmit={handleConfirmCompoundingCar}
                  />
                )}
              </>
            ) : null}
          </>
        )}
      </div>

      {compoundingCar ? <RideSummaryModal data={compoundingCar} /> : null}
    </CustomerBookingLayout>
  )
}

export default ConfirmBookingCustomer
