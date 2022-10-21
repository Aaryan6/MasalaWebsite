import { buffer } from "micro";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

const fullfillOrder = async (session) => {
  console.log("fullfill order " + session);
};

export default async (req, res) => {
  if (req.method === "POST") {
    const requestBuffer = await buffer(req);
    const payload = requestBuffer.toString();
    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (error) {
      console.log(error);
      return res.status(400).send("webhook error: " + error.message);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      return fullfillOrder(session)
        .then(() => res.status(200))
        .catch((err) => res.status(400).send("webhhok errror: " + err.message));
    }
  }
};

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
