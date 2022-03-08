export enum FaunaIndexes {
  USER_BY_EMAIL = 'user_by_email',
  USER_BY_STRIPE_CUSTOMER_ID = 'user_by_stripe_customer_id',
}

export enum StripeEvents {
  CHECKOUT_SESSION_COMPLETED = 'checkout.session.completed',
  CUSTOMER_SUBSCRIPTIONS_CREATED = 'customer.subscriptions.created',
  CUSTOMER_SUBSCRIPTIONS_UPDATED = 'customer.subscriptions.updated',
  CUSTOMER_SUBSCRIPTIONS_DELETED = 'customer.subscriptions.deleted',
}