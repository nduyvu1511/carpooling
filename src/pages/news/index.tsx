import { News, Seo } from "@/components"
import { StaticLayout } from "@/layout"

const NewsPage = () => {
  return (
    <StaticLayout heading="Cập nhật các tin tức mới nhất về Exxe.vn" subHeading="Tin tức">
      <Seo
        description="Ứng dụng gọi xe đường dài số 1 Việt Nam"
        thumbnailUrl=""
        title="Tin tức Exxe"
        url="https://exxe.vn/news"
      />
      <News />
    </StaticLayout>
  )
}

export default NewsPage