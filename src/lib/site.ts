/**
 * Central site configuration sourced from environment variables.
 *
 * This is the single source of truth for the app/brand name shown in the
 * UI. Set `APP_NAME` in your `.env` (or Vercel env vars) to override.
 *
 * Usage:
 *   import { APP_NAME } from '../lib/site';
 *   <title>{`${APP_NAME} — Blog`}</title>
 */

/** The app/brand name, sourced from APP_NAME (defaults to "hanasalabs.id"). */
export const APP_NAME: string = import.meta.env.APP_NAME || 'hanasalabs.id';
