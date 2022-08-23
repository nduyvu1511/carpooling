import {
  commingSoon,
  FacebookIcon,
  LogoIcon,
  MailIcon,
  PhoneIcon,
  TiktokIcon,
  YoutubeIcon,
} from "@/assets"
import { EMAIL, PHONE } from "@/helper"
import Image from "next/image"

export const ComingSoon = () => {
  return (
    <section className="container pt-24 min-h-screen flex flex-col">
      <div className="flex-center mb-[54px]">
        <LogoIcon />
      </div>

      <div className="flex flex-col md:flex-row flex-1">
        <div className="flex-center flex-col text-center md:text-left flex-1">
          <h1 className="h1 text-primary font-semibold mb-[40px]">
            Trang web đang được hoàn thiện!
          </h1>

          <form className="w-full flex flex-col items-center md:items-start">
            <label htmlFor="input" className="text-sm text-gray-color-5 mb-16 inline-block">
              Đăng ký để nhận thông báo
            </label>
            <div className="flex flex-col md:flex-row md:h-[60px] lg:h-[70px] max-w-[470px] w-full">
              <input
                type="email"
                placeholder="Email"
                className="flex-1 mb-12 md:mb-0 h-full form-input md:rounded-tr-none md:rounded-br-none text-base"
                id="input"
              />
              <button className="btn-primary mx-auto md:rounded-tl-none md:rounded-bl-none h-full px-[64px]">
                Gửi
              </button>
            </div>
          </form>
        </div>

        <div className="flex-1 relative min-h-[242px]">
          <Image src={commingSoon} alt="" layout="fill" objectFit="contain" />
        </div>
      </div>

      <div className="py-[40px]">
        <div className="flex flex-col md:flex-row items-center">
          <div className="mb-12 md:mb-0">
            <p className="text-sm text-gray-color-5 mb-16">Theo dõi EXXE tại</p>
            <ul className="flex items-center">
              <li className="mr-16">
                <FacebookIcon />
              </li>
              <li className="mr-16">
                <YoutubeIcon />
              </li>

              <li className="">
                <TiktokIcon />
              </li>
            </ul>
          </div>
          <div className="flex flex-1 flex-col md:flex-row items-center justify-center">
            <p className="flex items-center justify-center mb-12 md:mb-0">
              <PhoneIcon className="mr-8" />
              <a className="text-sm md:text-base font-semibold" href={`tel:${PHONE}`}>
                0847 878 788
              </a>
            </p>

            <p className="mx-24 border-r border-solid border-border-color"></p>

            <p className="flex items-center justify-center">
              <MailIcon className="mr-8" />
              <a className="text-sm md:text-base font-semibold" href={`mailto:${EMAIL}`}>
                {EMAIL}
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
