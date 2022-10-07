import Head from "next/head";
import styles from "../styles/Home.module.css";
import ProductComponent from "../components/ProductComponent";
import AboutComponent from "../components/AboutComponent";
import SimpleImageSlider from "react-simple-image-slider";
import Link from "next/link";
import { useEffect } from "react";
import axios from "axios";

export default function Home({ product }) {
  const images = [
    { url: "/images/s1.jpg" },
    { url: "/images/s2.png" },
    { url: "/images/s3.jpg" },
  ];

  useEffect(() => {
    // console.log(props.data);
  }, []);
  return (
    <div>
      <Head>
        <title>Madhav Masaala</title>
        <meta name="description" content="red chilli masala - madhav masaala" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* slider */}
      <div className={styles.slider}>
        <SimpleImageSlider
          width={"100%"}
          height={"100%"}
          images={images}
          showBullets={true}
          // showNavs={true}
          autoPlay={true}
          autoPlayDelay={3}
          className={styles.slider_comp}
        />
        <div className={styles.header_div}>
          <span className={styles.heading}>Madhav Masaala</span>
          <p className={styles.desc}>
            Our masalas help you in enhancing the flavour & bringing
            authenticity to your dishes.
          </p>
          <Link href="/product">
            <button className={styles.button}>Order Now</button>
          </Link>
        </div>
      </div>

      {/* product */}
      <h3 className={styles.section_heading}>Product</h3>
      <ProductComponent product={product} />
      {/* about us */}
      <AboutComponent />
      {/* tagline */}
      <div className={styles.bottom_line}>
        <p>Buy 100% original masala and spices online from Madhav Masaala.</p>
        <Link href="/product">
          <a>
            <button>Order Now</button>
          </a>
        </Link>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const res = await axios.get("http://localhost:3000/api/product");
  const product = res.data;
  return {
    props: {
      product: product[0],
    }, // will be passed to the page component as props
  };
}
