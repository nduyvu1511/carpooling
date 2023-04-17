// import { newsBg, ogImage } from "@/assets"
// import { News, Seo } from "@/components"
// import { DOMAIN_URL } from "@/helper"
// import { StaticLayout } from "@/layout"
// import { OpenGraphData } from "@/models"

// const NewsPage = () => {
//   return (
//     <StaticLayout
//       bg={newsBg}
//       heading="Cập nhật các tin tức mới nhất về Exxe.vn"
//       subHeading="Tin tức"
//     >
//       <Seo
//         description="Ứng dụng gọi xe đường dài số 1 Việt Nam"
//         thumbnailUrl=""
//         title="Tin tức Exxe"
//         url="news"
//       />
//       <News />
//     </StaticLayout>
//   )
// }

// export default NewsPage

// export const getStaticProps = async () => {
//   return {
//     props: {
//       openGraphData: [
//         {
//           property: "og:image",
//           content: ogImage,
//           key: "ogimage",
//         },
//         {
//           property: "og:image:alt",
//           content: ogImage,
//           key: "ogimagealt",
//         },
//         {
//           property: "og:image:width",
//           content: "400",
//           key: "ogimagewidth",
//         },
//         {
//           property: "og:image:height",
//           content: "300",
//           key: "ogimageheight",
//         },
//         {
//           property: "og:url",
//           content: DOMAIN_URL + "/news",
//           key: "ogurl",
//         },
//         {
//           property: "og:image:secure_url",
//           content: ogImage,
//           key: "ogimagesecureurl",
//         },
//         {
//           property: "og:title",
//           content: "Tin tức ExxeVn",
//           key: "ogtitle",
//         },
//         {
//           property: "og:description",
//           content: "Đăng ký để không bỏ lỡ những tin tức mới nhất từ ExxeVn",
//           key: "ogdesc",
//         },
//         {
//           property: "og:type",
//           content: "website",
//           key: "website",
//         },
//       ] as OpenGraphData[],
//     },
//   }
// }

import React from 'react'

const News = () => {
  return <div>News</div>
}

export default News
