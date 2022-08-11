import { useNews } from "@/hooks"
import { CategoryRes } from "@/models"
import { newsApi } from "@/services"
import useSWR from "swr"
import { Spinner } from "../loading"
import { Tabs } from "../tabs"
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
    newsApi
      .getCategories()
      .then((res: any) => res.data.data)
      .catch((err) => console.log(err))
  )

  return (
    <div className="">
      <div className="mb-[40px] flex-center">
        <Tabs
          className="flex-nowrap overflow-auto scrollbar-hide"
          list={[
            { label: "Tất cả", value: "all" },
            ...(categories || [])?.map((item) => ({ label: item.name, value: item.categoryId })),
          ]}
          tabActive={categoryId}
          onChange={(val) => filterNews(val + "")}
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-[16px] lg:grid-cols-4 md:gap-24 lg:gap-[24px]">
        {isValidatingNews
          ? Array.from({ length: 4 }).map((_, index) => <NewsItem key={index} data={null} />)
          : news?.map((item) => <NewsItem data={item} key={item.postId} />)}
      </div>

      {isFetchingMore ? <Spinner /> : null}

      {hasMore ? (
        <button
          onClick={() => fetchMoreNews()}
          className="mx-auto btn-primary-outline mt-24 md:mt-[42px] lg:mt-[64px]"
        >
          Xem thêm
        </button>
      ) : null}
    </div>
  )
}

export { News }
