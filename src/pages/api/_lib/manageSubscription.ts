import { fauna } from "../../../services/fauna";
import { stripe } from "../../../services/stripe";

import { query as q } from "faunadb"

export async function saveSubscription(subscriptionId: string, customerId: string, createAction: boolean = false) {


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

  const subscription = await stripe.subscriptions.retrieve(subscriptionId)

  const subscriptionData = {
    id: subscription.id,
    userId: userRef,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id,

  }


  if (createAction) {
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
  } else {
    try {

      await fauna.query(
        q.Replace(
          q.Select(
            "ref",
            q.Get(
              q.Match(
                q.Index("subscription_by_id"),
                subscriptionId
              )
            )
          ),
          {
            data: subscriptionData,
          }
        )
      )
    } catch (err) {
      console.log("error", err)
    }
  }
}