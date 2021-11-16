import Head from "next/head";
import Image from "next/image";
import Banner from "../components/banner";
import Card from "../components/card";
import useTrackLocation from "../hooks/use-track-location";

import fetchCoffeeShops from "../lib/coffee-shops";
import styles from "../styles/Home.module.css";

export async function getStaticProps(context) {
  const term = "coffee shop";
  const location = "toronto";
  const coffeeShops = await fetchCoffeeShops(term, location, 6);

  return {
    props: {
      coffeeShops,
    }, // gets passed to the page comp as props
  };
}

export default function Home({ coffeeShops }) {
  const { latLong, handleTrackLocation, locationErrorMsg, isLocating } =
    useTrackLocation();
  console.log({latLong, locationErrorMsg})
  const handleBannerBtnClick = (e) => {
    console.log({latLong, locationErrorMsg});
    handleTrackLocation();
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
          buttonText={isLocating ? "Locating...": "View stores nearby"}
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
