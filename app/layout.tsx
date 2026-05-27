import type { Metadata } from 'next'
import { Rajdhani, DM_Sans } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import CustomCursor from '@/components/CustomCursor'

const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-rajdhani',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'SplatSpace — Tours 3D para Propiedades en Chile',
  description:
    'Escanea tu propiedad con tecnología 3D Gaussian Splatting. Tus clientes la recorren en el browser, sin apps ni VR. Desde $99.000 CLP.',
  keywords:
    'tour virtual 3D, gaussian splatting, inmobiliaria Chile, tour virtual propiedad, escaneo 3D Santiago',
  openGraph: {
    title: 'SplatSpace — Tours 3D para Propiedades en Chile',
    description:
      'Escanea tu propiedad con tecnología 3D Gaussian Splatting. Tus clientes la recorren en el browser, sin apps ni VR. Desde $99.000 CLP.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${rajdhani.variable} ${dmSans.variable} font-dm-sans bg-splat-black text-white antialiased`}
      >
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-E5DS61LQMS"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-E5DS61LQMS');
          `}
        </Script>
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}
