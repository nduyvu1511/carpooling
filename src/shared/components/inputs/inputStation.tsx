import { StationId } from "@/models"
import { useState } from "react"
import { Control, Controller } from "react-hook-form"
import { useDispatch } from "react-redux"
import { notify } from "reapop"
import { Modal } from "../modal"
import { Station } from "../station"

interface InputStationProps {
  placeholder: string
  onChange: (params: StationId) => void
  prevProvinceId?: number
  defaultValue?: StationId
  required?: boolean
  name: string
  control: Control<any>
  isError?: boolean | undefined
  showLabel?: boolean
  type?: "from" | "to"
}

export const InputStation = ({
  placeholder,
  onChange,
  isError = false,
  prevProvinceId,
  defaultValue,
  control,
  name,
  required = true,
  showLabel = true,
  type,
}: InputStationProps) => {
  const dispatch = useDispatch()
  const [showStation, setShowStation] = useState<boolean>(false)

  return (
    <>
      <div className="">
        {showLabel ? (
          <label onClick={() => setShowStation(true)} className="form-label">
            {placeholder} {required ? "(*)" : ""}
          </label>
        ) : null}
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, onBlur } }) => (
            <input
              onClick={() => {
                setShowStation(true)
              }}
              readOnly
              className={`form-input ${isError ? "form-input-err" : ""}`}
              type="text"
              placeholder={placeholder}
              value={
                defaultValue?.province_id
                  ? `${defaultValue.station_name}, ${defaultValue.province_name} `
                  : ""
              }
              onBlur={onBlur}
            />
          )}
          rules={{ required: true }}
        />

        {isError ? <p className="form-err-msg">Vui lòng nhập trường này</p> : null}
      </div>

      {showStation ? (
        <Modal
          onClose={() => {
            setShowStation(false)
          }}
          iconType="back"
          heading={type === "from" ? "Chọn trạm đến" : "Chọn trạm đi"}
        >
          <Station
            onChooseStation={(val) => {
              if (prevProvinceId === val.province_id) {
                dispatch(notify("Vui lòng chọn địa điểm khác với tỉnh trước đó", "error"))
                return
              }
              setShowStation(false)
              onChange(val)
            }}
            defaultValue={defaultValue}
          />
        </Modal>
      ) : null}
    </>
  )
}
