import Provider from '../contexts/Provider'
import '../styles/globals.css'
import '../styles/Raffle.css';
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <Provider>
    <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
