import React from "react"
import { NewsItem } from "./newsItem"

const NewsList = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-24 lg:gap-[60px]">
      <div className="">
        <NewsItem />
      </div>
      <div className="">
        <NewsItem />
      </div>
      <div className="">
        <NewsItem />
      </div>
    </div>
  )
}

export { NewsList }
