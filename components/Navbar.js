import Link from "next/link";
import React, { useState } from "react";
import styles from "../styles/Navbar.module.css";
import { BsHandbag } from "react-icons/bs";
import { AiOutlineMenu } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import Modal from "react-modal";
import Login from "./login";
import Register from "./register";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const Navbar = () => {
  const [sideBar, setSideBar] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [login, setLogin] = useState(true);

  function openModal() {
    setIsOpen(true);
  }

  // function afterOpenModal() {
  //   // references are now sync'd and can be accessed.
  //   subtitle.style.color = "#f00";
  // }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div className={styles.container}>
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {login ? (
          <Login setLogin={setLogin} />
        ) : (
          <Register setLogin={setLogin} />
        )}
      </Modal>
      <div className={styles.nav}>
        <div className={styles.logo}>
          <span>Madhav Masaala</span>
        </div>
        <div className={`${styles.list} ${sideBar && styles.change_list}`}>
          <Link href="/">
            <a
              className={styles.page}
              style={{ fontWeight: 500 }}
              onClick={() => setSideBar(false)}
            >
              Home
            </a>
          </Link>
          <Link href="/about">
            <a className={styles.page} onClick={() => setSideBar(false)}>
              About us
            </a>
          </Link>
          <Link href="/product">
            <a className={styles.page} onClick={() => setSideBar(false)}>
              Product
            </a>
          </Link>
          <Link href="/contact">
            <a className={styles.page} onClick={() => setSideBar(false)}>
              Contact us
            </a>
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
          <div className={styles.hover}>
            <CgProfile className={styles.profile_icon} onClick={openModal} />
            <div className={styles.dropdown_menu}>
              <span>Username</span>
              <span>Logout</span>
            </div>
          </div>
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
