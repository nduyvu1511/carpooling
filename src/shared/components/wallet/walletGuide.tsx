import { useState } from "react"
import { AccordionItem } from "../common"

export const WalletGuide = () => {
  const [tabsActive, setTabsActive] = useState<number | undefined>()

  const handleToggleTabsActive = (id: number) => {
    setTabsActive(tabsActive === id ? undefined : id)
  }

  return (
    <div>
      <AccordionItem
        maxHeight={300}
        isActive={tabsActive === 1}
        onClick={() => handleToggleTabsActive(1)}
        className="bg-bg-primary rounded-[5px] p-12 border-t-0"
        titleClassName="text-base text-blue-7"
        title="Tôi nạp tiền vào ví công ty như thế nào?"
      >
        <p className="text-sm mb-12">
          1. Bạn có thể chuyển tiền mặt trực tiếp vào tài khoản ngân hàng của Exxe thông qua cổng
          giao dịch thanh toán VNpay.{" "}
        </p>
        <p className="text-sm">
          2. Trong quá trình bạn đặt chuyến, Exxe yêu cầu đặt cọc. Số tiền đặt cọc sẽ vào ví của
          bạn, bạn có thể chuyển số tiền nhiều hơn số tiền đặt cọc quy định.
        </p>
      </AccordionItem>

      <AccordionItem
        maxHeight={600}
        isActive={tabsActive === 2}
        onClick={() => handleToggleTabsActive(2)}
        className="bg-bg-primary rounded-[5px] p-12"
        titleClassName="text-base text-blue-7"
        title="Khi nào tôi sẽ nhận được tiền rút từ Ví Exxe?"
      >
        <p className="text-sm mb-12">
          Thực hiện thao tác rút tiền từ Ví tiền mặt Exxe để chuyển về tài khoản ngân hàng đã đăng
          ký, số tiền tối thiểu có thể chuyển là <span className="font-semibold">100.000 đồng</span>
          . Yêu cầu rút tiền của Đối tác sẽ được xử lý trong vòng từ 24-48 giờ làm việc (trừ cuối
          tuần và ngày lễ) kể từ thời điểm thực hiện thao tác rút Ví trên ứng dụng.
        </p>
        <p className="text-sm mb-12 font-semibold">Đối tác cần lưu ý:</p>
        <p className="text-sm mb-12">
          Thông tin tài khoản Ngân Hàng mà Đối tác cung cấp cho Exxe cần phải là tài khoản có tên
          của Đối tác, Exxe không hỗ trợ thanh toán đến tài khoản có tên khác. Nếu Đối tác có nhu
          cầu thay đổi thông tin tài khoản Ngân hàng, vui lòng liên hệ cho công ty để cập nhật thông
          tin.
        </p>

        <p className="text-sm mb-12">
          Khuyến khích Đối tác sử dụng Ngân Hàng Techcombank để nhận tiền nhanh chóng hơn (do cùng
          hệ thống Ngân Hàng với tài khoản Exxe).
        </p>

        <p className="text-sm">
          Trong trường hợp Đối tác không có tài khoản ngân hàng, hoạt động rút tiền sẽ không thể
          thực hiện và tiền sẽ được hoàn lại trong ngày làm việc tiếp theo.
        </p>
      </AccordionItem>

      <AccordionItem
        maxHeight={300}
        isActive={tabsActive === 4}
        onClick={() => handleToggleTabsActive(4)}
        className="bg-bg-primary rounded-[5px] p-12"
        titleClassName="text-base text-blue-7"
        title="Cách đọc các giao dịch trong Ví?"
      >
        <p className="text-sm mb-12">
          Tổng tiền giao dịch là số tiền đã thực hiện trên hệ thống. Số dư khả dụng là số tiền còn
          lại trong ví, có thể sử dụng để thực hiện các giao dịch mới
        </p>
        <p className="text-sm">Lịch sử giao dịch số lượng giao dịch thực hiện trên hệ thống</p>
      </AccordionItem>

      <AccordionItem
        maxHeight={300}
        isActive={tabsActive === 5}
        onClick={() => handleToggleTabsActive(5)}
        className="bg-bg-primary rounded-[5px] p-12"
        titleClassName="text-base text-blue-7"
        title="Phí nền tảng (Tài xế)"
      >
        <p className="text-sm mb-12">
          Hệ thống sẽ tự động khấu trừ khoản Phí nền tảng trong ví tài xế của đối tác là 2% trên
          tổng giao dịch, ngay sau khi đối tác xác nhận hoàn thành chuyến đi. Exxe cam kết khoản phí
          này <span className="font-semibold">KHÔNG ẢNH HƯỞNG</span> đến thu nhập của tài xế.
        </p>
      </AccordionItem>
    </div>
  )
}
