import { CloseIcon } from "@/assets"
import { RootState } from "@/core/store"
import { CompoundingCarCustomer, CompoundingCarDriverRes, CompoundingCarRes } from "@/models"
import { setShowSummaryDetail } from "@/modules"
import { useDispatch, useSelector } from "react-redux"
import { Drawer } from "../drawer"
import { RideSummary } from "./rideSummary"

const RideSummaryModal = ({
  rides,
}: {
  rides: CompoundingCarCustomer | CompoundingCarRes | CompoundingCarDriverRes
}) => {
  const dispatch = useDispatch()
  const isShowSummaryDetail = useSelector((state: RootState) => state.common.isShowSummaryDetail)

  const toggleShowDetail = (status: boolean) => {
    dispatch(setShowSummaryDetail(status))
  }

  return (
    <Drawer
      width="full"
      direction="bottom"
      transitionDirection="bottom"
      showCloseBtn={false}
      isShow={isShowSummaryDetail}
      onClose={() => toggleShowDetail(false)}
    >
      <div className="overflow-y-scroll flex-1 relative flex flex-col">
        <div className="flex items-center h-[56px] justify-between px-12 border-b border-solid border-border-color">
          <button onClick={() => toggleShowDetail(false)} className="">
            <CloseIcon />
          </button>
          <p className="text-base flex-1 ml-12 text-center font-semibold">Thông tin chuyến đi</p>
        </div>
        <RideSummary showFull view="modal" data={rides} />
      </div>
    </Drawer>
  )
}

export { RideSummaryModal }
