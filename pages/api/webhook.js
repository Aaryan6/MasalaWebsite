import axios from "axios";
import { buffer } from "micro";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export const config = { api: { bodyParser: false } };

const fullfillOrder = async (session) => {
  console.log("fullfill order " + session);

  return await axios.put(
    `http://localhost:3000/api/orderpayment?orderId=635220b36d1326f95cd9c061`,
    {
      status: "Success",
    }
  );
};

export default async function handleWebhook(req, res) {
  if (req.method === "POST") {
    const requestBuffer = await buffer(req);
    const payload = requestBuffer.toString();
    const signature = req.headers["stripe-signature"];
    console.log("req :" + req);

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        payload,
        signature,
        endpointSecret
      );
    } catch (error) {
      console.log("after event error: " + error);
      return res.status(400).send("webhook error: " + error.message);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      return fullfillOrder(session)
        .then(() => console.log(session))
        .catch((err) => res.status(400).send("webhhok errror: " + err));
    }
  }
}
