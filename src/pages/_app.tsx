import store from "@/core/store"
import { App, EmptyLayout } from "@/layout"
import { AppPropsWithLayout } from "@/models"
import { persistor } from "core"
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
