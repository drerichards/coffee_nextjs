import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <footer>Dre Footer</footer>
    </>
  )
}

export default MyApp
