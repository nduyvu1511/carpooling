import { PromotionForm } from "../form"
import { Modal } from "../modal"
import { Promotion } from "./promotion"

interface PromotionModalProps {
  onClose: Function
  onApply?: (id: number) => void
}

export const PromotionModal = ({ onClose, onApply }: PromotionModalProps) => {
  return (
    <Modal onClose={onClose} heading="Ưu đãi" show={true}>
      <div className="modal-form-content">
        <PromotionForm className="mb-24" onSubmit={(data) => console.log(data)} />
        <Promotion onApply={onApply} className="grid grid-cols-1 gap-16" />
      </div>

      <div className="modal-form-btn">
        <button type="button" onClick={() => onClose()} className="btn-primary-outline">
          Đóng
        </button>
      </div>
    </Modal>
  )
}
