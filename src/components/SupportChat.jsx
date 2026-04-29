import { useState, useRef, useEffect } from 'react'

const WEBHOOK_URL = 'https://olurabian.app.n8n.cloud/webhook/ai-support'
const YELLOW = '#FFE600'

function Message({ text, sender }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: sender === 'user' ? 'flex-end' : 'flex-start',
        marginBottom: '10px',
      }}
    >
      <div
        style={{
          maxWidth: '82%',
          padding: '10px 14px',
          borderRadius: sender === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
          fontSize: '13px',
          lineHeight: '1.55',
          background: sender === 'user' ? '#111' : '#F5F5F5',
          color: sender === 'user' ? '#fff' : '#111',
          fontWeight: sender === 'user' ? 500 : 400,
        }}
      >
        {text}
      </div>
    </div>
  )
}

export default function SupportChat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)
  const greeted = useRef(false)

  useEffect(() => {
    if (open && !greeted.current) {
      greeted.current = true
      setMessages([
        {
          id: Date.now(),
          text: "Hi! Ask me anything about AI systems, pricing, or how it all works. I'll get back to you instantly.",
          sender: 'bot',
        },
      ])
    }
    if (open) setTimeout(() => inputRef.current?.focus(), 150)
  }, [open])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function sendMessage() {
    const msg = input.trim()
    if (!msg || loading) return

    const userMsg = { id: Date.now(), text: msg, sender: 'user' }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    const typingId = Date.now() + 1
    setMessages(prev => [...prev, { id: typingId, text: '···', sender: 'bot' }])

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: msg,
          session_id: 'web_' + Date.now(),
          name: 'Visitor',
        }),
      })
      const data = await res.json()
      setMessages(prev => [
        ...prev.filter(m => m.id !== typingId),
        { id: Date.now(), text: data.response, sender: 'bot' },
      ])
    } catch {
      setMessages(prev => [
        ...prev.filter(m => m.id !== typingId),
        { id: Date.now(), text: 'Sorry, something went wrong. Please try again.', sender: 'bot' },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999, fontFamily: 'inherit' }}>

      {open && (
        <div
          style={{
            marginBottom: '12px',
            width: '340px',
            background: '#fff',
            borderRadius: '20px',
            boxShadow: '0 12px 48px rgba(0,0,0,0.18)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* ── Header ── */}
          <div
            style={{
              background: YELLOW,
              padding: '16px 18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {/* Avatar dot */}
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: '#111',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px',
                }}
              >
                ⚡
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '14px', color: '#111', letterSpacing: '-0.3px' }}>
                  Olurabian Support
                </div>
                <div style={{ fontSize: '11px', color: '#333', marginTop: '1px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
                  Online · replies instantly
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: 'rgba(0,0,0,0.1)',
                border: 'none',
                color: '#111',
                cursor: 'pointer',
                fontSize: '16px',
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
              }}
            >
              ×
            </button>
          </div>

          {/* ── Messages ── */}
          <div
            style={{
              padding: '16px',
              height: '260px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              background: '#fff',
            }}
          >
            {messages.map(m => (
              <Message key={m.id} text={m.text} sender={m.sender} />
            ))}
            <div ref={bottomRef} />
          </div>

          {/* ── Input ── */}
          <div
            style={{
              padding: '12px 16px 16px',
              borderTop: '1px solid #f0f0f0',
              display: 'flex',
              gap: '8px',
              background: '#fff',
            }}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="Ask anything..."
              style={{
                flex: 1,
                padding: '10px 14px',
                border: '1.5px solid #e5e5e5',
                borderRadius: '10px',
                fontSize: '13px',
                outline: 'none',
                color: '#111',
                background: '#fafafa',
                transition: 'border-color 0.2s',
              }}
              onFocus={e => (e.target.style.borderColor = YELLOW)}
              onBlur={e => (e.target.style.borderColor = '#e5e5e5')}
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              style={{
                background: '#111',
                color: '#fff',
                border: 'none',
                borderRadius: '10px',
                padding: '10px 16px',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '16px',
                fontWeight: 700,
                opacity: loading ? 0.5 : 1,
                transition: 'opacity 0.2s',
              }}
            >
              →
            </button>
          </div>
        </div>
      )}

      {/* ── Toggle button ── */}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button
          onClick={() => setOpen(prev => !prev)}
          style={{
            width: '58px',
            height: '58px',
            borderRadius: '50%',
            background: open ? '#111' : YELLOW,
            color: open ? YELLOW : '#111',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.2s, color 0.2s',
          }}
        >
          {open ? '×' : '💬'}
        </button>
      </div>
    </div>
  )
}
