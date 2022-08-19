import React from "react"

export const WalletLoading = () => {
  return (
    <div className="flex items-center">
      <div className="skeleton w-[160px] h-[160px] rounded-[50%] mb-24 md:mb-0 mr-24 md:mr-[40px]"></div>
      <div className="flex-1 mb-24 md:mb-0">
        <div className="mb-24">
          <div className="skeleton w-[60px] xs:w-[80px] sm:w-[120px] h-[12px] mb-12 rounded-[5px]"></div>
          <div className="skeleton w-[80px] xs:w-[120px] sm:w-[160px] h-[16px] rounded-[5px]"></div>
        </div>
        <div className="">
          <div className="skeleton w-[60px] xs:w-[80px] sm:w-[120px] h-[12px] mb-12 rounded-[5px]"></div>
          <div className="skeleton w-[120px] xs:w-[140px] sm:w-[180px] h-[16px] rounded-[5px]"></div>
        </div>
      </div>
    </div>
  )
}
