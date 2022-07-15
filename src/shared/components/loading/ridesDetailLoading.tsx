import { InputLoading } from "./inputLoading"

const RidesDetailLoading = () => {
  return (
    <div>
      <div className="h-[300px] skeleton rounded-[5px] mb-[24px]"></div>
      <InputLoading />
      <InputLoading />
      <InputLoading />
      <InputLoading />
    </div>
  )
}

export { RidesDetailLoading }
