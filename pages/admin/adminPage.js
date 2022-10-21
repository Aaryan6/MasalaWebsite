import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "../../styles/AdminPage.module.css";

const AdminPage = () => {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getOrders();
    getUsers();
  }, []);

  // get orders
  const getOrders = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_HOST_NAME}/api/order`
      );
      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // get users
  const getUsers = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_HOST_NAME}/api/userRegister`
      );
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.orders}>
          <h2>Orders</h2>
          <table>
            <tbody>
              <tr className={styles.product_row}>
                <th>Product</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th></th>
              </tr>
              {orders.map((item) => {
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
        <div className={styles.users_info}>
          <div className={styles.user_list}>
            <h2>Users</h2>
            <table>
              <tbody>
                <tr className={styles.user_row}>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile No.</th>
                  <th>Address</th>
                  <th>Orders</th>
                </tr>
                {users.map((user) => {
                  return (
                    <tr className={styles.user_row} key={user._id}>
                      <td>{user._id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.number}</td>
                      <td>address</td>
                      <td>Orders</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className={styles.messages}>Messages</div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
