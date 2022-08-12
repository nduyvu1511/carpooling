import { feature1, feature2, feature3, feature4, feature5, feature6, feature7 } from "@/assets"
import { Banner, Guide, HeroSection, NewsSlide, PlaceSlide, Seo } from "@/components"
import { useNews } from "@/hooks"
import { GuestLayout } from "@/layout"
import { CompoundingCarRes } from "@/models"
import { ridesApi } from "@/services"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import useSWR from "swr"
import { RootState } from "../core"

const HomeGuest = () => {
  const router = useRouter()
  const { userInfo } = useSelector((state: RootState) => state.userInfo)
  const { data, isValidating, error } = useSWR<CompoundingCarRes[]>(
    "get_compounding_car_template",
    () =>
      ridesApi
        .getCompoundingCarTemplates()
        .then((res) => res.result.data || [])
        .catch((err) => console.log(err)),
    { dedupingInterval: 100000 }
  )
  const { data: news, isValidating: isLoading } = useNews()

  useEffect(() => {
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
    <section className="">
      <Seo
        description="Ứng dụng gọi xe đường dài số 1 Việt Nam"
        thumbnailUrl=""
        title="Ứng dụng đặt xe Exxe"
        url="https://exxe.vn"
      />
      <div className="h-[244px] sm:h-[350px] md:h-[453px] lg:h-[600px] xl:h-[calc(100vh-80px)]">
        <HeroSection />
      </div>

      <div className="mt-[64px] md:mt-[100px] lg:mt-[160px]">
        <div className="">
          <h1 className="h1 text-primary text-center font-semibold">Tính năng nổi bật</h1>

          <div className="container mt-[32px] md:mt-[40px] lg:mt-[80px] custom-swiper">
            <Banner
              images={[feature1, feature2, feature3, feature4, feature5, feature6, feature7]}
            />
          </div>
        </div>
      </div>

      {data?.length ? (
        <div className="mt-[64px] md:mt-[100px] lg:mt-[160px]">
          <div className="">
            <h1 className="h1 text-primary text-center font-semibold">Lịch sử chuyến đi</h1>

            <div className="container px-0 pl-12 md:pl-[16px] mt-[32px] md:mt-[40px] lg:mt-[80px] custom-swiper">
              <PlaceSlide showLoading={isValidating} places={data || []} />
            </div>
          </div>
        </div>
      ) : null}

      <div className="container mt-[64px] md:mt-[100px] lg:mt-[160px]">
        <div className="">
          <h1 className="h1 text-primary text-center font-semibold">Hướng dẫn trải nghiệm </h1>
          <div className="mt-[32px] md:mt-[40px] lg:mt-[80px]">
            <Guide />
          </div>
        </div>
      </div>

      <div className="mt-[50px] lg:mt-[120px] bg-bg-1 py-[32px] md:py-[50px] lg:py-[80px]">
        <div className="container">
          <h1 className="h1 text-primary mb-[40px] md:mb-[60px] lg:mb-[80px] text-center">
            Tin tức
          </h1>

          <div className="">
            <div className="custom-swiper">
              <NewsSlide data={news} isLoading={isLoading} />
            </div>

            <div className="mt-[32px] md:mt-[40px] lg:mt-[80px] flex justify-center">
              <button
                onClick={() => router.push("/news")}
                className="btn-primary-outline max-w-[400px] w-full py-[6px] lg:w-fit lg:py-[10px]"
              >
                Xem thêm
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <BookingModal onClose={() => {}} formType="one_way" show={"one_way"} /> */}
    </section>
  )
}

HomeGuest.Layout = GuestLayout
export default HomeGuest
