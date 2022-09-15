import { carLoadingAnimation } from "@/assets"
import { RootState } from "@/core/store"
import Lottie from "react-lottie"
import { useSelector } from "react-redux"

const SpinnerLoading = () => {
  const isScreenLoading = useSelector((state: RootState) => state.common.isScreenLoading)

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: carLoadingAnimation,
    renderer: "svg",
  }

  return (
    <>
      {isScreenLoading ? (
        <div className="fixed inset-[0] bg-black-60 z-[4000]">
          <div className="absolute-center z-10 bg-white-color py-[20px] px-[20px] rounded-[8px] flex-center flex-col">
            <Lottie options={defaultOptions} height={100} width={120} />
            <span className="text-xs font-medium">Vui lòng đợi...</span>
          </div>
        </div>
      ) : null}
    </>
  )
}

export { SpinnerLoading }
