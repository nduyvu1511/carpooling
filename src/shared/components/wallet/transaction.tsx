import { formatMoneyVND } from "@/helper"
import { RechargeRequestFormParams, WithdrawFormParams } from "@/models"
import { useState } from "react"
import { ReChargeMoneyForm, WithdrawForm } from "../form"

import { Tabs } from "../tabs"

interface TransactionProps {
  accountBalance: number
  onRechargeFormSubmit?: (_: RechargeRequestFormParams) => void
  onWithdrawFormSubmit?: (_: WithdrawFormParams) => void
}

type Type = "deposit" | "withdraw"

export const Transaction = ({
  accountBalance,
  onRechargeFormSubmit,
  onWithdrawFormSubmit,
}: TransactionProps) => {
  const [type, setType] = useState<Type>("deposit")

  return (
    <>
      <div className="flex-1 flex flex-col">
        <div className="">
          <Tabs
            list={[
              { label: "Nạp tiền", value: "deposit" },
              { label: "Rút tiền", value: "withdraw" },
            ]}
            tabActive={type}
            type="full"
            onChange={(val) => setType(val as Type)}
            labelClassName="font-semibold md:font-semibold py-12 md:py-12"
          />
        </div>

        <div className="flex-1 flex-col flex p-12 md:p-24">
          <div className="mb-24">
            <div className="flex items-center justify-between">
              <p className="text-base font-semibold w-[200px] mr-24 uppercase">Số dư khả dụng</p>
              <p className="text-24 font-medium text-primary">{formatMoneyVND(accountBalance)}</p>
            </div>
          </div>

          {type === "deposit" ? (
            <ReChargeMoneyForm onSubmit={(data) => onRechargeFormSubmit?.(data)} />
          ) : (
            <WithdrawForm onSubmit={(data) => onWithdrawFormSubmit?.(data)} />
          )}
        </div>
      </div>
    </>
  )
}
