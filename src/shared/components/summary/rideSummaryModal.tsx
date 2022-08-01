import { CloseIcon } from "@/assets"
import { RootState } from "@/core/store"
import { CompoundingCarCustomer, CompoundingCarDriverRes, CompoundingCarRes } from "@/models"
import { setShowSummaryDetail } from "@/modules"
import { useDispatch, useSelector } from "react-redux"
import { Drawer } from "../drawer"
import { RidesSummary } from "./rideSummary"

const RidesSummaryModal = ({
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
        <button
          onClick={() => toggleShowDetail(false)}
          className="absolute top-[10px] right-[10px]"
        >
          <CloseIcon />
        </button>
        <RidesSummary showRules={false} view="modal" rides={rides} />
      </div>
    </Drawer>
  )
}

export { RidesSummaryModal }
