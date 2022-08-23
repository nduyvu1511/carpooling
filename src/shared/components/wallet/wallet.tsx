import { FilterIcon } from "@/assets"
import {
  Alert,
  FilterNotFound,
  Modal,
  Spinner,
  TransactionDetail,
  TransactionItem,
  TransactionSuccess,
  WalletFilter,
  WalletLoading,
} from "@/components"
import { RootState } from "@/core/store"
import { toggleBodyOverflow } from "@/helper"
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
import { AxiosResponse } from "axios"
import { useState } from "react"
import "react-circular-progressbar/dist/styles.css"
import InfiniteScroll from "react-infinite-scroll-component"
import { useDispatch, useSelector } from "react-redux"
import useSWR from "swr"
import { Transaction } from "./transaction"
import { WalletInfo } from "./walletInfo"

interface JournalProps {
  type?: CarAccountType
}

type ModalType = "transaction" | "payment" | "filter"

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

  const [showWithdrawModal, setShowWithdrawModal] = useState<boolean>(false)
  const [currentPaymentId, setCurrentPaymentId] = useState<number | undefined>(undefined)
  const [showFilter, setShowFilter] = useState<boolean>(false)

  const { data: transaction, mutate } = useSWR<JournalDetailRes>(
    paymentId ? `get_transaction_status_${paymentId}` : null,
    () =>
      userApi
        .getDetailTransaction({ payment_id: paymentId || 0 })
        .then((res: AxiosResponse<JournalDetailRes>) => res?.result?.data),
    { dedupingInterval: 0, revalidateOnFocus: true }
  )

  const handleToggleModal = ({
    type,
    status,
  }: {
    type: ModalType
    status: boolean | number | undefined
  }) => {
    if (type === "filter") {
      setShowFilter(status as boolean)
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
    console.log({ journal_id })
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
      if (paymentId) {
        dispatch(setCheckoutPaymentId(undefined))
      }
    }
  })

  return (
    <>
      <div className="px-custom">
        <div className="items-stretch justify-between hidden lg:flex pb-12 md:py-24 border-b border-solid border-border-color">
          <h4 className="h4 text-primary">Ví cá nhân</h4>

          <button
            onClick={() => handleToggleModal({ status: true, type: "transaction" })}
            className="btn-primary w-fit"
          >
            Nạp/Rút
          </button>
        </div>

        <div className="pb-12 md:pb-24 lg:py-24">
          <div className="grid xl:grid-cols-wallet-grid gap-[40px]">
            <div className="h-fit xl:sticky top-[104px]">
              <div className="sm:bg-bg-primary sm:shadow-shadow-1 h-fit sm:p-24 sm:rounded-[5px] relative">
                {isInitialLoading ? (
                  <WalletLoading />
                ) : (
                  <>
                    <div className="flex items-center justify-between mb-24 md:mb-[40px]">
                      <p className="text-base font-semibold lg:text-xl">Tổng ví</p>

                      <button
                        onClick={() => handleToggleModal({ status: true, type: "transaction" })}
                        className="btn-primary rounded-[30px]  w-fit sm:hidden"
                      >
                        Nạp/Rút
                      </button>
                    </div>

                    {transactions && transactions?.journal?.length > 0 ? (
                      <div className="flex-row flex items-stretch">
                        <WalletInfo data={transactions.journal} />

                        <div className="hidden sm:flex lg:hidden absolute right-[24px] top-[24px]">
                          <button
                            onClick={() => handleToggleModal({ status: true, type: "transaction" })}
                            className="btn-primary rounded-[30px] h-fit w-fit"
                          >
                            Nạp/Rút
                          </button>
                        </div>
                      </div>
                    ) : null}
                  </>
                )}
              </div>

              {/* <div className="mt-[40px]">
                <WalletGuide />
              </div> */}
            </div>

            <div className="">
              <div className="flex items-center justify-between mb-16">
                <p className="text-base font-semibold lg:text-xl">Lịch sử giao dịch</p>

                <button
                  onClick={() => setShowFilter(true)}
                  className="w-[44px] h-[44px] sm:hidden rounded-[8px] bg-gray-color-1 flex-center"
                >
                  <FilterIcon />
                </button>
              </div>

              <div className="py-24 hidden sm:block xl:sticky top-[80px] bg-white-color">
                <WalletFilter onChange={(val) => filterTransactions(val as JournalFilterDate)} />
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
                    dataLength={transactions?.transaction?.length || 0}
                    hasMore={hasMore}
                    loader={isFetchingMore ? <Spinner className="py-[30px]" size={30} /> : null}
                    next={() => fetchMoreTransactions()}
                  >
                    <ul className="">
                      {transactions?.transaction?.map((item, index) => (
                        <li className="mb-12 md:mb-16 last:mb-0" key={index}>
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

      {/* Transaction modal */}
      {transaction?.payment_id?.state === "posted" ? (
        <Alert
          show={true}
          onConfirm={() => dispatch(setCheckoutPaymentId(undefined))}
          onClose={() => {
            dispatch(setCheckoutPaymentId(undefined))
            handleToggleModal({ status: false, type: "transaction" })
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
          onClose={() => handleToggleModal({ status: false, type: "transaction" })}
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
        <div className="flex-1 flex-col p-custom">
          <WalletFilter
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
