import React from "react"
import { TransactionForm } from "./transactionForm"

interface DepositFormProps {
  accountBalance: number
}

export const DepositForm = ({ accountBalance }: DepositFormProps) => {
  return (
    <div className="flex-1 flex-col flex">
      <TransactionForm
        onSubmit={(data) => console.log(data)}
        accountBalance={accountBalance}
        label="Số tiền muốn rút"
      />
    </div>
  )
}
