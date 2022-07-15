import React from "react"
import { Star } from "../star"

const RatingFilter = () => {
  return (
    <div className="flex items-center mb-[40px]">
      <div className="flex-col flex-center">
        <p className="text-[28px] leading-[36px] font-medium text-orange-50 mb-[8px]">
          <span>{4.9}</span> / <span>{5}</span>
        </p>
        <p>
          <Star ratingValue={92} allowHalfIcon size={24} readonly />
        </p>
      </div>

      <ul className="flex flex-wrap ml-[32px]">
        {Array.from({ length: 5 }).map((_, index) => (
          <li
            onClick={() => {}}
            key={index}
            className={`px-[28px] mr-[20px] last:mr-0 py-[4px] rounded-[5px] border border-solid border-orange-50 text-14 leading-[22px] font-semibold text-orange-50
        cursor-pointer ${index === 1 ? "bg-orange-50-bg" : ""}
      `}
          >
            {index + 1} sao
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RatingFilter
