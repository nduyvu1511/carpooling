import React from "react"
import Select, { Props } from "react-select"

interface InputSelectProps extends Props {}

export const InputSelect = ({ ...props }: InputSelectProps) => {
  const options = [
    { label: "Trong ngày", value: 1 },
    { label: "2 ngày", value: 2 },
    { label: "3 ngày", value: 3 },
    { label: "4 ngày", value: 4 },
    { label: "5 ngày", value: 5 },
    { label: "6 ngày", value: 6 },
    { label: "7 ngày", value: 7 },
    { label: "8 ngày", value: 8 },
  ]

  return (
    <div className="form-select flex-1">
      <Select
        autoFocus={false}
        openMenuOnFocus={true}
        placeholder={"Chọn số ngày đi"}
        options={options}
        onChange={(val) => {
          console.log(val)
        }}
        {...props}
      />
    </div>
  )
}
