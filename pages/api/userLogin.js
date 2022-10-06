import dbConnect from "../../dbConnect";
import User from "../../models/User";

dbConnect();

export default async function handlerUserLogin(req, res) {
  switch (req.method) {
    case "GET":
      const data = await User.find();
      res.status(200).json(data);
      break;
    case "POST":
      try {
        const isUser = await User.findOne({ email: req.body.email });
        if (isUser) {
          if (isUser.password == req.body.password) {
            res.status(200).json({
              message: "successfully logged in",
              user: isUser,
              success: true,
            });
          } else {
            res.status(500).json({ message: "Password don't match." });
          }
        } else {
          res.status(404).json({ message: "User doesn't exists." });
        }
      } catch (error) {
        console.log(error);
      }
      break;
    case "DELETE":
      try {
        const isUser = await User.findOne({ email: req.body.email });
        if (isUser) {
          await User.findOneAndDelete({ email: req.body.email });
          res.status(200).json({ message: "User successfully deleted." });
        } else {
          res.status(404).json({ message: "User doesn't exists." });
        }
      } catch (error) {
        console.log(error);
      }
      break;
    default:
      res.status(200).json({ name: "Wrong method" });
  }
}
