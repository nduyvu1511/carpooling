import { WarningIcon } from "@/assets"
import {
  Alert,
  CarpoolingCompoundingForm,
  CheckoutExistsItem,
  Map,
  Modal,
  OneWayCompoundingForm,
  RatingItem,
  RidesDetailLoading,
  RidesProgress,
  RidesSummary,
  TwoWayCompoundingForm,
} from "@/components"
import { RootState } from "@/core/store"
import {
  useCompoundingCarDriver,
  useCompoundingForm,
  useDriverCheckout,
  useEffectOnce,
} from "@/hooks"
import { BookingLayout, DriverLayout } from "@/layout"
import { CompoundingCarDriverRes, DepositCompoundingCarDriverFailureRes } from "@/models"
import { useRouter } from "next/router"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { notify } from "reapop"

const ConfirmBookingCustomer = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { compounding_car_id } = router.query
  const { userInfo } = useSelector((state: RootState) => state.userInfo)
  const {
    data: compoundingCar,
    isInitialLoading,
    mutate,
  } = useCompoundingCarDriver({
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

  const [showModal, setShowModal] = useState<boolean>(true)
  const [showAlert, setShowAlert] = useState<number | undefined>()
  const [depositFailure, setDepositFailure] = useState<
    DepositCompoundingCarDriverFailureRes | undefined
  >()
  const [showAlertAccount, setShowAlertAccount] = useState<boolean>(false)

  useEffectOnce(() => {
    return () => {
      mutate(undefined, false)
    }
  })

  const handleConfirmCheckout = (compounding_car_id: number) => {
    if (userInfo?.verified_car_driver_account === "blocked_account") {
      dispatch(
        notify("Tài khoản của bạn đã bị khóa, vui lòng liên hệ với Exxe để giải quyết", "warning")
      )
      return
    }
    if (userInfo?.verified_car_driver_account === "inactive_account") {
      setShowAlertAccount(true)
      return
    }

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

  return (
    <>
      <BookingLayout
        showLoading={isInitialLoading}
        topNode={<RidesProgress state={compoundingCar?.state} />}
        rightNode={
          <RidesSummary
            car_account_type="car_driver"
            rides={compoundingCar as CompoundingCarDriverRes}
          />
        }
        title="Chi tiết chuyến đi"
      >
        <div className="p-12 md:p-24 pt-0 bg-white-color rounded-[5px] shadow-shadow-1 h-fit">
          {isInitialLoading ? (
            <RidesDetailLoading />
          ) : compoundingCar?.compounding_car_id ? (
            <>
              <p className="text-base text-primary mb-24">
                Vui lòng đặt cọc 30% số tiền để hoàn tất giao dịch.
              </p>

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

              {compoundingCar.rating_ids?.length > 0 ? (
                <ul className="mt-[40px] border-t border-solid border-border-color pt-24">
                  <p className="text-base mb-[12px]">Đánh giá của khách hàng: </p>
                  {compoundingCar.rating_ids.map((item) => (
                    <li key={item.rating_id}>
                      <RatingItem rating={item} car_account_type="car_driver" />
                    </li>
                  ))}
                </ul>
              ) : null}

              {compoundingCar.state === "waiting_deposit" || compoundingCar.state === "waiting" ? (
                <div className="">
                  <button
                    onClick={() => handleConfirmCheckout(compoundingCar.compounding_car_id)}
                    className="btn-primary"
                  >
                    Nhận chuyến đi
                  </button>
                </div>
              ) : null}
            </>
          ) : null}
        </div>
      </BookingLayout>

      <Alert
        show={!!(showAlert && compoundingCar?.compounding_car_id)}
        type="warning"
        desc="Bạn có chắc chắn muốn hủy giao dịch này?"
        onClose={() => setShowAlert(undefined)}
        onConfirm={() =>
          compoundingCar?.compounding_car_id &&
          showAlert &&
          cancelDepositCompoundingCarDriver(showAlert, () => {
            setShowAlert(undefined)
            setShowModal(false)
            setDepositFailure(undefined)
            router.push(`/d/rides/checkout?compounding_car_id=${compoundingCar.compounding_car_id}`)
          })
        }
      />

      <Modal
        show={showModal && !!depositFailure}
        onClose={() => setShowModal(false)}
        heading="Cảnh báo"
      >
        <div className="p-24 w-full h-full flex flex-col">
          <div className="mb-[40px]">
            <WarningIcon className="mx-auto mb-[24px]" />
            <h3 className="text-base mb-[24px] text-center">{depositFailure?.message}</h3>
          </div>

          {depositFailure && depositFailure.data?.length > 0 ? (
            <ul className="flex-1 overflow-y-auto">
              {depositFailure?.data.map((item, index) => (
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

      <Alert
        show={showAlertAccount}
        onClose={() => setShowAlertAccount(false)}
        onConfirm={() => {
          setShowAlertAccount(false)
          router.push("/d/register")
        }}
        desc="Tài khoản của bạn chưa được kích hoạt, vui lòng nhập đầy đủ thông tin đăng ký tài xế để Exxe xét duyệt hồ sơ"
        type="warning"
      />
    </>
  )
}

ConfirmBookingCustomer.Layout = DriverLayout
export default ConfirmBookingCustomer
