import Stripe from "stripe";
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";
export const stripeWebhooks = async (request, response) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    const sig = request.headers['stipe-signature']
    let event;
    try {
        event = stripe.webhooks.constructEvent(request.body, sig, process.env.STRIPE_WEBHOOK_SECRET)
    } catch (e) {
        return response.status(400).send(`webhook error ${e.message}`)
    }
    try {
        switch (event.type) {
            case "payment_intent.succeeded": {
                const paymentIntent = event.data.object
                const sessionList = await stripe.checkout.sessions.list({
                    payment_intent: paymentIntent.id
                })
                const session = sessionList.data[0]
                const { transactionId, appId } = session.metadata
                if (appId === "pkchatgpt") {
                    const transaction = await Transaction.findOne({ _id: transactionId, isPaid: false })
                    await User.updateOne({ _id: transaction.userId }, { $inc: { credits: transaction.credits } })
                    transaction.isPaid = true
                    await transaction.save()
                }
                else {
                    return response.json({ recieved: true, message: "Ignored Event: Invailid App" })
                }
                break;
            }
            default:
                console.log("unhandled event type", event.type);
                break;

        }
        response.json({ recieved: true })
    } catch (e) {
        console.error("webhook error",e)
        response.status(500).send("Internal server error")
    }
}