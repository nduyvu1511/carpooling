import { LocationInfoField, Map, Modal } from "@/components"
import { FromLocation } from "@/models"
import { useState } from "react"
import { Control, useController } from "react-hook-form"

type LocationFieldProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  any
> & {
  onChange: (params: FromLocation) => void
  prevProvinceId?: number
  label?: string
  defaultValue?: FromLocation
  required?: boolean
  name: string
  control: Control<any>
  modalTitle?: string
  className?: string
  distance?: number
  duration?: number
  price?: number
  showLocationInfo?: boolean
}

export const LocationField = ({
  placeholder,
  onChange: externalOnChange,
  defaultValue,
  prevProvinceId,
  control,
  name,
  required = true,
  label,
  modalTitle,
  className = "",
  distance,
  duration,
  price,
  showLocationInfo,
  ...attribute
}: LocationFieldProps) => {
  const [showMap, setShowMap] = useState<boolean>(false)

  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue,
  })

  const toggleModal = (status: boolean) => {
    setShowMap(status)
  }

  return (
    <>
      <div
        ref={ref}
        onBlur={onBlur}
        className={`form-item ${attribute?.disabled ? "pointer-events-none" : ""} ${className}`}
      >
        <div className="">
          {label ? (
            <label className="form-label" htmlFor={name}>
              {label}
              {required ? "(*)" : ""}
            </label>
          ) : null}

          <input
            onClick={() => {
              if (!attribute?.disabled) {
                toggleModal(true)
              }
            }}
            readOnly
            id={name}
            className={`form-input ${error ? "form-input-err" : ""}`}
            type="text"
            placeholder={placeholder}
            value={value?.address || ""}
            {...attribute}
          />
        </div>

        {error ? (
          <p className="form-err-msg">{error?.message || "Vui lòng nhập trường này"}</p>
        ) : null}

        {/* Show location info between two points */}
        {showLocationInfo ? (
          <LocationInfoField distance={distance} duration={duration} price={price} />
        ) : null}
      </div>

      <Modal
        key="location-modal"
        show={showMap}
        iconType="back"
        heading={modalTitle || "Chọn địa điểm"}
        onClose={() => toggleModal(false)}
        transitionType="up"
      >
        <Map
          defaultLocation={value}
          prevProvinceId={prevProvinceId}
          onChooseLocation={(location) => {
            onChange(location)
            externalOnChange(location)
            toggleModal(false)
          }}
        />
      </Modal>
    </>
  )
}
