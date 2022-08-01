import { useDriverWallet } from "@/hooks"
import { DriverAccountLayout } from "@/layout"

const WalletDriver = () => {
  const { data, isInitialLoading, isValidating } = useDriverWallet()

  return (
    <DriverAccountLayout desc="Quản lý thông tin ví" title="Ví cá nhân">
      <div className="">
        <div className="">
          <p className="text-base font-semibold mb-[16px]">Ví cá nhân</p>
          <ul>
            <li></li>
          </ul>
        </div>
      </div>
    </DriverAccountLayout>
  )
}

export default WalletDriver
