import { guideBg } from "@/assets"
import { Guide as GuideCom } from "@/components"
import { GuestLayout } from "@/layout"
import Image from "next/image"

const Guide = () => {
  return (
    <section className="">
      <div className="relative w-full h-[500px]">
        <Image src={guideBg} layout="fill" alt="" objectFit="cover" />
      </div>
      <div className="container">
        <GuideCom />
      </div>
    </section>
  )
}

Guide.Layout = GuestLayout
export default Guide
