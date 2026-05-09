'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'


/* Animated SVG diagram: Camera → AI → Splat Cloud → Browser */
function TechDiagram() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const nodes = [
    { id: 'cam',    label: 'Cámara',      icon: '📷', x: 60,  y: 80  },
    { id: 'ai',     label: 'IA',          icon: '🧠', x: 230, y: 80  },
    { id: 'splat',  label: 'Splat Cloud', icon: '✨', x: 400, y: 80  },
    { id: 'browser',label: 'Browser',     icon: '🌐', x: 570, y: 80  },
  ]

  const pathD = 'M 120 80 H 190 M 290 80 H 360 M 460 80 H 530'

  return (
    <div ref={ref} className="glass-card rounded-xl p-6">
      <svg
        viewBox="0 0 650 160"
        className="w-full"
        fill="none"
      >
        {/* Connecting paths */}
        <motion.path
          d={pathD}
          stroke="#00F5FF"
          strokeWidth="1.5"
          strokeDasharray="4 3"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 0.7 } : {}}
          transition={{ duration: 2, ease: 'easeInOut', delay: 0.4 }}
        />

        {/* Arrow heads */}
        {[190, 360, 530].map((x, i) => (
          <motion.polygon
            key={i}
            points={`${x},76 ${x + 8},80 ${x},84`}
            fill="#00F5FF"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 0.7 } : {}}
            transition={{ delay: 1.5 + i * 0.1 }}
          />
        ))}

        {/* Traveling particles */}
        {inView && (
          <>
            <circle r="3" fill="#00F5FF" opacity="0.9">
              <animateMotion
                path="M 120 80 H 530"
                dur="2.5s"
                repeatCount="indefinite"
                begin="0s"
              />
            </circle>
            <circle r="2" fill="#B07FFF" opacity="0.7">
              <animateMotion
                path="M 120 80 H 530"
                dur="2.5s"
                repeatCount="indefinite"
                begin="0.8s"
              />
            </circle>
            <circle r="2" fill="#00F5FF" opacity="0.5">
              <animateMotion
                path="M 120 80 H 530"
                dur="2.5s"
                repeatCount="indefinite"
                begin="1.6s"
              />
            </circle>
          </>
        )}

        {/* Nodes */}
        {nodes.map((node, i) => (
          <motion.g key={node.id}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: i * 0.2 }}
            style={{ transformOrigin: `${node.x}px ${node.y}px` }}
          >
            <circle
              cx={node.x}
              cy={node.y}
              r={40}
              fill="rgba(0,245,255,0.05)"
              stroke="rgba(0,245,255,0.2)"
              strokeWidth="1"
            />
            <text
              x={node.x}
              y={node.y - 10}
              textAnchor="middle"
              fontSize="22"
              dominantBaseline="middle"
            >
              {node.icon}
            </text>
            <text
              x={node.x}
              y={node.y + 18}
              textAnchor="middle"
              fill="rgba(255,255,255,0.7)"
              fontSize="11"
              fontFamily="var(--font-dm-sans), sans-serif"
            >
              {node.label}
            </text>
          </motion.g>
        ))}
      </svg>
    </div>
  )
}

export default function TechSection() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      className="section-pad px-4"
      style={{ background: 'linear-gradient(180deg, #07070f 0%, #050508 100%)' }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          ref={ref}
          className="font-rajdhani font-bold text-white text-center mb-14
                     text-[36px] sm:text-[48px]"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          La ciencia detrás del{' '}
          <span className="text-splat-violet">producto</span>
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-14">
          {/* Left: explanation */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className="font-dm-sans text-base text-white/70 leading-loose">
              En lugar de triángulos como los videojuegos, usamos millones de{' '}
              <span className="text-splat-cyan font-medium">"splats"</span> — puntos de color y
              profundidad que la IA reconstruye desde las fotos de tu propiedad.
            </p>
            <p className="font-dm-sans text-base text-white/70 leading-loose mt-4">
              El resultado: fotorrealismo puro que carga en cualquier teléfono en menos de 3
              segundos. No hay renderizado en servidor — todo ocurre en el navegador del usuario,
              con WebGL nativo.
            </p>

          </motion.div>

          {/* Right: diagram */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <TechDiagram />
          </motion.div>
        </div>

      </div>
    </section>
  )
}
