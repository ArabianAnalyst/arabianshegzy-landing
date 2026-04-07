import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const TESTIMONIALS = [
  {
    name: 'Sarah K.',
    role: 'Founder, Marketing Agency',
    quote: 'The automation ArabianShegzy built saved us over 20 hours a week. Our lead follow-up is now instant and our team can actually focus on strategy instead of copy-pasting data.',
  },
  {
    name: 'Marcus R.',
    role: 'E-Commerce Operator',
    quote: "The custom chatbot they built handles 80% of customer queries without any human input. The ROI was clear within the first month.",
  },
  {
    name: 'Amira L.',
    role: 'CEO, SaaS Startup',
    quote: "Genuinely rare to find someone who can talk data science AND understand business operations. The reporting pipeline they built gave us visibility we never had before.",
  },
]

export default function Testimonials() {
  const headRef = useRef(null)
  const inView  = useInView(headRef, { once: true, margin: '-80px' })

  return (
    <section id="testimonials" className="py-28 px-6 md:px-12" style={{ background: 'var(--surface)' }}>
      <div className="max-w-[1400px] mx-auto">

        <motion.p
          ref={headRef}
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-20"
          style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#383838' }}
        >
          — Client Results
        </motion.p>

        <div>
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: i * 0.15 }}
              className="py-12"
              style={{ borderTop: '1px solid #1C1C1C' }}
            >
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 items-start">
                <div className="flex flex-col gap-1">
                  <span className="font-bold" style={{ fontFamily: 'Syne, sans-serif', fontSize: '0.95rem', color: '#EDEAE3' }}>
                    {t.name}
                  </span>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#383838' }}>
                    {t.role}
                  </span>
                </div>

                <div className="relative">
                  <span
                    className="absolute -top-6 -left-2 select-none"
                    style={{ fontFamily: 'Syne, sans-serif', fontSize: '5rem', lineHeight: 1, color: '#1C1C1C' }}
                  >
                    &ldquo;
                  </span>
                  <blockquote style={{
                    fontFamily: 'Syne, sans-serif',
                    fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)',
                    color: '#EDEAE3',
                    lineHeight: 1.3,
                    fontWeight: 500,
                  }}>
                    {t.quote}
                  </blockquote>
                </div>
              </div>
            </motion.div>
          ))}
          <div style={{ borderTop: '1px solid #1C1C1C' }} />
        </div>
      </div>
    </section>
  )
}
