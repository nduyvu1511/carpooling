import { ArrowRightIcon, CheckCircleIcon, TrustIcon } from "@/assets"
import { Alert, ButtonSubmit, HeaderEmpty, HeaderWrapper, ProgressBar, Seo } from "@/components"
import { RootState } from "@/core/store"
import { driverFormFields, isObjectHasValue } from "@/helper"
import { useFetchFilledDriverFormFields } from "@/hooks"
import { DriverEmptyLayout } from "@/layout"
import { FilledDataFieldsKey } from "@/models"
import { useRouter } from "next/router"
import { useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { notify } from "reapop"

const DriverInfo = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { data, isInitialLoading } = useFetchFilledDriverFormFields()
  const [openAlert, setOpenAlert] = useState<boolean>(false)
  const userInfo = useSelector((state: RootState) => state.userInfo.userInfo)

  const filledDataCount: { current: number; total: number } = useMemo(() => {
    if (!data || !isObjectHasValue(data))
      return {
        current: 0,
        total: 0,
      }

    return {
      total: Object.keys(data).length,
      current:
        Object.keys(data).reduce((a, b) => a + (data?.[b as FilledDataFieldsKey] ? 1 : 0), 0) || 0,
    }
  }, [data])

  const handleCreateDriverForm = () => {
    if (filledDataCount.total && filledDataCount.current < filledDataCount.total) {
      dispatch(notify("Vui lòng nhập đầy đủ thông tin để tiếp tục", "warning"))
      return
    }
    setOpenAlert(true)
  }

  return (
    <DriverEmptyLayout>
      <HeaderWrapper className="border-b border-solid border-border-color md:border-0">
        <HeaderEmpty />
      </HeaderWrapper>

      <Seo title="Đăng ký trỏ thành tài xế" url="d/register" />

      <div className="driver-register-layout min-h-[calc(100vh-60px)] md:min-h-[calc(100vh-80px)] flex flex-col sm:px-custom bg-white-color md:bg-bg">
        <div className="content-container flex-1 relative sm:my-12 md:my-16 lg:my-24 bg-white-color p-custom pb-12 pt-24 md:py-24 block-element">
          {isInitialLoading ? (
            <>
              <div className="skeleton h-[40px] mb-[40px] rounded-[4px]"></div>
              <div className="skeleton h-[30px] rounded-[4px] mb-[40px]"></div>
              <div className="flex justify-between mb-[12px]">
                <div className="skeleton h-[16px] w-[60px] rounded-[4px]"></div>
                <div className="skeleton h-[16px] w-[40px] rounded-[4px]"></div>
              </div>
              <div className="skeleton h-[10px] rounded-[4px] mb-[40px]"></div>
              <div className="skeleton h-[16px] rounded-[4px] mb-[32px]"></div>
              <div className="skeleton h-[16px] rounded-[4px] mb-[32px]"></div>
              <div className="skeleton h-[16px] rounded-[4px] mb-[32px]"></div>
              <div className="skeleton h-[16px] rounded-[4px] mb-[32px]"></div>
              <div className="skeleton h-[16px] rounded-[4px] mb-[32px]"></div>
              <div className=" flex-center">
                <div className="w-[160px] rounded-[20px] py-[24px] skeleton mb-[24px]"></div>
              </div>
            </>
          ) : (
            <>
              <div className="mb-24 md:mb-40">
                <p className="text-16 md:text-18 leading-[22px] md:leading-[24px] font-semibold text-center">
                  Xác thực thông tin giấy tờ
                </p>
              </div>

              <div className="mb-24 md:mb-40">
                <div className="flex p-8 rounded-[8px] bg-orange-05 border border-solid border-warning">
                  <TrustIcon className="text-warning mr-12" />
                  <p className="flex-1 text-12 text-warning">
                    Vui lòng hoàn thành toàn bộ thông tin sau đăng ký để bắt đầu lái xe.
                  </p>
                </div>
              </div>

              <div className="mb-24">
                <div className="">
                  <div className="flex items-center justify-between mb-16 ">
                    <span className="text-base font-semibold">Tiến độ xác nhận </span>

                    <p className="flex items-center">
                      <span className="text-10 font-medium leading-[18px] text-gray-color-7 mr-8">
                        Trạng thái
                      </span>
                      <span className="text-14 leading-[20px] font-semibold text-green">
                        {filledDataCount.current}/{filledDataCount.total}
                      </span>
                    </p>
                  </div>
                  <ProgressBar
                    showLabel={false}
                    type="dashed"
                    totalProgressNumber={filledDataCount.total}
                    progressNumber={filledDataCount.current}
                  />
                </div>
              </div>

              <div className="">
                {driverFormFields.map((parent, index) => (
                  <div key={index} className="driver__page-body-item">
                    <ul className="driver__body-list">
                      {parent?.child?.length > 0 &&
                        parent.child.map((child, index) => (
                          <li
                            onClick={() => router.push(`/d/register/${child.route}`)}
                            key={index}
                            className="flex items-center justify-between cursor-pointer py-[14px] mb-8 text-14 md:text-16 font-semibold leading-[22px]"
                          >
                            <p className="text-blue-8">{child.label}</p>
                            <p
                              className={`flex whitespace-nowrap items-center ${
                                data?.[child.name] ? "text-success" : "text-warning"
                              } ${
                                !child.isRequired ? "driver__body-list-item-noti-no-required" : ""
                              }`}
                            >
                              {data?.[child.name]
                                ? "Hoàn thành"
                                : child.isRequired
                                ? "Bắt đầu ngay"
                                : "Không băt buộc"}
                              {data?.[child.name] ? (
                                <CheckCircleIcon className="ml-16 w-[20px] h-[20px]" />
                              ) : (
                                <ArrowRightIcon className="ml-16 w-[20] h-[20]" />
                              )}
                            </p>
                          </li>
                        ))}
                    </ul>
                  </div>
                ))}
              </div>

              {userInfo?.verified_car_driver_account === "inactive_account" ? (
                <ButtonSubmit
                  className="flex-center"
                  title="Hoàn thành"
                  view={"page"}
                  onClick={handleCreateDriverForm}
                  disabled={filledDataCount.current < filledDataCount.total}
                />
              ) : null}
            </>
          )}
        </div>
      </div>

      <Alert
        show={openAlert}
        title="Cảm ơn bạn đã điền đủ thông tin"
        desc="Hồ sơ của bạn đang được xét duyệt, bộ phận Nhân Sự của Exxe sẽ liên hệ với bạn sớm nhất"
        onClose={() => setOpenAlert(false)}
        onConfirm={() => router.push("/d")}
      />
    </DriverEmptyLayout>
  )
}

DriverInfo.Layout = DriverEmptyLayout
export default DriverInfo
