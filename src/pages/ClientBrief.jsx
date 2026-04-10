import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import ArabaLogo from '../components/ArabaLogo'

const WHAT_YOU_GET = [
  { num: '7', label: 'Questions', desc: 'Covers every decision a builder needs before they start.' },
  { num: '5', label: 'Minutes', desc: 'Fill it in before a call, or send it ahead — no meetings wasted.' },
  { num: '48', label: 'Hours', desc: 'The timeline I work to. Your brief makes that possible.' },
]

const PROBLEMS = [
  'Called 3 agencies and got 3 different quotes with no explanation',
  'Paid a deposit and heard nothing for 6 weeks',
  'The final site looked nothing like what you described',
  'Kept going back and forth because nothing was written down',
]

function FadeUp({ children, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  )
}

export default function ClientBrief() {
  const [email, setEmail]     = useState('')
  const [name, setName]       = useState('')
  const [status, setStatus]   = useState('idle') // idle | loading | done | error
  const [touched, setTouched] = useState(false)

  const valid = email.includes('@') && name.trim().length > 1

  async function handleSubmit(e) {
    e.preventDefault()
    setTouched(true)
    if (!valid) return
    setStatus('loading')

    // Add contact to Loops and trigger welcome email
    try {
      await fetch('https://app.loops.so/api/v1/contacts/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_LOOPS_API_KEY}`,
        },
        body: JSON.stringify({
          firstName: name.trim(),
          email: email.trim(),
          source: 'free-brief-landing',
          userGroup: 'lead',
        }),
      })
    } catch (_) {
      // Silently continue — don't block the download on a network error
    }

    // Trigger the download
    const link = document.createElement('a')
    link.href = '/downloads/the-5-minute-client-brief.pdf'
    link.download = 'The-5-Minute-Client-Brief-ARABA.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    setStatus('done')
  }

  return (
    <div style={{ background: '#080808', minHeight: '100vh', color: '#EDEAE3', fontFamily: 'Outfit, sans-serif' }}>

      {/* Top bar */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '4px', background: '#E8D832', zIndex: 100 }} />

      {/* Navbar */}
      <header style={{ position: 'fixed', top: 4, left: 0, right: 0, zIndex: 99, borderBottom: '1px solid #1C1C1C', background: 'rgba(8,8,8,0.94)', backdropFilter: 'blur(20px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="/" style={{ textDecoration: 'none' }}><ArabaLogo size="md" /></a>
          <a href="/#contact" style={{ fontFamily: 'Outfit, sans-serif', fontSize: 14, fontWeight: 600, color: '#080808', background: '#E8D832', padding: '8px 20px', borderRadius: 6, textDecoration: 'none' }}>
            Book Free Audit
          </a>
        </div>
      </header>

      {/* ─── HERO ─── */}
      <section style={{ paddingTop: 140, paddingBottom: 100, maxWidth: 1100, margin: '0 auto', padding: '140px 32px 100px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>

          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#E8D832', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#E8D832', display: 'inline-block' }} />
              Free Download
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: 'Syne, sans-serif', fontWeight: 900, fontSize: 'clamp(52px, 7vw, 80px)', letterSpacing: '-0.04em', lineHeight: 0.9, marginBottom: 24 }}
            >
              The 5-Minute<br /><span style={{ color: '#E8D832' }}>Client Brief.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ fontSize: 20, color: '#666', lineHeight: 1.6, marginBottom: 40, maxWidth: 460 }}
            >
              7 questions that tell a builder everything they need. No wasted meetings. No vague quotes. No projects that drag on for months.
            </motion.p>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{ display: 'flex', gap: 40, marginBottom: 0 }}
            >
              {WHAT_YOU_GET.map(({ num, label, desc }) => (
                <div key={label}>
                  <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 900, fontSize: 48, color: '#E8D832', letterSpacing: '-0.04em', lineHeight: 1 }}>{num}</div>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#383838', marginTop: 4 }}>{label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {status === 'done' ? (
              <div style={{ background: '#0F0F0F', border: '1px solid #1C1C1C', borderRadius: 12, padding: 48, textAlign: 'center' }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>✓</div>
                <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 900, fontSize: 28, marginBottom: 12 }}>
                  Your brief is downloading.
                </h3>
                <p style={{ color: '#666', fontSize: 16, lineHeight: 1.6, marginBottom: 32 }}>
                  Check your downloads folder.<br />
                  Ready to build? Book a free audit below.
                </p>
                <a href="/#contact" style={{ display: 'inline-block', background: '#E8D832', color: '#080808', fontWeight: 700, padding: '14px 32px', borderRadius: 8, textDecoration: 'none', fontSize: 15 }}>
                  Book Free Audit →
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ background: '#0F0F0F', border: '1px solid #1C1C1C', borderRadius: 12, padding: 48 }}>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#383838', marginBottom: 24 }}>
                  Get instant access — free
                </div>

                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#888', marginBottom: 8, letterSpacing: '0.02em' }}>
                    First name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Your first name"
                    required
                    style={{
                      width: '100%', padding: '14px 16px', borderRadius: 8,
                      background: '#080808', border: `1px solid ${touched && name.trim().length < 2 ? '#ef4444' : '#282828'}`,
                      color: '#EDEAE3', fontSize: 15, fontFamily: 'Outfit, sans-serif', outline: 'none',
                    }}
                  />
                </div>

                <div style={{ marginBottom: 32 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#888', marginBottom: 8 }}>
                    Email address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="hello@yourbusiness.com"
                    required
                    style={{
                      width: '100%', padding: '14px 16px', borderRadius: 8,
                      background: '#080808', border: `1px solid ${touched && !email.includes('@') ? '#ef4444' : '#282828'}`,
                      color: '#EDEAE3', fontSize: 15, fontFamily: 'Outfit, sans-serif', outline: 'none',
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  style={{
                    width: '100%', padding: '16px', borderRadius: 8, border: 'none', cursor: 'pointer',
                    background: '#E8D832', color: '#080808', fontFamily: 'Syne, sans-serif',
                    fontWeight: 900, fontSize: 16, letterSpacing: '-0.02em',
                    opacity: status === 'loading' ? 0.7 : 1, transition: 'opacity 0.2s, transform 0.2s',
                  }}
                  onMouseEnter={e => { if (status !== 'loading') e.currentTarget.style.transform = 'translateY(-2px)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  {status === 'loading' ? 'Preparing download...' : 'Download the Brief — Free →'}
                </button>

                <p style={{ fontSize: 12, color: '#383838', marginTop: 16, textAlign: 'center', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.08em' }}>
                  No spam. One weekly dispatch. Unsubscribe anytime.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* ─── PROBLEM ─── */}
      <section style={{ background: '#0A0A0A', borderTop: '1px solid #1C1C1C', borderBottom: '1px solid #1C1C1C', padding: '80px 32px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <FadeUp>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#383838', marginBottom: 16 }}>
              Sound familiar?
            </div>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 900, fontSize: 'clamp(36px, 5vw, 56px)', letterSpacing: '-0.04em', lineHeight: 0.92, marginBottom: 48 }}>
              Most projects go wrong<br />before they even start.
            </h2>
          </FadeUp>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {PROBLEMS.map((p, i) => (
              <FadeUp key={i} delay={i * 0.08}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '22px 0', borderBottom: '1px solid #1C1C1C' }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#1C1C1C', border: '1px solid #333', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontFamily: 'JetBrains Mono, monospace', fontSize: 15, color: '#555' }}>✕</div>
                  <div style={{ fontSize: 18, color: '#555', textDecoration: 'line-through', textDecorationColor: '#282828' }}>{p}</div>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.3}>
            <p style={{ fontSize: 22, color: '#EDEAE3', marginTop: 40, lineHeight: 1.5 }}>
              A clear brief fixes all of this.<br />
              <span style={{ color: '#666' }}>It takes 5 minutes. It saves weeks.</span>
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ─── WHAT'S INSIDE ─── */}
      <section style={{ padding: '80px 32px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <FadeUp>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#E8D832', marginBottom: 16 }}>
              What's inside
            </div>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 900, fontSize: 'clamp(36px, 5vw, 56px)', letterSpacing: '-0.04em', lineHeight: 0.92, marginBottom: 48 }}>
              7 questions.<br /><span style={{ color: '#E8D832' }}>Every answer a builder needs.</span>
            </h2>
          </FadeUp>

          {[
            { n: '01', q: 'The Business', desc: 'What you do, in one plain sentence. No jargon. No pitch.' },
            { n: '02', q: 'The Project', desc: 'What needs building and why you need it now.' },
            { n: '03', q: 'Pages You Need', desc: 'A simple checklist — Homepage to Shop. Tick, done.' },
            { n: '04', q: 'Your Audience', desc: 'Who visits the site and what they need to feel when they land.' },
            { n: '05', q: 'Design Direction', desc: 'Sites you like, and the feel you want. No design degree needed.' },
            { n: '06', q: 'Timeline & Budget', desc: 'Honest numbers upfront. Sets expectations for everyone.' },
            { n: '07', q: 'The Win', desc: 'How will you know it worked? This is the goal everything is built toward.' },
          ].map(({ n, q, desc }, i) => (
            <FadeUp key={n} delay={i * 0.06}>
              <div style={{ display: 'flex', gap: 24, padding: '24px 0', borderBottom: '1px solid #1C1C1C', alignItems: 'flex-start' }}>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: '#E8D832', letterSpacing: '0.1em', minWidth: 36, marginTop: 2 }}>{n}</div>
                <div>
                  <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 20, color: '#EDEAE3', marginBottom: 6 }}>{q}</div>
                  <div style={{ fontSize: 16, color: '#555', lineHeight: 1.5 }}>{desc}</div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ─── BOTTOM CTA ─── */}
      <section style={{ background: '#0A0A0A', borderTop: '1px solid #1C1C1C', padding: '80px 32px', textAlign: 'center' }}>
        <FadeUp>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#383838', marginBottom: 16 }}>
            It's free. Always.
          </div>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 900, fontSize: 'clamp(40px, 5vw, 64px)', letterSpacing: '-0.04em', lineHeight: 0.92, marginBottom: 24 }}>
            Stop starting projects<br />without a brief.
          </h2>
          <p style={{ fontSize: 20, color: '#666', marginBottom: 48, maxWidth: 480, margin: '0 auto 48px' }}>
            Download the template. Fill it in. Send it to whoever you're hiring. The build starts right.
          </p>
          <a
            href="#top"
            onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            style={{ display: 'inline-block', background: '#E8D832', color: '#080808', fontFamily: 'Syne, sans-serif', fontWeight: 900, fontSize: 18, padding: '18px 48px', borderRadius: 8, textDecoration: 'none', letterSpacing: '-0.02em' }}
          >
            Get the Brief — Free →
          </a>
        </FadeUp>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #1C1C1C', padding: '32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: 1100, margin: '0 auto' }}>
        <ArabaLogo size="sm" />
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#383838' }}>
          olurabian.com
        </span>
      </footer>
    </div>
  )
}
