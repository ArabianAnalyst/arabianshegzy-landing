const ITEMS = [
  'WEBSITES',
  '·',
  'CONTENT SYSTEMS',
  '·',
  'AUTOMATION',
  '·',
  'SAAS & PRODUCTS',
  '·',
  '48 HRS',
  '·',
  'AI OPERATOR',
  '·',
  'MWP',
  '·',
  'ONE SYSTEM',
  '·',
  'GLOBAL',
  '·',
  'FAST',
  '·',
]

// Duplicate for seamless loop
const TRACK = [...ITEMS, ...ITEMS]

export default function MarqueeTicker() {
  return (
    <div
      style={{
        background: '#0A0A0A',
        borderTop: '1px solid #1C1C1C',
        borderBottom: '1px solid #1C1C1C',
        padding: '1rem 0',
        overflow: 'hidden',
      }}
    >
      <div className="marquee-track" style={{ gap: '0' }}>
        {TRACK.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.65rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              padding: '0 1.25rem',
              color: item === '·' ? '#E8D832' : '#383838',
              fontWeight: item === '·' ? 900 : 500,
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}