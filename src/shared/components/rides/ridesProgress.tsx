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
      <ul className="flex items-center mx-24">
        {Array.from({ length: 4 }).map((_, index) => (
          <li className="mr-[40px] last:mr-0 flex-center flex-col" key={index}>
            <div className="w-[30px] h-[30px] rounded-[50%] skeleton mb-12"></div>
            <div className="w-[90px] h-[8px] rounded-[4px] skeleton"></div>
          </li>
        ))}
      </ul>
    )
  return (
    <ul className="flex items-center">
      {stateList.map((val, index) => (
        <li className="flex items-start" key={val[0]}>
          <div
            className={`flex-center flex-col ${
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
                className="w-[30px] h-[30px] text-white-color mb-8 "
              />
            ) : stateIndex === index ? (
              <CheckCircleIcon
                fill="#373737"
                stroke="#fff"
                opacity={1}
                className="w-[30px] h-[30px] text-white-color mb-8 "
              />
            ) : (
              <span className="w-[30px] h-[30px] border border-solid border-border-color shadow-shadow-1 rounded-[50%] mb-8 flex-center">
                {index + 1}
              </span>
            )}
            <span
              className={`mx-[20px] text-xs ${
                stateIndex === index ? "" : stateIndex > index ? "text-primary" : "opacity-60"
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
            <span className={`mt-[8px] `}>
              <ArrowRightIcon className="w-[8px]" />
            </span>
          ) : null}
        </li>
      ))}
    </ul>
  )
}

export { RidesProgress }
