import {
  CarpoolingCompoundingForm,
  RideProgress,
  RidesDetailLoading,
  RideSummary,
  RideSummaryMobile,
  RideSummaryModal,
  RideToolTip
} from "@/components"
import { toggleBodyOverflow } from "@/helper"
import {
  useBackRouter,
  useCompoundingCar,
  useCompoundingCarActions,
  useCompoundingForm
} from "@/hooks"
import { CustomerBookingLayout } from "@/layout"
import { CompoundingCarCustomer, CreateCarpoolingCompoundingCar } from "@/models"
import { useRouter } from "next/router"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { notify } from "reapop"

const RidesDetailCustomer = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { compounding_car_id } = router.query
  const { confirmCompoundingCar, createExistingCompoundingCar } = useCompoundingCarActions()
  const { compoundingCarResToCarpoolingForm } = useCompoundingForm()
  const { data: compoundingCar, isInitialLoading } = useCompoundingCar({
    compounding_car_id: Number(compounding_car_id),
    key: `confirm_booking_compounding_car_customer_${compounding_car_id}`,
    type: "once",
  })
  const [compoundingCarCustomer, setCompoundingCarCustomer] = useState<
    CompoundingCarCustomer | undefined
  >(undefined)

  const handleCreateExistedCompoundingCar = (params: CreateCarpoolingCompoundingCar) => {
    if (!compoundingCar?.compounding_car_id) return
    createExistingCompoundingCar({
      params: { ...params, compounding_car_id: compoundingCar.compounding_car_id },
      onSuccess: (data) => {
        document?.body?.scrollIntoView({ behavior: "smooth" })
        setCompoundingCarCustomer(data)
        setTimeout(() => {
          dispatch(notify("Tạo chuyến đi ghép thành công!", "success"))
        }, 0)
      },
    })
  }

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
            <RideSummary
              showFull={!!compoundingCarCustomer}
              data={compoundingCarCustomer || compoundingCar}
            />
          ) : null
        }
        title={compoundingCarCustomer ? "Xác nhận chuyến đi ghép" : "Thông tin chuyến đi"}
      >
        {isInitialLoading ? (
          <RidesDetailLoading />
        ) : !compoundingCar ? (
          <div className="py-[40px] text-center">
            <p className="text-base">Không tìm thấy chuyến đi này</p>
          </div>
        ) : (
          <>
            <RideToolTip
              className="mb-24"
              percentage={compoundingCar?.car_driver_deposit_percentage}
              desc="Phần chi phí còn lại hành khách sẽ thanh toán cho tài xế sau khi hoàn tất chuyến đi."
            />

            {compoundingCarCustomer ? (
              <RideSummaryMobile rides={compoundingCarCustomer} className="lg:hidden mb-24" />
            ) : null}

            {compoundingCar ? (
              <CarpoolingCompoundingForm
                defaultValues={{
                  ...compoundingCarResToCarpoolingForm(compoundingCar),
                  note: "",
                  number_seat: { label: "1 ghế", value: 1 },
                }}
                onSubmit={(data) => {
                  if (compoundingCarCustomer) {
                    handleConfirmCompoundingCar()
                  } else {
                    handleCreateExistedCompoundingCar(data)
                  }
                }}
                type="existed"
                limitNumberSeat={compoundingCar?.number_available_seat}
                view="page"
                mode="confirm"
                btnLabel={`${compoundingCarCustomer ? "Xác nhận" : "Tiếp tục"}`}
              />
            ) : null}
          </>
        )}
        {compoundingCar ? <RideSummaryModal data={compoundingCar} /> : null}
      </CustomerBookingLayout>
    </>
  )
}

export default RidesDetailCustomer
