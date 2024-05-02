import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import '@/styles/globals.scss'
import NavBar from '@/components/commons/NavBar'
import NoteNavBar from '@/components/commons/NoteNavBar'

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter()
  return (
    <>
      {router.pathname === '/writenote' ? <NoteNavBar /> : <NavBar />}
      <Component {...pageProps} />
    </>
  )
}

export default App
