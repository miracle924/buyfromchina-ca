export const formatCurrency = (value: number, locale = 'en-CA', currency = 'CAD') =>
  new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);

export const formatDate = (date: Date | string, locale = 'en-CA') => {
  const instance = typeof date === 'string' ? new Date(date) : date;
  return instance.toLocaleString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};
