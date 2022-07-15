export interface PaymentRes {
  acquirer_id: number
  name: string
  provider: string
  state: "enabled"
  image: string
}

export interface CreatePaymentRes {
  vnpay_payment_url: string
  vnpay_code: string
}

export type PaymentMethod = "cash" | "transfer"
