import { guide1, guide2, guide3, guide4, guide5 } from "@/assets"
import Fade from "react-reveal"
import { GuideItem } from "./guideItem"

export const CustomerGuide = () => {
  return (
    <div className="">
      {[
        {
          icon: guide1,
          label: "Đăng ký tài khoản",
          desc: `Đăng nhập vào Mioto qua Facebook, Google, số điện thoại hoặc email của bạn. Chúng
            tôi cần bạn xác thực số điện thoại trước khi đặt xe.`,
          reverse: false,
        },
        {
          icon: guide2,
          label: "Đặt chuyến xe",
          desc: `Bạn có thể tìm xe ưng ý nhanh chóng ở nơi bạn muốn tìm, thời gian, hãng xe, đặt xe
          nhanh`,
          reverse: true,
        },
        {
          icon: guide3,
          label: "Kiểm tra và xác nhận",
          desc: `Đăng nhập vào Mioto qua Facebook, Google, số điện thoại hoặc email của bạn. Chúng
          tôi cần bạn xác thực số điện thoại trước khi đặt xe.`,
          reverse: false,
        },
        {
          icon: guide4,
          label: "Chọn phương thức thanh toán",
          desc: `Bạn có thể tìm xe ưng ý nhanh chóng ở nơi bạn muốn tìm, thời gian, hãng xe, đặt xe
          nhanh`,
          reverse: true,
        },
        {
          icon: guide5,
          label: "Hoàn tất đặt chuyến và trải nghiệm",
          desc: `Đăng nhập vào Mioto qua Facebook, Google, số điện thoại hoặc email của bạn. Chúng
          tôi cần bạn xác thực số điện thoại trước khi đặt xe.`,
          reverse: false,
        },
      ].map((item, index) => (
        <div key={index} className="mb-[80px]">
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
