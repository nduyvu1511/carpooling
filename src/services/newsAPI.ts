import { GetPostsParams } from '@/models'
import axiosClient from '.'

export const newsAPI = {
  getPosts: ({ limit = 12, offset = 0, categoryId }: GetPostsParams) => {
    return axiosClient.get(
      `${process.env.NEXT_PUBLIC_NEWS_URL}/api/post?limit=${limit}&offset=${offset}${
        categoryId !== undefined ? `&categoryId=${categoryId} ` : ''
      }`
    )
  },

  getRelatedPosts: ({ limit = 12, offset = 0, categoryId }: GetPostsParams) => {
    return axiosClient.get(
      `${process.env.NEXT_PUBLIC_NEWS_URL}/api/post?limit=${limit}&offset=${offset}${
        categoryId !== undefined ? `&categoryId=${categoryId} ` : ''
      }`
    )
  },

  getPostDetail: (postId: string) => {
    return axiosClient.get(`${process.env.NEXT_PUBLIC_NEWS_URL}/api/post/${postId}`)
  },

  getCategories: () => {
    return axiosClient.get(`${process.env.NEXT_PUBLIC_NEWS_URL}/api/category`)
  }
}
