import React from "react"

const CheckoutLoading = () => {
  return (
    <div className="p-24">
      <div className="flex justify-between mb-[40px]">
        <div className="">
          <div className="skeleton w-[120px] rouned-[4px] h-[8px] mb-[12px] rounded-[5px]"></div>
          <div className="skeleton w-[200px] rouned-[4px] h-[16px] rounded-[5px]"></div>
        </div>
        <div className="">
          <div className="w-[200px] h-[24px] rounded-[5px] skeleton"></div>
        </div>
      </div>

      <div className="mb-[40px] skeleton rounded-[5px] h-[16px]"></div>

      <div className="mb-[40px]">
        <div className="skeleton h-[32px] rounded-[5px] mb-[16px]"></div>
        <div className="skeleton h-[32px] rounded-[5px]"></div>
      </div>

      <div className="flex items-center">
        <div className="skeleton h-[50px] w-[150px] rounded-[25px] mr-[16px]"></div>
        <div className="skeleton h-[50px] w-[150px] rounded-[25px]"></div>
      </div>
    </div>
  )
}

export { CheckoutLoading }
