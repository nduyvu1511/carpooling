interface RidesSummaryLoadingProps {
  view?: "sm" | "lg"
}

export const RidesSummaryLoading = ({ view = "sm" }: RidesSummaryLoadingProps) => {
  return (
    <div className="mb-24 lg:mb-0">
      <div className={`p-12 md:p-24 ${view === "lg" ? "" : "hidden lg:block"}`}>
        <div className="skeleton h-[16px] rounded-[5px] mb-12 md:mb-24 mx-auto"></div>
        <div className="skeleton h-[16px] rounded-[5px] mb-12 md:mb-24 mx-auto"></div>
        <div className="h-[40px] skeleton mb-24 rounded-[5px]"></div>

        <div className="flex items-center justify-between mb-[40px]">
          <div className="skeleton h-[40px] w-[150px] rounded-[5px]"></div>
          <div className="skeleton h-[40px] w-[150px] rounded-[5px]"></div>
        </div>

        <div className="h-[20px] w-[40%] skeleton mb-24 rounded-[5px]"></div>
        <div className="flex items-center justify-between mb-24">
          <div className="w-[120px] skeleton rounded-[5px] mr-[40px] h-[18px]"></div>
          <div className="flex-1 skeleton rounded-[5px] h-[18px]"></div>
        </div>
        <div className="flex items-center justify-between mb-24">
          <div className="w-[120px] skeleton rounded-[5px] mr-[40px] h-[18px]"></div>
          <div className="flex-1 skeleton rounded-[5px] h-[18px]"></div>
        </div>
        <div className="flex items-center justify-between mb-24">
          <div className="w-[120px] skeleton rounded-[5px] mr-[40px] h-[18px]"></div>
          <div className="flex-1 skeleton rounded-[5px] h-[18px]"></div>
        </div>
        <div className="flex items-center justify-between mb-[40px]">
          <div className="w-[120px] skeleton rounded-[5px] mr-[40px] h-[18px]"></div>
          <div className="flex-1 skeleton rounded-[5px] h-[18px]"></div>
        </div>

        <div className="h-[20px] w-[40%] skeleton mb-24 rounded-[5px]"></div>
        <div className="flex items-center justify-between mb-24">
          <div className="w-[120px] skeleton rounded-[5px] mr-[40px] h-[18px]"></div>
          <div className="flex-1 skeleton rounded-[5px] h-[18px]"></div>
        </div>
        <div className="flex items-center justify-between mb-24">
          <div className="w-[120px] skeleton rounded-[5px] mr-[40px] h-[18px]"></div>
          <div className="flex-1 skeleton rounded-[5px] h-[18px]"></div>
        </div>
        <div className="flex items-center justify-between mb-24">
          <div className="w-[120px] skeleton rounded-[5px] mr-[40px] h-[18px]"></div>
          <div className="flex-1 skeleton rounded-[5px] h-[18px]"></div>
        </div>
        <div className="flex items-center justify-between mb-24">
          <div className="w-[120px] skeleton rounded-[5px] mr-[40px] h-[18px]"></div>
          <div className="flex-1 skeleton rounded-[5px] h-[18px]"></div>
        </div>
      </div>

      {view === "sm" ? (
        <div className="lg:hidden px-12 md:px-24">
          <div className="skeleton h-[22px] max-w-[200px] w-full rounded-[4px] mb-24"></div>
          <div className="skeleton h-[40px] rounded-[4px] mb-24"></div>
          <div className="skeleton h-[20px] rounded-[4px] mb-24"></div>
          <div className="skeleton h-[14px] w-[80%] rounded-[4px] mb-24"></div>
          <div className="skeleton h-[22px] max-w-[160px] w-full rounded-[4px] mb-12"></div>
        </div>
      ) : null}
    </div>
  )
}
