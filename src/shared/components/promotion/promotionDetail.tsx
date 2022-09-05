import { promotionApi } from "@/services"
import useSWR from "swr"

interface PromotionDetailProps {
  promotion_id: number
}

export const PromotionDetail = ({ promotion_id }: PromotionDetailProps) => {
  const { isValidating, mutate, data, error } = useSWR(
    promotion_id ? `get_detail_promotion_${promotion_id}` : null,
    () => promotionApi.getDetailPromotion({ promotion_id }).then((res) => res.result.data),
    {
      dedupingInterval: 10000,
    }
  )

  return (
    <div>
      <div className="mb-[40px]">
        <p className="text-16 md:text-18 mb-16 font-semibold">Thông tin ưu đãi</p>
        <p className="text-sm md:text-base">
          Lượt sử dụng có hạn. Nhanh tay kẻo lỡ bạn nhé! Giảm 10% Đơn Tối Thiểu ₫50k Giảm tối đa
          ₫15k
        </p>
      </div>

      <div className="mb-[40px]">
        <p className="text-16 md:text-18 mb-16 font-semibold">Thời gian sử dụng khuyến mãi</p>
        <p className="text-sm md:text-base">Từ 00h00 ngày 07/07/2022 đến 23:59 ngày 13/07/2022</p>
      </div>

      <div className="mb-[40px]">
        <p className="text-16 md:text-18 mb-16 font-semibold">Sản phẩm</p>
        <p className="text-sm md:text-base">
          Áp dụng trên App cho một số sản phẩm và người dùng nhất định thuộc chương trình khuyến mãi
          Những sản phẩm bị hạn chế chạy khuyến mại theo quy định của Nhà nước sẽ không được hiển
          thị nếu nằm trong danh sách sản phẩm đã chọn.
        </p>
      </div>

      <div className="mb-[40px]">
        <p className="text-16 md:text-18 mb-16 font-semibold">Chi tiết khuyến mãi</p>
        <p className="text-sm md:text-base">
          Mã SPPP3AUG15W giảm 10% tối đa 15K cho đơn hàng ExxeVn hợp lệ từ 50K trên ứng dụng ExxeVn.
          HSD: 31/08/2022 23:59. Áp dụng khi thanh toán ví Exxe. Số lượng có hạn. Chỉ áp dụng cho
          khách hàng nhận được ưu đãi. Mỗi khách hàng chỉ sử dụng 1 lần.
        </p>
      </div>

      <p className="text-14 md:text-16">
        <span className="font-semibold">(*) Lưu ý:</span>{" "}
        <span className="italic">
          Chương trình có thể chấm dứt sớm hơn khi số lượng vé được bán hết.
        </span>
      </p>
    </div>
  )
}
