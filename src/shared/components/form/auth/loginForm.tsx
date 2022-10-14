import { FORM_LOGIN_KEY, getFromLocalStorage, loginSchema, setToLocalStorage } from "@/helper"
import { LoginFormParams } from "@/models"
import { yupResolver } from "@hookform/resolvers/yup"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { InputField } from "../fields"

interface LoginFormProps {
  onSubmit?: (data: LoginFormParams) => void
  onClickResetPassword?: Function
  onClickLoginSMS?: Function
  onClickRegister?: Function
  view?: "page" | "modal"
}

export const LoginForm = ({
  onSubmit,
  onClickResetPassword,
  onClickLoginSMS,
  onClickRegister,
  view = "page",
}: LoginFormProps) => {
  const formStorage = getFromLocalStorage(FORM_LOGIN_KEY)

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<LoginFormParams>({
    resolver: yupResolver(loginSchema),
    mode: "all",
    defaultValues: {
      phone: formStorage?.phone || "",
      password: formStorage?.password || "",
    },
  })

  useEffect(() => {
    ;(document.querySelector(".form-input") as HTMLInputElement)?.focus()
  }, [])

  const onSubmitHandler = (data: LoginFormParams) => {
    const { password, phone } = data
    onSubmit && onSubmit(data)
    setToLocalStorage(FORM_LOGIN_KEY, { phone, password })
  }

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <InputField
        required
        inputMode="numeric"
        type="number"
        label="Số điện thoại"
        placeholder="Số điện thoại"
        control={control}
        name="phone"
      />

      <InputField
        required
        type="password"
        placeholder="Mật khẩu"
        label="Mật Khẩu"
        control={control}
        name="password"
      />

      <div className="flex items-center justify-between text-[12px] text-primary font-medium mb-[40px]">
        <span
          onClick={() => onClickResetPassword && onClickResetPassword()}
          className="cursor-pointer"
        >
          Quên mật khẩu?
        </span>
        <span onClick={() => onClickLoginSMS && onClickLoginSMS()} className="cursor-pointer">
          Đăng nhập với SMS
        </span>
      </div>

      <div className="flex justify-center mb-[40px]">
        <button
          onClick={() => handleSubmit(onSubmitHandler)}
          className={`btn-primary ${!isValid ? "btn-disabled" : ""}`}
        >
          Xác nhận
        </button>
      </div>

      <div className="text-14 font-medium text-blue-8 leading-26 text-center">
        Bạn chưa có tài khoản?{" "}
        <a onClick={() => onClickRegister?.()} className="text-primary cursor-pointer">
          Đăng ký
        </a>
      </div>
    </form>
  )
}
