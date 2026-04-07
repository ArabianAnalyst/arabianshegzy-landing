/**
 * ArabaLogo — ▸ ARABA wordmark
 * Primary brand mark. Syne Black, banana yellow arrow, off-white name.
 *
 * Props:
 *   size  — 'sm' | 'md' | 'lg' | 'xl'  (default: 'md')
 *   mono  — true | false  (true = uses JetBrains Mono, for terminal/tag contexts)
 *   className — passthrough
 */
export default function ArabaLogo({ size = 'md', mono = false, className = '' }) {
  const scale = {
    sm: '1rem',
    md: '1.25rem',
    lg: '2rem',
    xl: '3.5rem',
  }[size] || '1.25rem'

  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        fontFamily: mono ? "'JetBrains Mono', monospace" : "'Syne', sans-serif",
        fontWeight: 900,
        fontSize: scale,
        letterSpacing: '-0.03em',
        lineHeight: 1,
        userSelect: 'none',
      }}
    >
      <span style={{ color: '#E8D832', marginRight: '0.2em', fontWeight: 900 }}>▸</span>
      <span style={{ color: '#EDEAE3' }}>ARABA</span>
    </span>
  )
}
