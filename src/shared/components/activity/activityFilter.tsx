import { getActiveStringOrListString } from "@/helper"
import { ActivityItem } from "@/models"

interface ActivityFilterProps<T> {
  onChange?: (params: string | string[]) => void
  itemActive?: string | string[]
  list: ActivityItem<T>[]
}

const ActivityFilter = <T extends string | string[]>({
  onChange,
  itemActive = "",
  list,
}: ActivityFilterProps<T>) => {
  return (
    <ul className="flex items-center">
      {list.map(({ label, value = "", color }, index) => (
        <li
          style={{
            border: !getActiveStringOrListString(value, itemActive) ? `1px solid ${color}` : 0,
            color: getActiveStringOrListString(value, itemActive) ? "#ffffff" : color,
            backgroundColor: !getActiveStringOrListString(value, itemActive) ? "#ffffff" : color,
          }}
          onClick={() => onChange?.(value)}
          className={`cursor-pointer text-sm py-[4px] px-[8px] rounded-[5px] mr-[20px] last:mr-0`}
          key={index}
        >
          {label}
        </li>
      ))}
    </ul>
  )
}

export { ActivityFilter }
