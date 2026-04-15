import { useState } from 'react'
import { motion } from 'framer-motion'
import ArabaLogo from '../components/ArabaLogo'

export default function WebAgencyKit() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!email) return
    // TODO: wire to your email list (Resend, ConvertKit, etc.)
    setSubmitted(true)
  }

  return (
    <div style={{ background: '#080808', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* Nav */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 500,
        background: 'rgba(8,8,8,0.92)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid #1C1C1C',
        height: 64, display: 'flex', alignItems: 'center', padding: '0 1.5rem',
      }}>
        <a href="/" style={{ textDecoration: 'none' }}>
          <ArabaLogo size="md" />
        </a>
      </div>

      {/* Main */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '120px 1.5rem 80px', textAlign: 'center',
      }}>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            background: '#E8D83210', border: '1px solid #E8D83230',
            borderRadius: 100, padding: '8px 18px', marginBottom: '2.5rem',
          }}
        >
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#E8D832', animation: 'pulse 2s infinite' }} />
          <span style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem',
            letterSpacing: '0.2em', textTransform: 'uppercase', color: '#E8D832',
          }}>
            Coming Soon
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7 }}
          style={{
            fontFamily: 'Syne, sans-serif', fontWeight: 900,
            fontSize: 'clamp(2.8rem, 8vw, 6rem)',
            lineHeight: 0.92, letterSpacing: '-0.04em',
            color: '#EDEAE3', marginBottom: '1.5rem', maxWidth: 800,
          }}
        >
          Web Agency<br />
          <span style={{ color: '#E8D832' }}>Kit.</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{
            fontFamily: 'Outfit, sans-serif', fontSize: '1.1rem',
            color: '#555', lineHeight: 1.65, maxWidth: 500,
            marginBottom: '3rem',
          }}
        >
          The complete AI-powered system for running a web agency as one person — brief to handoff, zero chaos. Dropping soon.
        </motion.p>

        {/* Email capture */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          style={{ width: '100%', maxWidth: 440 }}
        >
          {submitted ? (
            <div style={{
              background: '#22c55e10', border: '1px solid #22c55e30',
              borderRadius: 10, padding: '16px 24px',
              fontFamily: 'Outfit, sans-serif', fontSize: '0.95rem', color: '#22c55e',
            }}>
              You're on the list. We'll email you when it's live.
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 10 }}>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                style={{
                  flex: 1, padding: '14px 18px',
                  background: '#0F0F0F', border: '1px solid #282828',
                  borderRadius: 8, color: '#EDEAE3',
                  fontFamily: 'Outfit, sans-serif', fontSize: '0.95rem',
                  outline: 'none',
                }}
              />
              <button type="submit" style={{
                padding: '14px 24px', background: '#E8D832',
                color: '#080808', border: 'none', borderRadius: 8,
                fontFamily: 'Syne, sans-serif', fontWeight: 800,
                fontSize: '0.9rem', cursor: 'pointer', whiteSpace: 'nowrap',
              }}>
                Notify me
              </button>
            </form>
          )}
          <p style={{
            fontFamily: 'Outfit, sans-serif', fontSize: '0.72rem',
            color: '#2a2a2a', marginTop: '0.75rem',
          }}>
            No spam. One email when it launches.
          </p>
        </motion.div>

      </div>

      {/* Footer */}
      <div style={{
        borderTop: '1px solid #1C1C1C', padding: '1.5rem',
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', flexWrap: 'wrap', gap: '1rem',
      }}>
        <a href="/" style={{ textDecoration: 'none' }}><ArabaLogo size="sm" /></a>
        <p style={{
          fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem',
          letterSpacing: '0.12em', textTransform: 'uppercase', color: '#383838',
        }}>
          olurabian.com · @Olurabian
        </p>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  )
}
