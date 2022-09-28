import Link from "next/link";
import React from "react";
import styles from "../styles/Navbar.module.css";
import { BsHandbag } from "react-icons/bs";
import { AiOutlineMenu } from "react-icons/ai";
import { MdClose } from "react-icons/md";
const Navbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.nav}>
        <div className={styles.logo}>
          <span>Madhav Masaala</span>
        </div>
        <div className={styles.list}>
          <Link href="/">
            <a className={styles.page} style={{ fontWeight: 500 }}>
              Home
            </a>
          </Link>
          <Link href="/about">
            <a className={styles.page}>About us</a>
          </Link>
          <Link href="/products">
            <a className={styles.page}>Product</a>
          </Link>
          <Link href="/contact">
            <a className={styles.page}>Contact us</a>
          </Link>
          <MdClose className={styles.close_icon} />
        </div>
        <div className={styles.right}>
          <BsHandbag className={styles.bag_icon} />
          <AiOutlineMenu className={styles.menu_icon} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
