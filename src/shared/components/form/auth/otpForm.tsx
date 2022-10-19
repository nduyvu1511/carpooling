import { OtpSecondsRemains } from "@/components/auth"
import { useState } from "react"
import OtpInput from "react-otp-input"

interface PhoneFormProps {
  phoneNumber: string
  onSubmit: (otpCode: string) => void
  resendOTPCode?: Function
}

export const OtpForm = ({ phoneNumber, onSubmit, resendOTPCode }: PhoneFormProps) => {
  const [otpVal, setOtpVal] = useState<string>("")

  return (
    <form
      className="form-control"
      onSubmit={(e) => {
        e.preventDefault()
        if (otpVal?.length < 6) return
        onSubmit?.(otpVal)
      }}
    >
      <div className="form-control-otp">
        <p className="text-sm text-center mb-[40px]">
          Mã xác minh của bạn sẽ được gửi bằng tin nhắn đến{" "}
          <span className="ml-[2px] text-base">{phoneNumber}</span>
        </p>

        <div className="my-otp-input flex-center mb-[40px]">
          <OtpInput
            shouldAutoFocus
            value={otpVal}
            onChange={(otp: string) => setOtpVal(otp)}
            numInputs={6}
            isInputNum
          />
        </div>
      </div>

      <div className="mb-[40px]">
        <OtpSecondsRemains onChange={resendOTPCode} />
      </div>

      <button
        type="submit"
        className={`btn-primary mx-auto otp-btn-login btn-submit-fixed ${
          otpVal.length === 6 ? "" : "btn-disabled"
        }`}
      >
        Xác nhận
      </button>
    </form>
  )
}
