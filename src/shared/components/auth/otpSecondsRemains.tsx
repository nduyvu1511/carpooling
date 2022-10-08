import { useEffect, useState } from "react"

const RESEND_OTP_TIMEOUT = 180

interface Props {
  onChange?: Function
}

export const OtpSecondsRemains = ({ onChange }: Props) => {
  const [secondsExpire, setSecondsExprire] = useState<number>(RESEND_OTP_TIMEOUT)

  useEffect(() => {
    if (secondsExpire === 0) return
    const interval = setInterval(() => {
      setSecondsExprire(secondsExpire - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [secondsExpire])

  return (
    <div className="flex justify-center">
      {secondsExpire === 0 ? (
        <>
          <p className="text-xs">Bạn không nhận được mã?</p>
          <span
            className="text-primary cursor-pointer text-xs ml-[2px] font-medium"
            onClick={() => {
              setSecondsExprire(RESEND_OTP_TIMEOUT)
              onChange && onChange()
            }}
          >
            Gửi lại
          </span>
        </>
      ) : (
        <p className="text-center text-xs">Vui lòng chờ {secondsExpire} giây để gửi lại</p>
      )}
    </div>
  )
}
