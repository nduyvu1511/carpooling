import { Journal } from "@/models"
import { userAPI } from "@/services"
import { AxiosResponse } from "axios"
import useSWR from "swr"

export const WalletInfoPopup = () => {
  const { isValidating, mutate, data, error } = useSWR("get_wallet_info", () =>
    userAPI
      .getJournalList({ limit: 0 })
      .then((res: AxiosResponse<Journal>) => res?.result?.data?.journal)
      .catch((err) => console.log(err))
  )
  return <div>WalletInfoPopup</div>
}
