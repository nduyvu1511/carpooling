import {
  ApplyPromotionCustomerParams,
  ApplyPromotionDriverParams,
  CancelPromotionCustomerParams,
  CancelPromotionDriverParams,
  SavePromotionParams,
  UseParams,
} from "@/models"
import { promotionApi } from "@/services/promotionAPI"
import { useFetcher } from "../async"

interface Res {
  applyPromotionForCustomer: (_: UseParams<ApplyPromotionCustomerParams, any>) => void
  applyPromotionForDriver: (_: UseParams<ApplyPromotionDriverParams, any>) => void
  cancelPromotionForDriver: (_: UseParams<CancelPromotionDriverParams, any>) => void
  cancelPromotionForCustomer: (_: UseParams<CancelPromotionCustomerParams, any>) => void
  savePromotion: (_: UseParams<SavePromotionParams, any>) => void
}

export const usePromotionActions = (): Res => {
  const { fetcherHandler } = useFetcher()

  const applyPromotionForCustomer = (_: UseParams<ApplyPromotionCustomerParams, any>) => {
    const { onSuccess, params, config, onError } = _
    fetcherHandler({
      fetcher: promotionApi.applyPromotionForCustomer(params),
      onSuccess: (data) => onSuccess(data),
      onError: () => onError?.(),
      config: { ...config, successMsg: "Áp dụng khuyến mãi thành công!" },
    })
  }

  const applyPromotionForDriver = (_: UseParams<ApplyPromotionDriverParams, any>) => {
    const { onSuccess, params, config, onError } = _
    fetcherHandler({
      fetcher: promotionApi.applyPromotionForDriver(params),
      onSuccess: (data) => onSuccess(data),
      onError: () => onError?.(),
      config: { ...config, successMsg: "Áp dụng khuyến mãi thành công!" },
    })
  }

  const cancelPromotionForDriver = (_: UseParams<CancelPromotionDriverParams, any>) => {
    const { onSuccess, params, config, onError } = _
    fetcherHandler({
      fetcher: promotionApi.cancelPromotionForDriver(params),
      onSuccess: (data) => onSuccess(data),
      onError: () => onError?.(),
      config: { ...config, successMsg: "Hủy áp dụng khuyến mãi thành công!" },
    })
  }

  const cancelPromotionForCustomer = (_: UseParams<CancelPromotionCustomerParams, any>) => {
    const { onSuccess, params, config, onError } = _
    fetcherHandler({
      fetcher: promotionApi.cancelPromotionForCustomer(params),
      onSuccess: (data) => onSuccess(data),
      onError: () => onError?.(),
      config: { ...config, successMsg: "Hủy áp dụng khuyến mãi thành công!" },
    })
  }

  const savePromotion = (_: UseParams<SavePromotionParams, any>) => {
    const { onSuccess, params, config, onError } = _
    fetcherHandler({
      fetcher: promotionApi.savePromotion(params),
      onSuccess: (data) => onSuccess(data),
      onError: () => onError?.(),
      config: { ...config, successMsg: "Đã lưu vào danh sách của bạn!" },
    })
  }

  return {
    applyPromotionForCustomer,
    applyPromotionForDriver,
    cancelPromotionForCustomer,
    cancelPromotionForDriver,
    savePromotion,
  }
}
