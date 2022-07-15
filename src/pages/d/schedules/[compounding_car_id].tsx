import { Alert, ItemSelect, ProgressBar, RidesPassengerItem, ScheduleSummary } from "@/components"
import { useCompoundingCarProcess, useCurrentLocation } from "@/hooks"
import { BookingLayout, DriverLayout } from "@/layout"
import { useRouter } from "next/router"
import { useState } from "react"
import { LatLng } from "use-places-autocomplete"

const ScheduleCompounding = () => {
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
  } = useCompoundingCarProcess(Number(compounding_car_id))

  const [showAlert, setShowAlert] = useState<boolean>(false)

  const handleGenerateGoogleMapUrl = (params: LatLng) => {
    getCurrentLocation(({ lat, lng }) =>
      window.open(
        `https://www.google.com/maps/dir/?api=1&origin=${lat},${lng}&destination=${params.lat},${params.lng}`,
        "_blank"
      )
    )
  }

  const handleConfirmPickedUpPassenger = (
    compounding_car_customer_id: number,
    customer_id: number
  ) => {
    if (!compounding_car_id) return
    confirmStateCompoundingCarCustomer(
      { compounding_car_customer_id, customer_id, state: "in_process" },
      () => {}
    )
  }

  if (!compoundingCar) return null
  return (
    <>
      <BookingLayout
        title="Tình trạng chuyến đi"
        rightNode={
          compoundingCar ? (
            <ScheduleSummary
              distance={compoundingCar.distance}
              duration={compoundingCar.duration || 0}
              expected_going_on_date={compoundingCar.expected_going_on_date}
              expected_picking_up_date={compoundingCar.expected_picking_up_date}
              from_province_name={compoundingCar.from_province.province_brief_name}
              compounding_type={compoundingCar.compounding_type}
              to_province_name={compoundingCar.to_province.province_brief_name}
            />
          ) : null
        }
      >
        <div className="p-24 pt-0 block-element">
          <div className="mb-24 border-b border-solid border-border-color"></div>

          <div className="flex items-center justify-between mb-24">
            <span className="text-xs">Trạng thái</span>
            <span className="text-base text-success">Đang đón khách</span>
          </div>

          <div className="mb-24">
            <ProgressBar
              label="Số khách đã đón"
              progressNumber={getNumberOfPassengersPickedUp}
              totalProgressNumber={compoundingCar.compounding_car_customers.length}
            />
          </div>

          <ul>
            {compoundingCar.compounding_car_customers?.length > 0 &&
              compoundingCar.compounding_car_customers.map(
                (item, index) =>
                  item.state !== "done" && (
                    <li
                      key={index}
                      className="border border-solid border-border-color block-element rounded-[20px] mb-24 last:mb-0"
                    >
                      <RidesPassengerItem
                        onClickViewMap={() =>
                          handleGenerateGoogleMapUrl({
                            lat: +item.from_latitude,
                            lng: +item.from_longitude,
                          })
                        }
                        rides={item}
                        onClickCancel={() => setShowAlert(true)}
                        onClickPickUp={() =>
                          handleConfirmPickedUpPassenger(
                            item.compounding_car_customer_id,
                            item.partner.partner_id
                          )
                        }
                      />
                    </li>
                  )
              )}
          </ul>
        </div>
      </BookingLayout>

      {showAlert ? (
        <Alert
          desc="Vui lòng chọn lý do huỷ chuyến, sau khi xác nhận ..."
          type="warning"
          rightBtnLabel="Hủy chuyến"
          onClose={() => setShowAlert(false)}
          onConfirm={() => {}}
          disabledBtn={true}
        >
          <ul>
            <li className="mb-[16px]">
              <ItemSelect title="Khách yêu cầu huỷ chuyến" />
            </li>
            <li className="mb-[16px]">
              <ItemSelect title="Khách yêu cầu huỷ chuyến" />
            </li>
            <li className="mb-[16px]">
              <ItemSelect title="Khách yêu cầu huỷ chuyến" />
            </li>
          </ul>
        </Alert>
      ) : null}
    </>
  )
}

ScheduleCompounding.Layout = DriverLayout
export default ScheduleCompounding
