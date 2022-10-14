import {
  CreateRatingParams,
  DeleteRatingParams,
  RatingRes,
  ReportRatingParams,
  UpdateRatingParams,
  UseParams,
} from "@/models"
import { ratingAPI } from "@/services"
import { useFetcher } from "../async"

interface Res {
  deleteRating: (_params: UseParams<DeleteRatingParams, RatingRes>) => void
  addRating: (_params: UseParams<CreateRatingParams, RatingRes>) => void
  updateRating: (_params: UseParams<UpdateRatingParams, RatingRes>) => void
  reportRating: (_params: UseParams<ReportRatingParams, any>) => void
}

export const useRatingActions = (): Res => {
  const { fetcherHandler } = useFetcher()

  const deleteRating = async (_params: UseParams<DeleteRatingParams, RatingRes>) => {
    const { params, onSuccess, onError } = _params
    fetcherHandler({
      fetcher: ratingAPI.deleteRating(params),
      onSuccess: (data) => onSuccess(data),
      onError: () => onError?.(),
    })
  }

  const addRating = async (_params: UseParams<CreateRatingParams, RatingRes>) => {
    const { params, onSuccess, onError } = _params
    fetcherHandler({
      fetcher: ratingAPI.createRating(params),
      onSuccess: (data) => onSuccess(data),
      onError: () => onError?.(),
    })
  }

  const updateRating = async (_params: UseParams<UpdateRatingParams, RatingRes>) => {
    const { params, onSuccess, onError } = _params
    fetcherHandler({
      fetcher: ratingAPI.updateRating(params),
      onSuccess: (data) => onSuccess(data),
      onError: () => onError?.(),
    })
  }

  const reportRating = async (_params: UseParams<ReportRatingParams, any>) => {
    const { params, onSuccess, onError } = _params
    fetcherHandler({
      fetcher: ratingAPI.reportRating(params),
      onSuccess: (data) => onSuccess(data),
      onError: () => onError?.(),
      config: { successMsg: "Báo cáo đánh giá thành công, vui lòng chờ xác nhận" },
    })
  }

  return {
    addRating,
    deleteRating,
    updateRating,
    reportRating,
  }
}
