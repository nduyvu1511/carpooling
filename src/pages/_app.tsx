import store from "@/core/store"
import { App, EmptyLayout } from "@/layout"
import { AppPropsWithLayout } from "@/models"
import { persistor } from "core"
import { NextSeo } from "next-seo"
import Head from "next/head"
import { Provider } from "react-redux"
import { NotificationsProvider } from "reapop"
import { PersistGate } from "redux-persist/integration/react"
import { SWRConfig } from "swr"
import "../styles/index.scss"

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? EmptyLayout
  const { openGraphData = [] } = pageProps as any

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        {openGraphData.map((og: any, index: number) => (
          <meta key={index} {...og} />
        ))}
        <NextSeo
          defaultTitle="Ứng dụng đặt xe ExxeVn"
          description="Ứng dụng ExxeVn là ứng dụng thương mại điện tử trên thiết bị di động do Công ty Cổ phần Đầu Tư Công Nghệ và Vận Tải ExxeVn thiết lập, quản lý vận tải cho các tổ chức, cá nhân khác hoạt động phù hợp với quy định của pháp luật hiện hành."
          openGraph={openGraphData}
        />
      </Head>

      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SWRConfig value={{ revalidateOnFocus: false, shouldRetryOnError: false }}>
            <App>
              <Layout>
                <NotificationsProvider>
                  <Component {...pageProps} />
                </NotificationsProvider>
              </Layout>
            </App>
          </SWRConfig>
        </PersistGate>
      </Provider>
    </>
  )
}

export default MyApp
