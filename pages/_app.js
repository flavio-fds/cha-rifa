import Provider from '../contexts/Provider'
import '../styles/globals.css'
import '../styles/Raffle.css';

function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
