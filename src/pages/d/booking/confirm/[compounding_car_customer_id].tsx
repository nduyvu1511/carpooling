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
import { CustomerBookingLayout } from "@/layout"
import { CompoundingCarCustomer } from "@/models"
import { setShowSummaryDetail } from "@/modules"
import { useRouter } from "next/router"
import { useState } from "react"
import { useDispatch } from "react-redux"

const CompoundingCarDriver = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { compounding_car_customer_id } = router.query
  const { confirmCompoundingCar } = useCompoundingCarActions()
  const { compoundingCarCustomerResToCarpoolingForm } = useCompoundingForm()
  const {
    data: compoundingCar,
    isInitialLoading,
    mutate,
  } = useCompoundingCarCustomer({
    compounding_car_customer_id: Number(compounding_car_customer_id),
    key: "confirm_booking_compounding_car_customer_driver",
    type: "once",
  })
  const [compoundingCarCustomer, setCompoundingCarCustomer] = useState<
    CompoundingCarCustomer | undefined
  >(undefined)

  const handleConfirmCompoundingCar = () => {
    if (!compoundingCarCustomer) return

    confirmCompoundingCar({
      params: { compounding_car_customer_id: compoundingCarCustomer.compounding_car_customer_id },
      onSuccess: () => {
        router.push(
          `/c/booking/checkout?compounding_car_customer_id=${compoundingCarCustomer.compounding_car_customer_id}`
        )
      },
    })
  }

  useEffectOnce(() => {
    return () => {
      mutate(undefined, false)
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
      <CustomerBookingLayout
        showLoading={isInitialLoading}
        topNode={<RideProgress state={compoundingCar?.state} />}
        rightNode={
          compoundingCar ? (
            <>
              <div className="hidden lg:block">
                <RideSummary
                  showFull={!!compoundingCarCustomer}
                  data={compoundingCarCustomer || compoundingCar}
                />
              </div>
              <div className="lg:hidden mx-12 mb-12 md:mb-24 md:mx-24 rounded-[5px] overflow-hidden mt-12">
                <RideSummaryMobile rides={compoundingCar} />
              </div>
            </>
          ) : null
        }
        title={compoundingCarCustomer ? "Xác nhận chuyến đi ghép" : "Tạo chuyến đi ghép"}
      >
        <div className="p-12 md:p-24 md:pt-0 pt-0 h-fit">
          {isInitialLoading ? (
            <RidesDetailLoading />
          ) : compoundingCar === undefined ? (
            <div className="py-[40px] text-center">
              <p className="text-base">Không tìm thấy chuyến đi này</p>
            </div>
          ) : (
            <>
              {/* <RideToolTip
                className="mb-24"
                percentage={compoundingCar.car_driver_deposit_percentage}
                desc="Phần chi phí còn lại hành khách sẽ thanh toán cho tài xế sau khi hoàn tất chuyến đi."
              /> */}
              <CarpoolingCompoundingForm
                defaultValues={compoundingCarCustomerResToCarpoolingForm(compoundingCar)}
                onSubmit={(data) => {
                  handleConfirmCompoundingCar()
                  //   if (compoundingCarCustomer) {
                  //   handleConfirmCompoundingCar()
                  // } else {
                  //   handleCreateExistedCompoundingCar(data)
                  // }
                }}
                type="existed"
                limitNumberSeat={compoundingCar?.number_available_seat}
                view="page"
                mode="confirm"
                btnLabel={`${compoundingCarCustomer ? "Xác nhận" : "Tiếp tục"}`}
              />
            </>
          )}
        </div>

        {compoundingCar ? <RideSummaryModal rides={compoundingCar} /> : null}
      </CustomerBookingLayout>
    </>
  )
}

export default CompoundingCarDriver
