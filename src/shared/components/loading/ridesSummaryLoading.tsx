export const RidesSummaryLoading = () => {
  return (
    <div className="mb-24 lg:mb-0">
      <div className="p-12 md:p-24 block-element border border-solid border-border-color hidden lg:block">
        <div className="skeleton h-[16px] rounded-[5px] mb-12 md:mb-24 mx-auto"></div>
        <div className="skeleton h-[16px] rounded-[5px] mb-12 md:mb-24 mx-auto"></div>
        <div className="flex items-center justify-between mb-[16px]">
          <div className="skeleton h-[40px] w-[150px] rounded-[5px]"></div>
          <div className="skeleton h-[40px] w-[150px] rounded-[5px]"></div>
        </div>
        <div className="h-[80px] skeleton mb-12 md:mb-24 rounded-[5px]"></div>
        <div className="h-[150px] skeleton mb-12 md:mb-24 rounded-[5px]"></div>
        <div className="h-[100px] skeleton mb-12 md:mb-24 rounded-[5px]"></div>
      </div>

      <div className="lg:hidden px-12 md:px-24">
        <div className="skeleton h-[22px] max-w-[200px] w-full rounded-[4px] mb-24"></div>
        <div className="skeleton h-[40px] rounded-[4px] mb-12"></div>
        <div className="skeleton h-[20px] rounded-[4px] mb-12"></div>
        <div className="skeleton h-[14px] w-[80%] rounded-[4px] mb-24"></div>
        <div className="skeleton h-[22px] max-w-[160px] w-full rounded-[4px] mb-12"></div>
      </div>
    </div>
  )
}
