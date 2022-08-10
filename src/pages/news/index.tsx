import { News } from "@/components"
import { StaticLayout } from "@/layout"

const NewsPage = () => {
  return (
    <StaticLayout heading="Cập nhật các tin tức mới nhất về Exxe.vn" subHeading="Tin tức">
      <News />
    </StaticLayout>
  )
}

export default NewsPage
