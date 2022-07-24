import { bctImg, FacebookIcon, LogoIcon, YoutubeIcon } from "@/assets"
import Image from "next/image"
import Link from "next/link"

const Footer = () => {
  return (
    <footer className="py-[80px]">
      <div className="container">
        <div className="grid grid-col-1 sm:grid-cols-3 md:grid-cols-4 gap-[40px]">
          <div className="">
            <Link passHref href="/">
              <LogoIcon className="mb-[24px] cursor-pointer w-[130px] h-[80px]" />
            </Link>
            <div className="">
              <p className="text-base mb-[16px]">Kết nối với chúng tôi</p>

              <p className="flex items-center">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.facebook.com/satavancom"
                >
                  <FacebookIcon className="mr-[20px]" />
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.youtube.com/channel/UCiiDiJ6Zmuwdhvej9XFvEFA"
                >
                  <YoutubeIcon />
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
                { label: "Quy chế hoạt động", path: "/" },
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
                className={`font-[700] mb-[16px] md:mb-[24px] leading-[26px] text-16 ${
                  item.heading === "Về chúng tôi" ? "text-primary" : "text-gray-color-4"
                }`}
              >
                {item.heading}
              </p>

              <ul>
                {item.child.map((_item, index) => (
                  <li
                    className={`last:mb-0 ${
                      item.heading === "Về chúng tôi" ? "mb-24" : "mb-[12px]"
                    }`}
                    key={index}
                  >
                    <Link href={_item.path}>
                      <a
                        className={`leading-[26px] text-14 ${
                          item.heading === "Về chúng tôi"
                            ? "text-primary font-semibold text-16 leading-[20px]"
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

        <div className="my-[48px] border border-solid border-border-color"></div>

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
                  Địa chỉ: Số 10 S5, Villa Saroma, Phường An Lợi Đông, Quận 2, TPHCM. Số đăng ký
                  kinh doanh: 0109832983. Ngày cấp: 25/11/2021. Nơi cấp: Sở Kế hoạch và đầu tư Hà
                  Nội
                </p>
              </div>
            </div>

            <div className="flex-1">
              <div className="relative w-[211px] h-[80px] ml-auto">
                <Image src={bctImg} alt="" layout="fill" objectFit="cover" />
              </div>
            </div>
          </div>

          <div className="flex md:items-center md:justify-between flex-col md:flex-row">
            <div className="">
              <p className="text-sm text-gray-color-5 mb-24 md:mb-0">
                © 2022 Công ty Cổ Phần Exxe.Vn
              </p>
            </div>

            <div className="flex items-center">
              <Link href="/">
                <a className="mr-24 text-sm font-normal text-gray-color-5 text-normal">
                  Privacy policy
                </a>
              </Link>

              <Link href="/">
                <a className="text-sm font-normal text-gray-color-5">Term & Conditions</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export { Footer }
