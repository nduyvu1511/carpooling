import { formatMoneyVND } from "@/helper"
import React from "react"
import { Countdown } from "../countdown"
import { SummaryItem } from "./summaryItem"

interface DepositSummaryProps {
  secondsRemains: number
  amount_total?: number
  down_payment: number
  amount_due?: number
  percentage?: number
  showCountdown?: boolean
  type?: "deposit" | "checkout"
  onExpiredCountdown: Function
}

export const DepositSummary = ({
  down_payment,
  secondsRemains,
  amount_due,
  amount_total,
  percentage,
  showCountdown,
  type,
  onExpiredCountdown,
}: DepositSummaryProps) => {
  return (
    <>
      <div className="flex items-center mb-16 md:mb-24  justify-between">
        <p className="text-base font-semibold uppercase">Hóa đơn</p>

        {showCountdown ? (
          <div className="flex items-center">
            <span className="mr-8 text-xs sm:text-sm text-error sm:text-error">
              Thời hạn giữ vé
            </span>
            <Countdown
              className="bg-bg-error-2 text-14 font-semibold text-error rounded-[5px] whitespace-nowrap w-[56px] py-4 h-[28px] px-8"
              onExpiredCoundown={onExpiredCountdown}
              secondsRemains={secondsRemains}
            />
          </div>
        ) : null}
      </div>

      <p className="text-xs mb-12">
        (*) Chi phí trên chưa bao gồm phát sinh phí cầu đường, bến bãi.
      </p>

      {amount_total ? (
        <div className="flex items-center justify-between mb-12">
          <span className="mr-[12px] text-xs">Chi phí tạm tính</span>
          <span className="text-sm md:text-base whitespace-nowrap">
            {formatMoneyVND(amount_total)}
          </span>
        </div>
      ) : null}

      <SummaryItem
        label="Tổng tiền cần thanh toán"
        value={formatMoneyVND(amount_total || 0) + ""}
      />

      {amount_due ? (
        <SummaryItem label="Số tiền thanh toán sau" value={formatMoneyVND(amount_due)} />
      ) : null}

      {down_payment ? (
        <SummaryItem
          labelClassName="text-base font-semibold"
          label={
            type === "checkout"
              ? "Số tiền cần thanh toán"
              : `Số tiền đặt cọc (${Number(percentage)}%)`
          }
          valueClassName="text-14 md:text-16 whitespace-nowrap font-semibold"
          value={formatMoneyVND(down_payment)}
        />
      ) : null}
    </>
  )
}
