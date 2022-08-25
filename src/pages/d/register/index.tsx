import { ArrowRightIcon, CheckCircleIcon, LogoIcon } from "@/assets"
import { Alert, ProgressBar } from "@/components"
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

  const filledDataLength = useMemo(() => {
    if (!data || !isObjectHasValue(data)) return 0

    return (
      Object.keys(data).reduce((a, b) => a + (data?.[b as FilledDataFieldsKey] ? 1 : 0), 0) || 0
    )
  }, [data])

  const isFilledAllData = useMemo(() => {
    return filledDataLength === Object.keys(data || {}).length
  }, [data, filledDataLength])

  const handleCreateDriverForm = () => {
    if (!isFilledAllData) {
      dispatch(notify("Vui lòng nhập đầy đủ thông tin để tiếp tục", "warning"))
      return
    }
    setOpenAlert(true)
  }

  if (isInitialLoading)
    return (
      <div className="content-container px-custom py-24">
        <div className="skeleton h-[40px] w-[140px] mb-[24px] rounded-[4px]"></div>
        <div className="skeleton h-[30px] rounded-[4px] mb-[40px]"></div>
        <div className="flex justify-between mb-[4px]">
          <div className="skeleton h-[12px] w-[40px] rounded-[4px]"></div>
          <div className="skeleton h-[12px] w-[40px] rounded-[4px]"></div>
        </div>
        <div className="skeleton h-[10px] rounded-[4px] mb-[40px]"></div>
        <div className="skeleton h-[30px] rounded-[4px] mb-[24px]"></div>
        <div className="skeleton h-[30px] rounded-[4px] mb-[24px]"></div>
        <div className="skeleton h-[30px] rounded-[4px] mb-[24px]"></div>
        <div className="skeleton h-[30px] rounded-[4px] mb-[24px]"></div>
        <div className="skeleton h-[30px] rounded-[4px] mb-[40px]"></div>
        <div className=" flex-center">
          <div className="w-[160px] rounded-[20px] py-[24px] skeleton mb-[24px]"></div>
        </div>
      </div>
    )

  return (
    <>
      <div className="px-16 sm:px-0 min-h-screen flex flex-col">
        <div className="content-container flex-1 relative py-24">
          <div className="">
            <button className="mb-16" onClick={() => router.push("/d")}>
              <LogoIcon />
            </button>
            <p className="text-sm md:text-base">
              Vui lòng hoàn thành toàn bộ thông tin sau đăng ký để bắt đầu lái xe
            </p>
          </div>

          <div className="my-[24px] md:my-[40px]">
            <ProgressBar
              totalProgressNumber={Object.keys(data || {}).length}
              progressNumber={filledDataLength}
            />
          </div>

          <div className="pb-[78px]">
            {driverFormFields.map((parent, index) => (
              <div key={index} className="driver__page-body-item">
                <ul className="driver__body-list">
                  {parent?.child?.length > 0 &&
                    parent.child.map((child, index) => (
                      <li
                        onClick={() => router.push(`/d/register/${child.route}`)}
                        key={index}
                        className="flex items-center justify-between cursor-pointer py-[14px] text-14 md:text-16 font-semibold leading-[22px]"
                      >
                        <p className="text-blue-8">{child.label}</p>
                        <p
                          className={`flex whitespace-nowrap items-center ${
                            data?.[child.name] ? "text-success" : "text-warning"
                          } ${!child.isRequired ? "driver__body-list-item-noti-no-required" : ""}`}
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
            <div className="flex-center absolute left-0 right-0 bottom-0 py-16">
              <button
                onClick={handleCreateDriverForm}
                className={`btn-primary ${!isFilledAllData ? "btn-not-allowed" : ""}`}
              >
                Gửi hồ sơ
              </button>
            </div>
          ) : null}
        </div>
      </div>
      <Alert
        show={openAlert}
        title="Hồ sơ của bạn đang được xét duyệt, bộ phận Nhân Sự của Exxe sẽ liên hệ với bạn sớm nhất"
        onClose={() => {}}
        onConfirm={() => router.push("/d")}
        showLeftBtn={false}
      />
    </>
  )
}

DriverInfo.Layout = DriverEmptyLayout
export default DriverInfo
