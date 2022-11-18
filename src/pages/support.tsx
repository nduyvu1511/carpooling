import { mapBanner } from "@/assets"
import { AuthHeader, Seo } from "@/components"
import { AccountLayout } from "@/layout"
import Image from "next/image"

const SupportPage = () => {
  return (
    <>
      <Seo title="Hỗ trợ" url="support" />
      <AuthHeader className="hidden lg:flex" />
      <main className="min-h-screen h-full bg-bg flex flex-col">
        <AccountLayout title="Hướng dẫn sử dụng">
          <div className="px-custom">
            <div className="flex flex-col items-center justify-center">
              <h3 className="text-lg">Tổng đài hỗ trợ 0847878788</h3>
              <input type="text" />
            </div>

            <div className="mb-24">
              <h3 className="text-xl mb-24">Giải pháp đặt xe đường dài chuyên nghiệp</h3>

              <p className="text-sm md:text-base mb-16">
                Ứng dụng ExxeVn là ứng dụng thương mại điện tử trên thiết bị di động do Công ty Cổ
                phần Đầu Tư Công Nghệ và Vận Tải ExxeVn MST: 0317412411. Địa chỉ: Số 10 S5, Villa
                Saroma, Phường An Lợi Đông, Quận 2, TPHCM Việt Nam (sau đây gọi là: Exxe), thiết
                lập, quản lý vận tải cho các tổ chức, cá nhân khác hoạt động phù hợp với quy định
                của pháp luật hiện hành. Exxe được thành lập với sứ mệnh mang đến nền tảng công nghệ
                hiện đại kết nối tài xế xe ô tô và hành khách theo cách Tiết Kiệm Nhất, Nhanh Nhất
                và An Toàn Nhất.
              </p>

              <p className="text-sm md:text-base mb-16">
                Exxe ra đời mang trên mình trách nhiệm giải quyết những vấn đề hiện tại trong xã hội
                như giá nhiên liệu tăng cao, tiếp cận công nghệ khó khăn, thời gian kém linh hoạt
                khi có nhu cầu đi lại của hành khách. Mang trong mình sự nhiệt huyết, quyết liệt và
                nhạy bén, chúng tôi luôn ý thức rằng khách hàng và đối tác là trọng tâm, do đó mang
                lại những lợi ích chung là điều mà chúng tôi đang phát triển.
              </p>

              <p className="text-sm md:text-base">
                Ngoài ra, Exxe hướng tới việc xây dựng một cộng đồng chia sẻ chuyến đi văn minh với
                nhiều tiện ích thông qua ứng dụng trên di động, nhằm nâng cao chất lượng cuộc sống
                và tiết kiệm cho cộng đồng.
              </p>
            </div>

            <div className="">
              <div className="relative aspect-[16/9]">
                <Image
                  src={mapBanner}
                  alt=""
                  className="rounded-[5px]"
                  objectFit="contain"
                  layout="fill"
                />
              </div>
            </div>
          </div>
        </AccountLayout>
      </main>
    </>
  )
}

export default SupportPage
