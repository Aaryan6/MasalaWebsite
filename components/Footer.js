import React from "react";
import styles from "../styles/Footer.module.css";
import { BsInstagram, BsFacebook, BsLinkedin } from "react-icons/bs";
const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <h3>Madhav Masaala</h3>
        <div>
          <span>ak.patlara@gmail.com</span>
          <span>+91 91717 43173</span>
          <span>Khargone, MP, India</span>
        </div>
      </div>
      <div className={styles.middle}>
        <div>
          <span>Home</span>
          <span>Product</span>
          <span>About us</span>
          <span>Contact us</span>
        </div>

        <div>
          <span>
            Website service by{" "}
            <span style={{ color: "#fff", textDecoration: "underline" }}>
              Aaryan Patel
            </span>
            .
          </span>
          <span>@copyright by Madhav Masaala.</span>
        </div>
      </div>
      <div className={styles.right}>
        <h4>Follow on</h4>
        <div>
          <span>
            <BsInstagram />
          </span>
          <span>
            <BsFacebook />
          </span>
          <span>
            <BsLinkedin />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;