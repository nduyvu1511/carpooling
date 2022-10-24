import { ogImage } from "@/assets"
import { HomeCustomer, HomeDriver, HomeGuest } from "@/components"
import { DOMAIN_URL } from "@/helper"
import { HomeLayout } from "@/layout"
import { OpenGraphData } from "@/models"
import { useSelector } from "react-redux"
import { RootState } from "../core"

const HomePage = () => {
  const userInfo = useSelector((state: RootState) => state.userInfo.userInfo)

  if (userInfo?.car_account_type === "car_driver") return <HomeDriver />
  if (userInfo?.car_account_type === "customer") return <HomeCustomer />

  return <HomeGuest />
}

HomePage.Layout = HomeLayout
export default HomePage

export const getStaticProps = async () => {
  return {
    props: {
      openGraphData: [
        {
          property: "og:image",
          content: ogImage,
          key: "ogimage",
        },
        {
          property: "og:image:alt",
          content: ogImage,
          key: "ogimagealt",
        },
        {
          property: "og:image:width",
          content: "400",
          key: "ogimagewidth",
        },
        {
          property: "og:image:height",
          content: "300",
          key: "ogimageheight",
        },
        {
          property: "og:url",
          content: DOMAIN_URL,
          key: "ogurl",
        },
        {
          property: "og:image:secure_url",
          content: ogImage,
          key: "ogimagesecureurl",
        },
        {
          property: "og:title",
          content: "Ứng dụng đặt xe ExxeVn",
          key: "ogtitle",
        },
        {
          property: "og:description",
          content:
            "Ứng dụng ExxeVn là ứng dụng thương mại điện tử trên thiết bị di động do Công ty Cổ phần Đầu Tư Công Nghệ và Vận Tải ExxeVn thiết lập, quản lý vận tải cho các tổ chức, cá nhân khác hoạt động phù hợp với quy định của pháp luật hiện hành.",
          key: "ogdesc",
        },
        {
          property: "og:type",
          content: "website",
          key: "website",
        },
      ] as OpenGraphData[],
    },
  }
}
