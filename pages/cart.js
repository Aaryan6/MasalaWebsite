import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "../styles/Cart.module.css";
import { BsCheckCircle } from "react-icons/bs";
import axios from "axios";

const Cart = ({ orders }) => {
  const [user, setUser] = useState();
  const [userOrders, setUserOrders] = useState([]);
  useEffect(() => {
    // do {
    getOrders();
    // } while (userOrders.length < 1);
    getUser();
    console.log(userOrders);
  }, []);
  const getUser = async () => {
    await setUser(JSON.parse(localStorage.getItem("masaala_user")));
  };
  const getOrders = async () => {
    await setUserOrders(orders.filter((order) => order.userId === user?._id));
  };
  return (
    <div className={styles.container}>
      <div className={styles.left_div}>
        <div className={styles.selected_products}>
          <h3>Selected Product</h3>
          <table>
            <tbody>
              <tr className={styles.product_row}>
                <th>Image</th>
                <th>Name</th>
                <th>Weight</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
              {userOrders.map((item) => {
                return (
                  <tr className={styles.product_row} key={item._id}>
                    <td>
                      <Image
                        src={"/images/catg1.png"}
                        width={"100px"}
                        height={"100px"}
                        alt="product"
                      />
                    </td>
                    <td>{item.products[0].productName}</td>
                    <td>{item.products[0].weight} gm</td>
                    <td>{item.products[0].quantity} packs.</td>
                    <td>₹ {item.totalPrice}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className={styles.delivery_info}>
          <h3>Your Delivery</h3>
          <div className={styles.illu_row}>
            <div className={styles.illu_box}>
              <Image
                src={"/images/ordered.svg"}
                width={"100px"}
                height={"100px"}
                alt="illustration1"
              />
              <span>Ordered successfully!</span>
              <div className={styles.checked_box}>
                <BsCheckCircle />
              </div>
            </div>
            <div className={`${styles.illu_box} ${true && styles.blink_box}`}>
              <Image
                src={"/images/ontheway.svg"}
                width={"100px"}
                height={"100px"}
                alt="illustration2"
              />
              <span>On the way!</span>
            </div>
            <div className={styles.illu_box}>
              <Image
                src={"/images/reached_order.svg"}
                width={"100px"}
                height={"100px"}
                alt="illustration3"
              />
              <span>Delivered Successfully!</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.right_div}>
        <div className={styles.pay_box}>
          <h3 className={styles.title}>Payment</h3>
          <div className={styles.row}>
            <span>Weight</span>
            <span>1 kg</span>
          </div>
          <div className={styles.row}>
            <span>Quantity</span>
            <span>2</span>
          </div>
          <div className={styles.row}>
            <span>Price</span>
            <span>₹ 124</span>
          </div>
          <div className={styles.row}>
            <span>Total amount</span>
            <span>2</span>
          </div>
          <button className={styles.button}>Checkout Now</button>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const res = await axios.get("http://localhost:3000/api/order");
  const orders = res.data;
  return {
    props: {
      orders,
    }, // will be passed to the page component as props
  };
}

export default Cart;
