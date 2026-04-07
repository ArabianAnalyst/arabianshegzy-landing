import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const STEPS = [
  {
    number: '01',
    label: 'Brief',
    title: 'Tell me what you need.',
    description: 'One conversation — WhatsApp, voice note, whatever works for you. No intake forms. No 6-question questionnaire. Just tell me the thing.',
  },
  {
    number: '02',
    label: 'System activates',
    title: 'Right context. Right output.',
    description: 'The right workspace loads. Right context, right references, right output. No generic work. Every build is scoped before a single line of code is written.',
  },
  {
    number: '03',
    label: 'Delivered',
    title: 'Live in days, not months.',
    description: 'You review, we refine, we ship. No disappearing acts. No "we need more time." Days — not months.',
  },
]

export default function HowItWorks() {
  const headRef = useRef(null)
  const inView  = useInView(headRef, { once: true, margin: '-80px' })

  return (
    <section id="how-it-works" className="py-28 px-6 md:px-12" style={{ background: 'var(--canvas)' }}>
      <div className="max-w-[1400px] mx-auto">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div>
            <motion.p
              ref={headRef}
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              className="mb-5"
              style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#383838' }}
            >
              Process
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-black tracking-tighter"
              style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 0.95, color: '#EDEAE3' }}
            >
              Simple process.<br />
              <span style={{ color: '#E8D832' }}>Fast delivery.</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="max-w-xs text-sm leading-relaxed"
            style={{ color: '#666666', fontFamily: 'Outfit, sans-serif' }}
          >
            No retainers. No bloated discovery phases. Three steps. Done.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.15 }}
              className="group relative p-10"
              style={{
                borderTop: '1px solid #1C1C1C',
                borderLeft: i > 0 ? '1px solid #1C1C1C' : 'none',
              }}
            >
              <div
                className="font-black mb-8 leading-none select-none"
                style={{ fontFamily: 'Syne, sans-serif', fontSize: '5rem', color: '#1C1C1C', letterSpacing: '-0.05em', transition: 'color 0.3s ease' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(232,216,50,0.12)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#1C1C1C')}
              >
                {step.number}
              </div>

              <div className="mb-1" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#E8D832' }}>
                {step.label}
              </div>
              <h3 className="font-bold mb-4" style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.2rem', color: '#EDEAE3' }}>
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#666666', fontFamily: 'Outfit, sans-serif' }}>
                {step.description}
              </p>

              <div className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-500"
                style={{ background: '#E8D832' }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
