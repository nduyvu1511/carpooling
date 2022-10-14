import { PostRes } from "@/models"
import { newsAPI } from "@/services"
import { useState } from "react"
import { useQueryList } from "../async"

interface Res {
  data: PostRes[]
  isValidating: boolean
  isInitialLoading: boolean
  fetchMoreNews: Function
  filterNews: (categoryId: string) => void
  categoryId: string
  hasMore: boolean
  isFetchingMore: boolean
}

const LIMIT = 12

const useNews = (): Res => {
  const [categoryId, setCategoryId] = useState<string>("all")
  const { data, error, fetchMoreItem, filterList, hasMore, isFetchingMore, isValidating, offset } =
    useQueryList<PostRes[]>({
      fetcher: newsAPI.getPosts,
      initialData: undefined,
      key: "get_news_list",
      params: { limit: LIMIT, offset: 0 },
    })

  const fetchMoreNews = () => {
    const newOffset = offset + LIMIT
    fetchMoreItem(
      newsAPI.getPosts({ categoryId: categoryId === "all" ? "" : categoryId, offset: newOffset })
    )
  }

  const filterNews = (categoryId: string) => {
    setCategoryId(categoryId)
    filterList(
      newsAPI.getPosts({
        categoryId: categoryId === "all" ? "" : categoryId,
        offset: 0,
        limit: LIMIT,
      })
    )
  }

  return {
    data: data || [],
    isInitialLoading: error === undefined && data === undefined,
    isValidating,
    fetchMoreNews,
    filterNews,
    categoryId,
    hasMore,
    isFetchingMore,
  }
}

export { useNews }
