import { FilterIcon } from "@/assets"
import {
  Alert,
  FilterNotFound,
  JournalFilter,
  Modal,
  Spinner,
  TransactionDetail,
  TransactionItem,
  TransactionSuccess,
  WalletLoading,
} from "@/components"
import { RootState } from "@/core/store"
import { isObjectHasValue, toggleBodyOverflow } from "@/helper"
import { useEffectOnce, useJournal } from "@/hooks"
import {
  CarAccountType,
  JournalDetailRes,
  JournalFilterDate,
  RechargeRequestFormParams,
  WithdrawFormParams,
} from "@/models"
import { setCheckoutPaymentId } from "@/modules"
import { userApi } from "@/services"
import { useEffect, useState } from "react"
import "react-circular-progressbar/dist/styles.css"
import InfiniteScroll from "react-infinite-scroll-component"
import { useDispatch, useSelector } from "react-redux"
import useSWR from "swr"
import { Transaction } from "./transaction"
import { WalletInfo } from "./walletInfo"

interface JournalProps {
  type?: CarAccountType
}

type ModalType = "message" | "withdraw" | "payment" | "filter"

const Wallet = ({ type }: JournalProps) => {
  const dispatch = useDispatch()
  const paymentId = useSelector((state: RootState) => state.checkout.currentPaymentId)
  const {
    mutate: mutateJournal,
    data: transactions,
    isInitialLoading,
    isValidating,
    hasMore,
    fetchMoreTransactions,
    filterTransactions,
    isFetchingMore,
    addWithdrawRequest,
    journalFilter,
    createRechargeRequest,
  } = useJournal()

  const [showMsg, setShowMsg] = useState<boolean>(false)
  const [showWithdrawModal, setShowWithdrawModal] = useState<boolean>(false)
  const [currentPaymentId, setCurrentPaymentId] = useState<number | undefined>(undefined)
  const [showFilter, setShowFilter] = useState<boolean>(false)

  const { data: transaction, mutate } = useSWR<JournalDetailRes>(
    paymentId ? `get_transaction_status_${paymentId}` : null,
    () =>
      userApi.getDetailTransaction({ payment_id: paymentId || 0 }).then((res) => res.result.data),
    { dedupingInterval: 0, revalidateOnFocus: true }
  )

  useEffect(() => {
    if (!isObjectHasValue(transaction)) return
  }, [transaction])

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

  const getJournalId = (): number | undefined =>
    transactions?.journal.find((item) => item.journal_type === "cash")?.journal_id

  const handleMakeWithdrawRequest = ({ amount }: WithdrawFormParams) => {
    const journal_id = getJournalId()
    if (!journal_id || !amount || typeof amount !== "number") return

    addWithdrawRequest({
      params: { amount, journal_id },
      onSuccess: (data) => {
        dispatch(setCheckoutPaymentId(data.payment_id))
      },
    })
  }

  const handleCreateRechargeRequest = (params: RechargeRequestFormParams) => {
    const journal_id = getJournalId()
    if (!journal_id) return

    createRechargeRequest({
      params: {
        ...params,
        journal_id,
        returned_url: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/checking-recharge-money-status`,
      },
      onSuccess: (data) => {
        dispatch(setCheckoutPaymentId(data.payment_id))
        window.open(data.vnpay_payment_url, "name", "height=600,width=800")?.focus()
        // confirmRechargeRequest({})
      },
    })
  }

  useEffectOnce(() => {
    return () => {
      toggleBodyOverflow("unset")
      dispatch(setCheckoutPaymentId(undefined))
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
                  <WalletLoading />
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
                        <WalletInfo data={transactions.journal} />
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
            </div>

            <div className="">
              <div className="flex items-center justify-between mb-[40px]">
                <p className="text-base font-semibold lg:text-xl">Lịch sử giao dịch</p>

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

              {/* Transaction item */}
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
        key="transaction-detail-modal"
        show={!!currentPaymentId}
        onClose={() => handleToggleModal({ status: undefined, type: "payment" })}
        heading="Chi tiết giao dịch"
        className=""
      >
        <div className="p-12 py-24 md:p-24">
          {currentPaymentId ? <TransactionDetail payment_id={currentPaymentId} /> : null}
        </div>
      </Modal>

      {/* Message modal */}
      <Alert
        title="Giao dịch thành công!"
        desc="Giao dịch rút tiền đã thành công, cảm ơn bạn đã sử dụng dịch vụ của ExxeVn"
        onConfirm={() => handleToggleModal({ status: false, type: "message" })}
        show={showMsg}
        leftBtnLabel="Đóng"
        rightBtnLabel="Chi tiết"
        onClose={() => handleToggleModal({ status: false, type: "message" })}
      />

      {/* Transaction modal */}
      {paymentId && transaction?.payment_id?.state === "posted" ? (
        <Alert
          show={true}
          onConfirm={() => dispatch(setCheckoutPaymentId(undefined))}
          onClose={() => {
            dispatch(setCheckoutPaymentId(undefined))
            handleToggleModal({ status: false, type: "withdraw" })
            mutate(undefined, false)
            mutateJournal()
          }}
          title="Giao dịch thành công"
          desc={`ID: ${transaction.payment_id.payment_code}`}
          showRightBtn={false}
          leftBtnLabel="Đóng"
        >
          <TransactionSuccess transaction={transaction} />
        </Alert>
      ) : (
        <Modal
          key="withdraw-modal"
          show={showWithdrawModal}
          onClose={() => handleToggleModal({ status: false, type: "withdraw" })}
          heading="Giao dịch"
        >
          <Transaction
            onRechargeFormSubmit={(data) => handleCreateRechargeRequest(data)}
            onWithdrawFormSubmit={(data) => handleMakeWithdrawRequest(data)}
            accountBalance={transactions?.journal?.[1]?.remains_amount || 0}
          />
        </Modal>
      )}

      {/* Filter Modal */}
      <Modal
        key="filter-modal"
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

export { Wallet }
