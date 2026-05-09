'use client'

function CubeLogo() {
  return (
    <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
      <path d="M14 2L26 8.5V19.5L14 26L2 19.5V8.5L14 2Z" stroke="#00F5FF" strokeWidth="1.5" fill="none"/>
      <path d="M14 2L14 26M2 8.5L26 8.5M2 19.5L26 19.5" stroke="#00F5FF" strokeWidth="0.75" strokeDasharray="2 2" opacity="0.5"/>
      <path d="M14 14L26 8.5M14 14L2 8.5" stroke="#00F5FF" strokeWidth="1" opacity="0.7"/>
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

const cols = [
  {
    title: 'Servicios',
    links: ['Propiedades', 'Airbnbs', 'Venues', 'Empresas'],
  },
  {
    title: 'Empresa',
    links: ['Cómo funciona', 'Cotización', 'FAQ', 'Contacto'],
  },
]

const scrollMap: Record<string, string> = {
  'Cómo funciona': 'como-funciona',
  Cotización: 'precios',
  FAQ: 'faq-section',
  Contacto: 'formulario',
}

export default function Footer() {
  const scrollTo = (label: string) => {
    const id = scrollMap[label]
    if (id) document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="bg-splat-black border-t border-white/[0.06] pt-14 pb-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <CubeLogo />
              <span className="font-rajdhani font-bold text-lg text-white">SplatSpace</span>
            </div>
            <p className="font-dm-sans text-[13px] text-white/45 leading-relaxed max-w-[200px]">
              El futuro del tour inmobiliario, hoy.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-4 mt-5">
              <a
                href="#"
                aria-label="Instagram"
                className="text-white/40 hover:text-splat-cyan transition-colors duration-200"
              >
                <InstagramIcon />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="text-white/40 hover:text-splat-cyan transition-colors duration-200"
              >
                <LinkedInIcon />
              </a>
              <a
                href="https://wa.me/56900000000"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="text-white/40 hover:text-splat-cyan transition-colors duration-200"
              >
                <WhatsAppIcon />
              </a>
            </div>
          </div>

          {/* Nav columns */}
          {cols.map((col) => (
            <div key={col.title}>
              <p className="font-rajdhani font-semibold text-white text-sm tracking-wide uppercase mb-4">
                {col.title}
              </p>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <button
                      onClick={() => scrollTo(link)}
                      className="font-dm-sans text-[13px] text-white/45 hover:text-white transition-colors duration-150 text-left"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <p className="font-rajdhani font-semibold text-white text-sm tracking-wide uppercase mb-4">
              Contacto
            </p>
            <ul className="flex flex-col gap-2.5">
              <li>
                <a
                  href="mailto:hola@splatspace.cl"
                  className="font-dm-sans text-[13px] text-white/45 hover:text-splat-cyan transition-colors duration-150"
                >
                  hola@splatspace.cl
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/56900000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-dm-sans text-[13px] text-white/45 hover:text-splat-cyan transition-colors duration-150"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="font-dm-sans text-[13px] text-white/45 hover:text-splat-cyan transition-colors duration-150"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="font-dm-sans text-[13px] text-white/45 hover:text-splat-cyan transition-colors duration-150"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/[0.06] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-dm-sans text-[12px] text-white/30">
            © 2025 SplatSpace SpA · Hecho en Chile 🇨🇱
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="font-dm-sans text-[12px] text-white/30 hover:text-white/60 transition-colors">
              Política de privacidad
            </a>
            <span className="text-white/20">·</span>
            <a href="#" className="font-dm-sans text-[12px] text-white/30 hover:text-white/60 transition-colors">
              Términos de servicio
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
