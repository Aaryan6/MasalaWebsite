import dbConnect from "../../dbConnect";
import Message from "../../models/Message";

export default async function handlerMessage(req, res) {
  await dbConnect();

  switch (req.method) {
    case "GET":
      let data;
      if (req.query.userId) {
        data = await Message.find({ userId: req.query.userId }).sort({
          updatedAt: -1,
        });
        res.status(200).json(data);
      } else {
        data = await Message.find().sort({
          updatedAt: -1,
        });
        res.status(200).json(data);
      }
      break;
    case "POST":
      try {
        const postMess = await new Message(req.body);
        await postMess.save();
        res.status(201).json(postMess);
      } catch (error) {
        console.log(error);
      }
      break;
    case "DELETE":
      try {
        await Message.findOneAndDelete({ _id: req.query.MessageId });
        res.status(200).json({ message: "Message deleted", success: true });
      } catch (error) {
        console.log(error);
      }
      break;
    default:
      res.status(200).json({ name: "Wrong method" });
  }
}
