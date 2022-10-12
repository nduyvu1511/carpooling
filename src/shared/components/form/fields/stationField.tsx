import { LocationInfoField, Modal, Station } from "@/components"
import { StationId } from "@/models"
import { useState } from "react"
import { Control, useController } from "react-hook-form"
import { useDispatch } from "react-redux"
import { notify } from "reapop"

type StationFieldProps = {
  onChange: (params: StationId) => void
  prevProvinceId?: number
  defaultValue?: StationId
  required?: boolean
  name: string
  control: Control<any>
  label?: string
  modalTitle?: string
  distance?: number
  duration?: number
  price?: number
  showLocationInfo?: boolean
  disabled?: boolean
  placeholder?: string
}

export const StationField = ({
  onChange: externalOnChange,
  prevProvinceId,
  defaultValue,
  control,
  name,
  label,
  modalTitle,
  required = true,
  duration,
  distance,
  price,
  showLocationInfo,
  disabled,
  placeholder,
}: StationFieldProps) => {
  const dispatch = useDispatch()
  const [showStation, setShowStation] = useState<boolean>(false)

  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue,
  })

  const handleSetShowStation = (status: boolean) => {
    if (!disabled) {
      setShowStation(status)
    }
  }

  return (
    <>
      <div ref={ref} className={`form-item ${disabled ? "pointer-events-none" : ""}`}>
        {label ? (
          <label
            onClick={() => {
              handleSetShowStation(true)
            }}
            className="form-label"
          >
            {label}
            {required ? "(*)" : ""}
          </label>
        ) : null}

        <input
          onClick={() => {
            handleSetShowStation(true)
          }}
          readOnly
          className={`form-input ${error ? "form-input-err" : ""}`}
          type="text"
          placeholder={placeholder}
          value={value?.province_id ? `${value.station_name}, ${value.province_name}` : ""}
        />

        {error ? (
          <p className="form-err-msg">{error?.message || "Vui lòng nhập trường này"}</p>
        ) : null}

        {showLocationInfo ? (
          <LocationInfoField distance={distance} duration={duration} price={price} />
        ) : null}
      </div>

      <Modal
        key="modal-station-input"
        show={showStation}
        onClose={() => {
          handleSetShowStation(false)
          onBlur()
        }}
        iconType="back"
        heading={modalTitle || "Chọn trạm đến"}
        transitionType="up"
      >
        <Station
          onChange={(val) => {
            if (prevProvinceId === val.province_id) {
              dispatch(notify("Vui lòng chọn địa điểm khác với tỉnh trước đó", "error"))
              return
            }

            handleSetShowStation(false)
            onChange(val)
            externalOnChange(val)
          }}
          defaultValue={value}
        />
      </Modal>
    </>
  )
}
