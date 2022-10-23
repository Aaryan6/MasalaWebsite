import axios from "axios";
import { buffer } from "micro";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export const config = { api: { bodyParser: false } };

const fullfillOrder = async (session) => {
  return await axios.put(
    `${process.env.NEXT_PUBLIC_HOST_NAME}/api/orderpayment?orderId=${session.metadata.orderId}`,
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

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        payload,
        signature,
        endpointSecret
      );
    } catch (error) {
      return res.status(400).send("webhook error: " + error.message);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      return fullfillOrder(session)
        .then(() => res.status(200))
        .catch((err) => res.status(400).send("webhhok errror: " + err));
    }
  }
}
