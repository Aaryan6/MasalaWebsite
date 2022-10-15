import jwt from "jsonwebtoken";
import dbConnect from "../../dbConnect";
import User from "../../models/User";
let CryptoJS = require("crypto-js");

dbConnect();

export default async function handlerUserLogin(req, res) {
  switch (req.method) {
    case "GET":
      const data = await User.find();
      res.status(200).json(data);
      break;
    case "POST":
      try {
        // find user
        const isUser = await User.findOne({ email: req.body.email });
        if (isUser) {
          // decrypting password
          let cryptPassword = CryptoJS.AES.decrypt(
            isUser.password,
            process.env.NEXT_PUBLIC_PASSWORD_CRYPTO_KEY
          );
          let plainPassword = cryptPassword.toString(CryptoJS.enc.Utf8);
          if (plainPassword == req.body.password) {
            // send response to client side
            res.status(200).json({
              message: "successfully logged in",
              user_token: jwt.sign(
                {
                  _id: isUser._id,
                  name: isUser.name,
                  email: isUser.email,
                },
                process.env.NEXT_PUBLIC_JWT_TOKEN_KEY
              ),
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
