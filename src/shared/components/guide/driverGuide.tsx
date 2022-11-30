import { driverImage, guide1, guide2, guide3, guide4 } from "@/assets"
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
            "Đối tác vui lòng truy cập vào website Exxe.vn chọn đăng kí để đăng kí tài khoản",
            "Vui lòng cung cấp đầy đủ thông tin giấy tờ theo yêu cầu, bộ phận nhân sự của EXXE sẽ xác minh và khi đó tài khoản của bạn sẽ hoạt động",
          ],
          reverse: false,
        },
        {
          icon: guide2,
          label: "Đặt chuyến",
          desc: [
            "Tài xế có thể chọn những chuyến xe có sẵn hoặc tự tạo cuốc tiện chuyến",
            "Nếu đặt cuốc tiện chuyến, hãy điền đầy đủ thông tin như yêu cầu",
          ],
          reverse: true,
        },
        {
          icon: guide3,
          label: "Kiểm tra và xác nhận",
          desc: [
            `Vui lòng kiểm tra lại thông tin chuyến đi lại một lần trước khi đến bước tiếp theo`,
          ],
          reverse: false,
        },
        {
          icon: guide4,
          label: "Chọn phương thức thanh toán",
          desc: [`Đối tác chọn loại hình thanh toán mong muốn và đặt cọc chuyến đi`],
          reverse: true,
        },
        {
          icon: driverImage,
          label: "Hoàn thành",
          desc: [
            `EXXE sẽ thông báo đến bạn thông tin hành khách, đối tác vui lòng liên hệ với khách hàng trong thời gian sớm nhất để thống nhất về chuyến đi`,
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
