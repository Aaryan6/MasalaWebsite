import React from "react";
import styles from "../styles/About.module.css";

const About = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Madhav Masaala</h1>
      <div className={styles.wrapper}>
        <div className={styles.left}></div>
        <div className={styles.right}></div>
      </div>
    </div>
  );
};

export default About;
