import { CloseThickIcon } from "@/assets"
import { RootState } from "@/core/store"
import { CompoundingCarCustomer, CompoundingCarDriverRes, CompoundingCarRes } from "@/models"
import { setShowSummaryDetail } from "@/modules"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Drawer } from "../drawer"
import { RideSummary } from "./rideSummary"

interface RideSummaryModalProps {
  data: CompoundingCarCustomer | CompoundingCarRes | CompoundingCarDriverRes
}

const RideSummaryModal = ({ data }: RideSummaryModalProps) => {
  const dispatch = useDispatch()
  const isShowSummaryDetail = useSelector((state: RootState) => state.common.isShowSummaryDetail)

  const toggleShowDetail = (status: boolean) => {
    dispatch(setShowSummaryDetail(status))
  }

  useEffect(() => {
    return () => {
      dispatch(setShowSummaryDetail(false))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Drawer
      width="full"
      transitionDirection="bottom"
      showCloseBtn={false}
      isShow={isShowSummaryDetail}
      onClose={() => toggleShowDetail(false)}
    >
      <div className="overflow-y-scroll flex-1 relative flex flex-col">
        <div className="flex items-center h-[56px] justify-between px-16 border-b border-solid border-border-color">
          <button onClick={() => toggleShowDetail(false)} className="w-[14px] h-[14px]">
            <CloseThickIcon />
          </button>
          <p className="text-base flex-1 ml-12 mr-24 text-center font-semibold">
            Thông tin chuyến đi
          </p>
        </div>
        <RideSummary showFull view="modal" data={data} />
      </div>
    </Drawer>
  )
}

export { RideSummaryModal }
