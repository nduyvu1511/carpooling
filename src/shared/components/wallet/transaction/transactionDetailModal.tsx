import { Modal } from "@/components"
import { TransactionDetail } from "./transactionDetail"

interface TransactionDetailModalProps {
  paymentId?: number | undefined
  onClose?: Function
}

export const TransactionDetailModal = ({ onClose, paymentId }: TransactionDetailModalProps) => {
  return (
    <Modal
      key="transaction-detail-modal"
      show={!!paymentId}
      onClose={() => onClose?.()}
      heading="Chi tiết giao dịch"
      className=""
    >
      <div className="modal-form">
        <div className="p-12 py-24 md:p-24 modal-form-content">
          {paymentId ? <TransactionDetail payment_id={paymentId} /> : null}
        </div>

        <div className="modal-form-btn">
          <button onClick={() => onClose?.()} className="btn-primary-outline">
            Đóng
          </button>
        </div>
      </div>
    </Modal>
  )
}
