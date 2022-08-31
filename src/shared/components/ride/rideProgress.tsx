import { ArrowRightIcon, CheckProgressIcon } from "@/assets"
import { RootState } from "@/core/store"
import { COMPOUNDING_STATE_NAME } from "@/helper"
import { CompoundingCarCustomerState, CompoundingCarDriverState } from "@/models"
import { useMemo, useRef } from "react"
import { useSelector } from "react-redux"

interface RideProgressProps {
  state: CompoundingCarCustomerState | CompoundingCarDriverState | undefined
  className?: string
}

const RideProgress = ({ state, className = "" }: RideProgressProps) => {
  const ulRef = useRef<HTMLUListElement>(null)
  const { userInfo } = useSelector((state: RootState) => state.userInfo)
  const stateList = useMemo(() => {
    if (userInfo?.car_account_type === "car_driver")
      return [
        ["draft", "waiting", "waiting_deposit", "confirm_deposit", "confirm"],
        ["start_running", "in_process", "stop_picking"],
        ["done", "cancel"],
      ]

    return [
      ["draft"],
      ["confirm", "deposit", "waiting", "waiting_customer", "assign"],
      ["in_process", "start_running", "done", "customer_pay"],
      ["confirm_paid", "cancel"],
    ]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const stateIndex = useMemo(() => {
    if (!state) return -1
    return stateList.findIndex((item) => item.includes(state))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

  if (!state)
    return (
      <div className="flex items-center w-[80%]">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="flex-center flex-row md:flex-col mr-24">
            <div className="w-[20px] h-[20px] md:w-24 md:h-24 rounded-[50%] skeleton mb-0 md:mb-12 mr-12 md:mr-0"></div>
            <div className="w-[80px] h-12 skeleton rounded-[4px]"></div>
          </div>
        ))}
        {/* <div className="xs-hidden skeleton h-16 rounded-[3px] w-full"></div> */}
      </div>
    )
  return (
    <ul ref={ulRef} className={`flex items-center overflow-x-auto scrollbar-hide ${className}`}>
      {stateList.map((val, index) => (
        <li
          className="flex items-center md:items-start mr-12 xs:mr-24 md:mr-0 last:mr-24"
          key={val[0]}
        >
          <div
            className={`flex flex-row items-center md:justify-center md:flex-col ${
              stateIndex === index
                ? "text-blue-8"
                : stateIndex > index
                ? "text-primary"
                : "opacity-50"
            }`}
          >
            {stateIndex > index ? (
              <CheckProgressIcon className="w-[20px] h-[20px] md:w-24 md:h-24 md:mb-8 mr-8 md:mr-0 " />
            ) : (
              <span
                className={`w-[20px] h-[20px] md:w-[24px] md:h-[24px] text-[12px] md:text-14 font-semibold border border-solid border-border-color shadow-shadow-1 rounded-[50%] mr-8 md:mr-0 md:mb-8 flex-center text-primary`}
              >
                {index + 1}
              </span>
            )}

            <span
              className={`text-xs whitespace-nowrap ${
                stateIndex === index || stateIndex > index ? "text-primary" : "opacity-60"
              }`}
            >
              {stateIndex === index
                ? COMPOUNDING_STATE_NAME[state]
                : stateIndex > index
                ? COMPOUNDING_STATE_NAME[val[val.length - 1] as CompoundingCarCustomerState]
                : COMPOUNDING_STATE_NAME[val[0] as CompoundingCarCustomerState]}
            </span>
          </div>

          {index < stateList.length - 1 ? (
            <span className={`hidden md:block mt-[14px] mx-[22px]`}>
              <ArrowRightIcon className="w-[7px]" />
            </span>
          ) : null}
        </li>
      ))}
    </ul>
  )
}

export { RideProgress }
