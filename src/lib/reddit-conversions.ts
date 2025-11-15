import crypto from 'node:crypto';

const CONVERSIONS_TOKEN = process.env.REDDIT_CONVERSIONS_TOKEN;
const REDDIT_PIXEL_ID = process.env.NEXT_PUBLIC_REDDIT_PIXEL_ID ?? 'a2_i02wmpl91j9v';

const sha256LowerSync = (value: string) =>
  crypto.createHash('sha256').update(value.trim().toLowerCase()).digest('hex');

const buildUserMatchKeys = (user?: ConversionUserInfo) => {
  if (!user) return undefined;
  const payload: Record<string, unknown> = {};
  if (user.ipAddress) payload.ip_address = user.ipAddress;
  if (user.userAgent) payload.user_agent = user.userAgent;
  if (user.screenWidth || user.screenHeight) {
    payload.screen_dimensions = {
      width: user.screenWidth ?? undefined,
      height: user.screenHeight ?? undefined
    };
  }
  if (user.email) payload.email = sha256LowerSync(user.email);
  if (user.phoneNumber) payload.phone_number = sha256LowerSync(user.phoneNumber);
  if (user.externalId) payload.external_id = sha256LowerSync(user.externalId);
  if (user.idfa) payload.idfa = user.idfa;
  if (user.aaid) payload.aaid = user.aaid;
  if (user.uuid) payload.uuid = user.uuid;

  return Object.keys(payload).length > 0 ? payload : undefined;
};

const buildMetadata = (metadata?: ConversionMetadata) => {
  if (!metadata) return undefined;
  const payload: Record<string, unknown> = {};
  if (typeof metadata.itemCount === 'number') payload.item_count = metadata.itemCount;
  if (metadata.currency) payload.currency = metadata.currency;
  if (typeof metadata.value === 'number') payload.value = metadata.value;
  if (metadata.conversionId) payload.conversion_id = metadata.conversionId;
  if (metadata.products?.length) {
    payload.products = metadata.products.map((product) => ({
      id: product.id ?? undefined,
      name: product.name ?? undefined,
      category: product.category ?? undefined
    }));
  }

  return Object.keys(payload).length > 0 ? payload : undefined;
};

type ConversionUserInfo = {
  ipAddress?: string | null;
  userAgent?: string | null;
  screenWidth?: number | null;
  screenHeight?: number | null;
  email?: string | null;
  phoneNumber?: string | null;
  externalId?: string | null;
  idfa?: string | null;
  aaid?: string | null;
  uuid?: string | null;
};

type ConversionMetadata = {
  itemCount?: number | null;
  currency?: string | null;
  value?: number | null;
  conversionId?: string | null;
  products?: Array<{ id?: string | null; name?: string | null; category?: string | null }>;
};

type ConversionOptions = {
  trackingType?: string;
  customEventName?: string;
  clickId?: string | null;
  user?: ConversionUserInfo;
  metadata?: ConversionMetadata;
  testId?: string | null;
};

export async function sendRedditConversionEvent({
  trackingType = 'Lead',
  customEventName,
  clickId,
  user,
  metadata,
  testId
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
    type,
    click_id: clickId ?? undefined,
    user: buildUserMatchKeys(user),
    metadata: buildMetadata(metadata),
    test_id: testId ?? undefined
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
                click_id: eventPayload.click_id,
                type: eventPayload.type,
                user: eventPayload.user,
                metadata: eventPayload.metadata,
                test_id: eventPayload.test_id
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
