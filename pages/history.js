import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "../styles/History.module.css";
import jwt from "jsonwebtoken";
import Image from "next/image";

const History = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    try {
      const res = await axios.get(
        `/api/order?userId=${
          jwt.decode(localStorage.getItem("masaala_user"))._id
        }`
      );
      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h2>Your Orders</h2>
        {orders?.map((item) => {
          return (
            <div className={styles.box} key={item._id}>
              <div className={styles.table_header}>
                <span className={styles.status}>Payment: {item.status}</span>
                <span className={styles.date}>Delivery: On the way</span>
                <span className={styles.date}>
                  Date: {item.createdAt.slice(0, 10)}
                </span>
              </div>
              <table className={styles.table}>
                <tbody>
                  <tr className={styles.row}>
                    <th>Product</th>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                  {item.products.map((order) => {
                    return (
                      <tr className={styles.row} key={order._id}>
                        <td>
                          <Image
                            src={"/images/catg1.png"}
                            width={"100px"}
                            height={"100px"}
                            alt="product"
                          />
                        </td>
                        <td>
                          {order.productName}
                          <br />
                          {" ("}
                          {order.weight == 500 ? "500 gm" : "1 kg"}
                          {")"}
                        </td>
                        <td>{order.quantity} pack.</td>
                        <td>₹ {order.price * order.quantity}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default History;
