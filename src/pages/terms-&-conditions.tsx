/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import {
  conditionPageBg,
  QUY_CHE_DICH_VU_VAN_TAI_HANH_KHACH,
  QUY_CHE_HOAT_DONG
} from '@/assets'
import { Footer, Header, Seo, TabContent } from '@/components'
import { PHONE } from '@/helper'

const textClassName = 'text-sm md:text-base mb-12 font-medium'
const textClassNameSemibold = 'text-sm md:text-base mb-12 font-semibold md:font-semibold'
const titleClassName = 'text-16 md:text-18 lg:text-20 mb-12 font-medium'
const elementClassName = 'mb-24'

const Conditions = () => {
  return (
    <main>
      <Header />
      <div
        style={{ backgroundImage: `url(${conditionPageBg})` }}
        className="relative w-full h-[175px] lg:h-[500px] max-h-[500px] bg-center bg-no-repeat bg-cover"
      ></div>

      <Seo
        description="Công ty Cổ phần Đầu Tư Công Nghệ và Vận Tải ExxeVn hoạt động trên nền tảng ứng dụng cho thuê xe có tài xế 4-7-16 chỗ, theo mô hình kinh tế chia sẻ trực tuyến. Ra đời vào cuối năm 2022, Exxe mong muốn cung cấp dịch vụ Di chuyển đường dài và các hình thức đa dạng nhằm mang đến những trải nghiệm tốt nhất cho cả khách hàng và cả đối tác của Exxe. Sứ mệnh"
        thumbnailUrl=""
        title="Điều lệ & Điều khoản"
        url="terms-&-conditions"
      />

      <div className="container py-32 md:py-40 lg:py-[80px]">
        <TabContent data={data as any} />
      </div>

      <Footer />
    </main>
  )
}

export default Conditions

const data = [
  {
    title: 'Nguyên tắc cộng đồng',
    content: (
      <>
        <p className={textClassName}>
          Hãy đảm bảo rằng bạn luôn tuân thủ nghiêm chỉnh luật lệ giao thông Việt Nam. Khi
          di chuyển bằng xe ô tô, hãy luôn nhớ thắt dây an toàn dù bạn ngồi ghế trước hay
          ghế sau. Khi di chuyển bằng xe máy, hãy luôn đội nón bảo hiểm khi ngồi trên xe.
        </p>
        <p className={textClassName}>
          Đối tác tài xế có trách nhiệm cụ thể về vấn đề an toàn và tuyệt đối không thực
          hiện các hành vi cấm theo Điều Luật Giao Thông Đường Bộ trong các chuyến xe be
          như: không điều khiển phương tiện giao thông đường bộ mà trong cơ thể có chất ma
          túy, trong máu hoặc hơi thở có nồng độ cồn; không chạy quá tốc độ cho phép, lạng
          lách, đánh võng; không đe dọa, xúc phạm, tranh giành, lôi kéo hành khách; không
          bắt ép hành khách sử dụng dịch vụ ngoài ý muốn; không sử dụng điện thoại khi
          đang chạy xe (đối tác có thể dùng giá đỡ điện thoại để xem chỉ đường hay tai
          nghe bluetooth để nghe điện thoại).
        </p>
        <p className={textClassName}>
          Các đối tác tài xế không nên nhận chuyến trong tình trạng mệt mỏi và buồn ngủ.
          Hãy đảm bảo tình trạng sức khỏe tốt khi đang lái xe để đảm bảo an toàn tối đa.
        </p>
      </>
    )
  },
  {
    title: 'Chính sách bảo mật',
    content: (
      <>
        <p className={titleClassName}>
          CÁC QUY ĐỊNH VỀ AN TOÀN THÔNG TIN, CƠ CHẾ KIỂM TRA, GIÁM SÁT ĐỂ ĐẢM BẢO VIỆC
          CUNG CẤP THÔNG TIN VÀ QUẢN LÝ TRÊN SÀN GIAO DỊCH THƯƠNG MẠI ĐIỆN TỬ:
        </p>

        <div className={elementClassName}>
          <p className={titleClassName}>1. Mục đích sử dụng thông tin:</p>
          <p className={textClassName}>
            Thông tin cá nhân của Khách hàng chỉ được dùng trong những mục đích sau đây:
          </p>
          <ul>
            <li className={textClassName}>
              - Hỗ trợ việc đặt xe và cung cấp xe cho Khách hàng.
            </li>
            <li className={textClassName}>
              - Liên lạc với Khách hàng trong cho mục đích tiếp thị của Công ty.
            </li>
            <li className={textClassName}>
              - Nâng cao chất lượng dịch vụ và hỗ trợ Khách hàng.
            </li>
            <li className={textClassName}>
              - Giải quyết các sự vụ và tranh chấp phát sinh liên quan đến việc sử dụng
              dịch vụ
            </li>
            <li className={textClassName}>trên dịch vụ vận tải.</li>
            <li className={textClassName}>
              - Cung cấp thông tin cho các Cơ quan thực thi Pháp luật theo yêu cầu.
            </li>
            <li className={textClassName}>
              - Khi khách hàng đăng ký tài khoản ExxeVn, thông tin cá nhân mà chúng tôi
              thu thập bao gồm:
              <div className="mt-12 ml-12">
                <p>+ Tên đăng kí, số điện thoại: </p>
                <p>+ Email:</p>
              </div>
            </li>
          </ul>
        </div>

        <div className={elementClassName}>
          <p className={titleClassName}>2. Phạm vi sử dụng thông tin:</p>
          <p className={textClassName}>
            Công ty sử dụng thông tin Khách hàng cung cấp để:
          </p>

          <p className={textClassName}>
            - Gửi các thông báo về các hoạt động trao đổi thông tin giữa Khách hàng và
            Công ty.
          </p>
          <p className={textClassName}>
            - Ngăn ngừa các hoạt động phá hủy tài khoản người dùng của Khách hàng hoặc các
          </p>
          <p className={textClassName}>hoạt động giả mạo Khách hàng.</p>
          <p className={textClassName}>
            - Liên lạc và giải quyết với Khách hàng trong những trường hợp đặc biệt.
          </p>
          <p className={textClassName}>
            - Không sử dụng thông tin cá nhân của Khách hàng ngoài mục đích xác nhận và
            liên hệ có liên quan đến đặt xe và cung cấp xe.
          </p>
          <p className={textClassName}>
            - Trong trường hợp có yêu cầu của Pháp luật: Công ty có trách nhiệm hợp tác
            cung cấp thông tin cá nhân của Khách hàng khi có yêu cầu từ Cơ quan Tư pháp
            bao gồm: Viện kiểm sát, Tòa án, Cơ quan Công an điều tra liên quan đến hành vi
            vi phạm pháp luật nào đó của Khách hàng. Ngoài ra, không ai có quyền xâm phạm
            vào thông tin cá nhân của Khách hàng.
          </p>
        </div>

        <div className={elementClassName}>
          <p className={titleClassName}>3. Thời gian lưu trữ thông tin</p>
          <p className={textClassName}>
            - Dữ liệu cá nhân của Khách hàng sẽ được lưu trữ cho đến khi có yêu cầu hủy bỏ
            hoặc tự Khách hàng đăng nhập và thực hiện hủy bỏ. Còn lại trong mọi trường hợp
            thông tin cá nhân của Khách hàng sẽ được bảo mật trên máy chủ của Công ty.
          </p>
        </div>

        <div className={elementClassName}>
          <p className={titleClassName}>
            4. Những người hoặc tổ chức có thể được tiếp cận với thông tin
          </p>
          <p className={textClassName}>
            - Chỉ Cấp Quản Lý - Công ty Cổ Phần Đầu tư Công Nghệ và Vận Tải ExxeVn mới có
            quyền tiếp cận thông tin Khách hàng, hoặc Cơ quan Nhà nước có thẩm quyền khi
            được yêu cầu cung cấp thông tin.
          </p>
        </div>

        <div className={elementClassName}>
          <p className={titleClassName}>
            5. Địa chỉ của đơn vị thu thập và quản lý thông tin cá nhân
          </p>
          <ul>
            <p className={textClassName}>
              - Công ty Cổ Phần Đầu Tư Công Nghệ và Vận Tải ExxeVn
            </p>
            <p className={textClassName}>- MST: 0317412411</p>
            <p className={textClassName}>
              - Trụ sở chính: Số 2 Hoàng Thế Thiện, Phường An Lợi Đông, Tp. Thủ Đức,
              Tp.HCM.
            </p>
            <p className={textClassName}>- Số điện thoại: {PHONE}</p>
            <p className={textClassName}>- Email: info@exxe.vn - ExxeVn2022@gmail.com </p>
          </ul>
        </div>
      </>
    )
  },
  {
    title: 'Quy chế hoạt động',
    content: (
      <>
        <p className={`${titleClassName} text-center`}>
          CÁC QUY ĐỊNH VỀ AN TOÀN THÔNG TIN, CƠ CHẾ KIỂM TRA, GIÁM SÁT ĐỂ ĐẢM BẢO VIỆC
          CUNG CẤP THÔNG TIN VÀ QUẢN LÝ TRÊN SÀN GIAO DỊCH THƯƠNG MẠI ĐIỆN TỬ:
        </p>

        <div className={elementClassName}>
          <p className={titleClassName}>1. Mục đích sử dụng thông tin:</p>
          <p className={textClassName}>
            Thông tin cá nhân của Khách hàng chỉ được dùng trong những mục đích sau đây:
          </p>
          <ul className="">
            <li className={textClassName}>
              - Hỗ trợ việc đặt xe và cung cấp xe cho Khách hàng.
            </li>
            <li className={textClassName}>
              - Liên lạc với Khách hàng trong cho mục đích tiếp thị của Công ty.
            </li>
            <li className={textClassName}>
              - Nâng cao chất lượng dịch vụ và hỗ trợ Khách hàng.
            </li>
            <li className={textClassName}>
              - Giải quyết các sự vụ và tranh chấp phát sinh liên quan đến việc sử dụng
              dịch vụ trên dịch vụ vận tải.
            </li>
            <li className={textClassName}>
              - Cung cấp thông tin cho các Cơ quan thực thi Pháp luật theo yêu cầu.
            </li>

            <li className={textClassName}>
              - Khi khách hàng đăng ký tài khoản ExxeVn, thông tin cá nhân mà chúng tôi
              thu thập bao gồm:
              <div className="mt-12 ml-12">
                <p>+ Tên đăng kí, số điện thoại: </p>
                <p>+ Email:</p>
              </div>
            </li>
          </ul>
        </div>

        <div className={elementClassName}>
          <p className={titleClassName}>2. Phạm vi sử dụng thông tin:</p>

          <p className={textClassName}>
            Công ty sử dụng thông tin Khách hàng cung cấp để:
          </p>

          <ul>
            <li className={textClassName}>
              - Gửi các thông báo về các hoạt động trao đổi thông tin giữa Khách hàng và
              Công ty.
            </li>
            <li className={textClassName}>
              - Ngăn ngừa các hoạt động phá hủy tài khoản người dùng của Khách hàng hoặc
              các hoạt động giả mạo Khách hàng.
            </li>
            <li className={textClassName}>
              - Liên lạc và giải quyết với Khách hàng trong những trường hợp đặc biệt.
            </li>
            <li className={textClassName}>
              - Không sử dụng thông tin cá nhân của Khách hàng ngoài mục đích xác nhận và
              liên hệ có liên quan đến đặt xe và cung cấp xe.
            </li>
            <li className={textClassName}>
              - Trong trường hợp có yêu cầu của Pháp luật: Công ty có trách nhiệm hợp tác
              cung cấp thông tin cá nhân của Khách hàng khi có yêu cầu từ Cơ quan Tư pháp
              bao gồm: Viện kiểm sát, Tòa án, Cơ quan Công an điều tra liên quan đến hành
              vi vi phạm pháp luật nào đó của Khách hàng. Ngoài ra, không ai có quyền xâm
              phạm vào thông tin cá nhân của Khách hàng.
            </li>
          </ul>
        </div>

        <div className={elementClassName}>
          <p className={titleClassName}>3. Thời gian lưu trữ thông tin</p>

          <p className={textClassName}>
            - Dữ liệu cá nhân của Khách hàng sẽ được lưu trữ cho đến khi có yêu cầu hủy bỏ
            hoặc tự Khách hàng đăng nhập và thực hiện hủy bỏ. Còn lại trong mọi trường hợp
            thông tin cá nhân của Khách hàng sẽ được bảo mật trên máy chủ của Công ty.
          </p>
        </div>

        <div className={elementClassName}>
          <p className={titleClassName}>
            4. Những người hoặc tổ chức có thể được tiếp cận với thông tin
          </p>

          <p className={textClassName}>
            <span className="font-semibold">
              - Chỉ Cấp Quản Lý - Công ty Cổ Phần Đầu tư Công Nghệ và Vận Tải ExxeVn
            </span>{' '}
            mới có quyền tiếp cận thông tin Khách hàng, hoặc Cơ quan Nhà nước có thẩm
            quyền khi được yêu cầu cung cấp thông tin.
          </p>
        </div>

        <div className={elementClassName}>
          <p className={titleClassName}>
            5. Địa chỉ của đơn vị thu thập và quản lý thông tin cá nhân
          </p>

          <p className={textClassName}>
            Công ty sử dụng thông tin Khách hàng cung cấp để:
          </p>

          <ul>
            <li className={textClassName}>
              <span className="font-semibold">
                - Công ty Cổ Phần Đầu Tư Công Nghệ và Vận Tải ExxeVn
              </span>
            </li>
            <li className={textClassName}>
              <span className="font-semibold">- MST: 0317412411</span>
            </li>
            <li className={textClassName}>
              - Trụ sở chính: 27 Lưu Đình Lễ, Phương An Khánh, TP. Thủ Đức, Tp.HCM
            </li>
            <li className={textClassName}>
              - Số điện thoại:
              <span className="font-semibold">{PHONE}</span>
            </li>
            <li className={textClassName}>
              - Email:{' '}
              <span className="font-semibold">info@exxe.vn - ExxeVn2022@gmail.com</span>
            </li>
          </ul>
        </div>

        <div className={elementClassName}>
          <p className={titleClassName}>
            CƠ CHẾ GIẢI QUYẾT KHIẾU NẠI, TRANH CHẤP GIỮA CÁC BÊN LIÊN QUAN ĐẾN GIAO DỊCH
            TIẾN HÀNH TRÊN SÀN GIAO DỊCH THƯƠNG MẠI ĐIỆN TỬ:
          </p>
          <p className={textClassName}>
            Công ty và Tài xế có trách nhiệm tiếp nhận các khiếu nại và hỗ trợ Khách hàng
            liên quan đến các giao dịch được kết nối thông qua dịch vụ vận tải ExxeVn.
          </p>
          <p className={textClassName}>
            Các khiếu nại liên quan đến việc cung cấp, sử dụng dịch vụ đặt chuyến trên
            dịch vụ vận tải do Công ty chịu trách nhiệm độc lập giải quyết trên cơ sở quy
            định của pháp luật, Điều khoản và Điều kiện sử dụng dịch vụ, các thông báo,
            quy chế đã công bố với Thành viên (Khách hàng và Tài Xế).
          </p>
          <p className={textClassName}>
            Khi phát sinh tranh chấp, Công ty đề cao giải pháp thương lượng, hòa giải giữa
            các bên nhằm duy trì sự tin cậy của Thành viên vào chất lượng dịch vụ của dịch
            vụ vận tải .
          </p>
          <p className={titleClassName}>Khách hàng có thể thực hiện theo các bước sau:</p>

          <ul>
            <li className={`${textClassName} mb-12`}>
              <span className="font-semibold">Bước 1: </span>
              Khách hàng khiếu nại về dịch vụ qua số điện thoại 19004744 hoặc gửi email
              cho Bộ phận Chăm sóc Khách hàng tại địa chỉ Email: Exxevn2022@gmail.com.
              Thời gian để Công ty tiếp nhận khiếu nại là 3 ngày kể từ ngày sử dụng dịch
              vụ hoặc từ ngày phát sinh sự việc.
            </li>
            <li className={`${textClassName} mb-12`}>
              <span className="font-semibold">Bước 2: </span>
              Trong thời hạn ba (3) ngày làm việc kể từ khi tiếp nhận thông tin khiếu nại
              của Khách hàng, Bộ phận Chăm sóc Khách hàng xác nhận thông tin khiếu nại,
              tiến hành phân loại thông tin và thông báo cho Khách hàng:
              <p className="font-semibold ml-24 italic">
                2a. Ghi nhận các yêu cầu và các khiếu nại có liên quan đến Công ty và
                trong thời hạn khiếu nại.
              </p>
              <p className="font-semibold ml-24 italic">
                2b. Từ chối các yêu cầu, các khiếu nại không có liên quan đến Công ty và
                hết thời hạn khiếu nại.
              </p>
            </li>
            <li className={`${textClassName} mb-12`}>
              <span className="font-semibold">Bước 3: </span>
              Giải quyết vấn đề: Bộ phận Chăm sóc Khách hàng sẽ tiến hành xác minh, kiểm
              chứng và phân tích tính chất và mức độ của nội dung khiếu nại, phạm vi khiếu
              nại và trách nhiệm xử lý để phối hợp với Tài xế và Bên cung cấp dịch vụ thứ
              3 đưa ra biện pháp cụ thể để hỗ trợ Khách hàng giải quyết tranh chấp đó.
              <p className="font-semibold ml-24 italic">
                3a. Chuyển các vấn đề có liên quan trực tiếp đến Công ty cho các Bộ phận
                có liên quan kiểm tra và đối chiếu.
              </p>
              <p className="font-semibold ml-24 italic">
                3b. Chuyển các vấn đề có liên quan cho Tài xế giải quyết.
              </p>
              Trong thời hạn ba (3) ngày làm việc kể từ khi tiếp nhận thông báo về khiếu
              nại, Tài xế có trách nhiệm phối hợp với ExxeVn để giải quyết, xử lý khiếu
              nại. Tài xế sẽ thông báo cho Khách hàng biện pháp xử lý hoặc ủy quyền thông
              báo cho Công ty.
            </li>

            <li className={`${textClassName} mb-12`}>
              <span className="font-semibold">Bước 4: </span>
              Đóng khiếu nại:
              <p className="font-semibold ml-24 italic">
                4a. Khách hàng đồng ý với các phản hồi của Bộ phận Chăm sóc Khách hàng Kết
                thúc khiếu nại. Khách hàng không đồng ý, Quay lại bước 3
              </p>
              <p className="font-semibold ml-24 italic">
                4b. Theo dõi các giải quyết khiếu nại của Tài xế Kết thúc khiếu nại khi
                Khách hàng và Tài xế đã thỏa thuận xong.
              </p>
            </li>
          </ul>
          <p className={textClassName}>
            Khi nhận được thông báo về biện pháp xử lý từ Tài xế nhưng Khách hàng không
            đồng ý thì Công ty sẽ chủ trì việc thương lượng, hòa giải giữa Khách hàng và
            Tài xế để đi đến kết quả giải quyết phù hợp với cả hai bên.
          </p>
          <p className={textClassName}>
            Trong trường hợp Khách hàng và Tài xế không đi đến thỏa thuận chung hoặc Khách
            hàng không đồng ý với những biện pháp giải quyết cuối cùng của Tài xế và/hoặc
            nằm ngoài khả năng và thẩm quyền của Công ty thì Khách hàng hoặc Tài xế có thể
            nhờ đến Cơ quan Nhà nước có thẩm quyền can thiệp và giải quyết theo Pháp luật
            nhằm đảm bảo lợi ích hợp pháp của các bên.
          </p>
          <p className={textClassName}>
            Công ty tôn trọng và nghiêm túc thực hiện các quy định của Pháp luật về Bảo vệ
            quyền lợi của người dùng. Công ty khuyến nghị Khách hàng và Tài xế cung cấp
            chính xác, trung thực, chi tiết các thông tin cá nhân và nội dung đăng tin
            liên quan đến dịch vụ.
          </p>
          <p className={textClassName}>
            Chúng tôi cũng đề nghị Tài xế cần nghiêm túc tuân thủ các quy định của Pháp
            luật, cũng như có những hành vi phù hợp đối với Khách hàng.
          </p>
          <p className={textClassName}>
            Mọi hành vi lừa đảo, gian lận trong kinh doanh, gây tổn hại đến người khác đều
            bị lên án và phải chịu hoàn toàn trách nhiệm trước Pháp luật.
          </p>
          <p className={textClassName}>
            Các bên bao gồm Khách hàng và Tài xế sẽ phải có trách nhiệm tích cực trong
            việc giải quyết khiếu nại. Tài xế cần có trách nhiệm chủ động xử lý và cung
            cấp văn bản giấy tờ chứng thực thông tin liên quan đến sự việc đang có khiếu
            nại, tranh chấp với Khách hàng.
          </p>
          <p className={textClassName}>
            Công ty chỉ đóng vai trò hỗ trợ, phối hợp việc thương lượng, hòa giải và giải
            quyết khiếu nại giữ Khách hàng và Tài xế. Công ty cũng có trách nhiệm cung cấp
            những thông tin liên quan đến Khách hàng và Tài xế nếu được Tài xế hoặc Khách
            hàng hoặc Cơ quan Pháp luật có thẩm quyền yêu cầu. Sau khi Khách hàng và Tài
            xế đã giải quyết xong tranh chấp, cần có trách nhiệm báo lại cho Công ty để
            cập nhật tình hình.
          </p>
          <p className={textClassName}>
            Trong trường hợp giao dịch phát sinh mâu thuẫn mà lỗi thuộc về Tài xế: Công ty
            sẽ áp dụng các biện pháp xử lý vi phạm tương ứng bao gồm nhưng không giới hạn:
            cảnh cáo, khóa tài khoản hoặc chuyển cho Cơ quan Pháp luật có thẩm quyền tùy
            theo mức độ của sai phạm. Công ty sẽ chấm dứt và gỡ bỏ toàn bộ tin bài về sản
            phẩm, dịch vụ của Tài xế đó trên dịch vụ vận tải đồng thời yêu cầu Tài xế bồi
            hoàn cho Khách hàng thỏa đáng trên cơ sở thỏa thuận với Khách hàng.
          </p>
        </div>

        <div className={elementClassName}>
          <p className={titleClassName}>
            BIỆN PHÁP XỬ LÝ VI PHẠM ĐỐI VỚI NHỮNG NGƯỜI KHÔNG TU N THỦ QUY CHẾ HOẠT ĐỘNG
            CỦA SÀN GIAO DỊCH THƯƠNG MẠI ĐIỆN TỬ.
          </p>
          <p className={titleClassName}>Đình chỉ thủ công đối với các vi phạm sau:</p>
          <p className={titleClassName}>A. ĐỐI VỚI TÀI XẾ:</p>

          <ul>
            <li className={textClassName}>- Hành vi vi phạm chất lượng dịch vụ.</li>
            <li className={textClassName}>
              - Hành động liên quan đến việc Quấy rối tình dục với Khách hàng, Tài xế
              khác, nhân viên ExxeVn (bằng hành vi, qua văn bản, tin nhắn, điện thoại,
              email, mạng xã hội hoặc lời nói).
            </li>
            <li className={textClassName}>
              - Thực hiện hành vi vi phạm pháp luật nghiêm trọng, tội phạm.
            </li>
            <li className={textClassName}>
              - Tuyên truyền hoặc thuyết phục người khác truyền bá tin tức gian lận hoặc
              giả mạo, phỉ báng Khách hàng, Tài xế khác, Người Bán/ExxeVn, cán bộ, nhân
              viên ExxeVn trực tiếp hoặc thông qua các phương tiện truyền thông.
            </li>
            <li className={textClassName}>
              - Sử dụng dữ liệu và tài khoản giả để đăng ký tài khoản: bằng lái, CMND giả,
              Xe giấy tờ giả, sử dụng tài khoản bị chấm dứt...
            </li>
            <li className={textClassName}>
              - Tài khoản của Tài xế hoặc khách hàng có dấu hiệu bị tấn công, xâm nhập bởi
              bên thứ ba.
            </li>
            <li className={textClassName}>
              - Điều khiển phương tiện vụ ẩu, quá tốc độ quy định, không an toàn, gây tai
              nạn nghiêm trọng khi tham gia cung cấp dịch vụ.
            </li>
            <li className={textClassName}>
              - Phát tán thông tin số điện thoại, hình ảnh hoặc thông tin khác của Khách
              hàng, Tài xế khác bằng bất kỳ phương tiện nào (bao gồm cả mạng xã hội).
            </li>
            <li className={textClassName}>
              - Tài xế có hành vi xúc phạm danh dự, nhân phẩm, gây tổn hại đến Khách hàng,
              nhân viên ExxeVn.
            </li>
            <li className={textClassName}>
              - Tài xế sử dụng các chất kích thích, chất cồn ảnh hưởng đến an toàn chuyến
              đi khi cung cấp dịch vụ cho Khách hàng gây mất uy tín, hình ảnh, thương hiệu
              của ExxeVn.
            </li>
            <li className={textClassName}>
              - Bị phát hiện hoặc báo cáo là mang theo vũ khí sắc nhọn hoặc chất kích
              thích trong khi đang thực hiện đơn hàng.
            </li>
            <li className={textClassName}>
              - Tài xế có hành vi tranh cãi, khiêu khích đánh nhau (qua lời nói hoặc văn
              bản hoặc nhắn tin hoặc mạng xã hội) với khách hàng trong hoặc sau chuyến đi.
            </li>
            <li className={textClassName}>
              - Chạy sai xe (Không trùng biển số đăng ký) và sử dụng Xe mang biển số giả….
            </li>
            <li className={textClassName}>
              - Đánh Cãi nhau với Tài xế khác của ExxeVn trước mặt Khách hàng hoặc trong
              khu vực công cộng (Đang hoạt động/ Không hoạt động).
            </li>
            <li className={textClassName}>
              - Cản trở các Tài xế khác thực hiện các chuyến xe/đơn hàng của họ.
            </li>
            <li className={textClassName}>
              - Liên hệ với Khách hàng cho các vấn đề khác ngoài vấn đề đặt đơn hàng
              chuyến xe gây phiền nhiễu, nhằm quấy rối.
            </li>
            <li className={textClassName}>
              - Yêu cầu Khách hàng thanh toán thêm cước phí ngoài quy định (tiền boa, tiền
              giữ xe, tiền xăng...).
            </li>
            <li className={textClassName}>
              - Mang theo người lạ khi đang thực hiện chở khách….
            </li>
          </ul>
        </div>

        <div className={elementClassName}>
          <p className={titleClassName}>B. ĐỐI VỚI KHÁCH HÀNG:</p>
          <ul>
            <li className={textClassName}>
              - Xúc phạm danh dự, nhân phẩm, gây tổn hại đến với Tài xế (qua văn bản hoặc
              lời nói/tin nhắn/mạng xã hội) (vi phạm nặng: 1 lần sẽ bị khóa 7 ngày; vi
              phạm nhẹ: 2 lần sẽ bị khóa 7 ngày).
            </li>
            <li className={textClassName}>
              - Thực hiện hành vi phạm tội trong chuyến xe trong đơn hàng của ExxeVn.
            </li>
            <li className={textClassName}>
              - Tuyên truyền hoặc thuyết phục người khác truyền bá tin tức gian lận hoặc
              giả mạo, phi bảng ExxeVn trực tiếp hoặc thông qua các phương tiện truyền
              thông.
            </li>
            <li className={textClassName}>
              - Cố tình báo cáo, phản hồi thông tin không đúng sự thật gây ảnh hưởng xấu
              tới Tài xế của ExxeVn. Phát tán thông tin số điện thoại, hình ảnh hoặc thông
              tin khác của Tài xế/Khách hàng bằng bất kỳ phương tiện nào với mục đích xấu.
            </li>
            <li className={textClassName}>
              - Khách hàng có hành vi đe dọa tính mạng, sức khỏe, tài sản, xúc phạm danh
              dự, nhân phẩm Tài xế/nhân viên ExxeVn và người thân của họ.
            </li>
            <li className={textClassName}>
              - Đưa hàng hoá hoặc tiền hoặc lợi ích khác cho nhân viên của ExxeVn nhằm mục
              đích phá vỡ các quy tắc của ExxeVn. Bị phát hiện, báo cáo là có mang theo vũ
              khí hoặc ma túy trong chuyến đi.
            </li>
            <li className={textClassName}>
              - Khách hàng có hành vi đánh, dọa đánh, giết (qua lời nói hoặc văn bản hoặc
              tin nhắn, qua việc sử dụng các mạng xã hội) với Tài xế trước, trong hoặc sau
              chuyến đi.
            </li>
            <li className={textClassName}>
              - Không thanh toán tiền thanh toán không đủ tiền theo lệnh đặt xe/đơn hàng
              cho Tài xế ExxeVn.
            </li>
            <li className={textClassName}>
              - Liên hệ với Tài xế với mục đích lôi kéo qua các công ty đối thủ trước
              trong/sau chuyến đi (vi phạm 2 lần đối với 2 tài xế khác nhau).
            </li>
            <li className={textClassName}>
              - Khách hàng không liên lạc được hoặc số điện thoại không có thật.
            </li>
            <li className={textClassName}>
              - Khách hàng đợi Tài xế đến nơi rồi huỷ không liên lạc được. Khách hàng đặt
              nhiều chuyến 1 lúc rồi đi với Tài xế nào đến trước.
            </li>
            <li className={textClassName}>
              - Các hành vi khác vi phạm tiêu chuẩn Chất lượng Dịch vụ của Tài xế do
              ExxeVn quy định trong từng thời kỳ.
            </li>
            <li className={textClassName}>
              - Cấu kết với Tài xế của ExxeVn thực hiện chuyến xe/đơn hàng giả mạo hoặc
              các giao dịch bất thường trên ví thông qua hệ thống của ExxeVn nhằm trục lợi
              cho minh và/hoặc người khác.
            </li>
            <li className={textClassName}>
              - Cấu kết, giúp sức, thông đồng, thủ đoạn, hành vi khác cùng với Tài xế/
              Khách hàng khác tổ chức, cá nhân khác nhằm thực hiện các hành vi gian lận,
              lừa đảo, chiếm đoạt tài sản của ExxeVn/Tài xế. Các hành vi vi phạm pháp luật
              khác gây ảnh hưởng xấu/ có khả năng gây ảnh hương xấu nghiêm trọng đến hình
              ảnh, uy tín, thương hiệu của ExxeVn (theo đánh giá của ExxeVn).
            </li>
            <li className={textClassName}>
              - Khách hàng có tài khoản không hợp lệ. Lưu ý nếu khách hàng bị 3 lần cảnh
              cáo sẽ bằng 1 lần chấm dứt vĩnh viễn.
            </li>
          </ul>
        </div>

        <div className={elementClassName}>
          <p className={titleClassName}>
            BIỆN PHÁP XỬ LÝ VỚI CÁC HÀNH VI X M PHẠM QUYỀN LỢI NGƯỜI TIÊU DÙNG TRÊN SÀN
            GIAO DỊCH THƯƠNG MẠI ĐIỆN TỬ
          </p>
          <p className={`${textClassName} italic`}>
            * Tài xế sẽ từ chối phục vụ khi hành khách có những hàng hóa như sau:
          </p>
          <ul>
            <li className={textClassName}>
              - Rượu các loại; Thuốc lá điếu, xì gà và các dạng thuốc lá thành phẩm khác.
              Các loại pháo nổ, thuốc pháo nổ. Các chất ma túy. Thiết bị gây nhiễu thông
              tin di động tế bào. Đèn trời. Vũ khí quân dụng, trang thiết bị, kĩ thuật,
              khí tài, phương tiện chuyên dùng quân sự, công an, quân trang.
            </li>
            <li className={textClassName}>
              - Đồ chơi nguy hiểm, đồ chơi có hại tới giáo dục nhân cách và sức khỏe của
              trẻ em hoặc tới an ninh, trật tự, văn hóa xã hội (bao gồm cả các chương
              trình trò chơi điện tử).
            </li>
            <li className={textClassName}>
              - Các sản phẩm văn hóa phản động, đồi trụy, mê tín dị đoan hoặc có hại tới
              giáo dục thẩm mỹ, nhân cách. Di vật, cổ vật, bảo vật quốc gia thuộc di tích
              lịch sử văn hóa và danh lam thắng cảnh, thuộc sở hữu toàn dân, sở hữu của
              các tổ chức chính trị, tổ chức chính trị – xã hội. Hóa chất độc, tiền chất.
              Thuốc lá điếu, xì gà và các dạng thuốc lá thành phẩm khác nhập lậu.
            </li>
            <li className={textClassName}>
              - Thực vật, động vật hoang dã. Thủy sản cấm khai thác, thủy sản có dư lượng
              chất độc hại vượt quá giới hạn cho phép, thủy sản có yếu tố độc tự nhiên gây
              nguy hiểm đến tính mạng con người. Các loại thuốc chữa bệnh cho người, các
              loại vắc xin, sinh phẩm y tế, mỹ phẩm, hóa chất và chế phẩm diệt côn trùng,
              diệt khuẩn trong lĩnh vực gia dụng và y tế chưa được sử dụng tại Việt Nam.
            </li>
            <li className={textClassName}>
              - Các loại trang thiết bị y tế chưa được phép sử dụng tại Việt Nam. Các loại
              mỹ phẩm y tế chưa được công bố với cơ quan có thẩm quyền.
            </li>
            <li className={`${textClassName} italic font-semibold`}>
              ** Đối tác tài xế sẽ chịu trách nhiệm khi biết hành khách có mang các vật
              dụng và hàng hoá trên nhưng bao che, không khai báo với các cơ quan có thẩm
              quyền. Đối tác tài xế phải chịu trách nhiệm trước pháp luật.
            </li>
          </ul>
        </div>

        <div className={elementClassName}>
          <p className={titleClassName}>
            III. QUY CHẾ HOẠT ĐỘNG, SỬ DỤNG DỊCH VỤ VÀ PHƯƠNG THỨC THANH TOÁN
          </p>

          <p className={titleClassName}>1. Đối với khách hàng:</p>
          <ul className="list-disc ml-24">
            <li className={textClassName}>
              Mở website: http://www.Exxe.vn hoặc tải ứng dụng ExxeVn về thiết bị và cài
              đặt.
            </li>
            <li className={textClassName}>
              Đăng kí tài khoản: Khách hàng đăng kí tài khoản bằng số điện thoại cá nhân.
              Lưu ý: mỗi số điện thoại chỉ có thể đăng kí cho duy nhất 1 tài khoản.
            </li>
            <li className={textClassName}>
              Đặt chuyến xe: Hành khách chọn chuyến xe phù hợp với nhu cầu cá nhân, cung
              cấp đầy đủ thông tin chuyến xe theo yêu cầu của hệ thống.
            </li>
            <li className={textClassName}>
              Xác nhận thông tin chuyến: Khách hàng kiểm tra, xác nhận và hoàn tất thông
              tin chuyến đi.
            </li>
            <li className={textClassName}>
              Tiến hành đặt cọc: khách hàng sẽ đặt cọc 20% chuyến đi. Hình thức thanh toán
              gồm có: ví điện tử, chuyển khoản, trực tuyến, Visa, Master Card…
            </li>
            <li className={textClassName}>
              Hoàn thành đặt chuyến: Hệ thống xác nhận chuyến đi của bạn đã hoàn thành đặt
              chuyến, hãy đảm bảo bạn luôn sẵn sàng điện thoại để tài xế có thể liên lạc
              được với bạn về chuyến đi.
            </li>
            <li className={textClassName}>
              Giá cước chuyến đi đều đã bao gồm thuế VAT10%.
            </li>
            <li className={`${textClassName} italic`}>
              *** 20% phí đặt cọc là số tiền để xác nhận đảm bảo Khách hàng có nhu cầu
              chuyến đi. Sau khi hoàn tất chuyến, 20% đặt cọc này sẽ đc chuyển đến Tài
              khoản của Tài Xế.
            </li>
          </ul>
        </div>

        <div className={elementClassName}>
          <p className={titleClassName}>2. Đối với tài xế</p>
          <ul className="list-disc ml-24">
            <li className={textClassName}>
              Mở website: http://wwww.Exxe.vn hoặc tải ứng dụng ExxeDriver về thiết bị và
              cài đặt
            </li>
            <li className={textClassName}>
              Đăng kí tài khoản: đối tác đăng kí tài khoản bằng số điện thoại cá nhân.
              Cung cấp đầy đủ thông tin giấy tờ pháp lý. Lưu ý: mỗi số điện thoại chỉ có
              thể đăng kí cho duy nhất 1 tài khoản Tài Xế.
            </li>
            <li className={textClassName}>
              Lựa chọn chuyến: đối tác tài xế có thể chọn chuyến sẵn có hoặc tạo cuốc tiện
              chuyến. Nếu chọn cuốc tiện chuyến, hãy cung cấp thông tin theo yêu cầu của
              hệ thống.
            </li>
            <li className={textClassName}>
              Xác nhận thông tin chuyến: Đối tác Tài Xế kiểm tra lại thông tin chuyến đi.
              Tiến hành đặt cọc: đối tác Tài Xế sẽ đặt cọc 20% chuyến đi để nhận chuyến.
              (Hoặc nạp tiền vào Tài khoản để nhận chuyến đi).
            </li>

            <li className={textClassName}>
              Các hình thức thanh toán gồm có: ví điện tử, chuyển khoản, trực tuyến, Visa,
              Master Card…
            </li>
            <li className={textClassName}>
              Thực hiện chuyến đi: Sau khi nhận chuyến thành công, Đối tác liên hệ với
              hành khách nhằm xác nhận điểm đón (với chuyến có sẵn) hoặc đợi hệ thống ghép
              với khách hàng (với cuốc tiện chuyến)
            </li>
            <li className={textClassName}>
              <p className="font-semibold">
                CHÚ Ý: ExxeVnDriver thu phí dịch vụ 5% trên mỗi chuyến đi hoàn tất.
              </p>
            </li>
            <li className={textClassName}>
              Số tiền đặt cọc (20%) của khách hàng và (20%) của tài xế sẽ được chuyển về
              ví của tài xế sau khi Tài xế bấm xác nhận đã hoàn tất chuyến đi.
            </li>
            <li className={`${textClassName} italic`}>
              5% phí sử dụng dịch vụ ExxeVn sẽ đc trừ vào tk của Tài xế.
            </li>
            <li className={`${textClassName} italic`}>
              Tài xế có thể rút tiền từ ví ở ExxeVn về tài khoản ngân hàng của mình sau
              khi hoàn tất chuyến đi.
            </li>
            <li className={`${textClassName} italic`}>
              Số tiền rút về tài khoản sẽ được chuyển khoản trong vòng 24h làm việc.
            </li>
            <li className={`${textClassName} italic`}>
              *** 20% phí đặt cọc là số tiền để xác nhận đảm bảo Tài xế nhận chuyến đi.
              Sau khi hoàn tất chuyến, 20% đặc cọc này sẽ đc chuyển lại Ví của Tài Xế.
            </li>
          </ul>
        </div>

        <div className={elementClassName}>
          <p className={titleClassName}>
            CHÍNH SÁCH ÁP DỤNG CHUNG CHO CÁC GIAO DỊCH VẬN TẢI LIÊN QUAN ĐẾN VẤN ĐỀ CHẤT
            LƯỢNG, CHÍNH SÁCH HOÀN TIỀN, (QUY TRÌNH VÀ PHƯƠNG THỨC HOÀN TIỀN CHO KHÁCH
            HÀNG) TRONG TRƯỜNG HỢP SÀN GIAO DỊCH VẬN TẢI THƯƠNG MẠI ĐIỆN TỬ CÓ CHỨC NĂNG
            ĐẶT CHUYẾN TRỰC TUYẾN:
          </p>
          <p className={`${textClassName} font-semibold`}>
            Chính sách huỷ chuyến và hoàn cọc:
          </p>
          <p className={textClassName}>
            Tài xế trong trường hợp muốn hủy chuyến sau khi khách hàng đã đặt chuyến thành
            công, có thể thực hiện thao tác hủy chuyến trên ứng dụng{' '}
            <span className="font-semibold">ExxeVnDriver</span>.
          </p>
          <p className={textClassName}>
            Nhằm gia tăng sự cam kết của tài xế cũng như đảm bảo quyền lợi của khách hàng,
            trường hợp tài xế hủy chuyến (vì lí do xe hư/ không thể thực hiện được
            chuyến), nếu như không thỏa thuận được hoặc không có sự đồng ý từ phía khách
            hàng, thì tài xế phải bồi thường phí hủy chuyến cho khách hàng bằng đúng số
            tiền mà Tài Xế đã đặt cọc thông qua{' '}
            <span className="font-semibold">
              Công ty Cổ phần Đầu Tư Công Nghệ và Vận Tải ExxeVn.
            </span>
          </p>
          <p className={`${textClassName} font-semibold italic`}>
            Chính sách huỷ chuyến và chi phí hủy chuyến được tính như sau:
          </p>

          <table className="table-auto w-full border border-solid border-border-color-1">
            <thead>
              <tr className="text-left">
                <th className="border border-solid p-12 border-border-color-1">
                  Thời điểm hủy chuyến
                </th>
                <th className="border border-solid p-12 border-border-color-1">
                  Phí hủy chuyến
                </th>
                <th className="border border-solid p-12 border-border-color-1">
                  Đánh giá hệ thống
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="my-12 p-4">
                <td className="p-8 border border-solid border-border-color-1">
                  Trong vòng 1 giờ sau khi đặt cọc
                </td>
                <td className="p-8 border border-solid border-border-color-1">
                  0% Tiền cọc
                </td>
                <td className="p-8 border border-solid border-border-color-1">3*</td>
              </tr>
              <tr>
                <td className="p-8 border border-solid border-border-color-1">
                  Sau 60 phút ***
                </td>
                <td className="p-8 border border-solid border-border-color-1">
                  100% Tiền cọc
                </td>
                <td className="p-8 border border-solid border-border-color-1">5*</td>
              </tr>
            </tbody>
          </table>

          <p className={`${textClassName} font-semibold italic mt-24`}>
            Vi phạm chính sách Huỷ chuyến đi:
          </p>
          <p className={`${textClassName} font-semibold italic`}>
            *** Trường hợp Đối Tác Tài Xế phát sinh huỷ chuyến, ExxeVnDriver sẽ thu 50%
            tiền cọc của Tài Xế (10% cước phí của chuyến xe) và chuyển 50% số tiền đặt cọc
            (10% cước phí của chuyến xe) này cho khách hàng trong trường hợp không có Tài
            Xế khác nhận chuyến. (Trường hợp nếu có Tài Xế khác nhận chuyến thì 50% tiền
            đặt cọc (10% cước phí chuyến xe) sẽ được chuyển về TK của Tài Xế huỷ chuyến.
          </p>
          <p className={`${textClassName} font-semibold italic`}>
            *** Trường hợp Đối Tác Tài Xế huỷ chuyến ngoài quy định, chuyến đi của khách
            hàng sẽ là chuyến đi ưu tiên. ExxeVn sẽ tìm Đối tác tài xế mới trong thời gian
            sớm nhất để chuyến đi của khách hàng dc trọn vẹn.
          </p>
          <p className={`${textClassName} font-semibold italic`}>
            *** Và ngược lại, trường hợp Khách hàng huỷ chuyến dẫn đến phát sinh chi phí
            huỷ chuyến, ExxeVn sẽ thu 50% tiền đặt cọc (10% cước phí chuyến xe) và chuyển
            50% tiền cọc (10% cước phí chuyến xe) của khách hàng vào tài khoản của Tài Xế.
          </p>
          <p className={`${textClassName} font-semibold italic`}>
            *** Nhằm gia tăng sự cam kết của tài xế, cũng như đảm bảo quyền lợi của khách
            hàng: Đối tác và Khách hàng vui lòng liên lạc trước chuyến đi.
          </p>
        </div>

        <div className={elementClassName}>
          <p className={titleClassName}>
            QUYỀN VÀ NGHĨA VỤ CỦA THƯƠNG NH N, TỔ CHỨC CUNG CẤP DỊCH VỤ SÀN GIAO DỊCH
            THƯƠNG MẠI ĐIỆN TỬ EXXEVN:
          </p>

          <p className={`${textClassName} font-semibold`}>
            1/. Quyền và trách nhiệm của doanh nghiệp:
          </p>
          <p className={`${textClassName} font-semibold italic`}>
            * Đối với doanh nghiệp cung cấp dịch vụ sàn giao dịch vận tải thương mại điện
            tử (ExxeVn):
          </p>

          <p className={textClassName}>
            - Xây dựng và công bố công khai trên website quy chế hoạt động của sàn giao
            dịch vận tải thương mại điện tử; theo dõi và bảo đảm việc thực hiện quy chế đó
            trên sàn dịch vụ vận tải thương mại điện tử.
          </p>
          <p className={textClassName}>
            - Yêu cầu thương nhân, tổ chức, cá nhân là người sử dụng trên sàn dịch vụ vận
            tải thương mại điện tử cung cấp thông tin khi đăng ký sử dụng dịch vụ.
          </p>
          <p className={textClassName}>
            - Có cơ chế kiểm tra, giám sát để đảm bảo việc cung cấp thông tin của tài xế
            trên sàn giao dịch vận tải thương mại điện tử được thực hiện chính xác, đầy
            đủ.
          </p>
          <p className={textClassName}>
            - Lưu trữ thông tin đăng ký của các thương nhân, tổ chức, cá nhân tham gia
            dịch vụ vận tải thương mại điện tử và thường xuyên cập nhật những thông tin
            thay đổi, bổ sung có liên quan.
          </p>
          <p className={textClassName}>
            - Thiết lập cơ chế cho phép khách hàng, tổ chức, cá nhân tham gia sàn giao
            dịch vận tải thương mại điện tử thực hiện được quy trình giao kết hợp đồng
            trực tuyến nếu website có chức năng đặt chuyến đi trực tuyến.
          </p>
          <p className={textClassName}>
            - Áp dụng các biện pháp cần thiết để đảm bảo an toàn thông tin liên quan đến
            bí mật kinh doanh của khách hàng, tổ chức, cá nhân và thông tin cá nhân của
            người tiêu dùng.
          </p>
          <p className={textClassName}>
            - Có biện pháp xử lý kịp thời khi phát hiện hoặc nhận được phản ánh về hành vi
            kinh doanh vi phạm pháp luật trên sàn giao dịch vận tải thương mại điện tử.
          </p>
          <p className={textClassName}>
            - Hỗ trợ cơ quan quản lý nhà nước điều tra các hành vi kinh doanh vi phạm pháp
            luật, cung cấp thông tin đăng ký, lịch sử giao dịch và các tài liệu khác về
            đối tượng có hành vi vi phạm pháp luật trên sàn giao dịch vận tải thương mại
            điện tử.
          </p>
          <p className={textClassName}>
            - Công bố công khai cơ chế giải quyết các tranh chấp phát sinh trong quá trình
            giao dịch trên sàn giao dịch vận tải thương mại điện tử. Khi khách hàng trên
            sàn giao dịch vận tải thương mại điện tử phát sinh mâu thuẫn với tài xế hoặc
            bị tổn hại lợi ích hợp pháp, phải cung cấp cho khách hàng thông tin về tài xế,
            tích cực hỗ trợ khách hàng bảo vệ quyền và lợi ích hợp pháp của mình.
          </p>
          <p className={textClassName}>
            - Ngăn chặn và loại bỏ khỏi website những thông tin bán hàng hóa, dịch vụ
            thuộc danh mục hàng hóa, dịch vụ cấm kinh doanh theo quy định của pháp luật và
            hàng hóa hạn chế kinh doanh.
          </p>
          <p className={textClassName}>
            - Loại bỏ khỏi website những thông tin giấy tờ giả khách hàng, giả tài xế, vi
            phạm pháp luật khác khi phát hiện hoặc nhận được phản ánh có căn cứ xác thực
            về những thông tin này.
          </p>
          <p className={textClassName}>
            - Yêu cầu khách hàng không mang các hàng hóa, dịch vụ thuộc danh mục hàng hóa
            cấm, nhập lậu, phải cung cấp Giấy chứng nhận đủ điều kiện kinh doanh đối với
            hàng hóa, dịch vụ đó (trong trường hợp pháp luật quy định phải có Giấy chứng
            nhận đủ điều kiện kinh doanh).
          </p>

          <p className={`${textClassName} italic font-semibold`}>
            * Đối với doanh nghiệp cung cấp dịch vụ khuyến mại trực tuyến:
          </p>
          <p className={textClassName}>
            - Tuân thủ các quy định của Luật thương mại và các quy định pháp luật có liên
            quan về hoạt động khuyến mại.
          </p>
          <p className={textClassName}>
            - Tuân thủ các quy định của pháp luật về bảo vệ thông tin cá nhân của khách
            hàng.
          </p>
          <p className={textClassName}>
            - Thực hiện các quy định của pháp luật có liên quan nếu website có chức năng
            đặt hàng trực tuyến cho các phiếu mua hàng, phiếu sử dụng dịch vụ hoặc thẻ
            khách hàng thường xuyên; Website có chức năng thanh toán trực tuyến.
          </p>
          <p className={textClassName}>
            - Có cơ chế tiếp nhận, giải quyết các khiếu nại của khách hàng về chất lượng
            dịch vụ được khuyến mại hoặc dịch vụ dùng để khuyến mại.
          </p>
          <p className={textClassName}>
            - Chịu trách nhiệm của bên thứ ba trong việc cung cấp thông tin về dịch vụ cho
            người tiêu dùng theo quy định của Luật bảo vệ quyền lợi người tiêu dùng.
          </p>
          <p className={textClassName}>
            - Bồi thường cho khách hàng nếu sử dụng dịch vụ hoặc khách hàng thường xuyên
            bị đối tác từ chối trái với các điều kiện đã công bố trên website hoặc trên
            App <span className="font-semibold">ExxeVn</span> chính sử dụng dịch vụ.
          </p>
        </div>

        <div className={elementClassName}>
          <p className={`${textClassName} font-semibold`}>
            2. Quyền và trách nhiệm của doanh nghiệp, Hợp tác xã Vận tải:
          </p>

          <p className={`${textClassName}`}>
            - Ký thoả thuận hợp tác với ExxeVn và thực hiện đầy đủ các cam kết trong thoả
            thuận hợp tác, thanh toán chi phí hoặc chia sẻ kết quả kinh doanh sử dụng nền
            tảng kết nối theo thoả thuận giữa 2 bên.
          </p>
          <p className={`${textClassName}`}>
            - Xây dựng và cung cấp cho ExxeVn các căn cứ tính cước cho xe hợp đồng.
          </p>
          <p className={`${textClassName}`}>- Phối hợp với ExxeVn để thực hiện:</p>

          <div className="ml-24">
            <p className={`${textClassName}`}>
              a/. Hướng dẫn, cài đặt ứng dụng ExxeVn/ ExxeVnDriver vào thiết bị di động
              cho lái xe được doanh nghiệp, hợp tác xẽ uỷ quyền giao kết hợp đồng vận tải.
            </p>
            <p className={`${textClassName}`}>
              b/. Tổ chức tập huấn cho lái xe về cách thức vận hành ứng dụng kết nối. Điều
              kiện và tiêu chuẩn cung cấp dịch vụ, phương thức thanh toán và các nội dung
              khác nhằm nâng cao chất lượng đội ngũ lái xe.
            </p>
            <p className={`${textClassName}`}>
              c/. Đảm bảo tài xế và xe ô tô tham gia loại hình vận tải hành khách tuân thủ
              các quy định pháp luật có liên quan. Đồng thời cung cấp cho công ty đầy đủ
              giấy tờ chứng minh việc tuân thủ pháp luật này.
            </p>
            <p className={`${textClassName}`}>
              d/. Thông báo, từ chối hoặc chấm dứt việc cung cấp dịch vụ kết nối cho Tài
              xế hoặc xe ô tô không đáp ứng đầy đủ các điều kiện theo quy định của pháp
              luật hiện hành.
            </p>
            <p className={`${textClassName}`}>
              e/. Thực hiện đầy đủ quyền và nghĩa vụ theo quy định của pháp luật đối với
              loại hình kinh doanh vận tải hành khách bằng xe ô tô, bao gồm đảm bảo an
              toàn quyền và lợi ích hợp pháp cho hành khách, chất lượng xe, biển hiệu xe.
              Chất lượng xe. Chất lượng dịch vụ…. theo quy định của pháp luậthiện hành
              nhưng không giới hạn:
            </p>
          </div>

          <p className={`${textClassName}`}>
            - Niêm yết đầy đủ các thông tin theo quy định của pháp luật hiện hành đối với
            phương tiện.
          </p>
          <p className={`${textClassName}`}>
            - Thực hiện nghĩa vụ thuế, tài chính với các khoản doanh thu được nhận theo
            quy định của phấp luật và tuân thủ các quy định pháp luật liên quan đén loại
            hình kinh doanh vận tải hành khách bằng xe ô tô theo quy diijnh của pháp luật
            hiện hành.
          </p>
          <p className={`${textClassName}`}>
            Trường hợp vi phạm pháp luật hoặc vi phạm các điều kiện kinh doanh theo quy
            định của pháp luật hiện hành, bị buộc phải chấm dứt tham gia (nhưng chưa đến
            mức bị thu hồi giấy phép kinh doanh vận tải hành khách xe hợp đồng) sử dụng
            ứng dụng kết nối hợp đồng điện tử của ExxeVn.
          </p>
          <p className={`${textClassName}`}>
            -Bảo đảm sự tuân thủ các quy định của pháp luật về lao động, giao thông đường
            bộ về thời giờ làm việc, thời gian làm việc của Đối tác Tài Xế trong ngày,
            thời gian lái xe liên tục.
          </p>
        </div>

        <div className={elementClassName}>
          <p className={titleClassName}>
            QUYỀN VÀ NGHĨA VỤ CỦA NGƯỜI SỬ DỤNG APP DỊCH VỤ VẬN TẢI KHÁCH EXXEVN:
          </p>
          <p className={`${textClassName} italic font-semibold md:font-semibold`}>
            Quyền và trách nhiệm của đối tác hoặc khách hàng:
          </p>
          <p className={`${textClassName} italic font-semibold md:font-semibold`}>
            * Đối với khách hàng và Đối tác sử dụng website cung cấp dịch vụ vận tải
            thương mại điện tử:
          </p>
          <p className={`${textClassName}`}>
            - Cung cấp đầy đủ và chính xác các thông tin cho doanh nghiệp sở hữu website
            cung cấp dịch vụ sàn giao dịch thương mại điện tử khi đăng ký sử dụng dịch vụ:
          </p>
          <p className={`${textClassName}`}>
            + Tên và địa chỉ trụ sở của khách hàng, tổ chức hoặc tên và địa chỉ thường trú
            của cá nhân.
          </p>
          <p className={`${textClassName}`}>
            + Số, ngày cấp và nơi cấp giấy chứng nhận đăng ký kinh doanh của thương nhân,
            hoặc số, ngày cấp và đơn vị cấp quyết định thành lập của tổ chức, hoặc mã số
            thuế cá nhân của cá nhân.
          </p>
          <p className={`${textClassName}`}>
            + Số điện thoại hoặc một phương thức liên hệ trực tuyến khác.
          </p>
          <p className={`${textClassName}`}>
            - Cung cấp đầy đủ thông tin về chuyến đi (nơi đón và điểm đến cụ thể) để tài
            xế nắm rõ lộ trình.
          </p>
          <p className={`${textClassName}`}>
            - Đảm bảo tính chính xác, trung thực của thông tin về chuyến đi, dịch vụ cung
            cấp trên sàn giao dịch vận tải thương mại điện tử.
          </p>
          <p className={`${textClassName}`}>
            - Thực hiện các quy định của pháp luật khi ứng dụng chức năng đặt chuyến đi
            trực tuyến trên sàn giao dịch vận tải thương mại điện tử.
          </p>
          <p className={`${textClassName}`}>
            - Cung cấp thông tin về chuyến đi của mình khi có yêu cầu của cơ quan nhà nước
            có thẩm quyền để phục vụ hoạt động thống kê thương mại điện tử.
          </p>
          <p className={`${textClassName}`}>
            - Tuân thủ quy định của pháp luật về thanh toán, quảng cáo, khuyến mại, bảo vệ
            quyền sở hữu trí tuệ, bảo vệ quyền lợi người tiêu dùng và các quy định của
            pháp luật có liên quan khác khi chuyến đi hoàn tất dịch vụ trên sàn giao dịch
            vận tải thương mại điện tử.
          </p>
          <p className={`${textClassName} italic font-semibold md:font-semibold`}>
            - Thực hiện đầy đủ nghĩa vụ thuế theo quy định của pháp luật.
          </p>
          <p className={`${textClassName} italic font-semibold md:font-semibold`}>
            * Đối với khách hàng, tổ chức, cá nhân có chuyến đi được khuyến mại trên
            website cung cấp dịch vụ khuyến mại trực tuyến:
          </p>
          <p className={`${textClassName}`}>
            - Cung cấp thông tin chính xác, đầy đủ về chuyến đi, dịch vụ được khuyến mại.
          </p>
          <p className={`${textClassName}`}>
            - Thực hiện đúng các cam kết về chất lượng dịch vụ được khuyến mại theo như
            thông tin đã cung cấp.
          </p>

          <p className={`${textClassName} italic font-semibold md:font-semibold`}>
            * Đối với Đối Tác Tài Xế App ExxeVnDriver trên website trực tuyến
          </p>

          <p className={textClassName}>
            - Thông báo, niêm yết công khai, đầy đủ, chính xác các thông tin cần thiết
            liên quan đến chuyến đi.
          </p>
          <p className={textClassName}>- Công bố giá khởi điểm, mức giá chấp nhận.</p>
          <p className={textClassName}>- Chịu trách nhiệm về chất lượng dịch vụ.</p>
          <p className={textClassName}>
            - Giải quyết các khiếu nại của khách hàng về chất chuyến đi khuyến mại.
          </p>
          <p className={textClassName}>
            - Cung cấp đầy đủ thông tin về khuyến mãi trên sàn giao dịch vận tải thương
            mại điện tử.
          </p>
          <p className={textClassName}>
            - Đảm bảo tính chính xác, trung thực của thông tin về khuyến mãi, dịch vụ cung
            cấp trên sàn giao dịch thương mại điện tử.
          </p>
          <p className={textClassName}>
            - Thực hiện các quy định của pháp luật khi ứng dụng chức năng đặt hàng trực
            tuyến trên sàn giao dịch thương mại điện tử.
          </p>
          <p className={textClassName}>
            - Cung cấp thông tin về tình hình kinh doanh của mình khi có yêu cầu của cơ
            quan nhà nước có thẩm quyền để phục vụ hoạt động thống kê thương mại điện tử.
          </p>
          <p className={textClassName}>
            - Tuân thủ quy định của pháp luật về thanh toán, quảng cáo, khuyến mại, bảo vệ
            quyền sở hữu trí tuệ, bảo vệ quyền lợi người tiêu dùng và các quy định của
            pháp luật có liên quan khác.
          </p>

          <p className={`${textClassName} italic font-semibold md:font-semibold`}>
            - Thực hiện đầy đủ nghĩa vụ thuế theo quy định của pháp luật.
          </p>
        </div>

        <div className={elementClassName}>
          <p className={`${titleClassName} text-center`}>
            GIÁ CẢ DỊCH VỤ và PHỤ PHÍ, PHÍ PHÁT SINH:
          </p>

          <p className={textClassName}>
            <span className="font-semibold md:font-semibold">
              1. Giá cả Dịch vụ bao gồm:
            </span>{' '}
            cước vận tải, phụ phí nhu cầu cao và phí dịch vụ giá trị gia tăng được Hợp tác
            Xã cung cấp cho <span className="font-semibold md:font-semibold">ExxeVn</span>{' '}
            (nếu có) để tính cho từng cuốc xe (chuyến xe) được hiển thị trên ứng dụng{' '}
            <span className="font-semibold md:font-semibold">ExxeVn</span> để Khách Hàng
            biết trước khi quyết định gửi yêu cầu cung cấp Dịch vụ (thực hiện lệnh “Đặt
            xe” trên ứng dụng{' '}
            <span className="font-semibold md:font-semibold">ExxeVn</span>). Để hiểu rõ,
            trường hợp Khách Hàng đã tiến hành gửi yêu cầu Dịch vụ được hiểu là Khách Hàng
            đã chấp nhận Giá cả Dịch vụ của cuốc xe đó.
          </p>
          <p className={`${textClassName} font-semibold md:font-semibold`}>
            2. Giá cả Dịch vụ đã bao gồm 10% thuế giá trị gia tăng theo quy định pháp luật
            hiện hành.
          </p>
          <p className={textClassName}>
            <span className="font-semibold md:font-semibold">
              3. Giá cả Dịch vụ chưa bao gồm:
            </span>{' '}
            phí cầu đường, phà, bến bãi. Các phí/chi phí này không tính vào Giá cả Dịch vụ
            để tính chiết khấu thương mại, khuyến mại (nếu có). Khách Hàng hoặc Hành khách
            đi xe sẽ chi trả trực tiếp các khoản phí/chi phí này cho{' '}
            <span className="font-semibold md:font-semibold">Đối tác Tài Xế</span> theo
            thực tế phát sinh của từng cuốc xe. Trường hợp Khách Hàng, Hành khách không
            thanh toán trực tiếp bằng tiền mặt cho Lái xe và Khách Hàng lựa chọn thanh
            toán qua phương thức trả phụ phí trên ứng dụng{' '}
            <span className="font-semibold md:font-semibold">ExxeVn</span>,{' '}
            <span className="font-semibold md:font-semibold">ExxeVn</span> sẽ thực hiện
            việc thu hộ các khoản phí/chi phí này để thanh toán lại cho{' '}
            <span className="font-semibold md:font-semibold">Đối tác Tài Xế</span>.
          </p>
        </div>

        <div className={elementClassName}>
          <p className={`${titleClassName}`}>
            GIỚI HẠN TRÁCH NHIỆM CỦA THƯƠNG NHÂN, TỔ CHỨC CUNG CẤP DỊCH VỤ VÀ ĐIỀU KHOẢN
            ÁP DỤNG:
          </p>
          <p className={`${titleClassName}`}>
            PHÂN ĐỊNH TRÁCH NHIỆM CUNG CẤP CHỨNG TỪ DỊCH VỤ:
          </p>

          <p className={textClassName}>
            Tất cả dịch vụ mà{' '}
            <span className="font-semibold md:font-semibold">ExxeVn</span> tham gia hợp
            tác cung cấp dịch vụ cho khách hàng, tất cả chứng từ dịch vụ sẽ được{' '}
            <span className="font-semibold md:font-semibold">ExxeVn</span> gửi qua mail
            đến khách hàng.
          </p>
          <p className={`${textClassName} font-semibold md:font-semibold`}>
            Giới hạn trách nhiệm của ExxeVn đối với các giao dịch trên App vận tải Hành
            khách ExxeVn và Đối tác Tài Xế App ExxeVnDriver:
          </p>
          <p className={textClassName}>
            + Trừ trường hợp{' '}
            <span className="font-semibold md:font-semibold">ExxeVn</span> tham gia hợp
            tác dịch vụ cho khách hàng,{' '}
            <span className="font-semibold md:font-semibold">ExxeVn</span> chỉ chịu trách
            nhiệm hỗ trợ và hướng dẫn khách hàng thực hiện các khiếu nại, thắc mắc với Tài
            xế.
          </p>
          <p className={textClassName}>
            + Đối tác tài xế có trách nhiệm giải quyết triệt để khiếu nại của Khách hàng
            theo đúng các chính sách đã công bố và thông tin đầy đủ cho{' '}
            <span className="font-semibold md:font-semibold">ExxeVn</span> quá trình giải
            quyết khiếu nại.
          </p>
          <p className={textClassName}>
            Nếu có tranh chấp phát sinh giữa Người sử dụng dịch vụ và Đối tác tài xế thì
            các bên sẽ giải quyết trên cơ sở tự thoả thuận, thương lượng. Nếu vụ việc vượt
            quá thẩm quyền và khả năng của mình,{' '}
            <span className="font-semibold md:font-semibold">ExxeVn</span> sẽ đề nghị
            người bị vi phạm chuyển vụ việc cho các cơ quan chức năng có thẩm quyền. Trong
            trường hợp này, <span className="font-semibold md:font-semibold">ExxeVn</span>
            vẫn hỗ trợ để bảo vệ tốt nhất bên bị vi phạm.
          </p>
          <p className={textClassName}>
            Nếu có tranh chấp phát sinh liên quan đến việc sử dụng dịch vụ liên quan giữa
            Người sử dụng dịch vụ với{' '}
            <span className="font-semibold md:font-semibold">ExxeVn</span>, thì{' '}
            <span className="font-semibold md:font-semibold">ExxeVn</span> sẽ giải quyết
            vụ việc tuân thủ quy trình giải quyết tranh chấp, khiếu nại đã được công bố
            trên website:
            <span className="font-semibold md:font-semibold"> http://www.Exxe.vn</span> và
            theo quy định của pháp luật liên quan.
          </p>
        </div>

        <div className={elementClassName}>
          <p className={`${titleClassName}`}>ĐIỀU KHOẢN ÁP DỤNG</p>
          <p className={textClassName}>
            <span className="font-semibold md:font-semibold">
              {' '}
              1. Quy chế hoạt động dịch vụ Vận tải Thương Mại Điện Tử{' '}
            </span>
            <span className="font-semibold md:font-semibold">ExxeVn</span> được sửa đổi,
            bổ sung và có hiệu lực kể từ ngày 10/08/2023 và các lần sửa đổi, bổ sung sau
            đó.
          </p>
          <p className={textClassName}>
            2. Quy chế này được đăng tải công khai trên trang thông tin điện tử:
            <span className="font-semibold md:font-semibold">
              {' '}
              http://www.Exxe.vn
            </span>{' '}
            cho các thành và trên ứng dụng{' '}
            <span className="font-semibold md:font-semibold">ExxeVn</span> .
          </p>
          <p className={textClassName}>
            3. ExxeVn giữ quyền điều chỉnh, sửa đổi, bổ sung, chấm dứt từng phần Quy chế
            này (gọi chung là sửa đổi) cho phù hợp với thực tiễn hoạt động và quy định của
            pháp luật.
          </p>
          <p className={textClassName}>
            4. Khi có sửa đổi Quy chế thì được thông báo trước 05 ngày trên trang thông
            tin điện tử: http://www.Exxe.vn và trên ứng dụng{' '}
            <span className="font-semibold md:font-semibold">ExxeVn</span> cho các thành
            viên được biết. Quy chế sửa đổi có hiệu lực sau 05 ngày kể từ ngày có thông
            báo thay đổi hoặc kể từ thời điểm theo quy định của pháp luật.
          </p>
          <p className={textClassName}>
            5. Việc thành viên tiếp tục sử dụng dịch vụ, thực hiện các giao dịch qua dịch
            vụ vận tải Thương Mại Điện Tử{' '}
            <span className="font-semibold md:font-semibold">ExxeVn</span> sau khi Quy chế
            sửa đổi được công bố và thực thi đồng nghĩa với việc thành viên đã đọc, hiểu
            rõ, chấp thuận và đồng ý với Quy chế sửa đổi đó.
          </p>
          <p className={textClassName}>
            6. Thành viên tham gia Dịch vụ Vận tải Thương Mại Điện Tử{' '}
            <span className="font-semibold md:font-semibold">ExxeVn</span> có trách nhiệm
            tuân thủ Quy chế hiện hành khi thực hiện giao dịch trên dịch vụ vận tải Thương
            Mại Điện Tử <span className="font-semibold md:font-semibold">ExxeVn</span> .
          </p>
        </div>
      </>
    )
  },
  {
    title: 'Phạt vi phạm và bồi thường thiệt hại',
    content: (
      <>
        {/* {Object.entries(VI_PHAM_VA_BIEN_PHAP).map(([key, value]) => (
          <img key={key} src={value} alt="" />
        ))} */}
        <p className={`${titleClassName} text-center`}>
          BIỆN PHÁP XỬ LÝ VI PHẠM ĐỐI VỚI NHỮNG NGƯỜI KHÔNG TUÂN THỦ QUY CHẾ HOẠT ĐỘNG CỦA
          SÀN GIAO DỊCH THƯƠNG MẠI ĐIỆN TỬ.
        </p>

        <div className={elementClassName}>
          <p className={textClassName}>Đình chỉ thủ công đối với các vi phạm sau:</p>
          <p className={titleClassName}>A. ĐỐI VỚI TÀI XẾ:</p>
          <ul>
            <li className={textClassName}>- Hành vi vi phạm chất lượng dịch vụ.</li>
            <li className={textClassName}>
              - Hành động liên quan đến việc Quấy rối tình dục với Khách hàng, Tài xế
              khác, nhân viên ExxeVn (bằng hành vi, qua văn bản, tin nhắn, điện thoại,
              email, mạng xã hội hoặc lời nói).
            </li>
            <li className={textClassName}>
              - Thực hiện hành vi vi phạm pháp luật nghiêm trọng, tội phạm.
            </li>
            <li className={textClassName}>
              - Tuyên truyền hoặc thuyết phục người khác truyền bá tin tức gian lận hoặc
              giả mạo, phỉ báng Khách hàng, Tài xế khác, Người Bán/ExxeVn, cán bộ, nhân
              viên ExxeVn trực tiếp hoặc thông qua các phương tiện truyền thông.
            </li>
            <li className={textClassName}>
              - Sử dụng dữ liệu và tài khoản giả để đăng ký tài khoản: bằng lái, CMND giả,
              Xe giấy tờ giả, sử dụng tài khoản bị chấm dứt...
            </li>
            <li className={textClassName}>
              - Tài khoản của Tài xế hoặc khách hàng có dấu hiệu bị tấn công, xâm nhập bởi
              bên thứ ba.
            </li>
            <li className={textClassName}>
              - Điều khiển phương tiện vụ ẩu, quá tốc độ quy định, không an toàn, gây tai
              nạn nghiêm trọng khi tham gia cung cấp dịch vụ.
            </li>
            <li className={textClassName}>
              - Phát tán thông tin số điện thoại, hình ảnh hoặc thông tin khác của Khách
              hàng, Tài xế khác bằng bất kỳ phương tiện nào (bao gồm cả mạng xã hội).
            </li>
            <li className={textClassName}>
              - Tài xế có hành vi xúc phạm danh dự, nhân phẩm, gây tổn hại đến Khách hàng,
              nhân viên ExxeVn.
            </li>
            <li className={textClassName}>
              - Tài xế sử dụng các chất kích thích, chất cồn ảnh hưởng đến an toàn chuyến
              đi khi cung cấp dịch vụ cho Khách hàng gây mất uy tín, hình ảnh, thương hiệu
              của ExxeVn.
            </li>
            <li className={textClassName}>
              - Bị phát hiện hoặc báo cáo là mang theo vũ khí sắc nhọn hoặc chất kích
              thích trong khi đang thực hiện đơn hàng.
            </li>
            <li className={textClassName}>
              - Tài xế có hành vi tranh cãi, khiêu khích đánh nhau (qua lời nói hoặc văn
              bản hoặc nhắn tin hoặc mạng xã hội) với khách hàng trong hoặc sau chuyến đi.
            </li>
            <li className={textClassName}>
              - Chạy sai xe (Không trùng biển số đăng ký) và sử dụng Xe mang biển số giả….
            </li>
            <li className={textClassName}>
              - Đánh Cãi nhau với Tài xế khác của ExxeVn trước mặt Khách hàng hoặc trong
              khu vực công cộng (Đang hoạt động/ Không hoạt động).
            </li>
            <li className={textClassName}>
              - Cản trở các Tài xế khác thực hiện các chuyến xe/đơn hàng của họ.
            </li>
            <li className={textClassName}>
              - Liên hệ với Khách hàng cho các vấn đề khác ngoài vấn đề đặt đơn hàng
              chuyến xe gây phiền nhiễu, nhằm quấy rối.
            </li>
            <li className={textClassName}>
              - Yêu cầu Khách hàng thanh toán thêm cước phí ngoài quy định (tiền boa, tiền
              giữ xe, tiền xăng...).
            </li>
            <li className={textClassName}>
              - Mang theo người lạ khi đang thực hiện chở khách….
            </li>
          </ul>
        </div>

        <div className={elementClassName}>
          <p className={titleClassName}>B. ĐỐI VỚI KHÁCH HÀNG:</p>
          <ul>
            <li className={textClassName}>
              - Xúc phạm danh dự, nhân phẩm, gây tổn hại đến với Tài xế (qua văn bản hoặc
              lời nói/tin nhắn/mạng xã hội) (vi phạm nặng: 1 lần sẽ bị khóa 7 ngày; vi
              phạm nhẹ: 2 lần sẽ bị khóa 7 ngày).
            </li>
            <li className={textClassName}>
              - Thực hiện hành vi phạm tội trong chuyến xe trong đơn hàng của ExxeVn.
            </li>
            <li className={textClassName}>
              - Tuyên truyền hoặc thuyết phục người khác truyền bá tin tức gian lận hoặc
              giả mạo, phi bảng ExxeVn trực tiếp hoặc thông qua các phương tiện truyền
              thông.
            </li>
            <li className={textClassName}>
              - Cố tình báo cáo, phản hồi thông tin không đúng sự thật gây ảnh hưởng xấu
              tới Tài xế của ExxeVn. Phát tán thông tin số điện thoại, hình ảnh hoặc thông
              tin khác của Tài xế/Khách hàng bằng bất kỳ phương tiện nào với mục đích xấu.
            </li>
            <li className={textClassName}>
              - Khách hàng có hành vi đe dọa tính mạng, sức khỏe, tài sản, xúc phạm danh
              dự, nhân phẩm Tài xế/nhân viên ExxeVn và người thân của họ.
            </li>
            <li className={textClassName}>
              - Đưa hàng hoá hoặc tiền hoặc lợi ích khác cho nhân viên của ExxeVn nhằm mục
              đích phá vỡ các quy tắc của ExxeVn. Bị phát hiện, báo cáo là có mang theo vũ
              khí hoặc ma túy trong chuyến đi.
            </li>
            <li className={textClassName}>
              - Khách hàng có hành vi đánh, dọa đánh, giết (qua lời nói hoặc văn bản hoặc
              tin nhắn, qua việc sử dụng các mạng xã hội) với Tài xế trước, trong hoặc sau
              chuyến đi.
            </li>
            <li className={textClassName}>
              - Không thanh toán tiền thanh toán không đủ tiền theo lệnh đặt xe/đơn hàng
              cho Tài xế ExxeVn.
            </li>
            <li className={textClassName}>
              - Liên hệ với Tài xế với mục đích lôi kéo qua các công ty đối thủ trước
              trong/sau chuyến đi (vi phạm 2 lần đối với 2 tài xế khác nhau).
            </li>
            <li className={textClassName}>
              - Khách hàng không liên lạc được hoặc số điện thoại không có thật.
            </li>
            <li className={textClassName}>
              - Khách hàng đợi Tài xế đến nơi rồi huỷ không liên lạc được. Khách hàng đặt
              nhiều chuyến 1 lúc rồi đi với Tài xế nào đến trước.
            </li>
            <li className={textClassName}>
              - Các hành vi khác vi phạm tiêu chuẩn Chất lượng Dịch vụ của Tài xế do
              ExxeVn quy định trong từng thời kỳ.
            </li>
            <li className={textClassName}>
              - Cấu kết với Tài xế của ExxeVn thực hiện chuyến xe/đơn hàng giả mạo hoặc
              các giao dịch bất thường trên ví thông qua hệ thống của ExxeVn nhằm trục lợi
              cho minh và/hoặc người khác.
            </li>
            <li className={textClassName}>
              - Cấu kết, giúp sức, thông đồng, thủ đoạn, hành vi khác cùng với Tài xế/
              Khách hàng khác tổ chức, cá nhân khác nhằm thực hiện các hành vi gian lận,
              lừa đảo, chiếm đoạt tài sản của ExxeVn/Tài xế. Các hành vi vi phạm pháp luật
              khác gây ảnh hưởng xấu/ có khả năng gây ảnh hương xấu nghiêm trọng đến hình
              ảnh, uy tín, thương hiệu của ExxeVn (theo đánh giá của ExxeVn).
            </li>
            <li className={textClassName}>
              - Khách hàng có tài khoản không hợp lệ. Lưu ý nếu khách hàng bị 3 lần cảnh
              cáo sẽ bằng 1 lần chấm dứt vĩnh viễn.
            </li>
          </ul>
        </div>

        <div className={elementClassName}>
          <p className={titleClassName}>
            BIỆN PHÁP XỬ LÝ VỚI CÁC HÀNH VI XÂM PHẠM QUYỀN LỢI NGƯỜI TIÊU DÙNG TRÊN SÀN
            GIAO DỊCH THƯƠNG MẠI ĐIỆN TỬ
          </p>
          <p className={`${titleClassName} `}>
            * Tài xế sẽ từ chối phục vụ khi hành khách có những hàng hóa như sau:{' '}
          </p>
          <ul>
            <li className={textClassName}>
              - Rượu các loại; Thuốc lá điếu, xì gà và các dạng thuốc lá thành phẩm khác.
              Các loại pháo nổ, thuốc pháo nổ. Các chất ma túy. Thiết bị gây nhiễu thông
              tin di động tế bào. Đèn trời. Vũ khí quân dụng, trang thiết bị, kĩ thuật,
              khí tài, phương tiện chuyên dùng quân sự, công an, quân trang.
            </li>
            <li className={textClassName}>
              - Đồ chơi nguy hiểm, đồ chơi có hại tới giáo dục nhân cách và sức khỏe của
              trẻ em hoặc tới an ninh, trật tự, văn hóa xã hội (bao gồm cả các chương
              trình trò chơi điện tử).
            </li>
            <li className={textClassName}>
              - Các sản phẩm văn hóa phản động, đồi trụy, mê tín dị đoan hoặc có hại tới
              giáo dục thẩm mỹ, nhân cách. Di vật, cổ vật, bảo vật quốc gia thuộc di tích
              lịch sử văn hóa và danh lam thắng cảnh, thuộc sở hữu toàn dân, sở hữu của
              các tổ chức chính trị, tổ chức chính trị – xã hội. Hóa chất độc, tiền chất.
              Thuốc lá điếu, xì gà và các dạng thuốc lá thành phẩm khác nhập lậu.
            </li>
            <li className={textClassName}>
              - Thực vật, động vật hoang dã. Thủy sản cấm khai thác, thủy sản có dư lượng
              chất độc hại vượt quá giới hạn cho phép, thủy sản có yếu tố độc tự nhiên gây
              nguy hiểm đến tính mạng con người. Các loại thuốc chữa bệnh cho người, các
              loại vắc xin, sinh phẩm y tế, mỹ phẩm, hóa chất và chế phẩm diệt côn trùng,
              diệt khuẩn trong lĩnh vực gia dụng và y tế chưa được sử dụng tại Việt Nam.
            </li>
            <li className={textClassName}>
              - Các loại trang thiết bị y tế chưa được phép sử dụng tại Việt Nam. Các loại
              mỹ phẩm y tế chưa được công bố với cơ quan có thẩm quyền.
            </li>
          </ul>

          <p className={`${textClassName} text-14`}>
            ** Đối tác tài xế sẽ chịu trách nhiệm khi biết hành khách có mang các vật dụng
            và hàng hoá trên nhưng bao che, không khai báo với các cơ quan có thẩm quyền.
            Đối tác tài xế phải chịu trách nhiệm trước pháp luật.
          </p>
        </div>

        <div className={elementClassName}>
          <div className={elementClassName}>
            <p className={titleClassName}>1. Đối với khách hàng:</p>
            <ul>
              <li className={textClassName}>
                · Mở website: http://www.Exxe.vn hoặc tải ứng dụng ExxeVn về thiết bị và
                cài đặt.
              </li>
              <li className={textClassName}>
                · Đăng kí tài khoản: Khách hàng đăng kí tài khoản bằng số điện thoại cá
                nhân. Lưu ý: mỗi số điện thoại chỉ có thể đăng kí cho duy nhất 1 tài
                khoản.
              </li>
              <li className={textClassName}>
                · Đặt chuyến xe: Hành khách chọn chuyến xe phù hợp với nhu cầu cá nhân,
                cung cấp đầy đủ thông tin chuyến xe theo yêu cầu của hệ thống.
              </li>
              <li className={textClassName}>
                · Xác nhận thông tin chuyến: Khách hàng kiểm tra, xác nhận và hoàn tất
                thông tin chuyến đi.
              </li>
              <li className={textClassName}>
                · Tiến hành đặt cọc: khách hàng sẽ đặt cọc 20% chuyến đi. Hình thức thanh
                toán gồm có: ví điện tử, chuyển khoản, trực tuyến, Visa, Master Card…
              </li>
              <li className={textClassName}>
                · Hoàn thành đặt chuyến: Hệ thống xác nhận chuyến đi của bạn đã hoàn thành
                đặt chuyến, hãy đảm bảo bạn luôn sẵn sàng điện thoại để tài xế có thể liên
                lạc được với bạn về chuyến đi.
              </li>
              <li className={textClassName}>
                · Giá cước chuyến đi đều đã bao gồm thuế VAT10%.
              </li>
            </ul>
            <p className={`${textClassName} italic`}>
              *** 20% phí đặt cọc là số tiền để xác nhận đảm bảo Khách hàng có nhu cầu
              chuyến đi. Sau khi hoàn tất chuyến, 20% đặt cọc này sẽ đc chuyển đến Tài
              khoản của Tài Xế.
            </p>
          </div>

          <p className={titleClassName}>2. Đối với tài xế</p>
          <ul>
            <li className={textClassName}>
              · Mở website: http://wwww.Exxe.vn hoặc tải ứng dụng ExxeDriver về thiết bị
              và cài đặt
            </li>
            <li className={textClassName}>
              · Đăng kí tài khoản: đối tác đăng kí tài khoản bằng số điện thoại cá nhân.
              Cung cấp đầy đủ thông tin giấy tờ pháp lý. Lưu ý: mỗi số điện thoại chỉ có
              thể đăng kí cho duy nhất 1 tài khoản Tài Xế.
            </li>
            <li className={textClassName}>
              · Lựa chọn chuyến: đối tác tài xế có thể chọn chuyến sẵn có hoặc tạo cuốc
              tiện chuyến. Nếu chọn cuốc tiện chuyến, hãy cung cấp thông tin theo yêu cầu
              của hệ thống.
            </li>
            <li className={textClassName}>
              · Xác nhận thông tin chuyến: Đối tác Tài Xế kiểm tra lại thông tin chuyến
              đi.
            </li>
            <li className={textClassName}>
              · Tiến hành đặt cọc: đối tác Tài Xế sẽ đặt cọc 20% chuyến đi để nhận chuyến.
              (Hoặc nạp tiền vào Tài khoản để nhận chuyến đi).
            </li>
            <li className={textClassName}>
              · Các hình thức thanh toán gồm có: ví điện tử, chuyển khoản, trực tuyến,
              Visa, Master Card…
            </li>
            <li className={textClassName}>
              · Thực hiện chuyến đi: Sau khi nhận chuyến thành công, Đối tác liên hệ với
              hành khách nhằm xác nhận điểm đón (với chuyến có sẵn) hoặc đợi hệ thống ghép
              với khách hàng (với cuốc tiện chuyến)
            </li>
            <li className={textClassName}>
              · CHÚ Ý: ExxeVnDriver thu phí dịch vụ 5% trên mỗi chuyến đi hoàn tất.
            </li>
            <li className={textClassName}>
              · Số tiền đặt cọc (20%) của khách hàng và (20%) của tài xế sẽ được chuyển về
              ví của tài xế sau khi Tài xế bấm xác nhận đã hoàn tất chuyến đi.
            </li>
            <li className={textClassName}>
              · 5% phí sử dụng dịch vụ ExxeVn sẽ đc trừ vào tk của Tài xế.
            </li>
            <li className={textClassName}>
              · Tài xế có thể rút tiền từ ví ở ExxeVn về tài khoản ngân hàng của mình sau
              khi hoàn tất chuyến đi.
            </li>
            <li className={textClassName}>
              · Số tiền rút về tài khoản sẽ được chuyển khoản trong vòng 24h làm việc.
            </li>
            <li className={textClassName}>
              · *** 20% phí đặt cọc là số tiền để xác nhận đảm bảo Tài xế nhận chuyến đi.
              Sau khi hoàn tất chuyến, 20% đặc cọc này sẽ đc chuyển lại Ví của Tài Xế
            </li>
          </ul>
        </div>

        <div className={elementClassName}>
          <p className={titleClassName}>
            CHÍNH SÁCH ÁP DỤNG CHUNG CHO CÁC GIAO DỊCH VẬN TẢI LIÊN QUAN ĐẾN VẤN ĐỀ CHẤT
            LƯỢNG, CHÍNH SÁCH HOÀN TIỀN, (QUY TRÌNH VÀ PHƯƠNG THỨC HOÀN TIỀN CHO KHÁCH
            HÀNG) TRONG TRƯỜNG HỢP SÀN GIAO DỊCH VẬN TẢI THƯƠNG MẠI ĐIỆN TỬ CÓ CHỨC NĂNG
            ĐẶT CHUYẾN TRỰC TUYẾN:
          </p>
          <p className={titleClassName}>Chính sách huỷ chuyến và hoàn cọc: </p>
          <ul>
            <li className={textClassName}>
              · Tài xế trong trường hợp muốn hủy chuyến sau khi khách hàng đã đặt chuyến
              thành công, có thể thực hiện thao tác hủy chuyến trên ứng dụng ExxeVnDriver.
            </li>
            <li className={textClassName}>
              · Nhằm gia tăng sự cam kết của tài xế cũng như đảm bảo quyền lợi của khách
              hàng, trường hợp tài xế hủy chuyến (vì lí do xe hư/ không thể thực hiện được
              chuyến), nếu như không thỏa thuận được hoặc không có sự đồng ý từ phía khách
              hàng, thì tài xế phải bồi thường phí hủy chuyến cho khách hàng bằng đúng số
              tiền mà Tài Xế đã đặt cọc thông qua Công ty Cổ phần Đầu Tư Công Nghệ và Vận
              Tải ExxeVn.
            </li>
            <li className={`${textClassName} italic`}>
              · Chính sách huỷ chuyến và chi phí hủy chuyến được tính như sau:
            </li>

            <table className="table-auto w-full">
              <thead>
                <tr className="text-left">
                  <th className="">Thời điểm hủy chuyến</th>
                  <th className="">Phí hủy chuyến</th>
                  <th className="">Đánh giá hệ thống</th>
                </tr>
              </thead>
              <tbody>
                <tr className="my-12 p-4">
                  <td className="p-8">Trong vòng 1 giờ sau khi đặt cọc</td>
                  <td className="p-8">0% Tiền cọc</td>
                  <td className="p-8">3*</td>
                </tr>
                <tr>
                  <td className="p-8">Sau 60 phút ***</td>
                  <td className="p-8">100% Tiền cọc</td>
                  <td className="p-8">5*</td>
                </tr>
              </tbody>
            </table>
          </ul>

          <p className={`${textClassName} italic mt-24`}>
            Vi phạm chính sách Huỷ chuyến đi:
          </p>
          <p className={`${textClassName} italic`}>
            *** Trường hợp Đối Tác Tài Xế phát sinh huỷ chuyến, ExxeVnDriver sẽ trừ 100%
            tiền cọc của Tài Xế (20% cước phí của chuyến xe) và sẽ chuyển số tiền đặt cọc
            này cho khách hàng.
          </p>
          <p className={`${textClassName} italic`}>
            *** Và ngược lại, trường hợp khách hàng huỷ chuyến dẫn đến phát sinh chi phí
            huỷ chuyến, ExxeVn sẽ cộng 100% tiền đặt cọc của khách hàng vào tài khoản của
            Tài Xế.
          </p>
          <p className={`${textClassName} italic`}>
            *** Trường hợp Đối Tác Tài Xế huỷ chuyến ngoài quy định, chuyến đi của khách
            hàng sẽ là chuyến
          </p>
          <p className={`${textClassName} italic`}>
            đi ưu tiên. ExxeVn sẽ tìm Đối tác tài xế mới trong thời gian sớm nhất để
            chuyến đi của khách hàng được trọn vẹn.
          </p>
          <p className={`${textClassName} italic`}>
            *** Đối với trường hợp đi ghép, 20% đặt cọc của Tài Xế sẽ đc chia đều cho các
            khách hàng đặt chuyến thành công. *** Nhằm gia tăng sự cam kết của tài xế,
            cũng như đảm bảo quyền lợi của khách hàng: Đối tác và Khách hàng vui lòng liên
            lạc trước chuyến đi.
          </p>
        </div>
      </>
    )
  },
  {
    title: 'Hóa đơn dịch vụ vận tải',
    content: (
      <>
        <p className={titleClassName}>III. GIÁ CƯỚC PHÍ VÀ THANH TOÁN:</p>

        <div className={elementClassName}>
          <p className={titleClassName}>1. Các loại giá (phí) dịch vụ liên quan:</p>
          <p className={textClassName}>
            ExxeVn được Hợp tác xã cung cấp giá Cước (phí) vận chuyển tính toán dựa theo
            đơn giá cho từng ki lô mét của quãng đường vận chuyển và sẽ được hệ thống tự
            động tính toán, hiển thị trên ứng dụng ExxeVn khi Khách hàng đặt dịch vụ.
          </p>
          <p className={textClassName}>
            Trừ khi có quy định khác đi, Cước vận chuyển gồm: chi phí thuê xe, tiền nhiên
            liệu, tiền công Tài xế cho việc vận chuyển và các chi phi cần thiết khác để
            cung cấp dịch vụ. Đơn giá cước vận chuyển cụ thể sẽ được gửi thông báo tới
            khách hảng, tùy từng thời điểm.
          </p>
          <p className={textClassName}>Giá cước trên đã bao gồm 10% thuế VAT.</p>
          <p className={textClassName}>
            Gía Cước trên chưa bao gồm phí cầu đường, bến bãi và các phát sinh khác liên
            quan đến chuyến xe….
          </p>
          <p className={textClassName}>
            Phí sử dụng nền tảng là 5%(có thể thay đổi) của chuyến đi do ExxeVn ấn định,
            thu theo quyết định của ExxeVn từng thời điểm Các khoản giả (phí) khác có thể
            được áp dụng tùy từng thời điểm khi được thông báo đầy đủ, kịp thời cho các
            bên liên quan.
          </p>
        </div>

        <div className={elementClassName}>
          <p className={titleClassName}>2. Thanh toán</p>
          <p className={textClassName}>
            Khách hàng có thể lựa chọn phương thức thanh toán bằng tiền mặt hoặc không
            dùng tiền mặt cho Đơn hàng (Thẻ Ngân hàng, Thẻ tín dụng, Ví điện tử, ...).
          </p>
        </div>
        <div className={elementClassName}>
          <p className={titleClassName}>3. Hóa đơn</p>
          <p className={textClassName}>
            Hóa đơn cho dịch vụ vận chuyển, phí sử dụng nền tảng được ExxeVn đại diện cung
            cấp cho Khách hàng (Theo yêu cầu của Khách hàng). ExxeVn sẽ xuất hóa đơn với
            tên Hành khách theo quy định pháp luật hiện hành. Hóa đơn do ExxeVn xuất là
            hóa đơn điện tử.
          </p>
          <p className={textClassName}>
            Để nhận hóa đơn, chứng từ liên quan đến cuốc xe, Khách hàng phải chọn nhập
            thông tin hóa đơn qua ứng dụng ExxeVn khi đặt dịch vụ để hệ thống ghi nhận.
            Nếu Khách hàng không chọn nhập thông tin yêu cầu hóa đơn qua ứng dụng ExxeVn,
            thời gian tối đa ExxeVn hỗ trợ xuất hóa đơn cho Khách hàng là 7 (bảy) ngày.
          </p>
          <ul>
            <li className={textClassName}>
              – ExxeVn có trách nhiệm lập hóa đơn tài chính cho Khách hàng khi có yêu cầu
              hoặc theo quy định của pháp luật đối với Doanh thu dịch vụ vận tải (Kết quả
              kinh doanh) được phân chia của ExxeVn theo hợp đồng hợp tác đã ký kết.
            </li>
            <li className={textClassName}>
              – Đối Tác Tài Xế ủy nhiệm cho ExxeVn lập hóa đơn tài chính cho Khách hàng
              khi có yêu cầu hoặc theo quy định của pháp luật đối với Doanh thu dịch vụ
              vận tải (Kết quả kinh doanh) được phân chia của Đối Tác Tài Xế theo hợp đồng
              hợp tác đã ký kết.
            </li>
            <li className={textClassName}>
              – Số tiền khuyến mại cho Khách hàng sẽ được tính và ghi nhận trên hóa đơn
              tài chính được ExxeVn cung cấp cho Khách hàng theo chương trình khuyến mại
              mà ExxeVn thực hiện và đăng ký với Bộ Công Thương, theo đó, số tiền chiết
              khấu thương mại, giảm giá được thể hiện trên hóa đơn tài chính được trừ vào
              phần doanh thu được phân chia của ExxeVn và Đối Tác Tài Xế không bị trừ bất
              kỳ chi phí nào từ số tiền khuyến mại này.
            </li>
          </ul>
        </div>

        <div className={elementClassName}>
          <p className={titleClassName}>
            4. Thanh toán giữa ExxeVn với Tài xế, Đơn vị vận tải
          </p>
          <p className={textClassName}>
            Sau khi hoàn tất chuyến đi. Số tiền đặt cọc 20% của Khách hàng và 20% tiền cọc
            của Tài Xế sẽ được chuyển về tài khoản của Tài Xế (40% số tiền). Lúc này
            ExxeVnDriver sẽ thu 5% (có thể thay đổi) phí nền tảng sử dụng dịch vụ.
          </p>
          <p className={textClassName}>
            ExxeVnDriver thu 5%(có thể thay đổi) chi phí chuyến xe khi Giao dịch hoàn tất
            (Hoàn tất chuyến xe).
          </p>
        </div>

        <div className={elementClassName}>
          <p className={titleClassName}>
            5. Các khoản nghĩa vụ tài chính, thuế của Lái xe:
          </p>
          <ul>
            <li className={textClassName}>
              – Đối Tác Tài Xế có tổng doanh thu kinh doanh trong năm dương lịch trên 100
              triệu đồng (gọi tắt là: “Doanh thu tính thuế”) thì phải khai thuế giá trị
              gia tăng, thuế thu nhập cá nhân.
            </li>
            <li className={textClassName}>
              – Tỷ lệ thuế tính trên doanh thu áp dụng đối với cá nhân kinh doanh ngành
              nghề vận tải theo quy định hiện hành như sau: (i) Tỷ lệ thuế giá trị gia
              tăng là 3% tính trên doanh thu được phân chia cho Đối Tác Tài Xế theo hợp
              đồng HTKD (có thể thay đổi theo quy định của cơ quan thuế ban hành). (ii) Tỷ
              lệ thuế thu nhập cá nhân là 1,5% tính trên doanh thu được phân chia cho Đối
              Tác Tài Xế theo hợp đồng HTKD (có thể thay đổi theo quy định của cơ quan
              thuế ban hành) . (iii) Đối với các khoản tiền thưởng khuyến khích theo doanh
              thu thì không tính thuế giá trị gia tăng, thuế thu nhập cá nhân là 1% tính
              trên tiền thưởng nhận được. (iv) Đối với các khoản tiền thưởng chất lượng,
              hỗ trợ khác nếu có mức từ 02 triệu đồng/lần trở lên thì thuế thu nhập cá
              nhân là 10% tính trên tiền thưởng/tiền hỗ trợ.
            </li>
            <li className={textClassName}>
              – Đối Tác Tài Xế ủy nhiệm vô điều kiện, không hủy ngang cho ExxeVn khai thuế
              và nộp thuế thay cho Đối Tác Tài Xế đối với Kết quả kinh doanh được phân
              chia của TÀI XẾ theo hợp đồng HTKD; các khoản khuyến khích, hỗ trợ, thưởng
              kinh doanh khác (nếu có) Đối Tác Tài Xế nhận được trong quá trình hợp tác
              kinh doanh với ExxeVn (gọi chung là: “Nghĩa Vụ Tài Chính’’).
            </li>
            <li className={textClassName}>
              – Đối Tác Tài Xế ủy quyền vô điều kiện, không hủy ngang cho ExxeVn thay mặt
              và nhân danh Đối Tác Tài Xế để làm việc với cơ quan thuế về việc tiến hành
              các thủ tục lập tờ khai, trích, nộp thuế, lệ phí và nghĩa vụ tài chính khác
              của Đối Tác Tài Xế phải nộp phát sinh từ hợp đồng Hợp tác.
            </li>
            <li className={textClassName}>
              – ExxeVn có quyền và nghĩa vụ tạm trích và giữ lại để nộp thay cho Đối Tác
              Tài Xế về các Nghĩa Vụ Tài Chính đối với Kết quả kinh doanh được phân chia
              của Đối Tác Tài Xế theo hợp đồng HTKD của mỗi chuyến xe hoàn thành qua ứng
              dụng ExxeVn và các Nghĩa Vụ Tài Chính tính trên các khoản thưởng, khuyến
              khích, hỗ trợ khác của Đối Tác Tài Xế nhận được trong quá trình hợp tác kinh
              doanh với ExxeVn.
            </li>
            <li className={textClassName}>
              – Đến hết năm tài chính, (Tính từ ngày 01/01 đến hết 31/12), nếu doanh thu
              được phân chia cho Đối Tác Tài Xế theo hợp đồng hợp tác lũy kế chưa đạt mức
              Doanh thu tính thuế đối với cá nhân kinh doanh theo quy định của pháp luật
              hiện hành thì ExxeVn sẽ hoàn trả cho Đối Tác Tài Xế số tiền thuế tạm trích
              và giữ lại theo quy định của pháp luật.
            </li>
            <li className={textClassName}>
              – Trong năm tài chính, (Tính từ ngày 01/01 đến hết 31/12), nếu doanh thu
              được phân chia cho Đối Tác Tài Xế theo hợp đồng hợp tác lũy kế đạt mức Doanh
              thu tính thuế đối với cá nhân kinh doanh theo quy định của pháp luật hiện
              hành thì ExxeVn có trách nhiệm khai thuế và nộp thay thuế kịp thời và đầy đủ
              theo quy định của pháp luật hiện hành.
            </li>
            <li className={textClassName}>
              – Khi quy định của pháp luật thay đổi về nghĩa vụ tài chính, mức thuế, phí,
              lệ phí phải nộp cho nhà nước thì ExxeVn có quyền trích giữ lại, thay đổi tỷ
              lệ trích cho phù hợp mà không cần phải có sự chấp thuận của Đối Tác Tài Xế
              nhưng sẽ thông báo kịp thời cho Đối Tác Tài Xế biết trước khi thực hiện.
            </li>
          </ul>
        </div>

        <div className={elementClassName}>
          <p className={titleClassName}>6. Đăng ký và cung cấp mã số thuế cá nhân:</p>
          <p className={textClassName}>
            Đối Tác Tài Xế khi tham gia hợp tác kinh doanh với ExxeVn có trách nhiệm tự
            mình thực hiện thủ tục đăng ký thuế để được cấp mã số thuế theo quy định của
            pháp luật về quản lý thuế. ExxeVn có quyền, nhưng không có nghĩa vụ thực hiện
            việc đăng ký mã số thuế cá nhân thay cho Đối Tác Tài Xế.
          </p>
        </div>
      </>
    )
  },
  {
    title: 'Tỉ lệ phân chia và hợp tác kinh doanh',
    content: (
      <>
        <p className={textClassName}>
          Tỉ lệ phân chia kết quả hợp tác kinh doanh theo Hợp Đồng:
        </p>
        <ul className="">
          <li className={textClassName}>
            - Đối tác Tài Xế được phân chia 95% (có thể thay đổi) doanh thu dịch vụ vận
            tải hành khách (đã bao gồm 10% thuế giá trị gia tăng) thực tế của từng chuyến
            xe.
          </li>
          <li className={textClassName}>
            - ExxeVnDriver được phân chia 5%(có thể thay đổi) của doanh thu dịch vụ vận
            tải hành khách (đã bao gồm 10% thuế giá trị gia tăng thực tế của từng chuyến
            xe).
          </li>
          <li className={textClassName}>
            - Tỉ lệ phân chia kết quả kinh doanh cho doanh nghiệp/HTX vận tải mà Phương
            tiện mang phù hiệu của đơn vị sẽ đc ExxeVnDriver quyết định căn cứ vào phạm vi
            trách nhiệm hợp tác theo hợp đồng hợp tác ký kết.
          </li>
          <li className={textClassName}>
            - Đối với phí sử dụng ứng dụng, ExxeVn được quyền thu phí sử dụng Phần mềm ứng
            dụng hỗ trợ kết nối vận tải (App ExxeVn) đối với Khách hàng mà không phải phân
            chia cho Đối tác Tài Xế.
          </li>
        </ul>
      </>
    )
  },
  {
    title: 'Quy chế Dịch vụ & Điều khoản sử dụng',
    content: (
      <>
        {Object.entries(QUY_CHE_DICH_VU_VAN_TAI_HANH_KHACH).map(([key, value]) => (
          <img key={key} src={value} alt="" />
        ))}
      </>
    )
  },
  {
    title: 'Giải quyết khiếu nại',
    content: (
      <>
        <p className={titleClassName}>
          CƠ CHẾ GIẢI QUYẾT KHIẾU NẠI, TRANH CHẤP GIỮA CÁC BÊN LIÊN QUAN ĐẾN GIAO DỊCH
          TIẾN HÀNH TRÊN SÀN GIAO DỊCH THƯƠNG MẠI ĐIỆN TỬ:{' '}
        </p>
        <p className={textClassName}>
          Công ty và Tài xế có trách nhiệm tiếp nhận các khiếu nại và hỗ trợ Khách hàng
          liên quan đến các giao dịch được kết nối thông qua dịch vụ vận tải ExxeVn.
        </p>
        <p className={textClassName}>
          Các khiếu nại liên quan đến việc cung cấp, sử dụng dịch vụ đặt chuyến trên dịch
          vụ vận tải do Công ty chịu trách nhiệm độc lập giải quyết trên cơ sở quy định
          của pháp luật, Điều khoản và Điều kiện sử dụng dịch vụ, các thông báo, quy chế
          đã công bố với Thành viên (Khách hàng và Tài Xế). Khi phát sinh tranh chấp, Công
          ty đề cao giải pháp thương lượng, hòa giải giữa các bên nhằm duy trì sự tin cậy
          của Thành viên vào chất lượng dịch vụ của dịch vụ vận tải .
        </p>
        <p className={textClassName}>Khách hàng có thể thực hiện theo các bước sau:</p>

        <ul>
          <li className={textClassName}>
            <span className="font-semibold">• Bước 1: </span>
            Khách hàng khiếu nại về dịch vụ qua số điện thoại 084 7878788 hoặc gửi email
            cho Bộ phận Chăm sóc Khách hàng tại địa chỉ Email: Exxevn2022@gmail.com. Thời
            gian để Công ty tiếp nhận khiếu nại là 3 ngày kể từ ngày sử dụng dịch vụ hoặc
            từ ngày phát sinh sự việc.
          </li>
          <li className={textClassName}>
            <span className="font-semibold">• Bước 2: </span>
            Trong thời hạn ba (3) ngày làm việc kể từ khi tiếp nhận thông tin khiếu nại
            của Khách hàng, Bộ phận Chăm sóc Khách hàng xác nhận thông tin khiếu nại, tiến
            hành phân loại thông tin và thông báo cho Khách hàng:
            <p className="font-semibold ml-40">
              2a. Ghi nhận các yêu cầu và các khiếu nại có liên quan đến Công ty và trong
              thời hạn khiếu nại.
            </p>
            <p className="font-semibold ml-40">
              2b. Từ chối các yêu cầu, các khiếu nại không có liên quan đến Công ty và hết
              thời hạn khiếu nại.
            </p>
          </li>
          <li className={textClassName}>
            <p className="font-semibold">• Bước 3: Giải quyết vấn đề:</p> Bộ phận Chăm sóc
            Khách hàng sẽ tiến hành xác minh, kiểm chứng và phân tích tính chất và mức độ
            của nội dung khiếu nại, phạm vi khiếu nại và trách nhiệm xử lý để phối hợp với
            Tài xế và Bên cung cấp dịch vụ thứ 3 đưa ra biện pháp cụ thể để hỗ trợ Khách
            hàng giải quyết tranh chấp đó.
            <p className="font-semibold ml-40">
              3a. Chuyển các vấn đề có liên quan trực tiếp đến Công ty cho các Bộ phận có
              liên quan kiểm tra và đối chiếu.
            </p>
            <p className="font-semibold ml-40">
              3b. Chuyển các vấn đề có liên quan cho Tài xế giải quyết. Trong thời hạn ba
              (3) ngày làm việc kể từ khi tiếp nhận thông báo về khiếu nại, Tài xế có
              trách nhiệm phối hợp với ExxeVn để giải quyết, xử lý khiếu nại. Tài xế sẽ
              thông báo cho Khách hàng biện pháp xử lý hoặc ủy quyền thông báo cho Công
              ty.
            </p>
          </li>
          <li className={textClassName}>
            <p className="font-semibold">• Bước 4: Đóng khiếu nại:</p>
            <p className={`${textClassName} ml-40 font-semibold`}>
              4a. Khách hàng đồng ý với các phản hồi của Bộ phận Chăm sóc Khách hàng  Kết
              thúc khiếu nại. Khách hàng không đồng ý  Quay lại bước 3
            </p>
            <p className={`${textClassName} ml-40 font-semibold`}>
              4b. Theo dõi các giải quyết khiếu nại của Tài xế  Kết thúc khiếu nại khi
              Khách hàng và Tài xế đã thỏa thuận xong.
            </p>
            <p className={textClassName}>
              Khi nhận được thông báo về biện pháp xử lý từ Tài xế nhưng Khách hàng không
              đồng ý thì Công ty sẽ chủ trì việc thương lượng, hòa giải giữa Khách hàng và
              Tài xế để đi đến kết quả giải quyết phù hợp với cả hai bên.
            </p>
            <p className={textClassName}>
              Trong trường hợp Khách hàng và Tài xế không đi đến thỏa thuận chung hoặc
              Khách hàng không đồng ý với những biện pháp giải quyết cuối cùng của Tài xế
              và/hoặc nằm ngoài khả năng và thẩm quyền của Công ty thì Khách hàng hoặc Tài
              xế có thể nhờ đến Cơ quan Nhà nước có thẩm quyền can thiệp và giải quyết
              theo Pháp luật nhằm đảm bảo lợi ích hợp pháp của các bên.
            </p>
            <p className={textClassName}>
              Công ty tôn trọng và nghiêm túc thực hiện các quy định của Pháp luật về Bảo
              vệ quyền lợi của người dùng. Công ty khuyến nghị Khách hàng và Tài xế cung
              cấp chính xác, trung thực, chi tiết các thông tin cá nhân và nội dung đăng
              tin liên quan đến dịch vụ.
            </p>
            <p className={textClassName}>
              Chúng tôi cũng đề nghị Tài xế cần nghiêm túc tuân thủ các quy định của Pháp
              luật, cũng như có những hành vi phù hợp đối với Khách hàng.
            </p>
            <p className={textClassName}>
              Mọi hành vi lừa đảo, gian lận trong kinh doanh, gây tổn hại đến người khác
              đều bị lên án và phải chịu hoàn toàn trách nhiệm trước Pháp luật.
            </p>
            <p className={textClassName}>
              Các bên bao gồm Khách hàng và Tài xế sẽ phải có trách nhiệm tích cực trong
              việc giải quyết khiếu nại. Tài xế cần có trách nhiệm chủ động xử lý và cung
              cấp văn bản giấy tờ chứng thực thông tin liên quan đến sự việc đang có khiếu
              nại, tranh chấp với Khách hàng.
            </p>
            <p className={textClassName}>
              Công ty chỉ đóng vai trò hỗ trợ, phối hợp việc thương lượng, hòa giải và
              giải quyết khiếu nại giữ Khách hàng và Tài xế. Công ty cũng có trách nhiệm
              cung cấp những thông tin liên quan đến Khách hàng và Tài xế nếu được Tài xế
              hoặc Khách hàng hoặc Cơ quan Pháp luật có thẩm quyền yêu cầu.
            </p>
            <p className={textClassName}>
              Sau khi Khách hàng và Tài xế đã giải quyết xong tranh chấp, cần có trách
              nhiệm báo lại cho Công ty để cập nhật tình hình.
            </p>
            <p className={textClassName}>
              Trong trường hợp giao dịch phát sinh mâu thuẫn mà lỗi thuộc về Tài xế: Công
              ty sẽ áp dụng các biện pháp xử lý vi phạm tương ứng bao gồm nhưng không giới
              hạn: cảnh cáo, khóa tài khoản hoặc chuyển cho Cơ quan Pháp luật có thẩm
              quyền tùy theo mức độ của sai phạm.
            </p>
            <p className={textClassName}>
              Công ty sẽ chấm dứt và gỡ bỏ toàn bộ tin bài về sản phẩm, dịch vụ của Tài xế
              đó trên dịch vụ vận tải đồng thời yêu cầu Tài xế bồi hoàn cho Khách hàng
              thỏa đáng trên cơ sở thỏa thuận với Khách hàng.
            </p>
          </li>
        </ul>
      </>
    )
  },
  {
    title: 'Hợp đồng hợp tác kinh doanh Khách Hàng',
    content: (
      <>
        <div className={elementClassName}>
          <p className={titleClassName}>
            HỢP ĐỒNG HỢP TÁC VẬN CHUYỂN HÀNH KHÁCH THEO HỢP ĐỒNG ĐIỆN TỬ BẰNG XE Ô TÔ DƯỚI
            09 CHỖ
          </p>
          <p className={textClassName}>
            Hợp Đồng Vận Chuyển Hành Khách Theo Hợp Đồng Điện Tử Bằng Xe Ô Tô này (sau đây
            gọi tắt là: “Hợp Đồng”) được xác lập giữa:
          </p>

          <div className={elementClassName}>
            <p className={`${textClassName} font-semibold md:font-semibold`}>
              I. Bên Cung Cấp Dịch Vụ:
            </p>
            <p className={textClassName}>
              Tên:{' '}
              <span className="font-semibold md:font-semibold">
                CÔNG TY CỔ PHẦN ĐẦU TƯ CÔNG NGHỆ VÀ VẬN TẢI EXXEVN (ExxeVn)
              </span>
            </p>
            <p className={textClassName}>
              Địa chỉ: Số 2 Hoàng Thế Thiện, Phường An Lợi Đông, Tp Thủ Đức, Tp.HCM.
            </p>
            <p className={textClassName}>Mã số thuế: 0317412411</p>
            <p className={textClassName}>Điện thoại: 19004744 - 0847878788</p>
            <p className={textClassName}>
              Đại diện bởi: Ông Đinh Quang Dũng – Tổng Giám đốc - Người đại diện theo Pháp
              luật
            </p>
            <p className={textClassName}>
              (Sau đây gọi tắt là: “
              <span className="font-semibold md:font-semibold">ExxeVn</span>” hoặc “{' '}
              <span className="font-semibold md:font-semibold">Đơn Vị Vận Tải</span>” hoặc
              “<span className="font-semibold md:font-semibold">Công ty</span>”).
            </p>
            <span className="font-semibold md:font-semibold">Và</span>
          </div>
          <div className={elementClassName}>
            <p className={`${textClassName} font-semibold md:font-semibold`}>
              II. Bên Sử Dụng Dịch Vụ
            </p>

            <p className={textClassName}>
              Là Khách Hàng đã đăng ký sử dụng ứng dụng ExxeVn có nhu cầu sử dụng dịch vụ
              vận tải hành khách bằng xe ô tô dưới 09 chỗ ngồi.
            </p>
            <p className={textClassName}>
              Họ tên, địa chỉ, số điện thoại và mã số thuế (nếu có) của Khách Hàng theo
              thông tin đã cung cấp khi đăng ký sử dụng ứng dụng ExxeVn, được hiển thị
              trên ứng dụng ExxeVn dành cho Khách Hàng.
            </p>
            <p className={textClassName}>
              (App ExxeVn: sau đây gọi tắt là “Người Thuê Vận Tải” hoặc “Khách Hàng”
            </p>
            <p className={textClassName}>
              App ExxeVn và Người Thuê Vận Tải (hoặc khách hàng) ký kết Hợp Đồng này trên
              cơ sở hoàn toàn tự nguyện, tự do ý chí, Hợp Đồng được hai Bên giao kết bằng
              phương thức điện tử thông qua ứng dụng ExxeVn theo Quy chế quản lý hoạt động
              Sàn TMĐT ExxeVn được Công ty đăng ký, tổ chức vận hành theo quy định của
              pháp luật thương mại điện tử và pháp luật có liên quan hiện hành.
            </p>

            <p className={`${textClassName} ml-24 font-semibold md:font-semibold`}>
              Hợp Đồng này bao gồm 02 (hai) phần:
            </p>
            <p className={textClassNameSemibold}>Phần I: Điều Khoản Chung</p>
            <p className={textClassName}>
              <span className={textClassName}>Phần II: Điều Khoản Cụ Thể:</span> Quy định
              về các nội dung tối thiểu của hợp đồng vận chuyển hành khách bằng xe ô tô
              dưới hình thức dịch vụ vận tải điện tử theo quy định của pháp luật kinh
              doanh vận tải bằng xe ô tô hiện hành.
            </p>
            <p className={textClassNameSemibold}>
              ExxeVn <span className="italic">(ứng dụng dành cho Khách Hàng)</span>.
            </p>
            <p className={textClassName}>
              Các điều khoản và điều kiện cụ thể của Hợp Đồng như sau:
            </p>
          </div>

          <div className={elementClassName}>
            <p className={`${titleClassName} text-center`}>ĐIỀU KHOẢN CHUNG</p>
            <p className={textClassNameSemibold}>
              Điều 1: Phương thức giao kết, thời hạn của hợp đồng
            </p>
            <p className={textClassNameSemibold}>1. Phương thức giao kết hợp đồng</p>
            <p className={textClassName}>
              a) Các bên đồng ý chấp thuận việc giao kết Hợp Đồng này bằng phương thức
              dịch vụ vận tải điện tử thông qua ứng dụng{' '}
              <span className={textClassNameSemibold}>ExxeVn</span>, có giá trị pháp lý
              như hợp đồng ký kết bằng văn bản và có giá trị làm chứng cứ.
            </p>
            <p className={textClassName}>
              b) Quy trình giao kết hợp đồng điện tử: Theo Phụ lục 4 của Quy chế quản lý
              hoạt động ứng dụng <span className={textClassNameSemibold}>ExxeVn</span>{' '}
              hiện hành do <span className={textClassNameSemibold}>ExxeVn</span> công bố
              theo quy định trên ứng dụng{' '}
              <span className={textClassNameSemibold}>ExxeVn</span> và/hoặc trên trang
              thông tin điện tử của <span className={textClassNameSemibold}>ExxeVn</span>.
            </p>
          </div>

          <div className={elementClassName}>
            <p className={textClassNameSemibold}>2. Thời điểm giao kết hợp đồng:</p>
            <p className={textClassName}>
              c) Khách Hàng/Tài Xế khi đăng ký sử dụng ứng dụng ExxeVn (phần mềm ứng dụng
              hỗ trợ kết nối vận tải trên thiết bị di động được vận hành bởi ExxeVn hoặc
              đơn vị thành viên của ExxeVn). Sau khi đã cung cấp các thông tin yêu cầu về
              họ tên, địa chỉ, số điện thoại và các thông tin yêu cầu khác.
            </p>
            <p className={textClassName}>
              Ứng dụng ExxeVn sẽ hiển thị nội dung Hợp Đồng này: Sau khi Khách Hàng đã đọc
              toàn bộ nội dung hợp đồng được hiển thị và tự nguyện đồng ý với tất cả nội
              dung của hợp đồng bằng việc nhấn nút đồng ý đăng ký sử dụng ứng dụng để
              ExxeVn xem xét chấp thuận.
            </p>
            <p className={textClassName}>
              d) Thời điểm Hợp Đồng này được giao kết giữa các Bên là thời điểm ExxeVn
              chấp thuận cho Khách Hàng/Tài Xế được sử dụng ứng dụng ExxeVn (ứng dụng dành
              cho Khách Hàng theo đúng quy trình giao dịch đã công bố trên ứng dụng ExxeVn
              và trang thông tin điện tử của ExxeVn.
            </p>
            <p className={textClassName}>
              3. Thời hạn Hợp Đồng: Tính từ thời điểm giao kết Hợp đồng tại khoản 1.2.
              Điều này cho đến khi Tài khoản ứng dụng ExxeVn của Khách Hàng bị chấm dứt
              theo Hợp Đồng này và/hoặc theo Quy chế quản lý hoạt động ứng dụng ExxeVn
              hiện hành đã được ExxeVn công bố, thông báo.
            </p>

            <p className={textClassNameSemibold}>Điều 2: Dịch vụ vận tải:</p>
            <p className={textClassName}>
              1. Dịch vụ được cung cấp theo Hợp Đồng này là dịch vụ vận tải hành khách
              theo hợp đồng bằng xe ô tô dưới 09 (chín) chỗ ngồi được kết nối cung cấp
              dịch vụ thông qua ứng dụng ExxeVn, Và Khách Hàng có nhu cầu thuê cả chuyến
              xe (bao gồm cả thuê người Tài Xế) (sau đây được gọi tắt là: “Dịch vụ”).
            </p>

            <p className={textClassNameSemibold}>2. Thông tin về từng chuyến xe:</p>
            <p className={`${textClassName} italic font-semibold md:font-semibold`}>
              a./ Thời gian bắt đầu thực hiện và kết thúc (ngày, giờ), địa chỉ điểm đầu,
              địa chỉ điểm cuối và các điểm đón, trả khách trên hành trình vận chuyển.
            </p>
            <p className={`${textClassName} italic font-semibold md:font-semibold`}>
              b/. Cự ly của hành trình vận chuyển (số km), số lượng khách và các nội dung
              cần thiết khác do Khách Hàng lựa chọn, được hiển thị trên ứng dụng ExxeVn để
              Khách Hàng xem xét tự nguyện quyết định sử dụng Dịch vụ Vận Tải bằng việc
              Khách Hàng thao tác hoàn tất đặt chuyến xe trên ứng dụng ExxeVn.
            </p>
            <p className={`${textClassName} italic font-semibold md:font-semibold`}>
              c/. Nội dung thông tin về từng chuyến xe được ghi nhận, hiển thị trên ứng
              dụng ExxeVn tại Điều này trở thành Phụ lục hợp đồng, là các nội dung không
              thay đổi của Hợp Đồng này.
            </p>

            <p className={textClassName}>Điều 3: Giá cả dịch vụ, phụ phí, phí</p>
            <p className={textClassName}>
              1. Giá cả Dịch vụ bao gồm: cước vận tải, phụ phí nhu cầu cao và phí dịch vụ
              giá trị gia tăng được ExxeVn/ExxeVnDriver cung cấp (nếu có) tính cho từng
              cuốc xe (chuyến xe) được hiển thị trên ứng dụng ExxeVn/ExxeVnDriver để Khách
              Hàng/Tài Xế biết trước khi quyết định gửi yêu cầu cung cấp Dịch vụ (thực
              hiện lệnh “Đặt xe” hoặc “Nhận chuyến” trên ứng dụng ExxeVn/ExxeVnDriver).
            </p>
            <p className={textClassName}>
              Để hiểu rõ, trường hợp Khách Hàng đã tiến hành gửi yêu cầu “Đặt Xe”/ “Nhận
              Chuyến” - Dịch vụ được hiểu là Khách Hàng đã chấp nhận Giá cả Dịch vụ của
              cuốc xe đó.
            </p>
            <p className={textClassName}>
              2. Giá cả Dịch vụ đã bao gồm 10% thuế giá trị gia tăng.
            </p>
            <p className={textClassName}>
              3. Tỉ lệ phân chia kết quả hợp tác kinh doanh theo Hợp Đồng:
            </p>
            <p className={textClassName}>
              - Đối tác Tài Xế được phân chia 95% (có thể thay đổi) doanh thu dịch vụ vận
              tải hành khách (đã bao gồm 10% thuế giá trị gia tăng) thực tế của từng
              chuyến xe.
            </p>
            <p className={textClassName}>
              - ExxeVnDriver được phân chia 5%(có thể thay đổi) của doanh thu dịch vụ vận
              tải hành khách (đã bao gồm 10% thuế giá trị gia tăng thực tế của từng chuyến
              xe).
            </p>
            <p className={textClassName}>
              - Tỉ lệ phân chia kết quả kinh doanh cho doanh nghiệp/HTX vận tải mà Phương
              tiện mang phù hiệu của đơn vị sẽ đc ExxeVnDriver quyết định căn cứ vào phạm
              vi trách nhiệm hợp tác theo hợp đồng hợp tác ký kết.
            </p>
            <p className={textClassName}>
              - Đối với phí sử dụng ứng dụng, ExxeVn được quyền thu phí sử dụng Phần mềm
              ứng dụng hỗ trợ kết nối vận tải (App ExxeVn) đối với Khách hàng mà không
              phải phân chia cho Đối tác Tài Xế.
            </p>
            <p className={textClassName}>4. Giá cả Dịch vụ chưa bao gồm:</p>
            <p className={textClassName}>
              a/. Phí cầu đường, phà, bến bãi. Các phí/chi phí này không tính vào Giá cả
              Dịch vụ để tính chiết khấu thương mại, khuyến mại (nếu có). Khách Hàng hoặc
              Hành khách đi xe sẽ chi trả trực tiếp các khoản phí/chi phí này cho Tài Xế
              theo thực tế phát sinh của từng cuốc xe.
            </p>
            <p className={textClassName}>
              b/. Trường hợp Khách Hàng, Hành khách không thanh toán trực tiếp bằng tiền
              mặt cho Tài Xế và Khách Hàng lựa chọn thanh toán qua phương thức trả phụ phí
              trên ứng dụng ExxeVn, ExxeVn sẽ thực hiện việc thu hộ các khoản phí/chi phí
              này để thanh toán lại cho Tài Xế.
            </p>
            <p className={textClassName}>
              c/. Chưa bao gồm: Phát sinh Chi phí đỗ xe, ăn ở, chỗ nghỉ lại của Tài Xế (Áp
              dụng với chuyến xe 2 chiều, qua đêm, 2 ngày 1 đêm, 3 ngày 2 đêm…)
            </p>
            <p className={textClassName}>5. Giá cả Dịch Vụ Vận Tải:</p>
            <p className={textClassName}>
              Cước phí vận tải dựa trên cự ly hành trình vận chuyển (số kilomet), Loại xe
              (4 chỗ, 7 chỗ). Loại chuyến xe: đi 1 chiều, 2 chiều, Đi ghép, Tiện chuyến.
              Thời gian (1ngày – n ngày) theo nhu cầu của Khách hàng.
            </p>
            <p className={textClassName}>
              6. Quy định về Giá cước dựa theo thời gian Vận chuyển hành khách:
            </p>
            <p className={textClassName}>
              a/. Từ thứ 2 đến thứ 6: Giá chuyến xe bình thường.
            </p>
            <p className={textClassName}>b/. Thứ 7 và Chủ Nhật: Giá chuyến xe tăng 8%.</p>
            <p className={textClassName}>c/. Các ngày lễ tết: Giá chuyến xe tăng 18%.</p>
            <p className={textClassName}>
              7. Xuất hóa đơn dịch vụ vận tải và khuyến mại cho Khách hàng:
            </p>
            <p className={textClassName}>
              – ExxeVn có trách nhiệm lập hóa đơn tài chính cho Khách hàng khi có yêu cầu
              hoặc theo quy định của pháp luật đối với Doanh thu dịch vụ vận tải (Kết quả
              kinh doanh) được phân chia của ExxeVn theo hợp đồng hợp tác đã ký kết.
            </p>
            <p className={textClassName}>
              -Để nhận hóa đơn, chứng từ liên quan đến cuốc xe, Khách hàng phải chọn nhập
              thông tin hóa đơn qua ứng dụng ExxeVn khi đặt dịch vụ để hệ thống ghi nhận.
              Nếu Khách hàng không chọn nhập thông tin yêu cầu hóa đơn qua ứng dụng
              ExxeVn, thời gian tối đa ExxeVn hỗ trợ xuất hóa đơn cho Khách hàng là 7
              (bảy) ngày.
            </p>
            <p className={textClassName}>
              – Đối Tác Tài Xế ủy nhiệm cho ExxeVn lập hóa đơn tài chính cho Khách hàng
              khi có yêu cầu hoặc theo quy định của pháp luật đối với Doanh thu dịch vụ
              vận tải (Kết quả kinh doanh) được phân chia của Đối Tác Tài Xế theo hợp đồng
              hợp tác đã ký kết.
            </p>
            <p className={textClassName}>
              – Số tiền khuyến mại cho Khách hàng sẽ được tính và ghi nhận trên hóa đơn
              tài chính được ExxeVn cung cấp cho Khách hàng theo chương trình khuyến mại
              mà ExxeVn thực hiện và đăng ký với Bộ Công Thương, theo đó, số tiền chiết
              khấu thương mại, giảm giá được thể hiện trên hóa đơn tài chính được trừ vào
              phần doanh thu được phân chia của ExxeVn và Đối Tác Tài Xế không bị trừ bất
              kỳ chi phí nào từ số tiền khuyến mại này.
            </p>
            <p className={textClassName}>
              8. Các khoản nghĩa vụ tài chính, thuế của Lái xe:
            </p>
            <p className={textClassName}>
              – Đối Tác Tài Xế có tổng doanh thu kinh doanh trong năm dương lịch trên 100
              triệu đồng (gọi tắt là: “Doanh thu tính thuế”) thì phải khai thuế giá trị
              gia tăng, thuế thu nhập cá nhân.
            </p>
            <p className={textClassName}>
              – Tỷ lệ thuế tính trên doanh thu áp dụng đối với cá nhân kinh doanh ngành
              nghề vận tải theo quy định hiện hành như sau:
            </p>
            <p className={textClassName}>
              (i) Tỷ lệ thuế giá trị gia tăng là 3% tính trên doanh thu được phân chia cho
              Đối Tác Tài Xế theo hợp đồng HTKD (có thể thay đổi theo quy định của cơ quan
              thuế ban hành).
            </p>
            <p className={textClassName}>
              (ii) Tỷ lệ thuế thu nhập cá nhân là 1,5% tính trên doanh thu được phân chia
              cho Đối Tác Tài Xế theo hợp đồng HTKD (có thể thay đổi theo quy định của cơ
              quan thuế ban hành) .
            </p>
            <p className={textClassName}>
              (iii) Đối với các khoản tiền thưởng khuyến khích theo doanh thu thì không
              tính thuế giá trị gia tăng, thuế thu nhập cá nhân là 1% tính trên tiền
              thưởng nhận được.
            </p>
            <p className={textClassName}>
              (iv) Đối với các khoản tiền thưởng chất lượng, hỗ trợ khác nếu có mức từ 02
              triệu đồng/lần trở lên thì thuế thu nhập cá nhân là 10% tính trên tiền
              thưởng/tiền hỗ trợ.
            </p>
            <p className={textClassName}>
              – Đối Tác Tài Xế ủy nhiệm vô điều kiện, không hủy ngang cho ExxeVn khai thuế
              và nộp thuế thay cho Đối Tác Tài Xế đối với Kết quả kinh doanh được phân
              chia của TÀI XẾ theo hợp đồng HTKD; các khoản khuyến khích, hỗ trợ, thưởng
              kinh doanh khác (nếu có) Đối Tác Tài Xế nhận được trong quá trình hợp tác
              kinh doanh với ExxeVn (gọi chung là: “Nghĩa Vụ Tài Chính’’).
            </p>
            <p className={textClassName}>
              – Đối Tác Tài Xế ủy quyền vô điều kiện, không hủy ngang cho ExxeVn thay mặt
              và nhân danh Đối Tác Tài Xế để làm việc với cơ quan thuế về việc tiến hành
              các thủ tục lập tờ khai, trích, nộp thuế, lệ phí và nghĩa vụ tài chính khác
              của Đối Tác Tài Xế phải nộp phát sinh từ hợp đồng Hợp tác.
            </p>
            <p className={textClassName}>
              – ExxeVn có quyền và nghĩa vụ tạm trích và giữ lại để nộp thay cho Đối Tác
              Tài Xế về các Nghĩa Vụ Tài Chính đối với Kết quả kinh doanh được phân chia
              của Đối Tác Tài Xế theo hợp đồng HTKD của mỗi chuyến xe hoàn thành qua ứng
              dụng ExxeVn và các Nghĩa Vụ Tài Chính tính trên các khoản thưởng, khuyến
              khích, hỗ trợ khác của Đối Tác Tài Xế nhận được trong quá trình hợp tác kinh
              doanh với ExxeVn.
            </p>
            <p className={textClassName}>
              – Đến hết năm tài chính, (Tính từ ngày 01/01 đến hết 31/12), nếu doanh thu
              được phân chia cho Đối Tác Tài Xế theo hợp đồng hợp tác lũy kế chưa đạt mức
              Doanh thu tính thuế đối với cá nhân kinh doanh theo quy định của pháp luật
              hiện hành thì ExxeVn sẽ hoàn trả cho Đối Tác Tài Xế số tiền thuế tạm trích
              và giữ lại theo quy định của pháp luật.
            </p>
            <p className={textClassName}>
              – Trong năm tài chính, (Tính từ ngày 01/01 đến hết 31/12), nếu doanh thu
              được phân chia cho Đối Tác Tài Xế theo hợp đồng hợp tác lũy kế đạt mức Doanh
              thu tính thuế đối với cá nhân kinh doanh theo quy định của pháp luật hiện
              hành thì ExxeVn có trách nhiệm khai thuế và nộp thay thuế kịp thời và đầy đủ
              theo quy định của pháp luật hiện hành.
            </p>
            <p className={textClassName}>
              – Khi quy định của pháp luật thay đổi về nghĩa vụ tài chính, mức thuế, phí,
              lệ phí phải nộp cho nhà nước thì ExxeVn có quyền trích giữ lại, thay đổi tỷ
              lệ trích cho phù hợp mà không cần phải có sự chấp thuận của Đối Tác Tài Xế
              nhưng sẽ thông báo kịp thời cho Đối Tác Tài Xế biết trước khi thực hiện.
            </p>
            <p className={textClassName}>9. Đăng ký và cung cấp mã số thuế cá nhân:</p>
            <p className={textClassName}>
              Đối Tác Tài Xế khi tham gia hợp tác kinh doanh với ExxeVn có trách nhiệm tự
              mình thực hiện thủ tục đăng ký thuế để được cấp mã số thuế theo quy định của
              pháp luật về quản lý thuế. ExxeVn có quyền, nhưng không có nghĩa vụ thực
              hiện việc đăng ký mã số thuế cá nhân thay cho Đối Tác Tài Xế.
            </p>
            <p className={textClassName}>Điều 4: Thanh toán và hóa đơn:</p>
            <p className={textClassName}>A/. Đối với Khách Hàng:</p>
            <p className={textClassName}>
              Khách Hàng có thể lựa chọn một trong các phương thức thanh toán sau:
            </p>
            <p className={textClassName}>
              Thanh toán bằng tiền mặt, thẻ ngân hàng, ví điện tử có liên kết với ứng dụng
              ExxeVn. Hoặc các phương thức thanh toán hợp lệ khác hiển thị trên ứng dụng
              ExxeVn do Khách Hàng lựa chọn trước chuyến đi phù hợp với từng loại Sản
              phẩm/Dịch vụ vận tải do ExxeVn cung cấp trong từng thời kỳ.
            </p>
            <p className={textClassName}>
              Mỗi 1 chuyến xe của Khách Hàng thể hiện trên App ExxeVnDriver là hoàn tất
              thanh toán tiền cọc 20% giá trị của chuyến xe. Số tiền này ExxeVn thu hộ để
              xác nhận đảm bảo Khách Hàng có nhu cầu chuyến đi. Sau khi hoàn tất chuyến,
              số tiền 20% sẽ được chuyển đến Tài khoản ExxeVnDriver của Tài Xế.
            </p>
            <p className={textClassName}>
              3. Thời điểm thanh toán: Đặt cọc 20% số tiền trước khi đặt chuyến và thanh
              toán 80% còn lại ngay sau khi kết thúc chuyến đi. Tùy thuộc vào phương thức
              thanh toán đối với từng sản phẩm do ExxeVn công bố trên ứng dụng.
            </p>
            <p className={textClassName}>
              4. Hóa đơn Dịch vụ được cung cấp cho Khách Hàng là hóa đơn điện tử: ExxeVn
              gửi hóa đơn điện tử (Nếu có hoặc theo yêu cầu của khách hàng) của chuyến đi
              đến tài khoản ứng dụng ExxeVn và/hoặc email đăng ký của Khách Hàng với
              ExxeVn và ExxeVn gửi thông tin hóa đơn điện tử về cơ quan Thuế theo quy định
              của pháp luật hiện hành có liên quan trong từng thời kỳ.
            </p>
            <p className={textClassName}>
              5. Trường hợp, cước vận tải, phụ phí, chi phí của Khách Hàng/Hành khách được
              chi trả (thanh toán/tài trợ) bởi Doanh nghiệp, đơn vị, tổ chức khác (gọi
              chung là Khách hàng doanh nghiệp) thì việc thanh toán (phương thức, thời
              điểm) và xuất hóa đơn Dịch vụ thực hiện theo Hợp đồng Dịch vụ vận tải đã ký
              kết giữa ExxeVn và Khách hàng doanh nghiệp đó.
            </p>
            <p className={textClassName}>
              Điều 5: Quyền và nghĩa vụ của ExxeVn với Khách hàng:
            </p>
            <p className={textClassName}>
              1. Yêu cầu Người Thuê Vận Tải/Hành khách thanh toán đầy đủ, kịp thời Giá cả
              Dịch vụ phát sinh theo Hợp Đồng này.
            </p>
            <p className={textClassName}>
              2. Từ chối cung cấp Dịch vụ, khóa hoặc tạm khóa tài khoản ứng dụng ExxeVn
              của Người Thuê Vận Tải/Hành khách nếu có bất kỳ vi phạm các quy định, quy
              chế dịch vụ của ExxeVn và/hoặc các quy định của pháp luật.
            </p>
            <p className={textClassName}>
              3. Yêu cầu Khách Hàng/Hành khách cung cấp đúng, đầy đủ, trung thực các thông
              tin bao gồm nhưng không giới hạn: họ tên, địa chỉ, số CMND/CCCD, email, số
              điện thoại, thông tin cần thiết khác theo quy định của pháp luật khi đăng
              ký, sử dụng Dịch vụ và giao kết Hợp Đồng này.
            </p>
            <p className={textClassName}>
              4/. Điền thông tin Mã số thuế cá nhân theo quy luật về quản lý thuế. ExxeVn
              có quyền nhưng không có nghĩa vụ thực hiện việc đăng kí mã số thuế cá nhân
              thay cho Khách hàng.
            </p>
            <p className={textClassName}>
              5. Gửi thông báo và/hoặc ngắt kết nối Tài Khoản ứng dụng ExxeVn nếu:
            </p>
            <p className={textClassName}>
              a) Đã hết hạn thanh toán mà Khách Hàng không thanh toán đầy đủ Cước Dịch Vụ,
              khoản phải thanh toán cho ExxeVn.
            </p>
            <p className={textClassName}>
              b) Khách Hàng và/hoặc Hành khách vi phạm các điều khoản của Hợp Đồng này.
              Hoặc Khách Hàng /Hành khách vi phạm Quy chế hoạt động, Điều khoản sử dụng,
              Quy tắc ứng xử của Sàn TMĐT ExxeVn được ExxeVn công bố trong từng thời kỳ.
            </p>
            <p className={textClassName}>
              6. Được miễn trừ trách nhiệm đối với việc Khách Hàng hoặc Hành khách tiết lộ
              thông tin truy cập dẫn đến bị người khác sử dụng trái phép Tài Khoản ứng
              dụng ExxeVn của Khách hàng mà không thông báo ngay cho đại diện ExxeVn làm
              thủ tục phong tỏa Tài Khoản ứng dụng ExxeVn.
            </p>
            <p className={textClassName}>
              Nếu việc tiết lộ thông tin truy cập dẫn đến phát sinh Cước Phí Dịch Vụ thì
              Khách Hàng phải hoàn toàn chịu trách nhiệm và phải thanh toán số tiền phát
              sinh này cho ExxeVn.
            </p>
            <p className={textClassName}>
              7. ExxeVn được quyền miễn trừ trách nhiệm trong các trường hợp Khách
              Hàng/Hành khách không thể sử dụng ứng dụng ExxeVn để đặt Dịch vụ trong các
              trường hợp sau:
            </p>
            <p className={textClassName}>
              a) Lỗi phần cứng hoặc phần mềm hoàn toàn nằm ngoài tầm kiểm soát hợp lý của
              ExxeVn.
            </p>
            <p className={textClassName}>
              b) Lỗi mạng Internet, lỗi máy móc, hay lỗi hệ thống, ngưng khi bảo trì hệ
              thống, do các sự kiện bất khả kháng tác động.
            </p>
            <p className={textClassName}>
              8. Hướng dẫn Khách Hàng các bước tải, đăng ký và kích hoạt Tài Khoản ứng
              dụng ExxeVn.
            </p>
            <p className={textClassName}>
              9. Chịu trách nhiệm mua bảo hiểm tai nạn con người cho Người Sử Dụng đang
              trong Chuyến Xe phù hợp với khả năng tài chính của mình trong từng thời kỳ.
            </p>
            <p className={textClassName}>
              10. Thực hiện đầy đủ các nghĩa vụ thuế phát sinh khi kinh doanh dịch vụ vận
              tải theo quy định của pháp luật.
            </p>
            <p className={textClassName}>
              11. Các quyền và nghĩa vụ khác theo quy định của pháp luật.
            </p>
            <p className={textClassName}>
              12. Điều kiện tham gia và tiếp tục hợp tác: Hai bên sẽ giao kết Hợp Đồng
              điện tử theo mẫu này, được ExxeVn ban hành theo quy định hiện hành, có giá
              trị pháp lý như ký kết bằng văn bản.
            </p>
            <p className={textClassName}>
              Điều 6: Quyền và nghĩa vụ của Người Thuê Vận Tải, Hành khách
            </p>
            <p className={textClassName}>
              1. Yêu cầu ExxeVn, Tài Xế cung cấp dịch vụ theo đúng thỏa thuận tại Hợp Đồng
              này.
            </p>
            <p className={textClassName}>
              2. Hành khách có các quyền sau đây: Được vận chuyển theo đúng Hợp Đồng này,
              Được miễn cước hành lý theo quy định của Công ty trong từng thời kỳ và với
              kích thước phù hợp với thiết kế của xe. Được huỷ chuyến trong vòng 60 phút
              tính từ lúc hoàn tất đặt cọc chuyến xe và được trả lại 20% tiền cọc theo quy
              định của ExxeVn.
            </p>
            <p className={textClassName}>
              3. Được khiếu nại, kiến nghị, phản ánh những hành vi vi phạm quy định về
              quản lý vận tải của đơn vị kinh doanh vận tải, Tài Xế và yêu cầu bồi thường
              thiệt hại (nếu có) theo quy định của pháp luật.
            </p>
            <p className={textClassName}>
              4. Cung cấp đúng, đầy đủ, trung thực các thông tin bao gồm nhưng không giới
              hạn: họ tên, địa chỉ, số CMND/CCCD/Hộ chiếu còn hiệu lực, Mã số thuế cá
              nhân, email, số điện thoại, thông tin cần thiết khác theo quy định của pháp
              luật khi đăng ký, sử dụng Dịch vụ và giao kết Hợp Đồng này.
            </p>
            <p className={textClassName}>
              5. Cung cấp đúng và đầy đủ các thông tin bao gồm nhưng không giới hạn: điểm
              đi, điểm đến, số lượng hành khách đi cùng và các thông tin cá nhân khác theo
              yêu cầu của hợp đồng vận chuyển theo quy định của Nghị định 10/2020/NĐ-CP và
              pháp luật có liên quan.
            </p>
            <p className={textClassName}>
              6. Có mặt tại nơi xuất phát đúng thời gian đã thỏa thuận, chấp hành quy định
              về vận chuyển, thực hiện đúng hướng dẫn của Tài Xế, nhân viên điều hành của
              ExxeVn về các quy định bảo đảm trật tự, an toàn giao thông.
            </p>
            <p className={textClassName}>
              7. Chấp hành các quy định khi đi xe để đảm bảo an toàn, an ninh trật tự trên
              xe, lên, xuống xe các điểm đón, trả khách theo quy định.
            </p>
            <p className={textClassName}>
              8. Khách Hàng, Hành khách cam kết không thực hiện các hành vi sau đây:
            </p>
            <p className={textClassName}>
              a) Hành lý, vật dụng, tài sản mang theo của Khách Hàng/Hành khách thuộc danh
              mục hàng hóa cấm lưu thông, lưu thông có điều kiện theo quy định của pháp
              luật hiện hành.
            </p>
            <p className={textClassName}>
              b) Khách Hàng/Hành khách yêu cầu Tài Xế vận chuyển quá số người quy định, đi
              vào đường cấm, đường chật hẹp, nguy hiểm, chạy vượt quá tốc độ cho phép, vận
              chuyển người đang bị truy nã, các yêu cầu khác có thể gây mất an toàn giao
              thông và mọi hành vi vi phạm pháp luật khác.
            </p>
            <p className={textClassName}>
              ExxeVn và/hoặc Tài Xế có quyền từ chối cung cấp dịch vụ nếu Khách Hàng/Hành
              khách vi phạm cam kết này.
            </p>
            <p className={textClassName}>
              9. Trả cước phí, thanh toán đầy đủ các khoản cước dịch vụ và phụ phí (nếu
              có) theo Hợp Đồng này.
            </p>
            <p className={textClassName}>
              10. Khách hàng cam kết tuân thủ đầy đủ Quy Chế Hoạt Động Dịch vụ vận tải
              ExxeVn, các Điều Khoản Sử Dụng Chung đã được ExxeVn công bố tại địa chỉ
              website: https://www.Exxe.vn, trên ứng dụng ExxeVn và các quy định của pháp
              luật hiện hành liên quan.
            </p>
            <p className={textClassName}>
              11. Các quyền và nghĩa vụ khác theo quy định pháp luật hiện hành có liên
              quan.
            </p>
            <p className={textClassName}>Điều 8: Phạt vi phạm và bồi thường thiệt hại</p>
            <p className={textClassName}>A/. Phạt Vi Phạm và Bồi thường thiệt hại:</p>
            <p className={textClassName}>
              1. Bên nào vi phạm Hợp Đồng này mà gây thiệt hại cho Bên kia thì Bên Vi Phạm
              phải chịu trách nhiệm bồi thường thiệt hại cho Bên Bị Vi Phạm toàn bộ thiệt
              hại thực tế, trực tiếp phát sinh mà Bên Bị Vi Phạm phải gánh chịu theo quy
              định của pháp luật, nhưng trong mọi trường hợp, mức bồi thường thiệt hại
              không vượt quá tổng Cước Dịch vụ phát sinh thực tế của 02 (hai) tháng trước
              tháng phát sinh vi phạm hợp đồng của Bên Vi Phạm.
            </p>
            <p className={textClassName}>
              2. Bên vận chuyển không phải bồi thường thiệt hại về tính mạng, sức khỏe và
              hành lý của hành khách nếu thiệt hại xảy ra hoàn toàn do lỗi của hành khách,
              trừ trường hợp pháp luật có quy định khác.
            </p>
            <p className={textClassName}>
              3. Trường hợp Hành khách vi phạm điều kiện vận chuyển đã thỏa thuận, quy
              định của điều lệ vận chuyển mà gây thiệt hại cho bên vận chuyển hoặc người
              thứ ba thì phải bồi thường.
            </p>
            <p className={textClassName}>
              4. Trong trường hợp Khách Hàng, Hành khách chậm thanh toán Cước Dịch vụ, phí
              cầu đường, phà, bến bãi và các chi phí khác ngoài Cước Dịch vụ (nếu có),
              Khách Hàng, Hành khách phải chịu phạt lãi chậm trả như sau: Số tiền phạt =
              Số tiền phải trả x 0,05% x Số ngày chậm trả.
            </p>
            <p className={textClassName}>
              a) Số tiền phải trả: tổng số tiền mà Khách Hàng phải thanh toán cho ExxeVn.
            </p>
            <p className={textClassName}>
              b) Số ngày chậm trả: là ngày theo lịch được tính từ ngày đến hạn thanh toán
              đến ngày Khách Hàng thanh toán thực tế cho ExxeVn.
            </p>
            <p className={textClassName}>
              5. Tài Xế/chủ xe và đơn vị trực tiếp quản lý phương tiện vận chuyển liên đới
              chịu trách nhiệm đối với các phát sinh bồi thường thiệt hại về dân sự/ bồi
              thường thiệt hại ngoài Hợp đồng do phương tiện, Tài Xế của mình gây ra cho
              bên thứ ba theo quy định của pháp luật hiện hành.
            </p>
            <p className={textClassName}>
              B/. Phạt Vi Phạm Chính Sách Huỷ Chuyến Xe: (Đối với Khách Hàng và Tài Xế)
            </p>
            <p className={textClassName}>
              Chi phí huỷ chuyến và vi phạm chính sách huỷ chuyến được tính như sau:
            </p>
            <p className={textClassName}>
              Sau khi đặt cọc 20% cước phí chuyến đi. Nếu khách hàng có nhu cầu huỷ chuyến
              thì:
            </p>
            <p className={textClassName}>
              ExxeVn sẽ thu 50% đặt cọc (Tương ứng 10% cước phí chuyến đi).
            </p>
            <p className={textClassName}>
              50% đặt cọc (10% cước phí chuyến đi) sẽ được chuyển về tK của Tài Xế.
            </p>
            <p className={textClassName}>
              Và ngược lại, nếu Tài Xế huỷ chuyến thì ExxeVn sẽ thu 50% tiền cọc(10% cước
              phí chuyến đi).
            </p>
            <p className={textClassName}>
              Lúc này, chuyến đi của Khách hàng sẽ là chuyến đi ưu tiên. ExxeVn sẽ đưa ưu
              tiên để tìm TX cho Khách hàng trong thời gian sớm nhất.
            </p>
            <p className={textClassName}>
              a/. Nếu có Tài xế mới thì 50% tiền cọc (10% cước phí chuyến đi) sẽ được
              chuyển về cho Tài xế ban đầu đã huỷ chuyến.
            </p>
            <p className={textClassName}>
              b/. Nếu không tìm được Tài Xế mới, thì 50% tiền cọc (10% cước phí chuyến đi)
              sẽ được chuyển khoản về Khách hàng. Coi như khoản đền bù của Tài xế đối với
              khách hàng.
            </p>
            <p className={textClassName}>
              Tài xế và Khách Hàng được quyền huỷ chuyến nhưng theo quy định của ExxeVn.
              Thời gian bắt đầu từ lúc hoàn tất đặt cọc để Đặt chuyến (Đối với Khách Hàng)
              và Nhận chuyến (Đối với Tài Xế).
            </p>
            <p className={textClassName}>
              *** Nhằm gia tăng sự cam kết của tài xế, cũng như đảm bảo quyền lợi của
              khách hàng: Đối tác TX và Khách hàng vui lòng liên lạc trước chuyến đi.
            </p>
            <p className={textClassName}>Điều 9: Giải quyết khiếu nại</p>
            <p className={textClassName}>
              1. Mọi thông tin thắc mắc, khiếu nại, Đối Tác Khách Hàng và Tài Xế vui lòng
              liên hệ:
            </p>
            <p className={textClassName}>– Tổng đài hotline: 19004744</p>
            <p className={textClassName}>– Email: info@Exxe.vn</p>
            <p className={textClassName}>
              2. Bất kỳ khiếu nại nào liên quan tới Dịch Vụ được cung cấp theo Hợp Đồng sẽ
              được Khách Hàng trình bày chi tiết và gửi tới ExxeVn bằng văn bản hoặc email
              (thư điện tử) trên, sẽ được kiểm tra và xử lý trong vòng 03 (ba) Ngày Làm
              Việc kể từ ngày xảy ra hoặc phát hiện ra sự việc dẫn tới việc khiếu nại.
            </p>
            <p className={textClassName}>
              3. ExxeVn chỉ tiếp nhận và xử lý những khiếu nại xảy ra trong vòng 60 (sáu
              mươi) ngày kể từ ngày phát sinh sự việc dẫn đến khiếu nại. Trong thời gian
              chậm nhất là 10 (mười) Ngày Làm Việc sau khi nhận được khiếu nại của Khách
              Hàng, ExxeVn có trách nhiệm xác minh, cung cấp thông tin liên quan đến việc
              khiếu nại cho Khách Hàng.
            </p>
            <p className={textClassName}>
              4. Các Bên cùng phối hợp, giải quyết các khiếu nại trên cơ sở đảm bảo quyền
              và lợi ích của các Bên tham gia Hợp Đồng.
            </p>
            <p className={textClassName}>Điều 10: Chấm dứt Hợp đồng</p>
            <p className={textClassName}>
              Hợp đồng sẽ chấm dứt trong các trường hợp sau đây:
            </p>
            <p className={textClassName}>
              1. Tài khoản ứng dụng ExxeVn của khách hàng bị khóa/hủy kích hoạt vĩnh viễn.
            </p>
            <p className={textClassName}>
              2. Các trường hợp khác theo quy định của pháp luật hiện hành.
            </p>
            <p className={textClassName}>Điều 11: Truy xuất và lưu trữ hợp đồng</p>
            <p className={textClassName}>
              1. Người Thuê Vận Tải có thể truy xuất Hợp Đồng bằng cách truy cập ứng dụng
              ExxeVn, vào thanh menu và chọn mục “Lịch sử” hoặc “Hợp đồng vận chuyển”.
            </p>
            <p className={textClassName}>
              2. Hợp đồng này được lưu trữ trong thời gian tối thiểu 03 (ba) năm kể từ
              ngày Người Thuê Vận Tải xác nhận và ký kết.
            </p>
            <p className={textClassName}>
              Điều 12: Luật điều chỉnh và giải quyết tranh chấp
            </p>
            <p className={textClassName}>
              1. Hợp Đồng này được xác lập và điều chỉnh theo pháp luật Việt Nam. Các nội
              dung không được quy định trong Hợp Đồng này sẽ được áp dụng theo quy định
              của pháp luật hiện hành có liên quan.
            </p>
            <p className={textClassName}>
              2. Mọi tranh chấp liên quan đến Hợp Đồng trước hết sẽ được các Bên giải
              quyết bằng thương lượng trên cơ sở các Bên cùng có lợi trong vòng 30 (ba
              mươi) ngày kể từ ngày phát sinh tranh chấp. Trường hợp hết thời hạn giải
              quyết thương lượng mà việc thương lượng giữa các Bên không thành thì mỗi Bên
              có quyền yêu cầu Tòa án có thẩm quyền để giải quyết tranh chấp đó. Mỗi Bên
              cam kết thực hiện đầy đủ trách nhiệm của mình đối với Bên còn lại theo đúng
              Bản án/Quyết định có hiệu lực thi hành của Tòa án giải quyết tranh chấp.
            </p>
            <p className={textClassName}>Điều 13: Cam kết chung</p>
            <p className={textClassName}>
              1. Các bên cam kết cung cấp đúng đầy đủ các thông tin cá nhân/pháp nhân của
              mình và tự chịu trách nhiệm về những thông tin này.
            </p>
            <p className={textClassName}>
              2. Hai bên cam kết thực hiện nghiêm chỉnh các nội dung đã thỏa thuận ghi
              trong hợp đồng.
            </p>
            <p className={textClassName}>Điều 14: Hiệu lực hợp đồng</p>
            <p className={textClassName}>
              1. Những nội dung quy định của Hợp Đồng này được ưu tiên áp dụng so với Quy
              Chế Hoạt Động Sàn Vận Tải TMĐT ExxeVn, các Điều Khoản Sử Dụng Chung đã được
              ExxeVn công bố tại địa chỉ website: https://www.Exxe.vn, trên ứng dụng
              ExxeVn.
            </p>
            <p className={textClassName}>
              2. Những nội dung không được quy định trong Hợp Đồng này thì áp dụng theo
              Quy Chế Hoạt Động Sàn Vận Tải TMĐT ExxeVn, các Điều Khoản Sử Dụng Chung đã
              được ExxeVn công bố tại địa chỉ website: https://www.Exxe.vn, trên ứng dụng
              ExxeVn.
            </p>
          </div>

          <div className={elementClassName}>
            <p className={`${titleClassName} text-center`}> ĐIỀU KHOẢN CỤ THỂ</p>
            <p className={textClassName}>
              1. Điều khoản cụ thể này quy định các thông tin tối thiểu theo yêu cầu của
              hợp đồng điện tử về cung cấp dịch vụ vận tải hành khách bằng xe ô tô theo
              quy định của pháp luật hiện hành đối với từng chuyến xe/cuốc xe được hiển
              thị trên ứng dụng ExxeVn trước khi Khách Hàng đặt chuyến và Tài Xế tiếp nhận
              chấp nhận cung cấp Dịch vụ theo Hợp Đồng này.
            </p>
            <p className={textClassName}>
              2. Các thông tin hiển thị trên ứng dụng ExxeVn của từng chuyến xe/cuốc xe
              bao gồm:
            </p>
            <p className={textClassName}>
              a) Thông tin về Tài Xế: Họ và tên, số điện thoại.
            </p>
            <p className={textClassName}>
              b) Thông tin về hành khách: Họ và tên, năm sinh, danh sách, số lượng hành
              khách.
            </p>
            <p className={textClassName}>
              c) Thông tin về phương tiện: biển kiểm soát xe và số chỗ ngồi.
            </p>
            <p className={textClassName}>
              d) Thông tin cụ thể đối với từng chuyến xe: Thời gian bắt đầu thực hiện và
              kết thúc chuyến đi (ngày, giờ), địa chỉ điểm đầu, địa chỉ điểm cuối và các
              điểm đón, trả khách trên hành trình vận chuyển, cự ly của hành trình vận
              chuyển (km).
            </p>
            <p className={textClassName}>
              e) Thông tin về giá trị từng chuyến đi (giá trị hợp đồng cụ thể theo
              chuyến): Giá cước vận tải và phụ phí, phụ thu, phí dịch vụ giá trị gia tăng.
            </p>
            <p className={textClassName}>
              f) Các thông tin cần thiết liên quan khác theo quy định của ExxeVn trong
              từng thời kỳ.
            </p>
            <p className={textClassName}>
              3. Điều khoản cụ thể này của mỗi chuyến xe/cuốc xe là một phần không thể
              thiếu và không thể tách rời của Hợp Đồng này.
            </p>
            <p className={textClassName}>
              4. Nội dung hiển thị của Điều khoản cụ thể của từng chuyến xe trên ứng dụng
              ExxeVn như sau:
            </p>

            <div className="flex flex-col items-end justify-end mt-24">
              <div className="flex-center flex-col">
                <p className={`${textClassNameSemibold} text-center max-w-[300px]`}>
                  CÔNG TY CỔ PHẦN ĐẦU TƯ CÔNG NGHỆ VÀ VẬN TẢI EXXEVN
                </p>
                <p className={`${textClassNameSemibold} text-center max-w-[200px]`}>
                  ĐẠI DIỆN THEO PHÁP LUẬT GIÁM ĐỐC
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  },
  {
    title: 'Hợp đồng hợp tác kinh doanh Tài Xế',
    content: (
      <>
        <div className={elementClassName}>
          <p className={titleClassName}>
            HỢP ĐỒNG HỢP TÁC VẬN CHUYỂN HÀNH KHÁCH THEO HỢP ĐỒNG ĐIỆN TỬ BẰNG XE Ô TÔ DƯỚI
            09 CHỖ
          </p>
          <p className={textClassName}>
            Hợp Đồng Vận Chuyển Hành Khách Theo Hợp Đồng Điện Tử Bằng Xe Ô Tô này (sau đây
            gọi tắt là: “Hợp Đồng”) được xác lập giữa:
          </p>
        </div>

        <div className={elementClassName}>
          <p className={`${textClassName} font-semibold md:font-semibold`}>
            I. Bên Cung Cấp Dịch Vụ:
          </p>
          <p className={textClassName}>
            Tên:{' '}
            <span className="font-semibold md:font-semibold">
              CÔNG TY CỔ PHẦN ĐẦU TƯ CÔNG NGHỆ VÀ VẬN TẢI EXXEVN (ExxeVn)
            </span>
          </p>
          <p className={textClassName}>
            Địa chỉ: Số 2 Hoàng Thế Thiện, Phường An Lợi Đông, Tp Thủ Đức, Tp.HCM.
          </p>
          <p className={textClassName}>Mã số thuế: 0317412411</p>
          <p className={textClassName}>Điện thoại: 19004744 - 0847878788</p>
          <p className={textClassName}>
            Đại diện bởi: Ông Đinh Quang Dũng – Tổng Giám đốc - Người đại diện theo Pháp
            luật
          </p>
          <p className={textClassName}>
            (Sau đây gọi tắt là: “
            <span className="font-semibold md:font-semibold">ExxeVn</span>” hoặc “{' '}
            <span className="font-semibold md:font-semibold">Đơn Vị Vận Tải</span>” hoặc “
            <span className="font-semibold md:font-semibold">Công ty</span>”).
          </p>
          <span className="font-semibold md:font-semibold">Và</span>
        </div>

        <p className={textClassNameSemibold}>II. Bên Sử Dụng Dịch Vụ</p>
        <p className={textClassName}>
          Là Tài Xế đã đăng ký sử dụng ứng dụng ExxeVn có nhu cầu sử dụng dịch vụ vận tải
          hành khách bằng xe ô tô dưới 09 chỗ ngồi.
        </p>
        <p className={textClassName}>
          Họ tên, địa chỉ, số điện thoại và mã số thuế (nếu có) của Tài Xế theo thông tin
          đã cung cấp khi đăng ký sử dụng ứng dụng ExxeVn, được hiển thị trên ứng dụng
          ExxeVn dành cho Khách Hàng và ExxeVn Driver dành cho Tài Xế.
        </p>
        <p className={textClassName}>
          App ExxeVnDriver: sau đây gọi tắt là “Người Vận Tải” hoặc “Tài Xế”).
        </p>
        <p className={textClassName}>
          App ExxeVn Driver và Người Vận Tải (hoặc Tài Xế) ký kết Hợp Đồng này trên cơ sở
          hoàn toàn tự nguyện, tự do ý chí, Hợp Đồng được hai Bên giao kết bằng phương
          thức điện tử thông qua ứng dụng ExxeDriver theo Quy chế quản lý hoạt động Sàn
          TMĐT ExxeDriver được Công ty đăng ký, tổ chức vận hành theo quy định của pháp
          luật thương mại điện tử và pháp luật có liên quan hiện hành.
        </p>
        <p className={textClassName}>Hợp Đồng này bao gồm 02 (hai) phần:</p>
        <p className={textClassName}>Phần I: Điều Khoản Chung</p>
        <p className={textClassNameSemibold}>
          Phần II: Điều Khoản Cụ Thể: Quy định về các nội dung tối thiểu của hợp đồng vận
          chuyển hành khách bằng xe ô tô dưới hình thức dịch vụ vận tải điện tử theo quy
          định của pháp luật kinh doanh vận tải bằng xe ô tô hiện hành.
        </p>
        <p className={textClassName}>ExxeVnDriver (ứng dụng dành cho Tài Xế)</p>
        <p className={textClassName}>
          Các điều khoản và điều kiện cụ thể của Hợp Đồng như sau:
        </p>
        <p className={textClassNameSemibold}>ĐIỀU KHOẢN CHUNG</p>
        <p className={textClassName}>
          Điều 1: Phương thức giao kết, thời hạn của hợp đồng
        </p>
        <p className={textClassNameSemibold}>1. Phương thức giao kết hợp đồng</p>
        <p className={textClassName}>
          a) Các bên đồng ý chấp thuận việc giao kết Hợp Đồng này bằng phương thức dịch vụ
          vận tải điện tử thông qua ứng dụng ExxeVn, có giá trị pháp lý như hợp đồng ký
          kết bằng văn bản và có giá trị làm chứng cứ.
        </p>
        <p className={textClassName}>
          b) Quy trình giao kết hợp đồng điện tử: Theo Phụ lục 4 của Quy chế quản lý hoạt
          động ứng dụng ExxeVn hiện hành do ExxeVn công bố theo quy định trên ứng dụng
          ExxeVn và/hoặc trên trang thông tin điện tử của ExxeVn.
        </p>
        <p className={textClassNameSemibold}>2. Nội dung Hợp tác:</p>

        <p className={textClassName}>
          Đối tác Tài Xế và ExxeVnDriver cùng nhau hợp tác kinh doanh cung cấp dịch vụ vận
          tải bằng xe ô tô dưới 9 chỗ ngồi trên cơ sở ứng dụng kho học công nghệ hỗ trợ
          quản lý và kết nối hoạt động vận tải theo hợp đồng điện tử thông qua
          ExxeVnDriver theo quy định của pháp luật hiện hành.
        </p>

        <p className={textClassNameSemibold}>3. Thời điểm giao kết hợp đồng:</p>
        <p className={textClassName}>
          c) Tài Xế khi đăng ký sử dụng ứng dụng ExxeVnDriver (phần mềm ứng dụng hỗ trợ
          kết nối vận tải trên thiết bị di động được vận hành bởi ExxeVn hoặc đơn vị thành
          viên của ExxeVn). Sau khi đã cung cấp các thông tin yêu cầu về họ tên, địa chỉ,
          số điện thoại và các thông tin yêu cầu khác.
        </p>
        <p className={textClassName}>
          Ứng dụng ExxeVnDriver sẽ hiển thị nội dung Hợp Đồng này: Sau khi Khách Hàng đã
          đọc toàn bộ nội dung hợp đồng được hiển thị và tự nguyện đồng ý với tất cả nội
          dung của hợp đồng bằng việc nhấn nút đồng ý đăng ký sử dụng ứng dụng để
          ExxeVnDriver xem xét chấp thuận.
        </p>
        <p className={textClassName}>
          d) Thời điểm Hợp Đồng này được giao kết giữa các Bên là thời điểm ExxeVnDriver
          chấp thuận cho Tài Xế được sử dụng ứng dụng ExxeVnDriver (ứng dụng dành cho Tài
          Xế) theo đúng quy trình giao dịch đã công bố trên ứng dụng ExxeVn và trang thông
          tin điện tử của ExxeVn.
        </p>
        <p className={textClassName}>
          4. Thời hạn Hợp Đồng: Tính từ thời điểm giao kết Hợp đồng tại khoản 1.2. Điều
          này cho đến khi Tài khoản ứng dụng ExxeVnDriver của Tài Xế bị chấm dứt theo Hợp
          Đồng này và/hoặc theo Quy chế quản lý hoạt động ứng dụng ExxeVnDriver hiện hành
          đã được ExxeVn công bố, thông báo.
        </p>
        <p className={textClassNameSemibold}>Điều 2: Dịch vụ vận tải:</p>

        <p className={textClassName}>
          1. Dịch vụ được cung cấp theo Hợp Đồng này là dịch vụ vận tải hành khách theo
          hợp đồng bằng xe ô tô dưới 09 (chín) chỗ ngồi được kết nối cung cấp dịch vụ
          thông qua ứng dụng ExxeVn, Và Khách Hàng có nhu cầu thuê cả chuyến xe (bao gồm
          cả thuê người Tài Xế) (sau đây được gọi tắt là: “Dịch vụ”).
        </p>
        <p className={textClassNameSemibold}>2. Thông tin về từng chuyến xe:</p>
        <p className={textClassName}>
          a./ Thời gian bắt đầu thực hiện và kết thúc (ngày, giờ), địa chỉ điểm đầu, địa
          chỉ điểm cuối và các điểm đón, trả khách trên hành trình vận chuyển.
        </p>
        <p className={textClassName}>
          b/. Cự ly của hành trình vận chuyển (số km), số lượng khách và các nội dung cần
          thiết khác do Khách Hàng lựa chọn, được hiển thị trên ứng dụng ExxeVn để Khách
          Hàng xem xét tự nguyện quyết định sử dụng Dịch vụ Vận Tải bằng việc Khách Hàng
          thao tác hoàn tất đặt chuyến xe trên ứng dụng ExxeVn.
        </p>
        <p className={textClassName}>
          c/. Nội dung thông tin về từng chuyến xe được ghi nhận, hiển thị trên ứng dụng
          ExxeVn tại Điều này trở thành Phụ lục hợp đồng, là các nội dung không thay đổi
          của Hợp Đồng này.
        </p>
        <p className={textClassNameSemibold}>Điều 3: Giá cả dịch vụ, phụ phí, phí</p>
        <p className={textClassName}>
          1. Giá cả Dịch vụ bao gồm: cước vận tải, phụ phí nhu cầu cao và phí dịch vụ giá
          trị gia tăng được ExxeVnDriver cung cấp (nếu có) tính cho từng cuốc xe (chuyến
          xe) được hiển thị trên ứng dụng ExxeVnDriver để Khách Hàng/Tài Xế biết trước khi
          quyết định gửi yêu cầu cung cấp Dịch vụ (thực hiện lệnh “Đặt xe” hoặc “Nhận
          chuyến” trên ứng dụng ExxeVnDriver).{' '}
        </p>
        <p className={textClassName}>
          Để hiểu rõ, trường hợp Khách Hàng/Tài Xế đã tiến hành gửi yêu cầu “Đặt Xe”/
          “Nhận Chuyến” - Dịch vụ được hiểu là Khách Hàng/Tài Xế đã chấp nhận Giá cả Dịch
          vụ của cuốc xe đó.
        </p>
        <p className={textClassName}>
          2. Giá cả Dịch vụ đã bao gồm 10% thuế giá trị gia tăng.
        </p>
        <p className={textClassName}>
          3. Tỉ lệ phân chia kết quả hợp tác kinh doanh theo Hợp Đồng:
        </p>
        <p className={textClassName}>
          - Đối tác Tài Xế được phân chia 95% (có thể thay đổi) doanh thu dịch vụ vận tải
          hành khách (đã bao gồm 10% thuế giá trị gia tăng) thực tế của từng chuyến xe.
        </p>
        <p className={textClassName}>
          - ExxeVnDriver được phân chia 5%(có thể thay đổi) của doanh thu dịch vụ vận tải
          hành khách (đã bao gồm 10% thuế giá trị gia tăng thực tế của từng chuyến xe).
        </p>
        <p className={textClassName}>
          - Tỉ lệ phân chia kết quả kinh doanh cho doanh nghiệp/HTX vận tải mà Phương tiện
          mang phù hiệu của đơn vị sẽ đc ExxeVnDriver quyết định căn cứ vào phạm vi trách
          nhiệm hợp tác theo hợp đồng hợp tác ký kết.
        </p>
        <p className={textClassName}>
          - Đối với phí sử dụng ứng dụng, ExxeVn được quyền thu phí sử dụng Phần mềm ứng
          dụng hỗ trợ kết nối vận tải (App ExxeVn) đối với Khách hàng mà không phải phân
          chia cho Đối tác Tài Xế.
        </p>
        <p className={textClassNameSemibold}>4. Giá cả Dịch vụ chưa bao gồm:</p>
        <p className={textClassName}>
          a/. Phí cầu đường, phà, bến bãi. Các phí/chi phí này không tính vào Giá cả Dịch
          vụ để tính chiết khấu thương mại, khuyến mại (nếu có). Khách Hàng hoặc Hành
          khách đi xe sẽ chi trả trực tiếp các khoản phí/chi phí này cho Tài Xế theo thực
          tế phát sinh của từng cuốc xe.
        </p>
        <p className={textClassName}>
          b/. Trường hợp Khách Hàng, Hành khách không thanh toán trực tiếp bằng tiền mặt
          cho Tài Xế và Khách Hàng lựa chọn thanh toán qua phương thức trả phụ phí trên
          ứng dụng ExxeVn, ExxeVn sẽ thực hiện việc thu hộ các khoản phí/chi phí này để
          thanh toán lại cho Tài Xế.
        </p>
        <p className={textClassName}>
          c/. Chưa bao gồm: Phát sinh Chi phí đỗ xe, ăn ở, chỗ nghỉ lại của Tài Xế (Áp
          dụng với chuyến xe 2 chiều, qua đêm, 2 ngày 1 đêm, 3 ngày 2 đêm…)
        </p>
        <p className={textClassName}>5. Giá cả Dịch Vụ Vận Tải:</p>
        <p className={textClassName}>
          Cước phí vận tải được Hợp Tác Xã cung cấp thông tin cho ExxeVn để tính toán dựa
          trên cự ly hành trình vận chuyển (số kilomet), Loại xe (4 chỗ, 7 chỗ, 16 chỗ).
          Loại chuyến xe: đi 1 chiều, 2 chiều, Đi ghép, Tiện chuyến. Thời gian (1ngày – n
          ngày) theo nhu cầu của Khách hàng.
        </p>
        <p className={textClassName}>
          6. Quy định về Giá cước dựa theo thời gian Vận chuyển hành khách:
        </p>
        <p className={textClassName}>
          a/. Từ thứ 2 đến thứ 6: Giá chuyến xe bình thường.
        </p>
        <p className={textClassName}> b/. Thứ 7 và Chủ Nhật: Giá chuyến xe tăng 8%.</p>
        <p className={textClassName}> c/. Các ngày lễ tết: Giá chuyến xe tăng 18%.</p>
        <p className={textClassName}>
          7. Xuất hóa đơn dịch vụ vận tải và khuyến mại cho Khách hàng:
        </p>
        <p className={textClassName}>
          – ExxeVn có trách nhiệm lập hóa đơn tài chính cho Khách hàng khi có yêu cầu hoặc
          theo quy định của pháp luật đối với Doanh thu dịch vụ vận tải (Kết quả kinh
          doanh) được phân chia của ExxeVn theo hợp đồng hợp tác đã ký kết.
        </p>
        <p className={textClassName}>
          -Để nhận hóa đơn, chứng từ liên quan đến cuốc xe, Khách hàng phải chọn nhập
          thông tin hóa đơn qua ứng dụng ExxeVn khi đặt dịch vụ để hệ thống ghi nhận. Nếu
          Khách hàng không chọn nhập thông tin yêu cầu hóa đơn qua ứng dụng ExxeVn, thời
          gian tối đa ExxeVn hỗ trợ xuất hóa đơn cho Khách hàng là 7 (bảy) ngày.
        </p>
        <p className={textClassName}>
          – Đối Tác Tài Xế ủy nhiệm cho ExxeVn lập hóa đơn tài chính cho Khách hàng khi có
          yêu cầu hoặc theo quy định của pháp luật đối với Doanh thu dịch vụ vận tải (Kết
          quả kinh doanh) được phân chia của Đối Tác Tài Xế theo hợp đồng hợp tác đã ký
          kết.
        </p>
        <p className={textClassName}>
          – Số tiền khuyến mại cho Khách hàng sẽ được tính và ghi nhận trên hóa đơn tài
          chính được ExxeVn cung cấp cho Khách hàng theo chương trình khuyến mại mà ExxeVn
          thực hiện và đăng ký với Bộ Công Thương, theo đó, số tiền chiết khấu thương mại,
          giảm giá được thể hiện trên hóa đơn tài chính được trừ vào phần doanh thu được
          phân chia của ExxeVn và Đối Tác Tài Xế không bị trừ bất kỳ chi phí nào từ số
          tiền khuyến mại này.
        </p>
        <p className={textClassName}>8. Các khoản nghĩa vụ tài chính, thuế của Lái xe:</p>
        <p className={textClassName}>
          – Đối Tác Tài Xế có tổng doanh thu kinh doanh trong năm dương lịch trên 100
          triệu đồng (gọi tắt là: “Doanh thu tính thuế”) thì phải khai thuế giá trị gia
          tăng, thuế thu nhập cá nhân.
        </p>
        <p className={textClassName}>
          – Tỷ lệ thuế tính trên doanh thu áp dụng đối với cá nhân kinh doanh ngành nghề
          vận tải theo quy định hiện hành như sau:
        </p>
        <p className={textClassName}>
          (i) Tỷ lệ thuế giá trị gia tăng là 3% tính trên doanh thu được phân chia cho Đối
          Tác Tài Xế theo hợp đồng HTKD (có thể thay đổi theo quy định của cơ quan thuế
          ban hành).
        </p>
        <p className={textClassName}>
          (ii) Tỷ lệ thuế thu nhập cá nhân là 1,5% tính trên doanh thu được phân chia cho
          Đối Tác Tài Xế theo hợp đồng HTKD (có thể thay đổi theo quy định của cơ quan
          thuế ban hành) .
        </p>
        <p className={textClassName}>
          (iii) Đối với các khoản tiền thưởng khuyến khích theo doanh thu thì không tính
          thuế giá trị gia tăng, thuế thu nhập cá nhân là 1% tính trên tiền thưởng nhận
          được.
        </p>
        <p className={textClassName}>
          (iv) Đối với các khoản tiền thưởng chất lượng, hỗ trợ khác nếu có mức từ 02
          triệu đồng/lần trở lên thì thuế thu nhập cá nhân là 10% tính trên tiền
          thưởng/tiền hỗ trợ.
        </p>
        <p className={textClassName}>
          – Đối Tác Tài Xế ủy nhiệm vô điều kiện, không hủy ngang cho ExxeVn khai thuế và
          nộp thuế thay cho Đối Tác Tài Xế đối với Kết quả kinh doanh được phân chia của
          TÀI XẾ theo hợp đồng HTKD; các khoản khuyến khích, hỗ trợ, thưởng kinh doanh
          khác (nếu có) Đối Tác Tài Xế nhận được trong quá trình hợp tác kinh doanh với
          ExxeVn (gọi chung là: “Nghĩa Vụ Tài Chính’’).
        </p>
        <p className={textClassName}>
          – Đối Tác Tài Xế ủy quyền vô điều kiện, không hủy ngang cho ExxeVn thay mặt và
          nhân danh Đối Tác Tài Xế để làm việc với cơ quan thuế về việc tiến hành các thủ
          tục lập tờ khai, trích, nộp thuế, lệ phí và nghĩa vụ tài chính khác của Đối Tác
          Tài Xế phải nộp phát sinh từ hợp đồng Hợp tác.
        </p>
        <p className={textClassName}>
          – ExxeVn có quyền và nghĩa vụ tạm trích và giữ lại để nộp thay cho Đối Tác Tài
          Xế về các Nghĩa Vụ Tài Chính đối với Kết quả kinh doanh được phân chia của Đối
          Tác Tài Xế theo hợp đồng HTKD của mỗi chuyến xe hoàn thành qua ứng dụng ExxeVn
          và các Nghĩa Vụ Tài Chính tính trên các khoản thưởng, khuyến khích, hỗ trợ khác
          của Đối Tác Tài Xế nhận được trong quá trình hợp tác kinh doanh với ExxeVn.
        </p>
        <p className={textClassName}>
          – Đến hết năm tài chính, (Tính từ ngày 01/01 đến hết 31/12), nếu doanh thu được
          phân chia cho Đối Tác Tài Xế theo hợp đồng hợp tác lũy kế chưa đạt mức Doanh thu
          tính thuế đối với cá nhân kinh doanh theo quy định của pháp luật hiện hành thì
          ExxeVn sẽ hoàn trả cho Đối Tác Tài Xế số tiền thuế tạm trích và giữ lại theo quy
          định của pháp luật.
        </p>
        <p className={textClassName}>
          – Trong năm tài chính, (Tính từ ngày 01/01 đến hết 31/12), nếu doanh thu được
          phân chia cho Đối Tác Tài Xế theo hợp đồng hợp tác lũy kế đạt mức Doanh thu tính
          thuế đối với cá nhân kinh doanh theo quy định của pháp luật hiện hành thì ExxeVn
          có trách nhiệm khai thuế và nộp thay thuế kịp thời và đầy đủ theo quy định của
          pháp luật hiện hành.
        </p>
        <p className={textClassName}>
          – Khi quy định của pháp luật thay đổi về nghĩa vụ tài chính, mức thuế, phí, lệ
          phí phải nộp cho nhà nước thì ExxeVn có quyền trích giữ lại, thay đổi tỷ lệ
          trích cho phù hợp mà không cần phải có sự chấp thuận của Đối Tác Tài Xế nhưng sẽ
          thông báo kịp thời cho Đối Tác Tài Xế biết trước khi thực hiện.
        </p>
        <p className={textClassName}>9. Đăng ký và cung cấp mã số thuế cá nhân:</p>
        <p className={textClassName}>
          Đối Tác Tài Xế khi tham gia hợp tác kinh doanh với ExxeVn có trách nhiệm tự mình
          thực hiện thủ tục đăng ký thuế để được cấp mã số thuế theo quy định của pháp
          luật về quản lý thuế. ExxeVn có quyền, nhưng không có nghĩa vụ thực hiện việc
          đăng ký mã số thuế cá nhân thay cho Đối Tác Tài Xế.
        </p>
        <p className={textClassName}>Điều 4: Thanh toán và hóa đơn:</p>
        <p className={textClassName}> Đối với Tài Xế (Người Vận Tải):</p>
        <p className={textClassName}>
          {' '}
          1/. Xem xét thông tin chuyến xe trên App ExxeVnDriver và lựa chọn chuyến xe phù
          hợp. Đối tác Tài Xế tiến hành đặt cọc 20% số tiền của chuyến đi để nhận chuyến.
        </p>
        <p className={textClassName}>
          {' '}
          2/. Sau khi nhận chuyến thành công, Đối tác Tài xế liên lạc với hành Khách nhằm
          xác nhận thời gian và điểm đón rõ ràng.
        </p>
        <p className={textClassName}>
          {' '}
          3/. Hoàn tất chuyến đi: Hoàn tất đưa Khách Hàng đến nơi. Đối tác Tài Xế nhận 80%
          số tiền còn lại từ Khách Hàng và Xác nhận “Hoàn Tất chuyến Xe” trên App
          ExxeDriver. Ngoài ra, Đối Tác Tài Xế thu thêm phí cầu đường, bến bãi phát sinh
          (nếu có) trong hành trình chuyến đi.
        </p>
        <p className={textClassName}>
          Điều 5: Quyền và nghĩa vụ của ExxeVn với Khách hàng:
        </p>
        <p className={textClassName}>
          1. Yêu cầu Người Thuê Vận Tải/Hành khách thanh toán đầy đủ, kịp thời Giá cả Dịch
          vụ phát sinh theo Hợp Đồng này.
        </p>
        <p className={textClassName}>
          2. Từ chối cung cấp Dịch vụ, khóa hoặc tạm khóa tài khoản ứng dụng ExxeVn của
          Người Thuê Vận Tải/Hành khách nếu có bất kỳ vi phạm các quy định, quy chế dịch
          vụ của ExxeVn và/hoặc các quy định của pháp luật.
        </p>
        <p className={textClassName}>
          3. Yêu cầu Khách Hàng/Hành khách cung cấp đúng, đầy đủ, trung thực các thông tin
          bao gồm nhưng không giới hạn: họ tên, địa chỉ, số CMND/CCCD, email, số điện
          thoại, thông tin cần thiết khác theo quy định của pháp luật khi đăng ký, sử dụng
          Dịch vụ và giao kết Hợp Đồng này.
        </p>
        <p className={textClassName}>
          4. Gửi thông báo và/hoặc ngắt kết nối Tài Khoản ứng dụng ExxeVn nếu:
        </p>
        <p className={textClassName}>
          a) Đã hết hạn thanh toán mà Khách Hàng không thanh toán đầy đủ Cước Dịch Vụ,
          khoản phải thanh toán cho ExxeVn.
        </p>
        <p className={textClassName}>
          b) Khách Hàng và/hoặc Hành khách vi phạm các điều khoản của Hợp Đồng này. Hoặc
          Khách Hàng /Hành khách vi phạm Quy chế hoạt động, Điều khoản sử dụng, Quy tắc
          ứng xử của Sàn TMĐT ExxeVn được ExxeVn công bố trong từng thời kỳ.
        </p>
        <p className={textClassName}>
          5. Được miễn trừ trách nhiệm đối với việc Khách Hàng hoặc Hành khách tiết lộ
          thông tin truy cập dẫn đến bị người khác sử dụng trái phép Tài Khoản ứng dụng
          ExxeVn của Khách hàng mà không thông báo ngay cho đại diện ExxeVn làm thủ tục
          phong tỏa Tài Khoản ứng dụng ExxeVn.
        </p>
        <p className={textClassName}>
          Nếu việc tiết lộ thông tin truy cập dẫn đến phát sinh Cước Phí Dịch Vụ thì Khách
          Hàng phải hoàn toàn chịu trách nhiệm và phải thanh toán số tiền phát sinh này
          cho ExxeVn.
        </p>
        <p className={textClassName}>
          6. ExxeVn được quyền miễn trừ trách nhiệm trong các trường hợp Khách Hàng/Hành
          khách không thể sử dụng ứng dụng ExxeVn để đặt Dịch vụ trong các trường hợp sau:
        </p>
        <p className={textClassName}>
          a) Lỗi phần cứng hoặc phần mềm hoàn toàn nằm ngoài tầm kiểm soát hợp lý của
          ExxeVn.
        </p>
        <p className={textClassName}>
          b) Lỗi mạng Internet, lỗi máy móc, hay lỗi hệ thống, ngưng khi bảo trì hệ thống,
          do các sự kiện bất khả kháng tác động.
        </p>
        <p className={textClassName}>
          7. Hướng dẫn Khách Hàng các bước tải, đăng ký và kích hoạt Tài Khoản ứng dụng
          ExxeVn.
        </p>
        <p className={textClassName}>
          8. Chịu trách nhiệm mua bảo hiểm tai nạn con người cho Người Sử Dụng đang trong
          Chuyến Xe phù hợp với khả năng tài chính của mình trong từng thời kỳ.
        </p>
        <p className={textClassName}>
          9. Thực hiện đầy đủ các nghĩa vụ thuế phát sinh khi kinh doanh dịch vụ vận tải
          theo quy định của pháp luật.
        </p>
        <p className={textClassName}>
          10. Các quyền và nghĩa vụ khác theo quy định của pháp luật.
        </p>
        <p className={textClassName}>
          Điều 6: Quyền và nghĩa vụ của Tài Xế: (Người Vận Chuyển)
        </p>
        <p className={textClassName}>
          1. Tài Xế có quyền (theo ủy quyền của ExxeVn và Doanh nghiệp/HTX Vận tải chủ
          quản của Tài Xế) thu cước, phí vận tải theo Hợp Đồng giao kết với Khách hàng.
        </p>
        <p className={textClassName}>2. Tài Xế có các quyền:</p>
        <p className={textClassName}>
          a) Từ chối phục vụ khi Hành Khách có những hàng hoá:
        </p>
        <p className={textClassName}>
          - Rượu các loại, Thuốc lá điếu, xì gà và các dạng thuốc lá thành phẩm khác. Các
          loại hàng hoá dễ cháy nổ như pháo nổ, thuốc pháo nổ. Các chất ma túy. Thiết bị
          gây nhiễu thông tin di động tế bào. Đèn trời. Vũ khí quân dụng, trang thiết bị,
          kĩ thuật, khí tài, phương tiện chuyên dùng quân sự, công an, quân trang.
        </p>
        <p className={textClassName}>
          - Đồ chơi nguy hiểm, đồ chơi có hại tới giáo dục nhân cách và sức khỏe của trẻ
          em hoặc tới an ninh, trật tự, văn hóa xã hội (bao gồm cả các chương trình trò
          chơi điện tử).
        </p>
        <p className={textClassName}>
          - Các sản phẩm văn hóa phản động, đồi trụy, mê tín dị đoan hoặc có hại tới giáo
          dục thẩm mỹ, nhân cách. Di vật, cổ vật, bảo vật quốc gia thuộc di tích lịch sử
          văn hóa và danh lam thắng cảnh, thuộc sở hữu toàn dân, sở hữu của các tổ chức
          chính trị, tổ chức chính trị – xã hội. Hóa chất độc, tiền chất. Thuốc lá điếu,
          xì gà và các dạng thuốc lá thành phẩm khác nhập lậu.
        </p>
        <p className={textClassName}>
          - Thực vật, động vật hoang dã. Thủy sản cấm khai thác, thủy sản có dư lượng chất
          độc hại vượt quá giới hạn cho phép, thủy sản có yếu tố độc tự nhiên gây nguy
          hiểm đến tính mạng con người. Các loại thuốc chữa bệnh cho người, các loại vắc
          xin, sinh phẩm y tế, mỹ phẩm, hóa chất và chế phẩm diệt côn trùng, diệt khuẩn
          trong lĩnh vực gia dụng và y tế chưa được sử dụng tại Việt Nam.
        </p>
        <p className={textClassName}>
          - Các loại trang thiết bị y tế chưa được phép sử dụng tại Việt Nam. Các loại mỹ
          phẩm y tế chưa được công bố với cơ quan có thẩm quyền.
        </p>
        <p className={textClassName}>
          b) Từ chối vận chuyển khi: Hành khách theo hợp đồng vận chuyển có hành vi gây
          rối trật tự công cộng, gây cản trở công việc của người kinh doanh vận tải, ảnh
          hưởng đến sức khoẻ, tài sản của người khác, gian lận cước vận chuyển. Hành khách
          có hành vi gây mất an ninh, trật tự, an toàn trên xe hoặc đang bị dịch bệnh nguy
          hiểm.{' '}
        </p>
        <p className={textClassName}>
          3. Tài Xế có trách nhiệm: Khi cung cấp Dịch vụ, có thái độ văn minh, lịch sự,
          hướng dẫn hành khách ngồi đúng nơi quy định, Kiểm tra việc sắp xếp hành lý bảo
          đảm an toàn, Có biện pháp bảo vệ tính mạng, sức khỏe, tài sản của hành khách đi
          xe, giữ gìn trật tự, vệ sinh trong xe. Đóng cửa lên xuống của xe trước và trong
          khi xe chạy.
        </p>
        <p className={textClassName}>
          4. Tài Xế phải thực hiện nghiêm túc và đầy đủ quy trình: Bảo đảm an toàn giao
          thông áp dụng đối với đơn vị kinh doanh vận tải bằng xe ô tô theo quy định của
          pháp luật, của ExxeVn và của DN/HTX Vận tải là đơn vị chủ quản của mình, bao gồm
          nhưng không giới hạn việc thực hiện:
        </p>
        <p className={textClassName}>
          a) Trước khi cho xe khởi hành, Tài Xế phải thực hiện kiểm tra đảm bảo tình trạng
          an toàn kỹ thuật của phương tiện gồm các nội dung chính sau: Kiểm tra thiết bị
          giám sát hành trình đảm bảo tình trạng hoạt động tốt, Kiểm tra nước làm mát, dầu
          động cơ, bình điện, các dây cu roa, Kiểm tra hệ thống lái, Kiểm tra các bánh xe
          (độ chặt của bu lông bánh xe, tình trạng và áp suất của lốp), Khởi động phương
          tiện và kiểm tra hoạt động của gạt nước, còi và các loại đèn, Kiểm tra hoạt động
          của hệ thống phanh (thắng), Ghi chép kết quả kiểm tra vào biểu kết quả kiểm tra
          an toàn kỹ thuật phương tiện hoặc cập nhật vào phần mềm (nếu có) theo quy định.
          Trường hợp có nội dung kiểm tra không đảm bảo yêu cầu, thì tùy theo mức độ của
          từng hạng mục để tổ chức khắc phục ngay hoặc báo cáo ngay về bộ phận có chức
          năng của DN/HTX Vận tải là đơn vị chủ quản của mình để xử lý,
        </p>
        <p className={textClassName}>
          b) Khi xe đang hoạt động trên đường, Tài Xế phải chấp hành nghiêm các quy định
          về an toàn giao thông trong quá trình điều khiển phương tiện để vận chuyển hành
          khách, chấp hành quy định về thời gian Tài Xế liên tục, thời gian làm việc trong
          ngày của Tài Xế, quy định về tốc độ, báo cáo ngay thời gian, địa điểm và nguyên
          nhân khi xảy ra sự cố mất an toàn giao thông để ExxeVn và/hoặc DN/HTX Vận tải là
          đơn vị chủ quản của mình có biện pháp xử lý kịp thời,
        </p>
        <p className={textClassName}>
          c) Khi xe kết thúc hành trình, Tài Xế phải thực hiện các nhiệm vụ: Nhận đủ tiền
          từ Khách Hàng và Nhấn hoàn tất chuyến xe trên App ExxeDriver. Sau khi kết thúc
          hành trình, trước khi rời khỏi xe, Tài Xế phải kiểm tra để bảo đảm không còn
          hành khách ở trên xe cũng như đồ đạc của Hành Khách để quên trên xe. Báo cáo về
          tổng đài ExxeVn về đồ đạc Khách hàng để quên (nếu có) bao gồm cả hình ảnh…
        </p>
        <p className={textClassName}>
          5. Thực hiện vận chuyển hành khách theo đúng hành trình, lịch trình theo Hợp
          đồng vận chuyển hiển thị trên ứng dụng ExxeVn.
        </p>
        <p className={textClassName}>
          Chỉ được đón, trả khách theo đúng địa điểm hiển thị trong ứng dụng ExxeVn. Không
          được gom khách, đón khách ngoài danh sách mà Khách Hàng đặt qua ứng dụng ExxeVn.
        </p>
        <p className={textClassName}>
          Không được bán vé hoặc thu quá số tiền trên cước Vận chuyển đã thể hiện trên
          App. Chỉ được phép thu phí cầu đường, bến bãi trên đoạn đường phục vụ hành
          khách.
        </p>
        <p className={textClassName}>
          6. Ngoài hoạt động cấp cứu người, phục vụ các nhiệm vụ khẩn cấp như thiên tai,
          địch họa theo yêu cầu của lực lượng chức năng, xe ô tô vận chuyển hành khách
          theo hợp đồng không được đón, trả khách ngoài các địa điểm theo Hợp đồng vận
          chuyển hiển thị trên ứng dụng ExxeVn.
        </p>
        <p className={textClassName}>
          7. Tài Xế điều khiển phương tiện kết nối cung cấp dịch vụ qua ứng dụng ExxeVn
          phải có điện thoại thông minh hoặc các thiết bị điện tử phù hợp theo yêu cầu của
          ExxeVn để truy cập được giao diện thể hiện hợp đồng vận tải điện tử, danh sách
          hành khách theo quy định của Bộ Giao thông vận tải.
        </p>
        <p className={textClassName}>
          8. Giữ gìn vệ sinh phương tiện, không được sử dụng các biện pháp kỹ thuật, trang
          thiết bị ngoại vi, các biện pháp khác để can thiệp vào quá trình hoạt động, phá
          (hoặc làm nhiễu) sóng GPS, GSM hoặc làm sai lệch dữ liệu của thiết bị giám sát
          hành trình của xe ô tô.
        </p>
        <p className={textClassName}>
          9. Không chở quá số người được phép chở và không vượt quá khối lượng toàn bộ cho
          phép tham gia giao thông được ghi trong Giấy chứng nhận kiểm định an toàn kỹ
          thuật và bảo vệ môi trường của xe ô tô. Hành lý phải được xếp dàn đều trong
          khoang chở hành lý, đảm bảo không bị xê dịch trong quá trình vận chuyển. Không
          được chở hàng cấm, hàng dễ cháy, nổ, động vật sống, hàng hóa không có nguồn gốc,
          xuất xứ, hàng hóa là thực phẩm bẩn.
        </p>
        <p className={textClassName}>
          10. Chuyên chở hành khách từ địa điểm xuất phát đến đúng địa điểm, bằng phương
          tiện đã thoả thuận một cách an toàn, theo lộ trình, bảo đảm đủ chỗ cho hành
          khách và không chuyên chở vượt quá số người, quá trọng tải quy định.
        </p>
        <p className={textClassName}>
          11. Đảm bảo đáp ứng đầy đủ các điều kiện về kinh doanh vận tải với phương tiện
          và đối với Tài Xế kinh doanh.
        </p>
        <p className={textClassName}>
          12. Tuân thủ đầy đủ, đúng các quy định đã thỏa thuận tại Hợp đồng này, quy định
          của pháp luật, chính sách, quy chế, điều khoản sử dụng, quy định, chuẩn mực dịch
          vụ được công bố, thông báo của ExxeVn và hoặc DN/HTX vận tải chủ quản của mình
          trong quá trình hợp tác kinh doanh.
        </p>
        <p className={textClassName}>
          13. Chịu trách nhiệm, thanh toán cho các bên liên quan một cách đầy đủ, đúng hạn
          các khoản chi phí, các nghĩa vụ được thỏa thuận tại Hợp Đồng này và các hợp
          đồng, thỏa và các thỏa thuận khác.
        </p>
        <p className={textClassName}>
          14. Cam kết, đảm bảo đối với phương tiện tham gia kinh doanh của mình có đầy đủ
          điều kiện theo quy định của pháp luật hiện hành và yêu cầu của ExxeVn. Đảm bảo
          chế độ bảo dưỡng phương tiện tham gia hợp tác kinh doanh kịp thời, nhanh chóng
          và đúng kỳ hạn, kiểm tra kỹ thuật, bảo dưỡng theo tiêu chuẩn an toàn giao thông
          trước khi cung cấp dịch vụ.
        </p>
        <p className={textClassName}>
          15. Không được giao xe cho người khác không đủ điều kiện điều khiển phương tiện
          dưới bất kỳ hình thức nào hoặc chuyên chở các loại vũ khí hay chất nổ, hàng có
          mùi hôi thối và hàng quốc cấm … mà pháp luật nghiêm cấm. Không được sử dụng
          Phương tiện để chuyên chở, thực hiện các hành vi vi phạm pháp luật. Nếu thực
          hiện các hành vi này thì chịu trách nhiệm hoàn toàn trước pháp luật và bên thứ
          ba.
        </p>
        <p className={textClassName}>
          16. Tham gia đầy đủ các buổi hướng dẫn về cách thức sử dụng ứng dụng ExxeVn cho
          người dùng, tiêu chuẩn cung cấp dịch vụ, phương thức thanh toán và các nội dung
          khác nhằm nâng cao chất lượng đội ngũ Tài Xế tham gia sử dụng ứng dụng ExxeVn.
        </p>
        <p className={textClassName}>
          17. Thực hiện các trách nhiệm khác theo quy định tại Luật Giao thông đường bộ,
          Nghị định số 10/2020/NĐ-CP và quy định pháp luật khác có liên quan.
        </p>
        <p className={textClassName}>18. Tài Xế cam kết:</p>
        <p className={textClassName}>
          a) Đảm bảo thời gian làm việc đối với Tài Xế ô tô kinh doanh không được quá 10
          (mười) giờ trong một ngày và không được Tài Xế liên tục quá 04 (bốn) giờ hoặc
          thời gian theo quy định của pháp luật,
        </p>
        <p className={textClassName}>
          b) Thực hiện cung cấp dịch vụ vận tải theo hợp đồng này một cách công bằng cho
          tất cả Khách hàng, không phân biệt việc có hay không sử dụng mã khuyến mại, mã
          cước phí được cung cấp bởi ExxeVn, không phân biệt thanh toán bằng tiền mặt, thẻ
          thanh toán, trả trước hoặc trả sau, không phân biệt khách hàng đi quãng đường
          ngắn hay quãng đường dài, các hình thức phân biệt đối xử khác gây tổn hại đến
          thương hiệu ExxeVn và gây phản cảm cho xã hội,
        </p>
        <p className={textClassName}>
          c) Tham gia đầy đủ các buổi tập huấn nghiệp vụ đối với người hành nghề Tài Xế về
          pháp luật giao thông đường bộ, phải chấp hành và thực hiện nghiêm chỉnh Luật
          giao thông đường bộ, đảm bảo an toàn giao thông và đảm bảo an toàn tính mạng,
          tài sản của khách hàng trong hoạt động kinh doanh,
        </p>
        <p className={textClassName}>
          d) Chịu trách nhiệm hoàn toàn đối với các phát sinh bồi thường thiệt hại về dân
          sự/ bồi thường thiệt hại ngoài Hợp đồng theo quy định đối với Tài Xế, chủ phương
          tiện khi gây ra tai nạn.
        </p>
        <p className={textClassName}>
          e) Phải hoàn toàn chịu trách nhiệm thanh toán các chi phí phạt phát sinh về hành
          vi vi phạm hành chính khi tham gia giao thông.
        </p>
        <p className={textClassName}>
          f) Cam kết bảo mật tuyệt đối thông tin của Khách hàng, thông tin về Hợp đồng
          này.
        </p>
        <p className={textClassName}>
          19. Tài Xế có nghĩa vụ thực hiện các quy định sau đối với phương tiện của mình:
        </p>
        <p className={textClassName}>
          a) Thực hiện đầy đủ quyền và nghĩa vụ theo quy định của pháp luật đối với loại
          hình kinh doanh vận tải hành khách theo Hợp đồng vận tải đối với xe ô tô dưới 16
          chỗ ngồi), bao gồm bảo đảm an toàn, quyền và lợi ích hợp pháp cho hành khách,
          chất lượng xe, biển hiệu xe, chất lượng Tài Xế, chất lượng dịch vụ… theo quy
          định của pháp luật hiện hành,
        </p>
        <p className={textClassName}>
          b) Niêm yết và duy trì: tên và số điện thoại của đơn vị kinh doanh vận tải ở
          phần đầu mặt ngoài hai Bên thân xe hoặc hai bên cánh cửa xe,
        </p>
        <p className={textClassName}>
          c) Có phù hiệu “XE HỢP ĐỒNG” còn hiệu lực do cơ quan nhà nước có thẩm quyền cấp
          theo quy định của pháp luật hiện hành,
        </p>
        <p className={textClassName}>
          d) Niêm yết và duy trì ở vị trí Tài Xế dễ nhận biết khi điều khiển phương tiện
          khẩu hiệu: “Tính mạng con người là trên hết” theo mẫu quy định của Bộ Giao thông
          vận tải,
        </p>
        <p className={textClassName}>
          e) Niêm yết đúng vị trí và duy trì Decal: “XE HỢP ĐỒNG” theo mẫu, kích cỡ, chất
          liệu phản quang quy định của Bộ Giao thông vận tải,
        </p>
        <p className={textClassName}>
          f) Trên xe có trang bị dụng cụ thoát hiểm, bình chữa cháy còn sử dụng được và
          còn hạn theo quy định,
        </p>
        <p className={textClassName}>
          g) Dán, lắp đặt thiết bị và duy trì thường xuyên Logo ExxeVn trên phương tiện
          theo quy định của ExxeVn. (Nếu được ExxeVn yêu cầu).
        </p>
        <p className={textClassName}>
          h) Tuân thủ và chịu trách nhiệm trong việc đảm bảo các cơ chế khuyến mại và tiếp
          thị (nếu có) đối với Khách hàng niêm yết trên ứng dụng ExxeVn.
        </p>
        <p className={textClassName}>
          20. Tài Xế hiểu rõ, đồng ý và thừa nhận rằng trong trường hợp Tài Xế thực hiện
          các hành vi vi phạm pháp luật, trái với đạo đức, chuẩn mực chung của xã hội hoặc
          trái với các quy chuẩn về chất lượng dịch vụ và quy tắc ứng xử đối với khách
          hàng của ExxeVn được ban hành theo từng thời kỳ. Trong trường hợp này, ExxeVn có
          quyền tạm hoãn hoặc chấm dứt vĩnh viễn việc cung cấp ứng dụng ExxeVn.
        </p>
        <p className={textClassName}>
          21. Tài Xế cam kết đảm bảo và hoàn toàn chịu trách nhiệm về tính hợp pháp, hợp
          lệ, xác thực, cập nhật đối với thông tin, tài liệu mình cung cấp theo Hợp đồng
          này.
        </p>
        <p className={textClassName}>
          22. Cam kết thực hiện đầy đủ trách nhiệm, nghĩa vụ theo Hợp đồng này và quy định
          của pháp luật Việt Nam hiện hành đối với phương tiện vận chuyển, người điều
          khiển phương tiện và kinh doanh dịch vụ vận chuyển.
        </p>
        <p className={textClassName}>
          23. Lái cam kết tuân thủ đầy đủ Quy Chế Hoạt Động Sàn TMĐT ExxeVn, các Điều
          Khoản Sử Dụng Chung đã được ExxeVn công bố tại địa chỉ website:
          https://www.Exxe.vn và các quy định của pháp luật hiện hành liên quan.
        </p>
        <p className={textClassName}>
          24. Cam kết thực hiện đầy đủ các nghĩa vụ thuế phát sinh khi kinh doanh dịch vụ
          vận tải theo quy định của pháp luật.
        </p>
        <p className={textClassName}>
          25. Các quyền và nghĩa vụ khác theo quy định pháp luật hiện hành.
        </p>
        <p className={textClassName}>
          Điều 7: Quyền và nghĩa vụ của Người Thuê Vận Tải, Hành khách
        </p>
        <p className={textClassName}>
          1. Yêu cầu ExxeVn, Tài Xế cung cấp dịch vụ theo đúng thỏa thuận tại Hợp Đồng
          này.
        </p>
        <p className={textClassName}>
          2. Hành khách có các quyền sau đây: Được vận chuyển theo đúng Hợp Đồng này, Được
          miễn cước hành lý theo quy định của Công ty trong từng thời kỳ và với kích thước
          phù hợp với thiết kế của xe. Được huỷ chuyến trong vòng 60 phút tính từ lúc hoàn
          tất đặt cọc chuyến xe và được trả lại 20% tiền cọc theo quy định của ExxeVn.
        </p>
        <p className={textClassName}>
          3. Được khiếu nại, kiến nghị, phản ánh những hành vi vi phạm quy định về quản lý
          vận tải của đơn vị kinh doanh vận tải, Tài Xế và yêu cầu bồi thường thiệt hại
          (nếu có) theo quy định của pháp luật.
        </p>
        <p className={textClassName}>
          4. Cung cấp đúng, đầy đủ, trung thực các thông tin bao gồm nhưng không giới hạn:
          họ tên, địa chỉ, số CMND/CCCD/Hộ chiếu còn hiệu lực, email, số điện thoại, thông
          tin cần thiết khác theo quy định của pháp luật khi đăng ký, sử dụng Dịch vụ và
          giao kết Hợp Đồng này.
        </p>
        <p className={textClassName}>
          5. Cung cấp đúng và đầy đủ các thông tin bao gồm nhưng không giới hạn: điểm đi,
          điểm đến, số lượng hành khách đi cùng và các thông tin cá nhân khác theo yêu cầu
          của hợp đồng vận chuyển theo quy định của Nghị định 10/2020/NĐ-CP và pháp luật
          có liên quan.
        </p>
        <p className={textClassName}>
          6. Có mặt tại nơi xuất phát đúng thời gian đã thỏa thuận, chấp hành quy định về
          vận chuyển, thực hiện đúng hướng dẫn của Tài Xế, nhân viên điều hành của ExxeVn
          về các quy định bảo đảm trật tự, an toàn giao thông.
        </p>
        <p className={textClassName}>
          7. Chấp hành các quy định khi đi xe để đảm bảo an toàn, an ninh trật tự trên xe,
          lên, xuống xe các điểm đón, trả khách theo quy định.
        </p>
        <p className={textClassName}>
          8. Khách Hàng, Hành khách cam kết không thực hiện các hành vi sau đây:
        </p>
        <p className={textClassName}>
          a) Hành lý, vật dụng, tài sản mang theo của Khách Hàng/Hành khách thuộc danh mục
          hàng hóa cấm lưu thông, lưu thông có điều kiện theo quy định của pháp luật hiện
          hành.
        </p>
        <p className={textClassName}>
          b) Khách Hàng/Hành khách yêu cầu Tài Xế vận chuyển quá số người quy định, đi vào
          đường cấm, đường chật hẹp, nguy hiểm, chạy vượt quá tốc độ cho phép, vận chuyển
          người đang bị truy nã, các yêu cầu khác có thể gây mất an toàn giao thông và mọi
          hành vi vi phạm pháp luật khác.
        </p>
        <p className={textClassName}>
          ExxeVn và/hoặc Tài Xế có quyền từ chối cung cấp dịch vụ nếu Khách Hàng/Hành
          khách vi phạm cam kết này.
        </p>
        <p className={textClassName}>
          9. Trả cước phí, thanh toán đầy đủ các khoản cước dịch vụ và phụ phí (nếu có)
          theo Hợp Đồng này.
        </p>
        <p className={textClassName}>
          10. Khách hàng cam kết tuân thủ đầy đủ Quy Chế Hoạt Động Dịch vụ vận tải ExxeVn,
          các Điều Khoản Sử Dụng Chung đã được ExxeVn công bố tại địa chỉ website:
          https://www.Exxe.vn, trên ứng dụng ExxeVn và các quy định của pháp luật hiện
          hành liên quan.
        </p>
        <p className={textClassName}>
          11. Các quyền và nghĩa vụ khác theo quy định pháp luật hiện hành có liên quan.
        </p>
        <p className={textClassName}>Điều 8: Phạt vi phạm và bồi thường thiệt hại</p>
        <p className={textClassName}>A/. Phạt Vi Phạm và Bồi thường thiệt hại:</p>
        <p className={textClassName}>
          1. Bên nào vi phạm Hợp Đồng này mà gây thiệt hại cho Bên kia thì Bên Vi Phạm
          phải chịu trách nhiệm bồi thường thiệt hại cho Bên Bị Vi Phạm toàn bộ thiệt hại
          thực tế, trực tiếp phát sinh mà Bên Bị Vi Phạm phải gánh chịu theo quy định của
          pháp luật, nhưng trong mọi trường hợp, mức bồi thường thiệt hại không vượt quá
          tổng Cước Dịch vụ phát sinh thực tế của 02 (hai) tháng trước tháng phát sinh vi
          phạm hợp đồng của Bên Vi Phạm.
        </p>
        <p className={textClassName}>
          2. Bên vận chuyển không phải bồi thường thiệt hại về tính mạng, sức khỏe và hành
          lý của hành khách nếu thiệt hại xảy ra hoàn toàn do lỗi của hành khách, trừ
          trường hợp pháp luật có quy định khác.
        </p>
        <p className={textClassName}>
          3. Trường hợp Hành khách vi phạm điều kiện vận chuyển đã thỏa thuận, quy định
          của điều lệ vận chuyển mà gây thiệt hại cho bên vận chuyển hoặc người thứ ba thì
          phải bồi thường.
        </p>
        <p className={textClassName}>
          4. Trong trường hợp Khách Hàng, Hành khách chậm thanh toán Cước Dịch vụ, phí cầu
          đường, phà, bến bãi và các chi phí khác ngoài Cước Dịch vụ (nếu có), Khách Hàng,
          Hành khách phải chịu phạt lãi chậm trả như sau: Số tiền phạt = Số tiền phải trả
          x 0,05% x Số ngày chậm trả.
        </p>
        <p className={textClassName}>
          a) Số tiền phải trả: tổng số tiền mà Khách Hàng phải thanh toán cho ExxeVn.
        </p>
        <p className={textClassName}>
          b) Số ngày chậm trả: là ngày theo lịch được tính từ ngày đến hạn thanh toán đến
          ngày Khách Hàng thanh toán thực tế cho ExxeVn.
        </p>
        <p className={textClassName}>
          5. Tài Xế/chủ xe và đơn vị trực tiếp quản lý phương tiện vận chuyển liên đới
          chịu trách nhiệm đối với các phát sinh bồi thường thiệt hại về dân sự/ bồi
          thường thiệt hại ngoài Hợp đồng do phương tiện, Tài Xế của mình gây ra cho bên
          thứ ba theo quy định của pháp luật hiện hành.
        </p>
        <p className={textClassName}>
          B/. Phạt Vi Phạm Chính Sách Huỷ Chuyến Xe: (Đối với Khách Hàng và Tài Xế)
        </p>
        <p className={textClassName}>
          Chi phí huỷ chuyến và vi phạm chính sách huỷ chuyến được tính như sau:
        </p>
        <p className={textClassName}>
          Sau khi đặt cọc 20% cước phí chuyến đi. Nếu khách hàng có nhu cầu huỷ chuyến
          thì:
        </p>
        <p className={textClassName}>
          ExxeVn sẽ thu 50% đặt cọc (Tương ứng 10% cước phí chuyến đi).
        </p>
        <p className={textClassName}>
          50% đặt cọc (10% cước phí chuyến đi) sẽ được chuyển về tK của Tài Xế.
        </p>
        <p className={textClassName}>
          Và ngược lại, nếu Tài Xế huỷ chuyến thì ExxeVn sẽ thu 50% tiền cọc(10% cước phí
          chuyến đi).
        </p>
        <p className={textClassName}>
          Lúc này, chuyến đi của Khách hàng sẽ là chuyến đi ưu tiên. ExxeVn sẽ đưa ưu tiên
          để tìm TX cho Khách hàng trong thời gian sớm nhất.
        </p>
        <p className={textClassName}>
          a/. Nếu có Tài xế mới thì 50% tiền cọc (10% cước phí chuyến đi) sẽ được chuyển
          về cho Tài xế ban đầu đã huỷ chuyến.
        </p>
        <p className={textClassName}>
          b/. Nếu không tìm được Tài Xế mới, thì 50% tiền cọc (10% cước phí chuyến đi) sẽ
          được chuyển khoản về Khách hàng. Coi như khoản đền bù của Tài xế đối với khách
          hàng.
        </p>
        <p className={textClassName}>
          Tài xế và Khách Hàng được quyền huỷ chuyến nhưng theo quy định của ExxeVn. Thời
          gian bắt đầu từ lúc hoàn tất đặt cọc để Đặt chuyến (Đối với Khách Hàng) và Nhận
          chuyến (Đối với Tài Xế).
        </p>
        <p className={textClassName}>
          *** Nhằm gia tăng sự cam kết của tài xế, cũng như đảm bảo quyền lợi của khách
          hàng: Đối tác TX và Khách hàng vui lòng liên lạc trước chuyến đi.
        </p>
        <p className={textClassName}>Điều 9: Giải quyết khiếu nại</p>
        <p className={textClassName}>
          1. Mọi thông tin thắc mắc, khiếu nại, Đối Tác Khách Hàng và Tài Xế vui lòng liên
          hệ:
        </p>
        <p className={textClassName}>– Tổng đài hotline: 19004744</p>
        <p className={textClassName}>– Email: info@Exxe.vn</p>
        <p className={textClassName}>
          2. Bất kỳ khiếu nại nào liên quan tới Dịch Vụ được cung cấp theo Hợp Đồng sẽ
          được Khách Hàng trình bày chi tiết và gửi tới ExxeVn bằng văn bản hoặc email
          (thư điện tử) trên, sẽ được kiểm tra và xử lý trong vòng 03 (ba) Ngày Làm Việc
          kể từ ngày xảy ra hoặc phát hiện ra sự việc dẫn tới việc khiếu nại.
        </p>
        <p className={textClassName}>
          3. ExxeVn chỉ tiếp nhận và xử lý những khiếu nại xảy ra trong vòng 60 (sáu mươi)
          ngày kể từ ngày phát sinh sự việc dẫn đến khiếu nại. Trong thời gian chậm nhất
          là 10 (mười) Ngày Làm Việc sau khi nhận được khiếu nại của Khách Hàng, ExxeVn có
          trách nhiệm xác minh, cung cấp thông tin liên quan đến việc khiếu nại cho Khách
          Hàng.
        </p>
        <p className={textClassName}>
          4. Các Bên cùng phối hợp, giải quyết các khiếu nại trên cơ sở đảm bảo quyền và
          lợi ích của các Bên tham gia Hợp Đồng.
        </p>
        <p className={textClassName}>Điều 10: Chấm dứt Hợp đồng</p>
        <p className={textClassName}>
          Hợp đồng sẽ chấm dứt trong các trường hợp sau đây:
        </p>
        <p className={textClassName}>
          1. Tài khoản ứng dụng ExxeVn của khách hàng bị khóa/hủy kích hoạt vĩnh viễn.
        </p>
        <p className={textClassName}>
          2. Các trường hợp khác theo quy định của pháp luật hiện hành.
        </p>
        <p className={textClassName}>Điều 11: Truy xuất và lưu trữ hợp đồng</p>
        <p className={textClassName}>
          1. Người Thuê Vận Tải có thể truy xuất Hợp Đồng bằng cách truy cập ứng dụng
          ExxeVn, vào thanh menu và chọn mục “Lịch sử” hoặc “Hợp đồng vận chuyển”.
        </p>
        <p className={textClassName}>
          2. Hợp đồng này được lưu trữ trong thời gian tối thiểu 03 (ba) năm kể từ ngày
          Người Thuê Vận Tải xác nhận và ký kết.
        </p>
        <p className={textClassName}>Điều 12: Luật điều chỉnh và giải quyết tranh chấp</p>
        <p className={textClassName}>
          1. Hợp Đồng này được xác lập và điều chỉnh theo pháp luật Việt Nam. Các nội dung
          không được quy định trong Hợp Đồng này sẽ được áp dụng theo quy định của pháp
          luật hiện hành có liên quan.
        </p>
        <p className={textClassName}>
          2. Mọi tranh chấp liên quan đến Hợp Đồng trước hết sẽ được các Bên giải quyết
          bằng thương lượng trên cơ sở các Bên cùng có lợi trong vòng 30 (ba mươi) ngày kể
          từ ngày phát sinh tranh chấp. Trường hợp hết thời hạn giải quyết thương lượng mà
          việc thương lượng giữa các Bên không thành thì mỗi Bên có quyền yêu cầu Tòa án
          có thẩm quyền để giải quyết tranh chấp đó. Mỗi Bên cam kết thực hiện đầy đủ
          trách nhiệm của mình đối với Bên còn lại theo đúng Bản án/Quyết định có hiệu lực
          thi hành của Tòa án giải quyết tranh chấp.
        </p>
        <p className={textClassName}>Điều 13: Cam kết chung</p>
        <p className={textClassName}>
          1. Các bên cam kết cung cấp đúng đầy đủ các thông tin cá nhân/pháp nhân của mình
          và tự chịu trách nhiệm về những thông tin này.
        </p>
        <p className={textClassName}>
          2. Hai bên cam kết thực hiện nghiêm chỉnh các nội dung đã thỏa thuận ghi trong
          hợp đồng.
        </p>
        <p className={textClassName}>Điều 14: Hiệu lực hợp đồng</p>
        <p className={textClassName}>
          1. Những nội dung quy định của Hợp Đồng này được ưu tiên áp dụng so với Quy Chế
          Hoạt Động Sàn Vận Tải TMĐT ExxeVn, các Điều Khoản Sử Dụng Chung đã được ExxeVn
          công bố tại địa chỉ website: https://www.Exxe.vn, trên ứng dụng ExxeVn.
        </p>
        <p className={textClassName}>
          2. Những nội dung không được quy định trong Hợp Đồng này thì áp dụng theo Quy
          Chế Hoạt Động Sàn Vận Tải TMĐT ExxeVn, các Điều Khoản Sử Dụng Chung đã được
          ExxeVn công bố tại địa chỉ website: https://www.Exxe.vn, trên ứng dụng ExxeVn.
        </p>
        <p className={textClassName}>ĐIỀU KHOẢN CỤ THỂ</p>
        <p className={textClassName}>
          1. Điều khoản cụ thể này quy định các thông tin tối thiểu theo yêu cầu của hợp
          đồng điện tử về cung cấp dịch vụ vận tải hành khách bằng xe ô tô theo quy định
          của pháp luật hiện hành đối với từng chuyến xe/cuốc xe được hiển thị trên ứng
          dụng ExxeVn trước khi Khách Hàng đặt chuyến và Tài Xế tiếp nhận chấp nhận cung
          cấp Dịch vụ theo Hợp Đồng này.
        </p>
        <p className={textClassName}>
          2. Các thông tin hiển thị trên ứng dụng ExxeVn của từng chuyến xe/cuốc xe bao
          gồm:
        </p>
        <p className={textClassName}>a) Thông tin về Tài Xế: Họ và tên, số điện thoại.</p>
        <p className={textClassName}>
          b) Thông tin về hành khách: Họ và tên, năm sinh, danh sách, số lượng hành khách.
        </p>
        <p className={textClassName}>
          c) Thông tin về phương tiện: biển kiểm soát xe và số chỗ ngồi.
        </p>
        <p className={textClassName}>
          d) Thông tin cụ thể đối với từng chuyến xe: Thời gian bắt đầu thực hiện và kết
          thúc chuyến đi (ngày, giờ), địa chỉ điểm đầu, địa chỉ điểm cuối và các điểm đón,
          trả khách trên hành trình vận chuyển, cự ly của hành trình vận chuyển (km).
        </p>
        <p className={textClassName}>
          e) Thông tin về giá trị từng chuyến đi (giá trị hợp đồng cụ thể theo chuyến):
          Giá cước vận tải và phụ phí, phụ thu, phí dịch vụ giá trị gia tăng.
        </p>
        <p className={textClassName}>
          f) Các thông tin cần thiết liên quan khác theo quy định của ExxeVn trong từng
          thời kỳ.
        </p>
        <p className={textClassName}>
          3. Điều khoản cụ thể này của mỗi chuyến xe/cuốc xe là một phần không thể thiếu
          và không thể tách rời của Hợp Đồng này.
        </p>
        <p className={textClassName}>
          4. Nội dung hiển thị của Điều khoản cụ thể của từng chuyến xe trên ứng dụng
          ExxeVn như sau:
        </p>

        <div className="flex flex-col items-end justify-end mt-24">
          <div className="flex-center flex-col">
            <p className={`${textClassNameSemibold} text-center max-w-[300px]`}>
              CÔNG TY CỔ PHẦN ĐẦU TƯ CÔNG NGHỆ VÀ VẬN TẢI EXXEVN
            </p>
            <p className={`${textClassNameSemibold} text-center max-w-[200px]`}>
              ĐẠI DIỆN THEO PHÁP LUẬT GIÁM ĐỐC
            </p>
          </div>
        </div>
      </>
    )
  }
]
