import { useRouter } from "next/router"
import { useEffect } from "react"

interface Props {
  cb: (as: string) => void
  shouldStay?: boolean
}

const useBackRouter = ({ cb, shouldStay = true }: Props) => {
  const router = useRouter()

  useEffect(() => {
    router.beforePopState(({ url }) => {
      if (url !== router.asPath) {
        cb(url)
      }
      return true
    })

    return () => {
      router.beforePopState(() => true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])
}

export { useBackRouter }
