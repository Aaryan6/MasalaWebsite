import dbConnect from "../../dbConnect";
import Order from "../../models/Order";

dbConnect();

export default async function handlerOrder(req, res) {
  switch (req.method) {
    case "GET":
      const data = await Order.find();
      res.status(200).json(data);
      break;
    case "POST":
      try {
        const postOrder = await new Order(req.body);
        await postOrder.save();
        res.status(201).json(postOrder);
      } catch (error) {
        console.log(error);
      }
      break;
    case "DELETE":
      try {
        await Order.deleteMany();
        res.status(200).json({ message: "ordered deleted" });
      } catch (error) {
        console.log(error);
      }
      break;
    default:
      res.status(200).json({ name: "Wrong method" });
  }
}
