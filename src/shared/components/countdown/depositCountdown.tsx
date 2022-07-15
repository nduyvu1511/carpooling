import { useCountdown } from "@/hooks"
import moment from "moment"
import { useEffect, useMemo } from "react"

interface DepositCountdownProps {
  secondsRemains: number
  onExpiredCoundown: Function
  className?: string
  showTitle?: boolean
}

export const DepositCountdown = ({
  onExpiredCoundown,
  secondsRemains,
  className,
  showTitle = true,
}: DepositCountdownProps) => {
  const targetDate = useMemo(() => {
    return moment(new Date(), "DD/MM/YYYY hh:mm:ss").add(secondsRemains, "seconds").toString()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [days, hours, minutes, seconds] = useCountdown({
    targetDate,
  })

  useEffect(() => {
    if (minutes === 0 && seconds === 0) {
      onExpiredCoundown()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minutes, seconds])

  return (
    <div className="flex-center flex-col">
      {showTitle ? (
        <p className="text-16 leading-26 font-semibold mb-24">Giao dịch kết thúc trong</p>
      ) : null}

      <span className={`${className}`}>
        {`0${minutes}`.slice(-2)}: {`0${seconds}`.slice(-2)}
      </span>
    </div>
  )
}
