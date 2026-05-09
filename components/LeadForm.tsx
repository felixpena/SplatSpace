'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const FORMSPREE = 'https://formspree.io/f/mojrklvg'

interface FormData {
  nombre: string
  whatsapp: string
  email: string
  tipoInmueble: string
  cantidadEscaneos: string
  cuando: string
  ciudad: string
}

const initialData: FormData = {
  nombre: '',
  whatsapp: '',
  email: '',
  tipoInmueble: '',
  cantidadEscaneos: '',
  cuando: '',
  ciudad: '',
}

function ProgressBar({ step }: { step: number }) {
  return (
    <div className="flex gap-2 mb-8">
      {[1, 2].map((s) => (
        <div key={s} className="flex-1 h-1 rounded-full bg-white/10 overflow-hidden">
          <motion.div
            className="h-full bg-splat-cyan rounded-full"
            animate={{ width: step >= s ? '100%' : '0%' }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          />
        </div>
      ))}
    </div>
  )
}

function InputField({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  required,
}: {
  label: string
  type?: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  error?: string
  required?: boolean
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-dm-sans text-sm text-white/70">
        {label} {required && <span className="text-splat-coral">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-4 py-3 rounded-lg bg-white/5 border text-white
                    font-dm-sans text-sm placeholder:text-white/30 focus:outline-none
                    focus:border-splat-cyan transition-colors
                    ${error ? 'border-splat-coral' : 'border-white/15'}`}
      />
      {error && <span className="text-splat-coral text-xs font-dm-sans">{error}</span>}
    </div>
  )
}

function RadioGroup({
  label,
  options,
  value,
  onChange,
  error,
}: {
  label: string
  options: string[]
  value: string
  onChange: (v: string) => void
  error?: string
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-dm-sans text-sm text-white/70">
        {label} <span className="text-splat-coral">*</span>
      </label>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`px-4 py-2 rounded-lg border text-sm font-dm-sans transition-all duration-200
              ${value === opt
                ? 'border-splat-cyan bg-splat-cyan/10 text-splat-cyan'
                : 'border-white/15 text-white/60 hover:border-white/30'
              }`}
          >
            {opt}
          </button>
        ))}
      </div>
      {error && <span className="text-splat-coral text-xs font-dm-sans">{error}</span>}
    </div>
  )
}

export default function LeadForm() {
  const [step,    setStep]    = useState(1)
  const [data,    setData]    = useState<FormData>(initialData)
  const [errors,  setErrors]  = useState<Partial<FormData>>({})
  const [status,  setStatus]  = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const set = (field: keyof FormData) => (val: string) => {
    setData((d) => ({ ...d, [field]: val }))
    if (errors[field]) setErrors((e) => ({ ...e, [field]: '' }))
  }

  const validateStep1 = () => {
    const e: Partial<FormData> = {}
    if (!data.nombre.trim())   e.nombre   = 'Este campo es requerido'
    if (!data.whatsapp.trim()) e.whatsapp = 'Este campo es requerido'
    if (!data.email.trim() || !/\S+@\S+\.\S+/.test(data.email))
      e.email = 'Ingresa un email válido'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const validateStep2 = () => {
    const e: Partial<FormData> = {}
    if (!data.tipoInmueble)      e.tipoInmueble      = 'Selecciona una opción'
    if (!data.cantidadEscaneos)  e.cantidadEscaneos  = 'Selecciona una opción'
    if (!data.cuando)            e.cuando            = 'Selecciona una opción'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const goNext = () => {
    if (validateStep1()) setStep(2)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateStep2()) return

    setStatus('loading')
    try {
      const res = await fetch(FORMSPREE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="formulario" className="section-pad px-4 bg-splat-black">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                       bg-splat-coral/10 border border-splat-coral/30 mb-5"
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="w-2 h-2 rounded-full bg-splat-coral animate-pulse flex-shrink-0" />
            <span className="font-dm-sans text-sm text-splat-coral">
              Solo 3 slots disponibles esta semana en Santiago
            </span>
          </motion.div>

          <h2 className="font-rajdhani font-bold text-white text-[36px] sm:text-[48px] mb-3">
            Agenda tu{' '}
            <span className="text-splat-cyan">primer escaneo</span>
          </h2>
          <p className="font-dm-sans text-sm text-white/50">
            Sin compromiso · Te contactamos en menos de 6 horas
          </p>
        </div>

        {/* Form card */}
        <div className="glass-card rounded-2xl p-6 sm:p-8">
          {status === 'success' ? (
            <motion.div
              className="flex flex-col items-center text-center py-8 gap-5"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              <div className="w-20 h-20 rounded-full bg-splat-cyan/10 border border-splat-cyan/30 flex items-center justify-center">
                <motion.span
                  className="text-4xl"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                >
                  ✓
                </motion.span>
              </div>
              <div>
                <h3 className="font-rajdhani font-bold text-2xl text-white mb-2">¡Listo!</h3>
                <p className="font-dm-sans text-white/60 mb-4">
                  Te contactamos en menos de 6 horas.
                </p>
                <button
                  onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-splat-cyan font-dm-sans text-sm hover:underline"
                >
                  Mientras tanto, explora el demo 3D →
                </button>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <ProgressBar step={step} />

              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    className="flex flex-col gap-5"
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="font-rajdhani font-semibold text-white text-lg mb-1">
                      Paso 1 — Tu contacto
                    </p>

                    <InputField
                      label="Nombre completo"
                      value={data.nombre}
                      onChange={set('nombre')}
                      placeholder="Tu nombre"
                      error={errors.nombre}
                      required
                    />
                    <InputField
                      label="WhatsApp"
                      type="tel"
                      value={data.whatsapp}
                      onChange={set('whatsapp')}
                      placeholder="+56 9 xxxx xxxx"
                      error={errors.whatsapp}
                      required
                    />
                    <InputField
                      label="Email"
                      type="email"
                      value={data.email}
                      onChange={set('email')}
                      placeholder="tu@email.com"
                      error={errors.email}
                      required
                    />

                    <button
                      type="button"
                      onClick={goNext}
                      className="w-full mt-2 py-3 bg-splat-cyan text-black font-rajdhani font-bold
                                 text-lg rounded-lg hover:opacity-90 transition-opacity"
                    >
                      Siguiente →
                    </button>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    className="flex flex-col gap-5"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 40 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="font-rajdhani font-semibold text-white text-lg mb-1">
                      Paso 2 — Tu proyecto
                    </p>

                    {/* Tipo inmueble */}
                    <div className="flex flex-col gap-1.5">
                      <label className="font-dm-sans text-sm text-white/70">
                        Tipo de inmueble <span className="text-splat-coral">*</span>
                      </label>
                      <select
                        value={data.tipoInmueble}
                        onChange={(e) => set('tipoInmueble')(e.target.value)}
                        className={`w-full px-4 py-3 rounded-lg bg-white/5 border text-white
                                    font-dm-sans text-sm focus:outline-none focus:border-splat-cyan
                                    transition-colors appearance-none
                                    ${errors.tipoInmueble ? 'border-splat-coral' : 'border-white/15'}`}
                        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%2300F5FF' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '20px' }}
                      >
                        <option value="" className="bg-splat-black">Selecciona…</option>
                        {[
                          'Casa / Departamento',
                          'Airbnb',
                          'Venue o evento',
                          'Concesionaria',
                          'Museo o showroom',
                          'Otro',
                        ].map((o) => (
                          <option key={o} value={o} className="bg-splat-black">{o}</option>
                        ))}
                      </select>
                      {errors.tipoInmueble && (
                        <span className="text-splat-coral text-xs font-dm-sans">{errors.tipoInmueble}</span>
                      )}
                    </div>

                    <RadioGroup
                      label="¿Cuántos escaneos necesitas?"
                      options={['1 escaneo', '2 a 5 escaneos', '6 o más escaneos']}
                      value={data.cantidadEscaneos}
                      onChange={set('cantidadEscaneos')}
                      error={errors.cantidadEscaneos}
                    />

                    <RadioGroup
                      label="¿Cuándo lo necesitas?"
                      options={['Esta semana', 'Este mes', 'Solo estoy cotizando']}
                      value={data.cuando}
                      onChange={set('cuando')}
                      error={errors.cuando}
                    />

                    <InputField
                      label="Ciudad"
                      value={data.ciudad}
                      onChange={set('ciudad')}
                      placeholder="Ej: Santiago, Las Condes"
                    />

                    {status === 'error' && (
                      <div className="flex items-center gap-2 p-3 rounded-lg bg-splat-coral/10 border border-splat-coral/30">
                        <span className="text-splat-coral text-sm font-dm-sans">
                          Algo salió mal. Por favor intenta de nuevo.
                        </span>
                        <button
                          type="button"
                          onClick={() => setStatus('idle')}
                          className="ml-auto text-splat-coral text-xs underline font-dm-sans"
                        >
                          Reintentar
                        </button>
                      </div>
                    )}

                    <div className="flex gap-4 items-center mt-2">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="text-white/50 font-dm-sans text-sm hover:text-white transition-colors"
                      >
                        ← Volver
                      </button>
                      <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="flex-1 py-3 bg-splat-cyan text-black font-rajdhani font-bold
                                   text-lg rounded-lg hover:opacity-90 transition-opacity
                                   disabled:opacity-60 flex items-center justify-center gap-2"
                      >
                        {status === 'loading' ? (
                          <>
                            <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                            Enviando…
                          </>
                        ) : (
                          'Solicitar mi demo gratis 🚀'
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          )}
        </div>

        {/* WhatsApp alternative */}
        <div className="text-center mt-8">
          <p className="font-dm-sans text-sm text-white/40 mb-3">¿Prefieres escribirnos directo?</p>
          <a
            href="https://wa.me/56900000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-green-500/40
                       text-green-400 font-dm-sans text-sm hover:bg-green-500/10 transition-colors duration-200"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Escribir por WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
