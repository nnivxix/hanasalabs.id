import type { APIRoute } from 'astro';
import { getResend, FROM_ADDRESS, CONTACT_TO_EMAIL } from '../../lib/resend';
import { APP_NAME } from '../../lib/site';

// This endpoint must run as a serverless function (not prerendered) so it
// can read the request body and emit emails at runtime.
export const prerender = false;

export const POST: APIRoute = async (context) => {
  const { request } = context;
  // Only accept JSON.
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, error: 'Invalid JSON body.' }, 400);
  }

  const record = (payload ?? {}) as Record<string, unknown>;

  // Honeypot: if filled, silently succeed (treat as bot).
  if (typeof record.company === 'string' && record.company.trim() !== '') {
    return json({ ok: true });
  }

  const name = str(record.name);
  const email = str(record.email);
  const message = str(record.message);

  // Server-side validation.
  const errors: string[] = [];
  if (name.length < 2) errors.push('Name is required (min 2 characters).');
  if (!isEmail(email)) errors.push('A valid email is required.');
  if (message.length < 10) errors.push('Message must be at least 10 characters.');
  if (message.length > 5000) errors.push('Message must be under 5000 characters.');

  if (errors.length > 0) {
    return json({ ok: false, errors }, 422);
  }

  // Naive rate limit (per IP): 5 messages / 10 min. In-memory only — fine for
  // a single Vercel serverless instance. Upgrade to Vercel KV if needed.
  // clientAddress may be unavailable in dev — fall back to 'unknown'.
  let ip = 'unknown';
  try {
    ip = context.clientAddress || 'unknown';
  } catch {
    // Astro throws when clientAddress is accessed in static/dev mode.
    ip = 'unknown';
  }
  if (rateLimited(ip)) {
    return json({ ok: false, error: 'Too many messages. Please try again later.' }, 429);
  }

  try {
    const resend = getResend();
    const { error } = await resend.emails.send({
      from: `${APP_NAME} Contact <${FROM_ADDRESS}>`,
      to: CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `New message from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `IP: ${ip}`,
        '',
        '---',
        '',
        message,
      ].join('\n'),
      // A minimal HTML version.
      html: [
        `<p><strong>Name:</strong> ${escape(name)}</p>`,
        `<p><strong>Email:</strong> ${escape(email)}</p>`,
        `<p><strong>IP:</strong> ${escape(ip)}</p>`,
        '<hr />',
        `<p>${escape(message).replace(/\n/g, '<br />')}</p>`,
      ].join('\n'),
    });

    if (error) {
      console.error('Resend error:', error);
      return json({ ok: false, error: 'Email delivery failed.' }, 502);
    }

    return json({ ok: true });
  } catch (err) {
    console.error('Contact endpoint error:', err);
    return json({ ok: false, error: 'Something went wrong. Please try again later.' }, 500);
  }
};

// Allow OPTIONS for preflight if the form is ever posted cross-origin.
export const OPTIONS: APIRoute = () =>
  new Response(null, {
    status: 204,
    headers: { Allow: 'POST, OPTIONS' },
  });

/* --------------------------------- helpers -------------------------------- */

function str(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function isEmail(value: string): boolean {
  // Simple, pragmatic email check.
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function escape(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/* ------------------------------ rate limiter ------------------------------ */
// Simple sliding-window counter, per IP. Memory is per serverless instance
// and resets on cold start — good enough for low traffic.
const hits = new Map<string, { count: number; first: number }>();
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_HITS = 5;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now - entry.first > WINDOW_MS) {
    hits.set(ip, { count: 1, first: now });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_HITS;
}
