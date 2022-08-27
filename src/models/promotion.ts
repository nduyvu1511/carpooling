import { TimeType } from "./common"

export interface SavePromotionParams {
  promotion_id: number
}

export interface GetDetailPromotionParams {
  promotion_id: number
}

export interface ApplyPromotionCustomerParams {
  promotion_id: number
  compounding_car_customer_id: number
}

export interface ApplyPromotionDriverParams {
  promotion_id: number
  compounding_car_id: number
}

export interface CancelPromotionCustomerParams {
  compounding_car_customer_id: number
}

export interface CancelPromotionDriverParams {
  compounding_car_id: number
}

export type PromotionType = "percentage" | "fixed"

export interface PromotionDuration {
  time_value: number
  type_type: TimeType
}

export interface PromotionRes {
  promotion_id: number
  promotion_code: string
  promotion_name: string
  promotion_type: PromotionType
  promotion_value: number
  saved_promotion: boolean
  duration_start: PromotionDuration
  duration_end: PromotionDuration
  save_promotion: boolean
}
