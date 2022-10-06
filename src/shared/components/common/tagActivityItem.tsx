interface TagActivityItemProps<T extends string | string[]> {
  onChange?: (params: T) => void
  isActive: boolean
  label: string
  value: T
  color: string
  bgColor: string
}

const TagActivityItem = <T extends string | string[]>({
  onChange,
  color,
  isActive,
  label,
  value,
  bgColor,
}: TagActivityItemProps<T>) => {
  return (
    <span
      style={{
        border: `1px solid ${!isActive ? color : "transparent"}`,
        color,
        backgroundColor: !isActive ? "#ffffff" : bgColor,
      }}
      onClick={() => onChange?.(value)}
      className={`flex cursor-pointer select-none text-xs md:text-sm py-[4px] px-[8px] rounded-[5px] whitespace-nowrap`}
    >
      {label}
    </span>
  )
}

export { TagActivityItem }
