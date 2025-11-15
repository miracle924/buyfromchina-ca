import crypto from 'node:crypto';

const CONVERSIONS_TOKEN = process.env.REDDIT_CONVERSIONS_TOKEN;
const REDDIT_PIXEL_ID = process.env.NEXT_PUBLIC_REDDIT_PIXEL_ID ?? 'a2_i02wmpl91j9v';

const sha256LowerSync = (value: string) =>
  crypto.createHash('sha256').update(value.trim().toLowerCase()).digest('hex');

type ConversionOptions = {
  email?: string | null;
  trackingType?: string;
  customEventName?: string;
};

export async function sendRedditConversionEvent({
  email,
  trackingType = 'Lead',
  customEventName
}: ConversionOptions) {
  if (!CONVERSIONS_TOKEN) {
    return;
  }

  const type =
    trackingType === 'CUSTOM' && customEventName
      ? { tracking_type: 'CUSTOM', custom_event_name: customEventName }
      : { tracking_type: trackingType };

  const eventPayload = {
    event_at: Date.now(),
    action_source: 'website',
    type: {
      ...type,
      user: email ? { email: sha256LowerSync(email) } : undefined
    }
  };

  try {
    const response = await fetch(
      `https://ads-api.reddit.com/api/v3/pixels/${REDDIT_PIXEL_ID}/conversion_events`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${CONVERSIONS_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          data: {
            events: [
              {
                event_at: eventPayload.event_at,
                action_source: eventPayload.action_source,
                type: eventPayload.type
              }
            ]
          }
        })
      }
    );

    if (!response.ok) {
      const text = await response.text();
      console.error('Reddit conversion event failed', response.status, text);
    }
  } catch (error) {
    console.error('Reddit conversion event error', error);
  }
}
