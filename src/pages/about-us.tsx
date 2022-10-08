/* eslint-disable @next/next/no-img-element */
import { bg2 } from "@/assets"
import { Seo } from "@/components"
import { ADDRESS } from "@/helper"
import { StaticLayout } from "@/layout"

const AboutUs = () => {
  return (
    <StaticLayout
      sticky
      heading="Giải pháp đặt xe đường dài chuyên nghiệp"
      subHeading="Về chúng tôi"
    >
      <Seo
        description="Công ty Cổ phần Đầu Tư Công Nghệ và Vận Tải ExxeVn hoạt động trên nền tảng ứng dụng cho thuê xe có tài xế 4-7-16 chỗ, theo mô hình kinh tế chia sẻ trực tuyến. Ra đời vào cuối năm 2022, Exxe mong muốn cung cấp dịch vụ Di chuyển đường dài và các hình thức đa dạng nhằm mang đến những trải nghiệm tốt nhất cho cả khách hàng và cả đối tác của Exxe. Sứ mệnh"
        thumbnailUrl=""
        title="Về chúng tôi"
        url="news"
      />
      <div className="mb-[40px]">
        <p className="text-14 font-medium md:text-16 leading-[26px]">
          Ứng dụng <span className="font-semibold">ExxeVn</span> là ứng dụng thương mại điện tử trên
          thiết bị di động do{" "}
          <span className="uppercase text-blue-7">
            Công ty Cổ phần Đầu Tư Công Nghệ và Vận Tải ExxeVn
          </span>{" "}
          <span className="font-semibold">MST: 0317412411</span>. Địa chỉ: {ADDRESS} Việt Nam (sau
          đây gọi là: <span className="uppercase text-blue-7">Exxe</span>), thiết lập, quản lý vận
          tải cho các tổ chức, cá nhân khác hoạt động phù hợp với quy định của pháp luật hiện hành.
        </p>
      </div>

      <div className="">
        <div className="mb-[40px]">
          <img src={bg2} className="w-full h-auto" alt="" />
        </div>

        <div className="">
          <p className="text-14 md:text-16 mb-24 leading-[26px] font-medium">
            Exxe được thành lập với sứ mệnh mang đến nền tảng công nghệ hiện đại kết nối tài xế xe ô
            tô và hành khách theo cách <span className="uppercase text-blue-7">Tiết Kiệm Nhất</span>
            , <span className="uppercase text-blue-7">Nhanh Nhất</span> và{" "}
            <span className="uppercase text-blue-7">An Toàn Nhất.</span>
          </p>

          <p className="text-14 md:text-16 leading-[26px] font-medium mb-24">
            Exxe ra đời mang trên mình trách nhiệm giải quyết những vấn đề hiện tại trong xã hội như
            giá nhiên liệu tăng cao, tiếp cận công nghệ khó khăn, thời gian kém linh hoạt khi có nhu
            cầu đi lại của hành khách. Mang trong mình sự nhiệt huyết, quyết liệt và nhạy bén, chúng
            tôi luôn ý thức rằng khách hàng và đối tác là trọng tâm, do đó mang lại những lợi ích
            chung là điều mà chúng tôi đang phát triển.
          </p>

          <p className="text-14 md:text-16 leading-[26px] font-medium">
            Ngoài ra, Exxe hướng tới việc xây dựng một cộng đồng chia sẻ chuyến đi văn minh với
            nhiều tiện ích thông qua ứng dụng trên di động, nhằm nâng cao chất lượng cuộc sống và
            tiết kiệm cho cộng đồng.
          </p>
        </div>
      </div>
    </StaticLayout>
  )
}

export default AboutUs
