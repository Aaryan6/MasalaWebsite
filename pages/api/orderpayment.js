import dbConnect from "../../dbConnect";
import Order from "../../models/Order";

export default async function handlerOrderPayment(req, res) {
  await dbConnect();
  switch (req.method) {
    case "PUT":
      try {
        const findOrder = await Order.findOne({ _id: req.query.orderId });
        // if order exist then following this process
        if (findOrder) {
          // user is want to add order to cart
          const prevOrder = await Order.findOneAndUpdate(
            { _id: req.query.orderId },
            {
              $set: {
                status: req.body.status,
              },
            },
            { new: true }
          );
          res.status(200).json({
            message: "order updated",
            data: prevOrder,
            success: true,
          });
        } else {
          res.status(404).json({ message: "order not found" });
        }
      } catch (error) {
        console.log(error);
      }
      break;
    default:
      res.status(200).json({ name: "Wrong method" });
  }
}
