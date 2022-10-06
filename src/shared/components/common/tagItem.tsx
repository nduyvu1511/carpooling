interface TagItemProps {
  className?: string
  onChange?: Function
  label: string
  isActive?: boolean
}

const TagItem = ({ className = "", onChange, label, isActive = false }: TagItemProps) => {
  return (
    <span
      onClick={() => onChange?.()}
      className={`text-xs px-[8px] select-none py-[4px] whitespace-nowrap rounded-[20px]  text-primary border border-solid border-primary ${
        isActive ? "bg-primary border-primary text-white-color" : "bg-white-color"
      } ${className}`}
    >
      {label}
    </span>
  )
}

export { TagItem }
