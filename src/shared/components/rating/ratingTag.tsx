import React from "react"
import { StarIcon } from "../star/starIcon"

interface RatingTagProps {
  value: number
  onClick?: Function
}

const RatingTag = ({ value, onClick }: RatingTagProps) => {
  return (
    <div
      onClick={() => onClick?.()}
      className="cursor-pointer py-4 px-8 bg-warning-opacity rounded-[5px] flex items-center"
    >
      <span className="text-xs text-warning mr-[6px]">{value}</span>
      <StarIcon className="text-[#FBB500] w-[13px]" />
    </div>
  )
}

export { RatingTag }
