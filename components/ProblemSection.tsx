'use client'

import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from 'framer-motion'

const problems = [
  {
    icon: '🕐',
    title: 'Coordinar visitas toma días',
    desc: 'Los clientes no aparecen. El tiempo del corredor se pierde en agenda, traslado y espera.',
  },
  {
    icon: '📷',
    title: 'Las fotos 2D no convencen',
    desc: 'El comprador no puede sentir el espacio. La duda paraliza la decisión y alarga el ciclo de venta.',
  },
  {
    icon: '🥽',
    title: 'Los tours 360° son complicados',
    desc: 'Necesitan app, son lentos de cargar y no se ven bien en móvil. La experiencia frustra en vez de convencer.',
  },
]

function Card({ icon, title, desc, delay }: { icon: string; title: string; desc: string; delay: number }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      className="glass-card rounded-xl p-6 flex flex-col gap-4 glow-cyan-hover transition-all duration-300"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      <span className="text-4xl">{icon}</span>
      <h3 className="font-rajdhani font-bold text-xl text-white">{title}</h3>
      <p className="font-dm-sans text-sm text-white/60 leading-relaxed">{desc}</p>
    </motion.div>
  )
}

export default function ProblemSection() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="section-pad bg-splat-black px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          ref={ref}
          className="font-rajdhani font-bold text-white text-center mb-14
                     text-[36px] sm:text-[48px]"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Las visitas físicas{' '}
          <span className="text-splat-coral">están rotas</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {problems.map((p, i) => (
            <Card key={i} {...p} delay={i * 0.15} />
          ))}
        </div>
      </div>
    </section>
  )
}
