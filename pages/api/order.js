import dbConnect from "../../dbConnect";
import Order from "../../models/Order";

dbConnect();

export default async function handlerOrder(req, res) {
  switch (req.method) {
    case "GET":
      let data;
      if (req.query.userId) {
        data = await Order.find({ userId: req.query.userId });
        res.status(200).json(data);
      } else {
        data = await Order.find();
        res.status(200).json(data);
      }
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
        await Order.findOneAndDelete({ _id: req.query.orderId });
        res.status(200).json({ message: "order deleted" });
      } catch (error) {
        console.log(error);
      }
      break;
    case "PUT":
      try {
        const prevOrder = await Order.findById(req.params.orderId);
        res.status(200).json({ message: "order deleted" });
      } catch (error) {
        console.log(error);
      }
      break;
    default:
      res.status(200).json({ name: "Wrong method" });
  }
}
