'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

const faqs = [
  {
    q: '¿Necesito equipo especial para el escaneo?',
    a: 'No. Nuestros escaneristas van a tu propiedad con smartphones de alta gama propios. Tú solo nos das acceso al espacio.',
  },
  {
    q: '¿Cuánto demora el proceso completo?',
    a: 'El escaneo en terreno toma entre 20 y 40 minutos dependiendo del tamaño. El procesamiento 3D demora entre 1 y 3 días. Recibes tu link listo para compartir.',
  },
  {
    q: '¿Funciona en cualquier dispositivo?',
    a: 'Sí. El tour 3D carga en cualquier browser moderno — Chrome, Safari, Firefox — en desktop y móvil. Sin apps, sin plugins, sin instalaciones.',
  },
  {
    q: '¿Puedo insertar el tour en mi propio sitio web?',
    a: 'Sí. Te entregamos un código embed (iframe) listo para copiar y pegar en cualquier web o portal inmobiliario.',
  },
  {
    q: '¿Hacen escaneos en todo Chile?',
    a: 'Sí. Tenemos cobertura nacional. Coordinamos visitas en cualquier ciudad del país — solo cuéntanos dónde está tu propiedad.',
  },
  {
    q: '¿Qué pasa si el resultado no me satisface?',
    a: 'Los planes Profesional y Empresa incluyen una revisión gratuita. Si el resultado no cumple el estándar acordado, lo repetimos.',
  },
]

function Item({ faq, isOpen, onToggle }: { faq: { q: string; a: string }; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-white/10">
      <button
        onClick={onToggle}
        className="w-full py-5 flex items-center justify-between gap-4 text-left"
      >
        <span className="font-rajdhani font-semibold text-lg text-white">{faq.q}</span>
        <motion.span
          className="flex-shrink-0 w-6 h-6 rounded-full border border-splat-cyan/40 flex items-center justify-center text-splat-cyan text-sm"
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="pb-5 font-dm-sans text-sm text-white/60 leading-relaxed">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const [open,  setOpen]  = useState<number | null>(null)
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      className="section-pad px-4"
      style={{ background: 'linear-gradient(180deg, #050508 0%, #07070f 100%)' }}
    >
      <div className="max-w-3xl mx-auto">
        <motion.h2
          ref={ref}
          className="font-rajdhani font-bold text-white text-center mb-12
                     text-[36px] sm:text-[48px]"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Preguntas{' '}
          <span className="text-splat-cyan">frecuentes</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {faqs.map((faq, i) => (
            <Item
              key={i}
              faq={faq}
              isOpen={open === i}
              onToggle={() => setOpen(open === i ? null : i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
