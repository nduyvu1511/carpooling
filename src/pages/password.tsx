import { ChangePasswordForm, CreatePasswordForm, InputLoading, Seo } from "@/components"
import { usePassword } from "@/hooks"
import { AccountLayout, AuthLayout } from "@/layout"
import { useRouter } from "next/router"
import { useSelector } from "react-redux"
import { RootState } from "../core"

const Password = () => {
  const router = useRouter()
  const car_account_type = useSelector(
    (state: RootState) => state.userInfo.userInfo?.car_account_type
  )
  const { data: hasPassword, createPassword, changePassword, isValidating } = usePassword(true)

  const redirect = () => {
    router.push(`${car_account_type === "customer" ? "/c/account" : "/d/account"}`)
  }

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
                  onSubmit={(data) =>
                    changePassword({
                      ...data,
                      handleSuccess: redirect,
                    })
                  }
                />
              ) : (
                <CreatePasswordForm
                  onSubmit={(data) =>
                    createPassword({
                      ...data,
                      handleSuccess: redirect,
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
