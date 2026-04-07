import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const SERVICES = [
  {
    tag: '→ 48hrs',
    title: 'Websites',
    description: 'Premium. Mobile-first. Live in 48 hours.',
    detail: 'Not a template. A full site — design, copy, domain, email automation. Built and shipped.',
  },
  {
    tag: '→ Full pipeline',
    title: 'Content Systems',
    description: 'Scripts → Animation → Video → Social.',
    detail: 'One brief goes in. A full content pipeline comes out. Automated end to end.',
  },
  {
    tag: '→ Always on',
    title: 'Automation',
    description: 'Forms, emails, workflows.',
    detail: 'Set once, runs forever. No babysitting. No manual triggers. Just output.',
    featured: true,
  },
  {
    tag: '→ Ship fast',
    title: 'SaaS & Products',
    description: 'From idea to deployed product.',
    detail: 'Full stack. Real users. Fast. Built on the same MWP system that runs this site.',
  },
]

function ServiceCard({ tag, title, description, detail, featured, index }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: 'easeOut' }}
      className="group card-lift rounded-2xl p-8 flex flex-col justify-between gap-10"
      style={{
        background: featured ? 'rgba(232,216,50,0.04)' : 'var(--card)',
        border: featured ? '1px solid rgba(232,216,50,0.2)' : '1px solid #1C1C1C',
        minHeight: '220px',
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <span style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.62rem',
          letterSpacing: '0.08em',
          color: featured ? '#E8D832' : '#383838',
          background: '#0F0F0F',
          border: '1px solid #1C1C1C',
          padding: '0.2rem 0.5rem',
          borderRadius: '4px',
        }}>
          {tag}
        </span>
      </div>

      <div>
        <h3 className="font-black mb-2 tracking-tight" style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.4rem', color: '#EDEAE3', letterSpacing: '-0.02em' }}>
          {title}
        </h3>
        <p className="text-sm font-medium mb-3" style={{ color: featured ? '#E8D832' : '#EDEAE3', fontFamily: 'Outfit, sans-serif' }}>
          {description}
        </p>
        <p className="text-sm leading-relaxed" style={{ color: '#666666', fontFamily: 'Outfit, sans-serif' }}>
          {detail}
        </p>
      </div>
    </motion.div>
  )
}

export default function Services() {
  const headRef = useRef(null)
  const inView  = useInView(headRef, { once: true, margin: '-80px' })

  return (
    <section id="services" className="py-28 px-6 md:px-12" style={{ background: 'var(--canvas)' }}>
      <div className="max-w-[1400px] mx-auto">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <motion.p
              ref={headRef}
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              className="mb-5"
              style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#383838' }}
            >
              Capabilities
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-black tracking-tighter"
              style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 0.95, color: '#EDEAE3' }}
            >
              One system.<br />
              <span style={{ color: '#E8D832' }}>Everything you need.</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="max-w-xs text-sm leading-relaxed"
            style={{ color: '#666666', fontFamily: 'Outfit, sans-serif' }}
          >
            Not four agencies. Not a freelancer for each thing. One operator, one system, all of it connected.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.title} {...s} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
