// functions/update-stripe-email.ts
import { Handler } from '@netlify/functions';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
});

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { email, customerId } = JSON.parse(event.body || '{}');

    await stripe.customers.update(customerId, {
      email: email,
    });
    console.log('Stripe customer updated:', customerId);

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    console.error('Error updating Stripe customer:', error);
    console.log('Failed to update Stripe customer', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to update Stripe customer' }),
    };
  }
};