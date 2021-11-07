import { useRouter } from "next/router";
import coffeeShopsData from "../../data/coffee-stores.json";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import cls from "classnames";

import styles from "../../styles/Coffee-shop.module.css";

export function getStaticProps(staticProps) {
  const params = staticProps.params;

  return {
    props: {
      coffeeShop: coffeeShopsData.find(
        (store) => store.id.toString() === params.id
      ),
    },
  };
}

export function getStaticPaths() {
  //map all the ids to paths so that you don't have to hard code
  const paths = coffeeShopsData.map((store) => ({
    params: {
      id: store.id.toString(),
    },
  }));
  return {
    paths,
    fallback: true,
  };
}

const CoffeeShop = (props) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  const { address, img, name, neighbourhood } = props.coffeeShop;

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
              src={img}
              width={600}
              height={360}
              alt={name}
            />
          </div>
        </div>
        <div className={cls("glass", styles.col2)}>
          <div className={styles.iconWrapper}>
            <Image src="/" width="24" height="24" alt="icon" />
            <p className={styles.text}>{address}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image src="/" width="24" height="24" alt="icon" />
            <p className={styles.text}>{neighbourhood}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image src="/" width="24" height="24" alt="icon" />
            <p className={styles.text}>5</p>
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
