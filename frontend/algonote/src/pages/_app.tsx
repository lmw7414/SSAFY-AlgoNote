import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import type { AppProps } from 'next/app'
import '@/styles/globals.scss'
import Footer from '@/components/commons/Footer'
import NavBar from '@/components/commons/NavBar'
import LandingNavBar from '@/components/commons/NavBar/landing'
import NoteNavBar from '@/components/commons/NoteNavBar'
import SSE from '@/components/commons/Notification/SSE/SSE'
import { getCookie } from '@/utils/cookie'

const App = ({ Component, pageProps }: AppProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)
  const router = useRouter()
  const url = router.pathname
  useEffect(() => {
    const accessToken = getCookie('access_token')
    if (accessToken) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [url])

  return (
    <>
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
      {router.pathname === '/writenote' || router.pathname === '/revisenote' ? (
        <NoteNavBar />
      ) : router.pathname === '/login' || router.pathname === '/signup' ? (
        <LandingNavBar />
      ) : (
        <NavBar />
      )}
      <Component {...pageProps} />
      {isLoggedIn ? <SSE /> : null}
      {router.pathname !== '/writenote' &&
      router.pathname !== '/revisenote' &&
      router.pathname !== '/landing' ? (
        <Footer />
      ) : null}
    </>
  )
}

export default App
