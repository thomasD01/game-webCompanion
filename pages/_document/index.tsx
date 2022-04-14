/**
 * @file used to provide Files to the DOM using NEXT
 */

//Libraries
import Document, { Html, Head, Main, NextScript } from 'next/document'

//class
export default class Doc extends Document {
  render() {
    return (
      <Html>
        <Head >
          <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
          <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
          <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
