import { FilterIcon } from "@/assets"
import { CompoundingFilter, Drawer, Modal, RidesItem, Spinner, Tabs } from "@/components"
import { toggleBodyOverflow } from "@/helper"
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
  onFilterRides?: (params: CompoundingFilterParams | undefined) => void
  hasMore: boolean
  defaultParams?: CompoundingFilterParams | undefined
  onFetchMore?: () => void
  isFetchingMore: boolean
  onClickRideItem?: (id: number) => void
  carAccountType?: CarAccountType
}

const itemStyle =
  "rounded-[8px] md:rounded-[20px] shadow-shadow-1 border border-solid border-gray-color-1 overflow-hidden"
const gridStyle = "grid grid-cols-2 lg:grid-cols-3 gap-[12px] md:gap-[18px] lg:gap-24"

const RidesContainer = ({
  isValidating,
  list,
  hasMore,
  onFilterRides,
  defaultParams,
  onFetchMore,
  isFetchingMore,
  onClickRideItem,
  carAccountType = "customer",
}: listProps) => {
  const router = useRouter()
  const [showFilterMobile, setShowFilterMobile] = useState<boolean>(false)
  const [showFilterTablet, setShowFilterTablet] = useState<boolean>(false)

  const toggleShowFilter = ({ status, type }: { status: boolean; type: "mobile" | "tablet" }) => {
    type === "mobile" ? setShowFilterMobile(status) : setShowFilterTablet(status)
    if (status) {
      toggleBodyOverflow("hidden")
    } else {
      toggleBodyOverflow("unset")
    }
  }

  return (
    <>
      <section className="container px-0 md:p-12 lg:py-24 flex-1 pb-[70px] md:pb-0 xl:px-0">
        <div className="xl:grid xl:grid-cols-sidebar-grid gap-24">
          <div className="hidden xl:block">
            {!showFilterMobile && !showFilterTablet && router.isReady ? (
              <div className="sticky top-[81px] block-element p-24 z-[100]">
                <CompoundingFilter
                  type={carAccountType}
                  defaultValues={defaultParams as any}
                  onChange={(data) => onFilterRides?.(data)}
                />
              </div>
            ) : null}
          </div>

          <div className="block-element px-12 md:px-[16px] lg:px-24 pb-24">
            <div className="mb-12 md:mb-24">
              <h1 className="h4 text-primary pt-[16px] md:pt-24">
                {carAccountType === "car_driver"
                  ? "Các chuyến đi chưa có tài xế"
                  : "Các chuyến đi hiện có"}
              </h1>
            </div>

            <div className="mb-12 md:mb-24">
              <Tabs
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
                onChange={(val) => onFilterRides?.({ compounding_type: val as CompoundingType })}
              />
            </div>

            {isValidating ? (
              <div className={gridStyle}>
                {Array.from({ length: 9 }).map((_, index) => (
                  <li key={index} className={itemStyle}>
                    <RidesItem rides={null} />
                  </li>
                ))}
              </div>
            ) : list?.length === 0 ? (
              <div className="flex-center mt-[60px] mb-[20px]">
                <p className="text-base">Không tìm thấy chuyến đi nào</p>
              </div>
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
                          <RidesItem
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
          onClick={() => toggleShowFilter({ status: true, type: "tablet" })}
          className="hidden md:flex xl:hidden fixed right-0 top-[200px] rounded-[5px] border border-solid border-border-color block-element flex-col flex-center p-[8px]"
        >
          <FilterIcon className="mb-[12px]" />
          <span className="text-base font-semibold">Bộ lọc</span>
        </button>

        <div className="fixed bottom-0 left-0 z-[100] right-0 w-full bg-white-color p-[12px] md:hidden">
          <button
            onClick={() => toggleShowFilter({ status: true, type: "mobile" })}
            className="btn-primary w-full rounded-[5px] h-[40px]"
          >
            <FilterIcon className="mr-[8px] w-[14px] h-[14px]" />
            Bộ lọc
          </button>
        </div>
      </section>

      <Modal
        fullScreen
        show={showFilterMobile}
        onClose={() => toggleShowFilter({ status: false, type: "mobile" })}
        heading="Bộ lọc"
      >
        <CompoundingFilter
          showInModal
          touchableDevice
          type={carAccountType}
          onChange={(val) => onFilterRides?.(val)}
          onCloseFilter={() => toggleShowFilter({ status: false, type: "mobile" })}
          defaultValues={defaultParams}
        />
      </Modal>

      <Drawer
        width={400}
        isShow={showFilterTablet}
        onClose={() => toggleShowFilter({ status: false, type: "tablet" })}
        headerChild={<p className="text-lg">Bộ lọc</p>}
      >
        <CompoundingFilter
          showInModal
          touchableDevice
          type={carAccountType}
          onChange={(val) => onFilterRides?.(val)}
          onCloseFilter={() => toggleShowFilter({ status: false, type: "tablet" })}
          defaultValues={defaultParams}
        />
      </Drawer>
    </>
  )
}

export { RidesContainer }
