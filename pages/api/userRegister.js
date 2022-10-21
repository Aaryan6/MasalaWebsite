import dbConnect from "../../dbConnect";
import User from "../../models/User";
import jwt from "jsonwebtoken";
let CryptoJS = require("crypto-js");

export default async function handlerUserRegister(req, res) {
  await dbConnect();

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
            process.env.NEXT_PUBLIC_PASSWORD_CRYPTO_KEY
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
            user_token: jwt.sign(
              {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
              },
              process.env.NEXT_PUBLIC_JWT_TOKEN_KEY
            ),
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
