import { RideSummaryInfo, Spinner, TransactionInvoice } from "@/components"
import { formatMoneyVND, PAYMENT_PURPOSE_COLOR, PAYMENT_PURPOSE_NAME } from "@/helper"
import {
  DriverCompoundingCarInvoiceRes,
  JournalDetailCompoundingCarCustomerRes,
  JournalDetailRes,
} from "@/models"
import { userAPI } from "@/services"
import moment from "moment"
import useSWR from "swr"

interface TransactionDetailProps {
  payment_id: number
}

const TransactionDetail = ({ payment_id }: TransactionDetailProps) => {
  const { data, error } = useSWR<
    JournalDetailRes | JournalDetailCompoundingCarCustomerRes | DriverCompoundingCarInvoiceRes
  >(
    payment_id ? `get_transaction_detail_${payment_id}` : null,
    () =>
      userAPI
        .getDetailTransaction({ payment_id })
        .then((res) => res.result.data)
        .catch((err) => console.log(err)),
    {
      dedupingInterval: 1000 * 60 * 10,
    }
  )

  return (
    <>
      {error === undefined && data === undefined ? (
        <Spinner size={24} className="py-[24px]" />
      ) : (data as JournalDetailRes)?.payment_purpose ? (
        <>
          <ul>
            <li className="flex items-start mb-12">
              <p className="text-xs w-[150px] mr-16">Mã giao dịch</p>
              <p className="text-14 md:text-16 font-semibold text-primary xs:flex-1 text-right word-anywhere">
                {(data as JournalDetailCompoundingCarCustomerRes)?.payment_id?.payment_code}
              </p>
            </li>

            <li className="flex items-start justify-between mb-16">
              <p className="text-xs w-[150px] mr-16">Loại giao dịch</p>
              <span
                style={{
                  color: PAYMENT_PURPOSE_COLOR[(data as JournalDetailRes).payment_purpose]?.color,
                  backgroundColor:
                    PAYMENT_PURPOSE_COLOR[(data as JournalDetailRes).payment_purpose]?.bg,
                }}
                className="text-xs px-8 py-4 text-right rounded-[5px]"
              >
                {PAYMENT_PURPOSE_NAME[(data as JournalDetailRes)?.payment_purpose]}
              </span>
            </li>

            <li className="flex items-start mb-16">
              <p className="text-xs w-[150px] mr-16">Thời gian thanh toán</p>
              <p className="text-sm md:text-base flex-1 text-right">
                {moment((data as JournalDetailRes)?.payment_id?.date)?.format("HH:mm DD/MM/YYYY")}
              </p>
            </li>

            <li className="flex items-start mb-16">
              <p className="text-xs w-[150px] mr-16">Nguồn tiền</p>
              <p className="text-sm md:text-base flex-1 text-right">Ví Exxe</p>
            </li>

            <li className="flex items-start mb-16">
              <p className="text-xs w-[150px] mr-16">Phí giao dịch</p>
              <p className="text-sm md:text-base flex-1 text-right">Miễn phí</p>
            </li>

            <li className="flex items-start mb-12">
              <p className="text-xs w-[150px] mr-16">Số tiền giao dịch</p>
              <p className="text-14 md:text-16 font-semibold text-error flex-1 text-right">
                {formatMoneyVND((data as JournalDetailRes)?.payment_id?.amount)}
              </p>
            </li>
          </ul>

          {(data as JournalDetailCompoundingCarCustomerRes)?.compounding_car_customer_id
            ?.compounding_car_id ? (
            <div className="mt-40">
              <RideSummaryInfo
                data={(data as JournalDetailCompoundingCarCustomerRes)?.compounding_car_customer_id}
              />
            </div>
          ) : null}
        </>
      ) : (data as DriverCompoundingCarInvoiceRes)?.compounding_car_id ? (
        <TransactionInvoice data={data as DriverCompoundingCarInvoiceRes} />
      ) : null}
    </>
  )
}

export { TransactionDetail }
