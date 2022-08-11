import { ContactForm, Map, Seo } from "@/components"
import { StaticLayout } from "@/layout"

const Contact = () => {
  return (
    <StaticLayout bg="contact">
      <Seo
        description="Liên hệ với chúng tôi"
        thumbnailUrl=""
        title="Liên hệ"
        url="https://exxe.vn/contact"
      />
      <div className="flex flex-col md:flex-row mb-[80px]">
        <div className="flex-1 mb-24 md:mb-0 md:mr-24 flex flex-col items-center md:items-start">
          <h4 className="h4 mb-[40px] text-blue-7 font-semibold md:font-medium">
            Công ty cổ phần EXXE.VN
          </h4>
          <p className="flex md:block items-center sm:items-start flex-col sm:flex-row mb-12 md:mb-[16px]">
            <span className="text-[10px] sm:text-base whitespace-nowrap mr-[3px]">Địa chỉ: </span>
            <span className="text-sm md:text-base text-center md:text-left">
              Số 10 S5, Villa Saroma, Phường An Lợi Đông, Quận 2, TPHCM
            </span>
          </p>
          <p className="flex md:block items-center sm:items-start flex-col sm:flex-row mb-12 md:mb-[16px]">
            <span className="text-[10px] sm:text-base whitespace-nowrap mr-[3px]">
              Điện thoại:{" "}
            </span>
            <a href="tel:1900998880" className="text-sm md:text-base">
              1900998880
            </a>
          </p>
          <p className="flex md:block items-center sm:items-start flex-col sm:flex-row mb-12 md:mb-[16px]">
            <span className="text-[10px] sm:text-base whitespace-nowrap mr-[3px]">Email: </span>
            <a href="mailto:exxevn2022@gmail.com" className="text-sm md:text-base text-primary">
              exxevn2022@gmail.com
            </a>
          </p>
        </div>
        <div className="flex-1">
          <ContactForm />
        </div>
      </div>

      <div className="">
        <div className="h-[400px]">
          <Map viewOnly />
        </div>
      </div>
    </StaticLayout>
  )
}

export default Contact
