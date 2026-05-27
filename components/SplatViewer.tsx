'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function SplatViewer() {
  const [loaded,  setLoaded]  = useState(false)
  const [failed,  setFailed]  = useState(false)
  const ref     = useRef(null)
  const inView  = useInView(ref, { once: true, margin: '-80px' })
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      if (!loaded) setFailed(true)
    }, 10000)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [loaded])

  return (
    <section id="demo" className="section-pad px-4 bg-splat-black">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-rajdhani font-bold text-white mb-4 text-[36px] sm:text-[48px]">
            Entra. Explora.{' '}
            <span className="text-splat-cyan">Decide.</span>
          </h2>
          <p className="font-dm-sans text-base text-white/60 max-w-xl mx-auto">
            Así ve tu cliente la propiedad — directo en el browser. Sin instalar nada.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {/* Iframe container */}
          <div className="relative rounded-xl overflow-hidden border border-splat-cyan/20">
            {/* Error fallback */}
            {failed ? (
              <div
                className="flex flex-col items-center justify-center gap-4 rounded-xl"
                style={{
                  height: 'clamp(400px, 55vw, 600px)',
                  backgroundColor: '#0a0a0f',
                }}
              >
                <span style={{ fontSize: '64px', lineHeight: 1 }}>🏠</span>
                <p className="font-rajdhani font-bold text-white text-xl text-center px-4">
                  Demo 3D temporalmente no disponible
                </p>
                <p className="font-dm-sans text-white/50 text-sm text-center px-6">
                  Contáctanos y te enviamos el link directamente
                </p>
                <button
                  onClick={() => scrollTo('formulario')}
                  className="mt-2 px-6 py-2.5 bg-splat-cyan text-black font-rajdhani font-bold text-base rounded hover:opacity-90 transition-opacity"
                >
                  Solicitar demo →
                </button>
              </div>
            ) : (
              <>
                {/* Loading skeleton */}
                {!loaded && (
                  <div
                    className="absolute inset-0 bg-white/5 animate-pulse flex items-center justify-center"
                    style={{ height: '600px' }}
                  >
                    <div className="flex flex-col items-center gap-4 text-white/30">
                      <div className="w-16 h-16 rounded-full border-2 border-white/20 border-t-splat-cyan animate-spin" />
                      <span className="font-dm-sans text-sm">Cargando tour 3D…</span>
                    </div>
                  </div>
                )}

                <div className="relative">
                  <iframe
                    src="https://superspl.at/s?id=237f3dad"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                    allowFullScreen
                    onLoad={() => {
                      if (timerRef.current) clearTimeout(timerRef.current)
                      setLoaded(true)
                    }}
                    className="w-full rounded-xl block"
                    style={{ height: 'clamp(400px, 55vw, 600px)' }}
                  />
                  {/* Overlay — bottom-left watermark */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: '140px',
                      height: '44px',
                      backgroundColor: '#050508',
                      zIndex: 10,
                      pointerEvents: 'none',
                    }}
                  />
                  {/* Overlay — top-left logo (mobile) */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '140px',
                      height: '44px',
                      backgroundColor: '#050508',
                      zIndex: 10,
                      pointerEvents: 'none',
                    }}
                  />
                </div>
              </>
            )}
          </div>

          {/* Instruction */}
          <p className="text-center mt-4 font-dm-sans text-[13px] text-white/40 flex items-center justify-center gap-2">
            <span>🖱️</span>
            Haz clic y arrastra para explorar en 360°
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <button
            onClick={() => scrollTo('formulario')}
            className="px-8 py-3 bg-splat-cyan text-black font-rajdhani font-bold text-lg rounded
                       hover:opacity-90 transition-opacity"
          >
            ¿Quieres esto para tu propiedad?
          </button>
        </motion.div>

        {/* Credit */}
        <p className="text-center mt-6 font-dm-sans text-[11px] text-white/25">
          Demo: Royal York Hotel Lobby, Toronto · vía SuperSplat
        </p>
      </div>
    </section>
  )
}
