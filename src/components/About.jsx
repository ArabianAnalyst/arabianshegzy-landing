import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const CREDENTIALS = [
  { label: 'Degree',     value: 'MSc Data Science & Analytics' },
  { label: 'University', value: 'University of Hertfordshire, UK' },
  { label: 'Role',       value: 'AI Creative Operator' },
  { label: 'Based',      value: 'Lagos · Working globally' },
  { label: 'System',     value: 'Model Workspace Protocol (MWP)' },
]

export default function About() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="about"
      className="py-28 px-6 md:px-12"
      style={{ background: 'var(--canvas)', position: 'relative', overflow: 'hidden' }}
    >
      {/* Subtle glow */}
      <div style={{
        position: 'absolute',
        bottom: '10%',
        left: '-10%',
        width: '45vw',
        height: '45vh',
        background: 'radial-gradient(ellipse at center, rgba(232,216,50,0.06) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div className="max-w-[1400px] mx-auto" style={{ position: 'relative', zIndex: 1 }}>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left — statement */}
          <div ref={ref}>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#383838', marginBottom: '1.25rem' }}
            >
              About
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-black tracking-tighter"
              style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', lineHeight: 1.0, color: '#EDEAE3', marginBottom: '2rem' }}
            >
              The person<br />
              <span style={{ color: '#E8D832' }}>behind the system.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1rem', color: '#666666', lineHeight: 1.75, marginBottom: '1.5rem', maxWidth: '480px' }}
            >
              I'm ARABA — an AI Creative Operator with an MSc in Data Science & Analytics from the University of Hertfordshire, UK. I built the MWP system to do what used to require five agencies: websites, content, SaaS, and automation — all from one system, run by one person.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1rem', color: '#666666', lineHeight: 1.75, maxWidth: '480px' }}
            >
              I don't talk about what's possible. I ship it. Every project on this site was built by me, using the same system I operate daily.
            </motion.p>
          </div>

          {/* Right — credentials table */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <div style={{ border: '1px solid #1C1C1C', borderRadius: '16px', overflow: 'hidden' }}>
              {CREDENTIALS.map((c, i) => (
                <div
                  key={c.label}
                  className="flex items-start justify-between gap-6 px-8 py-5"
                  style={{
                    borderBottom: i < CREDENTIALS.length - 1 ? '1px solid #1C1C1C' : 'none',
                    background: i % 2 === 0 ? 'var(--card)' : '#0F0F0F',
                  }}
                >
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#383838', flexShrink: 0, paddingTop: '2px' }}>
                    {c.label}
                  </span>
                  <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: '0.9rem', color: '#EDEAE3', textAlign: 'right' }}>
                    {c.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Quote */}
            <motion.blockquote
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
              style={{ marginTop: '2rem', paddingLeft: '1.25rem', borderLeft: '2px solid #E8D832' }}
            >
              <p style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.05rem', fontWeight: 700, color: '#EDEAE3', lineHeight: 1.5 }}>
                "The person in the room who's already done it while others are still talking about it."
              </p>
            </motion.blockquote>
          </motion.div>

        </div>
      </div>
    </section>
  )
}