import {
  CarpoolingCompoundingForm,
  Map,
  RidesDetailLoading,
  RidesProgress,
  RidesSummary,
  RidesSummaryMobile,
  RidesSummaryModal,
} from "@/components"
import {
  useCompoundingCar,
  useCompoundingCarActions,
  useCompoundingForm,
  useEffectOnce,
} from "@/hooks"
import { CustomerBookingLayout } from "@/layout"
import { CreateCarpoolingCompoundingCar } from "@/models"
import { setShowSummaryDetail } from "@/modules"
import { useRouter } from "next/router"
import { useDispatch } from "react-redux"

const RidesDetailCustomer = () => {
  // const breakPoints = useBreakpoint()
  const dispatch = useDispatch()
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
      dispatch(setShowSummaryDetail(false))
    }
  })

  return (
    <CustomerBookingLayout
      showLoading={isValidating}
      topNode={<RidesProgress state={compoundingCar?.state} />}
      rightNode={
        compoundingCar ? (
          <>
            <div className="hidden lg:block">
              <RidesSummary rides={compoundingCar} car_account_type="customer" />
            </div>
            <div className="lg:hidden mx-12 mb-12 md:mb-0 md:mx-24 rounded-[5px] overflow-hidden">
              <RidesSummaryMobile rides={compoundingCar} />
            </div>
          </>
        ) : null
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
              <Map
                direction={{
                  destination: {
                    lat: Number(compoundingCar.to_latitude),
                    lng: Number(compoundingCar.to_longitude),
                  },
                  origin: {
                    lat: Number(compoundingCar.from_latitude),
                    lng: Number(compoundingCar.from_longitude),
                  },
                }}
                viewOnly
              />
            </div>

            <CarpoolingCompoundingForm
              defaultValues={compoundingCarResToCarpoolingForm(compoundingCar)}
              onSubmit={(data) => handleConfirmCompoundingCar(data)}
              type="existed"
              limitNumberSeat={compoundingCar?.number_available_seat}
              view="page"
            />
          </>
        )}
      </div>

      {compoundingCar ? <RidesSummaryModal rides={compoundingCar} /> : null}
    </CustomerBookingLayout>
  )
}

export default RidesDetailCustomer
