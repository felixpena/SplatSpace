'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { motion } from 'framer-motion'

interface Stat {
  prefix: string
  value: number
  suffix: string
  label: string
  sublabel: string
}

const stats: Stat[] = [
  {
    prefix: '$',
    value: 200,
    suffix: ' USD',
    label: 'Costo de un escaneo',
    sublabel: 'vs $15.000 USD de comisión de agente tradicional',
  },
  {
    prefix: '',
    value: 0,
    suffix: ' apps',
    label: 'Para instalar',
    sublabel: 'Corre directo en el browser, cualquier dispositivo',
  },
  {
    prefix: '',
    value: 50,
    suffix: ' propiedades',
    label: 'Recorridas en una noche',
    sublabel: 'Sin salir del sofá, sin coordinar visitas',
  },
  {
    prefix: '<',
    value: 3,
    suffix: ' seg',
    label: 'Tiempo de carga en móvil',
    sublabel: 'WebGL nativo, optimizado para cualquier red',
  },
]

function useCountUp(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!active || target === 0) {
      setCount(target)
      return
    }
    const start     = Date.now()
    const interval  = setInterval(() => {
      const elapsed  = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      // ease-out cubic
      const eased    = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress >= 1) {
        clearInterval(interval)
        setCount(target)
      }
    }, 16)
    return () => clearInterval(interval)
  }, [active, target, duration])

  return count
}

function StatCard({ stat, index, inView }: { stat: Stat; index: number; inView: boolean }) {
  const count = useCountUp(stat.value, 1800, inView)

  return (
    <motion.div
      className="flex flex-col items-center text-center p-6"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      <div className="font-rajdhani font-bold text-splat-cyan text-[56px] sm:text-[64px] leading-none mb-2">
        {stat.prefix}{count}{stat.suffix}
      </div>
      <div className="font-rajdhani font-semibold text-white text-lg mb-1">
        {stat.label}
      </div>
      <div className="font-dm-sans text-xs text-white/40 max-w-[200px] leading-relaxed">
        {stat.sublabel}
      </div>
    </motion.div>
  )
}

export default function StatsSection() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      className="relative py-20 px-4"
      style={{ background: '#070710' }}
    >
      {/* Cyan accent line top */}
      <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-splat-cyan to-transparent" />

      <div className="max-w-6xl mx-auto">
        <motion.p
          className="text-center font-dm-sans text-sm text-splat-cyan/70 uppercase tracking-widest mb-12"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          Los números no mienten
        </motion.p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 divide-x-0 md:divide-x md:divide-white/10">
          {stats.map((stat, i) => (
            <StatCard key={i} stat={stat} index={i} inView={inView} />
          ))}
        </div>
      </div>

      {/* Cyan accent line bottom */}
      <div className="absolute bottom-0 inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-splat-cyan/40 to-transparent" />
    </section>
  )
}
