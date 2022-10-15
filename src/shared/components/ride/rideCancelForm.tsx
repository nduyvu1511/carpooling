import { RootState } from "@/core/store"
import { isArrayHasValue } from "@/helper"
import { useInputText } from "@/hooks"
import {
  CancelCompoundingFormParams,
  ReasonCancelCompoundingCarRes,
  ReasonsCancelCompoundingCarParams,
} from "@/models"
import { rideAPI } from "@/services"
import { AxiosResponse } from "axios"
import moment from "moment"
import { useRef, useState } from "react"
import { useSelector } from "react-redux"
import Select from "react-select"
import useSWR from "swr"
import { Spinner } from "../loading"
import { Alert } from "../modal"

interface RidesCancelProps {
  params: ReasonsCancelCompoundingCarParams
  onSubmit?: (params: CancelCompoundingFormParams) => void
  onClose: Function
  expectedGoingOnDate?: string
}

const RideCancelForm = ({ params, onSubmit, onClose, expectedGoingOnDate }: RidesCancelProps) => {
  const { onChange, value } = useInputText()
  const ref = useRef<HTMLTextAreaElement>(null)
  const selectRef = useRef<any>(null)
  const userInfo = useSelector((state: RootState) => state.userInfo.userInfo)

  const { data, error } = useSWR(
    params?.compounding_car_customer_state || params?.compounding_car_state
      ? "get_reson_to_cancel_ride"
      : null,
    () =>
      rideAPI
        .getReasonsToCancelCompoundingCar({
          ...params,
          car_account_type: userInfo?.car_account_type,
        })
        .then((res: AxiosResponse<ReasonCancelCompoundingCarRes[]>) => res.result.data),
    {
      dedupingInterval: 100 * 60 * 1000,
    }
  )

  const [reasonId, setReasonId] = useState<number>()

  return (
    <Alert
      warningColor="#ff3b30"
      show={true}
      className="ride-cancel-form"
      rightBtnLabel="Hủy chuyến"
      onClose={onClose}
      onConfirm={() =>
        (reasonId || value) &&
        onSubmit?.({ cancel_reason_id: reasonId, cancel_reason_other: value || undefined })
      }
      type="warning"
      disabledBtn={!reasonId && !value}
      title="Bạn có muốn huỷ chuyến?"
      desc={
        expectedGoingOnDate
          ? moment().add(3, "hours").isAfter(moment(expectedGoingOnDate))
            ? "Bạn sẽ không được hoàn trả phí đặt cọc trong khoảng thời gian này"
            : undefined
          : undefined
      }
    >
      <div className="">
        {error === undefined && data === undefined ? (
          <Spinner size={40} className="py-[80px]" />
        ) : (
          <>
            {data && isArrayHasValue(data) ? (
              <div className="mb-24">
                <p onClick={() => selectRef?.current?.focus()} className="form-label">
                  Chọn lý do hủy chuyến đi:
                </p>

                <div className="form-select">
                  <Select
                    openMenuOnFocus={true}
                    ref={selectRef}
                    onChange={(val) => setReasonId(val?.value)}
                    maxMenuHeight={200}
                    placeholder="Chọn lý do"
                    options={(data || []).map((item) => ({
                      label: item.reason,
                      value: item.cancel_reason_id,
                    }))}
                  />
                </div>
              </div>
            ) : null}

            <div className="">
              <label htmlFor="input" className="text-sm mb-4 flex items-center cursor-pointer">
                Lý do khác:{" "}
              </label>
              <textarea
                ref={ref}
                value={value}
                onChange={onChange}
                name=""
                id="input"
                rows={2}
                placeholder="Nhập lý do khác..."
                className="form-textarea resize-none"
              ></textarea>
            </div>
          </>
        )}
      </div>
    </Alert>
  )
}

export { RideCancelForm }
