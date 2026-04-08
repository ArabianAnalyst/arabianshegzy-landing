import { motion } from 'framer-motion'

const pipelines = [
  { label: 'CONTENT',  color: '#6366f1', nodes: ['Script Lab', 'Animation Studio', 'Video Production', 'YouTube', 'Social Content'] },
  { label: 'AGENCY',   color: '#22c55e', nodes: ['Web Agency', 'SEO', 'Ads', 'Marketing Agency', 'Copywriting', 'Brand Strategy'] },
  { label: 'BUSINESS', color: '#f97316', nodes: ['SaaS', 'Lead Gen', 'Email Marketing', 'Revenue', 'Operations', 'Products & Offers'] },
  { label: 'KNOWLEDGE',color: '#38bdf8', nodes: ['Research', 'Data & Analytics', 'Courses', 'Personal Brand'] },
  { label: 'OPS',      color: '#c084fc', nodes: ['Community', 'Client CRM', 'Finance', 'Templates', 'AI Systems', 'Content Calendar'] },
]

export default function Hero() {
  return (
    <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '7rem 1.5rem 4rem', position: 'relative', overflow: 'hidden' }}>

      {/* Banana glow — radial bloom behind headline */}
      <div style={{
        position: 'absolute',
        top: '15%',
        left: '-5%',
        width: '60vw',
        height: '60vh',
        background: 'radial-gradient(ellipse at center, rgba(232,216,50,0.10) 0%, rgba(232,216,50,0.03) 40%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>

        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-mono-brand skill-tag"
          style={{ marginBottom: '1.5rem' }}
        >
          MODEL WORKSPACE PROTOCOL
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display"
          style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', fontWeight: 900, lineHeight: 1.0, letterSpacing: '-0.03em', color: 'var(--text-primary)', marginBottom: '1rem' }}
        >
          I build<br />
          <span className="text-banana">with AI.</span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '520px', marginBottom: '2.5rem', lineHeight: 1.7 }}
        >
          Not a freelancer. Not an agency. An AI Creative Operator — one system that ships websites, content, SaaS, and automation. Fast.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '5rem' }}
        >
          <a
            href="https://wa.me/447423222566"
            target="_blank"
            rel="noopener noreferrer"
            style={{ background: 'var(--banana)', color: '#080808', fontWeight: 700, padding: '0.875rem 2rem', borderRadius: '999px', textDecoration: 'none', fontSize: '0.95rem' }}
          >
            Let's Build Something
          </a>
          <a
            href="#proof"
            style={{ border: '1px solid var(--border-hover)', color: 'var(--text-secondary)', fontWeight: 600, padding: '0.875rem 2rem', borderRadius: '999px', textDecoration: 'none', fontSize: '0.95rem' }}
          >
            See the System
          </a>
        </motion.div>

        {/* Pipeline visual */}
        <motion.div
          id="system"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          style={{ borderTop: '1px solid var(--border)', paddingTop: '3rem' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <p className="font-mono-brand" style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              27 Workspaces. One System.
            </p>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Every arrow is a handoff. Output of one stage = input of the next.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {pipelines.map((p, i) => (
              <motion.div
                key={p.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }}
                style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}
              >
                <span className="font-mono-brand" style={{ fontSize: '0.62rem', letterSpacing: '0.18em', color: 'var(--text-muted)', width: '72px', flexShrink: 0 }}>
                  {p.label}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', rowGap: '0.5rem' }}>
                  {p.nodes.map((node, j) => (
                    <div key={node} style={{ display: 'flex', alignItems: 'center' }}>
                      <span style={{
                        padding: '0.35rem 0.85rem',
                        borderRadius: '6px',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        color: p.color,
                        background: `${p.color}18`,
                        border: `1px solid ${p.color}35`,
                        whiteSpace: 'nowrap',
                      }}>
                        {node}
                      </span>
                      {j < p.nodes.length - 1 && (
                        <span style={{ color: p.color, padding: '0 0.35rem', fontSize: '0.85rem', opacity: 0.5 }}>→</span>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
