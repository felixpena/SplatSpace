'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Pricing() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="precios" className="section-pad px-4 bg-splat-black">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-rajdhani font-bold text-white text-[36px] sm:text-[48px] mb-4">
            ¿Cuánto cuesta?
          </h2>
          <p className="font-dm-sans text-white/60 text-base sm:text-lg mb-8">
            Cada proyecto es distinto. Cotización gratuita en menos de 2 horas.
          </p>
          <button
            onClick={() => scrollTo('formulario')}
            className="px-8 py-4 bg-splat-cyan text-black font-rajdhani font-bold text-lg rounded
                       hover:opacity-90 transition-opacity"
          >
            Solicitar cotización gratis →
          </button>
        </motion.div>
      </div>
    </section>
  )
}
