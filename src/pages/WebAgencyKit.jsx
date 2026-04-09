import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import ArabaLogo from '../components/ArabaLogo'

// ─── Kit contents ─────────────────────────────────────────────
const KIT_CONTENTS = [
  { file: 'CLAUDE.md', desc: 'Drop into Claude Code — the AI understands your workspace from message one' },
  { file: 'MAP.md', desc: 'Full pipeline with stage gates, timing, and pricing — at a glance' },
  { file: 'client-brief-template.md', desc: 'Fill this in during the discovery call — never miss a question' },
  { file: 'copy-brief-template.md', desc: 'Brief your AI before writing a single line of copy' },
  { file: 'proposal-template.md', desc: 'Generated from the brief — professional, scoped, ready to send' },
  { file: 'handoff-checklist.md', desc: '40-point QA before every delivery — no more missed mobile checks' },
  { file: 'Prompt 01: Discovery → Brief', desc: 'Paste call notes, get a structured brief' },
  { file: 'Prompt 02: Brief → Proposal', desc: 'Paste the brief, get a scoped proposal with pricing' },
  { file: 'Prompt 03: Brief → Sitemap', desc: 'Plan the full site structure before touching code' },
  { file: 'Prompt 04: Brief → Copy', desc: 'Write all page copy before the build starts' },
  { file: 'Prompt 05: Brief → Build', desc: 'The Claude Code prompt that builds the full site' },
  { file: 'Prompt 06: Build → Handoff', desc: 'QA audit against the brief — before every delivery' },
  { file: 'Pricing Guide', desc: 'How to quote, anchor, upsell, and never discount again' },
]

const STEPS = [
  { n: '01', label: 'Download', desc: '13 files, organised and ready to use.' },
  { n: '02', label: 'Open in Claude Code', desc: 'The CLAUDE.md loads automatically — no setup.' },
  { n: '03', label: 'New client in', desc: 'Fill the brief template, run Prompt 01.' },
  { n: '04', label: 'Follow the pipeline', desc: 'Each prompt hands off to the next stage.' },
  { n: '05', label: 'Deliver', desc: 'Run the checklist, send the invoice.' },
]

const FAQS = [
  {
    q: "Does it work if I'm not using Claude Code?",
    a: 'The prompts work with any AI tool — Claude, GPT, Gemini. Claude Code is recommended because the CLAUDE.md makes the workspace context-aware automatically. The templates and pipeline work regardless.',
  },
  {
    q: "I already have my own process. Why would I need this?",
    a: 'Most freelancers have a process in their head. This makes it tangible, consistent, and AI-powered — which means faster delivery at every stage.',
  },
  {
    q: 'What tech stacks does it support?',
    a: 'The system is stack-agnostic. The build prompt works with React, Next.js, plain HTML, anything. You pick the stack per project.',
  },
  {
    q: 'Is £49 worth it?',
    a: 'One client project typically brings in £500–2,500. This system helps you run it faster, charge more, and deliver with fewer mistakes. It pays for itself in the first hour of use.',
  },
]

// ─── Buy button ───────────────────────────────────────────────
// Replace LEMON_SQUEEZY_URL with your actual Lemon Squeezy product URL
const LEMON_SQUEEZY_URL = 'https://olurabian.lemonsqueezy.com/checkout/buy/19bffb6f-37bc-454c-94d3-b9eb75dc91db'

function BuyButton({ size = 'lg' }) {
  const large = size === 'lg'
  return (
    <a
      href={LEMON_SQUEEZY_URL}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        background: '#E8D832',
        color: '#080808',
        fontFamily: 'Syne, sans-serif',
        fontWeight: 800,
        fontSize: large ? '1.05rem' : '0.9rem',
        letterSpacing: '-0.01em',
        padding: large ? '18px 36px' : '13px 26px',
        borderRadius: 8,
        textDecoration: 'none',
        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)'
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(232,216,50,0.25)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      Get the Web Agency Kit — £49.99
      <svg viewBox="0 0 12 12" fill="none" width="14" height="14">
        <path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </a>
  )
}

// ─── Section wrapper ──────────────────────────────────────────
function Section({ id, children, dark = false, style = {} }) {
  return (
    <section
      id={id}
      style={{
        background: dark ? '#080808' : 'var(--surface, #0D0D0D)',
        padding: '5rem 1.5rem',
        position: 'relative',
        ...style,
      }}
    >
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        {children}
      </div>
    </section>
  )
}

function Label({ children }) {
  return (
    <p style={{
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: '0.65rem',
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      color: '#383838',
      marginBottom: '1.25rem',
    }}>
      {children}
    </p>
  )
}

function H2({ children }) {
  return (
    <h2 style={{
      fontFamily: 'Syne, sans-serif',
      fontWeight: 900,
      fontSize: 'clamp(2rem, 5vw, 3.5rem)',
      lineHeight: 0.95,
      letterSpacing: '-0.03em',
      color: '#EDEAE3',
      marginBottom: '1.5rem',
    }}>
      {children}
    </h2>
  )
}

// ─── Page ─────────────────────────────────────────────────────
export default function WebAgencyKit() {
  const heroRef  = useRef(null)
  const kitRef   = useRef(null)
  const stepsRef = useRef(null)
  const faqRef   = useRef(null)

  const heroIn  = useInView(heroRef,  { once: true })
  const kitIn   = useInView(kitRef,   { once: true, margin: '-60px' })
  const stepsIn = useInView(stepsRef, { once: true, margin: '-60px' })
  const faqIn   = useInView(faqRef,   { once: true, margin: '-60px' })

  return (
    <div style={{ background: '#080808', minHeight: '100vh' }}>

      {/* ── Minimal nav ───────────────────────────────── */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 500,
        background: 'rgba(8,8,8,0.92)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid #1C1C1C',
        height: 64, display: 'flex', alignItems: 'center',
        padding: '0 1.5rem',
      }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="/" style={{ textDecoration: 'none' }}>
            <ArabaLogo size="md" />
          </a>
          <BuyButton size="sm" />
        </div>
      </div>

      {/* ── Hero ──────────────────────────────────────── */}
      <section style={{ paddingTop: 140, paddingBottom: 80, paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>
        <div ref={heroRef} style={{ maxWidth: 900, margin: '0 auto' }}>

          {/* Proof badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={heroIn ? { opacity: 1, y: 0 } : {}}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              background: '#E8D83210', border: '1px solid #E8D83230',
              borderRadius: 100, padding: '8px 18px', marginBottom: '2rem',
            }}
          >
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#E8D832' }} />
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#E8D832' }}>
              Real project · £1,500 e-commerce · Delivered in 48 hours
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={heroIn ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7 }}
            style={{
              fontFamily: 'Syne, sans-serif', fontWeight: 900,
              fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
              lineHeight: 0.92, letterSpacing: '-0.04em',
              color: '#EDEAE3', marginBottom: '1.5rem',
            }}
          >
            Deliver client websites<br />
            <span style={{ color: '#E8D832' }}>in 48 hours.</span><br />
            Every time.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={heroIn ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            style={{
              fontFamily: 'Outfit, sans-serif', fontSize: '1.15rem',
              color: '#666666', lineHeight: 1.6, maxWidth: 560,
              marginBottom: '2.5rem',
            }}
          >
            The complete AI-powered system for running a web agency as one person — brief to handoff, zero chaos.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={heroIn ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}
          >
            <BuyButton />
            <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '0.78rem', color: '#383838' }}>
              £49.99 · Instant download · 13 files · Drop into Claude Code and run your first project today
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Problem ───────────────────────────────────── */}
      <Section dark>
        <div style={{ borderTop: '1px solid #1C1C1C', paddingTop: '4rem' }}>
          <Label>The problem</Label>
          <H2>Most freelancers start every<br />project from scratch.</H2>
          <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.05rem', color: '#666666', lineHeight: 1.75, maxWidth: 640 }}>
            <p style={{ marginBottom: '1rem' }}>Every new client means a new brief format. A new proposal. A new way of thinking through the scope. A different build process. Somehow, a different result each time.</p>
            <p style={{ marginBottom: '1rem' }}>The project runs over. The client asks for more than they paid for. The handoff is rushed. The invoice is awkward.</p>
            <p style={{ color: '#EDEAE3', fontWeight: 600 }}>This is not a skills problem. It's a systems problem.</p>
          </div>
        </div>
      </Section>

      {/* ── Solution ──────────────────────────────────── */}
      <Section>
        <Label>The solution</Label>
        <H2>One system.<br /><span style={{ color: '#E8D832' }}>Every project runs the same way.</span></H2>
        <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.05rem', color: '#666666', lineHeight: 1.75, maxWidth: 640, marginBottom: '2rem' }}>
          <p style={{ marginBottom: '1rem' }}>The Web Agency Kit is the complete operating system for a one-person web agency — built on Claude Code and designed to run from the moment a client messages you to the moment you send the final invoice.</p>
          <p style={{ color: '#EDEAE3', fontWeight: 600 }}>Brief → Proposal → Sitemap → Copy → Build → Review → Handoff.</p>
          <p style={{ marginTop: '0.5rem' }}>Same process. Every project. Every client.</p>
        </div>
      </Section>

      {/* ── Kit contents ──────────────────────────────── */}
      <Section dark ref={kitRef}>
        <Label>What's inside</Label>
        <H2>13 files. One complete system.</H2>
        <div style={{ marginTop: '2rem', borderTop: '1px solid #1C1C1C' }}>
          {KIT_CONTENTS.map((item, i) => (
            <motion.div
              key={item.file}
              initial={{ opacity: 0, x: -16 }}
              animate={kitIn ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.05 * i, duration: 0.4 }}
              style={{
                display: 'grid', gridTemplateColumns: '1fr 2fr',
                gap: '1.5rem', alignItems: 'start',
                padding: '1.25rem 0', borderBottom: '1px solid #1C1C1C',
              }}
            >
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.78rem', color: '#E8D832', letterSpacing: '0.02em' }}>
                {item.file}
              </span>
              <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: '0.9rem', color: '#666666', lineHeight: 1.5 }}>
                {item.desc}
              </span>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ── How it works ──────────────────────────────── */}
      <Section ref={stepsRef}>
        <Label>How it works</Label>
        <H2>Buy it. Drop it in.<br /><span style={{ color: '#E8D832' }}>Run a project.</span></H2>
        <div style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', gap: '0' }}>
          {STEPS.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 16 }}
              animate={stepsIn ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
              style={{
                display: 'grid', gridTemplateColumns: '60px 1fr',
                gap: '1.5rem', padding: '1.5rem 0',
                borderTop: '1px solid #1C1C1C',
              }}
            >
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.15em', color: '#383838', paddingTop: 4 }}>
                {s.n}
              </span>
              <div>
                <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1.05rem', color: '#EDEAE3', marginBottom: 4 }}>{s.label}</p>
                <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '0.88rem', color: '#666666' }}>{s.desc}</p>
              </div>
            </motion.div>
          ))}
          <div style={{ borderTop: '1px solid #1C1C1C' }} />
        </div>
      </Section>

      {/* ── FAQ ───────────────────────────────────────── */}
      <Section dark ref={faqRef}>
        <Label>Questions</Label>
        <H2>The things you're<br />probably wondering.</H2>
        <div style={{ marginTop: '2rem' }}>
          {FAQS.map((f, i) => (
            <motion.div
              key={f.q}
              initial={{ opacity: 0 }}
              animate={faqIn ? { opacity: 1 } : {}}
              transition={{ delay: 0.1 * i }}
              style={{ padding: '1.75rem 0', borderTop: '1px solid #1C1C1C' }}
            >
              <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1rem', color: '#EDEAE3', marginBottom: '0.6rem' }}>{f.q}</p>
              <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '0.9rem', color: '#666666', lineHeight: 1.65 }}>{f.a}</p>
            </motion.div>
          ))}
          <div style={{ borderTop: '1px solid #1C1C1C' }} />
        </div>
      </Section>

      {/* ── Final CTA ─────────────────────────────────── */}
      <section style={{ padding: '6rem 1.5rem', background: '#080808', textAlign: 'center' }}>
        <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#383838', marginBottom: '1.5rem' }}>
          Web Agency Kit
        </p>
        <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 900, fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.03em', lineHeight: 0.95, color: '#EDEAE3', marginBottom: '1.5rem' }}>
          Start your next project<br />
          <span style={{ color: '#E8D832' }}>with a system behind it.</span>
        </h2>
        <p style={{ fontFamily: 'Outfit, sans-serif', color: '#666666', fontSize: '0.95rem', marginBottom: '2.5rem' }}>
          £49.99 · Instant download · One-time purchase
        </p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <BuyButton />
        </div>
        <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '0.75rem', color: '#383838', marginTop: '1.25rem' }}>
          Built by ARABA — 27 workspaces · 5 pipelines · 0 employees
        </p>
      </section>

      {/* ── Footer ────────────────────────────────────── */}
      <div style={{ borderTop: '1px solid #1C1C1C', padding: '2rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <a href="/" style={{ textDecoration: 'none' }}><ArabaLogo size="sm" /></a>
        <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#383838' }}>
          olurabian.com · @Olurabian
        </p>
      </div>

    </div>
  )
}
