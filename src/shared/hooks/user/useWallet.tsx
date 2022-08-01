import { userApi } from "@/services"
import { useState } from "react"
import useSWR from "swr"

interface UseDriverWalletProps {
  isValidating: boolean
  isInitialLoading: boolean
  data: any[] | undefined
}

const useDriverWallet = (): UseDriverWalletProps => {
  const { isValidating, mutate, data, error } = useSWR("get_wallet_list", () =>
    userApi.getWalletList({}).then((res) => {
      const list = res.result.data
      return list
    })
  )
  const [offset, setOffset] = useState<number>(0)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [isLoading, setLoading] = useState<boolean>(false)

  const fetchMoreWallet = async () => {
    try {
      const res = await userApi.getWalletList({})
    } catch (error) {}
  }

  return {
    data,
    isInitialLoading: data === undefined && error === undefined,
    isValidating,
  }
}

export { useDriverWallet }
