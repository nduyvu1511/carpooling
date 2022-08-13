import { FilterIcon } from "@/assets"
import {
  Alert,
  FilterNotFound,
  JournalFilter,
  Modal,
  Spinner,
  TransactionDetail,
  TransactionItem,
  WithdrawForm,
} from "@/components"
import { formatMoneyVND, toggleBodyOverflow } from "@/helper"
import { useEffectOnce, useJournal } from "@/hooks"
import { CarAccountType, JournalFilterDate } from "@/models"
import { useState } from "react"
import { buildStyles, CircularProgressbar } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import InfiniteScroll from "react-infinite-scroll-component"
import { JournalGuide } from "./journalGuide"

interface JournalProps {
  type?: CarAccountType
}

type ModalType = "message" | "withdraw" | "payment" | "filter"

const Journal = ({ type }: JournalProps) => {
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
    journalFilter,
  } = useJournal()

  const [showMsg, setShowMsg] = useState<boolean>(false)
  const [showWithdrawModal, setShowWithdrawModal] = useState<boolean>(false)
  const [currentPaymentId, setCurrentPaymentId] = useState<number | undefined>(undefined)
  const [showFilter, setShowFilter] = useState<boolean>(false)

  const handleToggleModal = ({
    type,
    status,
  }: {
    type: ModalType
    status: boolean | number | undefined
  }) => {
    if (type === "filter") {
      setShowFilter(status as boolean)
    } else if (type === "message") {
      setShowMsg(status as boolean)
    } else if (type === "payment") {
      setCurrentPaymentId(status as number)
    } else {
      setShowWithdrawModal(status as boolean)
    }
    if (status) {
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
        handleToggleModal({ status: false, type: "withdraw" })
        handleToggleModal({ status: true, type: "message" })
      },
    })
  }

  useEffectOnce(() => {
    return () => {
      toggleBodyOverflow("unset")
    }
  })

  return (
    <>
      <div className="px-12 md:px-24">
        <div className="items-stretch justify-between hidden lg:flex pb-12 md:py-24 border-b border-solid border-border-color">
          <h4 className="h4 text-primary">Ví cá nhân</h4>

          {type === "car_driver" ? (
            <button
              onClick={() => handleToggleModal({ status: true, type: "withdraw" })}
              className="btn-primary w-fit"
            >
              Rút tiền
            </button>
          ) : null}
        </div>

        <div className="py-12 md:py-24">
          <div className="grid xl:grid-cols-wallet-grid gap-[40px]">
            <div className="">
              <div className="sm:bg-bg-primary sm:shadow-shadow-1 h-fit sm:p-24 sm:rounded-[5px]">
                {isInitialLoading ? (
                  <>
                    <div className="flex items-center">
                      <div className="skeleton w-[160px] h-[160px] rounded-[50%] mb-24 md:mb-0 mr-24 md:mr-[40px]"></div>
                      <div className="flex-1 mb-24 md:mb-0">
                        <div className="mb-24">
                          <div className="skeleton w-[120px] h-[12px] mb-12 rounded-[5px]"></div>
                          <div className="skeleton w-[160px] h-[16px] rounded-[5px]"></div>
                        </div>
                        <div className="">
                          <div className="skeleton w-[120px] h-[12px] mb-12 rounded-[5px]"></div>
                          <div className="skeleton w-[180px] h-[16px] rounded-[5px]"></div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-between mb-24 md:mb-[40px]">
                      <p className="text-base font-semibold lg:text-xl">Tổng ví</p>

                      <button
                        onClick={() => handleToggleModal({ status: true, type: "withdraw" })}
                        className="btn-primary w-fit sm:hidden"
                      >
                        Rút tiền
                      </button>
                    </div>
                    {transactions && transactions?.journal?.length > 0 ? (
                      <div className="flex-row flex items-stretch">
                        <div className="w-[140px xs: w-[160px] sm:w-[200px] mr-24 md:mr-[40px] relative flex-center">
                          <CircularProgressbar
                            styles={buildStyles({ pathColor: "#2E41B6", trailColor: "#f0f0f0" })}
                            value={
                              ((transactions?.journal[1]?.remains_amount || 0) / getTotalMoney) *
                              100
                            }
                            strokeWidth={5}
                          />
                          <div className="absolute z-10 flex-col flex-center">
                            <p className="text-xs mb-4">Tổng</p>
                            <p className="text-sm font-semibold">{formatMoneyVND(getTotalMoney)}</p>
                          </div>
                        </div>

                        <div className="flex-1 lg:flex-auto my-auto">
                          <div className="">
                            <p className="flex items-center mb-8">
                              <span className="w-[10px] h-[10px] rounded-[50%] bg-gray-color-1 mr-8"></span>
                              <span className="text-xs whitespace-nowrap">Tổng số tiền</span>
                            </p>
                            <p className="text-base font-semibold">
                              {formatMoneyVND(transactions.journal[0].remains_amount)}
                            </p>
                          </div>

                          {transactions?.journal?.[1] ? (
                            <div className="mt-24 md:mt-[40px]">
                              <p className="flex items-center mb-8">
                                <span className="w-[10px] h-[10px] rounded-[50%] bg-primary mr-8"></span>
                                <span className="text-xs whitespace-nowrap">Số tiền khả dụng</span>
                              </p>
                              <p className="text-base font-semibold text-primary">
                                {formatMoneyVND(transactions.journal[1].remains_amount)}
                              </p>
                            </div>
                          ) : null}
                        </div>
                        {type === "car_driver" ? (
                          <div className="hidden sm:flex lg:hidden flex-start">
                            <button
                              onClick={() => handleToggleModal({ status: true, type: "withdraw" })}
                              className="btn-primary h-fit w-fit"
                            >
                              Rút tiền
                            </button>
                          </div>
                        ) : null}
                      </div>
                    ) : null}
                  </>
                )}
              </div>

              {/* <div className="mt-[40px]">
                <p className="text-base lg:text-xl mb-24">FAQ</p>
                <JournalGuide />
              </div> */}
            </div>
            <div className="">
              <div className="flex items-center justify-between mb-[16px] ">
                <p className="text-base font-semibold">Lịch sử giao dịch</p>

                <button
                  onClick={() => setShowFilter(true)}
                  className="w-[44px] h-[44px] sm:hidden rounded-[8px] bg-gray-color-1 flex-center"
                >
                  <FilterIcon />
                </button>
              </div>
              <div className="mb-24 hidden sm:block">
                <JournalFilter onChange={(val) => filterTransactions(val as JournalFilterDate)} />
              </div>

              <div className="">
                {isValidating ? (
                  <div>
                    {Array.from({ length: 10 }).map((_, index) => (
                      <TransactionItem key={index} transaction={null} />
                    ))}
                  </div>
                ) : transactions && transactions?.transaction?.length > 0 ? (
                  <InfiniteScroll
                    className="scrollbar-w xl:max-h-[50vh]"
                    dataLength={transactions?.transaction?.length || 0}
                    hasMore={hasMore}
                    loader={isFetchingMore ? <Spinner className="py-[30px]" size={30} /> : null}
                    next={() => fetchMoreTransactions()}
                  >
                    <ul className="">
                      {transactions?.transaction?.map((item, index) => (
                        <li className="mb-[16px] last:mb-0" key={index}>
                          <TransactionItem
                            onChange={(id) => handleToggleModal({ status: id, type: "payment" })}
                            transaction={item}
                          />
                        </li>
                      ))}
                    </ul>
                  </InfiniteScroll>
                ) : (
                  <FilterNotFound title="Hiện tại chưa có giao dịch nào" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        key='transaction-detail-modal'
        show={!!currentPaymentId}
        onClose={() => handleToggleModal({ status: undefined, type: "payment" })}
        heading="Chi tiết giao dịch"
        className=""
      >
        <div className="p-12 py-24 md:p-24">
          {currentPaymentId ? <TransactionDetail payment_id={currentPaymentId} /> : null}
        </div>
      </Modal>

      <Alert
        desc="Rút tiền thành công, vui lòng chờ trong khoảng 24h để giao dịch được thực thi"
        onConfirm={() => handleToggleModal({ status: false, type: "message" })}
        showLeftBtn={false}
        show={showMsg}
        onClose={() => handleToggleModal({ status: false, type: "message" })}
      />

      <Modal
        key='withdraw-modal'
        show={showWithdrawModal}
        onClose={() => handleToggleModal({ status: false, type: "withdraw" })}
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

      <Modal
        key='filter-modal'
        show={showFilter}
        onClose={() => handleToggleModal({ status: false, type: "filter" })}
        className=""
        heading="Bộ lọc"
      >
        <div className="flex-1 flex-col p-12 md:p-24">
          <JournalFilter
            defaultValues={journalFilter}
            onChange={(val) => {
              filterTransactions(val as JournalFilterDate)
              handleToggleModal({ status: false, type: "filter" })
            }}
          />
        </div>
      </Modal>
    </>
  )
}

export { Journal }
