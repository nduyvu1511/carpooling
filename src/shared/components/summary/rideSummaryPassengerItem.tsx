import { formatMoneyVND } from "@/helper"
import { CompoundingCarCustomer, CustomerInvoice } from "@/models"
import moment from "moment"

interface RideSummaryPassengerItemProps {
  data: CompoundingCarCustomer | CustomerInvoice
}

const RideSummaryPassengerItem = ({ data }: RideSummaryPassengerItemProps) => {
  return (
    <ul>
      <li className="flex items-start justify-between mb-12">
        <p className="text-xs mr-12 min-w-[100px]">Tên khách hàng</p>
        <p className="whitespace-nowrap text-sm md:text-base text-right">
          {data?.partner?.partner_name}
        </p>
      </li>
      <li className="flex items-start justify-between mb-12">
        <p className="text-xs mr-12 min-w-[100px]">SĐT</p>
        <a
          href={`tel:${data.partner.phone}`}
          className="whitespace-nowrap text-14 md:text-16 font-medium text-right underline text-primary"
        >
          {data?.partner?.phone}
        </a>
      </li>
      <li className="flex items-start justify-between mb-12">
        <p className="text-xs mr-12 min-w-[100px]">Điểm đi</p>
        <p className="text-sm md:text-base text-right">{data.from_address}</p>
      </li>
      <li className="flex items-start justify-between mb-12">
        <p className="text-xs mr-12 min-w-[100px]">Điếm đến</p>
        <p className="text-sm md:text-base text-right">{data.to_address}</p>
      </li>
      <li className="flex items-start justify-between mb-12">
        <p className="text-xs mr-12 min-w-[100px]">Ngày đi</p>
        <p className="whitespace-nowrap text-sm md:text-base text-right">
          {moment(data.expected_going_on_date).format("HH:mm DD/MM/YYYY")}
        </p>
      </li>
      {(data as CustomerInvoice)?.payment_amount ? (
        <li className="flex items-start justify-between mb-12">
          <p className="text-xs mr-12 min-w-[100px]">Số tiền đã trả</p>
          <p className="whitespace-nowrap text-sm md:text-base text-right">
            {formatMoneyVND((data as CustomerInvoice).payment_amount)}
          </p>
        </li>
      ) : null}
    </ul>
  )
}

export { RideSummaryPassengerItem }
