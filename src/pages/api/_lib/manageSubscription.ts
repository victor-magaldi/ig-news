import { fauna } from "../../../services/fauna";
import { stripe } from "../../../services/stripe";

import { query as q } from "faunadb"

export async function saveSubscription(subscriptionId: string, customerId: string) {
  console.log("entrou")
  const userRef = await fauna.query(
    q.Select(
      "ref",
      q.Get(
        q.Match(
          q.Index("user_by_stripe_customer_id"), customerId
        )
      )
    )
  )
  console.log("userRef", userRef)

  const subscription = await stripe.subscriptions.retrieve(subscriptionId)
  console.log("userRef", subscription)

  const subscriptionData = {
    id: subscription.id,
    userId: userRef,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id,

  }
  try {
    await fauna.query(
      q.Create(
        q.Collection("subscriptions"),
        { data: subscriptionData }
      )
    )
  } catch (err) {
    console.log("error", err)
  }

  console.log("Criaado?")
}