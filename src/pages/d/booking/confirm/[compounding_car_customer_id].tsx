import {
  CarpoolingCompoundingForm,
  RideProgress,
  RideDetailLoading,
  RideSummary,
  RideSummaryMobile,
  RideSummaryModal,
} from "@/components"
import { useCompoundingCarActions, useCompoundingCarCustomer, useCompoundingForm } from "@/hooks"
import { DriverBookingLayout } from "@/layout"
import { CreateCarpoolingCompoundingCar } from "@/models"
import { useRouter } from "next/router"

const CompoundingCarDriver = () => {
  const router = useRouter()
  const { compounding_car_customer_id } = router.query
  const { confirmCompoundingCar, updateCompoundingCar } = useCompoundingCarActions()
  const { compoundingCarCustomerResToCarpoolingForm, clearCarpoolingWayCompoundingCar } =
    useCompoundingForm()
  const { data: compoundingCar, isInitialLoading } = useCompoundingCarCustomer({
    compounding_car_customer_id: Number(compounding_car_customer_id),
    key: `confirm_booking_compounding_car_customer_driver_${compounding_car_customer_id}`,
    type: "once",
  })

  const handleConfirmCompoundingCar = (params: CreateCarpoolingCompoundingCar) => {
    if (!compoundingCar?.compounding_car_customer_id) return

    if (compoundingCar.state === "confirm") {
      router.push(
        `/d/ride-detail/checkout/checkout-success?compounding_car_id=${compoundingCar.compounding_car_id}`
      )
      return
    }

    updateCompoundingCar({
      params: {
        ...params,
        compounding_car_customer_id: compoundingCar?.compounding_car_customer_id,
      },
      onSuccess: () => {
        clearCarpoolingWayCompoundingCar()
        confirmCompoundingCar({
          params: { compounding_car_customer_id: compoundingCar.compounding_car_customer_id },
          onSuccess: () => {
            router.push(
              `/d/ride-detail/checkout/checkout-success?compounding_car_id=${compoundingCar.compounding_car_id}`
            )
          },
        })
      },
    })
  }

  return (
    <>
      <DriverBookingLayout
        showLoading={isInitialLoading}
        topNode={<RideProgress state={compoundingCar?.state} />}
        rightNode={
          compoundingCar ? <RideSummary showDeposit={false} data={compoundingCar} /> : null
        }
        title="Xác nhận chuyến đi"
      >
        <div className="p-custom md:pt-0 pt-0 h-fit">
          {isInitialLoading ? (
            <RideDetailLoading />
          ) : !compoundingCar ? (
            <div className="py-[40px] text-center">
              <p className="text-base">Không tìm thấy chuyến đi này</p>
            </div>
          ) : (
            <>
              <RideSummaryMobile className="lg:hidden mb-24" rides={compoundingCar} />
              <CarpoolingCompoundingForm
                compoundingType="convenient"
                defaultValues={compoundingCarCustomerResToCarpoolingForm(compoundingCar)}
                onSubmit={(data) => handleConfirmCompoundingCar(data)}
                view="page"
                mode="confirm"
                btnLabel=""
              />
            </>
          )}
        </div>

        {compoundingCar ? <RideSummaryModal showDeposit={false} data={compoundingCar} /> : null}
      </DriverBookingLayout>
    </>
  )
}

export default CompoundingCarDriver
