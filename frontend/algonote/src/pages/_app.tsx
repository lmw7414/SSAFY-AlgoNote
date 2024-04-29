import type { AppProps } from 'next/app'
import '@/styles/globals.scss'
import NavBar from '@/components/commons/NavBar'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <NavBar />
      <Component {...pageProps} />
    </>
  )
}

export default App
