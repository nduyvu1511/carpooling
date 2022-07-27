import { ArrowRightIcon, CheckCircleIcon } from "@/assets"
import { RootState } from "@/core/store"
import { COMPOUNDING_STATE_NAME } from "@/helper"
import { CompoundingCarCustomerState, CompoundingCarDriverState } from "@/models"
import { useMemo } from "react"
import { useSelector } from "react-redux"

interface RidesProgressProps {
  state: CompoundingCarCustomerState | CompoundingCarDriverState | undefined
}

const RidesProgress = ({ state }: RidesProgressProps) => {
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
      <div className="flex items-center mx-24">
        <div className="xs-hidden skeleton h-[14px] rounded-[3px] w-full"></div>
        <div className="hidden xs-block">
          {Array.from({ length: 4 }).map((_, index) => (
            <li
              className={`mr-[40px] last:mr-0 flex items-center md:justify-center flex-row md:flex-col ${
                index === 2 ? "hidden sm:flex" : ""
              } ${index === 3 ? "hidden md:flex" : ""}`}
              key={index}
            >
              <div className="w-[30px] h-[30px] rounded-[50%] skeleton mr-12 md:mr-0 md:mb-12"></div>
              <div className="w-[90px] h-[12px] rounded-[3px] skeleton"></div>
            </li>
          ))}
        </div>
      </div>
    )
  return (
    <ul className="flex items-center overflow-x-auto scrollbar-hide">
      {stateList.map((val, index) => (
        <li className="flex items-center md:items-start mr-24 md:mr-0" key={val[0]}>
          <div
            className={`flex flex-row items-center md:justify-center md:flex-col ${
              stateIndex === index
                ? "text-gray-color-4"
                : stateIndex > index
                ? "text-primary"
                : "opacity-50"
            }`}
          >
            {stateIndex > index ? (
              <CheckCircleIcon
                fill="#2E4CB7"
                stroke="#fff"
                opacity={1}
                className="w-[20px] h-[20px] md:w-[30px] shadow-shadow-1 md:h-[30px] text-white-color mr-8 md:mr-0 md:mb-8"
              />
            ) : (
              <span
                className={`w-[20px] h-[20px] md:w-[30px] md:h-[30px] text-[12px] md:text-14 font-semibold border border-solid border-border-color shadow-shadow-1 rounded-[50%] mr-8 md:mr-0 md:mb-8 flex-center text-primary`}
              >
                {index + 1}
              </span>
            )}
            <span
              className={`md:mx-[20px] text-xs font-medium whitespace-nowrap ${
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
            <span className={`hidden md:block mt-[8px] mx-[16px]`}>
              <ArrowRightIcon className="w-[7px]" />
            </span>
          ) : null}
        </li>
      ))}
    </ul>
  )
}

export { RidesProgress }
