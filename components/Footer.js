import React from "react";
import styles from "../styles/Footer.module.css";
import { BsInstagram, BsFacebook, BsLinkedin } from "react-icons/bs";
import Link from "next/link";
const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.left}>
          <h3>Madhav Masaala</h3>
          <div>
            <span>ak.patlara@gmail.com</span>
            <span>+91 91717 43173</span>
            <span>Khargone, MP, India</span>
          </div>
        </div>
        <div className={styles.middle}>
          <span>Home</span>
          <span>Product</span>
          <span>About us</span>
          <span>Contact us</span>
        </div>
        <div className={styles.right}>
          <h4>Follow on</h4>
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
      </div>
      <div className={styles.bottom}>
        <span>
          Website service by{" "}
          <a href="https://codewithaaryan.netlify.com">
            <span style={{ color: "#fff", textDecoration: "underline" }}>
              Aaryan Patel
            </span>
          </a>
          .
        </span>
      </div>
    </div>
  );
};

export default Footer;
