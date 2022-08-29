import { FilterIcon } from "@/assets"
import {
  CompoundingFilter,
  Drawer,
  FilterNotFound,
  Modal,
  RideItem,
  Spinner,
  Tabs,
} from "@/components"
import { toggleBodyOverflow } from "@/helper"
import { useBackRouter } from "@/hooks"
import {
  CarAccountType,
  CompoundingCarRes,
  CompoundingFilterParams,
  CompoundingType,
} from "@/models"
import { useRouter } from "next/router"
import { useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component"

interface listProps {
  list: CompoundingCarRes[]
  isValidating: boolean
  onFilterRide?: (params: CompoundingFilterParams | undefined) => void
  hasMore: boolean
  defaultParams?: CompoundingFilterParams | undefined
  onFetchMore?: () => void
  isFetchingMore: boolean
  onClickRideItem?: (id: number) => void
  carAccountType?: CarAccountType
}

type ModalFilterType = "mobile" | "tablet" | undefined
const itemStyle =
  "rounded-[8px] md:rounded-[20px] shadow-shadow-1 lg:shadow-shadow-3 border border-solid border-gray-color-1 overflow-hidden"
const gridStyle = "grid grid-cols-2 lg:grid-cols-3 gap-[12px] md:gap-16 lg:gap-24 pb-[10px]"

const RideContainer = ({
  isValidating,
  list,
  hasMore,
  onFilterRide,
  defaultParams,
  onFetchMore,
  isFetchingMore,
  onClickRideItem,
  carAccountType = "customer",
}: listProps) => {
  const router = useRouter()
  const [showFilter, setShowFitler] = useState<ModalFilterType>()

  useBackRouter({
    cb: () => {
      toggleShowFilter(undefined)
    },
  })

  const toggleShowFilter = (type: ModalFilterType) => {
    setShowFitler(type)
    if (type) {
      toggleBodyOverflow("hidden")
    } else {
      toggleBodyOverflow("unset")
    }
  }

  return (
    <>
      <section className="ride-container container bg-white-color md:bg-[transparent] px-0 md:p-12 lg:p-24 flex-1 pb-[70px] md:pb-0 xl:px-0">
        <div className="xl:grid xl:grid-cols-sidebar-grid gap-24">
          {!showFilter && router.isReady ? (
            <div className="hidden xl:block h-fit sticky top-[81px] block-element px-[18px] py-24 z-[100]">
              <CompoundingFilter
                type={carAccountType}
                defaultValues={defaultParams as any}
                onChange={(data) => onFilterRide?.(data)}
              />
            </div>
          ) : null}

          <div className="block-element px-12 md:px-16 lg:px-24 pb-24">
            <div className="mb-24 md:mb-[40px]">
              <h4 className="text-[18px] xs:text-[20px] leading-[28px] md:text-[24px] md:leading-[32px] text-primary font-medium pt-16 md:pt-24">
                {carAccountType === "car_driver"
                  ? "Các chuyến đi chưa có tài xế"
                  : "Các chuyến đi hiện có"}
              </h4>
            </div>

            <div className="bg-white-color mx-[-12px] sm:mx-0 left-0 right-0 sticky z-[1000] sm:z-0 sm:bg-[transparent] sm:static top-[59px] mb-12 md:mb-16 lg:mb-24">
              <Tabs
                className="md:border-solid md:border-b"
                list={
                  carAccountType === "car_driver"
                    ? [
                        { label: "Một chiều", value: "one_way" },
                        {
                          label: "Hai chiều",
                          value: "two_way",
                        },
                        { value: "compounding", label: "Đi ghép" },
                      ]
                    : [
                        { label: "Tiện chuyến", value: "convenient" },
                        { label: "Ghép chuyến", value: "compounding" },
                      ]
                }
                tabActive={defaultParams?.compounding_type || ""}
                onChange={(val) => onFilterRide?.({ compounding_type: val as CompoundingType })}
              />
            </div>

            {isValidating ? (
              <ul className={gridStyle}>
                {Array.from({ length: 9 }).map((_, index) => (
                  <li key={index} className={itemStyle}>
                    <RideItem rides={null} />
                  </li>
                ))}
              </ul>
            ) : list?.length === 0 ? (
              <FilterNotFound title="Không tìm thấy chuyến đi nào" />
            ) : (
              <div className="">
                <InfiniteScroll
                  dataLength={list?.length || 0}
                  next={() => onFetchMore?.()}
                  hasMore={hasMore}
                  loader={isFetchingMore ? <Spinner size={30} className="py-[20px]" /> : null}
                >
                  <ul className={gridStyle}>
                    {list?.length > 0 &&
                      list.map((item, index) => (
                        <li className={itemStyle} key={index}>
                          <RideItem
                            onClick={() => onClickRideItem?.(item.compounding_car_id)}
                            rides={item}
                          />
                        </li>
                      ))}
                  </ul>
                </InfiniteScroll>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={() => toggleShowFilter("tablet")}
          className="hidden md:flex xl:hidden fixed right-0 bottom-[200px] z-[100]] rounded-[5px] border border-solid border-border-color block-element shadow-shadow-2 flex-col flex-center p-[10px]"
        >
          <FilterIcon className="mb-[12px]" />
          <span className="text-base font-semibold">Bộ lọc</span>
        </button>

        <div className="fixed bottom-0 left-0 z-[100] right-0 w-full bg-white-color p-[12px] md:hidden">
          <button
            onClick={() => toggleShowFilter("mobile")}
            className="btn-primary w-full rounded-[5px] h-[40px]"
          >
            <FilterIcon className="mr-[8px] w-[14px] h-[14px]" />
            Bộ lọc
          </button>
        </div>
      </section>

      <Modal
        key="modal-filter-mobile"
        fullScreen
        show={showFilter === "mobile"}
        onClose={() => toggleShowFilter(undefined)}
        heading="Bộ lọc"
      >
        <CompoundingFilter
          showInModal
          touchableDevice
          type={carAccountType}
          onChange={(val) => onFilterRide?.(val)}
          onCloseFilter={() => toggleShowFilter(undefined)}
          defaultValues={defaultParams}
        />
      </Modal>

      <Drawer
        width={400}
        isShow={showFilter === "tablet"}
        onClose={() => toggleShowFilter(undefined)}
        headerChild={<p className="text-lg">Bộ lọc</p>}
      >
        <CompoundingFilter
          showInModal
          touchableDevice
          type={carAccountType}
          onChange={(val) => onFilterRide?.(val)}
          onCloseFilter={() => toggleShowFilter(undefined)}
          defaultValues={defaultParams}
        />
      </Drawer>
    </>
  )
}

export { RideContainer }
