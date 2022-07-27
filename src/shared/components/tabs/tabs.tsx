import { getActiveStringOrListString } from "@/helper"
import { useEffect, useRef } from "react"

interface TabsProps {
  list: { label: string; value: string[] | string }[]
  tabActive: string | string[]
  onChange?: (params: string | string[]) => void
  type?: "fit" | "full"
}

const Tabs = ({ tabActive, list, onChange, type = "fit" }: TabsProps) => {
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
    <ul
      className={`relative flex items-center flex-wrap border-b border-solid border-border-color ${
        type === "full" ? "" : "md:border-none"
      }`}
    >
      {list.map(({ label, value }, index) => (
        <li
          className={`select-none text-sm font-semibold relative py-[8px] cursor-pointer tabs-item-${index} hover:text-primary
          before:absolute before:bg-primary before:h-[2px] before:content-[''] before:rounded-[2px] before:w-full before:top-[calc(100%-2px)] before:hidden ${
            tabActive == value ? "" : ""
          } ${
            getActiveStringOrListString(value, tabActive) ? "text-primary" : "text-gray-color-5"
          } flex-1 text-center ${type === "full" ? "" : "sm:flex-none sm:text-left"} ${
            index < list.length - 1 ? "mr-[8px] sm:mr-[24px]" : "mr-0"
          }`}
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
          className={`tabs-line absolute bottom-0 h-[2px] rounded-[4px] bg-primary transition-all duration-200`}
        ></span>
      ) : null}
    </ul>
  )
}

export { Tabs }
