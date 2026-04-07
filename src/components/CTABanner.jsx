import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const WA_NUMBER = '2348053566386'
const WA_MESSAGE = encodeURIComponent("Hi ARABA, I want to build something.")

export default function CTABanner() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="contact" className="px-6 md:px-12 py-28" style={{ background: '#E8D832' }}>
      <div className="max-w-[1400px] mx-auto" ref={ref}>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">

          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              className="mb-6"
              style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(8,8,8,0.4)' }}
            >
              Get started
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-black tracking-tighter"
              style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.5rem, 7vw, 6rem)', lineHeight: 0.9, color: '#080808' }}
            >
              Ready to build?
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="flex flex-col gap-5 max-w-sm"
          >
            <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1rem', color: 'rgba(8,8,8,0.6)', lineHeight: 1.6 }}>
              One message. I'll tell you exactly what's possible and how fast we can move.
            </p>

            <div className="flex flex-col gap-3">
              {/* Primary: WhatsApp */}
              <a
                href={`https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-md font-semibold transition-all duration-200 hover:-translate-y-1"
                style={{ background: '#080808', color: '#E8D832', fontFamily: 'Outfit, sans-serif', fontSize: '0.95rem' }}
              >
                {/* WhatsApp icon */}
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Let's Build Something
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>

              {/* Secondary: Email */}
              <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '0.8rem', color: 'rgba(8,8,8,0.45)', textAlign: 'center' }}>
                Or email:{' '}
                <a
                  href="mailto:araba@olurabian.com"
                  style={{ color: 'rgba(8,8,8,0.65)', textDecoration: 'underline', textUnderlineOffset: '3px' }}
                >
                  araba@olurabian.com
                </a>
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
