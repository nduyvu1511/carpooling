import { driverImage, guide1, guide2, guide3, guide4, guide5 } from "@/assets"
import Fade from "react-reveal"
import { GuideItem } from "./guideItem"

export const CustomerGuide = () => {
  return (
    <div className="">
      {[
        {
          icon: guide1,
          label: "Đăng ký tài khoản",
          desc: `Hành khách tải ứng dụng ngay về điện thoại, kích hoạt ứng dụng. Tạo mới ( nếu chưa có ) hoặc đăng nhập vào tài khoản.`,
          reverse: false,
        },
        {
          icon: guide2,
          label: "Chọn chuyến xe",
          desc: `Hành khách chọn hình thức di chuyển phù hợp với nhu cầu nhất, Exxe sẽ yêu cầu hành khách nhập các thông tin của chuyến đi như điểm đón, điểm đến, loại xe,thời gian, yêu cầu...`,
          reverse: true,
        },
        {
          icon: guide3,
          label: "Kiểm tra và xác nhận",
          desc: `Hành khách kiểm tra lại thông tin chuyến đi và xác nhận đồng ý với các điều khoản của Exxe.`,
          reverse: false,
        },
        {
          icon: guide4,
          label: "Chọn phương thức thanh toán",
          desc: `Hành khách chọn phương thức thanh toán & số tiền sẽ đặt cọc giữ chỗ.`,
          reverse: true,
        },
        {
          icon: driverImage,
          label: "Hoàn tất đặt chuyến và trải nghiệm",
          desc: "Exxe sẽ kết nối với tài xế, hành khách trải nghiệm dịch vụ tuyệt vời cùng Exxe.",
          reverse: false,
        },
      ].map((item, index) => (
        <div key={index} className="mb-[32px] md:mb-[40px] lg:mb-[80px] last:mb-0">
          <Fade bottom delay={100}>
            <GuideItem
              index={index + 1}
              desc={item.desc}
              icon={item.icon}
              reverse={item.reverse}
              label={item.label}
            />
          </Fade>
        </div>
      ))}
    </div>
  )
}
