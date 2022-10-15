import { ArrowDownIcon } from "@/assets"
import { ItemSelect, Spinner } from "@/components"
import { isArrayHasValue } from "@/helper"
import { useInputText } from "@/hooks"
import { RatingReportReasonRes, ReportRatingFormParams } from "@/models"
import { ratingAPI } from "@/services"
import { useState } from "react"
import useSWR from "swr"

interface RatingReportProps {
  onSubmit?: (_: ReportRatingFormParams) => void
}

const RatingReport = ({ onSubmit }: RatingReportProps) => {
  const { onChange, value } = useInputText()
  const { error, data } = useSWR<RatingReportReasonRes[]>(
    "get_rating_report_reason_list",
    () =>
      ratingAPI
        .getRatingReportReasonList()
        .then((res) => res?.result?.data)
        .catch((err) => console.log(err)),
    {
      dedupingInterval: 60 * 1000 * 10,
    }
  )
  const [reportIds, setReportIds] = useState<number[]>([])
  const [showAll, setShowAll] = useState<boolean>(false)

  const handleSetReports = (id: number) => {
    if (reportIds?.includes(id)) {
      setReportIds([...reportIds].filter((_id) => _id !== id))
    } else {
      setReportIds([...reportIds, id])
    }
  }

  return (
    <>
      <div className="flex-1 modal-form-content">
        <ul className="mb-24">
          <p className="form-label mb-12">Chọn lý do để báo cáo:</p>
          {error === undefined && data === undefined ? (
            <Spinner className="py-24" />
          ) : (
            (data || [])
              .slice(0, showAll ? data?.length : 5)
              ?.map(({ reason_content, reason_id }) => (
                <li key={reason_id} className="mb-12 last:mb-0">
                  <ItemSelect
                    onChange={() => {
                      handleSetReports(reason_id)
                    }}
                    title={reason_content}
                    isActive={reportIds?.includes(+reason_id)}
                  />
                </li>
              ))
          )}

          {(data || [])?.length > 5 ? (
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-sm font-semibold leading-[18px] text-primary flex items-center"
            >
              <span className="mr-4">{!showAll ? "Xem thêm" : "Ẩn bớt"}</span>
              <ArrowDownIcon className={`transform ${showAll ? "rotate-[180deg]" : ""}`} />
            </button>
          ) : null}
        </ul>

        <div className="">
          <label className="form-label" htmlFor="input">
            Lý do khác
          </label>
          <textarea
            placeholder="Nhập lý do khác..."
            className="form-textarea"
            id="input"
            onChange={onChange}
            value={value}
          />
        </div>
      </div>

      <div className="modal-form-btn">
        <button
          onClick={() =>
            isArrayHasValue(reportIds) &&
            onSubmit?.({
              reported_reason_ids: reportIds,
              reported_reason_other: value || undefined,
            })
          }
          className={`btn-primary ${!isArrayHasValue(reportIds) && !value ? "btn-disabled" : ""}`}
        >
          Gửi
        </button>
      </div>
    </>
  )
}

export { RatingReport }

