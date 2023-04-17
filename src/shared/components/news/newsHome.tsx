import { useNews } from '@/hooks'
import { useRouter } from 'next/router'
import { NewsSlide } from './newsSlide'

export const NewsHome = () => {
  const router = useRouter()
  const { data: news, isValidating: isLoading } = useNews()

  return (
    <div className="mt-[50px] lg:mt-[120px] bg-bg-primary py-[32px] md:py-[50px] lg:py-[80px]">
      <div className="container py-0">
        <h1 className="h1 text-primary mb-[40px] md:mb-[60px] lg:mb-[80px] text-center">
          Tin tức
        </h1>
        <NewsSlide data={news} isLoading={isLoading} />
        <div className="mt-[32px] md:mt-[40px] lg:mt-[80px] flex justify-center">
          <button
            onClick={() => router.push('/news')}
            className="btn-primary-outline max-w-[400px] sm:w-fit hover:bg-[transparent] w-full py-[6px] lg:w-fit lg:py-[10px]"
          >
            Xem thêm
          </button>
        </div>
      </div>
    </div>
  )
}
