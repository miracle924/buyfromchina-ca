export default function Custom500() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ maxWidth: 420, textAlign: 'center', padding: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#111827' }}>Unexpected error</h1>
        <p style={{ marginTop: '1rem', color: '#4B5563', fontSize: '0.95rem', lineHeight: 1.6 }}>
          Something went wrong on our side. Please refresh the page or contact{' '}
          <a href="mailto:amelia@buyfromchina.ca" style={{ color: '#E11D48' }}>
            amelia@buyfromchina.ca
          </a>{' '}
          and we&apos;ll help you right away.
        </p>
      </div>
    </div>
  );
}
