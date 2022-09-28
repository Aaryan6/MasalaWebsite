import React from "react";
import Image from "next/image";
import styles from "../styles/ProductComponent.module.css";

const ProductComponent = () => {
  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>Product</h3>
      <div className={styles.wrapper}>
        {/* image */}
        <div className={styles.image}>
        </div>
        {/* content */}
        <div className={styles.content}>
          <span className={styles.title}>Red chill powder</span>
          <div className={styles.box}>
            <span className={styles.left}>Price -</span>
            <span className={styles.right}>₹ 120</span>
          </div>
          <div className={styles.box}>
            <span className={styles.left}>Quantity -</span>
            <span className={styles.right}>500 gm</span>
          </div>
          <p className={styles.desc}>
            This vibrant and tasty red chilli powder imparts a rich flavour and
            colour to the dishes it is added in. Mainly used in indian and
            pakistani curries to create the attractive red colour, it is also
            used in Tandoori and other barbecue marinades.
          </p>
          <button className={styles.button}>Check More</button>
        </div>
      </div>
    </div>
  );
};

export default ProductComponent;
