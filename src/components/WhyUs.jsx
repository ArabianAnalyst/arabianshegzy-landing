import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const STATS = [
  { value: '48', unit: 'hrs', label: 'Full client website — brief to deployed' },
  { value: '23', unit: '', label: 'Workspaces in the MWP system' },
  { value: '1', unit: '', label: 'Operator running all of it' },
]

export default function WhyUs() {
  const headRef    = useRef(null)
  const statsRef   = useRef(null)
  const projectRef = useRef(null)
  const inView     = useInView(headRef,    { once: true, margin: '-80px' })
  const statsIn    = useInView(statsRef,   { once: true, margin: '-60px' })
  const projectIn  = useInView(projectRef, { once: true, margin: '-60px' })

  return (
    <section id="proof" className="py-28 px-6 md:px-12" style={{ background: 'var(--surface)' }}>
      <div className="max-w-[1400px] mx-auto">

        {/* Header */}
        <div className="mb-20">
          <motion.p
            ref={headRef}
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="mb-5"
            style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#383838' }}
          >
            The Work
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-black tracking-tighter mb-4"
            style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 0.95, color: '#EDEAE3' }}
          >
            The work<br />
            <span style={{ color: '#E8D832' }}>speaks.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.25 }}
            className="text-sm"
            style={{ color: '#666666', fontFamily: 'Outfit, sans-serif' }}
          >
            Built this weekend. One operator. One system.
          </motion.p>
        </div>

        {/* Stats row */}
        <div
          ref={statsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-px mb-20"
          style={{ border: '1px solid #1C1C1C', borderRadius: '16px', overflow: 'hidden' }}
        >
          {STATS.map((s, i) => (
            <motion.div
              key={s.value}
              initial={{ opacity: 0, y: 20 }}
              animate={statsIn ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className="p-10 flex flex-col gap-3"
              style={{ background: 'var(--card)' }}
            >
              <div className="font-black leading-none tracking-tighter" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(3rem, 6vw, 5rem)', color: '#E8D832' }}>
                {s.value}<span style={{ fontSize: '0.5em', color: '#B5A81E' }}>{s.unit}</span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: '#666666', fontFamily: 'Outfit, sans-serif' }}>
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Project card */}
        <motion.div
          ref={projectRef}
          initial={{ opacity: 0, y: 32 }}
          animate={projectIn ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="rounded-2xl p-10 md:p-14 flex flex-col md:flex-row gap-12 md:items-center justify-between"
          style={{ background: 'var(--card)', border: '1px solid #1C1C1C' }}
        >
          <div className="flex-1">
            <p className="mb-4" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#383838' }}>
              Project 01
            </p>
            <h3 className="font-black tracking-tight mb-3" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', color: '#EDEAE3', lineHeight: 1 }}>
              FoodCatering by Unik
            </h3>
            <p className="text-sm leading-relaxed mb-6" style={{ color: '#666666', fontFamily: 'Outfit, sans-serif', maxWidth: '480px' }}>
              5-page premium website. Logo, photo gallery, email automation, WhatsApp integration. Brief to deployed in 48 hours.
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {['Website', 'Email Automation', 'WhatsApp', '48hrs'].map((t) => (
                <span key={t} style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.6rem',
                  letterSpacing: '0.08em',
                  color: '#383838',
                  background: '#0F0F0F',
                  border: '1px solid #1C1C1C',
                  padding: '0.25rem 0.625rem',
                  borderRadius: '4px',
                }}>
                  {t}
                </span>
              ))}
            </div>
            <a
              href="https://foodcateringbyunik.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-200 hover:gap-3"
              style={{ color: '#E8D832', fontFamily: 'Outfit, sans-serif' }}
            >
              See it live
              <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>

          {/* Built-in time badge */}
          <div className="shrink-0 flex flex-col items-center justify-center rounded-xl p-8 gap-1 text-center"
            style={{ background: 'rgba(232,216,50,0.05)', border: '1px solid rgba(232,216,50,0.15)', minWidth: '160px' }}>
            <span className="font-black" style={{ fontFamily: 'Syne, sans-serif', fontSize: '3.5rem', color: '#E8D832', lineHeight: 1, letterSpacing: '-0.04em' }}>48</span>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#666666' }}>hours</span>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.1em', color: '#383838', marginTop: '4px' }}>brief to live</span>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
