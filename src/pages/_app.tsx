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

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SWRConfig value={{ revalidateOnFocus: false, shouldRetryOnError: false }}>
          <Head>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
            {/* <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" /> */}
          </Head>
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
  )
}

export default MyApp
