import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

export default function EmailCapture() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const [email,   setEmail]   = useState('')
  const [status,  setStatus]  = useState('idle') // idle | loading | success | error
  const [message, setMessage] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    if (!email || status === 'loading') return

    setStatus('loading')
    setMessage('')

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()

      if (res.ok) {
        setStatus('success')
        setEmail('')
        setMessage("You're in. I'll be in touch.")
      } else {
        setStatus('error')
        setMessage(data.error || 'Something went wrong.')
      }
    } catch {
      setStatus('error')
      setMessage('Could not connect. Try again.')
    }
  }

  return (
    <section
      ref={ref}
      className="py-20 px-6 md:px-12"
      style={{ background: 'var(--surface)', borderTop: '1px solid #1C1C1C' }}
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-10">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="max-w-md"
          >
            <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#383838', marginBottom: '0.75rem' }}>
              Behind the system
            </p>
            <h3 className="font-black tracking-tight" style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.4rem, 3vw, 2rem)', color: '#EDEAE3', lineHeight: 1.1, marginBottom: '0.75rem' }}>
              Get the behind-the-scenes.
            </h3>
            <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '0.9rem', color: '#666666', lineHeight: 1.65 }}>
              How I build. What I ship. What's next. No noise — just the real operator content.
            </p>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="w-full md:max-w-sm"
          >
            {status === 'success' ? (
              <div
                className="flex items-center gap-3 px-6 py-4 rounded-xl"
                style={{ background: 'rgba(232,216,50,0.06)', border: '1px solid rgba(232,216,50,0.2)' }}
              >
                <span style={{ color: '#E8D832', fontSize: '1.1rem' }}>✓</span>
                <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '0.9rem', color: '#E8D832' }}>
                  {message}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0', borderRadius: '10px', overflow: 'hidden', border: '1px solid #2E2E2E' }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  style={{
                    flex: 1,
                    background: '#131313',
                    border: 'none',
                    outline: 'none',
                    padding: '0.9rem 1.25rem',
                    fontFamily: 'Outfit, sans-serif',
                    fontSize: '0.9rem',
                    color: '#EDEAE3',
                    minWidth: 0,
                  }}
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  style={{
                    background: status === 'loading' ? '#B5A81E' : '#E8D832',
                    color: '#080808',
                    border: 'none',
                    padding: '0.9rem 1.5rem',
                    fontFamily: 'Outfit, sans-serif',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'background 0.2s',
                  }}
                >
                  {status === 'loading' ? 'Subscribing…' : 'Subscribe →'}
                </button>
              </form>
            )}

            {status === 'error' && (
              <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '0.8rem', color: '#ef4444', marginTop: '0.5rem', paddingLeft: '0.25rem' }}>
                {message}
              </p>
            )}

            <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.08em', color: '#383838', marginTop: '0.75rem', paddingLeft: '0.25rem' }}>
              No spam. Unsubscribe anytime.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  )
}