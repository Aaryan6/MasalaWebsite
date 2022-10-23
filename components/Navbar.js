import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "../styles/Navbar.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsHandbag } from "react-icons/bs";
import { AiOutlineMenu } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import Modal from "react-modal";
import Login from "./Login";
import Register from "./Register";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrder, clearCart, getUser } from "../redux/reduxSlice";
import jwt from "jsonwebtoken";
import axios from "axios";

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
  const [pageName, setPageName] = useState();
  const router = useRouter();
  const quantity = useSelector((state) => state.order.quantity);
  const user = useSelector((state) => state.order.user);
  const dispatch = useDispatch();

  useEffect(() => {
    setPageName(router.pathname);
  }, [router]);

  useEffect(() => {
    if (jwt.decode(localStorage.getItem("masaala_user"))) {
      dispatch(getUser(jwt.decode(localStorage.getItem("masaala_user"))));
    }
    getOrders();
  }, []);

  const getOrders = async () => {
    let selected_order = 0,
      i = 0;
    try {
      const orders = await axios.get(
        `/api/order?userId=${
          jwt.decode(localStorage.getItem("masaala_user"))._id
        }`
      );
      if (orders.data?.length !== 0) {
        for (i in orders.data) {
          // filter pending orders and store it
          if (orders.data[i].status === "Pending") {
            selected_order = orders.data[i];
          }
        }
        dispatch(clearCart());
        // add orders from mongodb to redux state
        dispatch(fetchOrder(selected_order));
      }
    } catch (error) {
      console.log(error);
    }
  };

  function openModal() {
    if (!user) {
      setIsOpen(true);
    }
  }

  function closeModal() {
    setIsOpen(false);
  }

  function logOut() {
    localStorage.removeItem("masaala_user");
    toast.warning("You are logged out!", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    router.reload();
  }

  function reminderLogin() {
    toast.warning("Please Log in!", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  return (
    <div className={styles.container}>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {login ? (
          <Login setLogin={setLogin} closeModal={closeModal} />
        ) : (
          <Register setLogin={setLogin} closeModal={closeModal} />
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
              style={{ fontWeight: pageName === "/" ? 500 : 300 }}
              onClick={() => setSideBar(false)}
            >
              Home
            </a>
          </Link>
          <Link href="/about">
            <a
              className={styles.page}
              style={{ fontWeight: pageName === "/about" ? 500 : 300 }}
              onClick={() => setSideBar(false)}
            >
              About us
            </a>
          </Link>
          <Link href="/product">
            <a
              className={styles.page}
              style={{ fontWeight: pageName === "/product" ? 500 : 300 }}
              onClick={() => setSideBar(false)}
            >
              Product
            </a>
          </Link>
          <Link href="/contact">
            <a
              className={styles.page}
              style={{ fontWeight: pageName === "/contact" ? 500 : 300 }}
              onClick={() => setSideBar(false)}
            >
              Contact us
            </a>
          </Link>
          <MdClose
            className={styles.close_icon}
            onClick={() => setSideBar(false)}
          />
        </div>
        <div className={styles.right}>
          {user ? (
            <Link href="/cart">
              <div className={styles.icon_div}>
                <BsHandbag className={styles.bag_icon} />
                <div className={styles.bag_icon_quantity}>{quantity}</div>
              </div>
            </Link>
          ) : (
            <span className={styles.icon_div} onClick={reminderLogin}>
              <BsHandbag className={styles.bag_icon} />
            </span>
          )}
          <div className={styles.hover}>
            <CgProfile className={styles.profile_icon} onClick={openModal} />
            {user && (
              <div className={styles.dropdown_menu}>
                <span>{user?.name}</span>
                <span onClick={logOut}>Logout</span>
              </div>
            )}
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
