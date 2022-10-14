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

          {compoundingCar?.cancel_reason_id?.cancel_reason_id ||
          compoundingCar?.cancel_reason_other ? (
            <div className="mb-24">
              <p className="text-base font-semibold mb-16 uppercase">Thông tin hủy chuyến</p>
              {compoundingCar?.cancel_reason_id?.reason ? (
                <p className="text-sm text-gray-color-7">
                  {compoundingCar?.cancel_reason_id?.reason}
                </p>
              ) : null}
              {compoundingCar?.cancel_reason_other ? (
                <p className="text-sm text-gray-color-7 mt-12">
                  {compoundingCar?.cancel_reason_other}
                </p>
              ) : null}
            </div>
          ) : null}

          <ul className="mb-24">
            <p className="text-base font-semibold mb-16 uppercase">Chi phí chuyến đi</p>
            {(compoundingCar as CompoundingCancelCar)?.amount_undiscounted ? (
              <SummaryItem
                label="Chi phí tạm tính"
                value={formatMoneyVND(
                  (compoundingCar as CompoundingCancelCar).amount_undiscounted || 0
                )}
              />
            ) : null}
            {compoundingCar?.amount_return ? (
              <SummaryItem
                label="Tổng tiền cần thanh toán"
                value={formatMoneyVND((compoundingCar as CompoundingCancelCar)?.amount_total)}
              />
            ) : null}
            {compoundingCar?.down_payment ? (
              <SummaryItem
                label={`Số tiền đặt cọc 
                ${
                  (compoundingCar as CompoundingCancelCar)?.down_payment?.percent
                    ? `(${(compoundingCar as CompoundingCancelCar)?.down_payment?.percent * 100}%)`
                    : ""
                }`}
                value={formatMoneyVND(
                  (compoundingCar as CompoundingCancelCar)?.down_payment?.total ||
                    (compoundingCar as any)?.down_payment
                )}
              />
            ) : null}
            {(compoundingCar as CompoundingCancelCar)?.payment_method ? (
              <SummaryItem
                label="Phương thức đặt cọc"
                value={(compoundingCar as CompoundingCancelCar)?.payment_method}
              />
            ) : null}
            {(compoundingCar as CompoundingCancelCar)?.cancel_date ? (
              <SummaryItem
                label="Ngày hủy chuyến"
                value={moment((compoundingCar as CompoundingCancelCar)?.cancel_date).format(
                  "HH:mm DD/MM/YYYY"
                )}
              />
            ) : null}
            {(compoundingCar as CompoundingCancelCar)?.paid_date ? (
              <SummaryItem
                label="Thời gian đặt cọc"
                value={moment((compoundingCar as CompoundingCancelCar)?.paid_date).format(
                  "HH:mm DD/MM/YYYY"
                )}
              />
            ) : null}
            {compoundingCar?.amount_return ? (
              <SummaryItem
                className="mb-0"
                labelClassName="text-14 md:text-16 font-semibold"
                label="Số tiền được hoàn trả"
                value={formatMoneyVND(compoundingCar?.amount_return)}
                valueClassName="text-14 md:text-16 font-semibold"
              />
            ) : null}
          </ul>

          {moment((compoundingCar as CompoundingCancelCar)?.cancel_date)
            .add(3, "hours")
            .isBefore(moment(compoundingCar.expected_going_on_date)) ? (
            <Snackbar title="Số tiền đặt cọc sẽ được hoàn về ví của khách hàng trong 24 giờ làm việc." />
          ) : null}
        </div>
      ) : null}

      {compoundingCar ? <RideSummaryModal data={compoundingCar} /> : null}
    </>
  )
}

export { RideCanceled }
