'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const steps = [
  {
    num: '01',
    icon: '📱',
    title: 'Escaneamos',
    desc: 'Vamos a tu propiedad con smartphone de alta gama. El proceso completo toma entre 20 y 40 minutos.',
  },
  {
    num: '02',
    icon: '⚙️',
    title: 'Procesamos',
    desc: 'Nuestra IA reconstruye el espacio en 3D fotorrealista usando Gaussian Splatting. Listo en horas.',
  },
  {
    num: '03',
    icon: '🔗',
    title: 'Entregamos',
    desc: 'Recibes un link permanente. Tus clientes lo abren en cualquier dispositivo. Ya están dentro.',
  },
]

function Step({
  step,
  index,
  inView,
}: {
  step: (typeof steps)[0]
  index: number
  inView: boolean
}) {
  return (
    <motion.div
      className="flex flex-col items-center text-center"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      {/* Circle with number */}
      <div
        className="relative w-20 h-20 rounded-full flex items-center justify-center mb-6
                   border border-splat-cyan/30 bg-splat-cyan/5"
      >
        <span className="text-3xl">{step.icon}</span>
        <span
          className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-splat-cyan
                     flex items-center justify-center text-black font-rajdhani font-bold text-xs"
        >
          {step.num}
        </span>
      </div>
      <h3 className="font-rajdhani font-bold text-2xl text-white mb-3">{step.title}</h3>
      <p className="font-dm-sans text-sm text-white/60 leading-relaxed max-w-xs">{step.desc}</p>
    </motion.div>
  )
}

export default function HowItWorks() {
  const sectionRef = useRef(null)
  const titleRef   = useRef(null)
  const pathRef    = useRef(null)

  const inView      = useInView(sectionRef, { once: true, margin: '-80px' })
  const titleInView = useInView(titleRef,   { once: true, margin: '-80px' })

  return (
    <section
      id="como-funciona"
      className="section-pad px-4"
      style={{ background: 'linear-gradient(180deg, #050508 0%, #080810 50%, #050508 100%)' }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          ref={titleRef}
          className="font-rajdhani font-bold text-white text-center mb-16
                     text-[36px] sm:text-[48px]"
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Así funciona{' '}
          <span className="text-splat-cyan">SplatSpace</span>
        </motion.h2>

        <div ref={sectionRef} className="relative">
          {/* Animated connecting line — desktop only */}
          <div className="hidden md:block absolute top-10 left-0 w-full pointer-events-none">
            <svg
              viewBox="0 0 900 20"
              preserveAspectRatio="none"
              className="w-full h-5"
              fill="none"
            >
              <motion.path
                d="M 150 10 H 750"
                stroke="#00F5FF"
                strokeWidth="1.5"
                strokeDasharray="6 4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={inView ? { pathLength: 1, opacity: 0.5 } : {}}
                transition={{ duration: 2, ease: 'easeInOut', delay: 0.3 }}
              />
            </svg>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {steps.map((step, i) => (
              <Step key={i} step={step} index={i} inView={inView} />
            ))}
          </div>
        </div>

        {/* Bottom CTA note */}
        <motion.p
          className="text-center mt-14 font-dm-sans text-sm text-white/40"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.9, duration: 0.6 }}
          ref={pathRef}
        >
          De la visita al link listo:{' '}
          <span className="text-splat-cyan font-medium">3 a 6 días</span>
        </motion.p>
      </div>
    </section>
  )
}
