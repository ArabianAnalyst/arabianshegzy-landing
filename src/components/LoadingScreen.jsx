import { motion } from 'framer-motion'

export default function LoadingScreen() {
  return (
    <motion.div
      key="loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
      className="fixed inset-0 z-[9000] flex items-center justify-center"
      style={{ background: '#080808' }}
    >
      <div className="flex flex-col items-center gap-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl font-black tracking-tighter"
          style={{ fontFamily: 'Syne, sans-serif', color: '#EDEAE3' }}
        >
          OLURA<span style={{ color: '#E8D832' }}>BIAN</span>
        </motion.div>

        <motion.div
          className="relative h-px overflow-hidden"
          style={{ width: '120px', background: '#1C1C1C' }}
        >
          <motion.div
            className="absolute inset-y-0 left-0"
            style={{ background: '#E8D832' }}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.2, ease: 'easeInOut', delay: 0.2 }}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{ color: '#383838', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}
        >
          Actionable AI Series
        </motion.p>
      </div>
    </motion.div>
  )
}
