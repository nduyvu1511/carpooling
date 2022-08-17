import {
  CarpoolingCompoundingForm,
  RideProgress,
  RidesDetailLoading,
  RideSummary,
  RideSummaryMobile,
  RideSummaryModal,
} from "@/components"
import { toggleBodyOverflow } from "@/helper"
import {
  useBackRouter,
  useCompoundingCarActions,
  useCompoundingCarCustomer,
  useCompoundingForm,
  useEffectOnce,
} from "@/hooks"
import { DriverBookingLayout } from "@/layout"
import { CreateCarpoolingCompoundingCar } from "@/models"
import { setShowSummaryDetail } from "@/modules"
import { useRouter } from "next/router"
import { useDispatch } from "react-redux"

const CompoundingCarDriver = () => {
  const dispatch = useDispatch()
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
        `/d/ride-detail/checkout-success?compounding_car_id=${compoundingCar.compounding_car_id}`
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
              `/d/ride-detail/checkout-success?compounding_car_id=${compoundingCar.compounding_car_id}`
            )
          },
        })
      },
    })
  }

  useEffectOnce(() => {
    return () => {
      dispatch(setShowSummaryDetail(false))
    }
  })

  useBackRouter({
    cb: () => {
      toggleBodyOverflow("unset")
    },
  })

  return (
    <>
      <DriverBookingLayout
        showLoading={isInitialLoading}
        topNode={<RideProgress state={compoundingCar?.state} />}
        rightNode={
          compoundingCar ? (
            <>
              <div className="hidden lg:block">
                <RideSummary showDeposit={false} data={compoundingCar} />
              </div>
              <div className="lg:hidden mx-12 mb-12 md:mb-24 md:mx-24 rounded-[5px] overflow-hidden mt-12">
                <RideSummaryMobile rides={compoundingCar} />
              </div>
            </>
          ) : null
        }
        title="Xác nhận chuyến đi"
      >
        <div className="p-12 md:p-24 md:pt-0 pt-0 h-fit">
          {isInitialLoading ? (
            <RidesDetailLoading />
          ) : !compoundingCar ? (
            <div className="py-[40px] text-center">
              <p className="text-base">Không tìm thấy chuyến đi này</p>
            </div>
          ) : (
            <>
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

        {compoundingCar ? <RideSummaryModal showDeposit={false} rides={compoundingCar} /> : null}
      </DriverBookingLayout>
    </>
  )
}

export default CompoundingCarDriver
