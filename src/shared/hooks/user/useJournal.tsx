import {
  ConfirmRechargeRequestParams,
  CreateRechargeMoneyRes,
  CreateRechargeRequestParams,
  Journal,
  JournalFilterDate,
  JournalRes,
  MakeWithdrawingRequestParams,
  TransactionRes,
  UseParams,
} from "@/models"
import { userApi } from "@/services"
import { AxiosResponse } from "axios"
import { useState } from "react"
import useSWR, { KeyedMutator } from "swr"
import { useFetcher } from "../async"

interface useJournalProps {
  mutate: KeyedMutator<Journal>
  isValidating: boolean
  isInitialLoading: boolean
  data: Journal | undefined
  hasMore: boolean
  journalFilter: JournalFilterDate | undefined
  fetchMoreTransactions: () => void
  filterTransactions: (params: JournalFilterDate) => void
  isFetchingMore: boolean
  addWithdrawRequest: ({
    onSuccess,
    params,
    onError,
  }: UseParams<MakeWithdrawingRequestParams, TransactionRes>) => void
  createRechargeRequest: ({
    onSuccess,
    params,
    onError,
  }: UseParams<CreateRechargeRequestParams, CreateRechargeMoneyRes>) => void
  confirmRechargeRequest: ({
    onSuccess,
    params,
    onError,
  }: UseParams<ConfirmRechargeRequestParams, any>) => void
}

const LIMIT = 12

const useJournal = (): useJournalProps => {
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
  const [isFetchingMore, setFetchingMore] = useState<boolean>(false)
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
  }: UseParams<MakeWithdrawingRequestParams, TransactionRes>) => {
    fetcherHandler({
      fetcher: userApi.MakeWithdrawingRequest(params),
      onSuccess: (data) => {
        onSuccess?.(data)
      },
      onError: onError?.(),
    })
  }

  const createRechargeRequest = async ({
    onSuccess,
    params,
    onError,
  }: UseParams<CreateRechargeRequestParams, CreateRechargeMoneyRes>) => {
    fetcherHandler({
      fetcher: userApi.createRechargeRequest(params),
      onSuccess: (data) => {
        onSuccess?.(data)
      },
      onError: onError?.(),
    })
  }

  const confirmRechargeRequest = async ({
    onSuccess,
    params,
    onError,
  }: UseParams<ConfirmRechargeRequestParams, any>) => {
    fetcherHandler({
      fetcher: userApi.confirmRechargeRequest(params),
      onSuccess: (data) => {
        mutate()
        onSuccess?.(data)
      },
      onError: onError?.(),
    })
  }

  return {
    data,
    isInitialLoading: data === undefined && error === undefined,
    isValidating: isValidating || isLoading,
    fetchMoreTransactions,
    filterTransactions,
    hasMore,
    isFetchingMore,
    addWithdrawRequest,
    journalFilter: date,
    createRechargeRequest,
    confirmRechargeRequest,
    mutate,
  }
}

export { useJournal }
