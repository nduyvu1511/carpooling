import {
  ApplyPromotionCustomerParams,
  ApplyPromotionDriverParams,
  CancelPromotionCustomerParams,
  CancelPromotionDriverParams,
  CompoundingCarCustomer,
  SavePromotionParams,
  UseParams,
} from "@/models"
import { promotionApi } from "@/services/promotionAPI"
import { useDispatch } from "react-redux"
import { notify } from "reapop"
import { useFetcher } from "../async"

interface Res {
  applyPromotionForCustomer: (_: UseParams<ApplyPromotionCustomerParams, any>) => void
  applyPromotionForDriver: (_: UseParams<ApplyPromotionDriverParams, any>) => void
  cancelPromotionForDriver: (_: UseParams<CancelPromotionDriverParams, any>) => void
  cancelPromotionForCustomer: (_: UseParams<CancelPromotionCustomerParams, any>) => void
  savePromotion: (_: UseParams<SavePromotionParams, any>) => void
}

export const usePromotionActions = (): Res => {
  const dispatch = useDispatch()
  const { fetcherHandler } = useFetcher()

  const applyPromotionForCustomer = (
    _: UseParams<ApplyPromotionCustomerParams, CompoundingCarCustomer>
  ) => {
    const { onSuccess, params, config, onError } = _
    fetcherHandler<CompoundingCarCustomer>({
      fetcher: promotionApi.applyPromotionForCustomer(params),
      onSuccess: (data) => {
        if ((data?.discount_after_tax || 0) > 0) {
          onSuccess(data)
          dispatch(notify("Đã áp dụng chương trình khuyến mãi", "success"))
        } else {
          dispatch(notify("Không thể áp dụng khuyến mãi này", "error"))
          onError?.()
        }
      },
      onError: () => onError?.(),
      config: { ...config },
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
