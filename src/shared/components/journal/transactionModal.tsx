import { useState } from "react"
import { WithdrawForm } from "../form"
import { DepositForm } from "../form/wallet/depositForm"
import { Modal } from "../modal"
import { Tabs } from "../tabs"

interface TransactionModalProps {
  show?: boolean
  onClose: Function
  accountBalance: number
}

type Type = "deposit" | "withdraw"

export const TransactionModal = ({ show, onClose, accountBalance }: TransactionModalProps) => {
  const [type, setType] = useState<Type>("deposit")

  return (
    <Modal key="withdraw-modal" show={show} onClose={() => onClose()} heading="Giao dịch">
      <div className="py-">
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
        {type === "deposit" ? (
          <DepositForm
            accountBalance={accountBalance}
            //   onSubmit={(val) => handleMakeWithdrawRequest(val)}
          />
        ) : (
          <WithdrawForm
            accountBalance={accountBalance}
            //   onSubmit={(val) => handleMakeWithdrawRequest(val)}
          />
        )}
      </div>
    </Modal>
  )
}
