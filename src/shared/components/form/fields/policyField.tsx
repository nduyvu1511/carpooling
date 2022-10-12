import { InputCheckbox } from "@/components"
import Link from "next/link"
import { useState } from "react"
import { Control, useController } from "react-hook-form"

interface PolicyFieldProps {
  onChange: (_: boolean) => void
  control: Control<any>
  name: string
  defaultValue?: boolean
  className?: string
}

const PolicyField = ({
  onChange: externalOnChange,
  control,
  name,
  defaultValue,
  className = "",
}: PolicyFieldProps) => {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue,
  })

  const [privacy1, setPrivacy1] = useState<boolean>(!!value)
  const [privacy2, setPrivacy2] = useState<boolean>(!!value)

  const handleChange = (privacy1: boolean, privacy2: boolean) => {
    const val = privacy1 === true && privacy2 === true
    onChange(val || undefined)
    externalOnChange(val)
  }

  const checkPrivacy1 = (status: boolean) => {
    setPrivacy1(status)
    handleChange(status, privacy2)
  }

  const checkPrivacy2 = (status: boolean) => {
    setPrivacy2(status)
    handleChange(privacy1, status)
  }

  return (
    <div ref={ref} onBlur={onBlur} className={`form-item ${className}`}>
      <div className="mb-12">
        <div className="flex items-center">
          <p className="mr-12">
            <InputCheckbox
              className=""
              size={20}
              isChecked={!!privacy1}
              onCheck={() => checkPrivacy1(!privacy1)}
              type="circle"
            />
          </p>
          <span
            onClick={() => checkPrivacy1(!privacy1)}
            className="text-sm leading-[18px] select-none flex-1"
          >
            Số tiền này chưa bao gồm chi phí cầu đường, bến bãi...
          </span>
        </div>
        {error && privacy1 === false ? (
          <p className="form-err-msg">Vui lòng nhập trường này</p>
        ) : null}
      </div>

      <div>
        <div className="flex items-center">
          <p className="mr-12">
            <InputCheckbox
              className=""
              size={20}
              isChecked={!!privacy2}
              onCheck={() => checkPrivacy2(!privacy2)}
              type="circle"
            />
          </p>
          <span
            className="text-sm leading-[18px] select-none flex-1"
            onClick={() => checkPrivacy2(!privacy2)}
          >
            Tôi đã đồng ý với Exxe về{" "}
            <Link href="/terms-&-conditions">
              <a target="_blank" className="text-active font-semibold">
                Điều khoản dịch vụ
              </a>
            </Link>{" "}
            &{" "}
            <Link href="/private-policy">
              <a target="_blank" className="text-active font-semibold">
                Chính sách bảo mật.
              </a>
            </Link>
          </span>
        </div>
        {error && privacy2 === false ? (
          <p className="form-err-msg">Vui lòng nhập trường này</p>
        ) : null}
      </div>
    </div>
  )
}

export { PolicyField }

