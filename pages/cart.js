import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../styles/Cart.module.css";
import { BsCheckCircle } from "react-icons/bs";
import { useRouter } from "next/router";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, fetchOrder, removeOrder } from "../redux/reduxSlice";

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
    getOrders();
  }, [router]);

  const getOrders = async () => {
    let selected_order = 0,
      i = 0;
    try {
      const orders = await axios.get(`/api/order?userId=${user?._id}`);
      if (orders.data.length !== 0) {
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

  // delete order item from mongodb
  const deleteOrder = async (order_id, single_order_id, price) => {
    try {
      const del = await axios.put(
        `/api/order?orderId=${order_id}&single_order_id=${single_order_id}&isDelete=true`,
        {
          removePrice: price,
        }
      );
      // delete order from redux state
      if (del.data.success) {
        dispatch(removeOrder(single_order_id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const buyNow = async () => {
    try {
      const res = await axios.post("/api/checkout/checkout_session", {
        items: orders,
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
              {orders?.products?.map((item) => {
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
                      {item.productName}
                      <br />
                      {" ("}
                      {item.weight == 500 ? "500 gm" : "1 kg"}
                      {")"}
                    </td>
                    <td>{item.quantity} pack.</td>
                    <td>₹ {item.price * item.quantity}</td>
                    <td>
                      <button
                        onClick={() =>
                          deleteOrder(
                            orders._id,
                            item._id,
                            item.price * item.quantity
                          )
                        }
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
