import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const PIPELINES = [
  {
    label: 'CONTENT',
    color: '#6366f1',
    desc: 'Ideas → distributed content',
    nodes: ['Script Lab', 'Animation Studio', 'Video Production', 'YouTube', 'Social Content'],
  },
  {
    label: 'AGENCY',
    color: '#22c55e',
    desc: 'Brief → live site',
    nodes: ['Web Agency', 'SEO', 'Ads', 'Marketing Agency'],
  },
  {
    label: 'BUSINESS',
    color: '#f97316',
    desc: 'Idea → revenue',
    nodes: ['SaaS', 'Lead Gen', 'Email Marketing', 'Revenue', 'Operations'],
  },
  {
    label: 'KNOWLEDGE',
    color: '#38bdf8',
    desc: 'Research → product',
    nodes: ['Research', 'Data & Analytics', 'Courses', 'Personal Brand'],
  },
  {
    label: 'OPS',
    color: '#c084fc',
    desc: 'Systems that run the system',
    nodes: ['Community', 'Client CRM', 'Finance', 'Templates', 'AI Systems'],
  },
]

export default function TheSystem() {
  const headRef = useRef(null)
  const inView  = useInView(headRef, { once: true, margin: '-80px' })

  return (
    <section
      id="the-system"
      className="py-28 px-6 md:px-12"
      style={{ background: 'var(--surface)', position: 'relative', overflow: 'hidden' }}
    >
      {/* Faint glow behind the section */}
      <div style={{
        position: 'absolute',
        top: '40%',
        right: '-10%',
        width: '50vw',
        height: '50vh',
        background: 'radial-gradient(ellipse at center, rgba(232,216,50,0.05) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div className="max-w-[1400px] mx-auto" style={{ position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <motion.p
              ref={headRef}
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#383838', marginBottom: '1.25rem' }}
            >
              The System
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-black tracking-tighter"
              style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 0.95, color: '#EDEAE3' }}
            >
              23 workspaces.<br />
              <span style={{ color: '#E8D832' }}>One operator.</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="max-w-xs text-sm leading-relaxed"
            style={{ color: '#666666', fontFamily: 'Outfit, sans-serif' }}
          >
            Every arrow is a handoff. Output of one stage becomes input of the next. This is MWP — Model Workspace Protocol.
          </motion.p>
        </div>

        {/* Pipeline rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {PIPELINES.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, x: -24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="group"
              style={{
                display: 'grid',
                gridTemplateColumns: '120px 1fr',
                gap: '2rem',
                alignItems: 'center',
                padding: '1.5rem 0',
                borderTop: '1px solid #1C1C1C',
                transition: 'background 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.01)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              {/* Label + desc */}
              <div>
                <span style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.62rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: p.color,
                  display: 'block',
                  marginBottom: '0.3rem',
                }}>
                  {p.label}
                </span>
                <span style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontSize: '0.7rem',
                  color: '#383838',
                }}>
                  {p.desc}
                </span>
              </div>

              {/* Nodes */}
              <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', rowGap: '0.5rem' }}>
                {p.nodes.map((node, j) => (
                  <div key={node} style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{
                      padding: '0.3rem 0.75rem',
                      borderRadius: '6px',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      color: p.color,
                      background: `${p.color}14`,
                      border: `1px solid ${p.color}30`,
                      whiteSpace: 'nowrap',
                      fontFamily: 'Outfit, sans-serif',
                      transition: 'background 0.2s, border-color 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = `${p.color}28`
                      e.currentTarget.style.borderColor = `${p.color}60`
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = `${p.color}14`
                      e.currentTarget.style.borderColor = `${p.color}30`
                    }}
                    >
                      {node}
                    </span>
                    {j < p.nodes.length - 1 && (
                      <span style={{ color: p.color, padding: '0 0.4rem', fontSize: '0.8rem', opacity: 0.4 }}>→</span>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
          <div style={{ borderTop: '1px solid #1C1C1C' }} />
        </div>

        {/* Bottom stat */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.9 }}
          style={{ marginTop: '3rem', display: 'flex', gap: '3rem', flexWrap: 'wrap' }}
        >
          {[
            { value: '23', label: 'Workspaces' },
            { value: '5',  label: 'Pipelines' },
            { value: '1',  label: 'Operator' },
          ].map((s) => (
            <div key={s.label}>
              <span style={{ fontFamily: 'Syne, sans-serif', fontSize: '2.5rem', fontWeight: 900, color: '#E8D832', letterSpacing: '-0.04em', lineHeight: 1 }}>
                {s.value}
              </span>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#383838', display: 'block', marginTop: '0.3rem' }}>
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}