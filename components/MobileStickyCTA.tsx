'use client'

export default function MobileStickyCTA() {
  const scrollTo = () => {
    document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 p-4 md:hidden bg-splat-black/95 backdrop-blur-md border-t border-white/10">
      <button
        onClick={scrollTo}
        className="w-full py-4 bg-splat-cyan text-black font-rajdhani font-bold text-lg rounded-lg tracking-wide active:opacity-80 transition-opacity"
      >
        Solicitar demo →
      </button>
    </div>
  )
}
