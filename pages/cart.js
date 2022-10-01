import Image from "next/image";
import React from "react";
import styles from "../styles/Cart.module.css";
import { BsCheckCircle } from "react-icons/bs";

const Cart = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left_div}>
        <div className={styles.selected_products}>
          <h3>Selected Product</h3>
          <table>
            <tr className={styles.product_row}>
              <th>Image</th>
              <th>Name</th>
              <th>Weight</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
            <tr className={styles.product_row}>
              <td>
                <Image
                  src={"/images/catg1.png"}
                  width={"100px"}
                  height={"100px"}
                />
              </td>
              <td>Red chilli masaala</td>
              <td>1 kg</td>
              <td>2 packs.</td>
              <td>₹ 124</td>
            </tr>
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
              />
              <span>On the way!</span>
            </div>
            <div className={styles.illu_box}>
              <Image
                src={"/images/reached_order.svg"}
                width={"100px"}
                height={"100px"}
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

export default Cart;
