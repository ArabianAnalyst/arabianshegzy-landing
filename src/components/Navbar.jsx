import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ArabaLogo from './ArabaLogo'

const NAV_LINKS = [
  { label: 'Services',     href: '#services'    },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'About',        href: '#about'        },
  { label: 'Free Brief',   href: '/free-brief',     external: false },
  { label: 'Shop',         href: '/web-agency-kit', external: false },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
      className="fixed top-0 left-0 right-0 z-[500] transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(8,8,8,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid #1C1C1C' : '1px solid transparent',
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-16 flex items-center justify-between">

        {/* Wordmark */}
        <a href="#home" className="hover:opacity-80 transition-opacity duration-200">
          <ArabaLogo size="md" />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map(({ label, href }) => {
            const isShop = label === 'Shop'
            const isBrief = label === 'Free Brief'
            return (
              <a key={href} href={href}
                className="text-sm font-medium transition-colors duration-200"
                style={{ color: isShop ? '#E8D832' : isBrief ? '#EDEAE3' : '#666666', fontFamily: 'Outfit, sans-serif' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#EDEAE3')}
                onMouseLeave={(e) => (e.currentTarget.style.color = isShop ? '#E8D832' : isBrief ? '#EDEAE3' : '#666666')}
              >
                {label}
              </a>
            )
          })}
        </nav>

        {/* CTA */}
        <a href="#contact"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
          style={{ background: '#E8D832', color: '#080808', fontFamily: 'Outfit, sans-serif' }}
        >
          Book Free Audit
          <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3"><path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
        </a>

        {/* Hamburger */}
        <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {[0, 1, 2].map((i) => (
            <span key={i} className="block h-px w-6 transition-all duration-300"
              style={{
                background: '#E8D832',
                transform:
                  open && i === 0 ? 'translateY(7px) rotate(45deg)' :
                  open && i === 1 ? 'scaleX(0)' :
                  open && i === 2 ? 'translateY(-7px) rotate(-45deg)' : 'none',
              }}
            />
          ))}
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden px-6 pb-6 pt-3 flex flex-col gap-5"
          style={{ background: 'rgba(8,8,8,0.98)', borderTop: '1px solid #1C1C1C' }}
        >
          {NAV_LINKS.map(({ label, href }) => (
            <a key={href} href={href} onClick={() => setOpen(false)}
              className="text-sm font-medium" style={{ color: label === 'Shop' ? '#E8D832' : '#666666' }}>
              {label}
            </a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)}
            className="inline-flex items-center justify-center py-3 rounded-md text-sm font-semibold mt-1"
            style={{ background: '#E8D832', color: '#080808' }}
          >
            Book Free Audit
          </a>
        </motion.div>
      )}
    </motion.header>
  )
}
