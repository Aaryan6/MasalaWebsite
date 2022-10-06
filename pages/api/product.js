import dbConnect from "../../dbConnect";
import Product from "../../models/Product";

dbConnect();

export default async function handlerProduct(req, res) {
  switch (req.method) {
    case "GET":
      const data = await Product.find();
      res.status(200).json(data);
      break;
    case "POST":
      try {
        const postProduct = await new Product(req.body);
        await postProduct.save();
        res.status(201).json(postProduct);
      } catch (error) {
        console.log(error);
      }
      break;
    default:
      res.status(200).json({ name: "Wrong method" });
  }
}
