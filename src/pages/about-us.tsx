import { bg2 } from "@/assets"
import { Map, Seo } from "@/components"
import { StaticLayout } from "@/layout"
import Image from "next/image"

const AboutUs = () => {
  return (
    <StaticLayout
      sticky
      heading="Ứng dụng giải pháp đặt xe chuyên nghiệp"
      subHeading="Về chúng tôi"
    >
      <Seo
        description="Công ty Cổ phần Đầu Tư Công Nghệ và Vận Tải ExxeVn hoạt động trên nền tảng ứng dụng cho thuê xe có tài xế 4-7-16 chỗ, theo mô hình kinh tế chia sẻ trực tuyến. Ra đời vào cuối năm 2022, Exxe mong muốn cung cấp dịch vụ Di chuyển đường dài và các hình thức đa dạng nhằm mang đến những trải nghiệm tốt nhất cho cả khách hàng và cả đối tác của Exxe. Sứ mệnh"
        thumbnailUrl=""
        title="Về chúng tôi"
        url="https://exxe.vn/news"
      />
      <div className="mb-[40px]">
        <p className="text-sm md:text-base">
          Vì sao chúng ta không thể có những lựa chọn di chuyển an toàn hơn?”
        </p>
        <p className="text-sm md:text-base">
          “Liệu chúng ta có thể giúp các bác tài có điều kiện làm việc tốt hơn không?”
        </p>
        <p className="text-sm md:text-base">
          “Nếu như chúng ta có khả năng giúp cuộc sống này trở nên dễ dàng hơn một chút thì sao?”
        </p>
      </div>

      <div className="">
        <div className="relative aspect-[3/2] mb-[40px]">
          <Image src={bg2} layout="fill" alt="" objectFit="cover" />
        </div>

        <div className="">
          <p className="text-sm md:text-base mb-24">
            Công ty Cổ phần Đầu Tư Công Nghệ và Vận Tải ExxeVn hoạt động trên nền tảng ứng dụng cho
            thuê xe có tài xế 4-7-16 chỗ, theo mô hình kinh tế chia sẻ trực tuyến. Ra đời vào cuối
            năm 2022, Exxe mong muốn cung cấp dịch vụ Di chuyển đường dài và các hình thức đa dạng
            nhằm mang đến những trải nghiệm tốt nhất cho cả khách hàng và cả đối tác của Exxe. Sứ
            mệnh
          </p>
          <p className="text-sm md:text-base mb-24">
            Exxe được thành lập với sứ mệnh mang đến nền tảng công nghệ hiện đại kết nối tài xế xe ô
            tô và hành khách theo cách Tiết Kiệm Nhất, Nhanh Nhất và An Toàn Nhất.
          </p>
          <p className="text-sm md:text-base mb-24">
            Exxe ra đời mang trên mình trách nhiệm giải quyết những vấn đề hiện tại trong xã hội như
            giá nhiên liệu tăng cao, tiếp cận công nghệ khó khăn, thời gian kém linh hoạt khi có nhu
            cầu đi lại.
          </p>
          <p className="text-sm md:text-base">
            Exxe ra đời mang trên mình trách nhiệm giải quyết những vấn đề hiện tại trong xã hội như
            giá nhiên liệu tăng cao, tiếp cận công nghệ khó khăn, thời gian kém linh hoạt khi có nhu
            cầu đi lại.
          </p>
        </div>
      </div>
    </StaticLayout>
  )
}

export default AboutUs
