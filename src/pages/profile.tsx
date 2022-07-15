import { Profile } from "@/components"
import { AccountLayout, AuthLayout } from "@/layout"

const ProfilePage = () => {
  return (
    <AuthLayout>
      <AccountLayout title="Hồ sơ cá nhân" desc="Quản lý thông tin hồ sơ để bảo mật tài khoản">
        <div className="content-container">
          <Profile />
        </div>
      </AccountLayout>
    </AuthLayout>
  )
}

export default ProfilePage
