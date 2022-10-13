import { MessageIcon, PhoneIcon2 } from "@/assets"
import { formatMoneyVND, PAYMENT_METHOD_NAME, toImageUrl } from "@/helper"
import { CompoundingCarCustomer, CustomerInvoice } from "@/models"
import moment from "moment"
import Image from "next/image"
import { SummaryItem } from "./summaryItem"

interface RideSummaryPassengerItemProps {
  data: CompoundingCarCustomer | CustomerInvoice
  onChat?: (id: number) => void
}

const RideSummaryPassengerItem = ({ data, onChat }: RideSummaryPassengerItemProps) => {
  return (
    <>
      <div className="flex items-center justify-between mb-24">
        <div className="flex items-center">
          <div className="w-[32px] h-[32px] rounded-[50%] overflow-hidden relative">
            <Image
              src={toImageUrl(data?.partner?.avatar_url?.image_url)}
              alt=""
              layout="fill"
              objectFit="cover"
            />
          </div>
          <p className="text-base font-semibold text-primary ml-12 flex-1 line-clamp-1 word-break mr-12">
            {data.partner.partner_name}
          </p>
        </div>

        <div className="items-center flex">
          <a className="mr-16" href={`tel:${data.partner.phone}`}>
            <PhoneIcon2 className="w-[18px] h-[18px]" />
          </a>
          <button onClick={() => onChat?.(data.partner.partner_id)}>
            <MessageIcon className="text-primary w-[24px] h-[24px]" />
          </button>
        </div>
      </div>
      <SummaryItem
        label="Điểm đón"
        value={data.from_address || data?.from_province.province_name}
      />
      <SummaryItem label="Điểm đến" value={data.to_address || data?.to_province.province_name} />
      <SummaryItem label="Ghi chú" value={data?.note || "Không có ghi chú nào"} />
      <SummaryItem
        label="Ngày đi"
        value={moment(data.expected_going_on_date).format("HH:mm DD/MM/YYYY")}
      />
      {data?.payment_method ? (
        <SummaryItem
          label="Phương thức thanh toán"
          value={PAYMENT_METHOD_NAME?.[data.payment_method]}
        />
      ) : null}

      {(data as CustomerInvoice)?.payment_amount ? (
        <li className="flex items-start justify-between">
          <p className="text-sm md:text-base font-semibold md:font-semibold mr-12">
            Số tiền đã trả
          </p>
          <p className="flex-1 text-14 md:text-16 text-right text-error font-semibold">
            {formatMoneyVND((data as CustomerInvoice).payment_amount)}
          </p>
        </li>
      ) : null}
    </>
  )
}

export { RideSummaryPassengerItem }
