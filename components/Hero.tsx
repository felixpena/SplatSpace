'use client'

import { motion } from 'framer-motion'

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Hero() {
  return (
    <section className="relative h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Static CSS grid background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: '#050508',
          backgroundImage: `
            linear-gradient(rgba(0,245,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,245,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Scanline overlay */}
      <div className="scanlines absolute inset-0 z-[1]" />

      {/* Radial gradient vignette */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 30%, rgba(5,5,8,0.7) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto w-full">
        <motion.h1
          className="glitch-text font-rajdhani font-bold text-white leading-tight mb-6
                     text-[42px] sm:text-[56px] md:text-[72px]"
          data-text="Visita cualquier propiedad. Sin moverte."
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Visita cualquier propiedad.{' '}
          <span className="text-splat-cyan">Sin moverte.</span>
        </motion.h1>

        <motion.p
          className="font-dm-sans text-[16px] sm:text-[18px] text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Un escaneo con tu teléfono. Tus clientes recorren el espacio en su browser —
          sin apps, sin VR, sin visitas.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <button
            onClick={() => scrollTo('demo')}
            className="px-8 py-3 border border-splat-cyan text-splat-cyan font-rajdhani font-semibold
                       text-lg rounded hover:bg-splat-cyan hover:text-black transition-all duration-200 glow-cyan-hover"
          >
            Ver Demo 3D →
          </button>
          <button
            onClick={() => scrollTo('formulario')}
            className="px-8 py-3 bg-splat-cyan text-black font-rajdhani font-bold
                       text-lg rounded hover:opacity-90 transition-all duration-200"
          >
            Quiero este servicio
          </button>
        </motion.div>

        <motion.div
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full
                     border border-white/10 bg-white/5 backdrop-blur-sm"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <span className="w-2 h-2 rounded-full bg-green-400 pulse-dot flex-shrink-0" />
          <span className="font-dm-sans text-sm text-white/60">
            ⚡ Disponible en todo Chile
          </span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span className="text-white/30 text-xs font-dm-sans">scroll</span>
        <motion.div
          className="w-px h-8 bg-gradient-to-b from-splat-cyan/60 to-transparent"
          animate={{ scaleY: [1, 0.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>
    </section>
  )
}
