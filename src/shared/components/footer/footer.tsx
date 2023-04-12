import {
  customerAppQR,
  driverAppQR,
  FacebookIcon,
  LogoIcon,
  paymentMehods,
  TiktokIcon,
  YoutubeIcon,
  ZaloIcon
} from '@/assets'
import { ADDRESS, PHONE } from '@/helper'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const Footer = () => {
  const [isMacOs] = useState(
    (navigator?.platform || '')?.toLowerCase?.()?.includes('mac')
  )

  return (
    <footer className="py-[40px] lg:py-[80px] bg-bg-primßary">
      <div className="container">
        <div className="lg:flex">
          <div className="w-fit lg:w-[25%] lg:mr-[40px] mb-[40px] xs:flex items-center lg:block">
            <div className="w-[120px] mb-24 xs:mb-0 lg:mb-[24px] md:w-auto mr-[32px] sm:mr-[64px] md:mr-[32px] lg:mr-0">
              <Link href="/">
                <a href="cursor-pointer">
                  <LogoIcon className="h-[75px] w-[80px] md:w-[80px] md:h-[75px]" />
                </a>
              </Link>
            </div>
            <div className="">
              <p className="text-14 font-bold mb-12">Kết nối với chúng tôi</p>
              <p className="flex items-center">
                <a
                  className="mr-[20px]"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.facebook.com/exxevnvn?gidzl=071XJTkMGmG1QcLFseX20GPjOKt5taC56pjY6P3RGrmPEp54bzaHM4e-O4IJtqSBIZLXHM7jqXTztvD41G"
                >
                  <FacebookIcon />
                </a>
                <a
                  className="mr-[20px]"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.youtube.com/channel/UCXLtYXa0ZHOEqH2XWVAUT5Q"
                >
                  <YoutubeIcon />
                </a>
                <a
                  className="mr-[20px]"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.tiktok.com/@exxe_vn"
                >
                  <TiktokIcon />
                </a>
                <a
                  target="_blank"
                  href="https://zalo.me/3801559271739080296?gidzl=93_XPbUrZZqb9ULaLgk9E2ScvcHCheuoEYVWEnx_t6Di9Rvj7lZJEc9rlp55_jnlC2InD655lbflKx29F0"
                  rel="noopener noreferrer"
                >
                  <ZaloIcon className="w-[23px]" />
                </a>
              </p>
            </div>
          </div>

          <div className="lg:w-[75%] grid grid-col-1 md:grid-cols-3 gap-24 lg:gap-[40px]">
            {[
              {
                heading: 'Về chúng tôi',
                child: [
                  { label: 'Giới thiệu về Exxe', path: '/about-us' },
                  { label: 'Nguyên tắc cộng đồng', path: '/terms-&-conditions' },
                  { label: 'Quy chế hoạt động', path: '/terms-&-conditions' },
                  { label: 'Phạt vi phạm và bồi thường', path: '/terms-&-conditions' },
                  { label: 'Hóa đơn dịch vụ vận tải', path: '/terms-&-conditions' },
                  { label: 'Tỉ lệ phân chia và hợp tác', path: '/terms-&-conditions' },
                  { label: 'Giải quyết khiếu nại', path: '/terms-&-conditions' },
                  { label: 'Tin tức', path: '/news' }
                ]
              },
              {
                heading: 'Khách hàng',
                child: [
                  {
                    label: '',
                    image: customerAppQR,
                    path: '/'
                  },
                  {
                    label: 'Ứng dụng Exxe Customer',
                    path: '',
                    url: isMacOs
                      ? process.env.NEXT_PUBLIC_CUSTOMER_APP_IOS_URL
                      : process.env.NEXT_PUBLIC_CUSTOMER_APP_ANDROID_URL
                  },
                  { label: 'Hướng dẫn đăng kí Khách hàng', path: '/guide?type=customer' },
                  { label: 'Hướng dẫn đặt xe', path: '/guide?type=customer' },
                  { label: 'Hướng dẫn thanh toán', path: '/guide?type=customer' },
                  { label: 'Câu hỏi thường gặp', path: '/q&a' }
                ]
              },
              {
                heading: 'Tài xế',
                child: [
                  {
                    label: '',
                    image: driverAppQR,
                    path: '/'
                  },
                  {
                    label: 'Tải ứng dụng Exxe Driver',
                    path: '/',
                    url: isMacOs
                      ? process.env.NEXT_PUBLIC_DRIVER_APP_IOS_URL
                      : process.env.NEXT_PUBLIC_DRIVER_APP_ANDROID_URL
                  },
                  { label: 'Hướng dẫn đăng kí Tài xế ', path: '/guide?type=driver' },
                  { label: 'Hướng dẫn sử dụng tài khoản', path: '/guide?type=driver' },
                  { label: 'Các chương trình thưởng', path: '/promotion' }
                ]
              }
            ].map((item, index) => (
              <div key={index} className="flex flex-col xs:flex-row md:flex-col">
                <p
                  className={`mb-16 xs:w-[120px] md:w-auto xs:mr-32 sm:mr-[64px] md:mr-0 md:mb-[24px] leading-[26px] text-base font-semibold text-blue-8`}
                >
                  {item.heading}
                </p>

                <ul className="xs:flex-1 sm:flex-auto">
                  {item.child.map((_item, index) => (
                    <li className={`mb-8 lg:mb-[12px] last:mb-0`} key={index}>
                      {_item.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img className="w-[100px] h-[100px]" src={_item.image} alt="" />
                      ) : _item.url ? (
                        <Link href={_item.url}>
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`leading-[26px] text-14 text-blue-8 hover:underline hover:text-primary`}
                          >
                            {_item.label}
                          </a>
                        </Link>
                      ) : (
                        <Link href={_item.path}>
                          <a className={`leading-[26px] text-14 text-blue-8`}>
                            {_item.label}
                          </a>
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="my-24 md:my-[48px] border-b border-solid border-border-color-2"></div>

        <div className="">
          <div className="mb-16">
            <Link href="/">
              <a className="text-sm font-bold leading-16 text-primary">
                Công ty Cổ phần đầu tư công nghệ và vận tải ExxeVN
              </a>
            </Link>
          </div>

          <div className="flex items-center flex-col md:flex-row mb-[40px]">
            <div className="flex-[2] mb-16 md:mb-0">
              <div className="">
                <p className="text-12 leading-[20px] sm:text-14 sm:leading-26 font-normal text-blue-8">
                  MST: 0317412411
                  <br />
                  Địa chỉ: {ADDRESS}
                  <br />
                  Số điện thoại: {PHONE}
                </p>
              </div>
            </div>

            <div className="flex-1"></div>
          </div>

          <div className="flex flex-col-reverse items-center sm:flex-row sm:justify-between">
            <div className="">
              <p className="text-12 sm:text-14 text-gray-color-8 md:mb-0">
                © 2022 Exxe.Vn. All Rights Reserved. 2022
              </p>
            </div>

            <div className="relative w-[211px] h-[40px] mb-12">
              <Image src={paymentMehods} alt="" layout="fill" objectFit="contain" />
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
