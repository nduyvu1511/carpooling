import {
  Alert,
  ProgressBarMultiple,
  RidesDetailLoading,
  RidesPassengerItem,
  RidesProgress,
  RidesSummaryLoading,
  ScheduleSummary,
} from "@/components"
import { useCompoundingCarProcess, useCurrentLocation, useEffectOnce } from "@/hooks"
import { BookingLayout, DriverLayout } from "@/layout"
import { useRouter } from "next/router"
import { useState } from "react"
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
    }
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
        router.push("/d")
      }, 100)
    })
  }

  return (
    <>
      <BookingLayout
        topNode={<RidesProgress state={compoundingCar?.state} />}
        title="Tình trạng chuyến đi"
        stickyRight
        rightNode={
          isInitialLoading ? (
            <RidesSummaryLoading />
          ) : !compoundingCar?.compounding_car_id ? null : (
            <ScheduleSummary
              number_seat={compoundingCar.car.number_seat}
              number_seat_in_car={compoundingCar.number_seat_in_car}
              distance={compoundingCar.distance}
              duration={compoundingCar.duration || 0}
              expected_going_on_date={compoundingCar.expected_going_on_date}
              expected_picking_up_date={compoundingCar.expected_picking_up_date}
              from_province_name={compoundingCar.from_province.province_brief_name}
              compounding_type={compoundingCar.compounding_type}
              to_province_name={compoundingCar.to_province.province_brief_name}
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
            />
          )
        }
      >
        {isInitialLoading ? (
          <div className="p-24 pt-0">
            <RidesDetailLoading />
          </div>
        ) : compoundingCar?.state !== "start_running" &&
          compoundingCar?.state !== "confirm_deposit" &&
          compoundingCar?.state !== "done" ? (
          <div className="flex-center p-[40px] text-base">Chuyến đi chưa được bắt đầu</div>
        ) : (
          <div className="p-24 pt-0 block-element">
            <div className="py-24 sticky top-[80px] bg-white-color z-10 border-b border-solid border-border-color">
              <div className="flex items-center justify-between mb-[8px]"></div>

              <div className="">
                <ul className="flex items-center flex-wrap mb-[16px]">
                  <span className="text-xs mr-24">Trạng thái chuyến đi:</span>
                  {[
                    ["Chưa đón", "#f0f0f0", getNumberOfNotPickedUp],
                    ["Đã đón", "#2E4CB7", getNumberOfPassengersPickedUp],
                    ["Đã trả", "#EE542F", getNumberOfPassengersDone],
                    ["Đã thanh toán", "#118A33", getNumberOfPassengersPaid],
                    ["Đã hủy", "#FF3B30", getNumberOfPassengersCanceled],
                    ["Tổng số khách", "", compoundingCar.compounding_car_customers?.length || 0],
                  ].map(([label, backgroundColor, number]) =>
                    number ? (
                      <li key={backgroundColor} className="flex items-center mr-[12px] last:mr-0">
                        {backgroundColor ? (
                          <span
                            className="w-[12px] h-[12px] mr-[8px] rounded-[2px]"
                            style={{ backgroundColor: backgroundColor + "" }}
                          ></span>
                        ) : null}
                        <span className={`text-xs ${!backgroundColor ? "font-semibold" : ""}`}>
                          {label}: {number}
                        </span>
                      </li>
                    ) : null
                  )}
                </ul>

                <ProgressBarMultiple
                  progressList={[
                    {
                      order: 3,
                      key: "paid",
                      color: "#118A33",
                      number: getNumberOfPassengersPaid,
                      label: "Đã thanh toán",
                    },
                    {
                      order: 2,
                      key: "done",
                      color: "#EE542F",
                      number: getNumberOfPassengersDone,
                      label: "Đã trả khách",
                    },
                    {
                      order: 1,
                      key: "pickedUp",
                      color: "#2E4CB7",
                      number: getNumberOfPassengersPickedUp,
                      label: "Đã đón khách",
                    },
                  ]}
                  totalNumber={compoundingCar?.compounding_car_customers?.length || 0}
                />
              </div>

              {compoundingCar?.state === "confirm_deposit" ||
              compoundingCar?.state === "start_running" ? (
                <>
                  {getNumberOfPassengersPaid ===
                  compoundingCar?.compounding_car_customers.length -
                    getNumberOfPassengersCanceled ? (
                    <div className="pt-24 flex-center">
                      <button
                        onClick={() => setConfirmDoneCompoundingCarModal(true)}
                        className="btn-primary bg-success hover:bg-success"
                      >
                        Kết thúc chuyến đi
                      </button>
                    </div>
                  ) : compoundingCar.state === "confirm_deposit" ? (
                    <div className="pt-24 flex-center">
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
            </div>

            <ul
              className={`${
                compoundingCar?.state !== "start_running" && compoundingCar?.state !== "done"
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
                    <RidesPassengerItem
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
        )}
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
