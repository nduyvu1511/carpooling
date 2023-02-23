import { getActiveStringOrListString } from "@/helper"
import { useBreakpoint } from "@/hooks"
import { useEffect, useRef } from "react"

interface TabsProps {
  list: { label: string; value: string[] | string }[]
  tabActive: string | string[]
  onChange?: (params: string | string[]) => void
  type?: "fit" | "full"
  className?: string
  labelClassName?: string
}

const Tabs = ({
  tabActive,
  list,
  onChange,
  type = "fit",
  className = "",
  labelClassName = "",
}: TabsProps) => {
  const lineRef = useRef<HTMLSpanElement>(null)
  const width = useBreakpoint()

  useEffect(() => {
    getTabActive(list.findIndex((item) => getActiveStringOrListString(item.value, tabActive)))
  }, [list, tabActive, width])

  const getTabActive = (index: number) => {
    const tabItem: HTMLLIElement | null = document.querySelector(`.tabs-item-${index}`)
    if (!tabItem || !lineRef.current) return
    const offsetLeft = tabItem.offsetLeft || 0
    const offsetWidth = tabItem.offsetWidth || 0
    lineRef.current.style.left = offsetLeft + "px"
    lineRef.current.style.width = offsetWidth + "px"
  }

  // useEffect(() => {
  //   if (!tabActive) return
  //   const index = list.findIndex((item) => item.value === tabActive)
  //   const childWidth = document.querySelector(`.tabs-item-${index}`)?.clientWidth || 0
  //   ;(document.querySelector(`.tabs`) as any).style.transform = `translateX(-${childWidth / 2}px)`
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [tabActive])

  return (
    <ul
      className={`tabs relative w-full flex items-center flex-wrap border-b border-solid border-border-color ${
        type === "full" ? "" : "md:border-none"
      } ${className}`}
    >
      {list.map(({ label, value }, index) => (
        <li
          className={`select-none whitespace-nowrap text-sm font-semibold relative py-[8px] cursor-pointer tabs-item-${index} hover:text-primary
          before:absolute before:bg-primary before:h-[1px] before:content-[''] before:rounded-[1px] before:w-full before:top-[calc(100%-1px)] before:hidden ${
            getActiveStringOrListString(value, tabActive) ? "text-primary" : "text-gray-color-5"
          } ${type === "full" ? "flex-1 text-center" : "sm:flex-none sm:text-left"} ${
            index < list.length - 1 ? "mr-16 sm:mr-[24px]" : "mr-0"
          } ${labelClassName}`}
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
          className={`tabs-line absolute bottom-[0px] h-[1px] rounded-[4px] bg-primary transition-all duration-200`}
        ></span>
      ) : null}
    </ul>
  )
}

export { Tabs }
