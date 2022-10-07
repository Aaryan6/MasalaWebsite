import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductComponent from "../components/ProductComponent";

const Product = ({ product }) => {
  return <ProductComponent product={product} />;
};

export default Product;

export async function getServerSideProps() {
  const res = await axios.get("http://localhost:3000/api/product");
  const product = res.data;
  return {
    props: {
      product: product[0],
    }, // will be passed to the page component as props
  };
}
