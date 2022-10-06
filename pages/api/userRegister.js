import dbConnect from "../../dbConnect";
import User from "../../models/User";

dbConnect();

export default async function handlerUserRegister(req, res) {
  switch (req.method) {
    case "GET":
      const users = await User.find();
      res.status(200).json(users);
      break;
    case "POST":
      try {
        const isUser = await User.findOne({ email: req.body.email });
        if (!isUser) {
          const newUser = await new User(req.body);
          await newUser.save();
          res.status(201).json({
            message: "successfully signup up",
            user: newUser,  
            success: true,
          });
        } else {
          res.status(500).json({ message: "User already exists." });
        }
      } catch (error) {
        console.log(error);
      }
      break;
    default:
      res.status(500).json({ name: "Wrong method" });
  }
}
