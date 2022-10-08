export interface GetPromotionDetail {
  notification_type: "transaction_notification" | "promotion_notification"
  notification_id: number
  offset?: number
  limit?: number
}
