import Link from "next/link"
import { useState } from "react"
import { InputCheckbox } from "./inputCheckbox"

interface InputPolicyProps {
  onChange: (_: boolean) => void
  value?: boolean
  isError?: boolean
}

const InputPolicy = ({ onChange, value, isError }: InputPolicyProps) => {
  const [privacy1, setPrivacy1] = useState<boolean | undefined>(!!value)
  const [privacy2, setPrivacy2] = useState<boolean | undefined>(!!value)

  const handleChange = (privacy1: boolean | undefined, privacy2: boolean | undefined) => {
    onChange(privacy1 === true && privacy2 === true)
  }

  const checkPrivacy1 = (status: boolean) => {
    setPrivacy1(status)
    handleChange(status, privacy2)
  }
  console.log({ isError })

  const checkPrivacy2 = (status: boolean) => {
    setPrivacy2(status)
    handleChange(privacy1, status)
  }

  return (
    <>
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
            Số tiền này chưa bao gồm chi phí cầu đường , bãi bến..
          </span>
        </div>
        {!privacy1 ? <p className="text-error text-12">Vui lòng nhập trường này</p> : null}
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
            <Link href="/terms-&-conditions">
              <a target="_blank" className="text-active font-semibold">
                Chính sách bảo mật.
              </a>
            </Link>
          </span>
        </div>
        {!privacy2 ? <p className="text-error text-12">Vui lòng nhập trường này</p> : null}
      </div>
    </>
  )
}

export { InputPolicy }
