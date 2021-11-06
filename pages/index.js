import Head from 'next/head'
import Image from 'next/image'
import Banner from "../components/banner"
import Card from "../components/card"

import styles from '../styles/Home.module.css'
import coffeeStores from "../data/coffee-stores.json"

export default function Home () {
  const handleBannerBtnClick = e => {
    console.log(e)
  }

  return (
    <div className={styles.container}>
      {/* tells browser and search engine all the technical info about the web page */}
      <Head>
        <title>Coffee Connoisseur</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Banner buttonText="View stores nearby" handleClick={handleBannerBtnClick} />
        <div className={styles.heroImage}>
          <Image src="/static/hero-image.svg" alt="Hero Image" width={800} height={500} />
        </div>
        <div className={styles.cardLayout}>
          {coffeeStores.map(store => (
            <Card
              key={store.id}
              className={styles.card}
              name={store.name}
              href={`/coffee-shop/${store.id}`}
              img={store.img}
            />
          ))}
        </div>
      </main>
    </div>
  )
}
