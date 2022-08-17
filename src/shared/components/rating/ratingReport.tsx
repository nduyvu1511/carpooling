import { ItemSelect } from "@/components"
import { isArrayHasValue } from "@/helper"
import { useState } from "react"

interface RatingReportProps {
  onSubmit?: Function
  list: { id: number; label: string }[]
  view?: "modal" | "page"
}

const RatingReport = ({ onSubmit, list, view }: RatingReportProps) => {
  const [reports, setReports] = useState<number[]>([])

  const handleSetReports = (id: number) => {
    if (reports?.includes(id)) {
      setReports([...reports].filter((_id) => _id !== id))
    } else {
      setReports([...reports, id])
    }
  }

  return (
    <div className="flex-1 flex flex-col">
      <ul className="mb-[40px] flex-1">
        {list.map(({ id, label }) => (
          <li key={id} className="mb-[16px] last:mb-0">
            <ItemSelect
              onChange={() => {
                handleSetReports(+id)
              }}
              title={label + ""}
              isActive={reports?.includes(+id)}
            />
          </li>
        ))}
      </ul>

      <div className="h-[64px] flex-center">
        <button
          onClick={() => isArrayHasValue(reports) && onSubmit?.()}
          className={`btn-primary ${!isArrayHasValue(reports) ? "btn-disabled" : ""}`}
        >
          Gửi
        </button>
      </div>
    </div>
  )
}

export { RatingReport }
