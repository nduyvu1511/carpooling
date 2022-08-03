import {
  JournalFilterDate,
  JournalRes,
  MakeWithdrawingRequestParams,
  TransactionRes,
  UseParams
} from "@/models"
import { userApi } from "@/services"
import { AxiosResponse } from "axios"
import { useMemo, useState } from "react"
import useSWR from "swr"
import { useFetcher } from "../async"

interface UseDriverWalletProps {
  isValidating: boolean
  isInitialLoading: boolean
  data: Journal | undefined
  hasMore: boolean
  fetchMoreTransactions: () => void
  filterTransactions: (params: JournalFilterDate) => void
  isFetchingMore: boolean
  getTotalMoney: number
  addWithdrawRequest: ({
    onSuccess,
    params,
    onError,
  }: UseParams<MakeWithdrawingRequestParams, any>) => void
}

type Journal = {
  journal: JournalRes[]
  transaction: TransactionRes[]
}

const LIMIT = 12

const useDriverWallet = (): UseDriverWalletProps => {
  const { fetcherHandler } = useFetcher()
  const { isValidating, mutate, data, error } = useSWR("get_wallet_list", () =>
    userApi.getJournalList({ limit: LIMIT }).then((res) => {
      const data: Journal = res?.result?.data || []
      setHasMore((data?.transaction?.length || 0) >= LIMIT)
      return data
    })
  )
  const [offset, setOffset] = useState<number>(0)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [isLoading, setLoading] = useState<boolean>(false)
  const [isFetchingMore, setFetchingMore] = useState<boolean>(true)
  const [date, setDate] = useState<JournalFilterDate | undefined>()

  const fetchMoreTransactions = async () => {
    if (!data?.transaction) return
    try {
      const newOffset = offset + LIMIT
      setFetchingMore(true)
      const res: AxiosResponse<Journal> = await userApi.getJournalList({
        ...date,
        limit: LIMIT,
        offset: newOffset,
      })
      setFetchingMore(false)
      setOffset(newOffset)
      const list: Journal = res?.result?.data || []
      setHasMore(list.transaction.length >= LIMIT)
      mutate(
        { ...data, transaction: [...(data.transaction || []), ...list.transaction] } as Journal,
        false
      )
    } catch (error) {
      setFetchingMore(false)
      console.log(error)
    }
  }

  const filterTransactions = async (params: JournalFilterDate | undefined) => {
    try {
      setLoading(true)
      setDate(params)
      const res: AxiosResponse<Journal> = await userApi.getJournalList({
        ...params,
        limit: LIMIT,
        offset: 0,
      })
      setLoading(false)
      setOffset(0)
      const list: Journal = res?.result?.data || []
      setHasMore(list.transaction.length >= LIMIT)
      mutate(list, false)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  const addWithdrawRequest = async ({
    onSuccess,
    params,
    onError,
  }: UseParams<MakeWithdrawingRequestParams, any>) => {
    fetcherHandler({
      fetcher: userApi.MakeWithdrawingRequest(params),
      onSuccess: (data) => {
        mutate()
        onSuccess?.(data)
      },
      onError: onError?.(),
      config: { successMsg: "Rút tiền thành công!" },
    })
  }

  const getTotalMoney: number = useMemo(() => {
    return data?.journal?.reduce((a, b) => a + b.remains_amount, 0) || 0
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.journal])

  return {
    data,
    isInitialLoading: data === undefined && error === undefined,
    isValidating: isValidating || isLoading,
    fetchMoreTransactions,
    filterTransactions,
    hasMore,
    isFetchingMore,
    getTotalMoney,
    addWithdrawRequest,
  }
}

export { useDriverWallet }

