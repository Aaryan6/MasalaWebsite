import React, { useState } from "react";
import Image from "next/image";
import styles from "../styles/ProductComponent.module.css";
import Select from "react-select";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import Link from "next/link";

const ProductComponent = () => {
  const [quantity, setQuantity] = useState(1);
  const options = [
    { value: "1", label: "1 kg - ₹ 250" },
    { value: "500", label: "500 gm - ₹ 150" },
  ];

  const handleQuantity = (operation) => {
    if (operation === "plus") {
      setQuantity(quantity + 1);
    } else if (operation === "min" && quantity > 0) {
      setQuantity(quantity - 1);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* image */}
        <div className={styles.image}></div>
        {/* content */}
        <div className={styles.content}>
          <span className={styles.title}>Red chill powder</span>
          <Select
            options={options}
            className={styles.select_box}
            isSearchable={false}
            placeholder="1 kg - ₹ 250"
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
            <button className={styles.button}>Buy Now</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductComponent;
