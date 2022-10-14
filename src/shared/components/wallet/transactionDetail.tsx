import { formatMoneyVND, PAYMENT_PURPOSE_COLOR, PAYMENT_PURPOSE_NAME } from "@/helper"
import { JournalDetailCompoundingCarCustomerRes, JournalDetailRes } from "@/models"
import { userAPI } from "@/services"
import moment from "moment"
import useSWR from "swr"
import { Spinner } from "../loading"
import { RideSummaryInfo } from "../summary"

interface TransactionDetailProps {
  payment_id: number
}

const TransactionDetail = ({ payment_id }: TransactionDetailProps) => {
  const { isValidating, data } = useSWR<JournalDetailRes | JournalDetailCompoundingCarCustomerRes>(
    payment_id ? `get_transaction_detail_${payment_id}` : null,
    () =>
      userAPI
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
              <p className="text-xs w-[200px] mr-16">Mã giao dịch</p>
              <p className="text-14 md:text-16 font-semibold text-primary xs:flex-1 text-right xs:whitespace-nowrap">
                {(data as JournalDetailCompoundingCarCustomerRes)?.payment_id?.payment_code}
              </p>
            </li>
            <li className="flex items-start mb-12">
              <p className="text-xs w-[200px] mr-16">Số tiền giao dịch</p>
              <p className="text-14 md:text-16 font-semibold text-error flex-1 text-right">
                {formatMoneyVND(data?.payment_id?.amount)}
              </p>
            </li>
            <li className="flex items-star justify-between mb-16">
              <p className="text-xs w-[200px] mr-16">Phương thức hoàn tiền</p>
              <span
                style={{
                  color: PAYMENT_PURPOSE_COLOR[data.payment_purpose]?.color,
                  backgroundColor: PAYMENT_PURPOSE_COLOR[data.payment_purpose]?.bg,
                }}
                className="text-xs px-8 py-4 text-right rounded-[5px]"
              >
                {PAYMENT_PURPOSE_NAME[data?.payment_purpose]}
              </span>
            </li>

            <li className="flex items-start mb-16">
              <p className="text-xs w-[200px] mr-16">Ngày giao dịch</p>
              <p className="text-sm md:text-base flex-1 text-right">
                {moment(data?.payment_id?.date)?.format("HH:mm DD/MM/YYYY")}
              </p>
            </li>
            {/* <li className="flex items-start">
              <p className="text-xs w-[200px] mr-16">Tình trạng</p>
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
