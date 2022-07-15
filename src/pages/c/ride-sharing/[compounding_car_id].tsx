import { CarpoolingCompoundingForm, Map, NoSSRWrapper, RidesSummary } from "@/components"
import { useCompoundingCar, useCompoundingCarActions, useCompoundingForm } from "@/hooks"
import { BookingLayout, CustomerLayout } from "@/layout"
import { CreateCarpoolingCompoundingCar } from "@/models"
import { useRouter } from "next/router"

const RidesDetail = () => {
  const router = useRouter()
  const { compounding_car_id } = router.query
  const { confirmCompoundingCar, createExistingCompoundingCar } = useCompoundingCarActions()
  const { data: compoundingCar, isInitialLoading } = useCompoundingCar({
    compounding_car_id: Number(compounding_car_id),
    key: "confirm_booking_compounding_car_customer",
    type: "once",
  })
  const { compoundingCarResToCarpoolingForm } = useCompoundingForm()

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

  if (!compoundingCar?.compounding_car_id) return null
  return (
    <NoSSRWrapper>
      <BookingLayout
        rightNode={
          compoundingCar ? (
            <RidesSummary rides={compoundingCar} car_account_type="customer" />
          ) : null
        }
        title="Xác nhận chuyến đi"
      >
        <div className="p-24 pt-0 bg-white-color rounded-[5px] shadow-shadow-1 h-fit">
          <div className="h-[300px] mb-12">
            <Map viewOnly />
          </div>

          <div className="">
            <div className="mb-[40px]">
              <CarpoolingCompoundingForm
                viewButtonModal={false}
                defaultValues={compoundingCarResToCarpoolingForm(compoundingCar)}
                onSubmit={(data) => {
                  handleConfirmCompoundingCar(data)
                }}
              />
            </div>
          </div>
        </div>
      </BookingLayout>
    </NoSSRWrapper>
  )
}

RidesDetail.Layout = CustomerLayout
export default RidesDetail
