import dbConnect from "../../dbConnect";
import Order from "../../models/Order";

export default async function handlerOrder(req, res) {
  await dbConnect();
  switch (req.method) {
    case "GET":
      let data;
      if (req.query.userId) {
        data = await Order.find({ userId: req.query.userId }).sort({
          updatedAt: -1,
        });
        res.status(200).json(data);
      } else if (req.query.orderId) {
        data = await Order.find({ _id: req.query.orderId }).sort({
          updatedAt: -1,
        });
        res.status(200).json(data);
      } else {
        data = await Order.find().sort({
          updatedAt: -1,
        });
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
      if (req.query.orderId) {
        const findOrder = await Order.findOne({ _id: req.query.orderId });
        if (findOrder) {
          try {
            const delteOrder = await Order.findOneAndUpdate(
              { _id: req.query.orderId },
              { $pull: { products: { _id: req.query.single_order_id } } },
              { new: true }
            );
            res.status(200).json({
              message: "single order deleted",
              success: true,
              data: delteOrder,
            });
          } catch (error) {
            console.log(error);
          }
        } else {
          res.status(404), json({ message: "order not found" });
        }
      } else {
        await Order.deleteMany();
        res.status(200).json({ message: "all order deleted", success: true });
      }
      break;
    case "PUT":
      try {
        console.log(req.query);
        const findOrder = await Order.findOne({ _id: req.query.orderId });
        // if order exist then following this process
        if (findOrder) {
          // user is want to add order to cart
          if (req.query.isPush) {
            const prevOrder = await Order.findOneAndUpdate(
              { _id: req.query.orderId },
              {
                $push: {
                  products: {
                    productId: req.body.productId,
                    productName: req.body.productName,
                    price: req.body.price,
                    quantity: req.body.quantity,
                    weight: req.body.weight,
                    price_Id: req.body.price_Id,
                  },
                },
                $set: {
                  totalPrice: findOrder.totalPrice + req.body.totalPrice,
                },
              },
              { new: true }
            );
            res.status(200).json({
              message: "order updated",
              data: prevOrder,
              success: true,
            });

            // user is want to remove order from cart
          } else if (req.query.isDelete) {
            try {
              const delteOrder = await Order.findOneAndUpdate(
                { _id: req.query.orderId },
                {
                  $pull: { products: { _id: req.query.single_order_id } },
                  $set: {
                    totalPrice: findOrder.totalPrice - req.body.removePrice,
                  },
                },
                { new: true }
              );
              res.status(200).json({
                message: "single order deleted",
                success: true,
                data: delteOrder,
              });
            } catch (error) {
              console.log(error);
            }
          }
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
