export const RidesSummaryLoading = () => {
  return (
    <div className="">
      <div className="p-24 block-element border border-solid border-border-color">
        <div className="skeleton h-[16px] rounded-[5px] mb-24 mx-auto"></div>
        <div className="skeleton h-[16px] rounded-[5px] mb-24 mx-auto"></div>
        <div className="flex items-center justify-between mb-[16px]">
          <div className="skeleton h-[40px] w-[150px] rounded-[5px]"></div>
          <div className="skeleton h-[40px] w-[150px] rounded-[5px]"></div>
        </div>
        <div className="h-[80px] skeleton mb-24 rounded-[5px]"></div>
        <div className="h-[150px] skeleton mb-24 rounded-[5px]"></div>
        <div className="h-[100px] skeleton mb-24 rounded-[5px]"></div>
      </div>
    </div>
  )
}
