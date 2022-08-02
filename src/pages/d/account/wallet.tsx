import { Spinner, TransactionItem } from "@/components"
import { useDriverWallet } from "@/hooks"
import { DriverAccountLayout } from "@/layout"
import DateTime from "react-datetime"
import InfiniteScroll from "react-infinite-scroll-component"

const headingClassName = "text-base font-semibold uppercase lg:normal-case mb-[16px]"

const WalletDriver = () => {
  const {
    data: transactions,
    isInitialLoading,
    isValidating,
    hasMore,
    fetchMoreTransactions,
    filterTransactions,
    isFetchingMore,
  } = useDriverWallet()

  return (
    <DriverAccountLayout>
      <div className="grid grid-cols-wallet-grid gap-24 py-24">
        <div className="">
          <div className="px-12 lg:px-24">
            <div className="mb-[40px]">
              <p className={headingClassName}>Ví cá nhân</p>
              <ul className="grid xl:grid-cols-2 grid-cols-1 gap-24">
                {transactions?.journal?.map((item) => (
                  <li key={item.journal_id} className="">
                    {/* <WalletItem isActive={true} wallet={item} /> */}
                  </li>
                ))}
              </ul>
            </div>

            <div className="">
              <p className={headingClassName}>Giao dịch gần nhất</p>
              <div className="mb-[40px]">
                <div className="form-date w-full max-w-[200px]">
                  <DateTime
                    dateFormat="DD/MM/YYYY"
                    timeFormat={false}
                    renderInput={(props) => <input className="" {...props} placeholder="Từ ngày" />}
                  />
                </div>
              </div>

              <InfiniteScroll
                dataLength={transactions?.transaction?.length || 0}
                hasMore={hasMore}
                loader={isFetchingMore ? <Spinner className="py-[30px]" size={30} /> : null}
                next={() => {}}
              >
                <ul className="">
                  {transactions?.transaction?.map((item, index) => (
                    <li
                      className="border-b border-solid border-border-color last:border-none"
                      // onClick={() => handleRedirect(item)}
                      key={index}
                    >
                      <TransactionItem transaction={item} />
                    </li>
                  ))}
                </ul>
              </InfiniteScroll>
            </div>
          </div>
        </div>

        <div className="">
          <p className="text-base font-medium text-primary "></p>
        </div>
      </div>
    </DriverAccountLayout>
  )
}

export default WalletDriver
