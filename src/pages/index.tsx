import { feature1, feature2, feature3 } from "@/assets"
import { Banner, Header, HeroSection, HeroSectionList, PlaceSlide, Switch } from "@/components"
import { Footer } from "@/components/footer"
import { NewsList } from "@/components/news"
import { RootState } from "@/core/store"
import { EmptyLayout } from "@/layout"
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
      <Header />

      <div className="h-[calc(100vh-80px)]">
        <HeroSection />
      </div>

      <div className="mt-[160px]">
        <div className="">
          <h1 className="home-heading text-[60px] leading-[73px] text-center">Lịch sử chuyến đi</h1>

          <div className="container mt-[80px]">
            <PlaceSlide showLoading={isValidating} places={data || []} />
          </div>
        </div>
      </div>

      <div className="mt-[210px]">
        <div className="">
          <h1 className="home-heading text-[60px] leading-[73px] text-center">Tính năng nổi bật</h1>

          <div className="container mt-[80px]">
            <Banner images={[feature1, feature2, feature3]} />
          </div>
        </div>
      </div>

      <div className="container mt-[160px]">
        <div className="">
          <h1 className="home-heading text-[60px] leading-[73px] text-center">
            Hướng dẫn trải nghiệm{" "}
          </h1>

          <div className="mt-[80px]">
            <div className="flex-center">
              <Switch />
            </div>
          </div>

          <div className="mt-[120px]">
            <HeroSectionList />
          </div>
        </div>
      </div>

      <div className="mt-[120px] bg-bg-1 py-[160px]">
        <div className="container">
          <h1 className="home-heading text-[60px] leading-[73px] mb-[80px] text-center">Tin tức</h1>

          <div className="">
            <NewsList />

            <div className="mt-[80px] flex justify-center">
              <button className="btn-primary-outline">Xem thêm</button>
            </div>
          </div>
        </div>
      </div>

      <div className="py-[80px]">
        <Footer />
      </div>
    </section>
  )
}

HomeGuest.Layout = EmptyLayout
export default HomeGuest
