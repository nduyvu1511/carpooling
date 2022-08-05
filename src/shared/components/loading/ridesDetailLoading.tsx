import { InputLoading } from "./inputLoading"

const RidesDetailLoading = () => {
  return (
    <>
      {/* <div className="h-[200px] md:h-[300px] skeleton rounded-[5px] mb-[24px]"></div> */}
      <InputLoading />
      <InputLoading />
      <InputLoading />
      <InputLoading />
      <InputLoading />
      <div className="rounded-[25px] w-[180px] h-[50px] skeleton mt-[40px]"></div>
    </>
  )
}

export { RidesDetailLoading }
