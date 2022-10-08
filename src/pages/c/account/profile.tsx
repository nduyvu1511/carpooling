import { Profile, Seo } from "@/components"
import { CustomerAccountLayout } from "@/layout"

const ProfilePage = () => {
  return (
    <>
      <CustomerAccountLayout
        title="Hồ sơ cá nhân"
        desc="Quản lý thông tin hồ sơ để bảo mật tài khoản"
      >
        <Seo
          description="Thông tin cá nhân"
          thumbnailUrl=""
          title="Thông tin cá nhân"
          url="c/account/profile"
        />
        <div className="content-container px-12 md:px-0 pb-[64px] md:pb-0">
          <Profile type="customer" />
        </div>
      </CustomerAccountLayout>
    </>
  )
}

export default ProfilePage
