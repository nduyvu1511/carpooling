import React from "react"

const CheckoutLoading = () => {
  return (
    <div className="p-12 md:p-24">
      <div className="flex justify-between mb-[40px]">
        <div className="">
          <div className="skeleton w-[80px] md:w-[120px] rouned-[4px] h-[8px] mb-[12px] rounded-[5px]"></div>
          <div className="skeleton w-[140px] md:w-[200px] rouned-[4px] h-[16px] rounded-[5px]"></div>
        </div>
        <div className="">
          <div className="w-[120px] md:w-[200px] h-[36px] rounded-[5px] skeleton"></div>
        </div>
      </div>

      <div className="mb-[40px] skeleton rounded-[5px] h-[16px]"></div>

      <div className="mb-[40px]">
        <div className="skeleton h-[32px] rounded-[5px] mb-[16px]"></div>
        <div className="skeleton h-[32px] rounded-[5px]"></div>
      </div>

      <div className="items-center hidden md:flex">
        <div className="skeleton h-[50px] w-[150px] rounded-[25px] mr-[16px]"></div>
        <div className="skeleton h-[50px] w-[150px] rounded-[25px]"></div>
      </div>
    </div>
  )
}

export { CheckoutLoading }
