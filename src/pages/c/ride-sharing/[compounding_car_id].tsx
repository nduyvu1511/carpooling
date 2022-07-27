import {
  CarpoolingCompoundingForm,
  Map,
  RidesDetailLoading,
  RidesProgress,
  RidesSummary,
} from "@/components"
import {
  useCompoundingCar,
  useCompoundingCarActions,
  useCompoundingForm,
  useEffectOnce,
} from "@/hooks"
import { CustomerBookingLayout } from "@/layout"
import { CreateCarpoolingCompoundingCar } from "@/models"
import { useRouter } from "next/router"

const RidesDetailCustomer = () => {
  const router = useRouter()
  const { compounding_car_id } = router.query
  const { confirmCompoundingCar, createExistingCompoundingCar } = useCompoundingCarActions()
  const { compoundingCarResToCarpoolingForm } = useCompoundingForm()
  const {
    data: compoundingCar,
    isValidating,
    mutate,
  } = useCompoundingCar({
    compounding_car_id: Number(compounding_car_id),
    key: "confirm_booking_compounding_car_customer",
    type: "once",
  })

  const handleConfirmCompoundingCar = (params: CreateCarpoolingCompoundingCar) => {
    if (!compoundingCar?.compounding_car_id) return
    createExistingCompoundingCar({
      params: { ...params, compounding_car_id: compoundingCar.compounding_car_id },
      onSuccess: (data) => {
        confirmCompoundingCar({
          params: { compounding_car_customer_id: data.compounding_car_customer_id },
          onSuccess: () => {
            router.push(
              `/c/booking/checkout?compounding_car_customer_id=${data.compounding_car_customer_id}`
            )
          },
        })
      },
    })
  }

  useEffectOnce(() => {
    return () => {
      mutate(undefined, false)
    }
  })

  return (
    <CustomerBookingLayout
      showLoading={isValidating}
      topNode={<RidesProgress state={compoundingCar?.state} />}
      rightNode={
        compoundingCar ? <RidesSummary rides={compoundingCar} car_account_type="customer" /> : null
      }
      title="Xác nhận chuyến đi ghép"
    >
      <div className="p-12 md:p-24 pt-0 h-fit">
        {isValidating ? (
          <RidesDetailLoading />
        ) : !compoundingCar?.compounding_car_id ? (
          <div className="py-[40px] text-center">
            <p className="text-base">Không tìm thấy chuyến đi này</p>
          </div>
        ) : (
          <>
            <div className="h-[200px] md:h-[300px] mb-12">
              <Map viewOnly />
            </div>

            <div className="">
              <CarpoolingCompoundingForm
                viewButtonModal={false}
                defaultValues={compoundingCarResToCarpoolingForm(compoundingCar)}
                onSubmit={(data) => handleConfirmCompoundingCar(data)}
                type="existed"
                limitNumberSeat={compoundingCar?.number_available_seat}
              />
            </div>
          </>
        )}
      </div>
    </CustomerBookingLayout>
  )
}

export default RidesDetailCustomer
