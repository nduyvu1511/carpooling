import React from "react"
import { NewsItem } from "./newsItem"

const NewsList = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-[16px] lg:grid-cols-4 md:gap-24 lg:gap-[24px]">
      <div className="">
        <NewsItem />
      </div>
      <div className="">
        <NewsItem />
      </div>
      <div className="">
        <NewsItem />
      </div>
      <div className="">
        <NewsItem />
      </div>
      <div className="">
        <NewsItem />
      </div>
      <div className="">
        <NewsItem />
      </div>
      <div className="md:hidden lg:block">
        <NewsItem />
      </div>
      <div className="md:hidden lg:block">
        <NewsItem />
      </div>
    </div>
  )
}

export { NewsList }
