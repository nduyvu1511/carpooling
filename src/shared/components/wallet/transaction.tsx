import { formatMoneyVND } from "@/helper"
import { RechargeRequestFormParams, WithdrawFormParams } from "@/models"
import { useState } from "react"
import { ReChargeMoneyForm, WithdrawForm } from "../form"
import { Alert } from "../modal"
import { Tabs } from "../common"

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
  const [type, setType] = useState<Type>("deposit")
  const [rechargeData, setRechargeData] = useState<RechargeRequestFormParams | undefined>()
  const [withdrawData, setWithdrawData] = useState<WithdrawFormParams | undefined>()
  const [modalType, setModalType] = useState<ModalType | undefined>()

  const toggleModal = (status: ModalType | undefined) => {
    setModalType(status)
    // if (status) toggleBodyOverflow("hidden")
    // else toggleBodyOverflow("unset")
  }

  // const handleVerifyOTP = (otpInput: string) => {
  //   OTPVerifier({
  //     otpInput,
  //     handleSuccess: () => {
  //       if (rechargeData) {
  //         onRechargeFormSubmit?.(rechargeData)
  //       } else if (withdrawData) {
  //         onWithdrawFormSubmit?.(withdrawData)
  //       }
  //     },
  //   })
  // }

  // const handleGenerateOTP = () => {
  //   if (!userInfo?.phone) return
  //   generateOTPCode({
  //     params: { phone: userInfo?.phone },
  //     onSuccess: () => {
  //       setShowOTP(true)
  //     },
  //   })
  // }

  return (
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
              <p className="text-base font-semibold w-[200px] mr-24 uppercase">Số dư khả dụng</p>
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
                // handleGenerateOTP()
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
                // handleGenerateOTP()
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
              onWithdrawFormSubmit?.(withdrawData)
            }
            toggleModal(undefined)
          }}
        />
      ) : null}
    </>
  )
}
