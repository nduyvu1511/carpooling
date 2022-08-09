import { driverImage, guide1, guide2, guide3, guide4, guide5 } from "@/assets"
import Fade from "react-reveal"
import { GuideItem } from "./guideItem"

export const DriverGuide = () => {
  return (
    <div className="">
      {[
        {
          icon: guide1,
          label: "Đăng ký",
          desc: [
            `Đối tác tải ứng dụng về thiết bị, kích hoạt ứng dụng và chọn đăng kí tài khoản. Đối tác tài xế cung cấp đầy đủ giấy tờ pháp lý để hoàn thành đăng kí tài khoản`,
          ],
          reverse: false,
        },
        {
          icon: guide2,
          label: "Đặt chuyến",
          desc: [
            `Đối tác lựa chọn chuyến xe có sẵn hoặc tạo chuyến mới, tài xế cung cấp đầy đủ thông tin của chuyến đi.`,
          ],
          reverse: true,
        },
        {
          icon: guide3,
          label: "Kiểm tra và xác nhận",
          desc: [`Đối tác kiểm tra lại thông tin chuyến đi`],
          reverse: false,
        },
        {
          icon: guide4,
          label: "Chọn phương thức thanh toán",
          desc: [`Đối tác lựa chọn phương thức thanh toán mong muốn.`],
          reverse: true,
        },
        {
          icon: driverImage,
          label: "Hoàn thành",
          desc: [
            `Đăng nhập vào Exxe qua Facebook, Google, số điện thoại hoặc email của bạn. Chúng
          tôi cần bạn xác thực số điện thoại trước khi đặt xe.`,
          ],
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
