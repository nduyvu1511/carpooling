import { FromLocation } from "@/models"
import { useState } from "react"
import { Control, Controller } from "react-hook-form"
import { Map } from "../map"
import { Modal } from "../modal"

interface InputLocationProps {
  onChange: (params: FromLocation) => void
  type: "from" | "to"
  prevProvinceId?: number
  defaultLocation?: FromLocation
  showLabel?: boolean
  defaultValue?: string
  placeholder: string
  required?: boolean
  name: string
  control: Control<any>
  isError?: boolean | undefined
}

export const InputLocation = ({
  placeholder,
  onChange,
  isError = false,
  defaultValue,
  type,
  prevProvinceId,
  defaultLocation,
  control,
  name,
  required = true,
  showLabel = true,
}: InputLocationProps) => {
  const [showMap, setShowMap] = useState<boolean>(false)

  return (
    <>
      <>
        <div className="">
          {showLabel ? (
            <label className="form-label" htmlFor={name}>
              {placeholder} {required ? "(*)" : ""}
            </label>
          ) : null}

          <Controller
            control={control}
            name={name}
            render={({ field: { onChange, onBlur } }) => (
              <input
                onClick={() => setShowMap(true)}
                readOnly
                id={name}
                onBlur={onBlur}
                className={`form-input ${isError ? "form-input-err" : ""}`}
                type="text"
                placeholder={placeholder}
                value={defaultValue}
              />
            )}
            rules={{ required: true }}
          />
        </div>
        {isError ? <p className="form-err-msg">Vui lòng nhập trường này</p> : null}
      </>

      <Modal
        show={showMap}
        iconType="back"
        heading={type === "from" ? "Chọn điểm đến" : "Chọn điểm đi"}
        onClose={() => setShowMap(false)}
        transitionType="up"
      >
        <Map
          defaultLocation={defaultLocation}
          prevProvinceId={prevProvinceId}
          onChooseLocation={(location) => {
            onChange({ ...location })
            setShowMap(false)
          }}
        />
      </Modal>
    </>
  )
}

export default InputLocation
