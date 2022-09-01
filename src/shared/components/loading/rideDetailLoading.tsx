import { InputLoading } from "./inputLoading"
import { TextareaLoading } from "./textareaLoading"

const RideDetailLoading = ({ className = "" }) => {
  return (
    <div className={className}>
      <div className="h-[60px] skeleton rounded-[5px] mb-[24px]"></div>
      <InputLoading />
      <InputLoading />
      <InputLoading />
      <InputLoading />
      <InputLoading />
      <TextareaLoading />
      <div className="rounded-[25px] w-[180px] h-[50px] skeleton mt-[40px]"></div>
    </div>
  )
}

export { RideDetailLoading }
