import { PaymentIcon, WalletIcon } from "@/assets"
import {
  JournalFilter,
  Modal,
  Spinner,
  TransactionDetail,
  TransactionItem,
  WithdrawForm,
} from "@/components"
import { formatMoneyVND, toggleBodyOverflow } from "@/helper"
import { useDriverWallet } from "@/hooks"
import { DriverAccountLayout } from "@/layout"
import { CarAccountType, JournalFilterDate } from "@/models"
import { useState } from "react"
import { buildStyles, CircularProgressbar } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import InfiniteScroll from "react-infinite-scroll-component"

interface JournalProps {
  carAccountType?: CarAccountType
  onFetchingMore?: Function
}

export const Journal = () => {
  const {
    data: transactions,
    isInitialLoading,
    isValidating,
    hasMore,
    fetchMoreTransactions,
    filterTransactions,
    isFetchingMore,
    getTotalMoney,
    addWithdrawRequest,
  } = useDriverWallet()

  const [showWithdrawModal, setShowWithdrawModal] = useState<boolean>(false)
  const [currentPaymentId, setCurrentPaymentId] = useState<number | undefined>(undefined)

  const toggleShowWithdrawModal = (status: boolean) => {
    setShowWithdrawModal(status)
    if (status) {
      toggleBodyOverflow("hidden")
    } else {
      toggleBodyOverflow("unset")
    }
  }

  const toggleShowTransactionDetail = (id: number | undefined) => {
    setCurrentPaymentId(id)
    if (id) {
      toggleBodyOverflow("hidden")
    } else {
      toggleBodyOverflow("unset")
    }
  }

  const handleMakeWithdrawRequest = (amount: number) => {
    const journal_id = transactions?.journal.find(
      (item) => item.journal_type === "cash"
    )?.journal_id
    if (!journal_id) return
    addWithdrawRequest({
      params: { amount, journal_id },
      onSuccess: () => {
        toggleShowWithdrawModal(false)
      },
    })
  }

  return (
    <DriverAccountLayout title="Ví cá nhân">
      <div className="px-12 md:px-24">
        <div className="flex flex-col md:flex-row flex-center items-stretch">
          <div className="flex-1 flex items-center flex-col md:flex-row">
            {!isInitialLoading ? (
              <>
                <div className="skeleton w-[160px] h-[160px] rounded-[50%] mb-24 md:mb-0 md:mr-[40px]"></div>
                <div className="flex items-center mb-24 md:mb-0 md:mr-[40px]">
                  <div className="md:mr-[40px]">
                    <div className="skeleton h-[12px] mb-12 rounded-[5px]"></div>
                    <div className="skeleton h-[16px] rounded-[5px]"></div>
                  </div>
                  <div className="">
                    <div className="skeleton h-[12px] mb-12 rounded-[5px]"></div>
                    <div className="skeleton h-[16px] rounded-[5px]"></div>
                  </div>
                </div>
                <div className="flex justify-center md:flex-col md:justify-start h-[42px] w-[160px] rounded-[30px]"></div>
              </>
            ) : (
              <>
                {transactions && transactions?.journal?.length > 0 ? (
                  <>
                    <div className="w-[200px] md:mr-[40px] relative flex-center">
                      <CircularProgressbar
                        styles={buildStyles({ pathColor: "#10B981", trailColor: "#f0f0f0" })}
                        value={
                          ((transactions?.journal[1]?.remains_amount || 0) / getTotalMoney) * 100
                        }
                        strokeWidth={5}
                      />
                      <div className="absolute z-10 flex-col flex-center">
                        <p className="text-xs mb-4">Tổng</p>
                        <p className="text-sm font-semibold">{formatMoneyVND(getTotalMoney)}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="">
                        <p className="flex items-center mb-8">
                          <WalletIcon className="mr-8 w-[16px]" />
                          <span className="text-xs whitespace-nowrap">Tổng số tiền</span>
                        </p>
                        <p className="text-xl text-primary">
                          {formatMoneyVND(transactions.journal[0].remains_amount)}
                        </p>
                      </div>
                      {transactions?.journal?.[1] ? (
                        <div className="md:ml-[40px]">
                          <p className="flex items-center mb-8">
                            <PaymentIcon className="mr-8 w-[16px]" />
                            <span className="text-xs whitespace-nowrap">Số tiền khả dụng</span>
                          </p>
                          <p className="text-xl text-primary">
                            {formatMoneyVND(transactions.journal[1].remains_amount)}
                          </p>
                        </div>
                      ) : null}
                    </div>
                  </>
                ) : null}
              </>
            )}
          </div>

          <div className="flex justify-center md:flex-col md:justify-start">
            <button onClick={() => toggleShowWithdrawModal(true)} className="btn-primary">
              Rút tiền
            </button>
          </div>
        </div>

        <div className="my-[40px] border-b border-solid border-border-color"></div>

        <div className="">
          <p className="text-base mb-[16px] font-semibold">Giao dịch gần nhất</p>

          <div className="mb-[40px]">
            <JournalFilter onChange={(val) => filterTransactions(val as JournalFilterDate)} />
          </div>

          {isValidating ? (
            <div>
              {Array.from({ length: 10 }).map((_, index) => (
                <TransactionItem key={index} transaction={null} />
              ))}
            </div>
          ) : transactions && transactions?.transaction?.length > 0 ? (
            <InfiniteScroll
              dataLength={transactions?.transaction?.length || 0}
              hasMore={hasMore}
              loader={isFetchingMore ? <Spinner className="py-[30px]" size={30} /> : null}
              next={() => fetchMoreTransactions()}
            >
              <ul className="">
                {transactions?.transaction?.map((item, index) => (
                  <li
                    className="border-b border-solid border-border-color last:border-none"
                    key={index}
                  >
                    <TransactionItem
                      onChange={(id) => toggleShowTransactionDetail(id)}
                      transaction={item}
                    />
                  </li>
                ))}
              </ul>
            </InfiniteScroll>
          ) : (
            <div>Không tìm thấy giao dịch nào</div>
          )}
        </div>
      </div>

      <Modal
        show={!!currentPaymentId}
        onClose={() => toggleShowTransactionDetail(undefined)}
        heading="Chi tiết giao dịch"
        className="sm:h-auto"
      >
        <div className="p-12 md:p-24">
          {currentPaymentId ? <TransactionDetail payment_id={currentPaymentId} /> : null}
        </div>
      </Modal>

      <Modal
        show={showWithdrawModal}
        onClose={() => toggleShowWithdrawModal(false)}
        className="lg:h-auto"
        heading="Phiếu rút tiền"
      >
        <div className="flex-1 flex-col p-12 md:p-24">
          <WithdrawForm
            accountBalance={transactions?.journal?.[1]?.remains_amount || 0}
            onSubmit={(val) => handleMakeWithdrawRequest(val)}
          />
        </div>
      </Modal>
    </DriverAccountLayout>
  )
}
