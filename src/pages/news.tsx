import { guideBg } from "@/assets"
import { NewsList, Switch } from "@/components"
import { GuestLayout } from "@/layout"
import Image from "next/image"
import { useState } from "react"

const News = () => {
  const [type, setType] = useState<string>("1")
  return (
    <section className="">
      <div className="relative w-full h-[500px] mb-[120px]">
        <Image src={guideBg} layout="fill" alt="" objectFit="cover" />
      </div>
      <div className="container">
        <div className="mb-[80px]">
          <div className="flex-col flex-center">
            <p className="text-base text-center mb-24">Tin tức</p>
            <h1 className="h1 text-primary text-center mb-[80px]">
              Cập nhật các tin tức mới nhất về Exxe.vn
            </h1>
            <Switch
              list={[
                { label: "Tin tức", value: "1" },
                { label: "Du lịch", value: "2" },
              ]}
              value={type}
              onChange={(type) => setType(type)}
            />
          </div>
        </div>

        <div className="mb-[120px]">
          <NewsList />
          <div className="mb-[60px]"></div>
          <NewsList />
          <div className="mb-[60px]"></div>
          <button className="mx-auto btn-primary-outline">Xem thêm</button>
        </div>
      </div>
    </section>
  )
}

News.Layout = GuestLayout
export default News
