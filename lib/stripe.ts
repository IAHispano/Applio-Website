import Stripe from "stripe"

declare const global: Global & { stripe: Stripe }

export let stripe: Stripe

if (typeof window === "undefined") {
  if (process.env["NODE_ENV"] === "production") {
    stripe = new Stripe(process.env.STRIPE_API_SECRET as string)
  } else {
    if (!global.stripe) {
      global.stripe = new Stripe(process.env.STRIPE_API_SECRET as string)
    }
    stripe = global.stripe
  }
}
