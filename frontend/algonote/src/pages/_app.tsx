import { useRouter } from 'next/router'
import type { AppProps } from 'next/app'
import '@/styles/globals.scss'
import Footer from '@/components/commons/Footer'
import NavBar from '@/components/commons/NavBar'
import NoteNavBar from '@/components/commons/NoteNavBar'

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter()
  return (
    <>
      {router.pathname === '/writenote' || router.pathname === '/revisenote' ? (
        <NoteNavBar />
      ) : (
        <NavBar />
      )}
      <Component {...pageProps} />
      {router.pathname !== '/writenote' && router.pathname !== '/revisenote' ? (
        <Footer />
      ) : null}
    </>
  )
}

export default App
