import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const CARDS = [
  {
    number: '01',
    audience: 'Business Owners',
    body: "You need to look premium online. Your competitors have websites that look expensive. Yours can look better — and cost less.",
  },
  {
    number: '02',
    audience: 'Founders',
    body: "You don't need a website. You need a system. Content, automation, product, marketing — all connected and running.",
    featured: true,
  },
  {
    number: '03',
    audience: 'Creators',
    body: "You have ideas but no infrastructure. Scripts. Videos. Social content. All of it, running on one pipeline.",
  },
]

export default function ProblemStatement() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="who-its-for" className="py-28 px-6 md:px-12" style={{ background: 'var(--surface)' }}>
      <div className="max-w-[1400px] mx-auto">

        <motion.p
          ref={ref}
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-5"
          style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#383838' }}
        >
          Who This Is For
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-black tracking-tighter mb-16"
          style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 0.95, color: '#EDEAE3' }}
        >
          Built for people who are<br />
          <span style={{ color: '#E8D832' }}>tired of waiting.</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.number}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.12 }}
              className="card-lift rounded-2xl p-10 flex flex-col gap-8"
              style={{
                background: card.featured ? 'rgba(232,216,50,0.04)' : 'var(--card)',
                border: card.featured ? '1px solid rgba(232,216,50,0.2)' : '1px solid #1C1C1C',
                minHeight: '280px',
              }}
            >
              <div className="flex items-center justify-between">
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.1em', color: '#383838' }}>
                  {card.number}
                </span>
              </div>

              <div>
                <h3 className="font-black mb-4 tracking-tight"
                  style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.3rem', color: card.featured ? '#E8D832' : '#EDEAE3', lineHeight: 1.1 }}>
                  {card.audience}
                </h3>
                <p className="text-sm leading-relaxed"
                  style={{ color: '#666666', fontFamily: 'Outfit, sans-serif' }}>
                  {card.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
