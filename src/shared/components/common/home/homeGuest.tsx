import {
  Feature,
  Guide,
  HeroSection,
  HomeSection,
  NewsHome,
  PlaceHome,
  PromotionBanner,
  Seo,
} from "@/components"

export const HomeGuest = () => {
  return (
    <section>
      <Seo url="" title="Ứng dụng đặt xe đường dài ExxeVn" />
      <div className="h-[244px] sm:h-[350px] md:h-[453px] lg:h-[600px] xl:h-[calc(100vh-80px)]">
        <HeroSection />
      </div>

      <PlaceHome />

      <HomeSection>
        <PromotionBanner />
      </HomeSection>

      <HomeSection title="Tính năng nổi bật">
        <Feature />
      </HomeSection>

      <HomeSection title="Hướng dẫn trải nghiệm">
        <Guide />
      </HomeSection>

      <NewsHome />
    </section>
  )
}
