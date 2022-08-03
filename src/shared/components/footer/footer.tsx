import { bctImg, FacebookIcon, LogoIcon, paymentMehods, TiktokIcon, YoutubeIcon } from "@/assets"
import Image from "next/image"
import Link from "next/link"

const Footer = () => {
  return (
    <footer className="py-[40px] lg:py-[80px]">
      <div className="container">
        <div className="grid grid-col-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-[40px]">
          <div className="">
            <Link passHref href="/">
              <LogoIcon className="mb-[24px] cursor-pointer h-[40px] w-[72px] lg:h-[50px] lg:w-[90px]" />
            </Link>
            <div className="">
              <p className="text-14 sm:text-16 font-bold mb-[16px]">Kết nối với chúng tôi</p>

              <p className="flex items-center">
                <a
                  className="mr-[20px]"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.facebook.com/satavancom"
                >
                  <FacebookIcon className="" />
                </a>
                <a
                  className="mr-[20px]"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.youtube.com/channel/UCiiDiJ6Zmuwdhvej9XFvEFA"
                >
                  <YoutubeIcon />
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.youtube.com/channel/UCiiDiJ6Zmuwdhvej9XFvEFA"
                >
                  <TiktokIcon />
                </a>
              </p>
            </div>
          </div>

          {[
            {
              heading: "Về chúng tôi",
              child: [
                { label: "Hướng dẫn", path: "/guide" },
                { label: "Chính sách & quy định", path: "/terms-&-conditions " },
                { label: "Quy chế hoạt động", path: "/regulations" },
                { label: "Tin tức", path: "/news" },
              ],
            },
            {
              heading: "Khách hàng",
              child: [
                { label: "Tải ứng dụng Customer", path: "/" },
                { label: "Thông tin mới nhất", path: "/" },
                { label: "Vận chuyển", path: "/" },
                { label: "Câu hỏi thường gặp", path: "/q&a " },
              ],
            },
            {
              heading: "Tài xế",
              child: [
                { label: "Tải ứng dụng Driver", path: "/" },
                { label: "Chương trình thưởng", path: "/guide" },
                { label: "Chương trình đặc biệt", path: "/" },
                { label: "Câu hỏi thường gặp", path: "/q&a " },
              ],
            },
          ].map((item, index) => (
            <div key={index} className="">
              <p
                className={`mb-[16px] md:mb-[24px] leading-[26px] text- font-bold ${
                  item.heading === "Về chúng tôi" ? "text-primary" : "text-gray-color-4"
                }`}
              >
                {item.heading}
              </p>

              <ul>
                {item.child.map((_item, index) => (
                  <li
                    className={`${
                      item.heading === "Về chúng tôi" ? "mb-[12px] lg:mb-24" : "mb-8 lg:mb-[12px]"
                    } last:mb-0`}
                    key={index}
                  >
                    <Link href={_item.path}>
                      <a
                        className={`leading-[26px] text-14 ${
                          item.heading === "Về chúng tôi"
                            ? "text-primary font-semibold text-14 sm:text-16 leading-[20px]"
                            : "text-gray-color-4 font-[400]"
                        }`}
                      >
                        {_item.label}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="my-[48px] border-b border-solid border-border-color"></div>

        <div className="">
          <div className="mb-[16px]">
            <Link href="/">
              <a className="text-sm font-bold leading-[16px]">Công ty cổ phần EXXE.VN</a>
            </Link>
          </div>

          <div className="flex items-center flex-col md:flex-row mb-[40px]">
            <div className="flex-[2] mb-[16px] md:mb-0">
              <div className="">
                <p className="text-sm">
                  Địa chỉ: Số 2 đường Hoàng Thế Thiện, Phường An Lợi Đông, Thành phố Thủ Đức, Thành
                  phố Hồ Chí Minh, Việt Nam. Số đăng ký kinh doanh: 0317412411. Ngày cấp:
                  01/08/2022. Nơi cấp: Sở Kế hoạch và đầu tư Thành phố Hồ Chí Minh
                </p>
              </div>
            </div>

            <div className="flex-1">
              <div className="relative w-[211px] h-[80px] ml-auto">
                <Image src={paymentMehods} alt="" layout="fill" objectFit="contain" />
              </div>
            </div>
          </div>

          <div className="flex md:items-center md:justify-between flex-col md:flex-row">
            <div className="">
              <p className="text-12 sm:text-14 text-border-color-2 mb-24 md:mb-0">
                © 2022 Công ty Cổ Phần Exxe.Vn
              </p>
            </div>

            {/* <div className="flex items-center justify-between">
              <Link href="/">
                <a className="mr-24 text-12 sm:text-14 font-normal text-border-color-2 text-normal">
                  Privacy policy
                </a>
              </Link>

              <Link href="/">
                <a className="text-12 sm:text-14 font-normal text-border-color-2">
                  Term & Conditions
                </a>
              </Link>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  )
}

export { Footer }
