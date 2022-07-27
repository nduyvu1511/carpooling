import { ChangePasswordForm, CreatePasswordForm, InputLoading } from "@/components"
import { usePassword } from "@/hooks"
import { AccountLayout, AuthLayout } from "@/layout"
import { useRef } from "react"

type OnResetParams = {
  onReset: () => void
}

const Password = () => {
  const childRef = useRef<OnResetParams>(null)
  const { data: hasPassword, createPassword, changePassword, isValidating } = usePassword(true)

  return (
    <AuthLayout>
      <AccountLayout title={!hasPassword ? "Tạo mật khẩu" : "Đổi mật khẩu"}>
        <div className="content-container flex-1 bg-white-color min-h-[calc(100vh-140px)] h-screen px-[16px]">
          {isValidating ? (
            <div className="">
              <InputLoading />
              <InputLoading />
              <InputLoading />
            </div>
          ) : (
            <>
              {hasPassword ? (
                <ChangePasswordForm
                  ref={childRef}
                  onSubmit={(data) =>
                    changePassword({
                      ...data,
                      handleSuccess: () => {
                        childRef.current?.onReset()
                      },
                    })
                  }
                />
              ) : (
                <CreatePasswordForm
                  ref={childRef}
                  onSubmit={(data) =>
                    createPassword({
                      ...data,
                      handleSuccess: () => {
                        childRef.current?.onReset()
                      },
                    })
                  }
                />
              )}
            </>
          )}
        </div>
      </AccountLayout>
    </AuthLayout>
  )
}

export default Password
