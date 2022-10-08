import Image from "next/image";
import React from "react";
import styles from "../styles/About.module.css";
import { BsInstagram, BsFacebook, BsLinkedin } from "react-icons/bs";

const About = () => {
  return (
    <div className={styles.container}>
      <span className={styles.heading}>Madhav Masaala</span>
      <div className={styles.wrapper}>
        <div className={styles.image_con}>
          <Image
            src="/images/office.jpg"
            width={"600px"}
            height={"400px"}
            alt="office image"
          />
          <p>
            We at Madhav Masaala maintain the legacy, purity & quality to serve
            you the best of blended, grounded & assorted masalas. Our masalas
            help you in enhancing the flavour & bringing authenticity to your
            dishes.
          </p>
          <div className={styles.row}>
            <div className={styles.col}>
              <span>Founder</span>
              <span>Pawan Patidar</span>
            </div>
            <div className={styles.col}>
              <span>CEO</span>
              <span>Akhilesh Patidar</span>
            </div>
          </div>
          <div className={styles.another_row}>
            <span className={styles.head_txt}>Location:</span>
            <span>
              36 Nandgaon road, Khargone (451001), Madhya Pradesh, India.
            </span>
          </div>
          <div className={styles.another_row}>
            <span className={styles.head_txt}>Head office:</span>
            <span>GF 130 Radha Vallabh market, Khargone.</span>
          </div>
          <div className={styles.another_row}>
            <span className={styles.head_txt}>Customer care:</span>
            <span>+91 91717 43173</span>
          </div>
          <div className={styles.another_row}>
            <span className={styles.head_txt}>Email:</span>
            <span>ak.patlara@gmail.com</span>
          </div>
        </div>
      </div>
      <div className={styles.icons}>
        <span>Follow on</span>
        <div>
          <a href="https://instagram.com/ak_patlara?igshid=YmMyMTA2M2Y=">
            <BsInstagram />
          </a>

          <a href="https://www.facebook.com/akhilesh.patidar.798278">
            <BsFacebook />
          </a>

          <a href="https://www.linkedin.com/in/akhilesh-patidar-804619229">
            <BsLinkedin />
          </a>
        </div>
      </div>
      <div className={styles.bottom_line}>
        <span>Product trust -</span>
        <span>
          Buy 100% Original Masala and spices online from Madhav Masaala.
        </span>
      </div>
    </div>
  );
};

export default About;
