import { CustomerIcon, DriverIcon, WarningIcon } from "@/assets"
import { CarAccountType } from "@/models"
import { useState } from "react"

interface AccountTypeFormProps {
  onSubmit: (params: CarAccountType) => void
}

const AccountTypeForm = ({ onSubmit }: AccountTypeFormProps) => {
  const [accountType, setAccounType] = useState<CarAccountType | undefined>()

  const handleChooseAccountType = (status: CarAccountType) => {
    setAccounType(status)
  }

  return (
    <div className="">
      <div className="flex flex-col items-start sm:flex-row sm:items-stretch mb-[40px]">
        {[
          ["Tài khoản khách hàng", CustomerIcon, "customer"],
          ["", DriverIcon, "separate"],
          ["Tài khoản tài xế", DriverIcon, "car_driver"],
        ].map(([label, Icon, value], index) =>
          value === "separate" ? (
            <div className="sm:mx-[32px] my-16 sm:my-[50px] border-r border-solid border-border-color"></div>
          ) : (
            <div
              key={index}
              onClick={() => handleChooseAccountType(value as CarAccountType)}
              className={`relative flex-1 flex-center flex-col p-24 border border-solid block-element shadow-shadow-1 overflow-hidden rounded-[10px] cursor-pointer mx-auto max-w-[250px] w-full ${
                accountType === value ? "bg-bg-primary border-primary" : "border-border-color"
              }`}
            >
              <Icon className="w-full" />
              <span
                className={`text-base font-semibold mt-[40px] ${
                  accountType === value ? "text-primary" : ""
                }`}
              >
                {label as string}
              </span>
            </div>
          )
        )}
      </div>

      <div className="flex items-start mt-[24px] bg-orange-05 rounded-[5px] p-8">
        <WarningIcon className="w-24 h-24 mr-12" />
        <p className="text-12 leading-[18px] flex-1 text-warning">
          Vui lòng chọn đúng loại tài khoản, mỗi số điện thoại chỉ có thể đăng ký một tài khoản.{" "}
        </p>
      </div>

      <div className="mx-12 md:mx-16 lg:mx-24 flex justify-center absolute left-0 right-0 bottom-0 py-custom bg-white-color">
        <button
          onClick={() => accountType && onSubmit(accountType)}
          className={`btn-primary ${!accountType ? "btn-disabled" : ""}`}
        >
          Xác nhận
        </button>
      </div>
    </div>
  )
}

export { AccountTypeForm }
