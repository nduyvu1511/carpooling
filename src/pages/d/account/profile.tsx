import { Profile } from "@/components"
import { DriverAccountLayout } from "@/layout"

const ProfilePage = () => {
  return (
    <>
      <DriverAccountLayout
        title="Hồ sơ cá nhân"
        desc="Quản lý thông tin hồ sơ để bảo mật tài khoản"
      >
        <div className="content-container px-16 md:px-0">
          <Profile type="car_driver" />
        </div>
      </DriverAccountLayout>
    </>
  )
}

export default ProfilePage
