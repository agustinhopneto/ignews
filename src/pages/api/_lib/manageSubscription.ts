import { query as q } from "faunadb";
import { fauna } from "../../../services/fauna";
import { stripe } from "../../../services/stripe";
import { FaunaIndexes } from "./contants";

export async function saveSubscription(
  subscriptionId: string,
  customerId: string,
) {
  const userRef = await fauna.query(
    q.Select(
      'ref',
      q.Get(
        q.Match(
          q.Index(FaunaIndexes.USER_BY_STRIPE_CUSTOMER_ID),
          customerId,
        ),
      ),
    ),
  );

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  const subscriptionData = {
    id: subscription.id,
    userId: userRef,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id,
  }

  await fauna.query(
    q.Create(
      q.Collection('subscriptions'),
      { data: subscriptionData }
    ),
  );
};