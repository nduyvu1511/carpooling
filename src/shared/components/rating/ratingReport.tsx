import { ItemSelect } from "@/components"
import { isArrayHasValue } from "@/helper"
import { useState } from "react"

interface RatingReportProps {
  onSubmit?: Function
  list: { id: number; label: string }[]
}

const RatingReport = ({ onSubmit, list }: RatingReportProps) => {
  const [reports, setReports] = useState<number[]>([])

  const handleSetReports = (id: number) => {
    if (reports?.includes(id)) {
      setReports([...reports].filter((_id) => _id !== id))
    } else {
      setReports([...reports, id])
    }
  }

  return (
    <div className="">
      <ul className="mb-[40px]">
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

      <button
        onClick={() => isArrayHasValue(reports) && onSubmit?.()}
        className={`btn-primary ${!isArrayHasValue(reports) ? "btn-disabled" : ""}`}
      >
        Gửi
      </button>
    </div>
  )
}

export { RatingReport }
