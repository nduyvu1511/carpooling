import {
  InfoIcon,
  MultiUserIcon,
  RideCancelIcon,
  RideDoneIcon,
  RidePaidIcon,
  RidePickupIcon,
  RideWaitingIcon,
} from "@/assets"
import {
  Alert,
  ProgressBarMultiple,
  RideDetailLoading,
  RidePassengerItem,
  RideProgress,
  RideStatus,
  RideSummary,
  RideSummaryMobile,
  RideSummaryModal,
  RideToolTip,
  Seo,
} from "@/components"
import { RIDE_STATE_COLOR } from "@/helper"
import { useChatActions, useCompoundingCarProcess, useCurrentLocation } from "@/hooks"
import { BookingLayout, DriverLayout } from "@/layout"
import { chatAPI } from "@/services"
import Link from "next/link"
import { useRouter } from "next/router"
import { useMemo, useState } from "react"
import { LatLng } from "use-places-autocomplete"

const StartRunningCompoundingCar = () => {
  const router = useRouter()
  const { compounding_car_id } = router.query
  const { getCurrentLocation } = useCurrentLocation()
  const { createSingleChat } = useChatActions()
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
    getTotalPassenger,
    compoundingCarMap,
  } = useCompoundingCarProcess(Number(compounding_car_id))

  const [confirmDoneCompoundingCarModal, setConfirmDoneCompoundingCarModal] =
    useState<boolean>(false)

  const handleGenerateGoogleMapUrl = (params: LatLng) => {
    getCurrentLocation({
      params: { showLoading: true },
      onSuccess: ({ lat, lng }) =>
        window.open(
          `https://www.google.com/maps/dir/?api=1&origin=${lat},${lng}&destination=${params.lat},${params.lng}`,
          "_blank"
        ),
    })
  }

  const handleConfirmDoneCompoundingCar = () => {
    if (!compoundingCar?.compounding_car_id) return
    confirmDoneCompoundingCar({
      params: compoundingCar.compounding_car_id,
      onSuccess: () => {
        setConfirmDoneCompoundingCarModal(false)
        router.push(`/d/ride-detail/done/${compoundingCar.compounding_car_id}`)
        chatAPI.softDeleteRoomByCompoundingCarId(compoundingCar.compounding_car_id)
      },
    })
  }

  const statusList = useMemo(() => {
    return [
      [
        "Chưa đón",
        "#FFD8D6",
        getNumberOfNotPickedUp,
        <RideWaitingIcon className="text-gray-color-7" key={1} />,
      ],
      ["Đã đón", "#DAE2FD", getNumberOfPassengersPickedUp, <RidePickupIcon key={2} />],
      ["Đã trả", "#FFE9CD", getNumberOfPassengersDone, <RideDoneIcon key={3} />],
      ["Đã thanh toán", "#DBFFEA", getNumberOfPassengersPaid, <RidePaidIcon key={4} />],
      [
        "Đã hủy",
        "#FFD8D6",
        getNumberOfPassengersCanceled,
        <RideCancelIcon className="text-error" key={5} />,
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
        key: "confirm_paid",
        color: RIDE_STATE_COLOR["confirm_paid"],
        number: getNumberOfPassengersPaid,
        label: "Đã thanh toán",
      },
      {
        order: 3,
        key: "done",
        color: RIDE_STATE_COLOR["done"],
        number: getNumberOfPassengersDone,
        label: "Đã trả khách",
      },
      {
        order: 2,
        key: "pickedUp",
        color: RIDE_STATE_COLOR["in_process"],
        number: getNumberOfPassengersPickedUp,
        label: "Đã đón khách",
      },
      {
        order: 1,
        key: "cancel",
        color: RIDE_STATE_COLOR["cancel"],
        number: getNumberOfPassengersCanceled,
        label: "Đã hủy",
      },
    ]
  }, [
    getNumberOfPassengersDone,
    getNumberOfPassengersPaid,
    getNumberOfPassengersPickedUp,
    getNumberOfPassengersCanceled,
  ])

  return (
    <section className="in_process-page">
      <Seo
        description="Bắt đầu chuyến đi"
        thumbnailUrl=""
        title="Bắt đầu chuyến đi"
        url={`d/ride-detail/in-process/${compoundingCar?.compounding_car_id}`}
      />
      <BookingLayout
        overflowHidden={false}
        showLoading={isInitialLoading}
        topNode={<RideProgress state={compoundingCar?.state} />}
        title={`${compoundingCar?.state === "done" ? "Hoàn thành chuyến đi" : "Bắt đầu chuyến đi"}`}
        stickyRight
        rightNode={compoundingCarMap ? <RideSummary data={compoundingCarMap} /> : null}
      >
        {isInitialLoading ? (
          <RideDetailLoading />
        ) : compoundingCar?.state !== "start_running" &&
          compoundingCar?.state !== "confirm_deposit" &&
          compoundingCar?.state !== "confirm" &&
          compoundingCar?.state !== "stop_picking" &&
          compoundingCar?.state !== "done" ? (
          <div className="flex-center text-base rounded-[5px] mx-auto my-24 p-12 bg-bg-primary w-fit text-xs">
            <InfoIcon className="w-[18px] h-[18px]" />
            <p className="flex-1 ml-12 text-sm">Chuyến đi chưa được bắt đầu</p>
          </div>
        ) : compoundingCar.state === "done" ? (
          <div className="py-[20px]">
            <p className="text-sm md:text-base text-center">
              Chuyến đi đã hoàn thành, chi tiết trong{" "}
              <Link href="/d/account/activities">
                <a href="" className="text-primary font-semibold">
                  Hoạt động
                </a>
              </Link>
            </p>
          </div>
        ) : (
          <>
            <RideToolTip
              className="mb-24"
              title="Bạn sẽ được hoàn trả số tiền còn lại vào ví sau khi hoàn tất chuyến đi."
            />
            <div className="flex items-center justify-between">
              <p className="text-16 font-semibold uppercase">Trạng thái chuyến đi</p>
              {compoundingCar.compounding_type === "compounding" ? (
                <p className="flex items-center">
                  <span className="mr-[4px] sm:mr-[8px] flex items-center">
                    <MultiUserIcon className="sm:hidden" />
                    <span className="ml-[4px] text-xs hidden sm:block">Tổng số khách:</span>{" "}
                  </span>
                  <span className="font-semibold">
                    {getTotalPassenger}/{compoundingCar?.car.number_seat}
                  </span>
                </p>
              ) : null}
            </div>

            <div className="pt-12 md:pt-16 md:pb-12 sticky top-[56px] lg:top-[80px] bg-white-color z-10 mb-12 md:mb-[28px]">
              <ProgressBarMultiple
                height={7}
                type="dashed"
                progressList={progressList}
                totalNumber={getTotalPassenger}
              />

              <div className="flex items-center flex-nowrap mt-12 md:mt-16 overflow-x-auto w-full scrollbar-hide lg:scrollbar-default">
                {statusList.map(([label, backgroundColor, number, icon]) => (
                  <RideStatus
                    className="shrink-0"
                    key={label + ""}
                    backgroundColor={backgroundColor + ""}
                    icon={icon}
                    label={label + ""}
                    number={+number}
                  />
                ))}
              </div>
            </div>

            <div className="">
              {compoundingCar?.state === "confirm_deposit" ||
              compoundingCar?.state === "start_running" ||
              compoundingCar?.state === "stop_picking" ||
              compoundingCar?.state === "confirm" ? (
                <>
                  {getNumberOfPassengersPaid ===
                  getTotalPassenger - getNumberOfPassengersCanceled ? (
                    <div className="lg:border-b border-solid border-border-color flex-center p-custom lg:p-0 lg:mb-24 lg:pb-24 md:mx-16 lg:mx-0 fixed bottom-0 left-0 right-0 bg-white-color lg:static lg:bg-[transparent] z-[1000] lg:mt-[-24px] lg:pt-0">
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
                          startRunningCompoundingCar({
                            params: compoundingCar.compounding_car_id,
                            onSuccess: () => {},
                          })
                        }
                        className="btn-primary"
                      >
                        Bắt đầu chuyến đi
                      </button>
                    </div>
                  ) : null}
                </>
              ) : null}

              <div className="mb-24 md:mb-40">
                <p className="text-base font-semibold uppercase mb-16">Danh sách hành khách</p>
                <ul
                  className={`${
                    compoundingCar?.state !== "start_running" &&
                    compoundingCar?.state !== "stop_picking"
                      ? "opacity-[50%] pointer-events-none select-none"
                      : ""
                  }`}
                >
                  {getTotalPassenger > 0 &&
                    compoundingCar.compounding_car_customers.map((item, index) => (
                      <li
                        key={item.compounding_car_customer_id}
                        className="border-b border-solid border-border-color py-16 md:py-24 first:pt-0 last:border-none"
                      >
                        <RidePassengerItem
                          onChat={(partner_id) =>
                            createSingleChat({
                              params: { partner_id, compounding_car_id: item.compounding_car_id },
                              onSuccess: () => {},
                            })
                          }
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
                          data={item}
                          onClickWaiting={() =>
                            confirmWaitingForCompoundingCarCustomer({
                              params: {
                                compounding_car_customer_id: item.compounding_car_customer_id,
                                customer_id: item.partner.partner_id,
                              },
                              onSuccess: () => {},
                            })
                          }
                          onClickPickUp={() =>
                            confirmStateCompoundingCarCustomer({
                              params: {
                                compounding_car_customer_id: item.compounding_car_customer_id,
                                customer_id: item.partner.partner_id,
                                state: "in_process",
                              },
                              onSuccess: () => {},
                            })
                          }
                          onClickPaid={() => {
                            confirmCustomerPayFullForCompoundingCar({
                              params: item.compounding_car_customer_id,
                              onSuccess: () => {},
                            })
                          }}
                          onClickConfirm={() =>
                            confirmStateCompoundingCarCustomer({
                              params: {
                                compounding_car_customer_id: item.compounding_car_customer_id,
                                customer_id: item.partner.partner_id,
                                state: "done",
                              },
                              onSuccess: () => {},
                            })
                          }
                          onCancelWaiting={() => mutateCompoundingCar()}
                        />
                      </li>
                    ))}
                </ul>
              </div>

              <RideSummaryMobile className="lg:hidden" rides={compoundingCar} />
            </div>
          </>
        )}
        {compoundingCarMap ? <RideSummaryModal data={compoundingCarMap} /> : null}
      </BookingLayout>

      {confirmDoneCompoundingCarModal ? (
        <Alert
          show={!!confirmDoneCompoundingCarModal}
          title="Hãy chắc chắn tất cả khách hàng đã thanh toán tiền cho bạn"
          onClose={() => setConfirmDoneCompoundingCarModal(false)}
          onConfirm={() => handleConfirmDoneCompoundingCar()}
          type="info"
        />
      ) : null}
    </section>
  )
}

StartRunningCompoundingCar.Layout = DriverLayout
export default StartRunningCompoundingCar
