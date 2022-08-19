import { formatMoneyVND, PAYMENT_PURPOSE_NAME } from "@/helper"
import { JournalDetailCompoundingCarCustomerRes, JournalDetailRes } from "@/models"
import { userApi } from "@/services"
import moment from "moment"
import useSWR from "swr"
import { Spinner } from "../loading"
import { RideSummaryInfo } from "../summary"

interface TransactionDetailProps {
  payment_id: number
}

const TransactionDetail = ({ payment_id }: TransactionDetailProps) => {
  const { isValidating, mutate, data } = useSWR<
    JournalDetailRes | JournalDetailCompoundingCarCustomerRes
  >(
    payment_id ? `get_transaction_detail_${payment_id}` : null,
    () =>
      userApi
        .getDetailTransaction({ payment_id })
        .then((res) => res.result.data)
        .catch((err) => console.log(err)),
    {
      dedupingInterval: 1000,
    }
  )

  return (
    <>
      {isValidating ? (
        <div className="min-h-[300px]">
          <Spinner size={40} className="py-[50px]" />
        </div>
      ) : data?.payment_purpose ? (
        <div>
          <ul className="mb-[40px]">
            <li className="flex items-start mb-12">
              <p className="text-xs w-[200px] mr-[16px]">Mã giao dịch</p>
              <p className="text-14 md:text-16 font-semibold text-primary xs:flex-1 text-right xs:whitespace-nowrap">
                {(data as JournalDetailCompoundingCarCustomerRes)?.payment_id?.payment_code}
              </p>
            </li>
            <li className="flex items-start mb-12">
              <p className="text-xs w-[200px] mr-[16px]">Số tiền giao dịch</p>
              <p className="text-14 md:text-16 font-semibold text-error flex-1 text-right">
                {formatMoneyVND(data?.payment_id?.amount)}
              </p>
            </li>
            <li className="flex items-start mb-[16px]">
              <p className="text-xs w-[200px] mr-[16px]">Phương thức hoàn tiền</p>
              <p className="text-sm md:text-base flex-1 text-right">
                {PAYMENT_PURPOSE_NAME[data?.payment_purpose]}
              </p>
            </li>

            <li className="flex items-start mb-[16px]">
              <p className="text-xs w-[200px] mr-[16px]">Ngày giao dịch</p>
              <p className="text-sm md:text-base flex-1 text-right">
                {moment(data?.payment_id?.date)?.format("DD/MM/YYYY")}
              </p>
            </li>
            {/* <li className="flex items-start">
              <p className="text-xs w-[200px] mr-[16px]">Tình trạng</p>
              <p className="text-sm md:text-base flex-1 text-right">Đã hoàn tiền</p>
            </li> */}
          </ul>

          {(data as JournalDetailCompoundingCarCustomerRes)?.compounding_car_customer_id ? (
            <RideSummaryInfo
              data={(data as JournalDetailCompoundingCarCustomerRes)?.compounding_car_customer_id}
            />
          ) : null}

          {/* <div className="absolute p-12 bg-white-color lg:static left-0 right-0 bottom-0 lg:p-0">
            <button className="btn-primary mx-auto">Gửi Hoá đơn</button>
          </div> */}
        </div>
      ) : null}
    </>
  )
}

export { TransactionDetail }
