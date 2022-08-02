import { GetTransactionListByWalletParams, JournalRes, TransactionRes } from "@/models"
import { userApi } from "@/services"
import { AxiosResponse } from "axios"
import { useState } from "react"
import useSWR from "swr"

interface UseDriverWalletProps {
  isValidating: boolean
  isInitialLoading: boolean
  data: WalletList | undefined
  hasMore: boolean
  fetchMoreTransactions: (params: GetTransactionListByWalletParams) => void
  filterTransactions: (params: GetTransactionListByWalletParams) => void
  isFetchingMore: boolean
}

type WalletList = {
  journal: JournalRes[]
  transaction: TransactionRes[]
}

const LIMIT = 12

const useDriverWallet = (): UseDriverWalletProps => {
  const { isValidating, mutate, data, error } = useSWR("get_wallet_list", () =>
    userApi.getWalletList({}).then((res) => {
      const list = res?.result?.data || []
      setHasMore(list.length >= LIMIT)
      return list
    })
  )
  const [offset, setOffset] = useState<number>(0)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [isLoading, setLoading] = useState<boolean>(false)
  const [isFetchingMore, setFetchingMore] = useState<boolean>(true)

  const fetchMoreTransactions = async (params: GetTransactionListByWalletParams) => {
    try {
      const newOffset = offset + LIMIT
      setFetchingMore(true)
      const res: AxiosResponse<WalletList> = await userApi.getTransactionListByWallet({
        ...params,
        limit: LIMIT,
        offset: newOffset,
      })
      setFetchingMore(false)
      setOffset(newOffset)
      const list: WalletList = res?.result?.data || []
      // setHasMore(list.length >= LIMIT)
      // mutate([...(data || []), ...list], false)
    } catch (error) {
      setFetchingMore(false)
      console.log(error)
    }
  }

  const filterTransactions = async (params: GetTransactionListByWalletParams) => {
    try {
      setLoading(true)
      const res: AxiosResponse<WalletList> = await userApi.getTransactionListByWallet({
        ...params,
        limit: LIMIT,
        offset: 0,
      })
      setLoading(false)
      setOffset(0)
      const list: WalletList = res?.result?.data || []
      // setHasMore(list.length >= LIMIT)
      mutate(list, false)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  return {
    data,
    isInitialLoading: data === undefined && error === undefined,
    isValidating: isValidating || isLoading,
    fetchMoreTransactions,
    filterTransactions,
    hasMore,
    isFetchingMore,
  }
}

export { useDriverWallet }
