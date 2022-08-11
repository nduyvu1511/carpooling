import { Guide as GuideCom, Seo } from "@/components"
import { StaticLayout } from "@/layout"

const Guide = () => {
  return (
    <StaticLayout subHeading="Hướng dẫn" heading="Trải nghiệm các dịch vụ của chúng tôi">
      <Seo
        description="Hướng dẫn đặt xe"
        thumbnailUrl=""
        title="Hướng dẫn đặt xe"
        url="https://exxe.vn/guide"
      />
      <GuideCom />
    </StaticLayout>
  )
}

export default Guide
