import { GetPostsParams } from "@/models/news"
import axiosClient from "."

export const newsApi = {
  getPosts: ({ limit = 12, offset = 0, categoryId }: GetPostsParams) => {
    return axiosClient.get(
      `https://tintuc.exxe.vn/api/post?limit=${limit}&offset=${offset}${
        categoryId !== undefined ? `&categoryId=${categoryId} ` : ""
      }`
    )
  },

  getRelatedPosts: ({ limit = 12, offset = 0, categoryId }: GetPostsParams) => {
    return axiosClient.get(
      `https://tintuc.exxe.vn/api/post?limit=${limit}&offset=${offset}${
        categoryId !== undefined ? `&categoryId=${categoryId} ` : ""
      }`
    )
  },

  getPostDetail: (postId: string) => {
    return axiosClient.get(`https://tintuc.exxe.vn/api/post/${postId}`)
  },

  getCategories: () => {
    return axiosClient.get(`https://tintuc.exxe.vn/api/category`)
  },
}
