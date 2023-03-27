/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import {
  conditionPageBg,
  QUY_CHE_DICH_VU_VAN_TAI_HANH_KHACH,
  QUY_CHE_HOAT_DONG,
  VI_PHAM_VA_BIEN_PHAP,
} from "@/assets"
import { Footer, Header, Seo, TabContent } from "@/components"
import { PHONE } from "@/helper"

const textClassName = "text-sm md:text-base mb-12 font-medium"
const titleClassName = "text-16 md:text-18 lg:text-20 mb-12 font-medium"
const elementClassName = "mb-24"

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
    title: "Nguyên tắc cộng đồng",
    content: (
      <>
        <p className={textClassName}>
          Hãy đảm bảo rằng bạn luôn tuân thủ nghiêm chỉnh luật lệ giao thông Việt Nam. Khi di chuyển
          bằng xe ô tô, hãy luôn nhớ thắt dây an toàn dù bạn ngồi ghế trước hay ghế sau. Khi di
          chuyển bằng xe máy, hãy luôn đội nón bảo hiểm khi ngồi trên xe.
        </p>
        <p className={textClassName}>
          Đối tác tài xế có trách nhiệm cụ thể về vấn đề an toàn và tuyệt đối không thực hiện các
          hành vi cấm theo Điều Luật Giao Thông Đường Bộ trong các chuyến xe be như: không điều
          khiển phương tiện giao thông đường bộ mà trong cơ thể có chất ma túy, trong máu hoặc hơi
          thở có nồng độ cồn; không chạy quá tốc độ cho phép, lạng lách, đánh võng; không đe dọa,
          xúc phạm, tranh giành, lôi kéo hành khách; không bắt ép hành khách sử dụng dịch vụ ngoài ý
          muốn; không sử dụng điện thoại khi đang chạy xe (đối tác có thể dùng giá đỡ điện thoại để
          xem chỉ đường hay tai nghe bluetooth để nghe điện thoại).
        </p>
        <p className={textClassName}>
          Các đối tác tài xế không nên nhận chuyến trong tình trạng mệt mỏi và buồn ngủ. Hãy đảm bảo
          tình trạng sức khỏe tốt khi đang lái xe để đảm bảo an toàn tối đa.
        </p>
      </>
    ),
  },
  {
    title: "Chính sách bảo mật",
    content: (
      <>
        <p className={titleClassName}>
          CÁC QUY ĐỊNH VỀ AN TOÀN THÔNG TIN, CƠ CHẾ KIỂM TRA, GIÁM SÁT ĐỂ ĐẢM BẢO VIỆC CUNG CẤP
          THÔNG TIN VÀ QUẢN LÝ TRÊN SÀN GIAO DỊCH THƯƠNG MẠI ĐIỆN TỬ:
        </p>

        <div className={elementClassName}>
          <p className={titleClassName}>1. Mục đích sử dụng thông tin:</p>
          <p className={textClassName}>
            Thông tin cá nhân của Khách hàng chỉ được dùng trong những mục đích sau đây:
          </p>
          <ul>
            <li className={textClassName}>- Hỗ trợ việc đặt xe và cung cấp xe cho Khách hàng.</li>
            <li className={textClassName}>
              - Liên lạc với Khách hàng trong cho mục đích tiếp thị của Công ty.
            </li>
            <li className={textClassName}>- Nâng cao chất lượng dịch vụ và hỗ trợ Khách hàng.</li>
            <li className={textClassName}>
              - Giải quyết các sự vụ và tranh chấp phát sinh liên quan đến việc sử dụng dịch vụ
            </li>
            <li className={textClassName}>trên dịch vụ vận tải.</li>
            <li className={textClassName}>
              - Cung cấp thông tin cho các Cơ quan thực thi Pháp luật theo yêu cầu.
            </li>
            <li className={textClassName}>
              - Khi khách hàng đăng ký tài khoản ExxeVn, thông tin cá nhân mà chúng tôi thu thập bao
              gồm: + Tên đăng kí, số điện thoại: + Email:
            </li>
          </ul>
        </div>

        <div className={elementClassName}>
          <p className={titleClassName}>2. Phạm vi sử dụng thông tin:</p>
          <p className={textClassName}>Công ty sử dụng thông tin Khách hàng cung cấp để:</p>

          <p className={textClassName}>
            - Gửi các thông báo về các hoạt động trao đổi thông tin giữa Khách hàng và Công ty.
          </p>
          <p className={textClassName}>
            - Ngăn ngừa các hoạt động phá hủy tài khoản người dùng của Khách hàng hoặc các
          </p>
          <p className={textClassName}>hoạt động giả mạo Khách hàng.</p>
          <p className={textClassName}>
            - Liên lạc và giải quyết với Khách hàng trong những trường hợp đặc biệt.
          </p>
          <p className={textClassName}>
            - Không sử dụng thông tin cá nhân của Khách hàng ngoài mục đích xác nhận và liên hệ có
            liên quan đến đặt xe và cung cấp xe.
          </p>
          <p className={textClassName}>
            - Trong trường hợp có yêu cầu của Pháp luật: Công ty có trách nhiệm hợp tác cung cấp
            thông tin cá nhân của Khách hàng khi có yêu cầu từ Cơ quan Tư pháp bao gồm: Viện kiểm
            sát, Tòa án, Cơ quan Công an điều tra liên quan đến hành vi vi phạm pháp luật nào đó của
            Khách hàng. Ngoài ra, không ai có quyền xâm phạm vào thông tin cá nhân của Khách hàng.
          </p>
        </div>

        <div className={elementClassName}>
          <p className={titleClassName}>3. Thời gian lưu trữ thông tin</p>
          <p className={textClassName}>
            - Dữ liệu cá nhân của Khách hàng sẽ được lưu trữ cho đến khi có yêu cầu hủy bỏ hoặc tự
            Khách hàng đăng nhập và thực hiện hủy bỏ. Còn lại trong mọi trường hợp thông tin cá nhân
            của Khách hàng sẽ được bảo mật trên máy chủ của Công ty.
          </p>
        </div>

        <div className={elementClassName}>
          <p className={titleClassName}>
            4. Những người hoặc tổ chức có thể được tiếp cận với thông tin
          </p>
          <p className={textClassName}>
            - Chỉ Cấp Quản Lý - Công ty Cổ Phần Đầu tư Công Nghệ và Vận Tải ExxeVn mới có quyền tiếp
            cận thông tin Khách hàng, hoặc Cơ quan Nhà nước có thẩm quyền khi được yêu cầu cung cấp
            thông tin.
          </p>
        </div>

        <div className={elementClassName}>
          <p className={titleClassName}>
            5. Địa chỉ của đơn vị thu thập và quản lý thông tin cá nhân
          </p>
          <ul>
            <p className={textClassName}>- Công ty Cổ Phần Đầu Tư Công Nghệ và Vận Tải ExxeVn</p>
            <p className={textClassName}>- MST: 0317412411</p>
            <p className={textClassName}>
              - Trụ sở chính: Số 2 Hoàng Thế Thiện, Phường An Lợi Đông, Tp. Thủ Đức, Tp.HCM.
            </p>
            <p className={textClassName}>- Số điện thoại: {PHONE}</p>
            <p className={textClassName}>- Email: ExxeVn2022@gmail.com</p>
          </ul>
        </div>
      </>
    ),
  },
  {
    title: "Quy chế Dịch vụ & Điều khoản sử dụng",
    content: (
      <>
        {Object.entries(QUY_CHE_DICH_VU_VAN_TAI_HANH_KHACH).map(([key, value]) => (
          <img key={key} src={value} alt="" />
        ))}
      </>
    ),
  },
  {
    title: "Quy chế hoạt động",
    content: (
      <>
        {Object.entries(QUY_CHE_HOAT_DONG).map(([key, value]) => (
          <img key={key} src={value} alt="" />
        ))}
      </>
    ),
  },
  {
    title: "Hóa đơn dịch vụ vận tải",
    content: (
      <>
        <p className={titleClassName}>III. GIÁ CƯỚC PHÍ VÀ THANH TOÁN:</p>

        <div className={elementClassName}>
          <p className={titleClassName}>1. Các loại giá (phí) dịch vụ liên quan:</p>
          <p className={textClassName}>
            ExxeVn được Hợp tác xã cung cấp giá Cước (phí) vận chuyển tính toán dựa theo đơn giá cho
            từng ki lô mét của quãng đường vận chuyển và sẽ được hệ thống tự động tính toán, hiển
            thị trên ứng dụng ExxeVn khi Khách hàng đặt dịch vụ.
          </p>
          <p className={textClassName}>
            Trừ khi có quy định khác đi, Cước vận chuyển gồm: chi phí thuê xe, tiền nhiên liệu, tiền
            công Tài xế cho việc vận chuyển và các chi phi cần thiết khác để cung cấp dịch vụ. Đơn
            giá cước vận chuyển cụ thể sẽ được gửi thông báo tới khách hảng, tùy từng thời điểm.
          </p>
          <p className={textClassName}>Giá cước trên đã bao gồm 10% thuế VAT.</p>
          <p className={textClassName}>
            Gía Cước trên chưa bao gồm phí cầu đường, bến bãi và các phát sinh khác liên quan đến
            chuyến xe….
          </p>
          <p className={textClassName}>
            Phí sử dụng nền tảng là 5%(có thể thay đổi) của chuyến đi do ExxeVn ấn định, thu theo
            quyết định của ExxeVn từng thời điểm Các khoản giả (phí) khác có thể được áp dụng tùy
            từng thời điểm khi được thông báo đầy đủ, kịp thời cho các bên liên quan.
          </p>
        </div>

        <div className={elementClassName}>
          <p className={titleClassName}>2. Thanh toán</p>
          <p className={textClassName}>
            Khách hàng có thể lựa chọn phương thức thanh toán bằng tiền mặt hoặc không dùng tiền mặt
            cho Đơn hàng (Thẻ Ngân hàng, Thẻ tín dụng, Ví điện tử, ...).
          </p>
        </div>
        <div className={elementClassName}>
          <p className={titleClassName}>3. Hóa đơn</p>
          <p className={textClassName}>
            Hóa đơn cho dịch vụ vận chuyển, phí sử dụng nền tảng được ExxeVn đại diện cung cấp cho
            Khách hàng (Theo yêu cầu của Khách hàng). ExxeVn sẽ xuất hóa đơn với tên Hành khách theo
            quy định pháp luật hiện hành. Hóa đơn do ExxeVn xuất là hóa đơn điện tử.
          </p>
          <p className={textClassName}>
            Để nhận hóa đơn, chứng từ liên quan đến cuốc xe, Khách hàng phải chọn nhập thông tin hóa
            đơn qua ứng dụng ExxeVn khi đặt dịch vụ để hệ thống ghi nhận. Nếu Khách hàng không chọn
            nhập thông tin yêu cầu hóa đơn qua ứng dụng ExxeVn, thời gian tối đa ExxeVn hỗ trợ xuất
            hóa đơn cho Khách hàng là 7 (bảy) ngày.
          </p>
          <ul>
            <li className={textClassName}>
              – ExxeVn có trách nhiệm lập hóa đơn tài chính cho Khách hàng khi có yêu cầu hoặc theo
              quy định của pháp luật đối với Doanh thu dịch vụ vận tải (Kết quả kinh doanh) được
              phân chia của ExxeVn theo hợp đồng hợp tác đã ký kết.
            </li>
            <li className={textClassName}>
              – Đối Tác Tài Xế ủy nhiệm cho ExxeVn lập hóa đơn tài chính cho Khách hàng khi có yêu
              cầu hoặc theo quy định của pháp luật đối với Doanh thu dịch vụ vận tải (Kết quả kinh
              doanh) được phân chia của Đối Tác Tài Xế theo hợp đồng hợp tác đã ký kết.
            </li>
            <li className={textClassName}>
              – Số tiền khuyến mại cho Khách hàng sẽ được tính và ghi nhận trên hóa đơn tài chính
              được ExxeVn cung cấp cho Khách hàng theo chương trình khuyến mại mà ExxeVn thực hiện
              và đăng ký với Bộ Công Thương, theo đó, số tiền chiết khấu thương mại, giảm giá được
              thể hiện trên hóa đơn tài chính được trừ vào phần doanh thu được phân chia của ExxeVn
              và Đối Tác Tài Xế không bị trừ bất kỳ chi phí nào từ số tiền khuyến mại này.
            </li>
          </ul>
        </div>

        <div className={elementClassName}>
          <p className={titleClassName}>4. Thanh toán giữa ExxeVn với Tài xế, Đơn vị vận tải</p>
          <p className={textClassName}>
            Sau khi hoàn tất chuyến đi. Số tiền đặt cọc 20% của Khách hàng và 20% tiền cọc của Tài
            Xế sẽ được chuyển về tài khoản của Tài Xế (40% số tiền). Lúc này ExxeVnDriver sẽ thu 5%
            (có thể thay đổi) phí nền tảng sử dụng dịch vụ.
          </p>
          <p className={textClassName}>
            ExxeVnDriver thu 5%(có thể thay đổi) chi phí chuyến xe khi Giao dịch hoàn tất (Hoàn tất
            chuyến xe).
          </p>
        </div>

        <div className={elementClassName}>
          <p className={titleClassName}>5. Các khoản nghĩa vụ tài chính, thuế của Lái xe:</p>
          <ul>
            <li className={textClassName}>
              – Đối Tác Tài Xế có tổng doanh thu kinh doanh trong năm dương lịch trên 100 triệu đồng
              (gọi tắt là: “Doanh thu tính thuế”) thì phải khai thuế giá trị gia tăng, thuế thu nhập
              cá nhân.
            </li>
            <li className={textClassName}>
              – Tỷ lệ thuế tính trên doanh thu áp dụng đối với cá nhân kinh doanh ngành nghề vận tải
              theo quy định hiện hành như sau: (i) Tỷ lệ thuế giá trị gia tăng là 3% tính trên doanh
              thu được phân chia cho Đối Tác Tài Xế theo hợp đồng HTKD (có thể thay đổi theo quy
              định của cơ quan thuế ban hành). (ii) Tỷ lệ thuế thu nhập cá nhân là 1,5% tính trên
              doanh thu được phân chia cho Đối Tác Tài Xế theo hợp đồng HTKD (có thể thay đổi theo
              quy định của cơ quan thuế ban hành) . (iii) Đối với các khoản tiền thưởng khuyến khích
              theo doanh thu thì không tính thuế giá trị gia tăng, thuế thu nhập cá nhân là 1% tính
              trên tiền thưởng nhận được. (iv) Đối với các khoản tiền thưởng chất lượng, hỗ trợ khác
              nếu có mức từ 02 triệu đồng/lần trở lên thì thuế thu nhập cá nhân là 10% tính trên
              tiền thưởng/tiền hỗ trợ.
            </li>
            <li className={textClassName}>
              – Đối Tác Tài Xế ủy nhiệm vô điều kiện, không hủy ngang cho ExxeVn khai thuế và nộp
              thuế thay cho Đối Tác Tài Xế đối với Kết quả kinh doanh được phân chia của TÀI XẾ theo
              hợp đồng HTKD; các khoản khuyến khích, hỗ trợ, thưởng kinh doanh khác (nếu có) Đối Tác
              Tài Xế nhận được trong quá trình hợp tác kinh doanh với ExxeVn (gọi chung là: “Nghĩa
              Vụ Tài Chính’’).
            </li>
            <li className={textClassName}>
              – Đối Tác Tài Xế ủy quyền vô điều kiện, không hủy ngang cho ExxeVn thay mặt và nhân
              danh Đối Tác Tài Xế để làm việc với cơ quan thuế về việc tiến hành các thủ tục lập tờ
              khai, trích, nộp thuế, lệ phí và nghĩa vụ tài chính khác của Đối Tác Tài Xế phải nộp
              phát sinh từ hợp đồng Hợp tác.
            </li>
            <li className={textClassName}>
              – ExxeVn có quyền và nghĩa vụ tạm trích và giữ lại để nộp thay cho Đối Tác Tài Xế về
              các Nghĩa Vụ Tài Chính đối với Kết quả kinh doanh được phân chia của Đối Tác Tài Xế
              theo hợp đồng HTKD của mỗi chuyến xe hoàn thành qua ứng dụng ExxeVn và các Nghĩa Vụ
              Tài Chính tính trên các khoản thưởng, khuyến khích, hỗ trợ khác của Đối Tác Tài Xế
              nhận được trong quá trình hợp tác kinh doanh với ExxeVn.
            </li>
            <li className={textClassName}>
              – Đến hết năm tài chính, (Tính từ ngày 01/01 đến hết 31/12), nếu doanh thu được phân
              chia cho Đối Tác Tài Xế theo hợp đồng hợp tác lũy kế chưa đạt mức Doanh thu tính thuế
              đối với cá nhân kinh doanh theo quy định của pháp luật hiện hành thì ExxeVn sẽ hoàn
              trả cho Đối Tác Tài Xế số tiền thuế tạm trích và giữ lại theo quy định của pháp luật.
            </li>
            <li className={textClassName}>
              – Trong năm tài chính, (Tính từ ngày 01/01 đến hết 31/12), nếu doanh thu được phân
              chia cho Đối Tác Tài Xế theo hợp đồng hợp tác lũy kế đạt mức Doanh thu tính thuế đối
              với cá nhân kinh doanh theo quy định của pháp luật hiện hành thì ExxeVn có trách nhiệm
              khai thuế và nộp thay thuế kịp thời và đầy đủ theo quy định của pháp luật hiện hành.
            </li>
            <li className={textClassName}>
              – Khi quy định của pháp luật thay đổi về nghĩa vụ tài chính, mức thuế, phí, lệ phí
              phải nộp cho nhà nước thì ExxeVn có quyền trích giữ lại, thay đổi tỷ lệ trích cho phù
              hợp mà không cần phải có sự chấp thuận của Đối Tác Tài Xế nhưng sẽ thông báo kịp thời
              cho Đối Tác Tài Xế biết trước khi thực hiện.
            </li>
          </ul>
        </div>

        <div className={elementClassName}>
          <p className={titleClassName}>6. Đăng ký và cung cấp mã số thuế cá nhân:</p>
          <p className={textClassName}>
            Đối Tác Tài Xế khi tham gia hợp tác kinh doanh với ExxeVn có trách nhiệm tự mình thực
            hiện thủ tục đăng ký thuế để được cấp mã số thuế theo quy định của pháp luật về quản lý
            thuế. ExxeVn có quyền, nhưng không có nghĩa vụ thực hiện việc đăng ký mã số thuế cá nhân
            thay cho Đối Tác Tài Xế.
          </p>
        </div>
      </>
    ),
  },
  {
    title: "Phạt vi phạm và bồi thường thiệt hại",
    content: (
      <>
        {Object.entries(VI_PHAM_VA_BIEN_PHAP).map(([key, value]) => (
          <img key={key} src={value} alt="" />
        ))}
        {}
      </>
    ),
  },
  {
    title: "Tỉ lệ phân chia và hợp tác kinh doanh",
    content: (
      <>
        <p className={textClassName}>Tỉ lệ phân chia kết quả hợp tác kinh doanh theo Hợp Đồng:</p>
        <ul className="">
          <li className={textClassName}>
            - Đối tác Tài Xế được phân chia 95% (có thể thay đổi) doanh thu dịch vụ vận tải hành
            khách (đã bao gồm 10% thuế giá trị gia tăng) thực tế của từng chuyến xe.
          </li>
          <li className={textClassName}>
            - ExxeVnDriver được phân chia 5%(có thể thay đổi) của doanh thu dịch vụ vận tải hành
            khách (đã bao gồm 10% thuế giá trị gia tăng thực tế của từng chuyến xe).
          </li>
          <li className={textClassName}>
            - Tỉ lệ phân chia kết quả kinh doanh cho doanh nghiệp/HTX vận tải mà Phương tiện mang
            phù hiệu của đơn vị sẽ đc ExxeVnDriver quyết định căn cứ vào phạm vi trách nhiệm hợp tác
            theo hợp đồng hợp tác ký kết.
          </li>
          <li className={textClassName}>
            - Đối với phí sử dụng ứng dụng, ExxeVn được quyền thu phí sử dụng Phần mềm ứng dụng hỗ
            trợ kết nối vận tải (App ExxeVn) đối với Khách hàng mà không phải phân chia cho Đối tác
            Tài Xế.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "Giải quyết khiếu nại",
    content: (
      <>
        <p className={titleClassName}>
          CƠ CHẾ GIẢI QUYẾT KHIẾU NẠI, TRANH CHẤP GIỮA CÁC BÊN LIÊN QUAN ĐẾN GIAO DỊCH TIẾN HÀNH
          TRÊN SÀN GIAO DỊCH THƯƠNG MẠI ĐIỆN TỬ:{" "}
        </p>
        <p className={textClassName}>
          Công ty và Tài xế có trách nhiệm tiếp nhận các khiếu nại và hỗ trợ Khách hàng liên quan
          đến các giao dịch được kết nối thông qua dịch vụ vận tải ExxeVn.
        </p>
        <p className={textClassName}>
          Các khiếu nại liên quan đến việc cung cấp, sử dụng dịch vụ đặt chuyến trên dịch vụ vận tải
          do Công ty chịu trách nhiệm độc lập giải quyết trên cơ sở quy định của pháp luật, Điều
          khoản và Điều kiện sử dụng dịch vụ, các thông báo, quy chế đã công bố với Thành viên
          (Khách hàng và Tài Xế). Khi phát sinh tranh chấp, Công ty đề cao giải pháp thương lượng,
          hòa giải giữa các bên nhằm duy trì sự tin cậy của Thành viên vào chất lượng dịch vụ của
          dịch vụ vận tải .
        </p>
        <p className={textClassName}>Khách hàng có thể thực hiện theo các bước sau:</p>

        <ul>
          <li className={textClassName}>
            <span className="font-semibold">• Bước 1: </span>
            Khách hàng khiếu nại về dịch vụ qua số điện thoại 084 7878788 hoặc gửi email cho Bộ phận
            Chăm sóc Khách hàng tại địa chỉ Email: Exxevn2022@gmail.com. Thời gian để Công ty tiếp
            nhận khiếu nại là 3 ngày kể từ ngày sử dụng dịch vụ hoặc từ ngày phát sinh sự việc.
          </li>
          <li className={textClassName}>
            <span className="font-semibold">• Bước 2: </span>
            Trong thời hạn ba (3) ngày làm việc kể từ khi tiếp nhận thông tin khiếu nại của Khách
            hàng, Bộ phận Chăm sóc Khách hàng xác nhận thông tin khiếu nại, tiến hành phân loại
            thông tin và thông báo cho Khách hàng:
            <p className="font-semibold ml-40">
              2a. Ghi nhận các yêu cầu và các khiếu nại có liên quan đến Công ty và trong thời hạn
              khiếu nại.
            </p>
            <p className="font-semibold ml-40">
              2b. Từ chối các yêu cầu, các khiếu nại không có liên quan đến Công ty và hết thời hạn
              khiếu nại.
            </p>
          </li>
          <li className={textClassName}>
            <p className="font-semibold">• Bước 3: Giải quyết vấn đề:</p> Bộ phận Chăm sóc Khách
            hàng sẽ tiến hành xác minh, kiểm chứng và phân tích tính chất và mức độ của nội dung
            khiếu nại, phạm vi khiếu nại và trách nhiệm xử lý để phối hợp với Tài xế và Bên cung cấp
            dịch vụ thứ 3 đưa ra biện pháp cụ thể để hỗ trợ Khách hàng giải quyết tranh chấp đó.
            <p className="font-semibold ml-40">
              3a. Chuyển các vấn đề có liên quan trực tiếp đến Công ty cho các Bộ phận có liên quan
              kiểm tra và đối chiếu.
            </p>
            <p className="font-semibold ml-40">
              3b. Chuyển các vấn đề có liên quan cho Tài xế giải quyết. Trong thời hạn ba (3) ngày
              làm việc kể từ khi tiếp nhận thông báo về khiếu nại, Tài xế có trách nhiệm phối hợp
              với ExxeVn để giải quyết, xử lý khiếu nại. Tài xế sẽ thông báo cho Khách hàng biện
              pháp xử lý hoặc ủy quyền thông báo cho Công ty.
            </p>
          </li>
          <li className={textClassName}>
            <p className="font-semibold">• Bước 4: Đóng khiếu nại:</p>
            <p className={`${textClassName} ml-40 font-semibold`}>
              4a. Khách hàng đồng ý với các phản hồi của Bộ phận Chăm sóc Khách hàng  Kết thúc
              khiếu nại. Khách hàng không đồng ý  Quay lại bước 3
            </p>
            <p className={`${textClassName} ml-40 font-semibold`}>
              4b. Theo dõi các giải quyết khiếu nại của Tài xế  Kết thúc khiếu nại khi Khách hàng
              và Tài xế đã thỏa thuận xong.
            </p>
            <p className={textClassName}>
              Khi nhận được thông báo về biện pháp xử lý từ Tài xế nhưng Khách hàng không đồng ý thì
              Công ty sẽ chủ trì việc thương lượng, hòa giải giữa Khách hàng và Tài xế để đi đến kết
              quả giải quyết phù hợp với cả hai bên.
            </p>
            <p className={textClassName}>
              Trong trường hợp Khách hàng và Tài xế không đi đến thỏa thuận chung hoặc Khách hàng
              không đồng ý với những biện pháp giải quyết cuối cùng của Tài xế và/hoặc nằm ngoài khả
              năng và thẩm quyền của Công ty thì Khách hàng hoặc Tài xế có thể nhờ đến Cơ quan Nhà
              nước có thẩm quyền can thiệp và giải quyết theo Pháp luật nhằm đảm bảo lợi ích hợp
              pháp của các bên.
            </p>
            <p className={textClassName}>
              Công ty tôn trọng và nghiêm túc thực hiện các quy định của Pháp luật về Bảo vệ quyền
              lợi của người dùng. Công ty khuyến nghị Khách hàng và Tài xế cung cấp chính xác, trung
              thực, chi tiết các thông tin cá nhân và nội dung đăng tin liên quan đến dịch vụ.
            </p>
            <p className={textClassName}>
              Chúng tôi cũng đề nghị Tài xế cần nghiêm túc tuân thủ các quy định của Pháp luật, cũng
              như có những hành vi phù hợp đối với Khách hàng.
            </p>
            <p className={textClassName}>
              Mọi hành vi lừa đảo, gian lận trong kinh doanh, gây tổn hại đến người khác đều bị lên
              án và phải chịu hoàn toàn trách nhiệm trước Pháp luật.
            </p>
            <p className={textClassName}>
              Các bên bao gồm Khách hàng và Tài xế sẽ phải có trách nhiệm tích cực trong việc giải
              quyết khiếu nại. Tài xế cần có trách nhiệm chủ động xử lý và cung cấp văn bản giấy tờ
              chứng thực thông tin liên quan đến sự việc đang có khiếu nại, tranh chấp với Khách
              hàng.
            </p>
            <p className={textClassName}>
              Công ty chỉ đóng vai trò hỗ trợ, phối hợp việc thương lượng, hòa giải và giải quyết
              khiếu nại giữ Khách hàng và Tài xế. Công ty cũng có trách nhiệm cung cấp những thông
              tin liên quan đến Khách hàng và Tài xế nếu được Tài xế hoặc Khách hàng hoặc Cơ quan
              Pháp luật có thẩm quyền yêu cầu.
            </p>
            <p className={textClassName}>
              Sau khi Khách hàng và Tài xế đã giải quyết xong tranh chấp, cần có trách nhiệm báo lại
              cho Công ty để cập nhật tình hình.
            </p>
            <p className={textClassName}>
              Trong trường hợp giao dịch phát sinh mâu thuẫn mà lỗi thuộc về Tài xế: Công ty sẽ áp
              dụng các biện pháp xử lý vi phạm tương ứng bao gồm nhưng không giới hạn: cảnh cáo,
              khóa tài khoản hoặc chuyển cho Cơ quan Pháp luật có thẩm quyền tùy theo mức độ của sai
              phạm.
            </p>
            <p className={textClassName}>
              Công ty sẽ chấm dứt và gỡ bỏ toàn bộ tin bài về sản phẩm, dịch vụ của Tài xế đó trên
              dịch vụ vận tải đồng thời yêu cầu Tài xế bồi hoàn cho Khách hàng thỏa đáng trên cơ sở
              thỏa thuận với Khách hàng.
            </p>
          </li>
        </ul>
      </>
    ),
  },
]
