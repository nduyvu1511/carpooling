import { ArrowDownIcon } from "@/assets"
import { useState } from "react"
import { AccordionItem } from "./accordionItem"

type TabContentProps = {
  data: [{ title: string; content: JSX.Element }]
}

export const TabContent = ({ data }: TabContentProps) => {
  const [indexActive, setIndexActive] = useState<number>()
  const [index, setIndex] = useState<number>(0)

  return (
    <>
      <div className="hidden md:grid md:grid-cols-grid-280 md:gap-24 xl:gap-40">
        <div className="border border-solid border-gray-10 rounded-[8px] bg-white-color shadow-shadow-5 overflow-hidden h-fit sticky top-24">
          {data.map(({ title }, _index) => (
            <div key={_index} className="">
              <div
                onClick={() => setIndex(_index)}
                key={title}
                className={`flex items-center select-none px-24 py-16 cursor-pointer border-primary border-solid ${
                  index === _index ? "bg-primary  rounded-[5px]" : "bg-white-color"
                }`}
              >
                <p
                  className={`text-16 font-semibold flex-1 ${
                    index === _index ? "text-white-color" : "text-primary"
                  }`}
                >
                  {title}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="border border-solid border-gray-10 rounded-[8px] bg-white-color shadow-shadow-5 px-24 py-32 xl:px-[64px] xl:py-[64px]">
          <div className="flex flex-col items-center mb-[64px]">
            <p className="text-16 lg:text-24 font-normal text-blue-8 text-center mb-24">
              Điều lệ & Điều khoản
            </p>
            <h1 className="text-28 leading-[34px] lg:text-[40px] lg:leading-[50px] font-medium text-primary text-center">
              {data?.[index]?.title}
            </h1>
          </div>

          <div className="">{data?.[index]?.content}</div>
        </div>
      </div>

      <div className="md:hidden">
        {data.map(({ title, content }, _index) => (
          <AccordionItem
            key={_index}
            className={`px-24 py-16 ${_index === 0 ? "border-t-0" : ""}`}
            onClick={() => setIndexActive(_index === indexActive ? undefined : _index)}
            isActive={indexActive === _index}
            title={title}
          >
            {content}
          </AccordionItem>
          // <div key={_index} className="">
          //   <div
          //     onClick={() => setIndexActive(_index === indexActive ? undefined : _index)}
          //     key={title}
          //     className={`flex select-none items-center px-24 py-16 cursor-pointer border-b border-primary border-solid ${
          //       indexActive === _index ? "bg-primary  rounded-[5px]" : "bg-white-color"
          //     }`}
          //   >
          //     <p
          //       className={`text-16 font-semibold flex-1 ${
          //         indexActive === _index ? "text-white-color" : "text-primary"
          //       }`}
          //     >
          //       {title}
          //     </p>

          //     <ArrowDownIcon
          //       className={`transform transition-all  ${
          //         indexActive === _index ? "text-white-color rotate-180" : "text-blue-8 rotate-0"
          //       }`}
          //     />
          //   </div>

          //   {_index === indexActive ? <div className="p-24">{content}</div> : null}
          // </div>
        ))}
      </div>
    </>
  )
}
