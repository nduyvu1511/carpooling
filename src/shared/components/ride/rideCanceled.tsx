import { formatMoneyVND } from "@/helper"
import { CompoundingCancelCar, CompoundingCarCustomer, CompoundingCarRes } from "@/models"
import moment from "moment"
import { Snackbar } from "../common"
import { RideCancelLoading } from "../loading"
import { RideSummaryMobile, RideSummaryModal, SummaryItem } from "../summary"

interface RideCanceledProps {
  showLoading?: boolean
  compoundingCar?: CompoundingCarRes | CompoundingCarCustomer
}

const RideCanceled = ({ compoundingCar, showLoading }: RideCanceledProps) => {
  return (
    <>
      {showLoading ? (
        <RideCancelLoading />
      ) : compoundingCar?.compounding_car_id ? (
        <div className="">
          <RideSummaryMobile className="lg:hidden mb-24" rides={compoundingCar} />
          {compoundingCar?.cancel_reason?.cancel_reason_id ? (
            <div className="mb-24">
              <p className="text-base font-semibold mb-16 uppercase">Thông tin hủy chuyến</p>
              <p className="text-sm text-gray-color-7">{compoundingCar?.cancel_reason?.reason}</p>
            </div>
          ) : null}

          <ul className="mb-24">
            <p className="text-base font-semibold mb-16 uppercase">Chi phí chuyến đi</p>
            <SummaryItem
              label="Chi phí tạm tính"
              value={formatMoneyVND((compoundingCar as CompoundingCancelCar)?.amount_total)}
            />
            <SummaryItem
              label="Tổng tiền cần thanh toán"
              value={formatMoneyVND((compoundingCar as CompoundingCancelCar)?.amount_total)}
            />
            <SummaryItem
              label={`Số tiền đặt cọc (
                ${(compoundingCar as CompoundingCancelCar)?.down_payment?.percent * 100}%)`}
              value={formatMoneyVND((compoundingCar as CompoundingCancelCar)?.down_payment?.total)}
            />
            {(compoundingCar as CompoundingCancelCar)?.payment_method ? (
              <SummaryItem
                label="Phương thức đặt cọc"
                value={(compoundingCar as CompoundingCancelCar)?.payment_method}
              />
            ) : null}
            <SummaryItem
              label="Ngày hủy chuyến"
              value={moment((compoundingCar as CompoundingCancelCar)?.cancel_date).format(
                "HH:mm DD/MM/YYYY"
              )}
            />
            {(compoundingCar as CompoundingCancelCar)?.paid_date ? (
              <SummaryItem
                label="Thời gian đặt cọc"
                value={moment((compoundingCar as CompoundingCancelCar)?.paid_date).format(
                  "HH:mm DD/MM/YYYY"
                )}
              />
            ) : null}
            <SummaryItem
              className="mb-0"
              labelClassName="text-14 md:text-16 font-semibold"
              label="Số tiền được hoàn trả"
              value={formatMoneyVND(
                compoundingCar?.amount_return ||
                  (compoundingCar as CompoundingCarCustomer)?.amount_total
              )}
              valueClassName="text-14 md:text-16 font-semibold"
            />
          </ul>

          {moment((compoundingCar as CompoundingCancelCar)?.cancel_date)
            .add(3, "hours")
            .isBefore(moment(compoundingCar.expected_going_on_date)) ? (
            <Snackbar title="Số tiền đặt cọc sẽ được hoàn về ví của hành khách trong 24 giờ làm việc." />
          ) : null}
        </div>
      ) : null}

      {compoundingCar ? <RideSummaryModal data={compoundingCar} /> : null}
    </>
  )
}

export { RideCanceled }
