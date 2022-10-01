import Link from "next/link";
import React, { useState } from "react";
import styles from "../styles/Navbar.module.css";
import { BsHandbag } from "react-icons/bs";
import { AiOutlineMenu } from "react-icons/ai";
import { MdClose } from "react-icons/md";
const Navbar = () => {
  const [sideBar, setSideBar] = useState(false);
  return (
    <div className={styles.container}>
      <div className={styles.nav}>
        <div className={styles.logo}>
          <span>Madhav Masaala</span>
        </div>
        <div className={`${styles.list} ${sideBar && styles.change_list}`}>
          <Link href="/">
            <a className={styles.page} style={{ fontWeight: 500 }}>
              Home
            </a>
          </Link>
          <Link href="/about">
            <a className={styles.page}>About us</a>
          </Link>
          <Link href="/contact">
            <a className={styles.page}>Contact us</a>
          </Link>
          <MdClose
            className={styles.close_icon}
            onClick={() => setSideBar(false)}
          />
        </div>
        <div className={styles.right}>
          <Link href="/cart">
            <BsHandbag className={styles.bag_icon} />
          </Link>
          <AiOutlineMenu
            className={styles.menu_icon}
            onClick={() => setSideBar(true)}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
