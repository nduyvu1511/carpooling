import { feature1, feature2, feature3 } from "@/assets"
import { Banner, Guide, HeroSection, NewsList, PlaceSlide } from "@/components"
import { RootState } from "@/core/store"
import { GuestLayout } from "@/layout"
import { CompoundingCarRes } from "@/models"
import { ridesApi } from "@/services"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import useSWR from "swr"

const HomeGuest = () => {
  const router = useRouter()
  const { userInfo } = useSelector((state: RootState) => state.userInfo)

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
  const { data, isValidating } = useSWR<CompoundingCarRes[]>(
    "get_compounding_car_template",
    () => ridesApi.getCompoundingCarTemplates().then((res) => res.result.data || []),
    { dedupingInterval: 1000000 }
  )

  return (
    <section className="">
      <div className="h-[244px] sm:h-[350px] md:h-[453px] lg:h-[600px] xl:h-[calc(100vh-80px)]">
        <HeroSection />
      </div>

      <div className="mt-[80px] md:mt-[100px] lg:mt-[160px]">
        <div className="">
          <h1 className="h1 text-primary text-center font-">Lịch sử chuyến đi</h1>

          <div className="container px-0 mt-[80px] custom-swiper">
            <PlaceSlide showLoading={isValidating} places={data || []} />
          </div>
        </div>
      </div>

      <div className="mt-[80px] md:mt-[100px] lg:mt-[160px]">
        <div className="">
          <h1 className="h1 text-primary text-center">Tính năng nổi bật</h1>

          <div className="container mt-[80px] custom-swiper">
            <Banner images={[feature1, feature2, feature3]} />
          </div>
        </div>
      </div>

      <div className="container mt-[80px] md:mt-[100px] lg:mt-[160px]">
        <div className="">
          <h1 className="h1 text-primary text-center">Hướng dẫn trải nghiệm </h1>

          <Guide />
        </div>
      </div>

      <div className="mt-[50px] lg:mt-[120px] bg-bg-1 py-[50px] lg:py-[120px]">
        <div className="container">
          <h1 className="h1 text-primary mb-[40px] md:mb-[60px] lg:mb-[80px] text-center">
            Tin tức
          </h1>

          <div className="">
            <NewsList />

            <div className="mt-[40px] md:mt-[60px] lg:mt-[80px] flex justify-center">
              <button className="btn-primary-outline">Xem thêm</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

HomeGuest.Layout = GuestLayout
export default HomeGuest
