import React, { useState, useEffect } from "react";
import styles from "../styles/ProductComponent.module.css";
import Select from "react-select";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import Link from "next/link";
import axios from "axios";

const ProductComponent = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [user, setUser] = useState();
  const [value, setValue] = useState({
    value: product?.weight[1],
    label: "1 kg - ₹ 240",
  });

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("masaala_user")));
  }, []);

  const options = [
    { value: product?.weight[1], label: "1 kg - ₹ 240" },
    { value: product?.weight[0], label: "500 gm - ₹ 120" },
  ];

  const handleQuantity = (operation) => {
    if (operation === "plus") {
      setQuantity(quantity + 1);
    } else if (operation === "min" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const bookOrder = async () => {
    const postOrder = await axios.post("/api/order", {
      userId: user._id,
      products: [
        {
          productId: product._id,
          productName: product?.name,
          price: value.value == 1000 ? 2 * product?.price : product?.price,
          quantity: quantity,
          weight: value.value,
        },
      ],
      address: "earth",
      totalPrice:
        value.value == 500
          ? quantity * product?.price
          : quantity * 2 * product?.price,
    });
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
            colour to the dishes it is added in. Mainly used in indian and
            pakistani curries to create the attractive red colour, it is also
            used in Tandoori and other barbecue marinades.
          </p>
          <Link href="/cart">
            <button className={styles.button} onClick={bookOrder}>
              Buy Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductComponent;
