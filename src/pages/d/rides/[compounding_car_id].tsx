import { WarningIcon } from "@/assets"
import {
  Alert,
  CarpoolingCompoundingForm,
  CheckoutExistsItem,
  Map,
  Modal,
  NoSSRWrapper,
  OneWayCompoundingForm,
  RidesSummary,
  TwoWayCompoundingForm,
} from "@/components"
import {
  useCompoundingCarDriver,
  useCompoundingCarProcess,
  useCompoundingForm,
  useDriverCheckout,
} from "@/hooks"
import { BookingLayout, DriverLayout } from "@/layout"
import { CompoundingCarRes, DepositCompoundingCarDriverFailureRes } from "@/models"
import { useRouter } from "next/router"
import { useState } from "react"

const ConfirmBookingCustomer = () => {
  const router = useRouter()
  const { compounding_car_id } = router.query
  const { data: compoundingCar, isInitialLoading } = useCompoundingCarDriver({
    compounding_car_id: Number(compounding_car_id),
    key: "confirm_booking_compounding_car_customer",
    type: "once",
  })
  const {
    compoundingCarResToCarpoolingForm,
    compoundingCarResToOneWayForm,
    compoundingCarResToTwoWayForm,
  } = useCompoundingForm()
  const { cancelDepositCompoundingCarDriver, fetchDepositCompoundingCarDriver } =
    useDriverCheckout()
  const { startRunningCompoundingCar } = useCompoundingCarProcess(undefined)

  const [showModal, setShowModal] = useState<boolean>(true)
  const [showAlert, setShowAlert] = useState<number | undefined>()
  const [depositFailure, setDepositFailure] = useState<
    DepositCompoundingCarDriverFailureRes | undefined
  >()

  const handleConfirmCheckout = (compounding_car_id: number) => {
    fetchDepositCompoundingCarDriver({
      compounding_car_id,
      onSuccess: () => {
        router.push(`/d/rides/checkout?compounding_car_id=${compounding_car_id}`)
      },
      onError: (data) => {
        setDepositFailure(data)
        setShowModal(true)
      },
      showLoading: true,
    })
  }

  if (!compoundingCar?.compounding_car_id) return null
  return (
    <NoSSRWrapper>
      <>
        <BookingLayout
          rightNode={
            compoundingCar ? (
              <RidesSummary car_account_type="car_driver" rides={compoundingCar as any} />
            ) : null
          }
          title="Xác nhận chuyến đi"
        >
          <div className="p-24 pt-0 bg-white-color rounded-[5px] shadow-shadow-1 h-fit">
            <div className="h-[300px] mb-12">
              <Map viewOnly />
            </div>

            <div className="">
              {compoundingCar?.compounding_type ? (
                <>
                  {compoundingCar.compounding_type === "one_way" ? (
                    <OneWayCompoundingForm
                      defaultValues={compoundingCarResToOneWayForm(compoundingCar as any)}
                      viewButtonModal={false}
                      disabled
                    />
                  ) : compoundingCar.compounding_type === "two_way" ? (
                    <TwoWayCompoundingForm
                      defaultValues={compoundingCarResToTwoWayForm(compoundingCar as any)}
                      viewButtonModal={false}
                      disabled
                    />
                  ) : (
                    <CarpoolingCompoundingForm
                      viewButtonModal={false}
                      defaultValues={compoundingCarResToCarpoolingForm(compoundingCar as any)}
                      disabled
                    />
                  )}
                </>
              ) : null}
            </div>

            <div className="">
              <button
                onClick={() =>
                  compoundingCar.state === "confirm" || compoundingCar.state === "confirm_deposit"
                    ? startRunningCompoundingCar(compoundingCar.compounding_car_id, () => {
                        router.push(`/d/schedules/${compoundingCar.compounding_car_id}`)
                      })
                    : handleConfirmCheckout(compoundingCar.compounding_car_id)
                }
                className="btn-primary"
              >
                {compoundingCar.state === "confirm" || compoundingCar.state === "confirm_deposit"
                  ? "Bắt đầu chuyến đi"
                  : "Nhận chuyến đi"}
              </button>
            </div>
          </div>
        </BookingLayout>

        {showAlert ? (
          <Alert
            type="warning"
            desc="Bạn có chắc chắn muốn hủy giao dịch này?"
            onClose={() => setShowAlert(undefined)}
            onConfirm={() =>
              cancelDepositCompoundingCarDriver(showAlert, () => {
                setShowAlert(undefined)
                setShowModal(false)
                setDepositFailure(undefined)
                router.push(
                  `/d/rides/checkout?compounding_car_id=${compoundingCar.compounding_car_id}`
                )
              })
            }
          />
        ) : null}

        {showModal && depositFailure ? (
          <Modal onClose={() => setShowModal(false)} heading="Cảnh báo">
            <div className="p-24 h-full flex flex-col">
              <div className="mb-[40px]">
                <WarningIcon className="mx-auto mb-[24px]" />
                <h3 className="text-base mb-[24px] text-center">{depositFailure.message}</h3>
              </div>

              {depositFailure.data?.length > 0 ? (
                <ul className="flex-1 overflow-y-auto">
                  {depositFailure.data.map((item, index) => (
                    <li
                      className="border-b border-solid border-border-color last:border-none mb-24"
                      key={index}
                    >
                      <CheckoutExistsItem
                        amount={item.amount}
                        compounding_car_name={item.compounding_car.compounding_car_name}
                        date={item.date}
                        second_remains={item.second_remains}
                        onClickCancel={() => setShowAlert(item.compounding_car.compounding_car_id)}
                        onClickCheckout={() => {
                          router.push(
                            `/d/rides/checkout?compounding_car_id=${item.compounding_car.compounding_car_id}`
                          )
                          setShowModal(false)
                          setDepositFailure(undefined)
                        }}
                      />
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </Modal>
        ) : null}
      </>
    </NoSSRWrapper>
  )
}

ConfirmBookingCustomer.Layout = DriverLayout
export default ConfirmBookingCustomer
