import { Resend } from 'resend';

/**
 * Lazily create the Resend client so build-time doesn't fail if env is missing
 * (only the serverless function call needs the key).
 */
let client: Resend | null = null;

export function getResend(): Resend {
  if (client) return client;
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not set. Add it to your .env / Vercel env vars.');
  }
  console.log('Creating Resend client with API key:', apiKey);
  client = new Resend(apiKey);
  return client;
}

/**
 * Sender address. Use the verified domain once hanasalabs.id is verified in
 * Resend; otherwise fall back to Resend's test sender.
 */
export const FROM_ADDRESS =
  process.env.FROM_ADDRESS ?? 'onboarding@resend.dev';

/** Destination address for contact form messages. */
export const CONTACT_TO_EMAIL =
  process.env.CONTACT_TO_EMAIL ?? 'hello@hanasalabs.id';
