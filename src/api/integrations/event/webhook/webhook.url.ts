/** http(s) URL with no whitespace. Anchored so the schema rejects any other scheme or padding. */
export const WEBHOOK_HTTP_URL_PATTERN = '^https?:\\/\\/\\S+$';

/** Value stored for a webhook URL. Callers persist this, not the raw input. */
export function persistedWebhookUrl(url: string | undefined): string | undefined {
  return typeof url === 'string' ? url.trim() : url;
}
