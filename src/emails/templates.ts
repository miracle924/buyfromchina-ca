import { Quote, Order } from '@prisma/client';
import { formatCurrency, formatDate } from '@/lib/format';
import { siteUrl } from '@/env';
import { splitProductUrls } from '@/lib/product-urls';

type QuoteLike = {
  id: Quote['id'];
  email: Quote['email'];
  productURL: string | null;
  recipientName: Quote['recipientName'];
  addressLine1: Quote['addressLine1'];
  addressLine2: Quote['addressLine2'];
  city: Quote['city'];
  province: Quote['province'];
  postalCode: Quote['postalCode'];
  notes: Quote['notes'];
  size: Quote['size'];
  itemCostCad: Quote['itemCostCad'];
  serviceFeeCad: Quote['serviceFeeCad'];
  shippingCad: Quote['shippingCad'];
  taxCad: Quote['taxCad'];
  totalCad: Quote['totalCad'];
  pricingVersion: Quote['pricingVersion'];
  attachments: Quote['attachments'];
  referencePrice: Quote['referencePrice'];
};

const renderQuoteTable = (quote: QuoteLike) => `
  <table role="presentation" style="width:100%;border-collapse:collapse;margin-top:16px">
    <tbody>
      <tr>
        <td style="padding:8px 0;font-weight:600;color:#111827">Item cost:</td>
        <td style="padding:8px 0;text-align:right;color:#111827">${formatCurrency(Number(quote.itemCostCad))}</td>
      </tr>
      <tr>
        <td style="padding:8px 0;font-weight:600;color:#111827">Service fee:</td>
        <td style="padding:8px 0;text-align:right;color:#111827">${formatCurrency(Number(quote.serviceFeeCad))}</td>
      </tr>
      <tr>
        <td style="padding:8px 0;font-weight:600;color:#111827">Shipping:</td>
        <td style="padding:8px 0;text-align:right;color:#111827">${formatCurrency(Number(quote.shippingCad))}</td>
      </tr>
      <tr>
        <td style="padding:8px 0;font-weight:600;color:#111827">Tax (13%):</td>
        <td style="padding:8px 0;text-align:right;color:#111827">${formatCurrency(Number(quote.taxCad))}</td>
      </tr>
      <tr>
        <td style="padding:12px 0;font-weight:700;color:#E11D48;font-size:16px">Total due:</td>
        <td style="padding:12px 0;text-align:right;font-weight:700;color:#E11D48;font-size:16px">${formatCurrency(
          Number(quote.totalCad)
        )}</td>
      </tr>
    </tbody>
  </table>
`;
const wrapTemplate = (content: string) => `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>BuyFromChina.ca</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f9fafb;font-family:Inter,Segoe UI,Helvetica,Arial,sans-serif">
    <div style="max-width:560px;margin:0 auto;padding:32px 24px;background-color:#ffffff">
      <div style="text-align:center;padding-bottom:16px">
        <a href="${siteUrl}" style="color:#111;font-size:20px;font-weight:700;text-decoration:none">BuyFromChina.ca</a>
      </div>
      ${content}
      <p style="margin-top:32px;color:#6b7280;font-size:13px;text-align:center">
        Need help? Reply to this email or visit <a href="${siteUrl}/contact" style="color:#E11D48">our contact page</a>.
      </p>
    </div>
  </body>
</html>`;

export const buildQuoteEmails = ({ quote }: { quote: QuoteLike }) => {
  const productUrls = splitProductUrls(quote.productURL);

  const productListHtml =
    productUrls.length > 0
      ? `<ul style="margin:8px 0 12px;padding-left:18px;color:#374151;font-size:14px;line-height:1.5">${productUrls
          .map((url) => `<li><a href="${url}" style="color:#E11D48;text-decoration:none">${url}</a></li>`)
          .join('')}</ul>`
      : '';

  const addressHtml = `
    <div style="margin:16px 0 12px">
      <p style="margin:0;color:#374151;font-size:15px;font-weight:600">Shipping to:</p>
      <p style="margin:4px 0 0;color:#374151;font-size:15px">${quote.recipientName}</p>
      <p style="margin:0;color:#374151;font-size:15px">${quote.addressLine1}</p>
      ${quote.addressLine2 ? `<p style="margin:0;color:#374151;font-size:15px">${quote.addressLine2}</p>` : ''}
      <p style="margin:0;color:#374151;font-size:15px">${quote.city}, ${quote.province} ${quote.postalCode}</p>
    </div>
  `;

  const productHtml = productUrls.length
    ? `<p style="color:#374151;font-size:15px;margin:0">We received your request for the following listings:</p>${productListHtml}<p style="color:#374151;font-size:15px;margin:0 0 12px">Our team will review them and email you a custom quote shortly.</p>`
    : `<p style="color:#374151;font-size:15px;margin:0 0 12px">We received your request and will review the details you provided. Feel free to reply with product links if you find them.</p>`;

  const notesHtml = quote.notes
    ? `<blockquote style="margin:12px 0;padding:12px;background:#f9fafb;border-left:4px solid #E11D48;color:#4b5563">${quote.notes}</blockquote>`
    : '';

  const formattedReference = quote.referencePrice ? formatCurrency(Number(quote.referencePrice)) : null;
  const referenceHtml = formattedReference
    ? `<p style="margin:8px 0 0;color:#374151;font-size:15px">Customer noted reference price: ${formattedReference}</p>`
    : '';

  const attachmentsHtml = quote.attachments && quote.attachments.length
    ? `<div style="margin-top:16px"><p style="margin:0 0 8px;color:#374151;font-size:15px;font-weight:600">Reference images:</p><ul style="margin:0;padding-left:18px;color:#374151;font-size:14px;line-height:1.5">${quote.attachments.map((url: string) => `<li><a href="${url}" style="color:#E11D48;text-decoration:none">${url}</a></li>`).join('')}</ul></div>`
    : '';

  const htmlContent = `
    <h1 style="font-size:22px;color:#111827;margin:0 0 12px">Thanks for reaching out!</h1>
    ${productHtml}
    ${addressHtml}
    ${referenceHtml}
    ${notesHtml}
    ${attachmentsHtml}
    <p style="margin:16px 0 0;color:#374151;font-size:14px">You can reply directly to this email if you need to add more details.</p>
  `;

  const adminProductHtml = productUrls.length
    ? `<li><strong>Product URLs:</strong><ul style="margin:8px 0 0;padding-left:18px;color:#374151;font-size:14px;line-height:1.5">${productUrls
        .map((url) => `<li><a href="${url}" style="color:#E11D48;text-decoration:none">${url}</a></li>`)
        .join('')}</ul></li>`
    : '<li><strong>Product URLs:</strong> Not provided</li>';

  const adminAddressHtml = `
    <li><strong>Mailing address:</strong>
      <div>${quote.recipientName}<br/>${quote.addressLine1}${quote.addressLine2 ? `<br/>${quote.addressLine2}` : ''}<br/>${quote.city}, ${quote.province} ${quote.postalCode}</div>
    </li>
  `;

  const adminHtml = `
    <h1 style="font-size:22px;color:#111827;margin:0 0 12px">Manual quote requested</h1>
    <p style="color:#374151;font-size:15px;margin:0 0 12px">A customer submitted a quote form. Follow up manually with pricing.</p>
    <ul style="margin:0;padding-left:18px;color:#374151;font-size:14px;line-height:1.6">
      <li><strong>Email:</strong> ${quote.email}</li>
      ${adminProductHtml}
      ${adminAddressHtml}
      <li><strong>Postal code:</strong> ${quote.postalCode}</li>
      <li><strong>Size:</strong> ${quote.size}</li>
      ${formattedReference ? `<li><strong>Reference price:</strong> ${formattedReference}</li>` : ''}
    </ul>
    ${notesHtml}
    ${attachmentsHtml}
    <p style="margin:16px 0 0;color:#374151;font-size:14px">Review and respond via the admin dashboard: <a href="${siteUrl}/admin/quotes/${quote.id}" style="color:#E11D48">View quote</a>.</p>
  `;

  const textAttachmentLines = quote.attachments && quote.attachments.length
    ? ['Attachments:', ...quote.attachments].join('\n')
    : '';

  const userTextLines = [
    'Thanks for your request!',
    productUrls.length > 0 ? ['Products:', ...productUrls].join('\n') : 'Product link: Not provided',
    'Shipping to:',
    `  ${quote.recipientName}`,
    `  ${quote.addressLine1}`,
    quote.addressLine2 ? `  ${quote.addressLine2}` : null,
    `  ${quote.city}, ${quote.province} ${quote.postalCode}`,
    'We will email you a custom quote within 12 hours.',
    quote.notes ? `Notes: ${quote.notes}` : null,
    formattedReference ? `Reference price: ${formattedReference}` : null,
    textAttachmentLines
  ].filter((line): line is string => Boolean(line));
  const userText = userTextLines.join('\n');

  const adminTextLines = [
    'New quote request (manual pricing required)',
    `Quote ID: ${quote.id}`,
    `Customer email: ${quote.email}`,
    productUrls.length > 0 ? ['Product URLs:', ...productUrls].join('\n') : 'Product URL: Not provided',
    'Shipping to:',
    `  ${quote.recipientName}`,
    `  ${quote.addressLine1}`,
    quote.addressLine2 ? `  ${quote.addressLine2}` : null,
    `  ${quote.city}, ${quote.province} ${quote.postalCode}`,
    `Size: ${quote.size}`,
    formattedReference ? `Reference price: ${formattedReference}` : null,
    quote.notes ? `Notes: ${quote.notes}` : null,
    textAttachmentLines
  ].filter((line): line is string => Boolean(line));
  const adminText = adminTextLines.join('\n');

  return {
    user: {
      subject: 'We received your BuyFromChina.ca request',
      html: wrapTemplate(htmlContent),
      text: userText
    },
    admin: {
      subject: `Manual quote requested – ${quote.postalCode}`,
      html: wrapTemplate(adminHtml),
      text: adminText
    }
  };
};
export const buildReceiptEmail = ({
  order,
  quote
}: {
  order: Order;
  quote: QuoteLike;
}) => {
  const htmlContent = `
    <h1 style="font-size:22px;color:#111827;margin:0 0 12px">Payment confirmed</h1>
    <p style="color:#374151;font-size:15px;margin:0 0 12px">
      Thanks for your purchase! We&#39;re preparing your Taobao/Tmall order. Keep this receipt for your records.
    </p>
    <p style="margin:0;color:#374151;font-size:15px">Order ID: ${order.id}</p>
    <p style="margin:0 0 12px;color:#374151;font-size:15px">Paid on: ${formatDate(order.createdAt)}</p>
    ${renderQuoteTable(quote)}
  `;

  const textContent = [
    'Payment confirmed',
    `Order ID: ${order.id}`,
    `Quote ID: ${quote.id}`,
    `Total paid: ${formatCurrency(Number(order.totalCad))}`
  ].join('\n');

  return {
    subject: 'Your BuyFromChina.ca payment receipt',
    html: wrapTemplate(htmlContent),
    text: textContent
  };
};
