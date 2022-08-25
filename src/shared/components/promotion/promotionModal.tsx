import { PromotionForm } from "../form"
import { Modal } from "../modal"
import { PromotionItem } from "./promotionItem"

interface PromotionModalProps {
  onClose: Function
}

export const PromotionModal = ({ onClose }: PromotionModalProps) => {
  return (
    <Modal onClose={onClose} heading="Ưu đãi" show={true}>
      <div className="modal-form-content">
        <PromotionForm onSubmit={(data) => console.log(data)} />
        <div className="grid gap-16 mt-24">
          <PromotionItem />
          <PromotionItem />
          <PromotionItem />
          <PromotionItem />
        </div>
      </div>

      <div className="modal-form-btn">
        <button className="btn-primary-outline">Đóng</button>
      </div>
    </Modal>
  )
}
