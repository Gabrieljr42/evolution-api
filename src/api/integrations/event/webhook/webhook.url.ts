import type { JSONSchema7 } from 'json-schema';

export const WEBHOOK_HTTP_URL_PATTERN = '^[hH][tT][tT][pP][sS]?://[^\\s/?#]+\\S*(?![\\s\\S])';

export const webhookUrlSchema: JSONSchema7 = {
  type: 'string',
  format: 'uri',
  pattern: WEBHOOK_HTTP_URL_PATTERN,
  description: 'The "url" must be a valid http or https URL without whitespace',
};

const webhookUrlPattern = new RegExp(WEBHOOK_HTTP_URL_PATTERN);

export function persistedWebhookUrl(url: string | undefined): string | undefined {
  if (typeof url !== 'string') {
    return url;
  }

  const trimmedUrl = url.trim();
  if (!webhookUrlPattern.test(trimmedUrl) || !URL.canParse(trimmedUrl)) {
    throw {
      status: 400,
      error: 'Bad Request',
      message: ['The "url" must be a valid http or https URL'],
    };
  }

  return trimmedUrl.replace(/^https?:/i, (scheme) => scheme.toLowerCase());
}
