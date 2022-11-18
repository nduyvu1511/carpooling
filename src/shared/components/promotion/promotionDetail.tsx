import { PromotionDetailRes } from "@/models"
import { Spinner } from "../loading"

interface PromotionDetailProps {
  data: PromotionDetailRes | undefined
  isLoading?: boolean
}

export const PromotionDetail = ({ data, isLoading }: PromotionDetailProps) => {
  if (isLoading) return <Spinner size={30} />

  return (
    <>
      {data?.promotion_id ? (
        <div dangerouslySetInnerHTML={{ __html: data?.description || "" }}></div>
      ) : (
        <div>
          <p className="text-base text-center">Không tìm thấy khuyến mãi này</p>
        </div>
      )}
    </>
  )
}
