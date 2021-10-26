import Head from 'next/head'
import Image from 'next/image'
import Banner from "../components/banner"
import styles from '../styles/Home.module.css'

export default function Home () {
  const handleBannerBtnClick = e => {
    console.log(e);
  }

  return (
    <div className={styles.container}>
    {/* tells browser and search engine all the technical info about the web page */}
      <Head>
        <title>Coffee Connoisseur</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Banner buttonText="View stores nearby" handleClick={handleBannerBtnClick}/>
        <div className={styles.heroImage}>
        <Image src="/static/hero-image.svg" alt="Hero Image" width={800} height={500} />
        </div>
      </main>
    </div>
  )
}
