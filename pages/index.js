import Head from "next/head";
import Image from "next/image";
import Banner from "../components/banner";
import Card from "../components/card";

import fetchCoffeeShops from "../lib/coffee-shops";
import styles from "../styles/Home.module.css";

export async function getStaticProps(context) {
  const term = "coffee";
  const location = "toronto";
  const coffeeShops = await fetchCoffeeShops(term, location, 6);

  // console.log(coffeeShops);
  return {
    props: {
      coffeeShops,
    }, // gets passed to the page comp as props
  };
}

export default function Home({ coffeeShops }) {
  const handleBannerBtnClick = (e) => {
    console.log(e);
  };
  console.log(coffeeShops);

  const dummyImg =
    "https://images.unsplash.com/photo-1498804103079-a6351b050096?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80";

  return (
    <div className={styles.container}>
      {/* tells browser and search engine all the technical info about the web page */}
      <Head>
        <title>Coffee Connoisseur</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Banner
          buttonText="View stores nearby"
          handleClick={handleBannerBtnClick}
        />
        <div className={styles.heroImage}>
          <Image
            src="/static/hero-image.svg"
            alt="Hero Image"
            width={800}
            height={500}
          />
        </div>
        {coffeeShops.length > 0 && (
          <>
            <h2 className={styles.heading2}>Toronto Coffee Shops</h2>
            <div className={styles.cardLayout}>
              {coffeeShops.map((store) => (
                <Card
                  key={store.id}
                  className={styles.card}
                  name={store.name}
                  href={`/coffee-shop/${store.id}`}
                  img={store.img}
                />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
