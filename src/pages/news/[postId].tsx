import { NewsSlide } from "@/components"
import { StaticLayout } from "@/layout"
import { PostDetailRes, PostRes } from "@/models"
import { newsApi } from "@/services"
import { useRouter } from "next/router"
import useSWR from "swr"

const PostDetail = () => {
  const router = useRouter()
  const { postId } = router.query
  const { isValidating, data } = useSWR<PostDetailRes>(
    postId ? `get_post_detail_${postId}` : null,
    () =>
      newsApi
        .getPostDetail(postId + "")
        .then((res: any) => res.data.data)
        .catch((err) => console.log(err)),
    { dedupingInterval: 1000000 }
  )
  const { data: newsRelated, isValidating: isRelatedLoading } = useSWR<PostRes[]>(
    data?.category?.categoryId ? `get_related_post_${postId}` : null,
    () =>
      newsApi
        .getPosts({ categoryId: data?.category?.categoryId })
        .then((res: any) => res.data.data)
        .catch((err) => console.log(err)),
    { dedupingInterval: 1000000 }
  )

  return (
    <StaticLayout showLoading={isValidating} sticky heading={data?.title} subHeading="Tin tức">
      <div className="news__page" dangerouslySetInnerHTML={{ __html: data?.content + "" }}></div>

      <div className="my-[40px] lg:my-[80px] border-b border-solid border-border-color "></div>
      {newsRelated ? (
        <div className="">
          <p className="mb-24 text-16 md:text-18 lg:text-24 font-medium">Các bài viết liên quan</p>
          <NewsSlide isLoading={isRelatedLoading} data={newsRelated} />
        </div>
      ) : null}
    </StaticLayout>
  )
}

export default PostDetail
