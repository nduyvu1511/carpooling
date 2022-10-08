/* eslint-disable react/no-unescaped-entities */
import { conditionPageBg } from "@/assets"
import { AccordionItem, Seo } from "@/components"
import { StaticLayout } from "@/layout"
import { useState } from "react"

const Conditions = () => {
  const [tabActive, setTabActive] = useState<number>()

  return (
    <StaticLayout
      bg={conditionPageBg}
      heading="Bảo mật thuộc quyền sở hữu của Công ty EXXE.VN"
      subHeading="Điều lệ & Điều khoản"
      sticky
    >
      <Seo
        description="Công ty Cổ phần Đầu Tư Công Nghệ và Vận Tải ExxeVn hoạt động trên nền tảng ứng dụng cho thuê xe có tài xế 4-7-16 chỗ, theo mô hình kinh tế chia sẻ trực tuyến. Ra đời vào cuối năm 2022, Exxe mong muốn cung cấp dịch vụ Di chuyển đường dài và các hình thức đa dạng nhằm mang đến những trải nghiệm tốt nhất cho cả khách hàng và cả đối tác của Exxe. Sứ mệnh"
        thumbnailUrl=""
        title="Điều lệ & Điều khoản"
        url="terms-&-conditions"
      />
      <div className="">
        <AccordionItem
          className="border-none"
          allowTransition={false}
          onClick={() => setTabActive(tabActive === 1 ? undefined : 1)}
          title="1. Nguyên tắc cộng đồng"
          isActive={tabActive === 1}
        >
          <ul>
            {[
              "Hãy đảm bảo rằng bạn luôn tuân thủ nghiêm chỉnh luật lệ giao thông Việt Nam. Khi di chuyển bằng xe ô tô, hãy luôn nhớ thắt dây an toàn dù bạn ngồi ghế trước hay ghế sau. Khi di chuyển bằng xe máy, hãy luôn đội nón bảo hiểm khi ngồi trên xe.",
              "Đối tác tài xế có trách nhiệm cụ thể về vấn đề an toàn và tuyệt đối không thực hiện các hành vi cấm theo Điều Luật Giao Thông Đường Bộ trong các chuyến xe be như: không điều khiển phương tiện giao thông đường bộ mà trong cơ thể có chất ma túy, trong máu hoặc hơi thở có nồng độ cồn; không chạy quá tốc độ cho phép, lạng lách, đánh võng; không đe dọa, xúc phạm, tranh giành, lôi kéo hành khách; không bắt ép hành khách sử dụng dịch vụ ngoài ý muốn; không sử dụng điện thoại khi đang chạy xe (đối tác có thể dùng giá đỡ điện thoại để xem chỉ đường hay tai nghe bluetooth để nghe điện thoại).",
              "Các đối tác tài xế không nên nhận chuyến trong tình trạng mệt mỏi và buồn ngủ. Hãy đảm bảo tình trạng sức khỏe tốt khi đang lái xe để đảm bảo an toàn tối đa.",
            ].map((item, index) => (
              <li key={index} className="mb-24 text-sm md:text-base">
                {item}
              </li>
            ))}
          </ul>
        </AccordionItem>

        <AccordionItem
          allowTransition={false}
          onClick={() => setTabActive(tabActive === 2 ? undefined : 2)}
          title="2. Quy chế dịch vụ vận tải hành khách"
          isActive={tabActive === 2}
          maxHeight={10000000}
        >
          <div className="">
            <p className="text-sm md:text-base mb-24">
              Quy chế dịch vụ vận tải hành khách (“Quy chế Vận tải Hành khách”) được xây dựng nhằm
              mang đến nhiều dịch vụ trực tuyến hữu ích phục vụ nhu cầu đi lại, vận chuyển hành
              khách của mọi người kết nối cung cấp dịch vụ qua ứng dụng Exxe.
            </p>

            <p className="text-sm md:text-base mb-24">
              Quy chế Vận tải Hành khách là thỏa thuận pháp lý ràng buộc Khách hàng (hành khách),
              Tài xế, Đơn vị vận tải, Exxe và các Bên liên quan khi thực hiện giao dịch liên quan
              đến dịch vụ vận chuyển hành khách qua ứng dụng Exxe.
            </p>

            <h5 className="text-sm md:text-base text-primary mb-24 font-semibold">
              1. Nguyên tắc chung:
            </h5>

            <p className="text-sm md:text-base mb-24">
              Khách hàng, Tài xế, Đơn vị vận tải và các bên liên quan, khi tham gia thực hiện giao
              dịch dịch vụ vận chuyển, được tự do thỏa thuận trên cơ sở tôn trọng quyền và lợi ích
              hợp pháp của các bên, phù hợp với quy định của pháp luật hiện hành có liên quan, các
              quy định tại quy chế này và các quy định khác liên quan của Exxe từng thời kỳ.
            </p>

            <p className="text-sm md:text-base mb-24">
              Thông tin sử dụng trong các giao dịch vận chuyển hành khách và các thông tin khác có
              liên quan phải minh bạch, chính xác, đầy đủ và xác thực.
            </p>
            <p className="text-sm md:text-base mb-24">
              Khách hàng, Tài xế, Đơn vị vận tải và các bên liên quan khi thực hiện các giao dịch
              vận chuyển hành khách thông qua dịch vụ và các dịch vụ khác liên quan, phải tự tìm
              hiểu trách nhiệm pháp lý của mình đối với luật pháp hiện hành của Việt Nam và cam kết
              thực hiện đúng những nội dung trong Quy chế này, Quy chế hoạt động Sàn TMĐT Exxe và
              các quy định khác có liên quan của Exxe từng thời kỳ.
            </p>
            <h5 className="text-sm md:text-base mb-24 text-primary font-semibold">
              2. Giải thích từ ngữ:
            </h5>
            <p className="text-sm md:text-base mb-24">
              Trong phạm vi quy chế này, các từ ngữ sau đây được hiểu như sau:
            </p>
            <p className="text-sm md:text-base mb-24">
              –<span className="font-bold"> Ứng dụng Exxe</span> là ứng dụng sàn giao dịch thương
              mại điện tử hoạt động trên thiết bị di động, được thiết lập, quản lý, vận hành bởi
              Exxe.
            </p>
            <p className="text-sm md:text-base mb-24">
              –<span className="font-bold"> Dịch vụ Exxe</span> là dịch vụ thương mại điện tử do
              Exxe cung cấp cho phép Khách hàng, Tài xế kết nối với nhau, thực hiện cung cấp dịch vụ
              vận tải hành khách theo hợp đồng bằng xe ô tô dưới 9 chỗ ngồi, được giao dịch thông
              qua ứng dụng Be.
            </p>
            <p className="text-sm md:text-base mb-24">
              –<span className="font-bold"> Dịch vụ Exxe</span> cung cấp cho phép Khách hàng, Tài xế
              kết nối với nhau, thực hiện cung cấp dịch vụ vận tải hành khách từ tỉnh/ thành phố này
              sang tỉnh/thành phố khác, hoặc trong phạm vi một tỉnh/thành phố có quãng đường di
              chuyển lớn, bao gồm hành trình một chiều (chiều đi) hoặc hai chiều (chiều đi và chiều
              về), được giao dịch thông qua ứng dụng Exxe. Khách hàng có thể đặt dịch vụ Exxe bằng
              phương tiện xe ô tô 4 - 16 chỗ ngồi.
            </p>
            <p className="text-sm md:text-base mb-24">
              –<span className="font-bold"> Khách hàng </span>là tổ chức, cá nhân thực hiện yêu cầu
              cung cấp dịch vụ vận chuyển hành khách qua ứng dụng Exxe.
            </p>
            <p className="text-sm md:text-base mb-24">
              –<span className="font-bold"> Tài xế </span>là cá nhân cung cấp dịch vụ vận chuyển
              hành khách bằng Phương tiện phù hợp, tùy vào từng loại dịch vụ vận chuyển.
            </p>
            <p className="text-sm md:text-base mb-24">
              –<span className="font-bold"> Đơn vị vận tải</span> là doanh nghiệp, hợp tác xã kinh
              doanh dịch vụ vận tải hành khách theo hợp đồng bằng xe ô tô 4 - 16 chỗ ngồi.
            </p>
            <p className="text-sm md:text-base mb-24">
              –<span className="font-bold"> Phương tiện</span> là xe ô tô 4 - 16 chỗ ngồi dùng để
              chuyên chở hành khách. Phương tiện phải đáp ứng các yêu cầu, điều kiện tham gia lưu
              thông, cung cấp dịch vụ vận tải theo quy định của pháp luật hiện hành và quy định của
              Exxe từng thời kỳ.
            </p>
            <p className="text-sm md:text-base mb-24">
              –<span className="font-bold"> Hành khách</span> là người được chuyên chở trên phương
              tiện do Khách hàng đặt dịch vụ hợp lệ qua ứng dụng Exxe.
            </p>
            <p className="text-sm md:text-base mb-24">
              –<span className="font-bold"> Chuyến (Cuốc) xe</span> là hành trình vận chuyển hành
              khách từ điểm đón đến điểm trả khách theo yêu cầu của Khách hàng khi thực hiện lệnh
              đặt xe.
            </p>
            <h5 className="text-sm md:text-base font-bold text-primary mb-24">
              3. Phạm vi cung cấp dịch vụ:
            </h5>
            <p className="text-sm md:text-base mb-24">
              Dịch vụ Exxe và các dịch vụ liên quan được cung cấp trong phạm vi thành phố Hà Nội,
              thành phố Hồ Chí Minh và các tỉnh, thành phố trực thuộc trung ương nơi mà Exxe có đăng
              ký kinh doanh và đã có đủ điều kiện kinh doanh theo quy định của pháp luật hiện hành
              có liên quan trong từng thời kỳ.
            </p>

            <h5 className="text-sm md:text-base mb-24 font-semibold">II. QUY TRÌNH GIAO DỊCH</h5>
            <p className="text-sm md:text-base mb-24">1. Quy trình giao dịch dành cho Khách hàng</p>
            <p className="text-sm md:text-base mb-24">a) Quy trình đặt, sử dụng dịch vụ</p>
            <p className="text-sm md:text-base mb-24">
              Để thực hiện giao dịch, Khách hàng cần truy cập vào ứng dụng Exxe (dành cho Khách
              hảng) trên thiết bị di động, tại màn hình giao diện ứng dụng, Khách hàng chọn các dịch
              vụ tương ứng (1 chiều, 2 chiều, ghép chuyến, ...) và thực hiện giao dịch theo quy định
              như sau:
            </p>
            <p className="text-sm md:text-base mb-24">
              <span className="font-semibold">Bước 1.</span> Nhập điểm đi/ điểm đến Khách hàng chọn
              vị trí cần đón (điểm đi): vị trí điểm đón mặc định tự động là vị trí hiện tại của quý
              khách đang đứng có được nhờ vào hệ thống định vị GPS của điện thoại mà quý khách hàng
              đang sử dụng. Nếu muốn chọn điểm đón khác, Khách hàng nhập thông tin địa điểm khác vào
              ô điểm đón. Khách hàng tiếp tục nhập thông tin điểm đến vào mục “Nhập điểm đến".
            </p>
            <p className="text-sm md:text-base mb-24">Bước 2. Chọn dịch vụ</p>
            <p className="text-sm md:text-base mb-24">
              - Khách hàng loại hình dịch vụ vận chuyển hành khách tùy theo nhu cầu của mình: 1
              chiều, 2 chiều, ghép chuyến, ...được hiển thị trên màn hình ứng dụng.
            </p>
            <p className="text-sm md:text-base mb-24">
              - Sau khi người mua nhập chọn đầy đủ các thông tin trên hệ thống sẽ tự động hiển thông
              tin giá ước tính của chuyến đi. Mỗi loại hình dịch vụ vận chuyển số có giá cước khác
              nhau.
            </p>
            <p className="text-sm md:text-base mb-24">
              Khách hàng chọn “Đặt chuyến” để xác nhận đặt chuyến xe. Nếu Khách hàng có mã khuyến
              mại, Khách hàng nhập/chọn mã ưu đãi trước khi thực hiện đặt chuyến để nhận ưu đãi.
            </p>
            <p className="text-sm md:text-base mb-24">
              Hệ thống sẽ kết nối Khách hàng với Tài xế phủ hợp. Nếu kết nối thành công, Khách hàng
              có thể thấy được thông tin ước lượng khoảng thời gian chở, thông tin về xe, Lái xe (họ
              tên, số điện thoại, vị trí hiện tại). Khách hàng có thể chủ động liên hệ nhà cung cấp
              bằng tin nhắn hoàn toàn miễn phí ngay trên ứng dụng Exxe.
            </p>

            <p className="text-sm md:text-base mb-24">
              Hệ thống sẽ kết nối Khách hàng với Tài xế phủ hợp. Nếu kết nối thành công, Khách hàng
              có thể thấy được thông tin ước lượng khoảng thời gian chở, thông tin về xe, Lái xe (họ
              tên, số điện thoại, vị trí hiện tại). Khách hàng có thể chủ động liên hệ nhà cung cấp
              bằng tin nhắn hoàn toàn miễn phí ngay trên ứng dụng Exxe.
            </p>

            <p className="text-sm md:text-base mb-24">
              Nếu kết nối giữa Khách hàng và Tài xế không thành công, hệ thống sẽ thông báo cho
              Khách hàng được biết. Khách hàng tiến hành đặt lại chuyến để hệ thống tiếp tục tìm
              kiếm, kết nối lại với Tài xế.
            </p>
            <p className="text-sm md:text-base mb-24">Bước 3: Đặt cọc chuyến đi</p>
            <p className="text-sm md:text-base mb-24">
              Khách hàng đặt cọc 20% chuyến đi để giữ chỗ, số tiền này sẽ được chuyển cho tài xế
              ngay sau khi tài xế bấm “chuyến đi hoàn thành”.
            </p>
            <p className="text-sm md:text-base mb-24">Bước 4. Bắt đầu chuyến đi</p>
            <p className="text-sm md:text-base mb-24">
              - Tài xế sẽ có mặt tại điểm đón để Hành khách lên xe và bắt đầu vận chuyển, Trước khi
              bắt đầu chuyến đi, Tài xế chọn “Bắt đầu chuyến đi” trên ứng dụng Exxe của Tài xế, khi
              đó giao diện ứng dụng Exxe của Khách hàng lúc này sẽ chuyển sang trạng thái “Trong
              chuyến đi”.
            </p>
            <p className="text-sm md:text-base mb-24">Bước 5. Kết thúc chuyến đi</p>
            <p className="text-sm md:text-base mb-24">
              - Tài xế vận chuyển Hành khách đến đúng điểm đến mà Khách hàng đã đặt và chọn “Kết
              thúc chuyển đi” trên ứng dụng Exxe dành cho Tài xế. Khi đó, màn hình ứng dụng Exxe của
              Khách hàng đồng thời sẽ hiển thị lại thông tin chuyến đi, cước dịch vụ Khách hàng cần
              thanh toán, ... và giao diện để Khách hàng đánh giá (chấm sao) Tài xế cung cấp dịch
              vụ.
            </p>
            <p className="text-sm md:text-base mb-24">b) Hủy chuyến</p>
            <p className="text-sm md:text-base mb-24">
              Khách hàng có thể hủy chuyến xe đã có Tài xế chấp nhận bằng tính hủy hủy chuyến trên
              ứng dụng Exxe. Khách hàng chỉ có thể hủy chuyến trước khi chuyến đi bắt đầu.
            </p>
            <p className="text-sm md:text-base mb-24">
              - Khi hủy chuyến, Khách hàng chọn nhanh lý do hủy chuyến theo danh mục sẵn có hoặc
              nhập nội dung để gửi về hệ thống.
            </p>
            <p className="text-sm md:text-base mb-24">
              Trường hợp Khách hàng hủy chuyến làm phát sinh các khoản phí, chi phí hoặc gây thiệt
              hại cho các bên liên quan, Khách hàng phải thanh toán bồi thường giá trị tương ứng cho
              bên liên quan đó.
            </p>

            <h5 className="text-sm md:text-base font-bold text-primary mb-24">
              3. Phạm vi cung cấp dịch vụ:
            </h5>

            <p className="text-sm md:text-base mb-24">a) Quy trình tiếp nhận, cung cấp dịch vụ</p>
            <p className="text-sm md:text-base mb-24">
              Để thực hiện giao dịch, Tài xế cần truy cập vào ứng dụng Exxe (dành cho Tải xế) trên
              thiết bị di động.
            </p>
            <p className="text-sm md:text-base mb-24">
              Tùy vào từng loại hình dịch vụ (1 chiều, 2 chiều, ghép chuyến, ...) mà Tài xế đăng ký
              sẽ nhận được các yêu cầu cung cấp dịch vụ tương ứng (1 chiều, 2 chiều, ghép chuyến,
              ...) của Khách hàng. Quy trình thực hiện giao dịch như sau:
            </p>
            <p className="text-sm md:text-base mb-24">Bước 1: Tiếp nhận yêu cầu Dịch vụ</p>
            <p className="text-sm md:text-base mb-24">
              - Truy cập ứng dụng ExxeDriver (dành cho Tài xế), Tài xế chọn đăng nhập, sau đó chọn
              chuyến phù hợp có sẵn hoặc tạo cuốc tiện chuyến.
            </p>
            <p className="text-sm md:text-base mb-24">
              Yêu cầu đặt xe của Khách hàng được hệ thống tự động ghi nhận, Tài xế chọn "Đồng ý nhận
              chuyển” để tiếp nhận yêu cầu chuyến đi của Khách hàng. Hệ thống sẽ gửi thông tin khách
              hàng khi tài xế hoàn thành các bước tiếp theo
            </p>
            <p className="text-sm md:text-base mb-24">Bước 2: Đặt cọc chuyến đi</p>
            <p className="text-sm md:text-base mb-24">Tài xế đặt cọc 20% cho chuyến đi</p>
            <p className="text-sm md:text-base mb-24">Bước 2. Bắt đầu chuyến đi</p>
            <p className="text-sm md:text-base mb-24">
              - Tài xế di chuyển đến điểm đón mà Khách hàng đã đặt, được hiển thị trên ứng dụng Exxe
              để đón Hành khách.
            </p>
            <p className="text-sm md:text-base mb-24">
              Sau khi Hành khách lên xe, Tài xế chọn “Bắt đầu chuyến đi” hiển thị trên ứng dụng Exxe
              của Tài xế.
            </p>
            <p className="text-sm md:text-base mb-24">Bước 3: Kết thúc chuyến đi</p>
            <p className="text-sm md:text-base mb-24">
              - Tài xế theo lộ trình hướng dẫn trên ứng dụng Exxe, vận chuyển hành khách đến đúng
              điểm đón. thúc
            </p>
            <p className="text-sm md:text-base mb-24">
              - Sau khi Hành khách xuống xe, hoàn thành thanh toán cước phi, Tài xế chọn “Kết chuyến
              đi” để hoàn thành chuyến xe.
            </p>
            <p className="text-sm md:text-base mb-24">b) Hủy chuyến</p>
            <p className="text-sm md:text-base mb-24">
              - Tài xế có thể hủy chuyến đi bằng tinh hủy hủy chuyến xe đã nhận trên ứng dụng Exxe
              dành cho Tài xế. Tài xế chỉ có thể hủy chuyến trước khi chuyển đi bắt đầu.
            </p>
            <p className="text-sm md:text-base mb-24">
              - Khi hủy chuyến, Tài xế chọn nhanh lý do hủy chuyển theo danh mục sẵn có hoặc nhập
              nội dung để gửi về hệ thống.
            </p>
            <p className="text-sm md:text-base mb-24">
              - Trường hợp Tải xể hủy chuyến làm phát sinh các khoản phi, chi phi hoặc gây thiệt hại
              cho các bên liên quan, Tài xế phải thanh toán bồi thường giá trị tương ứng cho bênliên
              quan đó.
            </p>

            <p className="text-sm md:text-base mb-24 font-semibold">
              III. GIÁ (PHÍ), THANH TOÁN VÀ HÓA ĐƠN
            </p>

            <p className="text-sm md:text-base mb-24">1. Các loại giá (phí) dịch vụ liên quan</p>
            <p className="text-sm md:text-base mb-24">
              Cước (phí) vận chuyển tính dựa theo đơn giá cho từng ki lô mét của quãng đường vận
              chuyển và sẽ được hệ thống tự động tính toán, hiển thị trên ứng dụng Exxe khi Khách
              hàng đặt dịch vụ. Trừ khi có quy định khác đi, Cước vận chuyển đã bao gồm thuế giá trị
              gia tăng, chi phí thuê xe, tiền nhiên liệu, tiền công Tài xế cho việc vận chuyển và
              các chi phi cần thiết khác để cung cấp dịch vụ. Đơn giá cước vận chuyển cụ thể sẽ được
              gửi thông báo tới khách hảng, tùy từng thời điểm.
            </p>
            <p className="text-sm md:text-base mb-24">
              Phí sử dụng nền tảng do Exxe ấn định, thu theo quyết định của Exxe từng thời điểm Các
              khoản giả (phí) khác có thể được áp dụng tùy từng thời điểm khi được thông báo đầy đủ,
              kịp thời cho các bên liên quan.
            </p>
            <p className="text-sm md:text-base mb-24">2. Thanh toán</p>
            <p className="text-sm md:text-base mb-24">
              Khách hàng có thể lựa chọn phương thức thanh toán bằng tiền mặt hoặc không dùng tiền
              mặt cho Đơn hàng (Thẻ Ngân hàng, Thẻ tín dụng, Ví điện tử, ...).
            </p>
            <p className="text-sm md:text-base mb-24">3. Hóa đơn</p>
            <p className="text-sm md:text-base mb-24">
              Hóa đơn cho dịch vụ vận chuyển, phí sử dụng nền tảng được Exxe đại diện các bên liên
              quan xuất, cung cấp cho Khách hàng. Exxe sẽ xuất hóa đơn với tên người mua là “Người
              mua không lấy hóa đơn” theo quy định pháp luật hiện hành nếu Khách hàng không yêu cầu
              xuất hóa đơn cho các loại chi phí này. Hóa đơn do Exxe xuất là hóa đơn điện tử.
            </p>
            <p className="text-sm md:text-base mb-24">
              Để nhận hóa đơn, chứng từ liên quan đến cuốc xe, Khách hàng phải chọn nhập thông tin
              yêu cầu hóa đơn qua ứng dụng Exxe khi đặt dịch vụ để hệ thống ghi nhận. Nếu Khách hàng
              không chọn nhập thông tin yêu cầu hóa đơn qua ứng dụng Exxe, thời gian tối đa Exxe hỗ
              trợ xuất hóa đơn cho Khách hàng là 7 (bảy) ngày.
            </p>
            <p className="text-sm md:text-base mb-24">
              4. Thanh toán giữa Exxe với Tài xế Đơn vị vận tải
            </p>
            <p className="text-sm md:text-base mb-24">
              Việc thanh toán, xuất hóa đơn (nếu có) giữa Exxe Group với Tài xế/Đơn vị vận tải được
              thực hiện theo thỏa thuận giữa Exxe Group với Tài xế Đơn vị vận tải tùy từng thời
              điểm.
            </p>

            <p className="text-sm md:text-base mb-24 font-semibold">
              IV. QUY ĐỊNH VẺ VẬN CHUYỂN HÀNH KHÁCH
            </p>
            <p className="text-sm md:text-base mb-24">
              1. Khách hàng, Tài xế, Hành khách và các bên liên quan phải tuân thủ và thực hiện
              đúng, đủ các điều khoản và điều kiện quy định của Quy chế hoạt động sàn vận tải điện
              tử Exxe được Exxe công bố.{" "}
            </p>
            <p className="text-sm md:text-base mb-24">
              2. Tài xế, Khách hàng và/hoặc Hành khách trên xe khi thực hiện chuyển xe phải có ý
              thức tự giác, nghiêm chỉnh chấp hành quy tắc giao thông, giữ gìn an toàn cho mình và
              cho người khác.{" "}
            </p>
            <p className="text-sm md:text-base mb-24">
              3. Tài xế là chủ phương tiện/người điều khiển phương tiện phải chịu trách nhiệm trước
              pháp luật về việc bảo đảm an toàn của phương tiện khi cung cấp dịch vụ vận tải hành
              khách.{" "}
            </p>
            <p className="text-sm md:text-base mb-24">
              4. Tài xế phải tuân thủ các quy định về đi đúng chiều đi của mình, đi đúng làn đường,
              phần đưởng quy định; chấp hành hệ thống báo hiệu đường bộ; tốc độ xe chạy và giữ
              khoảng cách an toàn, ... khi cung cấp dịch vụ vận tải hành khách.
            </p>
            <p className="text-sm md:text-base mb-24">
              5. Mỗi Hành khách được miễn cước hành lý mang theo với kích thước một kiện/túi/ gói/va
              li/đồ vật không có bất cứ chiều nào quá 50 cm (Năm mươi centimet) và cân nặng không
              quá 10 kg (Mười kilogam) hoặc hành lý có kích thước phủ hợp với quy định của pháp
              luật, đồng thời thỏa mãn các điều kiện không gian để hành lý của phương tiện (khoang
              chứa đồ) có thể chứa, không quá tải trọng xe cho phép và không vi phạm quy định của
              pháp luật về giao thông đối với xe chở khách, đảm bảo nguyên tắc an toàn giao thông.
              Phụ phí đối với hành lý mang theo quá khổ và hoặc quá tải có thể được áp dụng. Hành
              khách có trách nhiệm tự bảo quản hành lý, tài sản mang theo. Exxe và Tài xế không
              trách nhiệm về sự mất mát, hư hỏng, thiếu hụt hành lý tài sản Hành khác mang theo
              trước/trong/sau hành trình vận chuyển.
            </p>
            <p className="text-sm md:text-base mb-24">
              6. Hành khách cam kết, hành lý, tải sản mang theo không thuộc danh mục hàng hóa cấm
              lưu thông, hàng hóa không được phép vận chuyển trên xe chở khách theo quy định của
              pháp luật. Để hiểu rõ, mọi hành vi vi phạm của Hành khách liên quan tới hành lý/tài
              sản mang theo sẽ do Khách hàng Hành khách chịu hoàn toàn trách nhiệm. Trong trường hợp
              Khách hàng Hành khách vi phạm các quy định về hành lý mang theo, Khách hàng/Hành khách
              cam kết sẽ chịu trách nhiệm bồi thưởng mọi thiệt hại phát sinh cho Exxe và/hoặc Tài xế
              phải gánh chịu.
            </p>
            <p className="text-sm md:text-base mb-24">
              7. Exxe Group và/hoặc Lái xe có quyền yêu cầu kiểm tra hành lý mang theo của Hành
              khách nếu nghi ngờ hành lý mang theo đó quá khổ quá tải hoặc thuộc danh mục hàng hóa
              cấm lưu thông, hàng hóa không được phép vận chuyển trên xe chở khách theo quy định của
              pháp luật. Để tránh hiểu nhầm, việc yêu cầu và/hoặc thực hiện việc kiểm tra hành lý
              mang theo của Hành khách không đồng nghĩa với việc Exxe Group và/hoặc Tài xế phải chịu
              trách nhiệm đối với hành lý mang theo của Khách hàng, trong mọi trường hợp, Khách hàng
              Hành khách vẫn phải chịu trách nhiệm hoàn toàn đối với hành lý mang theo quy định tại
              Mục IV này.
            </p>

            <p className="text-sm md:text-base mb-24 font-semibold">
              V. QUYỀN VÀ NGHĨA VỤ CỦA CÁC BÊN
            </p>
            <p className="text-sm md:text-base mb-24">
              1. Quyền và nghĩa vụ của Khách hàng, Hành khách
            </p>
            <p className="text-sm md:text-base mb-24">
              a) Được cung cấp thông tin trung thực về dịch vụ.
            </p>
            <p className="text-sm md:text-base mb-24">
              b) Được cung cấp thông tin chính xác, đầy đủ về Đơn vị vận tải, Tài xế. c) Không được
              từ chối nhận cuốc xe mà Tài xế đã đến đúng điểm đón theo yêu cầu của Khách hàng.
            </p>
            <p className="text-sm md:text-base mb-24">
              d) Cam kết tuân thủ đúng, đầy đủ các Điều khoản và điều kiện được quy định tại Quy chế
              này.
            </p>
            <p className="text-sm md:text-base mb-24">
              e) Trường hợp Khách hàng hủy đặt xe (đã đặt thành công) không đúng quy định của quy
              chế nảy, quy định của Sản VẬN TẢI ĐIỆN TỬ Exxe, Khách hàng phải bồi thưởng toàn bộ
              thiệt hại thực tế theo giá trị cuốc xe hủy không đúng quy định cho các bên liên quan.
            </p>
            <p className="text-sm md:text-base mb-24">
              f) Có nghĩa vụ tuân thủ đầy đủ các quy định, hướng dẫn về an toàn vận chuyển của Tài
              xế (nếu có).
            </p>
            <p className="text-sm md:text-base mb-24">
              g) Cỏ trách nhiệm hợp tác đẩy đủ, phối hợp kịp thời với Exxe Group, cán bộ, nhân viên,
              người đại diện của Exxe Group trong quá trình điều tra, xử lý, giải quyết vụ việc liên
              quan đến nguy cơ xảy ra sự cố và/hoặc sự cố đã xảy ra về an toàn vận chuyển.
            </p>
            <p className="text-sm md:text-base mb-24">
              h) Tuân thủ quy định của pháp luật liên quan và các quy định khác của Exxe Group (nếu
              có) trong từng thời kỳ. tải
            </p>
            <p className="text-sm md:text-base mb-24">
              2. Quyền và nghĩa vụ của Tài xế, Đơn vị vận tải
            </p>
            <p className="text-sm md:text-base mb-24">
              a) Đơn vị vận tải, Tài xế phải ký/chấp thuận thỏa thuận hợp tác/hợp đồng dịch vụ liên
              quan theo yêu cầu Exxe Group và thực hiện đầy đủ các cam kết trong thỏa thuận; thanh
              toán chỉ phi hoặc phân chia kết quả kinh doanh thu được thanh toán phí dịch vụ cho
              Exxe khi tham gia cung cấp dịch vụ vận chuyển được kết nối với khách hàng qua ứng dụng
              Exxe.
            </p>
            <p className="text-sm md:text-base mb-24">
              b) Đơn vị vận tải tham gia xây dựng và cung cấp cho Exxe các căn cứ tính cước cho
            </p>
            <p className="text-sm md:text-base mb-24">
              dịch vụ khi có yêu cầu của Exxe Group và/hoặc của cơ quan nhà nước có thẩm quyền liên
            </p>
            <p className="text-sm md:text-base mb-24">quan theo quy định của pháp luật.</p>
            <p className="text-sm md:text-base mb-24">
              c) Đơn vị vận tải, Tài xế phải phối hợp với Exxe Group để tải, cải đặt ứng dụng Exxe
              kết nối vào thiết bị di động cho Tài xế; tổ chức tập huấn cho Tài xế về cách thức sử
              dụng ứng dụng Exxe, điều kiện và tiêu chuẩn cung cấp dịch vụ, phương thức thanh toán
              và các nội dung khác nhằm nâng cao chất lượng đội ngũ Tài xế.
            </p>
            <p className="text-sm md:text-base mb-24">
              d) Đơn vị vận tải và Tài xế phải đảm bảo Tài xế phương tiện tham gia kinh doanh vận
              tải tuân thủ các quy định pháp luật có liên quan, đồng thời cung cấp cho Exxe Group
              đầy đủ giấy tờ để chứng minh việc tuân thủ pháp luật này.
            </p>
            <p className="text-sm md:text-base mb-24">
              e) Đơn vị vận tải, Tài xế theo yêu cầu của Exxe Group phải phối hợp, xử lý các vấn đề
              liên quan đến Tải xế, Phương tiện, các vấn đề liên quan khác mả Đơn vị vận tải quản
              lý.
            </p>
            <p className="text-sm md:text-base mb-24">
              f) Đơn vị vận tải, Tài xế phải thực hiện đầy đủ quyền và nghĩa vụ theo quy định của
              pháp luật đối với loại hình kinh doanh vận tải theo quy định của pháp luật hiện hành,
              bao gồm bảo đảm an toản, quyền và lợi ích hợp pháp cho hành khách, chất lượng xe, biển
              hiệu xe, chất lượng lái xe, chất lượng dịch vụ... theo quy định của pháp luật hiện
              hành.
            </p>
            <p className="text-sm md:text-base mb-24">
              g) Tài xế điều khiển phương tiện tinh tiền thông qua phần mềm, trong quá trình vận
              chuyển hành khách phải có thiết bị truy cập để thể hiện các thông tin của chuyến đi
              (thông tin xe, thông tin lái xe, hành trình di chuyển, giá cước, ...).
            </p>
            <p className="text-sm md:text-base mb-24">
              h) Đơn vị vận tải /Tài xế thực hiện cung cấp dịch vụ vận tải hành khách phải đảm bảo
              công bằng cho tất cả Khách hàng, không phân biệt việc có hay không sử dụng mã khuyến
              mại, mã cước phi được cung cấp bởi Exxe Group; không phân biệt thanh toán bằng tiền
              mặt, thể thanh toán, trả trước hoặc trả sau; không phân biệt khách hàng đi quãng đường
              ngắn hay quãng đường dài; các hình thức phân biệt đối xử khác gây tổn hại đến Sản VẬN
              TẢI ĐIỆN TỬ Exxe và gây phản cảm cho xã hội.
            </p>
            <p className="text-sm md:text-base mb-24">
              i) Tài xế không được: điều khiển phương tiện tham gia cung cấp dịch vụ mà trong cơ thể
              có chất ma túy hoặc trong máu hoặc hơi thở có nồng độ cồn; điều khiển phương tiện
              không có giấy phép lái xe theo quy định; Đe dọa, xúc phạm, tranh giành, lôi kéo hành
              khách, bắt ép hành khách sử dụng dịch vụ ngoài ý muốn, chuyển tải, xuống khách hoặc
              các hành vi khác nhằm trốn tránh phát hiện xe chở quá tải, quá số người quy định; Hành
              vi vi phạm quy tắc giao thông đường bộ, hành vi khác gây nguy hiểm cho người và phương
              tiện tham gia giao thông đường bộ.
            </p>
            <p className="text-sm md:text-base mb-24">
              j) Trách nhiệm, nghĩa vụ của Đơn vị vận tải đối với dịch vụ vận chuyển hành khách bằng
              xe ô tô dưới 9 chỗ ngồi:
            </p>
            <p className="text-sm md:text-base mb-24">
              Phải tổ chức tập huấn nghiệp vụ vận tải và an toàn giao thông và tổ chức khám sức khỏe
              cho Tải xế, đồng thời tuân thủ các quy định của pháp luật đối với hoạt động vận tải
              cho Tài xế.
            </p>
            <p className="text-sm md:text-base mb-24">
              - Phải bảo đảm sự tuân thủ các quy định của pháp luật về lao động, pháp luật giao
              thông đường bộ về thời giờ làm việc, thời gian làm việc của lái xe trong ngày, thời
              gian lái xe liên tục.
            </p>
            <p className="text-sm md:text-base mb-24">
              - Phương tiện phải thuộc quyền sở hữu hoặc quyền sử dụng hợp pháp theo hợp đồng thuê
              phương tiện bằng văn bản của đơn vị kinh doanh vận tải hành khách bằng xe ô tỏ với tổ
              chức, cá nhân hoặc hợp đồng hợp tác kinh doanh theo quy định của pháp luật, trường hợp
              xe đăng ký thuộc sở hữu của thành viên hợp tác xã phải có hợp đồng dịch vụ giữa thành
              viên với hợp tác xã, trong đó quy định hợp tác xã có quyền, trách nhiệm và nghĩa vụ
              quản lý, sử dụng, điều hành xe ô tô thuộc sở hữu của thành viên hợp tác xã.
            </p>
            <p className="text-sm md:text-base mb-24">
              Xe ô tô có sức chưa dưới 9 chỗ ngồi, niên hạn sử dụng không quá 12 năm hoặc ngắn hơn
              theo thông báo của Exxe để đảm bảo cam kết chất lượng dịch vụ.
            </p>
            <p className="text-sm md:text-base mb-24">
              - Phương tiện phải có phủ hiệu phù hợp với loại hình kinh doanh vận tải theo quy định
              của pháp luật được dân cố định phía bên phải mặt trong kính trước của xe.
            </p>
            <p className="text-sm md:text-base mb-24">
              Ký hợp đồng lao động, đóng các loại bảo hiểm, tổ chức khám sức khỏe định kỳ và thực
              hiện đầy đủ các quyền lợi của người lao động (lái xe) theo quy định của pháp luật về
              lao động, bao hiểm hiện hành. - Xây dựng, thực hiện kế hoạch bảo dưỡng và sửa chữa
              phương tiện; lập, cập nhật
            </p>
            <p className="text-sm md:text-base mb-24">
              đầy đủ quá trình hoạt động của phương tiện vào lý lịch phương tiện hoặc phần mềm quản
              lý phương tiện của đơn vị với các thông tin tối thiểu theo quy định pháp luật. - Lập,
              cập nhật đầy đủ quá trình hoạt động của lái xe vào lý lịch hành nghề người lái xe hoặc
              phần mềm quản lý lái xe với các thông tin tối thiểu theo quy định pháp luật. - Lưu trữ
              hồ sơ, tài liệu có liên quan trong quá trình quản lý, điều hành hoạt động vận tải của
              đơn vị để phục vụ công tác thanh tra, kiểm tra; thời gian lưu trữ tối thiểu 03 năm.
            </p>
            <p className="text-sm md:text-base mb-24">
              - Tuân thủ đầy đủ các quy định về kinh doanh, điều kiện kinh doanh khác theo quy định
              của pháp luật (nếu có).
            </p>

            <p className="text-sm md:text-base mb-24 font-semibold">VI. ĐIỀU KHOẢN HIỆU LỰC</p>
            <p className="text-sm md:text-base mb-24"></p>
            <p className="text-sm md:text-base mb-24">
              1. Quy chế Vận tải Hành khách này là phần không tách rời của Quy chế hoạt động Sản VẬN
              TẢI ĐIỆN TỬ Exxe. Quy chế Vận tải Hành khách này có hiệu lực sau khi được công bố, cập
              nhật trên trang thông tin điện tử www.Exxe.com.vn và ứng dụng Exxe.
            </p>
            <p className="text-sm md:text-base mb-24">
              2. Những nội dung được quy định cụ thể trong Quy chế này sẽ được ưu tiên áp dụng so
              với Quy chế hoạt động Sản VẬN TẢI ĐIỆN TỬ Exxe. Những nội dung liên quan chưa được quy
              định trong Quy chế này sẽ áp dụng theo Quy chế hoạt động Sản VẬN TẢI ĐIỆN TỬ Exxe.
            </p>
            <p className="text-sm md:text-base mb-24">
              3. Trưởng hợp có bất kỳ xung đột hay mâu thuẫn nào về củng một vấn đề giữa các điều
              khoản của Quy chế này, điều khoản của Quy chế hoạt động Sản VẬN TẢI ĐIỆN TỬ Exxe,
              và/hoặc Hợp đồng giữa Exxe Group và Đơn vị Vận tải/ Tài xế, bao gồm các phiên bản được
              sửa đổi, bổ sung của các tài liệu này, thứ tự ưu tiên áp dụng các quy định để điều
              chỉnh các giao dịch liên quan đến hoặc phát sinh từ sản phẩm, dịch vụ giữa các Bên nếu
              trong Quy chế này như sau:
            </p>
            <p className="text-sm md:text-base mb-24">
              (i) Các điều khoản & điều kiện liên quan của Hợp đồng giữa Exxe Group và Đơn vị Vận
              tại/Tài xế.
            </p>
            <p className="text-sm md:text-base mb-24">
              (ii) Các điều khoản liên quan của Quy chế này.
            </p>
            <p className="text-sm md:text-base mb-24">
              (iii) Các điều khoản liên quan của Quy chế hoạt động Sản VẬN TẢI ĐIỆN TỬ Exxe.
            </p>
            <p className="text-sm md:text-base">
              4. Exxe Group bảo lưu quyền sửa đổi, bổ sung, chấm dứt Quy chế này và công bố qua
              trang thông tin điện tử www.Exxe.vn và ứng dụng Exxe trước khi áp dụng. Người Mua,
              Người Bán và Tài xế cần phải thường xuyên theo dõi và cập nhật những thay đổi của Quy
              chế nảy để hiểu và thực hiện các quy định tại từng thời điểm.
            </p>
          </div>
        </AccordionItem>

        {/* <AccordionItem
          isActive={tabActive === 3}
          onClick={() => setTabActive(tabActive === 3 ? undefined : 3)}
          title="3. Quy chế hoạt động"
        >
          <div>
            <h5 className="text-sm md:text-base font-semibold text-primary mb-24">
              A. Giới thiệu:
            </h5>
            <p className="text-sm md:text-base mb-24">
              Ứng dụng Exxe là ứng dụng thương mại điện tử trên thiết bị di động do Công ty Cổ phần
              Đầu Tư Công Nghệ và Vận Tải ExxVn, mã số thuế: ……………., địa chỉ: Số 2 đường Hoàng Thế
              Thiện, Phường An lợi Đông, TP. Thủ Đức, Thành phố Hồ Chí Minh, Việt Nam (sau đây gọi
              là: Exxe), thiết lập, quản lý, vận hành để cung cấp môi trường cho các thương nhân, tổ
              chức, cá nhân khác tiến hành các hoạt động thương mại phù hợp với quy định của pháp
              luật hiện hành.
            </p>
            <p className="text-sm md:text-base mb-24">
              Ứng dụng Exxe bao gồm: 2 chiều, 1 chiều, Tiện chuyến, Ghép chuyến.
            </p>
            <h5 className="text-sm md:text-base font-bold text-primary">B. Quy định chung:</h5>

            <p className="text-sm md:text-base mb-24">
              1. Bản quy chế này ban hành các quy định, điều khoản, điều kiện áp dụng đối với các
              thương nhân, tổ chức, cá nhân mua bán hàng hóa hoặc cung cấp dịch vụ tham gia Sàn TMĐT
              Exxe với mục đích tạo ra một môi trường hoạt động thương mại, dịch vụ lành mạnh, hợp
              pháp, phù hợp với quy định của pháp luật hiện hành.
            </p>
            <p className="text-sm md:text-base mb-24">
              2. Thành viên tham gia giao dịch qua Sàn TMĐT Exxe được tự do thỏa thuận không trái
              với các quy định của pháp luật, thuần phong mỹ tục và đạo đức xã hội; tự nguyện, bình
              đẳng trong giao dịch; bảo đảm quyền và lợi ích hợp pháp của Nhà nước, Exxe, các thành
              viên và các tổ chức, cá nhân liên quan; bảo đảm quyền lợi người tiêu dùng.
            </p>
            <p className="text-sm md:text-base mb-24">
              3. Hàng hóa, dịch vụ được giao dịch một phần hoặc toàn bộ qua Sàn TMĐT Exxe phải đảm
              bảo tuân thủ các quy định pháp luật liên quan đến việc kinh doanh hàng hóa, dịch vụ
              đó; Đối với hàng hóa, dịch vụ thuộc loại hình kinh doanh có điều kiện thì phải có đầy
              đủ điều kiện kinh doanh; Hàng hóa, dịch vụ cung cấp qua Sàn TMĐT Exxe không thuộc các
              trường hợp cấm kinh doanh, cấm vận chuyển, cấm quảng cáo theo quy định của pháp luật
              hiện hành.
            </p>
            <p className="text-sm md:text-base mb-24">
              4. Thương nhân cung cấp hàng hóa, dịch vụ thực hiện hoạt động thương mại qua Sàn TMĐT
              Exxe có nghĩa vụ thông tin đầy đủ, trung thực cho người tiêu dùng về hàng hoá, dịch vụ
              mà mình kinh doanh và phải chịu trách nhiệm về tính chính xác của các thông tin đó,
              đồng thời phải chịu trách nhiệm về chất lượng, tính hợp pháp của hàng hoá, dịch vụ mà
              mình kinh doanh.
            </p>
            <p className="text-sm md:text-base mb-24">
              5. Bằng việc tham gia giao dịch trên Sàn TMĐT Exxe, Thương nhân, tổ chức, cá nhân được
              xem là đã tìm hiểu đầy đủ quyền và nghĩa vụ của mình và hoàn toàn đồng ý bị ràng buộc
              bởi Quy chế hoạt động Sàn TMĐT Exxe này. Thương nhân, tổ chức, cá nhân liên quan thừa
              nhận giá trị pháp lý của các giao dịch hợp pháp, hợp lệ được thực hiện qua Sàn TMĐT
              Exxe.
            </p>
            <p className="text-sm md:text-base mb-24">6. Các định nghĩa</p>
            <p className="text-sm md:text-base mb-24">
              7. “Sàn TMĐT Exxe” là sàn giao dịch thương mại điện tử do Exxe tổ chức thiết lập, quản
              lý, vận hành để cung cấp môi trường cho các thương nhân, tổ chức, cá nhân khác tiến
              hành các hoạt động thương mại mua bán hàng hóa, cung cấp dịch vụ phù hợp với quy định
              của pháp luật.
            </p>
            <p className="text-sm md:text-base mb-24">
              8. “Khách hàng” (hoặc “Người mua”) là tổ chức, cá nhân có nhu cầu mua hàng hóa, dịch
              vụ của Nhà cung cấp với một phần hoặc toàn bộ quy trình mua bán hàng hóa, cung ứng
              dịch vụ được thực hiện qua ứng dụng Exxe.
            </p>
            <p className="text-sm md:text-base mb-24">
              9. “Nhà cung cấp” (còn gọi là: “Người Bán” hoặc “Thương nhân” hoặc “Merchant”): là tổ
              chức, cá nhân có nhu cầu bán hàng hóa, dịch vụ của mình cho Khách hàng với một phần
              hoặc toàn bộ quy trình mua bán hàng, cung ứng dịch vụ được thực hiện qua ứng dụng
              Exxe.
            </p>
            <p className="text-sm md:text-base mb-24">
              10. “Tài xế” là cá nhân trực tiếp điều khiển phương tiện để cung cấp dịch vụ vận
              chuyển hành khách hoặc hàng hóa cho Khách hàng kết nối qua ứng dụng Exxe.
            </p>
            <p className="text-sm md:text-base mb-24">
              11. “Đơn vị vận tải” là doanh nghiệp/hợp tác xã kinh doanh dịch vụ vận tải hành khách
              bằng ô tô đáp ứng các quy định của pháp luật hiện hành.
            </p>
            <p className="text-sm md:text-base mb-24">
              12. “Phương tiện” là xe ô tô 4 - 16 chỗ ngồi hoặc xe mô tô, xe gắn máy 02 bánh (tùy
              theo loại hình dịch vụ) của Nhà cung cấp/Tài xế, đáp ứng đủ điều kiện để tham gia lưu
              thông, vận chuyển hành khách/ hàng hóa theo quy định của pháp luật hiện hành và các
              quy định có liên quan của Exxe.
            </p>
            <p className="text-sm md:text-base mb-24">
              13. “Thành viên” là tổ chức, cá nhân đăng ký tài khoản ứng dụng Exxe và được Exxe chấp
              thuận để có thể tiến hành một phần hoặc toàn bộ quy trình mua bán hàng hóa, cung ứng
              dịch vụ qua Sàn TMĐT Exxe, tùy vào từng đối tượng cụ thể mà đăng ký loại tài khoản ứng
              dụng Exxe phù hợp.
            </p>
            <p className="text-sm md:text-base mb-24">
              14. “Sở hữu trí tuệ” là bất kỳ bằng sáng chế, bản quyền, thiết kế đã được đăng ký hoặc
              chưa được đăng ký, quyền đối với thiết kế, nhãn hiệu đã được đăng ký hoặc chưa được
              đăng ký, nhãn hiệu dịch vụ hoặc quyền sở hữu công nghiệp hoặc sở hữu trí tuệ khác của
              Công ty Cổ phần Đầu Tư Công Nghệ và Vận Tải ExxeVn và bao gồm các ứng dụng cho bất kỳ
              mục nào trong những mục trên.
            </p>
          </div>
        </AccordionItem> */}

        <AccordionItem
          allowTransition={false}
          maxHeight={1000000}
          isActive={tabActive === 4}
          onClick={() => setTabActive(tabActive === 4 ? undefined : 4)}
          title="3. Điều khoản sử dụng"
        >
          <div className="">
            <p className="text-sm md:text-base mb-24">
              Chào mừng Quý Khách hàng đến với trang thông tin điện tử{" "}
              <a
                href="https://exxe.vn"
                target="_blank"
                rel="noreferrer noopener"
                className="text-primary"
              >
                https://exxe.vn
              </a>{" "}
              và ứng dụng Exxe của Công ty Cổ phần Đầu Tư Công Nghệ và Vận Tải ExxeVn.
            </p>
            <p className="text-sm md:text-base mb-24">
              Ứng dụng Exxe là ứng dụng trên thiết bị di động cung cấp dịch vụ thương mại điện tử
              (sau đây gọi tắt là: “Sàn VẬN TẢI ĐIỆN TỬ Exxe“) trong ngành giao thông vận tải được
              thiết lập, quản lý và vận hành bởi Công ty Cổ phần Đầu Tư Công Nghệ và Vận Tải ExxeVn
              . Công ty Cổ phần Đầu Tư Công nghệ và Vận Tải ExxeVn(sau đây gọi là “Công ty” hoặc
              “EXXE ”) hoạt động theo Giấy chứng nhận đăng ký doanh nghiệp số 0317412411 do Sở Kế
              hoạch & Đầu tư thành phố Hồ chí Minh cấp lần đầu ngày 01/08/2022 các thay đổi sau đó
              do Sở Kế hoạch & Đầu tư thành phố Hồ Chí Minh cấp.
            </p>
            <p className="text-sm md:text-base mb-24">
              Quý Khách hàng vui lòng đọc kỹ Điều khoản và Điều kiện sử dụng ứng dụng Exxe (“Điều
              khoản sử dụng”) trước khi cài đặt và sử dụng ứng dụng Exxe để đặt mua bất kỳ dịch vụ
              nào thông qua Sàn TMĐT EXXE (sau đây gọi là “Dịch vụ”).
            </p>
            <p className="text-sm md:text-base mb-24">
              Điều khoản sử dụng này là thỏa thuận pháp lý giữa Quý Khách hàng và Công ty khi Quý
              Khách hàng đã lựa chọn sử dụng ứng dụng Exxe và sử dụng Dịch vụ trên Sàn TMĐT Exxe.
              Bằng việc sử dụng Dịch vụ trên ứng dụng Exxe, Quý Khách hàng đồng ý rằng mình đã đọc,
              hiểu rõ, chấp nhận và đồng ý với Điều khoản sử dụng này và với bất kỳ nội dung sửa
              đổi, bổ sung nào của Điều khoản sử dụng này được công bố bởi Exxe tại từng thời điểm
              trên trang thông tin điện tử{" "}
              <a
                href="https://exxe.vn"
                target="_blank"
                rel="noreferrer noopener"
                className="text-primary"
              >
                https://exxe.vn
              </a>{" "}
              và/hoặc trên ứng dụng Exxe.
            </p>
            <p className="text-sm md:text-base mb-24">
              Điều khoản sử dụng này và bất kỳ sửa đổi, bổ sung nào của Điều khoản sử dụng này được
              công bố bởi Exxe tại từng thời điểm tại trang thông tin điện tử
              <a
                href="https://exxe.vn"
                target="_blank"
                rel="noreferrer noopener"
                className="text-primary"
              >
                https://exxe.vn
              </a>{" "}
              và/hoặc trên Ứng dụng Exxe. Exxe bảo lưu quyền được điều chỉnh, sửa đổi, bổ sung hoặc
              hủy bỏ bất kỳ điều khoản nào của Điều khoản sử dụng hoặc các chính sách liên quan đến
              Dịch vụ tại bất cứ thời điểm nào mà Exxe cho là phù hợp.
            </p>
            <p className="text-sm md:text-base mb-24">
              Những điều chỉnh, sửa đổi, bổ sung hoặc hủy bỏ Điều khoản sử dụng hoặc các chính sách
              có liên quan đến Dịch vụ sẽ có hiệu lực ngay khi nội dung được đăng tải trên trang
              thông tin điện tử{" "}
              <a
                href="https://exxe.vn"
                target="_blank"
                rel="noreferrer noopener"
                className="text-primary"
              >
                https://exxe.vn
              </a>{" "}
              và/hoặc thông qua ứng dụng <span className="text-bold">Exxe</span>.
            </p>
            <p className="text-sm md:text-base mb-24">
              Quý Khách hàng có trách nhiệm kiểm tra thường xuyên Điều khoản sử dụng này khi sử dụng
              ứng dụng <span className="font-bold">Exxe</span> và sử dụng Dịch vụ thông qua ứng dụng{" "}
              <span className="font-bold">Exxe</span>. Việc tiếp tục sử dụng ứng dụng{" "}
              <span className="font-bold">Exxe</span> sử dụng Dịch vụ trên Sàn TMĐT{" "}
              <span className="font-bold">Exxe</span> sau khi có bất kỳ thay đổi nào về Điều khoản
              sử dụng, bất kể là Quý Khách hàng có xem xét sự thay đổi của Điều khoản sử dụng hay
              chưa, sẽ mặc nhiên được coi là quý khách đã chấp thuận và đồng ý đối với những nội
              dung thay đổi đó.
            </p>
            <p className="text-sm md:text-base mb-24">
              <span className="font-bold">Exxe</span> là chủ quản lý, vận hành ứng dụng{" "}
              <span className="font-bold">Exxe</span> thực hiện hợp tác kinh doanh với Đối tác đủ
              điều kiện để cung cấp dịch vụ vận tải cho Khách hàng theo quy định của pháp luật hiện
              hành có liên quan của Việt Nam (sau đây gọi là: “Đối tác” hoặc “Nhà cung cấp”).
            </p>
            <p className="text-sm md:text-base mb-24">
              Thời điểm giao dịch giữa Nhà cung cấp với Quý Khách hàng được xác lập thông qua ứng
              dụng Exxe cũng là thời điểm quyền và nghĩa vụ giữa Quý Khách hàng và Nhà cung cấp
              và/hoặc Exxe phát sinh hiệu lực theo quy định pháp luật Việt Nam hoặc theo Điều ước
              quốc tế mà nước Cộng hòa Xã hội Chủ nghĩa Việt Nam là thành viên.
            </p>
            <p className="text-sm md:text-base mb-24">
              Dịch vụ mà Exxe cung cấp là ứng dụng công nghệ kết nối Quý Khách hàng với các Đối tác
              của Exxe nhằm tạo sự thuận lợi của các bên trong quá trình giao dịch. Exxe cam kết hỗ
              trợ Quý Khách hàng hoặc thực hiện cung cấp thông tin liên quan cho cơ quan có thẩm
              quyền để giải quyết những tranh chấp phát sinh trong quá trình Quý Khách hàng sử dụng
              Dịch vụ của Nhà cung cấp kết nối thông qua ứng dụng Exxe.
            </p>
            <p className="text-sm md:text-base mb-24">
              Quy định này sẽ giúp Quý Khách hàng hiểu rõ những thông tin cá nhân nào mà Exxe sẽ thu
              thập, cũng như cách Exxe sử dụng những thông tin này sau đó
            </p>
            <h5 className="text-sm md:text-base font-bold mb-12">Cam kết</h5>
            <p className="text-sm md:text-base mb-24">
              Khi sử dụng Dịch vụ, sử dụng ứng dụng Exxe, Quý Khách hàng cam kết và bảo đảm bảo
              rằng:
            </p>
            <p className="text-sm md:text-base mb-[12px]">
              1. Có năng lực hành vi dân sự đầy đủ theo quy định của pháp luật hiện hành để chấp
              thuận và đồng ý với Điều khoản sử dụng; có quyền, thẩm quyền và năng lực để sử dụng
              Dịch vụ và để tuân theo Điều khoản sử dụng này.
            </p>
            <p className="text-sm md:text-base mb-[12px]">
              2. Những thông tin cung cấp cho Exxe luôn đảm bảo cập nhật, đầy đủ và xác thực.Việc sử
              dụng Dịch vụ, sử dụng ứng dụng Exxe là để phục vụ cho nhu cầu hợp pháp, hợp lệ.Không
              được ủy quyền cho người khác sử dụng danh tính hoặc tư cách người dùng ứng dụng Exxe
              của mình.
            </p>
            <p className="text-sm md:text-base mb-[12px]">
              3. Không được chuyển giao, chuyển nhượng tài khoản người dùng ứng dụng Exxe của mình
              cho bất kỳ cá nhân hoặc tổ chức nào khác.
            </p>
            <p className="text-sm md:text-base mb-[12px]">
              4. Cam kết luôn tuân thủ quy định của pháp luật hiện hành liên quan được áp dụng tại
              quốc gia của mình và tại Việt Nam nơi sử dụng Dịch vụ.
            </p>
            <p className="text-sm md:text-base mb-[12px]">
              5. Có trách nhiệm kiểm tra và đảm bảo rằng Quý Khách hàng đã tải đúng ứng dụng Exxe
              tương thích dành cho thiết bị di động của mình. Exxe không chịu trách nhiệm đối với
              việc Quý Khách hàng không có một thiết bị tương thích với ứng dụng Exxe và/hoặc đã tải
              một phiên bản ứng dụng Exxe không phù hợp, không tương thích dành cho thiết bị di động
              của Quý Khách hàng.
            </p>
            <p className="text-sm md:text-base mb-[12px]">
              6. Công ty bảo lưu quyền không cho phép Quý Khách hàng sử dụng Dịch vụ trong trường
              hợp Quý Khách hàng sử dụng ứng dụng Exxe trên một thiết bị không tương thích, không
              được cho phép hoặc sử dụng ứng dụng Exxe có mục đích khác với mục đích mà ứng dụng
              Exxe có hỗ trợ.
            </p>
            <div className="text-sm md:text-base mb-24">
              Bằng việc sử dụng ứng dụng Exxe, Quý Khách hàng cam kết, đồng ý rằng:
            </div>
            <p className="text-sm md:text-base mb-[12px]">
              1. Không sử dụng ứng dụng Exxe để gửi và lưu trữ bất kỳ tài liệu hoặc thông tin trái
              phép nào hoặc phục vụ các mục đích lừa đảo; để làm phiền, quấy nhiễu người khác hoặc
              thực hiện đặt sử dụng dịch vụ giả mạo; vi phạm điều cấm của pháp luật hiện hành của
              Việt Nam.
            </p>
            <p className="text-sm md:text-base mb-[12px]">
              2. Không liên hệ với Đối tác trên Sàn TMĐT Exxe nhằm mục đích khác ngoài mục đích sử
              dụng Dịch vụ mà ứng dụng Exxe có hỗ trợ.
            </p>
            <p className="text-sm md:text-base mb-[12px]">
              3. Không sử dụng thông tin của Exxe của Nhà cung cấp cho mục đích nào khác ngoài mục
              đích sử dụng Dịch vụ.
            </p>
            <p className="text-sm md:text-base mb-[12px]">
              4. Không thực hiện các hành vi (cố ý hay vô ý) có thể gây tổn hại cho ứng dụng Exxe,
              tổn hại tới uy tín thương hiệu, tài sản của Exxe và/hoặc Nhà cung cấp.
            </p>
            <p className="text-sm md:text-base mb-[12px]">
              5. Không sao chép, bán lại, tặng cho hoặc phân phối ứng dụng Exxe và/hoặc phần mềm hỗ
              trợ liên quan khi không có sự cho phép bằng văn bản của Exxe
            </p>
            <p className="text-sm md:text-base mb-[12px]">
              6. Hoàn toàn chịu trách nhiệm bảo toàn và bảo mật mật khẩu tài khoản sử dụng ứng dụng
              EXXE (Tài khoản Người dùng) của mình hoặc bất kỳ phương thức nhận dạng nào mà Exxe
              cung cấp để Khách hàng sử dụng ứng dụng Exxe.
            </p>
            <p className="text-sm md:text-base mb-[12px]">
              7. Cung cấp cho Exxe bất kỳ bằng chứng về nhận dạng nào mà Exxe có thể yêu cầu vì mục
              đích cung cấp Tài khoản Người dùng, cung cấp Dịch vụ.
            </p>
            <p className="text-sm md:text-base mb-[12px]">
              8. Đồng ý cung cấp thông tin xác thực, thường xuyên duy trì, cập nhật kịp thời và đầy
              đủ thông tin theo yêu cầu của Exxe để sử dụng Dịch vụ để đảm bảo rằng các thông tin
              này luôn xác thực, cập nhật và đầy đủ vào mọi thời điểm. Quý Khách hàng xác nhận rằng
              nếu các thông tin về Quý Khách hàng là không đúng, không chính xác, thiếu cập nhật
              hoặc không đầy đủ trên bất kỳ phương diện nào thì Exxe có quyền chấm dứt việc sử dụng
              Dịch vụ của Quý Khách hàng bất kỳ lúc nào cho dù là có hoặc không thông báo.
            </p>
            <p className="text-sm md:text-base mb-[12px]">
              9. Không thực hiện các hành vi lừa dối Exxe và các hành vi có tính chất tương tự nhằm
              hưởng lợi bất chính trong bất kỳ sự kiện, hoạt động khuyến mại hoặc chiến dịch nào do
              Exxe tiến hành.
            </p>
            <p className="text-sm md:text-base mb-[12px]">
              10. Khi yêu cầu Dịch vụ thông qua ứng dụng Exxe hoặc khi sử dụng Dịch vụ, quý khách
              phải tự chi trả cước viễn thông theo chính sách của nhà cung cấp dịch vụ viễn thông.
            </p>
            <p className="text-sm md:text-base mb-[12px]">
              11. Không được thực hiện các hành vi nhằm phá hoại sự vận hành bình thường của ứng
              dụng Exxe và các hệ thống công nghệ thông tin liên quan của Exxe .
            </p>
            <p className="text-sm md:text-base mb-[12px]">
              12. Việc sử dụng ứng dụng Exxe Dịch vụ và/hoặc các ược tích hợp trên ứng dụng Exxe của
              Quý Khách hàng sẽ phù hợp và tuân theo Chính sách Bảo mật thông tin của Exxe.
            </p>
            <p className="text-sm md:text-base mb-[12px]">
              13. Cam kết hoàn toàn chịu trách nhiệm pháp lý, chịu trách nhiệm đối với toàn bộ tổn
              thất hoặc thiệt hại gây ra cho chính bản thân Quý Khách hàng, Đối tác, Exxe và bất kỳ
              bên thứ ba nào khi Quý Khách hàng vi phạm bất kỳ quy định nào của Điều khoản sử dụng
              này.
            </p>
            <h5 className="text-sm md:text-base font-bold text-primary mb-24">Thanh toán</h5>
            <p className="text-sm md:text-base mb-24 font-bold">1. Định nghĩa</p>
            <p className="text-sm md:text-base mb-24">
              Dịch vụ thanh toán trực tuyến tự động: là việc cấp phép, xử lý dữ liệu và thực hiện
              thanh toán do VCB và NAPAS (đơn vị chấp thuận thanh toán) cung cấp cho Exxe để xử lý
              các giao dịch thanh toán tự động phát sinh khi Khách hàng sử dụng Dịch vụ của Exxe .
              Giao dịch thanh toán trực tuyến tự động/Giao dịch: là giao dịch do Exxe thay mặt Khách
              hàng thực hiện thanh toán hóa đơn hàng hóa, dịch vụ qua kênh thanh toán trực tuyến khi
              phát sinh đối với các hàng hóa, dịch vụ mà Exxe cung cấp cho Khách hàng sử dụng Token
              trên cơ sở ủy quyền của Khách hàng cho Exxe
            </p>
            <h5 className="text-sm md:text-base font-bold mb-12">
              2. Phương thức thực hiện thanh toán
            </h5>
            <p className="text-sm md:text-base mb-[12px]">
              Khi Khách hàng sử dụng dịch vụ vận tải trên Sàn TMĐT Exxevà có sử dụng công cụ thanh
              toán của NAPAS thì Khách hàng mặc nhiên đồng ý ủy quyền, không hủy ngang cho Exxe thay
              mặt Khách hàng thực hiện giao dịch thanh toán trực tuyến tự động qua cổng thanh toán
              của VCB và NAPAS. Nội dung ủy quyền: Khách hàng đồng ý ủy quyền cho Exxe được thay mặt
              Khách hàng thực hiện các nội dung sau:
            </p>
            <p className="text-sm md:text-base mb-[12px]">
              – Thực hiện giao dịch thanh toán trực tuyến tự động đối với các dịch vụ vận tải mà
              Exxe cung cấp cho Khách hàng.
            </p>
            <p className="text-sm md:text-base mb-[12px]">
              – Điều kiện thanh toán: thanh toán khi phát sinh Dịch vụ.
            </p>
            <p className="text-sm md:text-base mb-[12px]">
              – Thời gian thanh toán tự động: cố định, hoặc không cố định.
            </p>
            <p className="text-sm md:text-base mb-[12px]">
              – Giá trị thanh toán: cố định hoặc không cố định.
            </p>
            <p className="text-sm md:text-base mb-[12px]">– Phương tiện thanh toán: Token.</p>
            <p className="text-sm md:text-base mb-[12px]">
              – Hàng hóa dịch vụ được thanh toán tự động: dịch vụ vận tải.Khi chấp thuận ủy quyền
              cho Exxe thì Khách hàng mặc nhiên đồng ý cho VCB và NAPAS có quyền lưu trữ các thông
              tin Khách hàng (bao gồm nhưng không giới hạn các thông tin về phương tiện thanh toán,
              giao dịch, …) để phục vụ cho việc triển khai dịch vụ. Nếu Khách hàng không đồng ý ủy
              quyền cho Exxe theo quy định tại mục này thì quý Khách hàng có thể sử dụng phương thức
              thanh toán khác. Thuế
            </p>
            <p className="text-sm md:text-base mb-[12px]">
              Là người sử dụng Dịch vụ thông qua ứng dụng Exxe, Quý Khách hàng đồng ý rằng, nghĩa vụ
              thuế của Exxe, của Đối tác cung ứng dịch vụ vận tải là độc lập. Mỗi bên có nghĩa vụ kê
              khai và thực hiện nghĩa vụ thuế của mình đối với nhà nước theo pháp luật thuế nước
              Cộng hòa Xã hội Chủ nghĩa Việt Nam.
            </p>
            <h5 className="text-sm md:text-base font-bold mb-12">Li-xăng và quyền</h5>
            <p className="text-sm md:text-base mb-24">
              Exxe và các bên cấp li-xăng cho Exxe (nếu có), khi được áp dụng, sẽ cấp cho Khách hàng
              li-xăng có thể hủy ngang, không độc quyền, không thể chuyển nhượng, mang tính cá nhân
              có giới hạn trong việc sử dụng ưng dụng Exxe vì mục đích sử dụng Dịch vụ trên cơ sở
              Điều khoản sử dụng này. Tất cả các quyền không cấp cho Khách hàng một cách cụ thể sẽ
              được bảo lưu bởi Exxe và các bên cấp li-xăng cho Exxe.
            </p>
            <p className="text-sm md:text-base mb-24">Khách hàng không được:</p>
            <p className="text-sm md:text-base mb-12">
              – Cấp li-xăng, cấp lại li-xăng, bán, bán lại, chuyển giao, chuyển nhượng, phân phối
              hoặc khai thác thương mại hoặc cung cấp cho bất kỳ bên thứ ba nào đối với ứng dụng
              Exxe dưới bất kỳ hình thức nào.
            </p>
            <p className="text-sm md:text-base mb-12">
              – Sửa đổi hoặc tạo ra sản phẩm phái sinh từ ứng dụng Exxe và/hoặc phần mềm liên quan.
            </p>
            <p className="text-sm md:text-base mb-12">
              – Tạo ra các “đường dẫn” Internet liên kết đến ứng dụng Exxe hoặc “làm nền tảng cho”
              hay “nhân bản” bất kỳ phần mềm nào trên bất kỳ máy chủ hay thiết bị hoạt động trên môi
              trường mạng Internet nào khác.
            </p>
            <p className="text-sm md:text-base mb-12">
              – Đảo ngược thiết kế hoặc truy cập vào ứng dụng Exxe để:
            </p>
            <p className="text-sm md:text-base mb-24">
              + Xây dựng một sản phẩm hoặc Dịch vụ cạnh tranh với Exxe
            </p>
            <p className="text-sm md:text-base mb-24">
              + Xây dựng một sản phẩm sử dụng những ý tưởng, tính năng, chức năng hoặc đồ họa tương
              tự như của ứng dụng Exxe hoặc
            </p>
            <p className="text-sm md:text-base mb-24">
              + Sao chép bất kỳ ý tưởng, tính năng, chức năng hoặc đồ họa nào của ứng dụng Exxe.
            </p>
            <p className="text-sm md:text-base mb-24">
              • – Khởi động một chương trình hoặc tập lệnh tự động, bao gồm nhưng không giới hạn,
              nhện web, trình thu thập web, robot web, kiến web, trình tạo chỉ mục web, chương trình
              tự động, virus, hoặc bất kỳ chương trình nào có thể đưa ra nhiều yêu cầu đối với máy
              chủ của Exxe làm chậm hoặc cản trở hoạt động và/hoặc hiệu suất của ứng dụng Exxe.
            </p>
            <p className="text-sm md:text-base mb-24">
              • – Đăng tải, phân phối hoặc sao chép bằng bất kỳ phương cách nào đối với bất kỳ tài
              liệu có bản quyền nào, tên thương mại, hay các thông tin sở hữu khác của Exxe mà không
              có sự chấp thuận của Exxe.
            </p>
            <p className="text-sm md:text-base mb-24">
              • – Gỡ bỏ bất kỳ thông báo về bản quyền, tên thương mại, hay các quyền sở hữu khác
              trên trang thông tin điện tử, trên ứng dụng Exxe
            </p>
            <p className="text-sm md:text-base mb-24">
              • – Khởi động một chương trình hoặc tập lệnh tự động, bao gồm nhưng không giới hạn,
              nhện web, trình thu thập web, robot web, kiến web, trình tạo chỉ mục web, chương trình
              tự động, virus, hoặc bất kỳ chương trình nào có thể đưa ra nhiều yêu cầu đối với máy
              chủ của Exxe làm chậm hoặc cản trở hoạt động và/hoặc hiệu suất của ứng dụng Exxe. • –
              Đăng tải, phân phối hoặc sao chép bằng bất kỳ phương cách nào đối với bất kỳ tài liệu
              có bản quyền nào, tên thương mại, hay các thông tin sở hữu khác của Exxe mà không có
              sự chấp thuận của Exxe. • – Gỡ bỏ bất kỳ thông báo về bản quyền, tên thương mại, hay
              các quyền sở hữu khác trên trang thông tin điện tử, trên ứng dụng Exxe
            </p>
            <p className="text-sm md:text-base mb-12">
              – Gửi thư rác hoặc tin nhắn đồng loạt hoặc tin nhắn tự động.
            </p>
            <p className="text-sm md:text-base mb-12">
              – Gửi hoặc lưu trữ tài liệu xâm phạm uy tín, danh dự của cá nhân, tổ chức khác.
            </p>
            <p className="text-sm md:text-base mb-12">
              – Gửi hoặc lưu trữ tài liệu khiêu dâm, đe dọa, bôi nhọ, bao gồm, nhưng không giới hạn,
              các tài liệu có hại cho trẻ em hoặc vi phạm quyền riêng tư của bên thứ ba.
            </p>
            <p className="text-sm md:text-base mb-12">
              – Gửi tài liệu có chứa virus phần mềm, Trojan hoặc đoạn mã, các tập tin, tập lệnh,
              gián điệp hoặc chương trình máy tính độc hại.
            </p>
            <p className="text-sm md:text-base mb-12">
              – Gây cản trở hoặc phá vỡ tính toàn vẹn hoặc hiệu suất của ứng dụng Exxehoặc dữ liệu
              chứa trong đó; hoặc cố gắng truy cập trái phép vào ứng dụng Exxe và/hoặc Phần mềm;
              hoặc
            </p>
            <p className="text-sm md:text-base mb-12">
              – Giả danh bất kỳ cá nhân hoặc tổ chức nào hoặc mô tả sai mối quan hệ của Khách hàng
              với một cá nhân hoặc tổ chức để trốn tránh nghĩa vụ hoặc thực hiện các hành vi có thể
              làm tổn hại quyền và lợi ích hợp pháp của Exxe và hoặc bên thứ ba.
            </p>
            <p className="text-sm md:text-base font-bold mb-12">Sở hữu trí tuệ</p>
            <p className="text-sm md:text-base mb-12">
              Chỉ có Exxe và các bên cấp li-xăng cho Exxe (nếu có) có quyền sở hữu trí tuệ, quyền
              liên quan đối với ứng dụng Exxe và/hoặc phần mềm hỗ trợ khác của ứng dụng Exxe.
            </p>
            <p className="text-sm md:text-base mb-12">
              Nội dung của Điều khoản sử dụng này không tạo nên một thỏa thuận mua bán, chuyển
              nhượng/chuyển giao cho Khách hàng bất kỳ quyền sở hữu nào đối với hoặc liên quan đến
              ứng dụng Exxe và/hoặc phần mềm hỗ trợ khác hoặc bất kỳ quyền sở hữu tài sản trí tuệ
              nào thuộc sở hữu của Exxe.
            </p>
            <p className="text-sm md:text-base mb-12">
              Nội dung của Điều khoản sử dụng này không tạo nên một thỏa thuận mua bán, chuyển
              nhượng/chuyển giao cho Khách hàng bất kỳ quyền sở hữu nào đối với thương hiệu của Công
              ty, logo của Công ty, logo của Dịch vụ, logo ứng dụng Exxevà logo của Nhà cung cấp.
            </p>
            <p className="text-sm md:text-base font-bold mb-12">Bảo mật</p>
            <p className="text-sm md:text-base mb-24">
              Là người sử dụng ứng dụng Exxe, Khách hàng phải bảo mật tất cả các thông tin và dữ
              liệu liên quan đến Công ty, các dịch vụ, sản phẩm, công việc kinh doanh, kế hoạch tiếp
              thị và quảng bá hoặc các hoạt động khác của Công ty và các công ty liên kết của Công
              ty, cũng như các thông tin liên quan đến Đối tác cung cấp Dịch vụ thứ ba hoặc dịch vụ
              của bên thứ ba mà đã được tiết lộ với Khách hàng bởi Công ty hoặc đại diện của Công ty
              (bất kể bằng lời nói hay bằng văn bản, trước, tại hoặc sau ngày của Điều khoản sử dụng
              này) hoặc đã được Khách hàng thu thập gián tiếp hay trực tiếp, từ Công ty hoặc bất kỳ
              các công ty liên kết nào khác, hoặc đã được tạo ra trong quá trình giao kết Điều khoản
              sử dụng này.
            </p>
            <p className="text-sm md:text-base mb-24">
              Nghĩa vụ bảo mật nêu trên không áp dụng trong trường hợp sau:
            </p>
            <p className="text-sm md:text-base mb-24">
              • Đã thuộc sở hữu của Khách hàng vào thời điểm tiếp nhận thông tin.
            </p>
            <p className="text-sm md:text-base mb-24">
              • Là, hoặc trở thành trong tương lai, thông tin phổ cập mà không phải do lỗi hoặc sai
              sót của chính Khách hàng.
            </p>
            <p className="text-sm md:text-base mb-24">
              Đã được tiếp nhận từ một bên thứ ba có quyền tiết lộ chúng; hoặc phải tiết lộ theo quy
              định pháp luật.
            </p>
            <p className="text-sm md:text-base font-bold mb-12">Phí</p>
            <p className="text-sm md:text-base mb-24">
              Khách hàng sẽ chịu trách nhiệm đối với các chi phí sửa chữa hoặc chi phí vệ sinh làm
              sạch cho Phương tiện vận tải của Công ty, của Nhà cung cấp (Đơn vị vận tải, Lái xe)
              khi Khách hàng sử dụng Dịch vụ một cách không phù hợp hoặc vi phạm các quy định trong
              Điều khoản sử dụng này. Công ty bảo lưu quyền thu các chi phí hợp lý của việc sửa chữa
              hoặc chi phí vệ sinh làm sạch Phương tiện này; có thể thay mặt cho Nhà cung cấp thông
              qua các phương thức thanh toán mà Khách hàng chỉ định hoặc yêu cầu Khách hàng phải
              thanh toán tiền mặt trong trường hợp yêu cầu sửa chữa hoặc vệ sinh Phương tiện của Nhà
              cung cấp đã được xác thực bởi Công ty.
            </p>
            <p className="text-sm md:text-base mb-24">
              Công ty được quyền thu phí sử dụng ứng dụng <span className="font-bold">Exxe</span> từ
              Khách hàng là người sử dụng ứng dụng <span className="font-bold">Exxe</span> và/hoặc
              phần mềm hỗ trợ khác để đặt dịch vụ vận tải. Chính sách về phí sử dụng dịch vụ (nếu có
              áp dụng) có thể được miễn, giảm hoặc thay đổi tùy từng giai đoạn, có thể được công
              khai tại trang thông tin điện tử của Công ty và/hoặc thông qua ứng dụng{" "}
              <span className="font-bold">Exxe</span>.
            </p>
            <p className="text-sm md:text-base font-bold mb-12">Miễn trừ trách nhiệm</p>
            <p className="text-sm md:text-base mb-24">
              Công ty không đưa ra bất kỳ cam đoan, bảo đảm hoặc phát sinh bất kỳ một trách nhiệm
              nào đối với độ tin cậy, sự đúng hạn, kịp thời, chất lượng, sự phù hợp, tính sẵn có,
              tính chính xác hoặc hoàn thiện của Dịch vụ cung cấp trên Sàn TMĐT Exxe, và/hoặc về chế
              độ ưu đãi/quà tặng. Công ty không bảo đảm chắc chắn rằng:
            </p>
            <p className="text-sm md:text-base mb-12">
              • Ứng dụng Exxe, phần mềm hỗ trợ liên quan sẽ hoàn toàn không có lỗi hoặc khiếm
              khuyết.
            </p>
            <p className="text-sm md:text-base mb-12">
              • Chất lượng của bất kỳ sản phẩm, dịch vụ, thông tin, quà tặng, ưu đãi mà Khách hàng
              mua hoặc có được thông qua ứng dụng Exxe sẽ đáp ứng hoàn toàn các yêu cầu hoặc mong
              đợi của Khách hàng.
            </p>
            <p className="text-sm md:text-base mb-12">
              • Dịch vụ, ứng dụng Exxe sẽ hoàn toàn đạt yêu cầu hoặc mong đợi của Khách hàng.
            </p>
            <p className="text-sm md:text-base mb-12">
              • Ứng dụng Exxe và/hoặc (các) máy chủ mà ứng dụng Exxehoạt động sẽ không có virus hoặc
              các thành phần có hại khác.
            </p>
            <p className="text-sm md:text-base mb-24">
              • Việc sử dụng Dịch vụ trên Sàn TMĐT Exxe, ứng dụng Exxevà/hoặc phần mềm hỗ trợ khác
              sẽ được an toàn, kịp thời, không bị gián đoạn hoặc không có lỗi hoặc có thể vận hành
              kết hợp với bất kỳ phần cứng, phần mềm, hệ thống hoặc dữ liệu nào khác.
            </p>
            <p className="text-sm md:text-base mb-24">
              Công ty sẽ được miễn trừ trách nhiệm trong các trường hợp sau: Các tổn thất có thể gây
              ra cho Khách hàng do không thể truy cập, sử dụng ứng dụng Exxevì các lý do: Không thể
              truy cập, sử dụng ứng dụng vì lý do lỗi kết nối mạng Internet. Lỗi phần cứng hoặc phần
              mềm ngoài tầm kiểm soát của Công ty. Các tổn thất do lỗi mạng Internet, lỗi máy móc,
              hay lỗi khi bảo trì hệ thống. Khách hàng thừa nhận và đồng ý rằng toàn bộ rủi ro phát
              sinh từ việc sử dụng dịch vụ, ưu đãi và bất kỳ dịch vụ của bên thứ ba nào, bao gồm,
              nhưng không giới hạn, các dịch vụ vận tải và/hoặc ưu đãi của bên thứ ba là hoàn toàn
              thuộc về chính Khách hàng và Khách hàng sẽ không kiện đòi Công ty dưới bất kỳ hình
              thức nào.
            </p>
            <p className="text-sm md:text-base font-bold mb-12">Lỗi Internet</p>
            <p className="text-sm md:text-base mb-24">
              Dịch vụ được cung cấp trên Sàn TMĐT <span className="font-bold">Exxe</span>, ứng dụng{" "}
              <span className="font-bold">Exxe</span> có thể có những hạn chế, chậm trễ, và các vấn
              đề khác xuất phát từ việc sử dụng internet và thông tin liên lạc theo phương thức điện
              tử bao gồm việc thiết bị bạn sử dụng hoặc nhà cung cấp dịch vụ bên thứ ba sử dụng bị
              lỗi, không có kết nối, nằm ngoài miền phủ sóng, bị tắt nguồn hoặc không hoạt động.
              Công ty sẽ được miễn trừ hoàn toàn trách nhiệm đối với các thiệt hại hay tổn thất phát
              sinh từ những vấn đề này.
            </p>
            <p className="text-sm md:text-base font-bold mb-12">Giới hạn</p>
            <p className="text-sm md:text-base mb-24">
              Bất kỳ yêu cầu bồi thường nào của Khách hàng đối với Công ty trong bất kỳ trường hợp
              nào sẽ chỉ giới hạn đối với tổng của tất cả các khoản đã được Khách hàng chi trả
              và/hoặc Khách hàng sẽ trả cho việc sử dụng Dịch vụ giới hạn trong sự kiện dẫn tới các
              yêu cầu bồi thường đó.
            </p>
            <p className="text-sm md:text-base font-bold mb-12">Thông báo</p>
            <p className="text-sm md:text-base mb-24">
              Công ty có thể gửi thông báo dưới dạng một thông báo chung trên trang thông tin điện
              tử, trên ứng dụng Exxe, qua thư điện tử đến địa chỉ thư điện tử của Khách hàng có
              trong hồ sơ của Công ty, hoặc bằng văn bản gửi bằng thư đảm bảo hoặc thư trả trước đến
              địa chỉ của Khách hàng lưu trong dữ liệu của Công ty.
            </p>
            <p className="text-sm md:text-base mb-24">
              Thông báo của Công ty sẽ được coi là đã gửi tới Khách hàng sau 48 giờ kể từ lúc gửi
              bưu điện (nếu được gửi bằng thư bảo đảm hoặc thư trả trước) hoặc sau 01 giờ sau khi đã
              gửi (nếu gửi bằng thư điện tử).
            </p>
            <p className="text-sm md:text-base mb-24">
              Khách có thể gửi thông báo cho Công ty bằng thư gửi qua đường bưu điện hoặc thư bảo
              đảm tới địa chỉ Công ty theo thông tin liên hệ như được cung cấp trên website hoặc ứng
              dụng Exxe. Thời điểm thông báo này có hiệu lực là kể từ thời điểm Công ty nhận được
              thông báo.
            </p>
            <p className="text-sm md:text-base font-bold mb-12">Chuyển giao</p>
            <p className="text-sm md:text-base mb-24">
              Khách hàng không được chuyển giao quyền, nghĩa vụ của mình phát sinh theo Điều khoản
              sử dụng này nếu không có sự chấp thuận trước bằng văn bản của Công ty. Bất kỳ hành
              động cố ý chuyển giao quyền, nghĩa vụ của mình phát sinh theo Điều khoản sử dụng này
              của Khách hàng vi phạm mục này sẽ bị coi là vô hiệu. Công ty có thể chuyển giao quyền,
              nghĩa vụ của mình phát sinh theo Điều khoản sử dụng này mà không cần sự chấp thuận của
              Khách hàng.
            </p>
            <p className="text-sm md:text-base font-bold mb-12">Hiệu lực</p>
            <p className="text-sm md:text-base mb-24">
              Bản Điều khoản sử dụng này được diễn giải và chịu điều chỉnh bởi pháp luật Việt Nam.
            </p>
            <p className="text-sm md:text-base mb-24">
              Bất kỳ tranh chấp, hành động, khiếu nại hay lý do khởi kiện xuất phát từ hay liên quan
              đến Điều khoản sử dụng hoặc Dịch vụ sẽ hoàn toàn thuộc quyền xét xử của tòa án có thẩm
              quyền của Việt Nam.
            </p>
            <p className="text-sm md:text-base mb-24">
              Trong trường hợp phán quyết của Tòa án có thẩm quyền của Việt Nam không thể được thi
              hành tại Quốc gia Thay thế, các tranh chấp chưa được giải quyết sẽ được chuyển tới
              Trung tâm Trọng tài Quốc tế Việt Nam (“VIAC”), phù hợp với các Nguyên tắc Tố tụng
              Trọng tài của VIAC được sửa đổi, bổ sung tại từng thời điểm (“Các Nguyên tắc Tố tụng
              Trọng tài”) bởi một trọng tài do Các Bên cùng thống nhất chỉ định (“Trọng tài”). Nếu
              Các Bên không thể thống nhất về một trọng tài, Chủ tịch của VIAC sẽ chỉ định Trọng tài
              theo đúng Các Nguyên tắc Tố tụng Trọng tài. Địa điểm tố tụng trọng tài là Việt Nam,
              ngôn ngữ trọng tài bằng tiếng Việt và phí Trọng tài sẽ được chia đều cho Các Bên, trừ
              khi Trọng tài yêu cầu phí này được chi trả theo cách khác mà Trọng tài xác định là cần
              thiết để điều khoản trọng tài này có thể được thi hành theo pháp luật áp dụng.
            </p>
            <p className="text-sm md:text-base mb-24">
              Không có bất kỳ quan hệ liên doanh, hợp tác, thỏa thuận lao động, hay quan hệ đại lý
              nào tồn tại giữa Khách hàng với Công ty hay bất kỳ bên cung cấp thứ ba nào được xác
              lập từ Điều khoản sử dụng này hay từ việc sử dụng Dịch vụ trừ trường hợp các bên có
              thỏa thuận khác bằng văn bản.
            </p>
            <p className="text-sm md:text-base mb-24">
              Nếu bất kỳ nội dung nào của Điều khoản sử dụng này bị coi là không hợp lệ hoặc không
              thể thi hành, thì điều khoản đó sẽ bị xóa bỏ và các điều khoản còn lại sẽ được thi
              hành đến mức tối đa theo luật pháp; những nội dung chưa được quy định tại Điều khoản
              sử dụng này thì áp dụng theo quy định pháp luật hiện hành của Nước Cộng hòa Xã hội Chủ
              nghĩa Việt Nam.
            </p>
            <p className="text-sm md:text-base">
              Khách hàng chấp thuận rằng Công ty có quyền (nhưng không có nghĩa vụ) chấm dứt cung
              cấp Dịch vụ ngay lập tức trong trường hợp Khách hàng bị phát hiện đã vi phạm bất kỳ
              nội dung nào của Điều khoản sử dụng này. Công ty sẽ không phải bồi thường, bồi hoàn
              hoặc chi trả bất kỳ phí tổn nào mà Khách hàng phải chịu do việc chấm dứt cung cấp Dịch
              vụ này.
            </p>
          </div>
        </AccordionItem>
      </div>
    </StaticLayout>
  )
}

export default Conditions
