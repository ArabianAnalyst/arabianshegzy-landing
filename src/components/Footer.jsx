import ArabaLogo from './ArabaLogo'

const NAV_LINKS = [
  { label: 'Services',     href: '#services'     },
  { label: 'How It Works', href: '#how-it-works'  },
  { label: 'About',        href: '#about'         },
  { label: 'Contact',      href: '#contact'       },
]

const SOCIAL_LINKS = [
  { label: 'X / Twitter', href: 'https://x.com/ArabianShegzy' },
  { label: 'LinkedIn',    href: 'https://linkedin.com'         },
  { label: 'GitHub',      href: 'https://github.com'           },
]

export default function Footer() {
  return (
    <footer className="px-6 md:px-12 pt-16 pb-8" style={{ background: '#0F0F0F', borderTop: '1px solid #1C1C1C' }}>
      <div className="max-w-[1400px] mx-auto">

        <div className="flex flex-col md:flex-row items-start justify-between gap-12 pb-12" style={{ borderBottom: '1px solid #1C1C1C' }}>

          <div className="max-w-xs">
            <a href="#home" className="block mb-3 hover:opacity-80 transition-opacity duration-200">
              <ArabaLogo size="lg" />
            </a>
            <p className="text-sm leading-relaxed mt-3" style={{ color: '#383838', fontFamily: 'Outfit, sans-serif' }}>
              AI Creative Operator. One system. Fast.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-12">
            <nav>
              <p className="mb-4" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#383838' }}>
                Navigation
              </p>
              <ul className="flex flex-col gap-2.5">
                {NAV_LINKS.map(({ label, href }) => (
                  <li key={href}>
                    <a href={href} className="text-sm transition-colors duration-200"
                      style={{ color: '#666666', fontFamily: 'Outfit, sans-serif' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#EDEAE3')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#666666')}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <p className="mb-4" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#383838' }}>
                Follow
              </p>
              <ul className="flex flex-col gap-2.5">
                {SOCIAL_LINKS.map(({ label, href }) => (
                  <li key={href}>
                    <a href={href} target="_blank" rel="noopener noreferrer"
                      className="text-sm transition-colors duration-200"
                      style={{ color: '#666666', fontFamily: 'Outfit, sans-serif' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#E8D832')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#666666')}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.08em', color: '#383838' }}>
            © {new Date().getFullYear()} ARABA · Built with MWP
          </p>
          <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.08em', color: '#383838' }}>
            @ArabianShegzy
          </p>
        </div>
      </div>
    </footer>
  )
}
