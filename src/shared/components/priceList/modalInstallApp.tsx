/* eslint-disable @next/next/no-img-element */
import { customerAppQR, driverAppQR } from "@/assets"
import Link from "next/link"
import { Modal, ModalProps } from "../modal"

interface ModalInstallAppProps extends Partial<ModalProps> {
  onClose: () => void
}

export const ModalInstallApp = ({ onClose, show }: ModalInstallAppProps) => {
  return (
    <Modal
      className="w-[320px] h-fit sm:w-[500px] sm:h-fit rounded-[30px] sm:rounded-[30px] price-list-modal"
      heading="Cài ứng dụng ExxeVn"
      show={show}
      onClose={onClose}
    >
      <div className="p-16 md:p-32">
        <p className="text-14 md:text-16 font-semibold text-center">
          Đăng nhập/Đăng ký để đặt chuyến xe
        </p>

        <div className="flex items-center justify-center my-12 md:my-24">
          <span className="border-b border-solid border-border-color-1 flex-1 max-w-[100px]"></span>
          <span className="text-12 md:text-14 font-semibold text-gray-color-3 mx-8">Hoặc</span>
          <span className="border-b border-solid border-border-color-1 flex-1 max-w-[100px]"></span>
        </div>

        <p className="text-14 md:text-16 font-semibold text-center mb-16">Cài đặt ứng dụng</p>

        <div className="grid grid-cols-2 gap-24 mb-32">
          <Link passHref href={process.env.NEXT_PUBLIC_CUSTOMER_APP_URL as string}>
            <a target="_blank" rel="noopener noreferrer">
              <div className="flex-center flex-col">
                <img src={customerAppQR} alt="" />
                <p className="text-xs md:text-sm mt-8 text-center">Dành cho khách hàng</p>
              </div>
            </a>
          </Link>
          <Link passHref href={process.env.NEXT_PUBLIC_DRIVER_APP_URL as string}>
            <a target="_blank" rel="noopener noreferrer">
              <div className="flex-center flex-col">
                <img src={driverAppQR} alt="" />
                <p className="text-xs md:text-sm mt-8 text-center">Dành cho tài xế</p>
              </div>
            </a>
          </Link>
        </div>

        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="btn-primary w-fit sm:w-fit rounded-[30px] sm:rounded-[30px]"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </Modal>
  )
}
