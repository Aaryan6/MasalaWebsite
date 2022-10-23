import React, { useState, useEffect } from "react";
import styles from "../styles/ProductComponent.module.css";
import Select from "react-select";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { addOrder } from "../redux/reduxSlice";
import { toast } from "react-toastify";

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const ProductComponent = ({ product }) => {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [option, setOption] = useState({
    value: product?.weight[1],
    label: "1 kg - ₹ 240",
    priceee: 240,
    price_Id: process.env.NEXT_PUBLIC_PRICE_ID_1KG,
  });
  const dispatch = useDispatch();
  const user = useSelector((state) => state.order.user);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
    }
  }, []);

  // react-select option
  const options = [
    {
      value: product?.weight[1],
      label: "1 kg - ₹ 240",
      priceee: 240,
      price_Id: process.env.NEXT_PUBLIC_PRICE_ID_1KG,
    },
    {
      value: product?.weight[0],
      label: "500 gm - ₹ 120",
      priceee: 120,
      price_Id: process.env.NEXT_PUBLIC_PRICE_ID_500GM,
    },
  ];

  // product quantity
  const handleQuantity = (operation) => {
    if (operation === "plus") {
      setQuantity(quantity + 1);
    } else if (operation === "min" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // add order in cart
  const addtoCart = async () => {
    let selected_order = 0,
      i = 0;
    // get user orders
    const alreadyOrders = await axios.get(`/api/order?userId=${user?._id}`);
    if (alreadyOrders.data.length !== 0) {
      for (i in alreadyOrders.data) {
        // filter pending orders and store it
        if (alreadyOrders.data[i].status === "Pending") {
          selected_order = alreadyOrders.data[i]._id;
        }
      }
    }
    // if order is pending then put order in products array
    if (selected_order) {
      try {
        const updateOrder = await axios.put(
          `/api/order?orderId=${selected_order}&isPush=true`,
          {
            productId: product?._id,
            productName: product?.name,
            price: option.priceee,
            quantity: quantity,
            weight: option.value,
            price_Id: option.price_Id,
            totalPrice: quantity * option.priceee,
          }
        );
        if (updateOrder.data.success) {
          router.push("/cart");
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const postOrder = await axios.post("/api/order", {
          userId: user?._id,
          products: [
            {
              productId: product?._id,
              productName: product?.name,
              price: option.priceee,
              quantity: quantity,
              weight: option.value,
              price_Id: option.price_Id,
            },
          ],
          address: "earth",
          totalPrice: quantity * option.priceee,
        });
        // add order to redux
        router.push("/cart");
      } catch (err) {
        console.log(err);
      }
    }
  };

  // direct buy product
  const buyNow = async () => {
    try {
      const postOrder = await axios.post("/api/order", {
        userId: user?._id,
        products: [
          {
            productId: product?._id,
            productName: product?.name,
            price: option.priceee,
            quantity: quantity,
            weight: option.value,
            price_Id: option.price_Id,
          },
        ],
        address: "earth",
        totalPrice: quantity * option.priceee,
      });

      if (postOrder.status == 201) {
        const res = await axios.post("/api/checkout/checkout_session", {
          items: [
            {
              price: postOrder.data.products[0].price_Id,
              quantity: postOrder.data.products[0].quantity,
            },
          ],
        });
        router.push(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
      <div className={styles.wrapper}>
        <div className={styles.image}></div>
        <div className={styles.content}>
          <span className={styles.title}>{product?.name}</span>
          <Select
            options={options}
            className={styles.select_box}
            isSearchable={false}
            placeholder="1 kg - ₹ 240"
            value={option}
            onChange={(option) => setOption(option)}
            instanceId={option.value}
          />
          <label htmlFor="" className={styles.label}>
            Quantity
          </label>
          <div className={styles.quantity_option}>
            <AiOutlineMinusCircle
              className={styles.icon}
              onClick={() => handleQuantity("min")}
            />
            <span>{quantity}</span>
            <AiOutlinePlusCircle
              className={styles.icon}
              onClick={() => handleQuantity("plus")}
            />
          </div>
          <p className={styles.desc}>
            This vibrant and tasty red chilli powder imparts a rich flavour and
            colour to the dishes it is added to. Mainly used in Indian and
            Pakistani curries to create an attractive red colour, it is also
            used in Tandoori and other barbecue marinades.
          </p>
          {user ? (
            <button className={styles.button1} onClick={addtoCart}>
              ADD TO CART
            </button>
          ) : (
            <button className={styles.button1} onClick={reminderLogin}>
              ADD TO CART
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductComponent;
