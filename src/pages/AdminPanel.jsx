/**
 * ArabianShegzy Admin Panel — /admin
 * ────────────────────────────────────
 * Password-gated panel that lets you regenerate hero headline,
 * service descriptions, and CTA copy live using the Claude API.
 *
 * SECURITY NOTE:
 *   API calls are made directly from the browser using the key
 *   you enter at login. The key is stored only in React state
 *   (memory) and is never written to localStorage or cookies.
 *   In a production deployment, proxy these calls through a
 *   backend endpoint to avoid exposing your key in network tabs.
 *
 * MODEL: claude-sonnet-4-0  (Claude Sonnet 4, as requested)
 */

import { useState, useRef } from 'react'

// ─── Brand context sent with every generation prompt ─────────
const BRAND_CONTEXT = `
You are writing copy for ArabianShegzy, a premium AI automation agency.

BRAND PROFILE:
- Name: ArabianShegzy
- Tagline: "We Automate the Work. You Run the Business."
- Founder: MSc Data Science & Analytics — University of Hertfordshire
- Specialties: Python, LangChain, n8n, OpenAI API, FastAPI
- Target clients: small businesses, solopreneurs, marketing agencies, startups
- Tone: Confident, technical, premium — NOT playful, NOT corporate
- Style: Outcome-led, specific, bold. No fluff. No buzzwords. Be direct.
`.trim()

// ─── Sections the admin can regenerate ───────────────────────
const REGEN_TARGETS = [
  {
    id: 'hero_headline',
    label: 'Hero Headline',
    description: 'The main H1 on the landing page',
    prompt: `${BRAND_CONTEXT}

Write a single punchy hero headline (max 10 words) for an AI automation agency landing page.
Lead with the outcome for the client, not the feature.
Be bold and direct. No generic AI clichés.
Return only the headline text, no quotes, no punctuation at the end.`,
  },
  {
    id: 'hero_subheadline',
    label: 'Hero Subheadline',
    description: '1–2 sentence intro below the H1',
    prompt: `${BRAND_CONTEXT}

Write a compelling 1–2 sentence subheadline for the hero section.
It should explain what ArabianShegzy does and who it's for.
Be specific. Mention AI systems and automation.
Return only the subheadline text, no quotes.`,
  },
  {
    id: 'services_intro',
    label: 'Services Section Intro',
    description: 'Short description above the services grid',
    prompt: `${BRAND_CONTEXT}

Write a short 1-sentence intro paragraph (max 20 words) that appears above the services grid.
It should convey quality and customisation.
Return only the sentence, no quotes.`,
  },
  {
    id: 'cta_headline',
    label: 'CTA Banner Headline',
    description: 'The big headline in the bottom CTA banner',
    prompt: `${BRAND_CONTEXT}

Write a short CTA section headline (max 8 words) urging the visitor to book a free audit.
Make it feel urgent but not pushy. Premium tone.
Return only the headline, no quotes, no punctuation at end.`,
  },
  {
    id: 'cta_subtext',
    label: 'CTA Banner Subtext',
    description: '1–2 lines below the CTA headline',
    prompt: `${BRAND_CONTEXT}

Write 1–2 short lines of CTA subtext for a "book a free audit" CTA.
Emphasise zero commitment and immediate clarity.
Return only the text, no quotes.`,
  },
  {
    id: 'problem_intro',
    label: 'Problem Section Intro',
    description: 'Short para below the "leaking time" headline',
    prompt: `${BRAND_CONTEXT}

Write a 1–2 sentence paragraph for a "problem statement" section that explains
how small businesses waste time on manual work.
Mention a specific time figure (15–20 hours/week).
Return only the paragraph text, no quotes.`,
  },
]

// ─── Admin password — set VITE_ADMIN_PASSWORD in .env ────────
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD ?? ''

// ─── Utility: stream Claude API via SSE ──────────────────────
async function streamClaude({ apiKey, prompt, onChunk, onDone, onError }) {
  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
        // Required for direct browser calls
        'anthropic-dangerous-request-options': JSON.stringify({ allowBrowserAccess: true }),
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-0',  // Claude Sonnet 4 (claude-sonnet-4-20250514)
        max_tokens: 256,
        stream: true,
        messages: [{ role: 'user', content: prompt }],
      }),
    })

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: { message: res.statusText } }))
      throw new Error(err?.error?.message || `HTTP ${res.status}`)
    }

    const reader  = res.body.getReader()
    const decoder = new TextDecoder()
    let buffer    = ''

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop() // Keep incomplete last line

      for (const line of lines) {
        if (!line.startsWith('data: ')) continue
        const data = line.slice(6).trim()
        if (data === '[DONE]') continue

        try {
          const json = JSON.parse(data)
          if (json.type === 'content_block_delta' && json.delta?.type === 'text_delta') {
            onChunk(json.delta.text)
          }
        } catch {
          // Ignore malformed SSE lines
        }
      }
    }

    onDone()
  } catch (err) {
    onError(err.message || 'Unknown error')
  }
}

// ─── Single regeneration card ─────────────────────────────────
function RegenCard({ target, apiKey }) {
  const [output,   setOutput]   = useState('')
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState('')
  const [copied,   setCopied]   = useState(false)
  const outputRef = useRef(null)

  const handleRegen = async () => {
    setOutput('')
    setError('')
    setLoading(true)

    await streamClaude({
      apiKey,
      prompt: target.prompt,
      onChunk: (chunk) => {
        setOutput((prev) => prev + chunk)
        // Auto-scroll output area
        if (outputRef.current) {
          outputRef.current.scrollTop = outputRef.current.scrollHeight
        }
      },
      onDone:  () => setLoading(false),
      onError: (msg) => { setError(msg); setLoading(false) },
    })
  }

  const handleCopy = async () => {
    if (!output) return
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      className="rounded-xl p-6"
      style={{
        background: 'rgba(20,20,20,0.9)',
        border: '1px solid rgba(0,102,255,0.2)',
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-1">
        <div>
          <h3 className="text-base font-semibold text-white">{target.label}</h3>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
            {target.description}
          </p>
        </div>

        {/* Regenerate button */}
        <button
          onClick={handleRegen}
          disabled={loading}
          className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 disabled:opacity-50"
          style={{
            background: loading ? 'rgba(0,102,255,0.2)' : 'rgba(0,102,255,0.15)',
            border: '1px solid rgba(0,102,255,0.35)',
            color: 'var(--blue-neon)',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? (
            <>
              <span
                className="inline-block w-3 h-3 rounded-full border-t border-blue-400 animate-spin"
                style={{ borderColor: 'var(--blue-neon)', borderTopColor: 'transparent' }}
              />
              Generating…
            </>
          ) : (
            <>
              <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
                <path d="M13.65 2.35A8 8 0 1 0 15 8h-2a6 6 0 1 1-1.05-3.45" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M11 2h4v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              Regenerate Copy
            </>
          )}
        </button>
      </div>

      {/* Output area */}
      {(output || loading) && (
        <div
          ref={outputRef}
          className="mt-4 p-4 rounded-lg text-sm leading-relaxed font-mono min-h-[60px] max-h-48 overflow-y-auto"
          style={{
            background: 'rgba(0,0,0,0.5)',
            border: '1px solid rgba(0,102,255,0.15)',
            color: '#e0e0e0',
            whiteSpace: 'pre-wrap',
          }}
        >
          {output}
          {loading && (
            <span
              className="inline-block w-1.5 h-4 ml-0.5 align-middle animate-pulse"
              style={{ background: 'var(--cyan-neon)' }}
              aria-hidden="true"
            />
          )}
        </div>
      )}

      {/* Error */}
      {error && (
        <div
          className="mt-3 p-3 rounded-lg text-xs"
          style={{
            background: 'rgba(255,60,60,0.1)',
            border: '1px solid rgba(255,60,60,0.25)',
            color: '#ff8080',
          }}
        >
          Error: {error}
        </div>
      )}

      {/* Copy button */}
      {output && !loading && (
        <button
          onClick={handleCopy}
          className="mt-3 inline-flex items-center gap-1.5 text-xs transition-colors duration-150"
          style={{ color: copied ? 'var(--cyan-neon)' : 'var(--text-muted)' }}
        >
          {copied ? (
            <>
              <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3" aria-hidden="true">
                <path d="M1 6l4 4 6-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              Copied
            </>
          ) : (
            <>
              <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3" aria-hidden="true">
                <rect x="4" y="4" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M2 8V2h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              Copy to clipboard
            </>
          )}
        </button>
      )}
    </div>
  )
}

// ─── Password gate ─────────────────────────────────────────────
function PasswordGate({ onSuccess }) {
  const [pw,  setPw]  = useState('')
  const [key, setKey] = useState('')
  const [err, setErr] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (pw !== ADMIN_PASSWORD) {
      setErr('Incorrect password.')
      return
    }
    if (!key.trim().startsWith('sk-ant-')) {
      setErr('Enter a valid Anthropic API key (starts with sk-ant-).')
      return
    }
    onSuccess(key.trim())
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{ background: 'var(--black-deep)' }}
    >
      <div
        className="w-full max-w-sm rounded-2xl p-8"
        style={{
          background: 'var(--black-card)',
          border: '1px solid rgba(0,102,255,0.25)',
        }}
      >
        <h1 className="text-xl font-bold text-white mb-1">Admin Panel</h1>
        <p className="text-xs mb-6" style={{ color: 'var(--text-muted)' }}>
          ArabianShegzy — Copy Regeneration
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
              Password
            </label>
            <input
              type="password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              placeholder="Enter admin password"
              required
              className="w-full px-4 py-2.5 rounded-lg text-sm text-white bg-transparent outline-none focus:ring-1"
              style={{
                background: 'rgba(0,0,0,0.4)',
                border: '1px solid rgba(0,102,255,0.25)',
              }}
            />
          </div>

          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
              Anthropic API Key
            </label>
            <input
              type="password"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="sk-ant-..."
              required
              className="w-full px-4 py-2.5 rounded-lg text-sm text-white outline-none focus:ring-1"
              style={{
                background: 'rgba(0,0,0,0.4)',
                border: '1px solid rgba(0,102,255,0.25)',
              }}
            />
            <p className="mt-1.5 text-xs" style={{ color: 'var(--text-muted)' }}>
              Stored in memory only — never persisted.
            </p>
          </div>

          {err && (
            <p className="text-xs" style={{ color: '#ff8080' }}>{err}</p>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl font-semibold text-sm text-white transition-all duration-200 hover:shadow-neon-blue"
            style={{
              background: 'linear-gradient(135deg, var(--blue-electric), var(--blue-neon))',
            }}
          >
            Access Admin Panel
          </button>
        </form>
      </div>
    </div>
  )
}

// ─── Main AdminPanel component ─────────────────────────────────
export default function AdminPanel() {
  const [apiKey, setApiKey] = useState(null)

  if (!apiKey) {
    return <PasswordGate onSuccess={setApiKey} />
  }

  return (
    <div
      className="min-h-screen px-6 py-12"
      style={{ background: 'var(--black-deep)' }}
    >
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">
              <span className="gradient-text">Admin</span> Panel
            </h1>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Regenerate landing page copy with Claude Sonnet 4 (claude-sonnet-4-0)
            </p>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs"
            style={{
              background: 'rgba(0,240,100,0.1)',
              border: '1px solid rgba(0,240,100,0.2)',
              color: '#4dff91',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
            Connected
          </div>
        </div>

        {/* Regen cards */}
        <div className="flex flex-col gap-5">
          {REGEN_TARGETS.map((target) => (
            <RegenCard key={target.id} target={target} apiKey={apiKey} />
          ))}
        </div>

        {/* Logout */}
        <div className="mt-10 pt-6 text-center" style={{ borderTop: '1px solid var(--black-border)' }}>
          <button
            onClick={() => setApiKey(null)}
            className="text-xs transition-colors duration-150"
            style={{ color: 'var(--text-muted)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#ff8080')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            Sign out &amp; clear API key
          </button>
        </div>
      </div>
    </div>
  )
}
