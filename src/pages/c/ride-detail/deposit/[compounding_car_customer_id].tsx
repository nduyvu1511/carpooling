import {
  DriverInfoSummary,
  Modal,
  RideCancelForm,
  RideProgress,
  RideSummary,
  RideSummaryLoading,
  RideSummaryMobile,
  RideSummaryModal,
} from "@/components"
import { formatMoneyVND, toggleBodyOverflow } from "@/helper"
import { useBackRouter, useCompoundingCarCustomer, useEffectOnce, useFetcher } from "@/hooks"
import { CustomerBookingLayout } from "@/layout"
import { CancelCompoundingFormParams } from "@/models"
import { setShowSummaryDetail } from "@/modules"
import { ridesApi } from "@/services"
import moment from "moment"
import { useRouter } from "next/router"
import { useState } from "react"
import { useDispatch } from "react-redux"

const CompoundingDepositDetail = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { compounding_car_customer_id } = router.query

  const { fetcherHandler } = useFetcher()
  const { data: compoundingCar, isInitialLoading } = useCompoundingCarCustomer({
    compounding_car_customer_id: Number(compounding_car_customer_id),
    key: `get_compounding_car_customer_${compounding_car_customer_id}`,
    type: "once",
  })

  const [showCancelModal, setShowCancelModal] = useState<boolean | undefined>()

  useEffectOnce(() => {
    return () => {
      dispatch(setShowSummaryDetail(false))
    }
  })

  useBackRouter({
    cb: () => {
      toggleBodyOverflow("unset")
    },
  })

  const toggleCancelModal = (status: boolean) => {
    setShowCancelModal(status)
    if (status) {
      toggleBodyOverflow("hidden")
    } else {
      toggleBodyOverflow("unset")
    }
  }

  const handleCancelCompoundingCar = (params: CancelCompoundingFormParams) => {
    if (!compoundingCar?.compounding_car_customer_id) return
    fetcherHandler({
      fetcher: ridesApi.cancelCompoundingCar({
        ...params,
        compounding_car_customer_id: compoundingCar.compounding_car_customer_id,
      }),
      onSuccess: () => {
        setShowCancelModal(false)
        router.push(`/c/ride-detail/cancel/${compoundingCar.compounding_car_customer_id}`)
      },
    })
  }

  return (
    <CustomerBookingLayout
      className="pb-24"
      topNode={<RideProgress state={compoundingCar?.state} />}
      title="Trạng thái chuyến đi"
      showLoading={isInitialLoading}
      rightNode={
        compoundingCar ? (
          <>
            <div className="hidden lg:block">
              <RideSummary data={compoundingCar} />
            </div>
            <div className="lg:hidden mx-12 mb-24 md:mb-0 md:mx-24 rounded-[5px] overflow-hidden mt-12">
              <RideSummaryMobile rides={compoundingCar} />
            </div>
          </>
        ) : null
      }
    >
      <div className="px-12 md:px-24">
        {isInitialLoading ? (
          <RideSummaryLoading />
        ) : compoundingCar?.compounding_car_customer_id ? (
          <>
            <div className="">
              <div className="mb-24 border-t border-solid border-border-color"></div>

              <div className="mb-24">
                <DriverInfoSummary driver={compoundingCar.car_driver_id} />
              </div>

              <div className="my-24 border-b border-solid border-border-color"></div>

              <div className="mb-[40px]">
                <ul>
                  <p className="text-base font-semibold text-blue-7 uppercase mb-24">
                    Thông tin thanh toán
                  </p>
                  <li className="flex items-center justify-between mb-[16px]">
                    <p className="text-xs">Tổng giá trị chuyến</p>
                    <p className="text-sm md:text-base ml-[16px] whitespace-nowrap flex-1 text-right">
                      {formatMoneyVND(compoundingCar?.amount_total)}
                    </p>
                  </li>
                  <li className="flex items-center justify-between">
                    <p className="text-xs">Đã đặt cọc</p>
                    <p className="text-sm md:text-base ml-[16px] whitespace-nowrap flex-1 text-right">
                      {formatMoneyVND(
                        compoundingCar.down_payment.total || (compoundingCar as any).down_payment
                      )}
                    </p>
                  </li>
                  {compoundingCar?.date_paid ? (
                    <li className="flex items-center justify-between my-[16px]">
                      <p className="text-xs">Ngày đặt cọc</p>
                      <p className="text-sm md:text-base ml-[16px] whitespace-nowrap flex-1 text-right">
                        {moment(compoundingCar.date_paid).format("DD/MM/YYYY")}
                      </p>
                    </li>
                  ) : null}

                  <div className="my-12 border-b border-solid border-border-color"></div>
                  <li className="">
                    <p className="text-xs mb-8">Số tiền còn lại cần thanh toán cho tài xế (VND)</p>
                    <p className="text-base font-semibold text-error whitespace-nowrap">
                      {formatMoneyVND(
                        compoundingCar.amount_due + compoundingCar.down_payment.total
                      )}
                    </p>
                  </li>
                </ul>
              </div>

              <div className="flex items-center md:mb-24">
                <button
                  onClick={() => toggleCancelModal(true)}
                  className="btn-primary-outline mr-12"
                >
                  Hủy chuyến
                </button>
              </div>
            </div>
          </>
        ) : null}
      </div>

      {compoundingCar ? <RideSummaryModal rides={compoundingCar} /> : null}

      {compoundingCar ? (
        <Modal
          key="cancel-compounding-car-modal"
          show={!!showCancelModal}
          onClose={() => toggleCancelModal(false)}
          heading="Hủy chuyến đi"
        >
          <RideCancelForm
            params={{
              compounding_car_customer_id: compoundingCar.compounding_car_customer_id,
              compounding_car_customer_state: compoundingCar.state,
            }}
            onSubmit={(data) => handleCancelCompoundingCar(data)}
          />
        </Modal>
      ) : null}
    </CustomerBookingLayout>
  )
}

export default CompoundingDepositDetail
