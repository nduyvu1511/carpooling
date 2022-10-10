import { ChangePasswordForm, CreatePasswordForm, InputLoading, Seo } from "@/components"
import { usePassword } from "@/hooks"
import { AccountLayout, AuthLayout } from "@/layout"
import { OnResetParams } from "@/models"
import { userApi } from "@/services"
import { useRef } from "react"

const Password = () => {
  const childRef = useRef<OnResetParams>(null)
  const { data: hasPassword, createPassword, changePassword, isValidating } = usePassword(true)

  return (
    <AuthLayout headerClassName="hidden lg:flex">
      <Seo description="Mật khẩu" thumbnailUrl="" title="Đổi mật khẩu" url="password" />
      <AccountLayout title={!hasPassword ? "Tạo mật khẩu" : "Đổi mật khẩu"}>
        <div className="content-container px-custom flex-1 pb-[64px] md:pb-0">
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
                      handleSuccess: (data) => {
                        childRef.current?.onReset()
                        console.log(data)
                        // userApi.setToken(data.token)
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
