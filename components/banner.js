import styles from "./banner.module.css";

const Banner = (props) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <span className={styles.title1}>Coffee</span>
        <span className={styles.title2}>Connoisseur</span>
      </h1>
      <p className={styles.subtitle}>Discover your local coffee shops!</p>
      <div className={styles.buttonWrapper}></div>
      <button className={styles.button} onClick={props.handleClick}>
        {props.buttonText}
      </button>
    </div>
  );
};

export default Banner;
