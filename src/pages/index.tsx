import { ogImage } from "@/assets"
import {
  Feature,
  Guide,
  HeroSection,
  HomeSection,
  NewsSlide,
  PlaceSlide,
  PromotionBanner,
  Seo,
} from "@/components"
import { DOMAIN_URL } from "@/helper"
import { useNews } from "@/hooks"
import { GuestLayout } from "@/layout"
import { CompoundingCarRes, OpenGraphData } from "@/models"
import { rideAPI } from "@/services"
import { useRouter } from "next/router"
import { useLayoutEffect } from "react"
import { useSelector } from "react-redux"
import useSWR from "swr"
import { RootState } from "../core"

const HomeGuest = () => {
  const router = useRouter()
  const { data: news, isValidating: isLoading } = useNews()
  const { userInfo } = useSelector((state: RootState) => state.userInfo)
  const { data, isValidating } = useSWR<CompoundingCarRes[]>(
    "get_compounding_car_template",
    () =>
      rideAPI
        .getCompoundingCarTemplates()
        .then((res) => res.result.data || [])
        .catch((err) => console.log(err)),
    { dedupingInterval: 100000 }
  )

  useLayoutEffect(() => {
    if (!userInfo) return

    if (userInfo?.car_account_type === "customer") {
      router.push("/c")
    }

    if (userInfo?.car_account_type === "car_driver") {
      router.push("/d")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo])

  return (
    <section>
      <Seo
        url=""
        title="Ứng dụng đặt xe ExxeVn"
        description="Ứng dụng ExxeVn là ứng dụng thương mại điện tử trên thiết bị di động do Công ty Cổ phần Đầu Tư Công Nghệ và Vận Tải ExxeVn thiết lập, quản lý vận tải cho các tổ chức, cá nhân khác hoạt động phù hợp với quy định của pháp luật hiện hành."
      />
      <div className="h-[244px] sm:h-[350px] md:h-[453px] lg:h-[600px] xl:h-[calc(100vh-80px)]">
        <HeroSection />
      </div>

      {data?.length ? (
        <HomeSection title="Lịch sử chuyến đi">
          <PlaceSlide showLoading={isValidating} places={data || []} />
        </HomeSection>
      ) : null}

      <HomeSection>
        <PromotionBanner />
      </HomeSection>

      <HomeSection title="Tính năng nổi bật">
        <Feature />
      </HomeSection>

      <HomeSection title="Hướng dẫn trải nghiệm">
        <Guide />
      </HomeSection>

      <div className="mt-[50px] lg:mt-[120px] bg-bg-primary py-[32px] md:py-[50px] lg:py-[80px]">
        <div className="container py-0">
          <h1 className="h1 text-primary mb-[40px] md:mb-[60px] lg:mb-[80px] text-center">
            Tin tức
          </h1>
          <NewsSlide data={news} isLoading={isLoading} />
          <div className="mt-[32px] md:mt-[40px] lg:mt-[80px] flex justify-center">
            <button
              onClick={() => router.push("/news")}
              className="btn-primary-outline max-w-[400px] sm:w-fit hover:bg-[transparent] w-full py-[6px] lg:w-fit lg:py-[10px]"
            >
              Xem thêm
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

HomeGuest.Layout = GuestLayout
export default HomeGuest

export const getStaticProps = async () => {
  return {
    props: {
      openGraphData: [
        {
          property: "og:image",
          content: ogImage,
          key: "ogimage",
        },
        {
          property: "og:image:alt",
          content: ogImage,
          key: "ogimagealt",
        },
        {
          property: "og:image:width",
          content: "400",
          key: "ogimagewidth",
        },
        {
          property: "og:image:height",
          content: "300",
          key: "ogimageheight",
        },
        {
          property: "og:url",
          content: DOMAIN_URL,
          key: "ogurl",
        },
        {
          property: "og:image:secure_url",
          content: ogImage,
          key: "ogimagesecureurl",
        },
        {
          property: "og:title",
          content: "Ứng dụng đặt xe ExxeVn",
          key: "ogtitle",
        },
        {
          property: "og:description",
          content:
            "Ứng dụng ExxeVn là ứng dụng thương mại điện tử trên thiết bị di động do Công ty Cổ phần Đầu Tư Công Nghệ và Vận Tải ExxeVn thiết lập, quản lý vận tải cho các tổ chức, cá nhân khác hoạt động phù hợp với quy định của pháp luật hiện hành.",
          key: "ogdesc",
        },
        {
          property: "og:type",
          content: "website",
          key: "website",
        },
      ] as OpenGraphData[],
    },
  }
}
