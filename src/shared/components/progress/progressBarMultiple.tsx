interface ProgressBarMultipleProps {
  progressList: {
    key: string | number
    color: string
    number: number
    label: string
    order: number
  }[]
  totalNumber: number
}

const ProgressBarMultiple = ({ progressList, totalNumber }: ProgressBarMultipleProps) => {
  return (
    <div className="bg-gray-color-1 w-full h-[7px] rounded-[8px] relative flex overflow-hidden">
      {progressList.map(({ color, number, label, key, order }) => (
        <div
          key={key}
          className="absolute h-full left-0 transition-all duration-1000"
          style={{
            backgroundColor: color,
            width: `${(number / totalNumber) * 100}%`,
            zIndex: order,
          }}
        ></div>
      ))}
    </div>
  )
}

export { ProgressBarMultiple }
