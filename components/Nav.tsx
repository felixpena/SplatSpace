'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: '¿Cómo funciona?', href: '#como-funciona' },
  { label: 'Cotización',        href: '#precios'       },
  { label: 'Demo 3D',          href: '#demo'          },
  { label: 'Contacto',         href: '#formulario'    },
]

function CubeLogo() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="flex-shrink-0">
      <path d="M14 2L26 8.5V19.5L14 26L2 19.5V8.5L14 2Z" stroke="#00F5FF" strokeWidth="1.5" fill="none"/>
      <path d="M14 2L14 26M2 8.5L26 8.5M2 19.5L26 19.5" stroke="#00F5FF" strokeWidth="0.75" strokeDasharray="2 2" opacity="0.5"/>
      <path d="M14 14L26 8.5M14 14L2 8.5" stroke="#00F5FF" strokeWidth="1" opacity="0.7"/>
    </svg>
  )
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open,     setOpen]     = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (href: string) => {
    setOpen(false)
    const id = href.replace('#', '')
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }, 50)
  }

  return (
    <>
      <motion.nav
        className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? 'rgba(5, 5, 8, 0.92)' : 'transparent',
          backdropFilter:  scrolled ? 'blur(12px)' : 'none',
          borderBottom:    scrolled ? '1px solid rgba(0,245,255,0.08)' : 'none',
        }}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2"
          >
            <CubeLogo />
            <span className="font-rajdhani font-bold text-xl text-white tracking-wide">
              SplatSpace
            </span>
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className="font-dm-sans text-sm text-white/70 hover:text-white transition-colors duration-150"
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <button
            onClick={() => scrollTo('#formulario')}
            className="hidden md:inline-flex items-center px-5 py-2 border border-splat-cyan text-splat-cyan font-rajdhani font-semibold text-sm rounded hover:bg-splat-cyan hover:text-black transition-all duration-200"
          >
            Solicita Demo
          </button>

          {/* Hamburger */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Menú"
          >
            <span
              className={`block h-0.5 w-6 bg-white transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`}
            />
            <span
              className={`block h-0.5 w-6 bg-white transition-all duration-300 ${open ? 'opacity-0' : ''}`}
            />
            <span
              className={`block h-0.5 w-6 bg-white transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 bg-splat-black/98 flex flex-col items-center justify-center gap-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
          >
            {links.map((l, i) => (
              <motion.button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className="font-rajdhani font-bold text-3xl text-white hover:text-splat-cyan transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                {l.label}
              </motion.button>
            ))}
            <motion.button
              onClick={() => scrollTo('#formulario')}
              className="mt-4 px-8 py-3 bg-splat-cyan text-black font-rajdhani font-bold text-xl rounded"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: links.length * 0.07 }}
            >
              Solicita Demo
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
