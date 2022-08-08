import { ArrowDownIcon } from "@/assets"
import { isArrayHasValue } from "@/helper"
import { useInputText } from "@/hooks"
import {
  CancelCompoundingFormParams,
  ReasonCancelCompoundingCarRes,
  ReasonsCancelCompoundingCarParams,
} from "@/models"
import { ridesApi } from "@/services"
import { AxiosResponse } from "axios"
import { useRef, useState } from "react"
import useSWR from "swr"
import { ItemSelect } from "../inputs"
import { Spinner } from "../loading"

interface RidesCancelProps {
  params: ReasonsCancelCompoundingCarParams
  onSubmit?: (params: CancelCompoundingFormParams) => void
}

const RideCancelForm = ({ params, onSubmit }: RidesCancelProps) => {
  const { onChange, value } = useInputText()
  const ref = useRef<HTMLTextAreaElement>(null)
  const { data, error } = useSWR(
    params?.compounding_car_customer_id ? "get_reson_to_cancel_ride" : null,
    () =>
      ridesApi
        .getReasonsToCancelCompoundingCar(params)
        .then((res: AxiosResponse<ReasonCancelCompoundingCarRes[]>) => res.result.data),
    {
      dedupingInterval: 1000000,
    }
  )
  const [reasonId, setReasonId] = useState<number>()
  const [showOther, setShowOther] = useState<boolean>(false)

  const handleToggleResonIds = (id: number) => {
    setReasonId(reasonId === id ? undefined : id)
  }

  if (data === undefined && error === undefined) return <Spinner size={40} className="py[40px]" />
  if (!data || !isArrayHasValue(data)) return null
  return (
    <div className="h-full flex-1 flex flex-col">
      <div className="mb-[40px] p-24 pb-[80px]">
        <ul className="mb-[24px] flex-1 overflow-y-auto select-none">
          <p className="text-sm mb-24">Chọn lý do hủy chuyến đi:</p>
          {data.map((item) => (
            <li className="mb-[16px]" key={item.cancel_reason_id}>
              <ItemSelect
                onChange={() => handleToggleResonIds(item.cancel_reason_id)}
                title={item.reason}
                isActive={reasonId === item.cancel_reason_id}
              />
            </li>
          ))}
        </ul>

        <div className="">
          <label
            onClick={() => {
              if (!showOther) {
                setShowOther(true)
                setTimeout(() => ref.current?.focus(), 0)
              } else {
                setShowOther(false)
              }
            }}
            htmlFor="input"
            className="text-sm mb-4 flex items-center cursor-pointer"
          >
            Lý do khác:{" "}
            <ArrowDownIcon
              className={`ml-[8px] mt-[2px] transform ${showOther ? "rotate-[180deg]" : ""}`}
            />
          </label>
          {showOther ? (
            <textarea
              ref={ref}
              value={value}
              onChange={onChange}
              name=""
              id="input"
              rows={2}
              placeholder="Nhập lý do khác..."
              className="form-textarea"
            ></textarea>
          ) : null}
        </div>
      </div>

      <div className="flex-center bg-white-color p-12 md:p-[12px] absolute bottom-0 right-0 left-0">
        <button
          onClick={() =>
            (reasonId || value) &&
            onSubmit?.({ cancel_reason_id: reasonId, cancel_reason_other: value })
          }
          className={`btn bg-error ${reasonId || value ? "" : "pointer-events-none bg-bg-error"}`}
        >
          Hủy chuyến
        </button>
      </div>
    </div>
  )
}

export { RideCancelForm }
