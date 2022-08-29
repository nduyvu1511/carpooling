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
          desc: [
            "Hành khách truy cập vào website Exxe.vn chọn đăng kí để đăng kí tài khoản",
            "Vui lòng cung cấp chính xác số điện thoại để EXXE gửi mã OTP xác nhận",
            "Số điện thoại sẽ là tài khoản của quý khách. Mỗi số điện thoại chỉ đăng kí được một tài khoản",
          ],
          reverse: false,
        },
        {
          icon: guide2,
          label: "Chọn chuyến xe",
          desc: [
            "Hành khách chọn hình thức di chuyển theo mong muốn : 1 chiều, 2 chiều, ghép chuyến.",
            "Điền đầy đủ thông tin chuyến đi theo form yêu cầu",
          ],
          reverse: true,
        },
        {
          icon: guide3,
          label: "Kiểm tra và xác nhận",
          desc: [
            "Quý khách vui lòng kiểm tra lại thông tin chuyến đi lại một lần trước khi đến bước tiếp theo",
          ],
          reverse: false,
        },
        {
          icon: guide4,
          label: "Chọn phương thức thanh toán",
          desc: ["Hành khách chọn loại hình thanh toán mong muốn và tiến hành đặt cọc chuyến đi"],
          reverse: true,
        },
        {
          icon: guide5,
          label: "Hoàn tất đặt chuyến và trải nghiệm",
          desc: [
            "Hãy đảm bảo rằng quý khách sẽ luôn sẵn sàng điện thoại để tài xế có thể sẽ liện lạc được",
          ],
          reverse: false,
        },
      ].map((item, index) => (
        <div key={index} className="mb-[32px] lg:mb-[40px] last:mb-0">
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
