import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

// ─── Video data ───────────────────────────────────────────────
// Place .mp4 files in /public/videos/ and update the src values.
// For SendFast, swap youtubeId with a real ID once uploaded.
const VIDEOS = [
  {
    id: 'social-ad',
    title: 'MWP Social Ad',
    tag: 'Vertical · 15s',
    desc: 'TikTok / Instagram / LinkedIn',
    src: '/videos/mwp-social-ad.mp4',
    aspect: '9/16',
    featured: false,
    vertical: true,
  },
  {
    id: 'stat-animation',
    title: 'MWP Stat Animation',
    tag: 'Landscape · 30s',
    desc: 'The system — in numbers',
    src: '/videos/mwp-stat-animation.mp4',
    aspect: '16/9',
    featured: false,
    vertical: false,
  },
  {
    id: 'logo-sting',
    title: 'Logo Sting',
    tag: 'Landscape · 7.5s',
    desc: 'Brand intro for every video',
    src: '/videos/mwp-logo-sting.mp4',
    aspect: '16/9',
    featured: false,
    vertical: false,
  },
  {
    id: 'sendfast',
    title: 'SendFast Explainer',
    tag: 'Landscape · 60s',
    desc: 'B2B demo reel — fintech client case',
    src: '/videos/sendfast-explainer.mp4',
    // youtubeId: 'YOUR_YT_ID',   ← uncomment once uploaded to YouTube
    aspect: '16/9',
    featured: true,
    vertical: false,
  },
]

// ─── Single video card ────────────────────────────────────────
function VideoCard({ video, delay = 0, inView }) {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [hovered, setHovered] = useState(false)

  const handleEnter = () => {
    setHovered(true)
    if (videoRef.current) {
      videoRef.current.play().catch(() => {})
      setPlaying(true)
    }
  }

  const handleLeave = () => {
    setHovered(false)
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
      setPlaying(false)
    }
  }

  // YouTube embed variant (for long hosted videos)
  if (video.youtubeId) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay }}
        style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
      >
        <div style={{
          position: 'relative',
          borderRadius: 12,
          overflow: 'hidden',
          border: '1px solid #1C1C1C',
          aspectRatio: video.aspect,
          background: '#0D0D0D',
        }}>
          <iframe
            src={`https://www.youtube.com/embed/${video.youtubeId}?rel=0&modestbranding=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
          />
        </div>
        <VideoMeta video={video} />
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
    >
      <div
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        style={{
          position: 'relative',
          borderRadius: 12,
          overflow: 'hidden',
          border: `1px solid ${hovered ? '#E8D83240' : '#1C1C1C'}`,
          aspectRatio: video.aspect,
          background: '#0D0D0D',
          cursor: 'pointer',
          transition: 'border-color 0.3s ease',
          boxShadow: hovered ? '0 0 40px rgba(232,216,50,0.06)' : 'none',
        }}
      >
        <video
          ref={videoRef}
          src={video.src}
          muted
          loop
          playsInline
          preload="metadata"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            opacity: playing ? 1 : 0.85,
            transition: 'opacity 0.3s ease',
          }}
        />

        {/* Play indicator */}
        {!playing && (
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.3)',
            transition: 'opacity 0.2s',
          }}>
            <div style={{
              width: 52,
              height: 52,
              borderRadius: '50%',
              border: '1.5px solid rgba(232,216,50,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M6 4L14 9L6 14V4Z" fill="#E8D832" />
              </svg>
            </div>
          </div>
        )}

        {/* Duration badge */}
        <div style={{
          position: 'absolute',
          top: 12,
          right: 12,
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.6rem',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: '#E8D832',
          background: 'rgba(8,8,8,0.85)',
          border: '1px solid #E8D83230',
          padding: '4px 10px',
          borderRadius: 6,
          backdropFilter: 'blur(4px)',
        }}>
          {video.tag}
        </div>
      </div>

      <VideoMeta video={video} />
    </motion.div>
  )
}

function VideoMeta({ video }) {
  return (
    <div>
      <p style={{
        fontFamily: 'Syne, sans-serif',
        fontSize: '1rem',
        fontWeight: 700,
        color: '#EDEAE3',
        marginBottom: '0.2rem',
        letterSpacing: '-0.02em',
      }}>
        {video.title}
      </p>
      <p style={{
        fontFamily: 'Outfit, sans-serif',
        fontSize: '0.78rem',
        color: '#383838',
      }}>
        {video.desc}
      </p>
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────
export default function VideoShowcase() {
  const headRef = useRef(null)
  const inView  = useInView(headRef, { once: true, margin: '-80px' })

  const socialAd    = VIDEOS.find(v => v.id === 'social-ad')
  const statAnim    = VIDEOS.find(v => v.id === 'stat-animation')
  const logoSting   = VIDEOS.find(v => v.id === 'logo-sting')
  const sendFast    = VIDEOS.find(v => v.id === 'sendfast')

  return (
    <section
      id="work"
      className="py-28 px-6 md:px-12"
      style={{ background: '#080808', position: 'relative', overflow: 'hidden' }}
    >
      {/* Faint glow */}
      <div style={{
        position: 'absolute',
        top: '30%',
        left: '-10%',
        width: '50vw',
        height: '50vh',
        background: 'radial-gradient(ellipse at center, rgba(232,216,50,0.04) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div className="max-w-[1400px] mx-auto" style={{ position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div className="mb-16">
          <motion.p
            ref={headRef}
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.65rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#383838',
              marginBottom: '1.25rem',
            }}
          >
            Animation Studio
          </motion.p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-black tracking-tighter"
              style={{
                fontFamily: 'Syne, sans-serif',
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                lineHeight: 0.95,
                color: '#EDEAE3',
              }}
            >
              Built in-house.<br />
              <span style={{ color: '#E8D832' }}>Rendered in days.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
              className="max-w-xs text-sm leading-relaxed"
              style={{ color: '#666666', fontFamily: 'Outfit, sans-serif' }}
            >
              Every video built with React + Remotion. No After Effects. No agency. Hover to preview.
            </motion.p>
          </div>
        </div>

        {/* Grid — Row 1: Social Ad (portrait) + Stat/Logo (landscape stack) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '1.5rem',
            marginBottom: '1.5rem',
          }}
        >
          {/* Social Ad — portrait, 4 cols */}
          <div style={{ gridColumn: 'span 4' }}>
            <VideoCard video={socialAd} delay={0.15} inView={inView} />
          </div>

          {/* Right stack — 8 cols */}
          <div style={{ gridColumn: 'span 8', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <VideoCard video={statAnim} delay={0.25} inView={inView} />
            <VideoCard video={logoSting} delay={0.35} inView={inView} />
          </div>
        </div>

        {/* Row 2: SendFast — featured full width */}
        <VideoCard video={sendFast} delay={0.45} inView={inView} />

      </div>
    </section>
  )
}
