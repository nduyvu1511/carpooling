import React from "react"

export const WalletLoading = () => {
  return (
    <>
      <div className="flex items-center mb-24 md:mb-[40px] justify-between">
        <div className="h-16 w-[80px] skeleton rounded-[5px]"></div>
        <div className="h-[48px] xl:hidden skeleton w-[150px] rounded-[30px]"></div>
      </div>
      <div className="flex items-center">
        <div className="skeleton w-[140px] h-[140px] xs:w-[160px] xs:h-[160px] md:w-[180px] md:h-[180px] rounded-[50%] mb-24 md:mb-0 mr-24 md:mr-[40px]"></div>
        <div className="flex-1 mb-24 md:mb-0">
          <div className="mb-24">
            <div className="skeleton w-[60px] xs:w-[80px] sm:w-[120px] h-[12px] mb-12 rounded-[5px]"></div>
            <div className="skeleton w-[80px] xs:w-[120px] sm:w-[160px] h-16 rounded-[5px]"></div>
          </div>
          <div className="">
            <div className="skeleton w-[60px] xs:w-[80px] sm:w-[120px] h-[12px] mb-12 rounded-[5px]"></div>
            <div className="skeleton w-[120px] xs:w-[140px] sm:w-[180px] h-16 rounded-[5px]"></div>
          </div>
        </div>
      </div>
    </>
  )
}
