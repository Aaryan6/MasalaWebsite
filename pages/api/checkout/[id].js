import Stripe from "stripe";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function (req, res) {
  const { id } = req.query;
  console.log("sid" + id);

  const session = await stripe.checkout.sessions.retrieve(id, {
    expand: ["payment_intent"],
  });
  res.status(200).json({ session });
}
