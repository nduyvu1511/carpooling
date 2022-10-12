import { Seo } from "@/components"
import { ADDRESS, EMAIL, PHONE } from "@/helper"
import { StaticLayout } from "@/layout"

export const Regulations = () => {
  return (
    <StaticLayout heading="Quy chế hoạt động">
      <Seo title="Quy chế hoạt động" url="regulations" />
      <div className="">
        <p className="text-base md:text-xl font-semibold text-center my-[40px]">
          CÁC QUY ĐỊNH VỀ AN TOÀN THÔNG TIN, CƠ CHẾ KIỂM TRA, GIÁM SÁT ĐỂ ĐẢM BẢO VIỆC CUNG CẤP
          THÔNG TIN VÀ QUẢN LÝ THÔNG TIN TRÊN SÀN GIAO DỊCH THƯƠNG MẠI ĐIỆN TỬ
        </p>
        {/* <p className="text-lg text-primary mb-24">
          Bảo vệ thông tin cá nhân Khách hàng thuê xe
        </p> */}
        <p className="text-lg text-primary mb-24">1. Mục đích sử dụng thông tin</p>
        <ul className="mb-24">
          <li className="text-sm md:text-base mb-12">
            -Thông tin cá nhân của Khách hàng chỉ được dùng trong những mục đích sau đây:
          </li>
          <li className="text-sm md:text-base mb-12">
            -Hỗ trợ việc đặt xe và cung cấp xe cho Khách hàng;
          </li>
          <li className="text-sm md:text-base mb-12">
            -Liên lạc với Khách hàng cho mục đích tiếp thị của Công ty;
          </li>
          <li className="text-sm md:text-base mb-12">
            -Nâng cao chất lượng dịch vụ và hỗ trợ Khách hàng;
          </li>
          <li className="text-sm md:text-base mb-12">
            -Giải quyết các sự vụ và tranh chấp phát sinh liên quan đến việc sử dụng dịch vụ trên
            dịch vụ vận tải;
          </li>
          <li className="text-sm md:text-base mb-12">
            -Cung cấp thông tin cho các Cơ quan thực thi Pháp luật theo yêu cầu;
          </li>
          <li className="text-sm md:text-base mb-12">
            -Khi khách hàng đăng ký tài khoản Exxe.vn, thông tin cá nhân mà chúng tôi thu thập bao
            gồm:
          </li>
          <p className="text-sm md:text-base ml-12 mb-12 font-semibold">
            + Tên đăng kí, số điện thoại
          </p>
          <p className="text-sm md:text-base ml-12 font-semibold">+ Email</p>
        </ul>
        <p className="text-lg text-primary mb-24">2. Phạm vi sử dụng thông tin</p>
        <ul className="pl-12 list-disc mb-24">
          <li className="mb-12 text-sm md:text-base">
            Công ty sử dụng thông tin Khách hàng cung cấp để:
          </li>
          <li className="mb-12 text-sm md:text-base">
            Gửi các thông báo về các hoạt động trao đổi thông tin giữa Khách hàng và Công ty;
          </li>
          <li className="mb-12 text-sm md:text-base">
            Ngăn ngừa các hoạt động phá hủy tài khoản người dùng của Khách hàng hoặc các hoạt động
            giả mạo Khách hàng;
          </li>
          <li className="mb-12 text-sm md:text-base">
            Liên lạc và giải quyết với Khách hàng trong những trường hợp đặc biệt;
          </li>
          <li className="mb-12 text-sm md:text-base">
            Không sử dụng thông tin cá nhân của Khách hàng ngoài mục đích xác nhận và liên hệ có
            liên quan đến đặt xe và cung cấp xe.
          </li>
          <li className="mb-12 text-sm md:text-base">
            Trong trường hợp có yêu cầu của Pháp luật: Công ty có trách nhiệm hợp tác cung cấp thông
            tin cá nhân của Khách hàng khi có yêu cầu từ Cơ quan Tư pháp bao gồm: Viện kiểm sát, Tòa
            án, Cơ quan Công an điều tra liên quan đến hành vi vi phạm pháp luật nào đó của Khách
            hàng. Ngoài ra, không ai có quyền xâm phạm vào thông tin cá nhân của Khách hàng.
          </li>
        </ul>
        <p className="text-lg text-primary mb-24">3. Thời gian lưu trữ thông tin</p>
        <p className="text-sm md:text-base mb-24">
          Dữ liệu cá nhân của Khách hàng sẽ được lưu trữ cho đến khi có yêu cầu hủy bỏ hoặc tự Khách
          hàng đăng nhập và thực hiện hủy bỏ. Còn lại trong mọi trường hợp thông tin cá nhân của
          Khách hàng sẽ được bảo mật trên máy chủ của Công ty.
        </p>
        <p className="text-lg text-primary mb-24">
          4. Những người hoặc tổ chức có thể được tiếp cận với thông tin
        </p>
        <p className="text-sm md:text-base mb-24">
          Chỉ Công ty mới có quyền tiếp cận thông tin Khách hàng, hoặc Cơ quan Nhà nước có thẩm
          quyền khi được yêu cầu cung cấp thông tin.
        </p>
        <p className="text-lg text-primary mb-24">
          5. Địa chỉ của đơn vị thu thập và quản lý thông tin cá nhân
        </p>
        <ul className="mb-24">
          <li className="text-sm md:text-base mb-12">Công ty Cổ phần Đầu tư và Công Nghệ ExxeVn</li>
          <li className="text-sm md:text-base mb-12">Trụ sở chính: {ADDRESS}, Việt Nam.</li>
          <li className="text-sm md:text-base mb-12">Số điện thoại: {PHONE}</li>
          <li className="text-sm md:text-base">Email: {EMAIL}</li>
        </ul>
        <p className="text-base md:text-xl font-semibold text-center my-[40px]">
          CHÍNH SÁCH BẢO VỆ THÔNG TIN CÁ NHÂN CỦA NGƯỜI SỬ DỤNG DỊCH VỤ SÀN GIAO DỊCH THƯƠNG MẠI
          ĐIỆN TỬ THEO QUY ĐỊNH TẠI ĐIỀU 69 NGHỊ ĐỊNH NÀY;
        </p>
        <p className="text-sm md:text-base font-semibold mb-24">
          Bảo vệ thông tin cá nhân Khách hàng thuê xe:
        </p>
        <p className="text-sm md:text-base font-semibold mb-24">1. Mục đích sử dụng thông tin</p>
        <p className="text-sm md:text-base font-semibold mb-24">
          Thông tin cá nhân của Khách hàng chỉ được dùng trong những mục đích sau đây
        </p>
        <p className="text-sm md:text-base mb-12">
          - Hỗ trợ việc đặt xe và cung cấp xe cho Khách hàng;
        </p>
        <p className="text-sm md:text-base mb-12">
          - Liên lạc với Khách hàng trong cho mục đích tiếp thị của Công ty;
        </p>
        <p className="text-sm md:text-base mb-12">
          - Nâng cao chất lượng dịch vụ và hỗ trợ Khách hàng;
        </p>
        <p className="text-sm md:text-base mb-12">
          - Giải quyết các sự vụ và tranh chấp phát sinh liên quan đến việc sử dụng dịch vụ trên
          dịch vụ vận tải.
        </p>
        <p className="text-sm md:text-base mb-12">
          - Cung cấp thông tin cho các Cơ quan thực thi Pháp luật theo yêu cầu;
        </p>
        <p className="text-sm md:text-base mb-12">
          - Khi khách hàng đăng ký tài khoản Exxe.vn, thông tin cá nhân mà chúng tôi thu thập bao
          gồm:
        </p>
        <p className="text-sm md:text-base ml-[40px]">+ Tên đăng kí, số điện thoại</p>
        <p className="text-sm md:text-base ml-[40px]">+ Email</p>
        <p className="text-sm md:text-base font-semibold mb-24">2. Phạm vi sử dụng thông tin</p>
        <p className="text-sm md:text-base mb-12">
          - Công ty sử dụng thông tin Khách hàng cung cấp để:
        </p>
        <p className="text-sm md:text-base mb-12">
          - Gửi các thông báo về các hoạt động trao đổi thông tin giữa Khách hàng và Công ty;
        </p>
        <p className="text-sm md:text-base mb-12">
          - Ngăn ngừa các hoạt động phá hủy tài khoản người dùng của Khách hàng hoặc các hoạt động
          giả mạo Khách hàng;
        </p>
        <p className="text-sm md:text-base mb-12">
          - Liên lạc và giải quyết với Khách hàng trong những trường hợp đặc biệt;
        </p>
        <p className="text-sm md:text-base mb-12">
          - Không sử dụng thông tin cá nhân của Khách hàng ngoài mục đích xác nhận và liên hệ có
          liên quan đến đặt xe và cung cấp xe.
        </p>
        <p className="text-sm md:text-base mb-24">
          - Trong trường hợp có yêu cầu của Pháp luật: Công ty có trách nhiệm hợp tác cung cấp thông
          tin cá nhân của Khách hàng khi có yêu cầu từ Cơ quan Tư pháp bao gồm: Viện kiểm sát, Tòa
          án, Cơ quan - - Công an điều tra liên quan đến hành vi vi phạm pháp luật nào đó của Khách
          hàng. Ngoài ra, không ai có quyền xâm phạm vào thông tin cá nhân của Khách hàng.
        </p>
        <p className="text-sm md:text-base mb-24 font-semibold">3. Thời gian lưu trữ thông tin</p>
        <p className="text-sm md:text-base mb-12">
          - Dữ liệu cá nhân của Khách hàng sẽ được lưu trữ cho đến khi có yêu cầu hủy bỏ hoặc tự
          Khách hàng đăng nhập và thực hiện hủy bỏ. Còn lại trong mọi trường hợp thông tin cá nhân
          của Khách hàng sẽ được bảo mật trên máy chủ của Công ty.
        </p>
        <p className="text-sm md:text-base mb-24 font-semibold">
          4. Những người hoặc tổ chức có thể được tiếp cận với thông tin
        </p>
        <p className="text-sm md:text-base mb-12">
          - Chỉ Công ty mới có quyền tiếp cận thông tin Khách hàng, hoặc Cơ quan Nhà nước có thẩm
          quyền khi được yêu cầu cung cấp thông tin.
        </p>
        <p className="text-sm md:text-base mb-24 font-semibold">
          5. Địa chỉ của đơn vị thu thập và quản lý thông tin cá nhân
        </p>
        <p className="text-sm md:text-base mb-12">
          - Công ty Cổ Phần Đầu Tư Công Nghệ và Vận Tải ExxeVn
        </p>
        <p className="text-sm md:text-base mb-12">- Trụ sở chính: {ADDRESS}</p>
        <p className="text-sm md:text-base mb-12">- Số điện thoại: {PHONE}</p>
        <p className="text-sm md:text-base mb-12">- Email: {EMAIL}</p>

        <h3 className="text-base md:text-xl font-semibold text-center my-[40px]">
          CƠ CHẾ GIẢI QUYẾT KHIẾU NẠI, TRANH CHẤP GIỮA CÁC BÊN LIÊN QUAN ĐẾN GIAO DỊCH TIẾN HÀNH
          TRÊN SÀN GIAO DỊCH THƯƠNG MẠI ĐIỆN TỬ{" "}
        </h3>

        <p className="text-sm md:text-base mb-24">
          Công ty và Tài xế có trách nhiệm tiếp nhận các khiếu nại và hỗ trợ Khách hàng liên quan
          đến các giao dịch được kết nối thông qua dịch vụ vận tải . Các khiếu nại liên quan đến
          việc cung cấp, sử dụng dịch vụ đặt chuyến trên dịch vụ vận tải do Công ty chịu trách nhiệm
          độc lập giải quyết trên cơ sở quy định của pháp luật, Điều khoản và Điều kiện sử dụng dịch
          vụ, các thông báo, quy chế đã công bố với Thành viên (Khách hàng và Tài Xế). Khi phát sinh
          tranh chấp, Công ty đề cao giải pháp thương lượng, hòa giải giữa các
        </p>
        <p className="text-sm md:text-base mb-24">
          bên nhằm duy trì sự tin cậy của Thành viên vào chất lượng dịch vụ của dịch vụ vận tải .
          Khách hàng có thể thực hiện theo các bước sau:
        </p>

        <ul>
          <li className="text-sm md:text-base mb-24">
            •<span className="font-semibold">Bước 1:</span> Khách hàng khiếu nại về dịch vụ qua số
            điện thoại <span className="font-semibold">{PHONE}</span> hoặc gửi email cho Bộ phận
            Chăm sóc Khách hàng tại địa chỉ Email: <span className="font-semibold">{EMAIL}</span>.
            Thời gian để Công ty tiếp nhận khiếu nại là 2 ngày kể từ ngày sử dụng dịch vụ hoặc từ
            ngày phát sinh sự việc.
          </li>
          <li className="text-sm md:text-base mb-24">
            •<span className="font-semibold">Bước 2:</span> Trong thời hạn hai (2) ngày làm việc kể
            từ khi tiếp nhận thông tin khiếu nại của Khách hàng, Bộ phận Chăm sóc Khách hàng xác
            nhận thông tin khiếu nại, tiến hành phân loại thông tin và thông báo cho Khách hàng:
          </li>

          <p className="ml-[40px] text-sm md:text-base font-semibold mb-12">
            2a. Ghi nhận các yêu cầu và các khiếu nại có liên quan đến Công ty và trong thời hạn
            khiếu nại.
          </p>
          <p className="ml-[40px] text-sm md:text-base font-semibold mb-24">
            2b. Từ chối các yêu cầu, các khiếu nại không có liên quan đến Công ty và hết thời hạn
            khiếu nại.
          </p>

          <p className="text-sm md:text-base mb-24 font-semibold">• Bước 3: Giải quyết vấn đề:</p>
          <p className="text-sm md:text-base mb-24">
            Bộ phận Chăm sóc Khách hàng sẽ tiến hành xác minh, kiểm chứng và phân tích tính chất và
            mức độ của nội dung khiếu nại, phạm vi khiếu nại và trách nhiệm xử lý để phối hợp với
            Tài xế và Bên cung cấp dịch vụ thứ 3 đưa ra biện pháp cụ thể để hỗ trợ Khách hàng giải
            quyết tranh chấp đó.
          </p>
          <p className="text-sm md:text-base mb-24 ml-[40px]">
            3a. Chuyển các vấn đề có liên quan trực tiếp đến Công ty cho các Bộ phận có liên quan
            kiểm tra và đối chiếu.
          </p>
          <p className="text-sm md:text-base mb-24 ml-[40px]">
            3b. Chuyển các vấn đề có liên quan cho Tài xế giải quyết.
          </p>
          <p className="text-sm md:text-base mb-24">
            Trong thời hạn hai (2) ngày làm việc kể từ khi tiếp nhận thông báo về khiếu nại, Tài xế
            có trách nhiệm phối hợp với Exxe để giải quyết, xử lý khiếu nại. Tài xế sẽ thông báo cho
            Khách hàng biện pháp xử lý hoặc ủy quyền thông báo cho Công ty.
          </p>
          <p className="text-sm md:text-base mb-24 font-semibold">• Bước 4: Đóng khiếu nại:</p>
          <p className="text-sm md:text-base mb-24">
            4a. Khách hàng đồng ý với các phản hồi của Bộ phận Chăm sóc Khách hàng  Kết thúc khiếu
            nại. Khách hàng không đồng ý  Quay lại bước 3
          </p>
          <p className="text-sm md:text-base mb-24">
            4b. Theo dõi các giải quyết khiếu nại của Tài xế  Kết thúc khiếu nại khi Khách hàng và
            Tài xế đã thỏa thuận xong.
          </p>
          <p className="text-sm md:text-base mb-24">
            Khi nhận được thông báo về biện pháp xử lý từ Tài xế nhưng Khách hàng không đồng ý thì
            Công ty sẽ chủ trì việc thương lượng, hòa giải giữa Khách hàng và Tài xế để đi đến kết
            quả giải quyết phù hợp với cả hai bên.
          </p>
          <p className="text-sm md:text-base mb-24">
            Trong trường hợp Khách hàng và Tài xế không đi đến thỏa thuận chung hoặc Khách hàng
            không đồng ý với những biện pháp giải quyết cuối cùng của Tài xế và/hoặc nằm ngoài khả
            năng và thẩm quyền của Công ty thì Khách hàng hoặc Tài xế có thể nhờ đến Cơ quan Nhà
            nước có thẩm quyền can thiệp và giải quyết theo Pháp luật nhằm đảm bảo lợi ích hợp pháp
            của các bên.
          </p>
          <p className="text-sm md:text-base mb-24">
            Công ty tôn trọng và nghiêm túc thực hiện các quy định của Pháp luật về Bảo vệ quyền lợi
            của người dùng. Công ty khuyến nghị Khách hàng và Tài xế cung cấp chính xác, trung thực,
            chi tiết các thông tin cá nhân và nội dung đăng tin liên quan đến dịch vụ.
          </p>
          <p className="text-sm md:text-base mb-24">
            Chúng tôi cũng đề nghị Tài xế cần nghiêm túc tuân thủ các quy định của Pháp luật, cũng
            như có những hành vi phù hợp đối với Khách hàng.
          </p>
          <p className="text-sm md:text-base mb-24">
            Mọi hành vi lừa đảo, gian lận trong kinh doanh, gây tổn hại đến người khác đều bị lên án
            và phải chịu hoàn toàn trách nhiệm trước Pháp luật.
          </p>
          <p className="text-sm md:text-base mb-24">
            Các bên bao gồm Khách hàng và Tài xế sẽ phải có trách nhiệm tích cực trong việc giải
            quyết khiếu nại. Tài xế cần có trách nhiệm chủ động xử lý và cung cấp văn bản giấy tờ
            chứng thực thông tin liên quan đến sự việc đang có khiếu nại, tranh chấp với Khách hàng.
          </p>
          <p className="text-sm md:text-base mb-24">
            Công ty chỉ đóng vai trò hỗ trợ, phối hợp việc thương lượng, hòa giải và giải quyết
            khiếu nại giữ Khách hàng và Tài xế. Công ty cũng có trách nhiệm cung cấp những thông tin
            liên quan đến Khách hàng và Tài xế nếu được Tài xế hoặc Khách hàng hoặc Cơ quan Pháp
            luật có thẩm quyền yêu cầu.
          </p>
          <p className="text-sm md:text-base mb-24">
            Sau khi Khách hàng và Tài xế đã giải quyết xong tranh chấp, cần có trách nhiệm báo lại
            cho Công ty để cập nhật tình hình.
          </p>
          <p className="text-sm md:text-base mb-24">
            Trong trường hợp giao dịch phát sinh mâu thuẫn mà lỗi thuộc về Tài xế: Công ty sẽ áp
            dụng các biện pháp xử lý vi phạm tương ứng bao gồm nhưng không giới hạn: cảnh cáo, khóa
            tài khoản hoặc chuyển cho Cơ quan Pháp luật có thẩm quyền tùy theo mức độ của sai phạm.
          </p>
          <p className="text-sm md:text-base mb-24">
            Công ty sẽ chấm dứt và gỡ bỏ toàn bộ tin bài về sản phẩm, dịch vụ của Tài xế đó trên
            dịch vụ vận tải đồng thời yêu cầu Tài xế bồi hoàn cho Khách hàng thỏa đáng trên cơ sở
            thỏa thuận với Khách hàng.
          </p>
        </ul>

        <p className="text-base md:text-xl font-semibold text-center my-[40px]">
          BIỆN PHÁP XỬ LÝ VI PHẠM ĐỐI VỚI NHỮNG NGƯỜI KHÔNG TUÂN THỦ QUY CHẾ HOẠT ĐỘNG CỦA SÀN GIAO
          DỊCH THƯƠNG MẠI ĐIỆN TỬ
        </p>

        <p className="text-sm md:text-base mb-24 font-semibold">A. ĐỐI VỚI TÀI XẾ, </p>
        <p className="text-sm md:text-base mb-12">- Hành vi vi phạm chất lượng dịch vụ</p>
        <p className="text-sm md:text-base mb-12">
          - Hành động liên quan đến việc Quấy rối tình dục với Khách hàng, Tài xế khác, nhân viên
          Exxe (bằng hành vi, qua văn bản, tin nhắn, điện thoại, email, mạng xã hội hoặc lời nói).
        </p>
        <p className="text-sm md:text-base mb-12">
          - Thực hiện hành vi vi phạm pháp luật nghiêm trọng, tội phạm.
        </p>
        <p className="text-sm md:text-base mb-12">
          - Tuyên truyền hoặc thuyết phục người khác truyền bá tin tức gian lận hoặc giả mạo, phỉ
          báng Khách hàng, Tài xế khác, Người Bán/Exxe, cán bộ, nhân viên Exxe trực tiếp hoặc thông
          qua các phương tiện truyền thông.
        </p>
        <p className="text-sm md:text-base mb-12">
          - Sử dụng dữ liệu và tài khoản giả để đăng ký tài khoản: bằng lái, CMND giả, sử dụng tài
          khoản bị chấm dứt...
        </p>
        <p className="text-sm md:text-base mb-12">
          - Tài khoản của Tài xế hoặc khách hàng có dấu hiệu bị tấn công, xâm nhập bởi bên thứ ba.
        </p>
        <p className="text-sm md:text-base mb-12">
          - Điều khiển phương tiện vụ ẩu, quá tốc độ quy định, không an toàn, gây tai nạn nghiêm
          trọng khi tham gia cung cấp dịch vụ
        </p>
        <p className="text-sm md:text-base mb-12">
          - Phát tán thông tin số điện thoại, hình ảnh hoặc thông tin khác của Khách hàng, Tài xế
          khác bằng bất kỳ phương tiện nào (bao gồm cả mạng xã hội).
        </p>
        <p className="text-sm md:text-base mb-12">
          - Tài xế có hành vi xúc phạm danh dự, nhân phẩm, gây tổn hại đến Khách hàng, nhân viên
          Exxe.
        </p>
        <p className="text-sm md:text-base mb-12">
          - Tài xế sử dụng các chất kích thích, chất cồn ảnh hưởng đến an toàn chuyến đi; khi cung
          cấp dịch vụ cho Khách hàng gây mất uy tín, hình ảnh, thương hiệu của Exxe.
        </p>
        <p className="text-sm md:text-base mb-12">
          - Bị phát hiện hoặc báo cáo là mang theo vũ khí sắc nhọn hoặc chất kích thích trong khi
          đang thực hiện đơn hàng.
        </p>
        <p className="text-sm md:text-base mb-12">
          - Tài xế có hành vi tranh cãi, khiêu khích đánh nhau (qua lời nói hoặc văn bản hoặc nhắn
          tin hoặc mạng xã hội) với khách hàng trong hoặc sau chuyến đi.
        </p>
        <p className="text-sm md:text-base mb-12">- Chạy sai xe (Không trùng biển số đăng ký).</p>
        <p className="text-sm md:text-base mb-12">
          - Đánh Cãi nhau với Tài xế khác của Exxe Group trước mặt Khách hàng hoặc trong khu vực
          công cộng (Đang hoạt động/ Không hoạt động).
        </p>
        <p className="text-sm md:text-base mb-12">
          - Cản trở các Tài xế khác thực hiện các chuyển xe/đơn hàng của họ.
        </p>
        <p className="text-sm md:text-base mb-12">
          - Liên hệ với Khách hàng cho các vấn đề khác ngoài vấn đề đặt đơn hàng chuyến xe gây phiền
          nhiễu, nhằm quấy rối.
        </p>
        <p className="text-sm md:text-base mb-12">
          - Yêu cầu Khách hàng thanh toán thêm cước phí (tiền bo, tiền giữ xe, tiền xăng...).
        </p>
        <p className="text-sm md:text-base mb-24">
          - Mang theo người lạ khi đang thực hiện chở khách.
        </p>
        <p className="text-sm md:text-base mb-24 font-semibold"> B. ĐỐI VỚI KHÁCH HÀNG</p>
        <p className="text-sm md:text-base mb-12">
          - Xúc phạm danh dự, nhân phẩm, gây tổn hại đến với Tài xế (qua văn bản hoặc lời nói/tin
          nhắn/mạng xã hội) (vi phạm nặng: 1 lần sẽ bị khóa; vi phạm nhẹ: 2 lần sẽ bị khóa).
        </p>
        <p className="text-sm md:text-base mb-12">
          - Thực hiện hành vi phạm tội trong chuyến xe trong đơn hàng của Exxe.
        </p>
        <p className="text-sm md:text-base mb-12">
          - Tuyên truyền hoặc thuyết phục người khác truyền bá tin tức gian lận hoặc giả mạo, phi
          bảng Exxe trực tiếp hoặc thông qua các phương tiện truyền thông.
        </p>
        <p className="text-sm md:text-base mb-12">
          - Cố tình báo cáo, phản hồi thông tin không đúng sự thật gây ảnh hưởng xấu tới Tài xế của
          Exxe. Phát tán thông tin số điện thoại, hình ảnh hoặc thông tin khác của Tài xế/Khách hàng
          bằng bất kỳ phương tiện nào với mục đích xấu.
        </p>
        <p className="text-sm md:text-base mb-12">
          - Khách hàng có hành vi đe dọa tính mạng, sức khỏe, tài sản, xúc phạm danh dự, nhân phẩm
          Tài xế/nhân viên Exxe và người thân của họ.
        </p>
        <p className="text-sm md:text-base mb-12">
          - Đưa hàng hoá hoặc tiền hoặc lợi ích khác cho nhân viên của Exxe nhằm mục đích phá vỡ các
          quy tắc của Exxe. Bị phát hiện, báo cáo là có mang theo vũ khí hoặc ma túy trong chuyến
          đi.
        </p>
        <p className="text-sm md:text-base mb-12">
          - Khách hàng có hành vi đánh, dọa đánh, giết (qua lời nói hoặc văn bản hoặc tin nhắn, qua
          việc sử dụng các mạng xã hội) với Tài xế trước, trong hoặc sau chuyến đi.
        </p>
        <p className="text-sm md:text-base mb-12">
          - Không thanh toán tiền thanh toán không đủ tiền theo lệnh đặt xe/đơn hàng cho Tài xế
          Exxe.
        </p>
        <p className="text-sm md:text-base mb-12">
          - Liên hệ với Tài xế với mục đích lôi kéo qua các công ty đối thủ trước trong/sau chuyến
          đi (vi phạm 2 lần đối với 2 tài xế khác nhau).
        </p>
        <p className="text-sm md:text-base mb-12">
          - Khách hàng không liên lạc được/số điện thoại không có thật.
        </p>
        <p className="text-sm md:text-base mb-12">
          - Khách hàng đã đặt chuyến/đặt đơn trên ứng dụng Exxe nhưng từ chối khách không đặt chuyến
          đặt đơn.
        </p>
        <p className="text-sm md:text-base mb-12">
          - Khách hàng đợi Tài xế đến nơi rồi huỷ không liên lạc được.Khách hàng đặt nhiều chuyến 1
          lúc rồi đi với Tài xế nào đến trước.
        </p>
        <p className="text-sm md:text-base mb-12">
          - Các hành vi khác vi phạm tiêu chuẩn Chất lượng Dịch vụ của Tài xế do Exxe quy định trong
          từng thời kỳ.
        </p>
        <p className="text-sm md:text-base mb-12">
          - Cấu kết với Tài xế của Exxe thực hiện chuyến xe/đơn hàng giả mạo hoặc các giao dịch bất
          thường trên ví thông qua hệ thống của Exxe nhằm trục lợi cho minh và/hoặc người khác.
        </p>
        <p className="text-sm md:text-base mb-12">
          - Câu kết, giúp sức, thông đồng, thủ đoạn, hành vi khác cùng với Tài xế/ Khách hàng khác
          tổ chức, cá nhân khác nhằm thực hiện các hành vi gian lận, lừa đảo, chiếm đoạt tài sản của
          Exxe/Tài xế; các hành vi vi phạm pháp luật khác gây ảnh hưởng xấu/ có khả năng gây ảnh
          hương xấu nghiêm trọng đến hình ảnh, uy tín, thương hiệu của Exxe (theo đánh giá của
          Exxe).
        </p>
        <p className="text-sm md:text-base mb-12">
          - Khách hàng có tài khoản không hợp lệ. Lưu ý nếu khách hàng bị 3 lần cảnh cáo sẽ bằng 1
          lần chấm dứt vĩnh viễn.
        </p>

        <p className="text-base md:text-xl font-semibold text-center my-[40px]">
          BIỆN PHÁP XỬ LÝ VỚI CÁC HÀNH VI XÂM PHẠM QUYỀN LỢI NGƯỜI TIÊU DÙNG TRÊN SÀN GIAO DỊCH
          THƯƠNG MẠI ĐIỆN TỬ;
        </p>

        <p className="italic text-sm md:Text-base font-semibold mb-24">
          * Tài xế sẽ từ chối phục vụ khi hành khách có những hàng hóa như sau:
        </p>

        <p className="text-sm md:text-base mb-24">
          - Rượu các loại; Thuốc lá điếu, xì gà và các dạng thuốc lá thành phẩm khác. Các loại pháo
          nổ, thuốc pháo nổ. Các chất ma túy. Thiết bị gây nhiễu thông tin di động tế bào. Đèn trời.
          Vũ khí quân dụng, trang thiết bị, kĩ thuật, khí tài, phương tiện chuyên dùng quân sự, công
          an, quân trang.
        </p>

        <p className="text-sm md:text-base mb-24">
          - Đồ chơi nguy hiểm, đồ chơi có hại tới giáo dục nhân cách và sức khỏe của trẻ em hoặc tới
          an ninh, trật tự, văn hóa xã hội (bao gồm cả các chương trình trò chơi điện tử).
        </p>
        <p className="text-sm md:text-base mb-24">
          - Các sản phẩm văn hóa phản động, đồi trụy, mê tín dị đoan hoặc có hại tới giáo dục thẩm
          mỹ, nhân cách. Di vật, cổ vật, bảo vật quốc gia thuộc di tích lịch sử văn hóa và danh lam
          thắng cảnh, thuộc sở hữu toàn dân, sở hữu của các tổ chức chính trị, tổ chức chính trị –
          xã hội. Hóa chất độc, tiền chất. Thuốc lá điếu, xì gà và các dạng thuốc lá thành phẩm khác
          nhập lậu.
        </p>
        <p className="text-sm md:text-base mb-24">
          - Thực vật, động vật hoang dã. Thủy sản cấm khai thác, thủy sản có dư lượng chất độc hại
          vượt quá giới hạn cho phép, thủy sản có yếu tố độc tự nhiên gây nguy hiểm đến tính mạng
          con người. Các loại thuốc chữa bệnh cho người, các loại vắc xin, sinh phẩm y tế, mỹ phẩm,
          hóa chất và chế phẩm diệt côn trùng, diệt khuẩn trong lĩnh vực gia dụng và y tế chưa được
          sử dụng tại Việt Nam.
        </p>
        <p className="text-sm md:text-base mb-24">
          - Các loại trang thiết bị y tế chưa được phép sử dụng tại Việt Nam. Các loại mỹ phẩm y tế
          chưa được công bố với cơ quan có thẩm quyền.
        </p>

        <p className="italic text-sm md:Text-base font-semibold mb-24">
          ** Đối tác tài xế sẽ chịu trách nhiệm khi biết hành khách có mang các vật dụng và hàng hoá
          trên nhưng bao che, không khai báo với các cơ quan có thẩm quyền. Đối tác tài xế phải chịu
          trách nhiệm trước pháp luật.
        </p>

        <h3 className="text-lg uppercase font-semibold">
          III. QUY CHẾ HOẠT ĐỘNG, SỬ DỤNG DỊCH VỤ VÀ PHƯƠNG THỨC THANH TOÁN
        </h3>

        <p className="text-sm md:text-base font-semibold mb-24">1. Đối với khách hàng:</p>
        <p className="text-sm md:text-base mb-12">
          • Mở website :{" "}
          <a
            target="_blank"
            rel="noreferrer noopener"
            className="text-primary"
            href="http://www.exxe.vn"
          >
            http://www.exxe.vn
          </a>{" "}
          hoặc tải ứng dụng Exxe về thiết bị và cài đặt.
        </p>
        <p className="text-sm md:text-base mb-12">
          • Đăng kí tài khoản: Khách hàng đăng kí tài khoản bằng số điện thoại cá nhân. Lưu ý: mỗi
          số điện thoại chỉ có thể đăng kí cho duy nhất 1 tài khoản.
        </p>
        <p className="text-sm md:text-base mb-12">
          • Đặt chuyến xe: Hành khách chọn chuyến xe phù hợp với nhu cầu cá nhân, cung cấp đầy đủ
          thông tin chuyến xe theo yêu cầu của hệ thống
        </p>
        <p className="text-sm md:text-base mb-12">
          • Xác nhận thông tin chuyến: Khách hàng kiểm tra, xác nhận và hoàn tất thông tin chuyến
          đi.
        </p>
        <p className="text-sm md:text-base mb-12">
          • Tiến hành đặt cọc: khách hàng sẽ đặt cọc 20% chuyến đi. Hình thức thanh toán gồm có : ví
          điện tử, chuyển khoản, trực tuyến, Visa, Master Card…
        </p>
        <p className="text-sm md:text-base mb-24">
          • Hoàn thành đặt chuyến: Hệ thống xác nhận chuyến đi của bạn đã hoàn thành đặt chuyến, hãy
          đảm bảo bạn luôn sẵn sàng điện thoại để tài xế có thể liên lạc được với bạn về chuyến đi.
        </p>

        <p className="text-sm md:text-base font-semibold mb-24">2. Đối với tài xế</p>
        <p className="text-sm md:text-base mb-12">
          • Mở website: http://wwww.exxe.vn hoặc tải ứng dụng Exxe về thiết bị và cài đặt
        </p>
        <p className="text-sm md:text-base mb-12">
          • Đăng kí tài khoản: đối tác đăng kí tài khoản bằng số điện thoại cá nhân. Cung cấp đầy đủ
          thông tin giấy tờ pháp lý. Lưu ý: mỗi số điện thoại chỉ có thể đăng kí cho duy nhất 1 tài
          khoản.
        </p>
        <p className="text-sm md:text-base mb-12">
          • Lựa chọn chuyến : đối tác tài xế có thể chọn chuyến sẵn có hoặc tạo cuốc tiện chuyến.
          Nếu chọn cuốc tiện chuyến, hãy cung cấp thông tin theo yêu cầu của hệ thống.
        </p>
        <p className="text-sm md:text-base mb-12">
          • Xác nhận thông tin chuyến: Đối tác Tài Xế kiểm tra lại thông tin chuyến đi.
        </p>
        <p className="text-sm md:text-base mb-12">
          • Tiến hành đặt cọc: đối tác Tài Xế sẽ đặt cọc 20% chuyến đi để nhận chuyến. (Hoặc nạp
          tiền vào ví để nhận chuyến đi).
        </p>
        <p className="text-sm md:text-base mb-12">
          • Các hình thức thanh toán gồm có : ví điện tử, chuyển khoản, trực tuyến, Visa, Master
          Card…
        </p>
        <p className="text-sm md:text-base mb-12">
          • Thực hiện chuyến đi: Sau khi nhận chuyến thành công, Đối tác liên hệ với hành khách nhằm
          xác nhận điểm đón (với chuyến có sẵn) hoặc đợi hệ thống ghép với khách hàng ( với cuốc
          tiện chuyến )
        </p>
        <p className="text-sm md:text-base mb-12">
          • <span className="font-semobold">CHÚ Ý</span>: Exxe sẽ thu phí dịch vụ 10% trên mỗi
          chuyến đi hoàn tất.
        </p>
        <p className="text-sm md:text-base mb-12">
          • Số tiền đặt cọc (20%) của khách hàng và (20%) của tài xế sẽ được chuyển về ví của tài xế
          sau khi bấm xác nhận hoàn tất chuyến đi. 10% phí sử dụng dịch vụ sẽ đc trừ vào tk của Tài
          xế.
        </p>
        <p className="text-sm md:text-base mb-12">
          • Tài xế có thể rút tiền từ ví ở Exxe về tài khoản ngân hàng của mình sau khi hoàn tất
          chuyến đi.
        </p>
        <p className="text-sm md:text-base mb-24 font-semibold italic">
          • Số tiền rút về tài khoản sẽ được chuyển khoản trong vòng 24h làm việc.
        </p>

        <p className="text-base md:text-xl font-semibold text-center my-[40px]">
          CHÍNH SÁCH ÁP DỤNG CHUNG CHO CÁC GIAO DỊCH TRÊN SÀN LIÊN QUAN ĐẾN VẤN ĐỀ KIỂM HÀNG, CHÍNH
          SÁCH ĐỔI TRẢ, CHÍNH SÁCH HOÀN TIỀN (BAO GỒM NHỮNG TRƯỜNG HỢP HOÀN TIỀN, QUY TRÌNH VÀ
          PHƯƠNG THỨC HOÀN TIỀN CHO KHÁCH HÀNG) TRONG TRƯỜNG HỢP SÀN GIAO DỊCH THƯƠNG MẠI ĐIỆN TỬ CÓ
          CHỨC NĂNG ĐẶT HÀNG TRỰC TUYẾN;
        </p>

        <p className="text-sm md:text-base mb-24 font-semibold">
          {" "}
          Chính sách huỷ chuyến và hoàn cọc:
        </p>

        <p className="text-sm md:text-base mb-24">
          • Tài xế trong trường hợp muốn hủy chuyến sau khi khách hàng đã đặt chuyến thành công, có
          thể thực hiện thao tác hủy chuyến trên ứng dụng Exxe.
        </p>
        <p className="text-sm md:text-base mb-24">
          • Nhằm gia tăng sự cam kết của tài xế cũng như đảm bảo quyền lợi của khách hàng, trường
          hợp tài xế hủy chuyến (vì lí do xe hư / không thể thực hiện được chuyến), nếu như không
          thỏa thuận được hoặc không có sự đồng ý từ phía khách hàng, thì tài xế phải bồi thường phí
          hủy chuyến cho khách hàng số tiền bằng đúng số tiền mà khách hàng đã đặt cọc thông qua
          Công ty Cổ phần Đầu Tư Công Nghệ và Vận Tải ExxeVn.
        </p>
        <p className="text-sm md:text-base mb-24 font-semibold italic">
          • Chính sách huỷ chuyến và chi phí hủy chuyến được tính như sau:
        </p>

        <table className="w-full mb-24">
          <thead className="w-full">
            <tr className="border-b border-border-color border-solid">
              <th className="p-12 text-left text-xs">Thời điểm hủy chuyến</th>
              <th className="p-12 text-left text-xs">Phí hủy chuyến</th>
              <th className="p-12 text-left text-xs">Đánh giá hệ thống</th>
            </tr>
          </thead>
          <tbody className="w-full">
            <tr className="border-b border-border-color border-solid">
              <td className="p-12 text-left text-sm">Trong vòng 2 giờ sau khi đặt cọc</td>
              <td className="p-12 text-left text-sm font-semibold">0% Tiền cọc</td>
              <td className="p-12 text-left text-sm">3*</td>
            </tr>
            <tr className="border-b border-border-color border-solid">
              <th className="p-12 text-left text-sm">{">"} 3 tiếng trước khi khởi hành</th>
              <th className="p-12 text-left text-sm font-semibold">0% Tiền cọc</th>
              <th className="p-12 text-left text-sm">3*</th>
            </tr>
            <tr className="border-b border-border-color border-solid">
              <th className="p-12 text-left text-sm">{"<"} 3 tiếng trước khởi hành ***</th>
              <th className="p-12 text-left text-sm font-semibold">100% Tiền cọc</th>
              <th className="p-12 text-left text-sm">2* (hoặc 1* nếu {"<"}3 tiếng)</th>
            </tr>
          </tbody>
        </table>

        <p className="text-sm md:text-base font-semibold mb-24 italic">
          Vi phạm chính sách Huỷ chuyến đi:
        </p>
        <p className="text-sm md:text-base font-semibold mb-24 italic">
          *** Trường hợp Đối Tác Tài Xế phát sinh huỷ chuyến, Exxe sẽ trừ 20% tiền cọc của Tài Xế
          (Đối tác) và sẽ chuyển khoản tiền 20% đặt cọc này cho khách hàng.
        </p>
        <p className="text-sm md:text-base font-semibold mb-24 italic">
          *** Và ngược lại, trường hợp khách hàng huỷ chuyến dẫn đến phát sinh chi phí huỷ chuyến,
          Exxe sẽ cộng 20% tiền đặt cọc của khách hàng vào tài khoản của Tài Xế.
        </p>
        <p className="text-sm md:text-base font-semibold mb-24 italic">
          *** Trường hợp Đối Tác Tài Xế huỷ chuyến ngoài quy định, chuyến đi của khách hàng sẽ là
          chuyến đi ưu tiên. Exxe sẽ tìm Đối tác tài xế mới trong thời gian sớm nhất để chuyến đi
          của khách hàng dc trọn vẹn.
        </p>
        <p className="text-sm md:text-base font-semibold mb-24 italic">
          *** Đối với trường hợp đi ghép, 20% đặt cọc của Tài Xế sẽ đc chia đều cho các khách hàng
          đặt chuyến thành công.
        </p>
        <p className="text-sm md:text-base font-semibold mb-24 italic">
          *** Nhằm gia tăng sự cam kết của tài xế, cũng như đảm bảo quyền lợi của khách hàng: Đối
          tác và Khách hàng vui lòng liên lạc trước chuyến đi.
        </p>

        <p className="text-base md:text-xl font-semibold text-center my-[40px]">
          QUYỀN VÀ NGHĨA VỤ CỦA THƯƠNG NHÂN, TỔ CHỨC CUNG CẤP DỊCH VỤ SÀN GIAO DỊCH THƯƠNG MẠI ĐIỆN
          TỬ;
        </p>
        <p className="text-sm md:text-base font-semibold italic mb24">
          Quyền và trách nhiệm của doanh nghiệp:
        </p>

        <p className="text-sm md:text-base mb-24 italic font-semibold">
          * Đối với doanh nghiệp cung cấp dịch vụ sàn giao dịch vận tải thương mại điện tử (Exxe)
        </p>
        <p className="text-sm md:text-base mb-24">
          - Xây dựng và công bố công khai trên website quy chế hoạt động của sàn giao dịch thương
          mại điện tử; theo dõi và bảo đảm việc thực hiện quy chế đó trên sàn giao dịch thương mại
          điện tử.
        </p>
        <p className="text-sm md:text-base mb-24">
          - Yêu cầu thương nhân, tổ chức, cá nhân là người sử dụng trên sàn giao dịch thương mại
          điện tử cung cấp thông tin khi đăng ký sử dụng dịch vụ.
        </p>
        <p className="text-sm md:text-base mb-24">
          - Có cơ chế kiểm tra, giám sát để đảm bảo việc cung cấp thông tin của tài xế trên sàn giao
          dịch vận tải thương mại điện tử được thực hiện chính xác, đầy đủ.
        </p>
        <p className="text-sm md:text-base mb-24">
          - Lưu trữ thông tin đăng ký của các thương nhân, tổ chức, cá nhân tham gia dịch vụ giao
          dịch thương mại điện tử và thường xuyên cập nhật những thông tin thay đổi, bổ sung có liên
          quan.
        </p>
        <p className="text-sm md:text-base mb-24">
          - Thiết lập cơ chế cho phép khách hàng, tổ chức, cá nhân tham gia sàn giao dịch thương mại
          điện tử thực hiện được quy trình giao kết hợp đồng trực tuyến nếu website có chức năng đặt
          hàng trực tuyến.
        </p>
        <p className="text-sm md:text-base mb-24">
          - Áp dụng các biện pháp cần thiết để đảm bảo an toàn thông tin liên quan đến bí mật kinh
          doanh của khách hàng, tổ chức, cá nhân và thông tin cá nhân của người tiêu dùng.
        </p>
        <p className="text-sm md:text-base mb-24">
          - Có biện pháp xử lý kịp thời khi phát hiện hoặc nhận được phản ánh về hành vi kinh doanh
          vi phạm pháp luật trên sàn giao dịch vận tải thương mại điện tử.
        </p>
        <p className="text-sm md:text-base mb-24">
          - Hỗ trợ cơ quan quản lý nhà nước điều tra các hành vi kinh doanh vi phạm pháp luật, cung
          cấp thông tin đăng ký, lịch sử giao dịch và các tài liệu khác về đối tượng có hành vi vi
          phạm pháp luật trên sàn giao dịch vận tải thương mại điện tử.
        </p>
        <p className="text-sm md:text-base mb-24">
          - Công bố công khai cơ chế giải quyết các tranh chấp phát sinh trong quá trình giao dịch
          trên sàn giao dịch thương mại điện tử. Khi khách hàng trên sàn giao dịch thương mại điện
          tử phát sinh mâu thuẫn với tài xế hoặc bị tổn hại lợi ích hợp pháp, phải cung cấp cho
          khách hàng thông tin về tài xế, tích cực hỗ trợ khách hàng bảo vệ quyền và lợi ích hợp
          pháp của mình.
        </p>
        <p className="text-sm md:text-base mb-24">
          - Ngăn chặn và loại bỏ khỏi website những thông tin bán hàng hóa, dịch vụ thuộc danh mục
          hàng hóa, dịch vụ cấm kinh doanh theo quy định của pháp luật và hàng hóa hạn chế kinh
          doanh.
        </p>
        <p className="text-sm md:text-base mb-24">
          - Loại bỏ khỏi website những thông tin giấy tờ giả khách hàng, giả tài xế, vi phạm pháp
          luật khác khi phát hiện hoặc nhận được phản ánh có căn cứ xác thực về những thông tin này.
        </p>
        <p className="text-sm md:text-base mb-24">
          - Yêu cầu khách hàng không mang các hàng hóa, dịch vụ thuộc danh mục hàng hóa cấm, nhập
          lậu, phải cung cấp Giấy chứng nhận đủ điều kiện kinh doanh đối với hàng hóa, dịch vụ đó
          (trong trường hợp pháp luật quy định phải có Giấy chứng nhận đủ điều kiện kinh doanh).
        </p>
        <p className="text-sm md:text-base mb-24 italic font-semibold">
          * Đối với doanh nghiệp cung cấp dịch vụ khuyến mại trực tuyến:
        </p>
        <p className="text-sm md:text-base mb-24">
          - Tuân thủ các quy định của Luật thương mại và các quy định pháp luật có liên quan về hoạt
          động khuyến mại.
        </p>
        <p className="text-sm md:text-base mb-24">
          - Tuân thủ các quy định của pháp luật về bảo vệ thông tin cá nhân của khách hàng.
        </p>
        <p className="text-sm md:text-base mb-24">
          - Thực hiện các quy định của pháp luật có liên quan nếu website có chức năng đặt hàng trực
          tuyến cho các phiếu mua hàng, phiếu sử dụng dịch vụ hoặc thẻ khách hàng thường xuyên;
          Website có chức năng thanh toán trực tuyến.
        </p>
        <p className="text-sm md:text-base mb-24">
          - Có cơ chế tiếp nhận, giải quyết các khiếu nại của khách hàng về chất lượng dịch vụ được
          khuyến mại hoặc dịch vụ dùng để khuyến mại.
        </p>
        <p className="text-sm md:text-base mb-24">
          - Chịu trách nhiệm của bên thứ ba trong việc cung cấp thông tin về dịch vụ cho người tiêu
          dùng theo quy định của Luật bảo vệ quyền lợi người tiêu dùng.
        </p>
        <p className="text-sm md:text-base mb-24">
          - Bồi thường cho khách hàng nếu sử dụng dịch vụ hoặc khách hàng thường xuyên bị đối tác từ
          chối trái với các điều kiện đã công bố trên website hoặc trên App chính sử dụng dịch vụ.
        </p>

        <p className="text-base md:text-xl font-semibold text-center my-[40px]">
          QUYỀN VÀ NGHĨA VỤ CỦA NGƯỜI SỬ DỤNG DỊCH VỤ SÀN GIAO DỊCH THƯƠNG MẠI ĐIỆN TỬ;
        </p>

        <p className="text-sm md:text-base mb-24">
          Quyền và trách nhiệm của đối tác hoặc khách hàng:
        </p>
        <p className="text-sm md:text-base mb-24 italic font-semibold">
          * Đối với khách hàng và Đối tác sử dụng website cung cấp dịch vụ vận tải thương mại điện
          tử:
        </p>
        <p className="text-sm md:text-base mb-24">
          - Cung cấp đầy đủ và chính xác các thông tin cho doanh nghiệp sở hữu website cung cấp dịch
          vụ sàn giao dịch thương mại điện tử khi đăng ký sử dụng dịch vụ:
        </p>
        <p className="text-sm md:text-base mb-24">
          + Tên và địa chỉ trụ sở của khách hàng, tổ chức hoặc tên và địa chỉ thường trú của cá
          nhân.
        </p>
        <p className="text-sm md:text-base mb-24">
          + Số, ngày cấp và nơi cấp giấy chứng nhận đăng ký kinh doanh của thương nhân, hoặc số,
          ngày cấp và đơn vị cấp quyết định thành lập của tổ chức, hoặc mã số thuế cá nhân của cá
          nhân.
        </p>
        <p className="text-sm md:text-base mb-24">
          + Số điện thoại hoặc một phương thức liên hệ trực tuyến khác.
        </p>
        <p className="text-sm md:text-base mb-24">
          - Cung cấp đầy đủ thông tin về chuyến đi (nơi đón và điểm đến cụ thể) để tài xế nắm rõ lộ
          trình.
        </p>
        <p className="text-sm md:text-base mb-24">
          - Đảm bảo tính chính xác, trung thực của thông tin về chuyến đi, dịch vụ cung cấp trên sàn
          giao dịch vận tải thương mại điện tử.
        </p>
        <p className="text-sm md:text-base mb-24">
          - Thực hiện các quy định của pháp luật khi ứng dụng chức năng đặt chuyến đi trực tuyến
          trên sàn giao dịch vận tải thương mại điện tử.
        </p>
        <p className="text-sm md:text-base mb-24">
          - Cung cấp thông tin về chuyến đi của mình khi có yêu cầu của cơ quan nhà nước có thẩm
          quyền để phục vụ hoạt động thống kê thương mại điện tử.
        </p>
        <p className="text-sm md:text-base mb-24">
          - Tuân thủ quy định của pháp luật về thanh toán, quảng cáo, khuyến mại, bảo vệ quyền sở
          hữu trí tuệ, bảo vệ quyền lợi người tiêu dùng và các quy định của pháp luật có liên quan
          khác khi chuyến đi hoàn tất dịch vụ trên sàn giao dịch vận tải thương mại điện tử.
        </p>
        <p className="text-sm md:text-base mb-24">
          - Thực hiện đầy đủ nghĩa vụ thuế theo quy định của pháp luật.
        </p>
        <p className="text-sm md:text-base mb-24 italic font-semibold">
          * Đối với khách hàng, tổ chức, cá nhân có chuyến đi được khuyến mại trên website cung cấp
          dịch vụ khuyến mại trực tuyến
        </p>
        <p className="text-sm md:text-base mb-24">
          - Cung cấp thông tin chính xác, đầy đủ về chuyến đi, dịch vụ được khuyến mại.
        </p>
        <p className="text-sm md:text-base mb-24">
          - Thực hiện đúng các cam kết về chất lượng dịch vụ được khuyến mại theo như thông tin đã
          cung cấp.
        </p>
        <p className="text-sm md:text-base mb-24 italic">
          * Đối với ExxeVn trên website trực tuyến
        </p>
        <p className="text-sm md:text-base mb-24">
          - Thông báo, niêm yết công khai, đầy đủ, chính xác các thông tin cần thiết liên quan đến
          chuyến đi.
        </p>
        <p className="text-sm md:text-base mb-24">- Công bố giá khởi điểm; mức giá chấp nhận.</p>
        <p className="text-sm md:text-base mb-24">- Chịu trách nhiệm về chất lượng dịch vụ.</p>
        <p className="text-sm md:text-base mb-24">
          - Giải quyết các khiếu nại của khách hàng về chất chuyến đi khuyến mại.
        </p>
        <p className="text-sm md:text-base mb-24">
          - Cung cấp đầy đủ thông tin về khuyến mãi trên sàn giao dịch vận tải thương mại điện tử.
        </p>
        <p className="text-sm md:text-base mb-24">
          - Đảm bảo tính chính xác, trung thực của thông tin về khuyến mãi, dịch vụ cung cấp trên
          sàn giao dịch thương mại điện tử.
        </p>
        <p className="text-sm md:text-base mb-24">
          - Thực hiện các quy định của pháp luật khi ứng dụng chức năng đặt hàng trực tuyến trên sàn
          giao dịch thương mại điện tử.
        </p>
        <p className="text-sm md:text-base mb-24">
          - Cung cấp thông tin về tình hình kinh doanh của mình khi có yêu cầu của cơ quan nhà nước
          có thẩm quyền để phục vụ hoạt động thống kê thương mại điện tử.
        </p>
        <p className="text-sm md:text-base mb-24">
          - Tuân thủ quy định của pháp luật về thanh toán, quảng cáo, khuyến mại, bảo vệ quyền sở
          hữu trí tuệ, bảo vệ quyền lợi người tiêu dùng và các quy định của pháp luật có liên quan
          khác.
        </p>
        <p className="text-sm md:text-base mb-24">
          - Thực hiện đầy đủ nghĩa vụ thuế theo quy định của pháp luật.
        </p>

        <p className="text-base md:text-xl font-semibold text-center my-[40px]">
          GIỚI HẠN TRÁCH NHIỆM CỦA THƯƠNG NHÂN, TỔ CHỨC CUNG CẤP DỊCH VỤ SÀN GIAO DỊCH THƯƠNG MẠI
          ĐIỆN TỬ TRONG NHỮNG GIAO DỊCH THỰC HIỆN TRÊN SÀN PHÂN ĐỊNH TRÁCH NHIỆM CUNG CẤP CHỨNG TỪ
          DỊCH VỤ:
        </p>

        <p className="text-sm md:text-base mb-12">
          - Tất cả dịch vụ mà Exxe tham gia hợp tác cung cấp dịch vụ cho khách hàng, tất cả chứng từ
          dịch vụ sẽ được Exxe gửi qua mail đến khách hàng.
        </p>
        <p className="text-sm md:text-base mb-12">
          - Giới hạn trách nhiệm của Exxe đối với các giao dịch trên Sàn giao dịch vận tải TMĐT:
        </p>
        <p className="text-sm md:text-base mb-24">
          + Trừ trường hợp Exxe tham gia hợp tác dịch vụ cho khách hàng, Exxe chỉ chịu trách nhiệm
          hỗ trợ và hướng dẫn khách hàng thực hiện các khiếu nại, thắc mắc với Tài xế.
        </p>
        <p className="text-sm md:text-base mb-24">
          + Đối tác tài xế có trách nhiệm giải quyết triệt để khiếu nại của Khách hàng theo đúng các
          chính sách đã công bố và thông tin đầy đủ cho Exxe quá trình giải quyết khiếu nại.
        </p>
        <p className="text-sm md:text-base mb-24">
          - Nếu có tranh chấp phát sinh giữa Người sử dụng dịch vụ và Đối tác tài xế thì các bên sẽ
          giải quyết trên cơ sở tự thoả thuận, thương lượng. Nếu vụ việc vượt quá thẩm quyền và khả
          năng của mình, Exxe sẽ đề nghị người bị vi phạm chuyển vụ việc cho các cơ quan chức năng
          có thẩm quyền. Trong trường hợp này, Exxe vẫn hỗ trợ để bảo vệ tốt nhất bên bị vi phạm.
        </p>
        <p className="text-sm md:text-base mb-12">
          - Nếu có tranh chấp phát sinh liên quan đến việc sử dụng dịch vụ liên quan giữa Người sử
          dụng dịch vụ với Exxe, thì Exxe sẽ giải quyết vụ việc tuân thủ quy trình giải quyết tranh
          chấp, khiếu nại đã được công bố trên website:{" "}
          <a
            target="_blank"
            rel="noreferrer noopener"
            className="text-primary"
            href="http://www.exxe.vn"
          >
            http://www.exxe.vn
          </a>{" "}
          và theo quy định của pháp luật liên quan.
        </p>

        <p className="text-base md:text-xl font-semibold text-center my-[40px]">
          {" "}
          ĐIỀU KHOẢN ÁP DỤNG
        </p>

        <p className="text-sm md:text-base mb-24">
          1. Quy chế hoạt động dịch vụ vận tải Thương Mại Điện Tử Exxe được sửa đổi, bổ sung và có
          hiệu lực kể từ ngày 15/08/2022 và các lần sửa đổi, bổ sung sau đó.
        </p>
        <p className="text-sm md:text-base mb-24">
          2. Quy chế này được đăng tải công khai trên trang thông tin điện tử:{" "}
          <a
            target="_blank"
            rel="noreferrer noopener"
            className="text-primary"
            href="http://www.exxe.vn"
          >
            http://www.exxe.vn
          </a>{" "}
          và trên ứng dụng Exxe.
        </p>
        <p className="text-sm md:text-base mb-24">
          3. Exxe giữ quyền điều chỉnh, sửa đổi, bổ sung, chấm dứt từng phần Quy chế này (gọi chung
          là sửa đổi) cho phù hợp với thực tiễn hoạt động và quy định của pháp luật.
        </p>
        <p className="text-sm md:text-base mb-24">
          4. Khi có sửa đổi Quy chế thì được thông báo trước 05 ngày trên trang thông tin điện tử:
          <a
            target="_blank"
            rel="noreferrer noopener"
            className="text-primary"
            href="http://www.exxe.vn"
          >
            http://www.exxe.vn
          </a>{" "}
          và trên ứng dụng Exxe cho các thành viên được biết. Quy chế sửa đổi có hiệu lực sau 05
          ngày kể từ ngày có thông báo thay đổi hoặc kể từ thời điểm theo quy định của pháp luật.
        </p>
        <p className="text-sm md:text-base mb-24">
          5. Việc thành viên tiếp tục sử dụng dịch vụ, thực hiện các giao dịch qua dịch vụ vận tải
          Thương Mại Điện Tử Exxe sau khi Quy chế sửa đổi được công bố và thực thi đồng nghĩa với
          việc thành viên đã đọc, hiểu rõ, chấp thuận và đồng ý với Quy chế sửa đổi đó.
        </p>
        <p className="text-sm md:text-base mb-24">
          6. Thành viên tham gia dịch vụ vận tải Thương Mại Điện Tử Exxe có trách nhiệm tuân thủ Quy
          chế hiện hành khi thực hiện giao dịch trên dịch vụ vận tải Thương Mại Điện Tử Exxe.
        </p>
      </div>
    </StaticLayout>
  )
}

export default Regulations
