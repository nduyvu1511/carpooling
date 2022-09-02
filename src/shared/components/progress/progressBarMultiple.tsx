interface ProgressBarMultipleProps {
  type?: "solid" | "dashed"
  progressList: {
    key: string | number
    color: string
    number: number
    label: string
    order: number
  }[]
  totalNumber: number
  height?: number
}

const ProgressBarMultiple = ({
  progressList,
  totalNumber,
  type = "solid",
  height = 7,
}: ProgressBarMultipleProps) => {
  return (
    <div
      style={{ height }}
      className={`${
        type === "solid" ? "bg-gray-20" : ""
      } w-full rounded-[8px] relative flex overflow-hidden`}
    >
      {type === "dashed" ? (
        <div className="flex absolute h-full left-0 right-0">
          {Array.from({ length: totalNumber }).map((_, index) => (
            <div
              className="rounded-[30px] flex-1 mr-4 h-full"
              style={{
                backgroundColor: "#f0f0f0",
                zIndex: 0,
              }}
              key={index}
            ></div>
          ))}
        </div>
      ) : null}

      {progressList.map(({ color, number, label, key, order }) => (
        <div
          key={key}
          className="absolute flex h-full left-0 right-0"
          style={{
            backgroundColor: type === "solid" ? color : "transparent",
            width: `${(number / totalNumber) * 100}%`,
            zIndex: order,
          }}
        >
          {type === "dashed"
            ? Array.from({ length: number }).map((_, index) => (
                <div
                  key={index}
                  className="flex-1 mr-[4px] rounded-[30px]"
                  style={{
                    backgroundColor: color,
                    width: `${(index / number) * 100}%`,
                    zIndex: order,
                  }}
                ></div>
              ))
            : null}
        </div>
      ))}
    </div>
  )
}

export { ProgressBarMultiple }
