import {
  BookingModal,
  CompoundingFilter,
  CompoundingFilterItem,
  Modal,
  RidesItem,
  Spinner,
  Tabs,
} from "@/components"
import { isObjectHasValue, toggleBodyOverflow } from "@/helper"
import { useQueryCompoundingCarCustomer } from "@/hooks"
import { CustomerLayout } from "@/layout"
import { CompoundingFilterParams, CompoundingType } from "@/models"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component"

const HomeCustomer = () => {
  const router = useRouter()
  const {
    data: ridesList,
    isValidating,
    filterRides,
    hasMore,
    fetchMoreRides,
    isFetchingMore,
    getQueryParams,
  } = useQueryCompoundingCarCustomer({})
  const [showBookingModal, setShowBookingModal] = useState<CompoundingType | undefined>()
  const [showFilter, setShowFilter] = useState<boolean>(false)

  useEffect(() => {
    if (router.isReady) {
      filterRides(getQueryParams(router.query))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query])

  const toggleShowFilter = (status: boolean) => {
    if (status) {
      setShowFilter(true)
      toggleBodyOverflow("hidden")
    } else {
      setShowFilter(false)
      toggleBodyOverflow("unset")
    }
  }

  const handleFilterRides = (params: CompoundingFilterParams | undefined) => {
    const filter = getQueryParams({ ...router.query, ...params })
    if (isObjectHasValue(params)) {
      router.push({
        query: {
          ...filter,
        },
      })
    } else {
      router.push({})
    }
  }

  return (
    <>
      <section className="container py-12 lg:py-24 flex-1 pb-[70px] md:pb-0">
        <div className="xl:grid xl:grid-cols-sidebar-grid gap-24">
          <div className="hidden xl:block">
            {router.isReady ? (
              <div className="sticky top-[81px] block-element p-24 z-[100]">
                <CompoundingFilter
                  type="customer"
                  defaultValues={router.query as any}
                  onChange={(data) => handleFilterRides(data)}
                />
              </div>
            ) : null}
          </div>

          <div className="block-element px-12 md:px-[16px] lg:px-24 pb-24">
            <div className="mb-24">
              <h1 className="h4 text-primary pt-12 md:pt-24">Các chuyến đi hiện có</h1>
            </div>

            <div className="mb-24">
              <Tabs
                list={[
                  { label: "Một chiều", value: "one_way" },
                  {
                    label: "Hai chiều",
                    value: "two_way",
                  },
                  { value: "compounding", label: "Đi ghép" },
                ]}
                tabActive={router.query?.compounding_type || ""}
                onChange={(val) =>
                  router.push({ query: { ...router.query, compounding_type: val } })
                }
              />
              {/* <ul className="flex items-center">
                {.map((item, index) => (
                  <li key={index} className="mr-[8px] last:mr-0">
                    <CompoundingFilterItem compounding_type={item as CompoundingType} />
                  </li>
                ))}
              </ul> */}
            </div>

            {isValidating ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[16px] lg:gap-24">
                {Array.from({ length: 9 }).map((_, index) => (
                  <RidesItem key={index} rides={null} />
                ))}
              </div>
            ) : ridesList?.length > 0 ? (
              <div className="">
                <InfiniteScroll
                  dataLength={ridesList?.length || 0}
                  next={() => fetchMoreRides(router.query)}
                  hasMore={hasMore}
                  loader={isFetchingMore ? <Spinner size={30} className="py-[20px]" /> : null}
                >
                  <ul className="grid grid-cols-2 md:grid-cols-3 gap-[8px] md:gap-[16px] lg:gap-24">
                    {ridesList?.length > 0 &&
                      ridesList.map((item, index) => (
                        <li
                          className="rounded-[20px] shadow-shadow-1 border border-solid border-gray-color-1 overflow-hidden"
                          key={index}
                        >
                          <RidesItem
                            onClick={() =>
                              router.push(`/c/ride-sharing/${item.compounding_car_id}`)
                            }
                            rides={item}
                          />
                        </li>
                      ))}
                  </ul>
                </InfiniteScroll>
              </div>
            ) : (
              <div className="flex-center mt-[60px] mb-[20px]">
                <p className="text-base">Không tìm thấy chuyến đi nào</p>
              </div>
            )}
          </div>
        </div>

        <div className="fixed bottom-0 left-0 z-[100] right-0 w-full bg-white-color p-[12px] md:hidden">
          <button onClick={() => toggleShowFilter(true)} className="btn-primary w-full">
            Bộ lọc
          </button>
        </div>
      </section>

      <Modal show={showFilter} onClose={() => toggleShowFilter(false)} heading="Bộ lọc">
        <div className="p-12 flex-1 flex flex-col">
          <CompoundingFilter
            touchableDevice
            type="customer"
            onChange={(val) => handleFilterRides(val)}
            onCloseFilter={() => {
              toggleBodyOverflow("unset")
              setShowFilter(false)
            }}
            defaultValues={router.query}
          />
        </div>
      </Modal>

      <BookingModal
        show={showBookingModal}
        formType={showBookingModal as CompoundingType}
        onClose={() => toggleShowFilter(false)}
      />
    </>
  )
}

HomeCustomer.Layout = CustomerLayout
export default HomeCustomer
