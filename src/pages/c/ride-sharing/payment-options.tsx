import {
  Alert,
  DriverInfoSummary,
  ItemSelect,
  RideProgress,
  RideSummary,
  RideSummaryMobile,
  RideSummaryModal
} from "@/components"
import { formatMoneyVND, toggleBodyOverflow } from "@/helper"
import { useBackRouter, useCompoundingCarCustomer, useEffectOnce, useFetcher } from "@/hooks"
import { CustomerBookingLayout } from "@/layout"
import { PaymentMethod } from "@/models"
import { setShowSummaryDetail } from "@/modules"
import { ridesApi } from "@/services"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

const CheckoutOptions = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { compounding_car_customer_id } = router.query
  const { fetcherHandler } = useFetcher()

  const { data: compoundingCar, isInitialLoading } = useCompoundingCarCustomer({
    key: `get_compounding_car_customer_to_check_full_${compounding_car_customer_id}`,
    type: "once",
    compounding_car_customer_id: Number(compounding_car_customer_id),
  })
  const [paymentType, setPaymentType] = useState<PaymentMethod | undefined>()
  const [showAlert, setShowAlert] = useState<boolean>(false)

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

  // Check deposit status
  useEffect(() => {
    if (compoundingCar?.state === "confirm_paid") {
      router.push(
        `/c/ride-sharing/checkout-success?compounding_car_customer_id=${compounding_car_customer_id}`
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [compoundingCar])

  const handleCheckoutMethod = async () => {
    if (!paymentType) return
    fetcherHandler({
      fetcher: ridesApi.customerPayForRemainingAmount({
        compounding_car_customer_id: Number(compounding_car_customer_id),
        payment_method: paymentType,
      }),
      onSuccess: () => {
        if (paymentType === "cash") {
          setShowAlert(true)
        } else {
          router.push(
            `/c/ride-sharing/checkout?compounding_car_customer_id=${compounding_car_customer_id}`
          )
        }
      },
    })
  }

  return (
    <>
      <CustomerBookingLayout
        reverse
        topNode={<RideProgress state={compoundingCar?.state} />}
        showLoading={isInitialLoading}
        rightNode={
          compoundingCar ? (
            <>
              <div className="hidden lg:block">
                <RideSummary data={compoundingCar} />
              </div>
              <div className="lg:hidden mx-12 mb-12 md:mb-24 md:mx-24 rounded-[5px] overflow-hidden">
                <RideSummaryMobile rides={compoundingCar} />
              </div>
            </>
          ) : null
        }
        title="Thanh toán cho chuyến đi"
      >
        <div className="flex-1 bg-white-color">
          <div className="">
            <div className="px-12 md:px-24 pt-12">
              <div className="mb-24">
                {isInitialLoading ? (
                  <>
                    <div className="skeleton h-[18px] w-[60%] rounded-[5px] mb-12"></div>
                    <div className="skeleton h-[18px] w-[60%] rounded-[5px]"></div>
                  </>
                ) : compoundingCar?.compounding_car_customer_id ? (
                  <ul>
                    <p className="text-base uppercase font-semibold mb-24">
                      Tổng giá trị chuyến đi
                    </p>
                    <li className="flex justify-between items-start mb-12">
                      <p className="text-xs leading-[26px] mr-[24px]">Tổng giá trị chuyến đi</p>
                      <p className="flex-1 text-sm whitespace-nowrap text-right">
                        {formatMoneyVND(
                          compoundingCar?.amount_total || compoundingCar?.price_unit.price_unit
                        )}
                      </p>
                    </li>
                    <li className="flex items-start">
                      <p className="text-xs leading-[26px] mr-[24px]">Đã đặt cọc</p>
                      <p className="flex-1 text-sm whitespace-nowrap text-right">
                        {formatMoneyVND(compoundingCar?.down_payment?.total || 0)}
                      </p>
                    </li>
                  </ul>
                ) : null}
              </div>
              <div className="mb-24 border-b border-solid border-border-color"></div>
              <div className="mb-[40px]">
                {isInitialLoading ? (
                  <>
                    <div className="skeleton h-[14px] rounded-[5px] w-[50%] mb-12"></div>
                    <div className="skeleton h-[14px] rounded-[5px] w-[50%]"></div>
                  </>
                ) : (
                  <>
                    <p className="text-xs mb-12">Số tiền còn lại cần thanh toán cho tài xế (VND)</p>
                    <p className="text-xl text-error">
                      {formatMoneyVND(compoundingCar?.amount_due || 0)}
                    </p>
                  </>
                )}
              </div>

              <div className=" mb-[40px]">
                <p className="text-base uppercase font-semibold mb-24">Chọn hình thức thanh toán</p>
                <ul className="md:mb-[40px]">
                  {[
                    ["Thanh toán cho tài xế", "cash"],
                    ["Thanh toán online", "transfer"],
                  ].map(([label, value]) => (
                    <li key={value} className="mb-[16px] last:mb-0">
                      <ItemSelect
                        isActive={paymentType === value}
                        onChange={() => setPaymentType(value as PaymentMethod)}
                        title={label}
                      />
                    </li>
                  ))}
                </ul>
                <div className="fixed bg-white-color p-12 z-[1000] md:p-0 left-0 right-0 bottom-0 lg:bg-[transparent] md:static ">
                  <button
                    onClick={handleCheckoutMethod}
                    className={`btn-primary mx-auto md:mx-[unset] ${
                      paymentType ? "" : "btn-disabled"
                    } `}
                  >
                    Tiến hành thanh toán
                  </button>
                </div>
              </div>
            </div>
          </div>
          {compoundingCar?.car_driver_id ? (
            <div className="mx-12 md:mx-24 lg:hidden rounded-[4px] mb-24">
              <DriverInfoSummary driver={compoundingCar?.car_driver_id} />
            </div>
          ) : null}

          {compoundingCar ? <RideSummaryModal rides={compoundingCar} /> : null}
        </div>
      </CustomerBookingLayout>
      <Alert
        show={showAlert}
        onClose={() => setShowAlert(false)}
        onConfirm={() => {
          setShowAlert(false)
          router.push(
            `/c/ride-sharing/checkout-success?compounding_car_customer_id=${compoundingCar?.compounding_car_customer_id}`
          )
        }}
        showLeftBtn={false}
        title="Chọn hình thức thanh toán thành công, vui lòng thanh toán số tiền còn lại cho tài xế và hoàn tất chuyến đi"
      />
    </>
  )
}

export default CheckoutOptions
