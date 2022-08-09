import {
  CheckIcon,
  CloseIcon,
  InfoIcon,
  LocationIcon2,
  LocationIcon3,
  LocationIcon4,
  MultiUserIcon
} from "@/assets"
import {
  Alert,
  ProgressBarMultiple,
  RidePassengerItem,
  RideProgress,
  RidesDetailLoading,
  RideSummary,
  RideSummaryMobile,
  RideSummaryModal
} from "@/components"
import { toggleBodyOverflow } from "@/helper"
import { useBackRouter, useCompoundingCarProcess, useCurrentLocation, useEffectOnce } from "@/hooks"
import { BookingLayout, DriverLayout } from "@/layout"
import { setShowSummaryDetail } from "@/modules"
import { useRouter } from "next/router"
import { useMemo, useState } from "react"
import { useDispatch } from "react-redux"
import { notify } from "reapop"
import { LatLng } from "use-places-autocomplete"

const ScheduleCompounding = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { compounding_car_id } = router.query
  const { getCurrentLocation } = useCurrentLocation({ showLoading: true })
  const {
    confirmDoneCompoundingCar,
    confirmStateCompoundingCarCustomer,
    startRunningCompoundingCar,
    compoundingCar,
    isInitialLoading,
    getNumberOfPassengersPickedUp,
    getNumberOfPassengersDone,
    getNumberOfPassengersPaid,
    confirmCustomerPayFullForCompoundingCar,
    confirmWaitingForCompoundingCarCustomer,
    mutateCompoundingCar,
    getNumberOfNotPickedUp,
    getNumberOfPassengersCanceled,
  } = useCompoundingCarProcess(Number(compounding_car_id))

  const [confirmDoneCompoundingCarModal, setConfirmDoneCompoundingCarModal] =
    useState<boolean>(false)

  useEffectOnce(() => {
    return () => {
      mutateCompoundingCar(undefined, false)
      dispatch(setShowSummaryDetail(false))
    }
  })

  useBackRouter({
    cb: () => {
      toggleBodyOverflow("unset")
    },
  })

  const handleGenerateGoogleMapUrl = (params: LatLng) => {
    getCurrentLocation(({ lat, lng }) =>
      window.open(
        `https://www.google.com/maps/dir/?api=1&origin=${lat},${lng}&destination=${params.lat},${params.lng}`,
        "_blank"
      )
    )
  }

  const handleConfirmDoneCompoundingCar = () => {
    if (!compoundingCar?.compounding_car_id) return
    confirmDoneCompoundingCar(compoundingCar.compounding_car_id, () => {
      setConfirmDoneCompoundingCarModal(false)
      setTimeout(() => {
        dispatch(notify("Hoàn thành chuyến đi thành công", "success"))
        router.push(`/d/ride-detail/done/${compoundingCar.compounding_car_id}`)
      }, 100)
    })
  }

  const statusList = useMemo(() => {
    return [
      [
        "Chưa đón",
        "#f0f0f0",
        getNumberOfNotPickedUp,
        <LocationIcon2 className="w-[11px] sm:w-[13px] text-gray-color-3" key={1} />,
      ],
      [
        "Đã đón",
        "#DAE2FD",
        getNumberOfPassengersPickedUp,
        <LocationIcon3 className="w-[11px] sm:w-[13px] text-primary" key={2} />,
      ],
      [
        "Đã trả",
        "#FFE9CD",
        getNumberOfPassengersDone,
        <LocationIcon4 className="w-[11px] sm:w-[13px] text-warning" key={3} />,
      ],
      [
        "Đã thanh toán",
        "#DBFFEA",
        getNumberOfPassengersPaid,
        <CheckIcon stroke="#10B981" className="w-[11px] sm:w-[13px]" key={4} />,
      ],
      [
        "Đã hủy",
        "#FFD8D6",
        getNumberOfPassengersCanceled,
        <CloseIcon className="w-[11px] sm:w-[13px] text-error" key={5} />,
      ],
    ]
  }, [
    getNumberOfNotPickedUp,
    getNumberOfPassengersCanceled,
    getNumberOfPassengersDone,
    getNumberOfPassengersPaid,
    getNumberOfPassengersPickedUp,
  ])

  const progressList = useMemo(() => {
    return [
      {
        order: 4,
        key: "paid",
        color: "#DBFFEA",
        number: getNumberOfPassengersPaid,
        label: "Đã thanh toán",
      },
      {
        order: 3,
        key: "done",
        color: "#FFE9CD",
        number: getNumberOfPassengersDone,
        label: "Đã trả khách",
      },
      {
        order: 2,
        key: "pickedUp",
        color: "#DAE2FD",
        number: getNumberOfPassengersPickedUp,
        label: "Đã đón khách",
      },
    ]
  }, [getNumberOfPassengersDone, getNumberOfPassengersPaid, getNumberOfPassengersPickedUp])

  return (
    <>
      <BookingLayout
        showLoading={isInitialLoading}
        topNode={
          <div className="lg:px-12 xl:px-0">
            <RideProgress state={compoundingCar?.state} />
          </div>
        }
        title="Bắt đầu chuyến đi"
        stickyRight
        rightNode={
          compoundingCar ? (
            <>
              <div className="hidden lg:block">
                <RideSummary data={compoundingCar} />
              </div>
            </>
          ) : null
        }
      >
        {isInitialLoading ? (
          <div className="p-12 md:p-24 pt-0">
            <RidesDetailLoading />
          </div>
        ) : compoundingCar?.state !== "start_running" &&
          compoundingCar?.state !== "confirm_deposit" &&
          compoundingCar?.state !== "confirm" &&
          compoundingCar?.state !== "stop_picking" &&
          compoundingCar?.state !== "done" ? (
          <div className="flex-center text-base rounded-[5px] mx-auto my-24 p-12 bg-bg-primary w-fit text-xs">
            <InfoIcon className="w-[18px] h-[18px]" />
            <p className="flex-1 ml-12 text-sm">Chuyến đi chưa được bắt đầu</p>
          </div>
        ) : (
          <>
            <div className="mt-12 px-12 md:px-24 pt-0 flex items-center justify-between">
              <p className="text-16 font-semibold uppercase md:font-medium md:normal-case">
                Trạng thái chuyến đi
              </p>
              {compoundingCar.compounding_type === "compounding" ? (
                <p className="flex items-center">
                  <span className="mr-[4px] sm:mr-[8px] flex items-center">
                    <MultiUserIcon />
                    <span className="ml-[4px] text-xs hidden sm:block">Tổng số khách:</span>{" "}
                  </span>
                  <span className="font-semibold">
                    {compoundingCar?.compounding_car_customers.length}/
                    {compoundingCar?.car.number_seat}
                  </span>
                </p>
              ) : null}
            </div>
            <div className="px-12 md:px-24 pt-12 md:pt-[16px] md:pb-12 sticky top-[56px] lg:top-[80px] bg-white-color z-10">
              <ProgressBarMultiple
                height={3}
                type="dashed"
                progressList={progressList}
                totalNumber={compoundingCar?.compounding_car_customers?.length || 0}
              />

              <ul className="flex items-center flex-wrap mt-12 md:mt-[16px]">
                {statusList.map(
                  ([label, backgroundColor, number, icon]) =>
                    number > 0 && (
                      <li
                        key={backgroundColor as string}
                        className="flex items-center mr-12 mb-12 last:mr-0"
                      >
                        <span
                          className="flex-center w-[18px] sm:w-[24px] h-[18px] sm:h-[24px] mr-[6px] rounded-[50%]"
                          style={{ backgroundColor: backgroundColor + "" }}
                        >
                          {icon}
                        </span>
                        <p className="">
                          <span className="text-[10px]">{label}:</span>{" "}
                          <span className="text-12 font-medium">{number}</span>
                        </p>
                      </li>
                    )
                )}
              </ul>
            </div>

            <div className="border-b border-solid border-border-color mx-12 md:mx-24 mb-24 lg:mb-0"></div>

            <div className="lg:hidden mx-12 mb-12 md:mb-0 md:mx-24 rounded-[5px] overflow-hidden mt-12">
              <RideSummaryMobile rides={compoundingCar} />
            </div>

            <div className="px-12 md:px-24 lg:py-24 pt-0 ">
              {compoundingCar?.state === "confirm_deposit" ||
              compoundingCar?.state === "start_running" ||
              compoundingCar?.state === "stop_picking" ||
              compoundingCar?.state === "confirm" ? (
                <>
                  {getNumberOfPassengersPaid ===
                  compoundingCar?.compounding_car_customers.length -
                    getNumberOfPassengersCanceled ? (
                    <div className="border-b border-solid border-border-color flex-center p-12 lg:pt-0 lg:pb-24 fixed bottom-0 left-0 right-0 bg-white-color lg:static lg:bg-[transparent] z-[1000]">
                      <button
                        onClick={() => setConfirmDoneCompoundingCarModal(true)}
                        className="btn-primary bg-success hover:bg-success"
                      >
                        Kết thúc chuyến đi
                      </button>
                    </div>
                  ) : compoundingCar.state === "confirm_deposit" ||
                    compoundingCar.state === "confirm" ? (
                    <div className="flex-center p-12 lg:pb-[36px] fixed bottom-0 left-0 right-0 bg-white-color lg:static lg:bg-[transparent] z-[1000]">
                      <button
                        onClick={() =>
                          startRunningCompoundingCar(compoundingCar.compounding_car_id)
                        }
                        className="btn-primary"
                      >
                        Bắt đầu chuyến đi
                      </button>
                    </div>
                  ) : null}
                </>
              ) : null}

              <div className="lg:hidden my-24 border-b lg:mx-12 border-solid border-border-color"></div>

              <div className="mb-0 md:mb-[64px] lg:mb-0">
                <p className="text-base font-semibold uppercase mb-12">Danh sách hành khách</p>

                <ul
                  className={`${
                    compoundingCar?.state !== "start_running" &&
                    compoundingCar?.state !== "done" &&
                    compoundingCar?.state !== "stop_picking"
                      ? "opacity-[50%] pointer-events-none select-none"
                      : ""
                  }`}
                >
                  {compoundingCar.compounding_car_customers?.length > 0 &&
                    compoundingCar.compounding_car_customers.map((item, index) => (
                      <li
                        key={index}
                        className="border-b border-solid border-border-color py-24 last:mb-0 last:border-none"
                      >
                        <RidePassengerItem
                          onClickViewMap={() =>
                            item.state === "in_process"
                              ? handleGenerateGoogleMapUrl({
                                  lat: +item.to_latitude,
                                  lng: +item.to_longitude,
                                })
                              : handleGenerateGoogleMapUrl({
                                  lat: +item.from_latitude,
                                  lng: +item.from_longitude,
                                })
                          }
                          rides={item}
                          onClickWaiting={() =>
                            confirmWaitingForCompoundingCarCustomer({
                              compounding_car_customer_id: item.compounding_car_customer_id,
                              customer_id: item.partner.partner_id,
                            })
                          }
                          onClickPickUp={() =>
                            confirmStateCompoundingCarCustomer({
                              compounding_car_customer_id: item.compounding_car_customer_id,
                              customer_id: item.partner.partner_id,
                              state: "in_process",
                            })
                          }
                          onClickPaid={() => {
                            confirmCustomerPayFullForCompoundingCar(
                              item.compounding_car_customer_id,
                              () => {
                                if (
                                  compoundingCar.compounding_car_customers?.length - 1 ===
                                  getNumberOfPassengersPaid
                                ) {
                                  handleConfirmDoneCompoundingCar()
                                }
                              }
                            )
                          }}
                          onClickConfirm={() =>
                            confirmStateCompoundingCarCustomer({
                              compounding_car_customer_id: item.compounding_car_customer_id,
                              customer_id: item.partner.partner_id,
                              state: "done",
                            })
                          }
                          onCancelWaiting={() => mutateCompoundingCar()}
                        />
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </>
        )}
        {compoundingCar ? <RideSummaryModal rides={compoundingCar} /> : null}
      </BookingLayout>

      <Alert
        show={!!confirmDoneCompoundingCarModal}
        desc="Hãy chắc chắn rằng bạn đã đưa khách đến tận nơi và khách hàng đã thanh toán tiền cho bạn!"
        onClose={() => setConfirmDoneCompoundingCarModal(false)}
        onConfirm={() => handleConfirmDoneCompoundingCar()}
        type="info"
      />
    </>
  )
}

ScheduleCompounding.Layout = DriverLayout
export default ScheduleCompounding
