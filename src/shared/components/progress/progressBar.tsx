interface ProgressBarProps {
  progressNumber: number
  showLabel?: boolean
  totalProgressNumber: number
  label?: string
}

const ProgressBar = ({
  progressNumber,
  showLabel = true,
  totalProgressNumber,
  label,
}: ProgressBarProps) => {
  return (
    <div>
      {showLabel ? (
        <div className="flex items-center justify-between mb-[4px]">
          <span className="text-16 font-medium leading-26 text-gray-color-5">
            {label || "Tiến độ"}
          </span>
          <span className="text-16 font-semibold leading-26">
            {progressNumber}/{totalProgressNumber}
          </span>
        </div>
      ) : null}

      <div className="bg-gray-color-1 w-full h-[7px] rounded-[8px] relative overflow-hidden">
        <div
          style={{
            width: (progressNumber / totalProgressNumber) * 100 + "%",
          }}
          className="absolute h-full left-[0] bg-success transition-all duration-1000"
        ></div>
      </div>
    </div>
  )
}

export { ProgressBar }
