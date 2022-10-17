import { toggleBodyOverflow } from "@/helper"
import { usePromotionActions } from "@/hooks"
import { CarAccountType, PromotionRes } from "@/models"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { PromotionForm } from "../form"
import { PromotionModal } from "./promotionModal"

interface PromotionCheckoutProps {
  accountType: CarAccountType
  onApplyPromotion?: Function
  onCancelPromotion?: Function
  compounding_car_customer_id?: number
  compounding_car_id?: number
  data?: PromotionRes
  disabled?: boolean
}

export const PromotionCheckout = ({
  onApplyPromotion,
  accountType,
  compounding_car_customer_id,
  compounding_car_id,
  onCancelPromotion,
  data,
  disabled,
}: PromotionCheckoutProps) => {
  const dispatch = useDispatch()
  const [showPromotionModal, setShowPromotionModal] = useState<boolean>(false)
  const [promotionCode, setPromotionCode] = useState<string | undefined>(data?.promotion_code)
  const {
    applyPromotionForCustomer,
    applyPromotionForDriver,
    cancelPromotionForCustomer,
    cancelPromotionForDriver,
  } = usePromotionActions()

  const handleCancelPromotion = () => {
    if (accountType === "car_driver") {
      if (!compounding_car_id) return
      cancelPromotionForDriver({
        params: { compounding_car_id },
        onSuccess: () => {
          toggleModal(false)
          setPromotionCode(undefined)
          onCancelPromotion?.()
        },
      })
    } else {
      if (!compounding_car_customer_id) return
      cancelPromotionForCustomer({
        params: { compounding_car_customer_id },
        onSuccess: () => {
          toggleModal(false)
          setPromotionCode(undefined)
          onCancelPromotion?.()
        },
      })
    }
  }

  const handleApplyPromotion = (promotion: PromotionRes) => {
    if (accountType === "car_driver" && compounding_car_id) {
      applyPromotionForDriver({
        params: { compounding_car_id, promotion_id: promotion.promotion_id },
        onSuccess: () => {
          setPromotionCode(promotion.promotion_code)
          toggleModal(false)
          onApplyPromotion?.()
        },
      })
    } else if (accountType === "customer" && compounding_car_customer_id) {
      applyPromotionForCustomer({
        params: { compounding_car_customer_id, promotion_id: promotion.promotion_id },
        onSuccess: () => {
          setPromotionCode(promotion.promotion_code)
          toggleModal(false)
          onApplyPromotion?.()
        },
      })
    }
  }

  const toggleModal = (status: boolean) => {
    setShowPromotionModal(status)
    if (status) {
      toggleBodyOverflow("hidden")
    } else {
      toggleBodyOverflow("unset")
    }
  }

  return (
    <>
      <p className="text-base font-semibold uppercase mb-16 md:mb-24">MÃ KHUYẾN MÃI</p>
      <PromotionForm
        disabled={disabled}
        readonly
        promotionCode={promotionCode}
        onCancelPromotion={handleCancelPromotion}
        onFocus={() => !disabled && toggleModal(true)}
      />

      {showPromotionModal ? (
        <PromotionModal
          appliedPromotionId={data?.promotion_id}
          onApply={handleApplyPromotion}
          onClose={() => toggleModal(false)}
          compounding_car_customer_id={compounding_car_customer_id}
        />
      ) : null}
    </>
  )
}
