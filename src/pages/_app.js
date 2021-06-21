
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import * as gtag from '../../lib/gtag'
import '../sass/main.scss';

// This default export is required in a new `pages/_app.js` file.
const App = ({ Component, pageProps }) => {
    const router = useRouter()
    useEffect(() => {
      const handleRouteChange = (url) => {
        gtag.pageview(url)
      }
      router.events.on('routeChangeComplete', handleRouteChange)
      return () => {
        router.events.off('routeChangeComplete', handleRouteChange)
      }
    }, [router.events])
  
    return <Component {...pageProps} />
  }
  
  export default App