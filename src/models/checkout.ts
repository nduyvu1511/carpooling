export interface PaymentRes {
  acquirer_id: number
  name: string
  provider: string
  state: "enabled"
  image_url: {
    id: number
    url: string
  }
}

export interface CreatePaymentRes {
  vnpay_payment_url: string
  vnpay_code: string
}

export type VnpayStatus =
  | "00"
  | "07"
  | "09"
  | "10"
  | "11"
  | "12"
  | "13"
  | "24"
  | "51"
  | "65"
  | "75"
  | "79"
  | "99"

export type PaymentMethod = "cash" | "transfer"
