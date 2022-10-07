import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "../styles/Cart.module.css";
import { BsCheckCircle } from "react-icons/bs";
import axios from "axios";
import { useRouter } from "next/router";
const Cart = () => {
  const [userOrders, setUserOrders] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [discount, setDiscount] = useState(0);
  const router = useRouter();
  useEffect(() => {
    getOrders();

    if (!JSON.parse(localStorage.getItem("masaala_user"))) {
      router.push("/");
    }
  }, []);
  const getOrders = async () => {
    const res = await axios.get(
      `http://localhost:3000/api/order?userId=${
        JSON.parse(localStorage.getItem("masaala_user"))?._id
      }`
    );
    setUserOrders(res.data);
    let i;
    let price = 0;
    for (i in res.data) {
      price = price + res.data[i]?.totalPrice;
    }
    setTotalAmount(price);
  };

  const deleteOrder = async (id) => {
    await axios.delete(`http://localhost:3000/api/order?orderId=${id}`);
    getOrders();
  };
  return (
    <div className={styles.container}>
      <div className={styles.left_div}>
        <div className={styles.selected_products}>
          <h3>Selected Product</h3>
          <table>
            <tbody>
              <tr className={styles.product_row}>
                <th>Product</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th></th>
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
                    <td>
                      {item.products[0].productName}
                      <br />
                      {" ("}
                      {item.products[0].weight == 500 ? "500 gm" : "1 kg"}
                      {")"}
                    </td>
                    <td>{item.products[0].quantity} pack.</td>
                    <td>₹ {item.totalPrice}</td>
                    <td>
                      <button
                        onClick={() => deleteOrder(item._id)}
                        className={styles.cancelButton}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {/* {deliveryFunc()} */}
      </div>
      <div className={styles.right_div}>
        <div className={styles.pay_box}>
          <h3 className={styles.title}>Payment</h3>
          <div className={styles.row}>
            <span>Sub Total</span>
            <span>₹ {totalAmount}</span>
          </div>
          <div className={styles.row}>
            <span>Discount</span>
            <span>- ₹ {discount}</span>
          </div>
          <div className={styles.row}>
            <span>Total</span>
            <span>₹ {totalAmount - discount}</span>
          </div>
          <></>
          <button className={styles.button}>Checkout Now</button>
        </div>
      </div>
    </div>
  );
};

function deliveryFunc() {
  return (
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
  );
}

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
