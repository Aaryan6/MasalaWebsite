import dbConnect from "../../dbConnect";
import User from "../../models/User";
let CryptoJS = require("crypto-js");

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
          var hashPassword = CryptoJS.AES.encrypt(
            req.body.password,
            "GUPTCODE123"
          ).toString();
          const newUser = await new User({
            name: req.body.name,
            email: req.body.email,
            number: req.body.number,
            password: hashPassword,
          });
          await newUser.save();
          res.status(201).json({
            message: "successfully signup up",
            user: {
              _id: newUser._id,
              name: newUser.name,
              email: newUser.email,
            },
            success: true,
          });
        } else {
          res.status(500).json({ message: "User already exists." });
        }
      } catch (error) {
        console.log(error);
      }
      break;
    case "DELETE":
      try {
        await User.deleteMany();
        res.status(200).json({ message: "all users deleted" });
      } catch (err) {
        res.status(500).json({ message: err });
      }
      break;
    default:
      res.status(500).json({ name: "Wrong method" });
  }
}
