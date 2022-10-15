import React, { useState, useEffect } from "react";
import styles from "../styles/ProductComponent.module.css";
import Select from "react-select";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { addOrder } from "../redux/reduxSlice";

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const ProductComponent = ({ product }) => {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [value, setValue] = useState({
    value: product?.weight[1],
    label: "1 kg - ₹ 240",
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
    { value: product?.weight[1], label: "1 kg - ₹ 240" },
    { value: product?.weight[0], label: "500 gm - ₹ 120" },
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
    try {
      const res = await axios.post("/api/order", {
        userId: user?._id,
        products: [
          {
            productId: product?._id,
            productName: product?.name,
            price: value.value == 1000 ? 2 * product?.price : product?.price,
            quantity: quantity,
            weight: value.value,
            price_Id:
              value.value == 500
                ? process.env.NEXT_PUBLIC_PRICE_ID_500GM
                : process.env.NEXT_PUBLIC_PRICE_ID_1KG,
          },
        ],
        address: "earth",
        totalPrice:
          value.value == 500
            ? quantity * product?.price
            : quantity * 2 * product?.price,
      });
      console.log(res.data);
      // add order to redux
      dispatch(addOrder(res.data));
      router.push("/cart");
    } catch (err) {
      console.log(err);
    }
  };

  // direct buy product
  const buyNow = async () => {
    try {
      const res = await axios.post("/api/checkout_session", {
        items: [
          {
            price:
              value.value == 500
                ? process.env.NEXT_PUBLIC_PRICE_ID_500GM
                : process.env.NEXT_PUBLIC_PRICE_ID_1KG,
            quantity: quantity,
          },
        ],
      });
      router.push(res.data);
    } catch (error) {
      console.log(error);
    }
  };
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
            value={value}
            onChange={(option) => setValue(option)}
            instanceId={value.value}
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
          <button className={styles.button1} onClick={buyNow}>
            BUY NOW
          </button>
          <button className={styles.button2} onClick={addtoCart}>
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductComponent;
