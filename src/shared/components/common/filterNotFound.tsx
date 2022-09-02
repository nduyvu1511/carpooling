import { FilterNotFoundIcon } from "@/assets"

interface FilterNotFoundProps {
  title?: string
}

const FilterNotFound = ({ title = "Không có kết quả" }: FilterNotFoundProps) => {
  return (
    <div className="flex-center flex-col py-24">
      <FilterNotFoundIcon className="mb-24" />
      <p className="text-14 md:text-16 font-medium text-gray-color-6">{title}</p>
    </div>
  )
}

export { FilterNotFound }
