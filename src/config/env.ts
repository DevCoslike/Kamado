/**
 * API config from .env. Single source of truth for base URL and subscription key.
 * Never import import.meta.env elsewhere for API keys; use this module only.
 */

const rawBaseUrl = import.meta.env.VITE_API_BASE_URL
const rawKey = import.meta.env.VITE_API_SUBSCRIPTION_KEY

export const apiBaseUrl = typeof rawBaseUrl === 'string' && rawBaseUrl.length > 0 ? rawBaseUrl.replace(/\/$/, '') : ''

export const apiSubscriptionKey = typeof rawKey === 'string' ? rawKey.trim() : ''

if (import.meta.env.DEV) {
  if (!apiSubscriptionKey) {
    console.warn(
      '[Kamado] VITE_API_SUBSCRIPTION_KEY is missing or empty in .env. API calls will fail. Copy .env.example to .env and set your key.',
    )
  }
  if (!apiBaseUrl) {
    console.warn(
      '[Kamado] VITE_API_BASE_URL is missing or empty in .env. API calls will fail. Set it in .env (e.g. https://test-kamado.test-api.net).',
    )
  }
}
