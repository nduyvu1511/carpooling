import { formatMoneyVND, PAYMENT_PURPOSE_NAME } from "@/helper"
import { useEffectOnce } from "@/hooks"
import { JournalDetailRes } from "@/models"
import { userApi } from "@/services"
import moment from "moment"
import useSWR from "swr"
import { Spinner } from "../loading"

interface TransactionDetailProps {
  payment_id: number
}

const TransactionDetail = ({ payment_id }: TransactionDetailProps) => {
  const { isValidating, mutate, data } = useSWR<JournalDetailRes>(
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
        <div className="min-h-[300px]">
          <Spinner size={40} className="py-[50px]" />
        </div>
      ) : data?.partner_id ? (
        <div>
          <ul className="mb-[40px]">
            <li className="flex items-start mb-12">
              <p className="text-xs w-[200px] mr-24">Mã giao dịch</p>
              <p className="text-14 md:text-16 font-semibold text-primary flex-1">089IUIUHIB980</p>
            </li>
            <li className="flex items-start mb-12">
              <p className="text-xs w-[200px] mr-24">Số tiền giao dịch</p>
              <p className="text-14 md:text-16 font-semibold text-error flex-1">
                {formatMoneyVND(data?.partner_id.amount)}
              </p>
            </li>
            <li className="flex items-start mb-[16px]">
              <p className="text-xs w-[200px] mr-24">Phương thức hoàn tiền</p>
              <p className="text-sm md:text-base flex-1">
                {PAYMENT_PURPOSE_NAME[data.payment_purpose]}
              </p>
            </li>

            <li className="flex items-start mb-[16px]">
              <p className="text-xs w-[200px] mr-24">Ngày giao dịch</p>
              <p className="text-sm md:text-base flex-1">
                {moment(data.partner_id.date).format("HH:mm DD/MM/YYYY")}
              </p>
            </li>
            <li className="flex items-start">
              <p className="text-xs w-[200px] mr-24">Tình trạng</p>
              <p className="text-sm md:text-base flex-1">Đã hoàn tiền</p>
            </li>
          </ul>

          {/* <div className="absolute p-12 bg-white-color lg:static left-0 right-0 bottom-0 lg:p-0">
            <button className="btn-primary mx-auto">Gửi Hoá đơn</button>
          </div> */}
        </div>
      ) : null}
    </>
  )
}

export { TransactionDetail }
