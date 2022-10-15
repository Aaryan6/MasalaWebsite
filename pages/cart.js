import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../styles/Cart.module.css";
import { BsCheckCircle } from "react-icons/bs";
import { useRouter } from "next/router";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { removeOrder } from "../redux/reduxSlice";

const Cart = () => {
  const [discount, setDiscount] = useState(0);
  const router = useRouter();
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.orders);
  const totalPrice = useSelector((state) => state.order.totalPrice);
  const user = useSelector((state) => state.order.user);

  useEffect(() => {
    if (user === null) {
      router.push("/");
    }
  }, [router]);

  // delete order item from mongodb
  const deleteOrder = async (id) => {
    try {
      const del = await axios.delete(
        `${process.env.NEXT_PUBLIC_HOST_NAME}/api/order?orderId=${id}`
      );
      // delete order from redux state
      if (del.data.success) {
        dispatch(removeOrder(id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const buyNow = async () => {
    try {
      const res = await axios.post("/api/checkout_session", {
        items: orders.map((order) => ({
          price: order.products[0].price_Id,
          quantity: order.products[0].quantity,
        })),
      });
      router.push(res.data);
    } catch (error) {
      console.log(error);
    }
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
        {/* {deliveryFunc()} */}
      </div>
      <div className={styles.right_div}>
        <div className={styles.pay_box}>
          <h3 className={styles.title}>Payment</h3>
          <div className={styles.row}>
            <span>Sub Total</span>
            <span>₹ {totalPrice}</span>
          </div>
          <div className={styles.row}>
            <span>Discount</span>
            <span>- ₹ {discount}</span>
          </div>
          <div className={styles.row}>
            <span>Total</span>
            <span>₹ {totalPrice - discount}</span>
          </div>
          <></>
          <button className={styles.button} onClick={buyNow}>
            Checkout Now
          </button>
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

export default Cart;
