import { RootState } from "@/core/store"
import { formatMoneyVND } from "@/helper"
import { useOTP } from "@/hooks"
import { RechargeRequestFormParams, WithdrawFormParams } from "@/models"
import { useState } from "react"
import { useSelector } from "react-redux"
import { Tabs } from "../common"
import { OtpForm, ReChargeMoneyForm, WithdrawForm } from "../form"
import { Alert } from "../modal"

interface TransactionProps {
  accountBalance: number
  onRechargeFormSubmit?: (_: RechargeRequestFormParams) => void
  onWithdrawFormSubmit?: (_: WithdrawFormParams) => void
}

type Type = "deposit" | "withdraw"
type ModalType = "confirmAmountBalance" | "alertAmountBalance"

export const Transaction = ({
  accountBalance,
  onRechargeFormSubmit,
  onWithdrawFormSubmit,
}: TransactionProps) => {
  const { requestOTPCode, verifyOTPCode } = useOTP()
  const userInfo = useSelector((state: RootState) => state.userInfo.userInfo)

  const [type, setType] = useState<Type>("deposit")
  const [rechargeData, setRechargeData] = useState<RechargeRequestFormParams | undefined>()
  const [withdrawData, setWithdrawData] = useState<WithdrawFormParams | undefined>()
  const [modalType, setModalType] = useState<ModalType | undefined>()
  const [showOTP, setShowOTP] = useState<boolean>(false)

  const toggleModal = (status: ModalType | undefined) => {
    setModalType(status)
  }

  const handleVerifyOTPCode = (otp_code: string) => {
    if (!withdrawData) return

    verifyOTPCode({
      params: { otp_code, phone: userInfo?.phone || "" },
      onSuccess: () => {
        onWithdrawFormSubmit?.(withdrawData)
      },
    })
  }

  const handleRequestOTPCode = () => {
    if (!userInfo?.phone) return

    requestOTPCode({
      params: { phone: userInfo?.phone },
      onSuccess: () => {
        setShowOTP(true)
      },
    })
  }

  const handleResendOTPCode = () => {
    if (withdrawData) {
      handleRequestOTPCode()
    } else {
      setShowOTP(false)
    }
  }

  return (
    <>
      {userInfo?.phone && showOTP ? (
        <div className="p-custom">
          <OtpForm
            resendOTPCode={handleResendOTPCode}
            phoneNumber={userInfo?.phone}
            onSubmit={handleVerifyOTPCode}
          />
        </div>
      ) : null}

      {!showOTP ? (
        <>
          <div className="flex-1 flex flex-col">
            <div className="">
              <Tabs
                list={[
                  { label: "Nạp tiền", value: "deposit" },
                  { label: "Rút tiền", value: "withdraw" },
                ]}
                tabActive={type}
                type="full"
                onChange={(val) => {
                  setType(val as Type)
                  if (withdrawData) {
                    setWithdrawData(undefined)
                  }
                  if (rechargeData) {
                    setRechargeData(undefined)
                  }
                }}
                labelClassName="font-semibold md:font-semibold py-12 md:py-12"
              />
            </div>

            <div className="flex-1 flex-col flex p-12 sm:p-16 md:p-24">
              <div className="mb-24">
                <div className="flex items-center justify-between">
                  <p className="text-base font-semibold w-[200px] mr-24 uppercase">
                    Số dư khả dụng
                  </p>
                  <p className="text-16 md:text-24 whitespace-nowrap font-semibold md:font-medium text-primary">
                    {formatMoneyVND(accountBalance)}
                  </p>
                </div>
              </div>

              {type === "deposit" ? (
                <ReChargeMoneyForm
                  onSubmit={(data) => {
                    setRechargeData(data)
                    toggleModal("confirmAmountBalance")
                  }}
                />
              ) : (
                <WithdrawForm
                  onSubmit={(data) => {
                    if (data.amount > accountBalance) {
                      toggleModal("alertAmountBalance")
                    } else {
                      setWithdrawData(data)
                      toggleModal("confirmAmountBalance")
                    }
                  }}
                />
              )}
            </div>
          </div>

          {modalType === "alertAmountBalance" ? (
            <Alert
              onConfirm={() => {
                toggleModal(undefined)
              }}
              onClose={() => {
                toggleModal(undefined)
              }}
              showRightBtn={false}
              show={true}
              type="warning"
              title={`Số tiền được rút không được lớn hơn số dư trong tài khoản`}
            />
          ) : null}

          {modalType === "confirmAmountBalance" && (rechargeData || withdrawData) ? (
            <Alert
              type="info"
              title={`Xác nhận ${type === "withdraw" ? "rút" : "nạp"} số tiền ${formatMoneyVND(
                rechargeData?.amount || withdrawData?.amount || 0
              )}`}
              show={true}
              onClose={() => toggleModal(undefined)}
              onConfirm={() => {
                if (rechargeData) {
                  onRechargeFormSubmit?.(rechargeData)
                } else if (withdrawData) {
                  handleRequestOTPCode()
                }
                toggleModal(undefined)
              }}
            />
          ) : null}
        </>
      ) : null}
    </>
  )
}
