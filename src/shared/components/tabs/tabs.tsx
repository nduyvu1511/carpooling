import { getActiveStringOrListString } from "@/helper"
import { useEffect, useRef } from "react"

interface TabsProps {
  list: { label: string; value: string[] | string }[]
  tabActive: string | string[]
  onChange?: (params: string | string[]) => void
}

const Tabs = ({ tabActive, list, onChange }: TabsProps) => {
  const lineRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    getTabActive(list.findIndex((item) => getActiveStringOrListString(item.value, tabActive)))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabActive])

  const getTabActive = (index: number) => {
    const tabItem: HTMLLIElement | null = document.querySelector(`.tabs-item-${index}`)
    if (!tabItem || !lineRef.current) return
    const offsetLeft = tabItem.offsetLeft || 0
    const offsetWidth = tabItem.offsetWidth || 0
    lineRef.current.style.left = offsetLeft + "px"
    lineRef.current.style.width = offsetWidth + "px"
  }

  return (
    <ul className="relative flex items-center flex-wrap">
      {list.map(({ label, value }, index) => (
        <li
          className={`select-none text-sm mr-[20px] py-[8px] last:mr-0 cursor-pointer tabs-item-${index} transition-all duration-200 ${
            getActiveStringOrListString(value, tabActive) ? "text-primary" : ""
          } `}
          key={index}
          onClick={() => {
            onChange?.(value)
          }}
        >
          {label}
        </li>
      ))}

      {tabActive ? (
        <span
          ref={lineRef}
          className={`tabs-line absolute bottom-0 h-[2px] bg-primary transition-all duration-200`}
        ></span>
      ) : null}
    </ul>
  )
}

export { Tabs }
