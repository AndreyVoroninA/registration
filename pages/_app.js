import '../styles/globals.scss'
import Transition from '../components/Transition.tsx'
import { useRouter } from "next/router"
import Head from 'next/head'

function MyApp({ Component, pageProps}) {
const router = useRouter()
  return (

      <Transition location={router.pathname}>
        <Head>
        <title>Тестовое Involta</title>
      </Head>
        <Component {...pageProps} />
      </Transition>
  )
}

export default MyApp
