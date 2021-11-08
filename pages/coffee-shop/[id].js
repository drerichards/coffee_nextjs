import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import cls from "classnames";

import fetchCoffeeShops from "../../lib/coffee-shops";
import styles from "../../styles/Coffee-shop.module.css";

export async function getStaticProps(staticProps) {
  const params = staticProps.params;
  const term = "coffee";
  const location = "toronto";
  const coffeeShops = await fetchCoffeeShops(term, location, 6);

  return {
    props: {
      coffeeShop: coffeeShops.find(
        (store) => store.id.toString() === params.id
      ),
    },
  };
}

export async function getStaticPaths() {
  //map all the ids to paths so that you don't have to hard code
  const term = "coffee";
  const location = "toronto";
  const coffeeShops = await fetchCoffeeShops(term, location, 6);
  const paths = coffeeShops.map((store) => ({
    params: {
      id: store.id.toString(),
    },
  }));
  return {
    paths,
    fallback: true,
  };
}

const CoffeeShop = ({ coffeeShop }) => {
  const dummyImg =
    "https://images.unsplash.com/photo-1498804103079-a6351b050096?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80";
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  const { location, image_url, name, rating } = coffeeShop;
  const handleUpvoteClick = () => {
    console.log(coffeeShop);
  };

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <Link href="/" className={styles.backToHomeLink}>
            <a>Home</a>
          </Link>

          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <div className={styles.storeImgWrapper}>
            <Image
              className={styles.storeImg}
              src={image_url || dummyImg}
              width={600}
              height={360}
              alt={name}
            />
          </div>
        </div>
        <div className={cls("glass", styles.col2)}>
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/places.svg"
              width="24"
              height="24"
              alt="icon"
            />
            <p className={styles.text}>{location.address1}</p>
            {location.address2 && (
              <p className={styles.text}>{location.address2}</p>
            )}
          </div>
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/nearMe.svg"
              width="24"
              height="24"
              alt="icon"
            />
            <p className={styles.text}>
              {location.city}, {location.state}, {location.country}{" "}
              {location.zip_code}
            </p>
          </div>
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/star.svg"
              width="24"
              height="24"
              alt="icon"
            />
            <p className={styles.text}>{rating}</p>
          </div>
          <button className={styles.upvoteButton} onClick={handleUpvoteClick}>
            Upvote!
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeShop;
