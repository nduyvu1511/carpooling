interface ProgressBarProps {
  progressNumber: number
  showLabel?: boolean
  totalProgressNumber: number
  label?: string
  type?: "solid" | "dashed"
}

const ProgressBar = ({
  progressNumber,
  showLabel = true,
  totalProgressNumber,
  label,
  type = "solid",
}: ProgressBarProps) => {
  return (
    <div>
      {showLabel ? (
        <div className="flex items-center justify-between mb-8 md:mb-[16px]">
          <span className="text-14 font-semibold md:text-16 leading-26">{label || "Tiến độ"}</span>
          <span className="text-16 font-semibold leading-26">
            {progressNumber}/{totalProgressNumber}
          </span>
        </div>
      ) : null}

      {type === "solid" ? (
        <div className="bg-gray-20 w-full h-[6px] rounded-[30px] relative overflow-hidden">
          <div
            style={{
              width: (progressNumber / totalProgressNumber) * 100 + "%",
            }}
            className="absolute h-full left-[0] bg-green-20 transition-all duration-1000"
          ></div>
        </div>
      ) : (
        <div className="h-[7px] rounded-[30px] flex items-center gap-4">
          {Array.from({ length: totalProgressNumber }).map((_, index) => (
            <span
              className={`h-full left-0 flex-1 rounded-[30px] ${
                index + 1 <= progressNumber ? "bg-green-20" : "bg-gray-20"
              }`}
              key={index}
            ></span>
          ))}
        </div>
      )}
    </div>
  )
}

export { ProgressBar }
