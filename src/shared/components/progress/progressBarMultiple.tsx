interface ProgressBarMultipleProps {
  progressList: {
    key: string | number
    color: string
    number: number
    label: string
  }[]
  totalNumber: number
}

const ProgressBarMultiple = ({ progressList, totalNumber }: ProgressBarMultipleProps) => {
  return (
    <div className="bg-gray-color-1 w-full h-[7px] rounded-[8px] relative flex overflow-hidden">
      {progressList.map(({ color, number, label, key }) => (
        <div
          key={key}
          className="relative"
          style={{ backgroundColor: color, width: `${(number / totalNumber) * 100}%` }}
        ></div>
      ))}
    </div>
  )
}

export { ProgressBarMultiple }
