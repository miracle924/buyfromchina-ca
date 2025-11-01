export const sanitizeNotes = (notes: string) => {
  const trimmed = notes.trim();
  if (!trimmed) return null;
  return trimmed
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .slice(0, 1500);
};
