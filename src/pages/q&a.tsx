/* eslint-disable react/no-unescaped-entities */
import { questionBg } from "@/assets"
import { AccordionItem, Seo } from "@/components"
import { PHONE } from "@/helper"
import { StaticLayout } from "@/layout"
import { useState } from "react"

const FrequentlyAskedQuestions = () => {
  const [tabActive, setTabActive] = useState<number | undefined>(1)
  const [accordionActive, setAccordionActive] = useState<number | undefined>(undefined)

  return (
    <StaticLayout bg={questionBg}>
      <Seo description="Câu hỏi thường gặp" thumbnailUrl="" title="Câu hỏi thường gặp" url="q&a" />

      <div className="question-page">
        <div className="grid lg:grid-cols-grid-330 gap-24">
          <div className="h-fit">
            <ul className="rounded-[5px] overflow-hidden">
              {[
                ["KHÁCH HÀNG CÁ NHÂN", 1],
                ["KHÁCH HÀNG DOANH NGHIỆP", 2],
                ["CHƯƠNG TRÌNH KHÁCH HÀNG THÂN THIẾT", 3],
                ["TÍNH NĂNG ĐI TỈNH", 4],
                ["TÀI XẾ", 5],
              ].map(([label, id]) => (
                <li
                  onClick={() => {
                    id !== tabActive ? setTabActive(+id) : null
                    setAccordionActive(undefined)
                  }}
                  className={`select-none text-14 md:text-16 font-semibold cursor-pointer uppercase px-24 transition-all py-16 ${
                    tabActive === id
                      ? "rounded-[5px] bg-primary text-white-color"
                      : "bg-[#F1F5FF] text-primary"
                  }`}
                  key={id}
                >
                  {label}
                </li>
              ))}
            </ul>
          </div>

          {tabActive === 1 ? (
            <div className="h-fit rounded-[5px] border border-solid border-border-color-2 overflow-hidden">
              <AccordionItem
                titleClassName="text-14 md:text-16 text-primary font-semibold"
                onClick={() => setAccordionActive(accordionActive === 1 ? undefined : 1)}
                title="Tôi không thể sử dụng mã khuyến mãi?"
                isActive={accordionActive === 1}
              >
                <p className="text-sm md:text-base mb-24">
                  Mã khuyến mãi hợp lệ sẽ được tự động áp dụng trên ứng dụng Exxe khi bạn đặt xe.
                  Bấm vào phần “Khuyến mãi” để xem danh sách các khuyến mãi hiện có từ Exxe. Giá trị
                  của mã khuyến mãi chỉ áp dụng cho cước phí của một chuyến đi và số tiền còn thừa
                  sẽ không còn giá trị.
                </p>
                <p className="text-sm md:text-base mb-24">
                  Nếu mã khuyến mãi đã được nhập thành công, bạn sẽ thấy dấu xác nhận màu xanh lá
                  hiện ra ngay bên cạnh mã khuyến mãi và giá cước được thể hiện đã giảm giá.
                </p>
                <p className="text-sm md:text-base">
                  Nếu mã khuyến mãi vẫn không sử dụng được, hãy gửi màn hình thông báo lỗi đến chúng
                  tôi để được hỗ trợ kiểm tra.
                </p>
              </AccordionItem>
              <AccordionItem
                titleClassName="text-14 md:text-16 text-primary font-semibold"
                onClick={() => setAccordionActive(accordionActive === 2 ? undefined : 2)}
                title="Làm thế nào để tạo tài khoản Exxe?"
                isActive={accordionActive === 2}
              >
                <p className="text-sm md:text-base mb-24">
                  Bạn cần có địa chỉ email và số điện thoại hợp lệ để tạo tài khoản Exxe. Sau khi
                  nhập số điện thoại, hệ thống sẽ gửi đến bạn một mã OTP thông qua tin nhắn SMS với
                  số điện thoại mà bạn vừa nhập.
                </p>
                <p className="text-sm md:text-base">
                  Nhập mã OTP và điền họ tên, email của bạn để hoàn tất đăng ký tài khoản với Exxe.
                  Sau khi điền đầy đủ thông tin, bạn đã có thể sử dụng ứng dụng Exxe để yêu cầu xe.
                </p>
              </AccordionItem>
              <AccordionItem
                titleClassName="text-14 md:text-16 text-primary font-semibold"
                onClick={() => setAccordionActive(accordionActive === 3 ? undefined : 3)}
                title="Tôi muốn thêm/ thay đổi phương thức thanh toán?"
                isActive={accordionActive === 3}
              >
                <p className="text-sm md:text-base">
                  Quý khách có thể thanh toán cho chuyến đi bằng tiền mặt cũng như thêm các phương
                  thức thanh toán khác. Hiện tại, Exxe hỗ trợ các khách hàng cá nhân thanh toán bằng
                  2 hình thức: Tiền mặt và Thẻ.
                </p>
              </AccordionItem>
              <AccordionItem
                titleClassName="text-14 md:text-16 text-primary font-semibold"
                onClick={() => setAccordionActive(accordionActive === 4 ? undefined : 4)}
                title="Hướng dẫn “THÊM PHƯƠNG THỨC THANH TOÁN”"
                isActive={accordionActive === 4}
              >
                <p className="text-sm md:text-base">
                  Chọn "Thanh toán" từ menu ứng dụng. Nhấn Thêm thanh toán. Thêm phương thức thanh
                  toán bằng cách nhập thủ công thông tin thẻ hoặc thêm một loại thanh toán thay thế.
                </p>
              </AccordionItem>
              <AccordionItem
                titleClassName="text-14 md:text-16 text-primary font-semibold"
                onClick={() => setAccordionActive(accordionActive === 5 ? undefined : 5)}
                title="Làm thế nào để gửi hỗ trợ cho chuyến đi của tôi?"
                isActive={accordionActive === 5}
              >
                <p className="text-sm md:text-base">
                  Quý khách vui lòng nhấp vào mục Trợ Giúp từ menu chính bên phía trái màn hình ứng
                  dụng để tìm giải pháp cho vấn đề gặp phải hoặc gửi yêu cầu hỗ trợ đến đội ngũ hỗ
                  trợ của Exxe. Để Exxe có thể hỗ trợ nhanh chóng, xin lưu ý một số điều khi gửi yêu
                  cầu hỗ trợ: Kiểm tra biên nhận chuyến xe để xác nhận lại cước phí. Chọn đúng
                  chuyến xe từ Lịch sử chuyến đi nếu cần hỗ trợ các vấn đề liên quan đến chuyến xe.
                  Exxe có thể yêu cầu thêm thông tin và hình ảnh sự cố hoặc hình ảnh báo lỗi trên
                  màn hình ứng dụng, hãy đảm bảo cung cấp hình ảnh liên quan. Mô tả vấn đề gặp phải
                  cụ thể và rõ ràng
                </p>
              </AccordionItem>
              <AccordionItem
                titleClassName="text-14 md:text-16 text-primary font-semibold"
                onClick={() => setAccordionActive(accordionActive === 6 ? undefined : 6)}
                title="Cước phí chuyến đi sau khi đổi điểm đến được tính như thế nào? "
                isActive={accordionActive === 6}
              >
                <p className="text-sm md:text-base mb-24">
                  Cước phí mới của chuyến đi sẽ được tính dựa trên:
                </p>
                <ul className="text-sm md:text-base">
                  <li className="mb-12">- Quãng đường bạn đã đi </li>
                  <li className="mb-12">
                    - Khoảng cách từ vị trí bạn chọn đổi điếm đến tới điểm đến mới
                  </li>
                  <li className="mb-12">- Phụ phí cao điểm (nếu có) tại thời điểm bạn đặt xe</li>
                  <li className="">
                    - Phí dịch vụ khi đổi điểm đến (nếu có). Hiện tại, Exxe không thu phụ phí này
                  </li>
                </ul>
              </AccordionItem>
              <AccordionItem
                titleClassName="text-14 md:text-16 text-primary font-semibold"
                onClick={() => setAccordionActive(accordionActive === 7 ? undefined : 7)}
                title="Khuyến mãi có được áp dụng cho chuyến đi đổi điểm đến? "
                isActive={accordionActive === 7}
              >
                <p className="text-sm md:text-base">
                  Khuyến mãi vẫn được áp dụng cho chuyến đi đổi điểm đến. Nếu lộ trình ban đầu của
                  bạn đã được áp dụng khuyến mãi và lộ trình mới sau khi đổi điểm đến cũng thoả điều
                  kiện để áp dụng cùng khuyến mãi đó, Exxe sẽ giữ khuyến mãi này cho bạn. Nếu không,
                  Exxe sẽ tự động áp dụng cho bạn khuyến mãi phù hợp với lộ trình mới (nếu có), kể
                  cả khi lộ trình ban đầu không được áp dụng khuyến mãi
                </p>
              </AccordionItem>
              <AccordionItem
                titleClassName="text-14 md:text-16 text-primary font-semibold"
                onClick={() => setAccordionActive(accordionActive === 10 ? undefined : 10)}
                title="Tại sao tôi không đổi điểm đến được? "
                isActive={accordionActive === 10}
              >
                <p className="text-sm md:text-base mb-24">
                  Các trường hợp không được đổi điểm đến:
                </p>
                <ul className="text-sm md:text-base">
                  <li className="mb-12">
                    - Lộ trình mới của bạn ngoài phạm vi của chuyến đi nội thành.
                  </li>
                  <li className="mb-12">
                    - Phương thức thanh toán đang áp dụng cho chuyến đi của bạn không được hỗ trợ
                    đổi điểm đến. (Hiện tại, các phương thức thanh toán được hỗ trợ là Tiền mặt,
                    Thẻ, Tài khoản Doanh nghiệp)
                  </li>
                  <li className="mb-12">
                    - Cước phí chuyến đi đổi điểm đến vượt quá giới hạn thanh toán bằng thẻ. (Hiện
                    tại, giới hạn này là 500.000đ)
                  </li>
                  <li className="">
                    - Số dư trong tài khoản đang sử dụng để thanh toán cho chuyến đi không đủ để trả
                    cước phí chuyến đi sau khi đổi điểm đến.
                  </li>
                </ul>
              </AccordionItem>
              <AccordionItem
                titleClassName="text-14 md:text-16 text-primary font-semibold"
                onClick={() => setAccordionActive(accordionActive === 8 ? undefined : 8)}
                title="Tôi cần xuất hóa đơn giá trị gia tăng đối với các chuyến xe Exxe tôi phải làm thế nào?"
                isActive={accordionActive === 8}
              >
                <p className="text-sm md:text-base">
                  Khi có nhu cầu xuất Hóa đơn giá trị gia tăng (GTGT) cho các chuyến xe Exxe, Quý
                  Khách có thể lựa chọn Tôi cần xuất hóa đơn ở phần Tùy chọn thêm của mỗi chuyến xe.
                  Hóa đơn được xuất khi có yêu cầu của khách hàng cho các dịch vụ với tất cả các
                  hình thức thanh toán (trừ thanh toán bằng tài khoản Công ty sẽ nhận hóa đơn GTGT
                  vào cuối tháng). Hóa đơn GTGT được xuất từ Exxe là hoá đơn điện tử đã đăng ký sử
                  dụng và được chấp thuận bởi cơ quan thuế. Exxe gửi hóa đơn GTGT theo mẫu 01/GTKT
                  cho giá trị chuyến xe, được thể hiện trên một hóa đơn duy nhất qua địa chỉ email
                  đã được đăng ký. Để biết thêm thông tin và một số lưu ý khi xuất hóa đơn giá trị
                  gia tăng, vui lòng xem thêm tại{" "}
                  <a
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-primary"
                    href="http://www.exxe.vn"
                  >
                    http://www.exxe.vn
                  </a>
                </p>
              </AccordionItem>
            </div>
          ) : null}
          {tabActive === 2 ? (
            <div className="h-fit rounded-[5px] border border-solid border-border-color">
              <AccordionItem
                titleClassName="text-14 md:text-16 text-primary font-semibold"
                onClick={() => setAccordionActive(accordionActive === 1 ? undefined : 1)}
                title="Exxe Corporate là gì?"
                isActive={accordionActive === 1}
              >
                <p className="text-sm md:text-base">
                  EXXE Corporate là gói sản phẩm dành riêng cho các doanh nghiệp tùy theo nhu cầu sử
                  dụng và quản trị việc đi lại, công tác của nhân viên doanh nghiệp.
                </p>
              </AccordionItem>
              <AccordionItem
                titleClassName="text-14 md:text-16 text-primary font-semibold"
                onClick={() => setAccordionActive(accordionActive === 2 ? undefined : 2)}
                title="Sử dụng Exxe Corporate có tính phí không?"
                isActive={accordionActive === 2}
              >
                <p className="text-sm md:text-base">
                  Khi hợp tác với Exxe doanh nghiệp không cần chi trả thêm khoản chi phí phát sinh
                  nào mà ngược lại, doanh nghiệp có thể được hưởng chiết khấu trên giá cước căn cứ
                  vào giá trị sử dụng hàng tháng của doanh nghiệp.
                </p>
              </AccordionItem>
              <AccordionItem
                titleClassName="text-14 md:text-16 text-primary font-semibold"
                onClick={() => setAccordionActive(accordionActive === 3 ? undefined : 3)}
                title="Tôi muốn đăng ký Exxe Corporate"
                isActive={accordionActive === 3}
              >
                <p className="text-sm md:text-base">
                  Quý khách hàng Doanh nghiệp có thể đăng ký tại{" "}
                  <a
                    className="text-primary"
                    target="_blank"
                    rel="noreferrer noopener"
                    href="http://www.exxe.vn"
                  >
                    http://www.exxe.vn
                  </a>{" "}
                  hoặc liên hệ tổng đài hỗ trợ của EXXE : <a href={`tel:${PHONE}`}>{PHONE}</a>
                </p>
              </AccordionItem>
              <AccordionItem
                titleClassName="text-14 md:text-16 text-primary font-semibold"
                onClick={() => setAccordionActive(accordionActive === 4 ? undefined : 4)}
                title="Cách quản lý tài khoản của nhân viên?"
                isActive={accordionActive === 4}
              >
                <p className="text-sm md:text-base">
                  Khi ký hợp đồng với Exxe Corporate, người phụ trách của doanh nghiệp sẽ được cấp
                  một tài khoản truy cập vào Cổng quản lý Doanh nghiệp của Exxe, trong đó có thể cài
                  đặt các tài khoản của nhân viên theo yêu cầu (hạn mức, thời gian, bán kính sử dụng
                  cho phép), và sau đó quản lý lịch sử các chuyến đi. Trên Cổng quản lý, người phụ
                  trách của Doanh Nghiệp có thể truy xuất các báo cáo sử dụng theo phòng ban, theo
                  nhóm hoặc theo từng nhân viên. Exxe Loyalty ( cần 1 tên chương trình khác là
                  chương trình khách hàng thân thiết )
                </p>
              </AccordionItem>
            </div>
          ) : null}
          {tabActive === 3 ? (
            <div className="h-fit rounded-[5px] border border-solid border-border-color">
              <AccordionItem
                titleClassName="text-14 md:text-16 text-primary font-semibold"
                onClick={() => setAccordionActive(accordionActive === 1 ? undefined : 1)}
                title="Chương trình Exxe Loyalty là gì?"
                isActive={accordionActive === 1}
              >
                <p className="text-sm md:text-base mb-24">
                  Exxe Loyalty là chương trình khách hàng thân thiết áp dụng cho tất cả khách hàng
                  sử dụng dịch vụ trên ứng dụng Exxe. Tôi cần làm gì để tham gia chương trình EXXE
                  Loyalty?
                </p>
                <p className="text-sm md:text-base">
                  Bạn sẽ tự động trở thành thành viên của chương trình EXXE Loyalty khi sử dụng một
                  trong các dịch vụ. Có 5 hạng thành viên (bao gồm Thành Viên, Bạc, Vàng, Bạch Kim
                  và Kim Cương). Bạn có thể đạt được các hạng thành viên khi tích lũy đủ số điểm
                  thưởng EXXE Point theo quy định của từng hạng. ( có thể sắp xếp lại số lượng và
                  tên các thứ hạng của thành viên )
                </p>
              </AccordionItem>
              <AccordionItem
                titleClassName="text-14 md:text-16 text-primary font-semibold"
                onClick={() => setAccordionActive(accordionActive === 2 ? undefined : 2)}
                title="Điểm thưởng Exxe Point là gì?"
                isActive={accordionActive === 2}
              >
                <p className="text-sm md:text-base">
                  Điểm thưởng Exxe Point là đơn vị tích lũy được khi bạn sử dụng dịch vụ trên ứng
                  dụng Exxe .
                </p>
              </AccordionItem>
              <AccordionItem
                titleClassName="text-14 md:text-16 text-primary font-semibold"
                onClick={() => setAccordionActive(accordionActive === 3 ? undefined : 3)}
                title="Điểm thưởng Exxe Point có hết hạn không? ( có thể quy định lại )"
                isActive={accordionActive === 3}
              >
                <p className="text-sm md:text-base">
                  Số điểm thưởng bạn tích lũy được trong thời gian 3 tháng – ví dụ từ ngày 01/07 đến
                  30/09 – có thời hạn sử dụng đến hết 3 tháng tiếp theo. Theo đó, điểm thưởng có hạn
                  sử dụng lên đến 6 tháng. VD: 5,000 điểm của bạn được tích luỹ trong kì xếp hạng
                  1/7- 30/9/2021, sẽ hết hạn vào 23:59’ ngày 31/12/2021
                </p>
              </AccordionItem>
              <AccordionItem
                titleClassName="text-14 md:text-16 text-primary font-semibold"
                onClick={() => setAccordionActive(accordionActive === 4 ? undefined : 4)}
                title="Tôi muốn đăng ký Exxe Corporate"
                isActive={accordionActive === 4}
              >
                <p className="text-sm md:text-base">
                  Quý khách hàng Doanh nghiệp có thể đăng ký tại{" "}
                  <a
                    className="text-primary"
                    target="_blank"
                    rel="noreferrer noopener"
                    href="http://www.exxe.vn"
                  >
                    http://www.exxe.vn
                  </a>{" "}
                  hoặc liên hệ tổng đài hỗ trợ của EXXE : <a href={`tel:${PHONE}`}>{PHONE}</a>
                </p>
              </AccordionItem>
              <AccordionItem
                titleClassName="text-14 md:text-16 text-primary font-semibold"
                onClick={() => setAccordionActive(accordionActive === 5 ? undefined : 5)}
                title="Ưu đãi của từng hạng thành viên khác nhau như thế nào?cước phí nào?"
                isActive={accordionActive === 5}
              >
                <p className="text-sm md:text-base">
                  Với các hạng thành viên cao hơn, bạn sẽ nhận nhiều ưu đãi và đặc quyền hơn. Các ưu
                  đãi có thể bao gồm tỷ lệ tích lũy điểm thưởng, giảm giá dịch vụ trên ứng dụng
                  Exxe, dịch vụ ưu tiên và ưu đãi từ các Đối tác của Exxe
                </p>
              </AccordionItem>
              <AccordionItem
                titleClassName="text-14 md:text-16 text-primary font-semibold"
                onClick={() => setAccordionActive(accordionActive === 6 ? undefined : 6)}
                title="Tôi có được xét nâng hạng thành viên không?"
                isActive={accordionActive === 6}
              >
                <p className="text-sm md:text-base mb-24">
                  Một năm có 04 kỳ xếp hạng, mỗi kỳ kéo dài 03 tháng:
                </p>
                <li className="text-sm md:text-base mb-24">· Kỳ 1: Từ 1/1 đến 31/3</li>
                <li className="text-sm md:text-base mb-24">· Kỳ 2: Từ 1/3 đến 30/6</li>
                <li className="text-sm md:text-base mb-24">· Kỳ 3: Từ 1/7 đến 30/9</li>
                <li className="text-sm md:text-base mb-24">· Kỳ 4: Từ 1/10 đến 31/12</li>
                <p className="text-sm md:text-base">
                  Khách hàng tích lũy đủ điểm của mỗi hạng thành viên trong kỳ xếp hạng hiện tại sẽ
                  được duy trì hạng thành viên trong 03 tháng tiếp theo.
                </p>
              </AccordionItem>
              <AccordionItem
                titleClassName="text-14 md:text-16 text-primary font-semibold"
                onClick={() => setAccordionActive(accordionActive === 7 ? undefined : 7)}
                title="Hạng thành viên Exxe Loyalty của tôi có thể bị giảm không?"
                isActive={accordionActive === 7}
              >
                <p className="text-sm md:text-base">
                  Miễn là bạn tích lũy đủ số điểm thưởng theo quy định của từng hạng thành viên Exxe
                  Loyalty trong giai đoạn 6 tháng đầu tiên – ví dụ giai đoạn từ ngày 01/01 đến 30/06
                  hoặc giai đoạn từ ngày 01/07 đến 31/12 – bạn sẽ được duy trì hạng thành viên của
                  mình trong giai đoạn 6 tháng tiếp theo.
                </p>
              </AccordionItem>

              <AccordionItem
                titleClassName="text-14 md:text-16 text-primary font-semibold"
                onClick={() => setAccordionActive(accordionActive === 8 ? undefined : 8)}
                title="Nếu tôi bị giảm hạng thành viên thì những ưu đãi của tôi sẽ bị ảnh hưởng như thế nào?"
                isActive={accordionActive === 8}
              >
                <p className="text-sm md:text-base">
                  Nếu bạn bị giảm hạng thành viên, bạn sẽ không còn được tận hưởng các ưu đãi dành
                  riêng cho hạng thành viên Exxe Loyalty cao hơn trước đó của bạn. Hãy sử dụng dịch
                  vụ Exxe nhiều hơn và tích lũy thật nhiều điểm thưởng EXXE Point đủ duy trì và nâng
                  hạng thành viên của bạn.
                </p>
              </AccordionItem>
              <AccordionItem
                titleClassName="text-14 md:text-16 text-primary font-semibold"
                onClick={() => setAccordionActive(accordionActive === 9 ? undefined : 9)}
                title="Tôi sẽ sử dụng điểm thưởng Exxe Point như thế nào?"
                isActive={accordionActive === 9}
              >
                <p className="text-sm md:text-base">
                  Exxe Point được dùng để đổi các voucher ưu đãi từ Exxe và các Đối tác của Exxe.
                  Tại mục Exxe Loyalty trong ứng dụng Exxe, phần “Ưu đãi của tôi” sẽ thể hiện các
                  voucher bạn có thể đổi được bằng điểm Exxe Point. Ngoài ra bạn cũng có thể xem các
                  voucher mình đã đổi được tại mục "Khuyến Mại” trong ứng dụng.
                </p>
              </AccordionItem>
              <AccordionItem
                titleClassName="text-14 md:text-16 text-primary font-semibold"
                onClick={() => setAccordionActive(accordionActive === 10 ? undefined : 10)}
                title="Tôi có thể xem lại các giao dịch đổi điểm Exxe Point ở đâu?"
                isActive={accordionActive === 10}
              >
                <p className="text-sm md:text-base">
                  Bạn có thể xem chi tiết các giao dịch đổi điểm tại phần “Lịch sử giao dịch” trong
                  mục Exxe Loyalty của ứng dụng Exxe.
                </p>
              </AccordionItem>
              <AccordionItem
                titleClassName="text-14 md:text-16 text-primary font-semibold"
                onClick={() => setAccordionActive(accordionActive === 11 ? undefined : 11)}
                title="Ưu đãi và quy chế tích điểm EXXE Point có bị thay đổi không?"
                isActive={accordionActive === 11}
              >
                <p className="text-sm md:text-base">
                  Có. Exxe có thể thay đổi các ưu đãi và tỷ lệ tích lũy điểm Exxe Point đối với hình
                  thức thanh toán bằng tiền mặt hoặc thẻ tín dụng / thẻ ghi nợ trên ứng dụng Exxe mà
                  không cần thông báo trước. Để biết chi tiết về Quy chế dịch vụ EXXE Loyalty, vui
                  lòng xem tại đây
                </p>
              </AccordionItem>
            </div>
          ) : null}
          {tabActive === 4 ? (
            <div className="h-fit rounded-[5px] border border-solid border-border-color text-sm md:text-base">
              <AccordionItem
                titleClassName="text-14 md:text-16 text-primary font-semibold"
                onClick={() => setAccordionActive(accordionActive === 1 ? undefined : 1)}
                title="Thời gian chờ đợi tối đa mà Khách hàng có thể yêu cầu là bao nhiêu? Và cách tính thời gian chờ ra sao?"
                isActive={accordionActive === 1}
              >
                <p className="text-sm md:text-base">
                  Thời gian chờ đợi tối đa trên ứng dụng hiện tại là 03 ngày. Thời gian chờ sẽ được
                  tự động tính bằng khoảng chênh lệch giữa thời điểm Tài xế kết thúc chuyến xe chiều
                  đi và bắt đầu chuyến xe chiều về. Thời gian chờ sẽ được tính cước phí chờ theo
                  bảng giá chuẩn của Exxe đề ra và tổng phí chờ sẽ được cộng dồn vào cước phí chuyến
                  đi hiển thị trên ứng dụng. Vui lòng tham khảo chi tiết tại: LINK WEBSITE
                </p>
              </AccordionItem>
              <AccordionItem
                titleClassName="text-14 md:text-16 text-primary font-semibold"
                onClick={() => setAccordionActive(accordionActive === 2 ? undefined : 2)}
                title="Các loại phí cầu đường, phí đỗ xe và các chi phí phát sinh khác sẽ do ai chịu?"
                isActive={accordionActive === 2}
              >
                <p className="text-sm md:text-base">
                  Cước phí hiện tại của 1 chuyến Exxe chưa bao gồm phụ phí cầu đường, phí bến bãi,
                  phí đỗ xe cũng như các phí phát sinh khác. Vì vậy nếu có phát sinh các chi phí này
                  trong chuyến đi, Khách hàng sẽ phải thanh toán thêm cho Tài xế. Tài xế và Khách
                  hàng nên trao đổi kỹ về các loại phụ phí này với nhau trước khi bắt đầu chuyến đi.
                </p>
              </AccordionItem>
              <AccordionItem
                titleClassName="text-14 md:text-16 text-primary font-semibold"
                onClick={() => setAccordionActive(accordionActive === 3 ? undefined : 3)}
                title="Tại sao cước phí hiển thị trên ứng dụng lúc bắt đầu đặt xe và sau khi kết thúc chuyến đi lại khác nhau? Khách hàng sẽ thanh toán theo cước phí nào?"
                isActive={accordionActive === 3}
              >
                <p className="text-sm md:text-base">
                  Cước phí hiển thị sau khi chuyến đi đã kết thúc có thể khác với cước phí khi bắt
                  đầu chuyến đi do ứng dụng đã tính toán lại thời gian chờ đợi thực tế, quãng đường
                  thực tế, thời gian di chuyển thực tế của chuyến đi. Khách hàng sẽ phải thanh toán
                  theo cước phí hiển thị sau khi chuyến đi đã kết thúc.
                </p>
              </AccordionItem>
              <AccordionItem
                titleClassName="text-14 md:text-16 text-primary font-semibold"
                onClick={() => setAccordionActive(accordionActive === 4 ? undefined : 4)}
                title="Ứng dụng có tự động phát chuyến “Exxe đi tỉnh” cho tài xế nếu tài xế chọn chế độ “Tự động nhận chuyến” không?"
                isActive={accordionActive === 4}
              >
                <p className="text-sm md:text-base">
                  Không. Nếu Tài xế lựa chọn bật chế độ cung cấp dịch vụ “Exxe đi tỉnh”, mỗi khi có
                  yêu cầu phù hợp, ứng dụng sẽ thông báo với Quý Tài xế chi tiết yêu cầu: điểm đón,
                  điểm đến, chuyến 1 chiều hay 2 chiều, loại xe, thời gian chờ mà khách hàng yêu
                  cầu… Dựa vào đây, Quý Tài xế sẽ quyết định có muốn nhận yêu cầu hay không.
                </p>
              </AccordionItem>
              <AccordionItem
                titleClassName="text-14 md:text-16 text-primary font-semibold"
                onClick={() => setAccordionActive(accordionActive === 5 ? undefined : 5)}
                title={`Thời gian tài xế có thể đưa ra quyết định nhận yêu cầu cho chuyến "Exxe đi tỉnh" là bao lâu?`}
                isActive={accordionActive === 5}
              >
                <p className="text-sm md:text-base">
                  Thời gian Tài xế có để đưa ra quyết định có nhận yêu cầu chuyến "Exxe đi tỉnh" hay
                  không là trong vòng 15 giây kể từ khi ứng dụng bắt đầu phát chuyến.
                </p>
              </AccordionItem>
              <AccordionItem
                titleClassName="text-14 md:text-16 text-primary font-semibold"
                onClick={() => setAccordionActive(accordionActive === 6 ? undefined : 6)}
                title={`Các chuyến "Exxe đi tỉnh" có được tính cho các chương trình thưởng tài xế hiện tại không?`}
                isActive={accordionActive === 6}
              >
                <p className="text-sm md:text-base">
                  Có. Các chuyến "Exxe đi tỉnh" đều được tính đầy đủ cho các chương trình thưởng tài
                  xế EXXE Car hiện tại, bao gồm chương trình theo ngày, chương trình theo tuần và
                  chương trình tháng.
                </p>
              </AccordionItem>
              <AccordionItem
                titleClassName="text-14 md:text-16 text-primary font-semibold"
                onClick={() => setAccordionActive(accordionActive === 7 ? undefined : 7)}
                title={`Tài xế có thể bật/ tắt dịch vụ “Exxe đi tỉnh” theo ý muốn không?`}
                isActive={accordionActive === 7}
              >
                <p className="text-sm md:text-base">
                  Có. Quý Tài xế được quyền quyết định có cung cấp dịch vụ “Exxe đi tỉnh” hay không.
                </p>
              </AccordionItem>
              <AccordionItem
                titleClassName="text-14 md:text-16 text-primary font-semibold"
                onClick={() => setAccordionActive(accordionActive === 8 ? undefined : 8)}
                title={`Trong trường hợp đối với các chuyến đi với phương thức thanh toán bằng tiền mặt, nếu Tài xế gặp vấn đề về việc thu tiền từ khách hàng (do không liên lạc được khách hàng hoặc khách hàng từ chối thanh toán) thì EXXE  có chịu trách nhiệm hỗ trợ lại cho tài xế không?`}
                isActive={accordionActive === 8}
              >
                <p className="text-sm md:text-base">
                  Exxe rất tiếc với vấn đề đã xảy ra với Quý Tài xế trong quá trình đồng hành cùng
                  Exxe. Đối với các chuyến đi có phụ phí hoặc cước phí thanh toán bằng tiền mặt, Quý
                  Tài xế cần thu đúng, đủ số tiền với hành khách khi kết thúc chuyến xe. Trường hợp
                  Quý Tài xế gặp vấn đề với việc thu tiền từ hành khách, Exxe rất tiếc sẽ chưa thể
                  hỗ trợ lại số tiền này, tuy nhiên, Quý Tài xế có thể gửi yêu cầu hỗ trợ trên ứng
                  dụng, hoặc tổng đài Số Điện Thoại để Exxe ghi nhận trường hợp này của Hành khách.
                </p>
              </AccordionItem>
            </div>
          ) : null}
          {tabActive === 5 ? (
            <div className="h-fit rounded-[5px] border border-solid border-border-color text-sm md:text-base">
              <AccordionItem
                titleClassName="text-14 md:text-16 text-primary font-semibold"
                onClick={() => setAccordionActive(accordionActive === 1 ? undefined : 1)}
                title="Trường hợp nhận được tin nhắn thông báo gian lận từ Exxe tôi nên làm gì?"
                isActive={accordionActive === 1}
              >
                <p>
                  Khi nhận được tin nhắn thông báo gian lận từ Exxe anh/chị vui lòng gửi thông tin
                  giải trình về email .com.vn trong vòng 7 ngày kể từ khi nhận được tin nhắn. Chúng
                  tôi sẽ xem xét và phản hồi lại kết quả trong thời gian sớm nhất.
                </p>
              </AccordionItem>
              <AccordionItem
                titleClassName="text-14 md:text-16 text-primary font-semibold"
                onClick={() => setAccordionActive(accordionActive === 2 ? undefined : 2)}
                title="Chuyện gì sẽ xảy ra với thu nhập của tôi khi tôi nhận được tin nhắn thông báo rằng tôi gian lận?"
                isActive={accordionActive === 2}
              >
                <p>
                  Khi nhận được tin nhắn phát hiện gian lận, những bước sau sẽ được hệ thống Exxe
                  thực hiện: Tạm giữ yêu cầu rút tiền và gửi trả lại tiền vào tài khoản tài xế của
                  anh/chị trong kỳ thanh toán anh/chị bị phát hiện gian lận. Hủy bỏ kết quả tiền
                  thưởng tài xế của đợt thanh toán anh/chị bị phát hiện gian lận. Hủy bỏ tiền khuyến
                  mãi cho khách hàng cho tất cả những chuyến đi của anh/chị bị phát hiện gian lận.
                  Hoàn trả lại phần trăm tiền thuế VAT, thuế Thu nhập cá nhân và tiền hoa hồng trên
                  phần tiền khuyến mãi mà Exxe đã cấn trừ của anh/chị.
                </p>
              </AccordionItem>
              <AccordionItem
                titleClassName="text-14 md:text-16 text-primary font-semibold"
                onClick={() => setAccordionActive(accordionActive === 3 ? undefined : 3)}
                title="Chuyện gì sẽ xảy ra nếu tôi bị phát hiện có các hành vi gian lận?"
                isActive={accordionActive === 3}
              >
                <p className="mb-24">
                  {" "}
                  Tùy thuộc vào mức độ và tần suất gian lận, các hành vi gian lận sẽ bị xử lý như
                  sau: Đối với Tài khoản đối tác:
                </p>
                <p className="mb-24">
                  Mức độ 1: Cảnh cáo lần 1. Exxe sẽ nhắc nhở đối tác điều chỉnh hành vi, tránh lặp
                  lại vi phạm trong tương lai. Áp dụng cho các trường hợp vi phạm mức độ nhẹ, vi
                  phạm lần đầu. Mức độ 2: Khoá tài khoản tạm thời. Tài khoản đối tác sẽ tạm thời vô
                  hiệu hoá trong vòng 7 ngày chờ giải trình, đối tác sẽ tạm dừng hợp tác kinh doanh
                  cũng như tham gia các chương trình và nhận các lợi ích từ Exxe. Áp dụng cho các
                  hành vi vi phạm từ lần 2 trở lên hoặc vi phạm lần đầu nhưng ở mức độ nghiêm trọng
                  và gây ảnh hưởng đến hình ảnh của Exxe. Mức độ 3: Ngừng hợp tác vĩnh viễn. Tài
                  khoản đối tác sẽ không thể tiếp tục tham gia Exxe. Áp dụng cho các hành vi vi phạm
                  từ lần 3 trở lên.
                </p>
                <p>
                  Đối với các khoản thanh toán: Toàn bộ kết quả thưởng trong kỳ phát hiện gian lận
                  sẽ bị hủy bỏ. Đồng thời, các khoản khuyến mãi từ chuyến đi gian lận sẽ không được
                  thanh toán. Exxe sẽ hoàn trả phần trăm tiền thuế VAT, thuế Thu nhập cá nhân và hoa
                  hồng của phần tiền khuyến mãi bị trừ.
                </p>
              </AccordionItem>
              <AccordionItem
                titleClassName="text-14 md:text-16 text-primary font-semibold"
                onClick={() => setAccordionActive(accordionActive === 4 ? undefined : 4)}
                title="Thời gian thanh toán mới của Exxe như thế nào, khi nào tôi nhận được thưởng và tiền?"
                isActive={accordionActive === 4}
              >
                <p className="mb-24">- Thời gian chuyển tiền thưởng vào tài khoản tài xế:</p>- Thời
                gian rút tiền: Từ ngày 25/03/2020, Exxe thực hiện điều chỉnh thời gian thanh toán
                cho các yêu cầu rút tiền từ Tài khoản Tài xế về Tài khoản ngân hàng của Quý Tài xế,
                chi tiết như sau: + Tất cả các yêu cầu rút tiền sẽ được thanh toán vào Thứ 4 hàng
                tuần. + Các yêu cầu rút tiền thực hiện trong thời gian từ 0h00 ngày Thứ 4 đến 23h59
                ngày Thứ 3 (tuần tiếp theo), được thanh toán vào ngày Thứ 4 (tuần tiếp theo).
                <p className="mb-24">
                  + Chuyển vào thứ 6 hằng tuần cho các chương trình thưởng bắt đầu từ 00:00 sáng thứ
                  2 đến 23:59:59 thứ 4.
                </p>
                <p className="mb-24">
                  + Chuyển vào thứ 3 hằng tuần cho các chương trình thưởng bắt đầu từ 00:00 sáng thứ
                  5 đến 23:59:59 chủ nhật tuần tiếp theo.
                </p>
                <p>
                  Đối với các khoản thanh toán: Toàn bộ kết quả thưởng trong kỳ phát hiện gian lận
                  sẽ bị hủy bỏ. Đồng thời, các khoản khuyến mãi từ chuyến đi gian lận sẽ không được
                  thanh toán. Exxe sẽ hoàn trả phần trăm tiền thuế VAT, thuế Thu nhập cá nhân và hoa
                  hồng của phần tiền khuyến mãi bị trừ.
                </p>
              </AccordionItem>
              <AccordionItem
                titleClassName="text-14 md:text-16 text-primary font-semibold"
                onClick={() => setAccordionActive(accordionActive === 5 ? undefined : 5)}
                title="Tôi không thể trượt thanh bắt đầu chuyến đi/ thanh bắt đầu chuyến đi không hiển thị,
                  tôi nên làm gì?"
                isActive={accordionActive === 5}
              >
                <p className="">
                  Anh/ Chị vui lòng thoát ứng dụng, cập nhật phiên bản mới nhất và thử lại. Xin lưu
                  ý: Thao tác này chỉ có thể thực hiện được trong phạm vi bán kính 600 mét tính từ
                  điểm đón. Nếu vẫn không thực hiện được, Anh/ Chị vui lòng liên hệ tổng đài Số điện
                  thoại để được hỗ trợ.
                </p>
              </AccordionItem>
              <AccordionItem
                titleClassName="text-14 md:text-16 text-primary font-semibold"
                onClick={() => setAccordionActive(accordionActive === 6 ? undefined : 6)}
                title="Tôi đã gia nhập và đang chạy Exxe, làm sao tôi biết tôi có tôi có nằm trong chương trình thưởng dành cho tài xế mới/ chương trình thưởng cho tài xế đang hoạt động?"
                isActive={accordionActive === 6}
              >
                <p className="">
                  Mỗi chương trình thưởng của Exxe đều có thể lệ và thời gian cụ thể. Sau khi chương
                  trình kết thúc (đối với chương trình có thời gian có hạn) hoặc sau khi chốt số
                  lượng (đối với chương trình giới hạn số lượng), Exxe sẽ gửi tin nhắn SMS đến số
                  điện thoại tài xế hoặc gửi thông báo trên ứng dụng Exxe Driver đến tài xế đủ điều
                  kiện nhận thưởng, sau đó Exxe sẽ tiến hành chuyển tiền vào kỳ thanh toán liền kề.
                </p>
              </AccordionItem>
              <AccordionItem
                titleClassName="text-14 md:text-16 text-primary font-semibold"
                onClick={() => setAccordionActive(accordionActive === 7 ? undefined : 7)}
                title="Ứng dụng luôn hiện thông báo yêu cầu bổ sung giấy tờ, tôi phải làm gì?"
                isActive={accordionActive === 7}
              >
                <p className="">
                  Tính năng thông báo giấy tờ để nhắc nhở các đối tác cần bổ sung đầy đủ giấy tờ để
                  đảm bảo tài khoản không bị gián đoạn. Nếu Anh/Chị đã bổ sung đầy đủ, Anh/Chị có
                  thể thao tác tắt màn hình thông báo và trực tuyến như bình thường.
                </p>
              </AccordionItem>
              <AccordionItem
                titleClassName="text-14 md:text-16 text-primary font-semibold"
                onClick={() => setAccordionActive(accordionActive === 8 ? undefined : 8)}
                title="Tại sao tôi đăng ký xe 7 chỗ nhưng lại hiển thị xe 4 chỗ?"
                isActive={accordionActive === 8}
              >
                <p className="">
                  Đối với các Anh/Chị đăng ký xe 7 chỗ sẽ có thể chọn đồng thời loại 4 chỗ và 7 chỗ
                  theo hướng dẫn sau:
                </p>
                <p className="mb-24">• Bấm vào biểu tượng Menu góc trên cùng bên trái ứng dụng.</p>
                <p className="mb-24">• Chọn “Thông tin cá nhân”.</p>
                <p className="mb-24">
                  • Chọn “Cài đặt” - “Loại dịch vụ” - Chọn vào ô 4 chỗ, 7 chỗ hoặc chọn cả 2 loại
                  hình.
                </p>
              </AccordionItem>
              <AccordionItem
                titleClassName="text-14 md:text-16 text-primary font-semibold"
                onClick={() => setAccordionActive(accordionActive === 9 ? undefined : 9)}
                title="Tôi đã hoàn thành thủ tục đăng ký tại Trung tâm Hỗ trợ Đối tác EXXE Hub, khi nào tài khoản của tôi được kích hoạt?"
                isActive={accordionActive === 9}
              >
                <p className="">
                  Trong vòng 24h kể từ lúc hoàn tất quy trình đăng ký (đã nhận đồng phục đối với xe
                  máy/ tem đối với xe 4 bánh) Anh/Chị sẽ được nạp tiền vào tài khoản tài xế và kích
                  hoạt tài khoản đồng thời nhận được tin nhắn thông báo kích hoạt tài khoản thành
                  công từ Exxe
                </p>
              </AccordionItem>
              <AccordionItem
                titleClassName="text-14 md:text-16 text-primary font-semibold"
                onClick={() => setAccordionActive(accordionActive === 10 ? undefined : 10)}
                title="Tôi đi đón khách xa nhưng chưa tới điểm đón khách thì khách hàng đã hủy chuyến. Tôi có được hỗ trợ chi phí đón khách?"
                isActive={accordionActive === 10}
              >
                <p className="">
                  Hiện nay Exxe không còn hỗ trợ phí hủy chuyến nữa, mong Quý tài xế thông cảm.
                </p>
              </AccordionItem>
              <AccordionItem
                titleClassName="text-14 md:text-16 text-primary font-semibold"
                onClick={() => setAccordionActive(accordionActive === 11 ? undefined : 11)}
                title="Tài xế đến điểm và chờ đợi nhưng khách không xuất hiện, tài xế cũng không liên lạc được với khách. Tài xế hủy chuyến trong trường hợp này thì có bị tính vào tỷ lệ hủy hay không?"
                isActive={accordionActive === 11}
              >
                <p className="">
                  Có. Việc tài xế hủy chuyến vẫn ảnh hưởng trực tiếp đến tỷ lệ hủy chuyến của tài
                  xế. Tài xế cần hoàn thành thêm nhiều chuyến xe để cải thiện tỷ lệ.{" "}
                </p>
              </AccordionItem>
              <AccordionItem
                titleClassName="text-14 md:text-16 text-primary font-semibold"
                onClick={() => setAccordionActive(accordionActive === 12 ? undefined : 12)}
                title="Ứng dụng đo quãng đường từ A đến B sai, dẫn đến số tiền không đúng thực tế. Tôi có được hoàn tiền?"
                isActive={accordionActive === 12}
              >
                <p className="">
                  Tài xế thu đúng số tiền hiện thị trên ứng dụng. Gởi yêu cầu hỗ trợ để được hỗ trợ
                  tính lại số tiền thực tế.
                </p>
              </AccordionItem>
              <AccordionItem
                titleClassName="text-14 md:text-16 text-primary font-semibold"
                onClick={() => setAccordionActive(accordionActive === 13 ? undefined : 13)}
                title="Khi trên ứng dụng của tài xế và khách hàng hiển thị số tiền phải thanh toán khác nhau. Tài xế sẽ thu tiền như thế nào?"
                isActive={accordionActive === 13}
              >
                <p className="">
                  Tài xế vui lòng thu tiền theo số tiền hiển thị trên ứng dụng của Hành khách, sau
                  đó tài xế cần liên hệ tổng đài SỐ ĐIỆN THOẠI để thông báo và được hỗ trợ.
                </p>
              </AccordionItem>
            </div>
          ) : null}
        </div>
      </div>
    </StaticLayout>
  )
}

export default FrequentlyAskedQuestions
