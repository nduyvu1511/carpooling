/* eslint-disable @next/next/no-sync-scripts */
import { GOOGLE_MAP_API_KEY } from "@/helper"
import Document, { Head, Html, Main, NextScript } from "next/document"
// eslint-disable-next-line @next/next/no-script-in-document
import Script from "next/script"

class MyDocument extends Document {
  render() {
    return (
      <Html lang="vi">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
            rel="stylesheet"
          />
          <link rel="shortcut icon" href="/logo.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
          <Script
            defer
            id="googlemaps"
            type="text/javascript"
            strategy="beforeInteractive"
            src={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}&libraries=places`}
          />
        </body>
      </Html>
    )
  }
}

export default MyDocument
