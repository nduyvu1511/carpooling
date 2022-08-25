import React from "react"
import { Alert } from "../modal"

interface WalletBalanceAlertProps {
  show: boolean
  onClose: Function
  onConfirm: Function
}

export const WalletBalanceAlert = ({ onClose, onConfirm, show }: WalletBalanceAlertProps) => {
  return (
    <Alert
      type="warning"
      show={show}
      title="Không đủ số dư trong ví"
      desc="Hiện tại giao dịch ko đủ số dư trong ví, vui lòng nạp thêm để hoàn tất giao dịch"
      onConfirm={onConfirm}
      onClose={onClose}
      rightBtnLabel="Nạp tiền"
    />
  )
}
