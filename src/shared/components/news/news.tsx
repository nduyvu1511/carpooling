import { useNews } from "@/hooks"
import { CategoryRes } from "@/models"
import { newsAPI } from "@/services"
import useSWR from "swr"
import { Tabs } from "../common"
import { Spinner } from "../loading"
import { NewsItem } from "./newsItem"

const News = () => {
  const {
    data: news,
    categoryId,
    fetchMoreNews,
    filterNews,
    isValidating: isValidatingNews,
    hasMore,
    isFetchingMore,
  } = useNews()

  const { data: categories } = useSWR<CategoryRes[]>("get_category_list", () =>
    newsAPI
      .getCategories()
      .then((res: any) => res.data)
      .catch((err) => console.log(err))
  )

  return (
    <div className="">
      <div className="relative mr-[-12px]">
        <span className="absolute right-0 top-0 bottom-0 w-[20px] bg-linear-gradient z-10"></span>
        <Tabs
          className="flex-nowrap overflow-auto scrollbar-hide mb-24 md:mb-[32px] lg:mb-40 border-b-0 justify-center"
          list={[
            { label: "Tất cả", value: "all" },
            ...(categories || [])?.map((item) => ({ label: item.name, value: item.categoryId })),
          ]}
          tabActive={categoryId}
          onChange={(val) => filterNews(val + "")}
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-custom lg:grid-cols-4">
        {isValidatingNews
          ? Array.from({ length: 4 }).map((_, index) => <NewsItem key={index} data={null} />)
          : news?.map((item) => <NewsItem data={item} key={item.postId} />)}
      </div>

      {isFetchingMore ? <Spinner /> : null}

      {hasMore ? (
        <button
          onClick={() => fetchMoreNews()}
          className="mx-auto btn-primary-outline mt-32 lg:mt-[40px]"
        >
          Xem thêm
        </button>
      ) : null}
    </div>
  )
}

export { News }
