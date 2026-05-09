'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const cases = [
  {
    icon: '🏠',
    title: 'Propiedades en venta',
    desc: 'Acelera el ciclo de venta con tours que el comprador explora solo, sin coordinar visita.',
  },
  {
    icon: '🏖️',
    title: 'Airbnbs y arriendos',
    desc: 'Aumenta las reservas mostrando el espacio exacto. Menos dudas, más conversiones.',
  },
  {
    icon: '🎪',
    title: 'Venues y eventos',
    desc: 'Que organizadores recorran tu sala de eventos desde cualquier ciudad antes de contratar.',
  },
  {
    icon: '🏛️',
    title: 'Museos y showrooms',
    desc: 'Lleva tu colección o catálogo al mundo digital con fidelidad fotorrealista completa.',
  },
  {
    icon: '🚗',
    title: 'Concesionarias',
    desc: 'Muestra el interior y exterior de cada vehículo en 3D. El cliente llega ya convencido.',
  },
  {
    icon: '🏗️',
    title: 'Proyectos en planos',
    desc: 'Escanea el piloto o departamento modelo y compártelo con miles de compradores a la vez.',
  },
]

function CaseCard({ icon, title, desc, delay, inView }: { icon: string; title: string; desc: string; delay: number; inView: boolean }) {
  return (
    <motion.div
      className="glass-card rounded-xl p-6 flex flex-col gap-3 transition-all duration-300"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4, boxShadow: '0 0 20px rgba(0,245,255,0.25), 0 0 1px rgba(0,245,255,0.5)' }}
    >
      <span className="text-3xl">{icon}</span>
      <h3 className="font-rajdhani font-bold text-[20px] text-white">{title}</h3>
      <p className="font-dm-sans text-[13px] text-white/55 leading-relaxed">{desc}</p>
    </motion.div>
  )
}

export default function UseCases() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      className="section-pad px-4"
      style={{ background: 'linear-gradient(180deg, #050508 0%, #07070f 100%)' }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-rajdhani font-bold text-white text-[36px] sm:text-[48px] mb-4">
            ¿Quién necesita{' '}
            <span className="text-splat-violet">SplatSpace</span>?
          </h2>
          <p className="font-dm-sans text-white/50 text-base max-w-lg mx-auto">
            Cualquier espacio físico que quiera vivir también en internet.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {cases.map((c, i) => (
            <CaseCard key={i} {...c} delay={i * 0.1} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
