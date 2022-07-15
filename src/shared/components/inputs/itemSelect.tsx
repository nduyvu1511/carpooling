import { InputCheckbox } from "./inputCheckbox"

interface ItemSelectProps {
  isActive?: boolean | undefined
  onChange?: () => void
  title: string
}

const ItemSelect = ({ title, isActive, onChange }: ItemSelectProps) => {
  const handleChange = () => {
    onChange?.()
  }

  return (
    <div onClick={handleChange} className="w-fit flex items-center cursor-pointer">
      <InputCheckbox size={20} type="circle" isChecked={!!isActive} onCheck={handleChange} />
      <span className="flex-1 ml-[14px] leading-26 text-14 font-medium line-clamp-2">{title}</span>
    </div>
  )
}

export { ItemSelect }
