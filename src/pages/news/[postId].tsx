import { NewsSlide, Seo } from "@/components"
import { StaticLayout } from "@/layout"
import { PostDetailRes, PostRes } from "@/models"
import { newsAPI } from "@/services"
import { useRouter } from "next/router"
import useSWR from "swr"

const PostDetail = () => {
  const router = useRouter()
  const { postId } = router.query
  const { isValidating, data } = useSWR<PostDetailRes>(
    postId ? `get_post_detail_${postId}` : null,
    () =>
      newsAPI
        .getPostDetail(postId + "")
        .then((res: any) => res.data)
        .catch((err) => console.log(err)),
    { dedupingInterval: 1000 }
  )
  const { data: newsRelated, isValidating: isRelatedLoading } = useSWR<PostRes[]>(
    data?.category?.categoryId ? `get_related_post_${postId}` : null,
    () =>
      newsAPI
        .getPosts({ categoryId: data?.category?.categoryId })
        .then((res: any) => res.data)
        .catch((err) => console.log(err)),
    { dedupingInterval: 1000000 }
  )

  return (
    <StaticLayout
      lastNode={
        <>
          {newsRelated ? (
            <div className="">
              <p className="mb-24 text-18 md:text-20 lg:text-24 font-medium">
                Các bài viết liên quan
              </p>
              <NewsSlide isLoading={isRelatedLoading} data={newsRelated} />
            </div>
          ) : null}
        </>
      }
      showLoading={isValidating}
      sticky
      heading={data?.title}
      subHeading="Tin tức"
    >
      <Seo
        description={data?.shortContent || data?.title || ""}
        thumbnailUrl=""
        title={data?.title || "Tin tức"}
        url={`https://exxe.vn/news/${data?.postId}`}
      />

      {data ? (
        <div className="news__page" dangerouslySetInnerHTML={{ __html: data?.content + "" }}></div>
      ) : null}
    </StaticLayout>
  )
}

export default PostDetail
