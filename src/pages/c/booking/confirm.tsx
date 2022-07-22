import {
  CarpoolingCompoundingForm,
  Map,
  OneWayCompoundingForm,
  RidesDetailLoading,
  RidesProgress,
  RidesSummary,
  Toggle,
  TwoWayCompoundingForm,
} from "@/components"
import {
  useCompoundingCarActions,
  useCompoundingCarCustomer,
  useCompoundingForm,
  useEffectOnce,
} from "@/hooks"
import { BookingLayout, CustomerLayout } from "@/layout"
import { CompoundingCarCustomer, CreateCompoundingCar } from "@/models"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { notify } from "reapop"

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
  const dispatch = useDispatch()
  const [editable, setEditable] = useState<boolean>(false)

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

    if (editable) {
      updateCompoundingCar({
        params: {
          compounding_car_customer_id: compoundingCar.compounding_car_customer_id,
          ...params,
        },
        onSuccess: () => {
          setEditable(false)
          dispatch(notify("Chỉnh sửa chuyến đi thành công", "success"))
        },
      })
    } else {
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
    }
  }

  return (
    <BookingLayout
      topNode={<RidesProgress state={compoundingCar?.state} />}
      showLoading={isInitialLoading}
      rightNode={<RidesSummary rides={compoundingCar as CompoundingCarCustomer} />}
      title="Xác nhận chuyến đi"
    >
      <div className="p-24 pt-0 bg-white-color rounded-[5px] shadow-shadow-1 h-fit">
        {isInitialLoading ? (
          <RidesDetailLoading />
        ) : (
          <>
            <div className="h-[300px] mb-12">
              <Map viewOnly />
            </div>

            <div className="mb-12 flex items-center">
              <span
                onClick={() => setEditable(!editable)}
                className="mr-12 form-label mb-0 cursor-pointer"
              >
                Bật chỉnh sửa
              </span>
              <Toggle status={editable} onChange={() => setEditable(!editable)} />
            </div>

            <div className="">
              {compoundingCar?.compounding_type ? (
                <>
                  {compoundingCar.compounding_type === "one_way" ? (
                    <OneWayCompoundingForm
                      defaultValues={compoundingCarCustomerResToOneWayForm(compoundingCar)}
                      mode={editable ? "update" : "confirm"}
                      viewButtonModal={false}
                      onSubmit={(data) => {
                        handleConfirmCompoundingCar(data)
                      }}
                      disabled={!editable}
                    />
                  ) : compoundingCar.compounding_type === "two_way" ? (
                    <TwoWayCompoundingForm
                      defaultValues={compoundingCarCustomerResToTwoWayForm(compoundingCar)}
                      mode={editable ? "update" : "confirm"}
                      viewButtonModal={false}
                      onSubmit={(data) => {
                        handleConfirmCompoundingCar(data)
                      }}
                      disabled={!editable}
                    />
                  ) : (
                    <CarpoolingCompoundingForm
                      mode={editable ? "update" : "confirm"}
                      viewButtonModal={false}
                      defaultValues={compoundingCarCustomerResToCarpoolingForm(compoundingCar)}
                      onSubmit={(data) => {
                        handleConfirmCompoundingCar(data)
                      }}
                      disabled={!editable}
                    />
                  )}
                </>
              ) : null}
            </div>
          </>
        )}
      </div>
    </BookingLayout>
  )
}

ConfirmBookingCustomer.Layout = CustomerLayout
export default ConfirmBookingCustomer
