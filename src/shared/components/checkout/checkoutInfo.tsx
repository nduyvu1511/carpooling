import { formatMoneyVND } from "@/helper"
import { CarAccountType, IDepositSummaryOptional } from "@/models"
import { Countdown } from "../common"
import { SummaryItem } from "../summary"

interface DepositSummaryProps {
  secondsRemains: number
  type?: "deposit" | "checkout"
  onExpiredCountdown: Function
  accountType?: CarAccountType
  data: IDepositSummaryOptional
  showCountdown?: boolean
}

export const CheckoutInfo = ({
  secondsRemains,
  type,
  onExpiredCountdown,
  accountType,
  data,
  showCountdown,
}: DepositSummaryProps) => {
  return (
    <>
      <div className="flex items-center mb-16 md:mb-24  justify-between">
        <p className="text-base font-semibold uppercase">Hóa đơn</p>

        {showCountdown && type === "deposit" ? (
          <div className="flex items-center">
            <span className="mr-8 text-xs sm:text-sm text-error sm:text-error">
              Thời hạn giữ vé
            </span>
            <Countdown
              className="bg-bg-error-2 text-14 font-semibold text-error rounded-[5px] w-[56px] py-4 h-[28px] px-8"
              onExpiredCoundown={onExpiredCountdown}
              secondsRemains={secondsRemains}
            />
          </div>
        ) : null}
      </div>

      {accountType === "customer" ? (
        <p className="text-xs mb-12">
          (*) Chi phí trên chưa bao gồm phát sinh phí cầu đường, bến bãi.
        </p>
      ) : null}

      {data?.amount_undiscounted ? (
        <div className="flex items-center justify-between mb-12">
          <span className="mr-[12px] text-xs">Chi phí tạm tính</span>
          <span className="text-sm md:text-base whitespace-nowrap">
            {formatMoneyVND(data?.amount_undiscounted)}
          </span>
        </div>
      ) : null}

      {data?.discount_after_tax ? (
        <div className="flex items-center justify-between mb-12">
          <span className="mr-[12px] text-xs">Khuyến mãi</span>
          <span className="text-sm md:text-base text-error md:text-error">
            {formatMoneyVND(data?.discount_after_tax)}
          </span>
        </div>
      ) : null}

      {accountType === "customer" ? (
        <>
          <SummaryItem
            label="Tổng tiền cần thanh toán"
            value={formatMoneyVND(data.amount_total || 0) + ""}
          />

          {data?.amount_due ? (
            <SummaryItem label="Số tiền thanh toán sau" value={formatMoneyVND(data?.amount_due)} />
          ) : null}
        </>
      ) : null}

      {type === "checkout" ? (
        <SummaryItem
          labelClassName="text-base font-semibold"
          label="Số tiền cần thanh toán"
          valueClassName="text-14 md:text-16 font-semibold"
          value={formatMoneyVND(data?.amount_due || 0)}
        />
      ) : (
        <SummaryItem
          labelClassName="text-base font-semibold"
          label={`Số tiền đặt cọc (${Number((data?.down_payment?.percent || 0) * 100)}%)`}
          valueClassName="text-14 md:text-16 font-semibold"
          value={formatMoneyVND(data?.down_payment?.total || 0)}
        />
      )}

      {accountType === "car_driver" ? (
        <SummaryItem label="Giá trị chuyến đi" value={formatMoneyVND(data.amount_total || 0)} />
      ) : null}
    </>
  )
}
