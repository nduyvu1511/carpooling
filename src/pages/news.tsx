import { NewsList, Switch } from "@/components"
import { StaticLayout } from "@/layout"
import { useState } from "react"

const News = () => {
  const [type, setType] = useState<string>("1")
  return (
    <StaticLayout heading="Cập nhật các tin tức mới nhất về Exxe.vn" subHeading="Tin tức">
      <div className="">
        <div className="mb-24 md:mb-[32px] xl:mb-[64px] flex-center">
          <Switch
            list={[
              { label: "Tin tức", value: "1" },
              { label: "Du lịch", value: "2" },
            ]}
            value={type}
            onChange={(type) => setType(type)}
          />
        </div>
        <NewsList />
        <button className="mx-auto btn-primary-outline mt-24 md:mt-[42px] lg:mt-[64px]">
          Xem thêm
        </button>
      </div>
    </StaticLayout>
  )
}

export default News
