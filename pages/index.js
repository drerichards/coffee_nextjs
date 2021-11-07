import Head from "next/head";
import Image from "next/image";
import Banner from "../components/banner";
import Card from "../components/card";

import styles from "../styles/Home.module.css";
import coffeeShopsData from "../data/coffee-stores.json";

export async function getStaticProps(context) {
  return {
    props: {
      coffeeShops: coffeeShopsData,
    }, // gets passed to the page comp as props
  };
}

export default function Home(props) {
  console.log(props);
  const handleBannerBtnClick = (e) => {
    console.log(e);
  };

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
        {props.coffeeShops.length > 0 && (
          <>
            <h2 className={styles.heading2}>Toronto Coffee Shops</h2>
            <div className={styles.cardLayout}>
              {props.coffeeShops.map((store) => (
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
