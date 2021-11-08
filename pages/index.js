import Head from "next/head";
import Image from "next/image";
import Banner from "../components/banner";
import Card from "../components/card";

import styles from "../styles/Home.module.css";
// import coffeeShopsData from "../data/coffee-stores.json";

export async function getStaticProps(context) {
  const token =
    "Bearer DEAEkjpv_kWyfQfI-gDhGNAexoPlVQLuvR4wNqYWmiAX7iMBbfMtQSI0Uh7UTQbLSA22-kIwzvT64Hrjxbq1KMISNBcOOZ3_bKOsd6GPuNEuI1WK8opLx7OYAI2IYXYx";
  const term = "coffee";
  const location = "toronto";
  const url = `https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&limit=6`;
  const coffeeShopData = [];

  const settings = {
    headers: { Authorization: token },
  };
  const response = await fetch(url, settings);
  const data = await response.json();
  coffeeShopData.push(data);
  console.log(coffeeShopData);
  return {
    props: {
      coffeeShops: data.businesses,
    }, // gets passed to the page comp as props
  };
}

export default function Home(props) {
  // console.log(props);
  const handleBannerBtnClick = (e) => {
    console.log(e);
  };

  const dummyImg = "https://images.unsplash.com/photo-1498804103079-a6351b050096?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80"

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
                  img={dummyImg}
                />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
