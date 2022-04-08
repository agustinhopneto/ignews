export enum FaunaIndexes {
  USER_BY_EMAIL = 'user_by_email',
  USER_BY_STRIPE_CUSTOMER_ID = 'user_by_stripe_customer_id',
  SUBSCRIPTION_BY_ID = 'subscription_by_id',
  SUBSCRIPTION_BY_USER_REF = 'subscription_by_user_ref',
  SUBSCRIPTION_BY_STATUS = 'subscription_by_status',
}

export enum StripeEvents {
  CHECKOUT_SESSION_COMPLETED = 'checkout.session.completed',
  CUSTOMER_SUBSCRIPTIONS_CREATED = 'customer.subscriptions.created',
  CUSTOMER_SUBSCRIPTIONS_UPDATED = 'customer.subscriptions.updated',
  CUSTOMER_SUBSCRIPTIONS_DELETED = 'customer.subscriptions.deleted',
}