interface RideSummaryLoadingProps {
  view?: "sm" | "lg"
}

export const RideSummaryLoading = ({ view = "sm" }: RideSummaryLoadingProps) => {
  return (
    <div className="mb-24 lg:mb-0">
      <div className={`${view === "lg" ? "" : "hidden lg:block"}`}>
        <div className="flex justify-between">
          <div className="mb-24">
            <div className="skeleton h-16 rounded-[4px] w-[80px] sm:w-[120px] mb-8"></div>
            <div className="skeleton h-12 rounded-[4px] w-[120px] sm:w-[140px]"></div>
          </div>
          <div className="flex flex-col items-end">
            <div className="skeleton h-16 rounded-[4px] w-[80px] sm:w-[120px] mb-8"></div>
            <div className="skeleton h-12 rounded-[4px] w-[120px] sm:w-[140px]"></div>
          </div>
        </div>
        <div className="skeleton h-[200px] mb-24 rounded-[5px] mx-12 md:mx-24 lg:mx-0"></div>

        <div className="flex mb-[40px]">
          <div className="w-[80px] h-[80px] rounded-[50%] skeleton mr-[40px]"></div>

          <div className="flex-1">
            <div className="skeleton h-[28px] rounded-[5px] mb-16 mx-auto"></div>
            <div className="skeleton h-[36px] rounded-[5px] mx-auto"></div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-[40px]">
          <div className="skeleton h-[40px] flex-1 sm:w-[150px] mr-12 rounded-[5px]"></div>
          <div className="skeleton h-[40px] flex-1 sm:w-[150px] rounded-[5px]"></div>
        </div>

        <div className="h-[20px] w-[50%] skeleton mb-24 rounded-[5px]"></div>
        <div className="flex items-center justify-between mb-24">
          <div className="w-[140px] xs:w-[200px]">
            <div className="w-[120px] skeleton rounded-[5px] mr-[40px] h-[18px]"></div>
          </div>
          <div className="flex-1">
            <div className="w-[100%] skeleton rounded-[5px] h-[18px]"></div>
          </div>
        </div>
        <div className="flex items-center justify-between mb-24">
          <div className="w-[140px] xs:w-[200px]">
            <div className="w-[100px] skeleton rounded-[5px] mr-[40px] h-[18px]"></div>
          </div>
          <div className="flex-1">
            <div className="w-[85%] skeleton rounded-[5px] h-[18px]"></div>
          </div>
        </div>
        <div className="flex items-center justify-between mb-24">
          <div className="w-[140px] xs:w-[200px]">
            <div className="w-[150px] skeleton rounded-[5px] mr-[40px] h-[18px]"></div>
          </div>
          <div className="flex-1">
            <div className="w-[78%] skeleton rounded-[5px] h-[18px]"></div>
          </div>
        </div>
        <div className="flex items-center justify-between mb-[40px]">
          <div className="w-[140px] xs:w-[200px]">
            <div className="w-[110px] skeleton rounded-[5px] mr-[40px] h-[18px]"></div>
          </div>
          <div className="flex-1">
            <div className="w-[60%] skeleton rounded-[5px] h-[18px]"></div>
          </div>
        </div>

        <div className="h-[20px] w-[50%] skeleton mb-24 rounded-[5px]"></div>
        <div className="flex items-center justify-between mb-24">
          <div className="w-[140px] xs:w-[200px]">
            <div className="w-[130px] skeleton rounded-[5px] mr-[40px] h-[18px]"></div>
          </div>
          <div className="flex-1">
            <div className="w-[90%] skeleton rounded-[5px] h-[18px]"></div>
          </div>
        </div>
        <div className="flex items-center justify-between mb-24">
          <div className="w-[140px] xs:w-[200px]">
            <div className="w-[100px] skeleton rounded-[5px] mr-[40px] h-[18px]"></div>
          </div>
          <div className="flex-1">
            <div className="w-[70%] skeleton rounded-[5px] h-[18px]"></div>
          </div>
        </div>
        <div className="flex items-center justify-between mb-24">
          <div className="w-[140px] xs:w-[200px]">
            <div className="w-[110px] skeleton rounded-[5px] mr-[40px] h-[18px]"></div>
          </div>
          <div className="flex-1">
            <div className="w-[65%] skeleton rounded-[5px] h-[18px]"></div>
          </div>
        </div>
        <div className="flex items-center justify-between mb-24">
          <div className="w-[140px] xs:w-[200px]">
            <div className="w-[120px] skeleton rounded-[5px] mr-[40px] h-[18px]"></div>
          </div>
          <div className="flex-1">
            <div className="w-[78%] skeleton rounded-[5px] h-[18px]"></div>
          </div>
        </div>
      </div>

      {view === "sm" ? (
        <div className="lg:hidden">
          <div className="skeleton h-[22px] max-w-[140px] xsm:w-[200px] w-full rounded-[4px] mb-24"></div>
          <div className="skeleton h-[40px] rounded-[4px] mb-24"></div>
          <div className="skeleton h-[20px] rounded-[4px] mb-24"></div>
          <div className="skeleton h-[14px] w-[80%] rounded-[4px] mb-24"></div>
          <div className="skeleton h-[22px] max-w-[160px] w-full rounded-[4px] mb-12"></div>
        </div>
      ) : null}
    </div>
  )
}
