'use client'

import { motion } from 'framer-motion'

const items = [
  { icon: '⚡', text: 'Cotización en 6 horas'   },
  { icon: '🚀', text: 'Entrega en 3 a 6 días'   },
  { icon: '✓',  text: 'Sin contrato mínimo'      },
  { icon: '📍', text: 'Cobertura en todo Chile'    },
]

export default function TrustBar() {
  return (
    <motion.div
      className="relative bg-splat-black border-y border-white/[0.06] py-4 px-4 overflow-x-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-x-0 gap-y-3">
        {items.map((item, i) => (
          <div key={i} className="flex items-center">
            {i !== 0 && (
              <div className="hidden sm:block w-px h-4 bg-white/20 mx-6" />
            )}
            {i !== 0 && (
              <div className="block sm:hidden w-4 h-px bg-white/20 mx-3" />
            )}
            <span className="font-dm-sans text-[13px] text-white/60 whitespace-nowrap">
              <span className="mr-1.5">{item.icon}</span>
              {item.text}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
