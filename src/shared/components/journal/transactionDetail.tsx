import { formatMoneyVND, PAYMENT_PURPOSE_NAME } from "@/helper"
import { useEffectOnce } from "@/hooks"
import { TransactionRes } from "@/models"
import { userApi } from "@/services"
import moment from "moment"
import useSWR from "swr"
import { RidesSummaryLoading } from "../loading"

interface TransactionDetailProps {
  payment_id: number
}

const TransactionDetail = ({ payment_id }: TransactionDetailProps) => {
  const { isValidating, mutate, data } = useSWR<TransactionRes>(
    payment_id ? "get_transaction_detail" : null,
    () =>
      userApi
        .getDetailTransaction({ payment_id })
        .then((res) => res.result.data)
        .catch((err) => console.log(err)),
    {
      dedupingInterval: 1000,
    }
  )

  useEffectOnce(() => {
    return () => mutate(undefined, false)
  })

  return (
    <>
      {isValidating ? (
        <div className="">
          <div className="skeleton h-[12px]"></div>
          <div className="skeleton h-[12px]"></div>
        </div>
      ) : data?.partner_id ? (
        <div>
          <ul className="mb-[40px]">
            {/* <li className="flex items-start mb-12">
              <p className="text-14 md:text-16 font-semibold uppercase w-[240px] mr-24">
                Số tiền giao dịch
              </p>
              <p className="text-14 md:text-16 font-semibold text-primary flex-1">
                {formatMoneyVND(data?.amount)}
              </p>
            </li> */}
            {data?.compounding_car?.compounding_car_name}
            <li className="flex items-start mb-[16px]">
              <p className="text-xs w-[240px] mr-24">Phương thức hoàn tiền</p>
              <p className="text-sm md:text-base flex-1">
                {PAYMENT_PURPOSE_NAME[data.payment_purpose]}
              </p>
            </li>

            <li className="flex items-start mb-[16px]">
              <p className="text-xs w-[240px] mr-24">Ngày giao dịch</p>
              <p className="text-sm md:text-base flex-1">
                {moment(data.date).format("HH:mm DD/MM/YYYY")}
              </p>
            </li>
            {/* <li className="flex items-start">
              <p className="text-xs w-[240px] mr-24">Tình trạng</p>
              <p className="text-sm md:text-base flex-1">Đã hoàn tiền</p>
            </li> */}
          </ul>

          {/* <ul className="mb-[40px]">
            <li className="flex items-start mb-[16px]">
              <p className="text-xs w-[240px] mr-24">Điểm đón</p>
              <p className="text-sm md:text-base flex-1">TP.HCM</p>
            </li>

            <li className="flex items-start mb-[16px]">
              <p className="text-xs w-[240px] mr-24">Điểm đến</p>
              <p className="text-sm md:text-base flex-1">Cà Mau</p>
            </li>

            <li className="flex items-start mb-[16px]">
              <p className="text-xs w-[240px] mr-24">Ngày đi</p>
              <p className="text-sm md:text-base flex-1">
                {moment("07:00 22/07/2022").format("HH:mm DD/MM/YYYY")}
              </p>
            </li>
            <li className="flex items-start mb-[16px]">
              <p className="text-xs w-[240px] mr-24">Ngày về</p>
              <p className="text-sm md:text-base flex-1">
                {moment("07:00 22/07/2022").format("HH:mm DD/MM/YYYY")}
              </p>
            </li>
            <li className="flex items-start mb-12">
              <p className="text-xs w-[240px] mr-24">Loại chuyến</p>
              <p className="text-sm md:text-base flex-1">Một chiều</p>
            </li>
            <li className="flex items-start">
              <p className="text-xs w-[240px] mr-24">Loại xe</p>
              <p className="text-sm md:text-base flex-1">7 chỗ</p>
            </li>
          </ul> */}

          <div className="fixed p-12 bg-white-color lg:static left-0 right-0 bottom-0 lg:p-0">
            <button className="btn-primary mx-auto">Gửi Hoá đơn</button>
          </div>
        </div>
      ) : null}
    </>
  )
}

export { TransactionDetail }
