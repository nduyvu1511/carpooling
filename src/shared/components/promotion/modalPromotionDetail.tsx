import { promotionApi } from "@/services"
import useSWR from "swr"
import { Spinner } from "../loading"
import { Modal, ModalProps } from "../modal"

type ModalPromotionDetailProps = Omit<ModalProps, "children" | "heading" | "show"> & {
  promotion_id: number
}

export const ModalPromotionDetail = ({
  promotion_id,
  ...attributes
}: ModalPromotionDetailProps) => {
  const { data, isValidating } = useSWR(`get_detail_promotion_${promotion_id}`, () =>
    promotionApi.getDetailPromotion({ promotion_id }).then((res) => res?.result?.data)
  )

  return (
    <>
      <Modal {...attributes} heading="Điều kiện sử dụng" show={true}>
        <div className="p-custom">
          {isValidating ? (
            <Spinner />
          ) : data?.promotion_id ? (
            <div dangerouslySetInnerHTML={{ __html: data?.description || "" }}></div>
          ) : (
            <div>
              <p className="text-base text-center">Không tìm thấy khuyến mãi này</p>
            </div>
          )}
        </div>
      </Modal>
    </>
  )
}
