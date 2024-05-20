import { Html, Head, Main, NextScript } from 'next/document'

const Document = () => {
  return (
    <Html lang="en">
      <Head>
        <meta
          name="description"
          content="균형잡힌 알고리즘 공부 알고노트로 시작하세요"
        />
        <meta property="og:title" content="algonote" />
        <meta
          property="og:description"
          content="균형잡힌 알고리즘 공부 알고노트로 시작하세요"
        />
        <meta property="og:image" content="images/longLogo.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <div id="modal-root" />
        <div id="modal2-root" />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document
