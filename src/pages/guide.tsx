import { directionBg } from "@/assets"
import { Guide as GuideCom, Seo } from "@/components"
import { StaticLayout } from "@/layout"
import { useRouter } from "next/router"

const Guide = () => {
  const router = useRouter()
  return (
    <StaticLayout
      bg={directionBg}
      subHeading="Hướng dẫn"
      heading="Trải nghiệm các dịch vụ của chúng tôi"
    >
      <Seo description="Hướng dẫn đặt xe" thumbnailUrl="" title="Hướng dẫn đặt xe" url="guide" />
      <GuideCom type={router.query?.type || ("customer" as any)} />
    </StaticLayout>
  )
}

export default Guide
