import { guideBg } from "@/assets"
import { AccordionItem } from "@/components"
import { GuestLayout } from "@/layout"
import Image from "next/image"
import { useState } from "react"

const FrequentlyAskedQuestions = () => {
  const [tabActive, setTabActive] = useState<number | undefined>()
  const [accordionActive, setAccordionActive] = useState<number | undefined>(undefined)

  return (
    <section>
      <div className="relative w-full h-[500px]">
        <Image src={guideBg} layout="fill" alt="" objectFit="cover" />
      </div>
      <div className="container">
        <div className="py-[120px]">
          <div className="grid grid-cols-grid-330 gap-24">
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
                    onClick={() => (id !== tabActive ? setTabActive(+id) : null)}
                    className={`rounded-[5px] text-base cursor-pointer uppercase px-24 transition-all py-[16px] ${
                      tabActive === id ? "bg-primary text-white-color" : "bg-[#F1F5FF]"
                    }`}
                    key={id}
                  >
                    {label}
                  </li>
                ))}
              </ul>
            </div>

            <div className="h-fit rounded-[5px] border border-solid border-border-color-1">
              <AccordionItem
                titleClassName="text-base"
                onClick={() => setAccordionActive(accordionActive === 1 ? undefined : 1)}
                title="Tôi không thể sử dụng mã khuyến mãi?"
                isActive={accordionActive === 1}
              >
                <p className="text-base">
                  Mã khuyến mãi hợp lệ sẽ được tự động áp dụng trên ứng dụng Exxe khi bạn đặt xe.
                  Bấm vào phần “Khuyến mãi” để xem danh sách các khuyến mãi hiện có từ Exxe. Giá trị
                  của mã khuyến mãi chỉ áp dụng cho cước phí của một chuyến đi và số tiền còn thừa
                  sẽ không còn giá trị.
                </p>
              </AccordionItem>
              <AccordionItem
                titleClassName="text-base"
                onClick={() => setAccordionActive(accordionActive === 2 ? undefined : 2)}
                title="Tôi không thể sử dụng mã khuyến mãi?"
                isActive={accordionActive === 2}
              >
                <p className="text-base">
                  Mã khuyến mãi hợp lệ sẽ được tự động áp dụng trên ứng dụng Exxe khi bạn đặt xe.
                  Bấm vào phần “Khuyến mãi” để xem danh sách các khuyến mãi hiện có từ Exxe. Giá trị
                  của mã khuyến mãi chỉ áp dụng cho cước phí của một chuyến đi và số tiền còn thừa
                  sẽ không còn giá trị.
                </p>
              </AccordionItem>
              <AccordionItem
                titleClassName="text-base"
                onClick={() => setAccordionActive(accordionActive === 3 ? undefined : 3)}
                title="Tôi không thể sử dụng mã khuyến mãi?"
                isActive={accordionActive === 3}
              >
                <p className="text-base">
                  Mã khuyến mãi hợp lệ sẽ được tự động áp dụng trên ứng dụng Exxe khi bạn đặt xe.
                  Bấm vào phần “Khuyến mãi” để xem danh sách các khuyến mãi hiện có từ Exxe. Giá trị
                  của mã khuyến mãi chỉ áp dụng cho cước phí của một chuyến đi và số tiền còn thừa
                  sẽ không còn giá trị.
                </p>
              </AccordionItem>
              <AccordionItem
                titleClassName="text-base"
                onClick={() => setAccordionActive(accordionActive === 4 ? undefined : 4)}
                title="Tôi không thể sử dụng mã khuyến mãi?"
                isActive={accordionActive === 4}
              >
                <p className="text-base">
                  Mã khuyến mãi hợp lệ sẽ được tự động áp dụng trên ứng dụng Exxe khi bạn đặt xe.
                  Bấm vào phần “Khuyến mãi” để xem danh sách các khuyến mãi hiện có từ Exxe. Giá trị
                  của mã khuyến mãi chỉ áp dụng cho cước phí của một chuyến đi và số tiền còn thừa
                  sẽ không còn giá trị.
                </p>
              </AccordionItem>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

FrequentlyAskedQuestions.Layout = GuestLayout
export default FrequentlyAskedQuestions
