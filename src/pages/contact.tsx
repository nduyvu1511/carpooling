import { contactBg } from "@/assets"
import { ContactForm, Map, Seo } from "@/components"
import { ADDRESS, EMAIL, PHONE } from "@/helper"
import { useFetcher } from "@/hooks"
import { StaticLayout } from "@/layout"
import { ContactParams } from "@/models"
import { userAPI } from "@/services"
import { useRef } from "react"
import { useDispatch } from "react-redux"
import { notify } from "reapop"

type OnResetParams = {
  onReset: () => void
}

const Contact = () => {
  const childRef = useRef<OnResetParams>(null)
  const dispatch = useDispatch()
  const { fetcherHandler } = useFetcher()

  const handleSendContact = (params: ContactParams) => {
    fetcherHandler({
      fetcher: userAPI.createContact(params),
      onSuccess: () => {
        childRef.current?.onReset?.()
        dispatch(notify("Gửi liên hệ thành công, cảm ơn bạn đã liên hệ với ExxeVn", "success"))
      },
    })
  }

  return (
    <StaticLayout bg={contactBg}>
      <Seo description="Liên hệ với chúng tôi" thumbnailUrl="" title="Liên hệ" url="contact" />
      <div className="flex flex-col md:flex-row mb-[80px]">
        <div className="flex-1 mb-24 md:mb-0 md:mr-24 flex flex-col items-center md:items-start">
          <h4 className="h4 mb-[40px] text-blue-7 font-semibold md:font-medium">
            Công ty CP đầu tư công nghệ và vận tải EXXEVN
          </h4>
          <p className="flex md:block items-center sm:items-start flex-col sm:flex-row mb-12 md:mb-16">
            <span className="text-[10px] sm:text-base whitespace-nowrap mr-[3px]">Địa chỉ: </span>
            <span className="text-sm md:text-base text-center md:text-left">{ADDRESS}</span>
          </p>
          <p className="flex md:block items-center sm:items-start flex-col sm:flex-row mb-12 md:mb-16">
            <span className="text-[10px] sm:text-base whitespace-nowrap mr-[3px]">
              Điện thoại:{" "}
            </span>
            <a href={`tel:${PHONE}`} className="text-sm md:text-base">
              {PHONE}
            </a>
          </p>
          <p className="flex md:block items-center sm:items-start flex-col sm:flex-row mb-12 md:mb-16">
            <span className="text-[10px] sm:text-base whitespace-nowrap mr-[3px]">Email: </span>
            <a href={`mailto:${EMAIL}`} className="text-sm md:text-base text-primary">
              {EMAIL}
            </a>
          </p>
        </div>
        <div className="flex-1">
          <ContactForm ref={childRef} onSubmit={handleSendContact} />
        </div>
      </div>

      <div className="">
        <div className="h-[400px]">
          <Map viewOnly markerLocation={{ lat: 10.806993, lng: 106.7279698 }} />
        </div>
      </div>
    </StaticLayout>
  )
}

export default Contact
