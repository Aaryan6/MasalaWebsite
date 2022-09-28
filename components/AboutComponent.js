import Image from "next/image";
import React from "react";
import styles from "../styles/AboutComponent.module.css";
const AboutComponent = () => {
  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>About us</h3>
      <p className={styles.desc}>
        We at Madhav Masaala maintain the legacy, purity & quality to serve you
        the best of blended, grounded & assorted masalas. Our masalas help you
        in enhancing the flavour & bringing authenticity to your dishes.
      </p>
      <div className={styles.wrapper}>
        {/* section design */}
        <div className={styles.section}>
          <div className={styles.image1}></div>
          {/* content */}
          <div className={styles.content}>
            <h3>Quality</h3>
            <p>
              As all spices are organic, food fungus tends to set into them
              easily. The spice powders are desiccated, dehumdified and dried by
              heavy dehumdifying machinery and then put into air and water tight
              plastic bags after being carefully weighed.
            </p>
          </div>
        </div>
        {/* 2nd */}
        <div className={styles.section}>
          {/* content */}
          <div className={styles.content}>
            <p>
              Our emphasis has always been on “A” Grade quality raw materials
              that are meticulously inspected and procured from the country’s
              best fields. The cleaning, roasting, and blending is carried out
              in a fully automated plant.
            </p>
          </div>
          <div className={styles.image2}></div>
        </div>
        {/* 3rd */}
        <div className={styles.section}>
          <div className={styles.image3}></div>
          {/* content */}
          <div className={styles.content}>
            <p>
              We have our very own Quality control laboratory for the scrutiny
              of quality in all our products. We ensure that the quality of raw
              materials, proportions, blends always meet the authentiic
              standards set by the company before heading out for processing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutComponent;
