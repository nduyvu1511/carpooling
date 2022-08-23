import React from "react"

const CheckoutLoading = () => {
  return (
    <div className="">
      <div className="skeleton mb-[32px] h-[22px] max-w-[300px] w-full rounded-[5px]"></div>
      <div className="flex items-center mb-12">
        <div className="skeleton w-[80px] sm:w-[120px] h-[12px] mr-[80px] rounded-[5px]"></div>
        <div className="skeleton flex-1 sm:w-[200px] h-16 rounded-[5px]"></div>
      </div>
      <div className="flex items-center mb-12">
        <div className="skeleton w-[80px] sm:w-[120px] h-[12px] mr-[80px] rounded-[5px]"></div>
        <div className="skeleton flex-1 sm:w-[200px] h-16 rounded-[5px]"></div>
      </div>
      <div className="flex items-center mb-[32px]">
        <div className="skeleton w-[80px] sm:w-[120px] h-[12px] mr-[80px] rounded-[5px]"></div>
        <div className="skeleton flex-1 sm:w-[200px] h-16 rounded-[5px]"></div>
      </div>

      <div className="skeleton mb-[32px] h-[22px] max-w-[340px] w-full rounded-[5px]"></div>
      <div className="flex justify-between mb-[40px]">
        <div className="">
          <div className="skeleton w-[80px] md:w-[120px] rouned-[4px] h-[8px] mb-[12px] rounded-[5px]"></div>
          <div className="skeleton w-[140px] md:w-[200px] rouned-[4px] h-16 rounded-[5px]"></div>
        </div>
        <div className="">
          <div className="w-[120px] md:w-[200px] h-[36px] rounded-[5px] skeleton"></div>
        </div>
      </div>

      <div className="mb-[40px] skeleton rounded-[5px] h-16"></div>

      <div className="mb-[40px]">
        <div className="skeleton h-[32px] rounded-[5px] mb-16"></div>
        <div className="skeleton h-[32px] rounded-[5px]"></div>
      </div>

      <div className="items-center hidden md:flex">
        <div className="skeleton h-[50px] w-[150px] rounded-[25px] mr-16"></div>
        <div className="skeleton h-[50px] w-[150px] rounded-[25px]"></div>
      </div>
    </div>
  )
}

export { CheckoutLoading }
