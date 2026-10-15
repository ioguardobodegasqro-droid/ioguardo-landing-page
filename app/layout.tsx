import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://ioguardo.mx";
const SITE_NAME = "io guardo";
const SITE_TITLE = "io guardo | Bodegas y Mini Bodegas en Querétaro";
const SITE_DESCRIPTION =
  "Renta de bodegas y mini bodegas en Querétaro desde 3 m² hasta 22.5 m². Almacenamiento seguro en Parque Industrial TerraPark Centenario. Acceso controlado, precios accesibles y contratos flexibles desde 3 meses.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  icons: {
    icon: [
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
    ],
    shortcut: "/favicon.svg",
  },
  keywords: [
    "bodegas en Querétaro",
    "mini bodegas Querétaro",
    "renta de bodegas",
    "almacenamiento Querétaro",
    "self storage Querétaro",
    "bodegas TerraPark",
    "mini almacén Querétaro",
    "bodega segura Querétaro",
    "renta bodega barata Querétaro",
    "almacenamiento personal Querétaro",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: `${SITE_URL}/hero-exterior.webp`,
        width: 1200,
        height: 630,
        alt: "io guardo - Bodegas y mini bodegas en Querétaro",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [`${SITE_URL}/hero-exterior.webp`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "l__VBwVV6DZoUi4A3yNASNIbycU91tpNWDFJzq3JICE",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SelfStorage",
      "@id": `${SITE_URL}/#business`,
      name: "io guardo",
      description: SITE_DESCRIPTION,
      url: SITE_URL,
      logo: `${SITE_URL}/logo.svg`,
      image: `${SITE_URL}/hero-exterior.webp`,
      telephone: "",
      email: "ioguardoadmon@gmail.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Parque Industrial TerraPark Centenario",
        addressLocality: "Querétaro",
        addressRegion: "Querétaro",
        addressCountry: "MX",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 20.6658,
        longitude: -100.297199,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "18:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: "Saturday",
          opens: "10:00",
          closes: "14:00",
        },
      ],
      priceRange: "$$",
      areaServed: {
        "@type": "City",
        name: "Querétaro",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Bodegas disponibles",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Product",
              name: "Locker 3 m²",
            },
            price: "2100",
            priceCurrency: "MXN",
            unitText: "mes",
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Product",
              name: "Bodega 6 m²",
            },
            price: "3600",
            priceCurrency: "MXN",
            unitText: "mes",
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Product",
              name: "Bodega 22.5 m²",
            },
            price: "9800",
            priceCurrency: "MXN",
            unitText: "mes",
          },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      publisher: { "@id": `${SITE_URL}/#business` },
      inLanguage: "es-MX",
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: SITE_TITLE,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#business` },
      description: SITE_DESCRIPTION,
      inLanguage: "es-MX",
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "¿Qué puedo guardar en mi bodega?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Objetos personales, muebles, documentos, inventario y más. Está prohibido almacenar materiales peligrosos, sustancias inflamables u objetos que infrinjan la ley.",
          },
        },
        {
          "@type": "Question",
          name: "¿Cuál es el horario de acceso?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Lunes a viernes de 9:00 a 18:00 hrs y sábados de 10:00 a 14:00 hrs. Domingos cerrado.",
          },
        },
        {
          "@type": "Question",
          name: "¿Cuál es el plazo mínimo de renta?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "El plazo mínimo de renta es de 3 meses.",
          },
        },
        {
          "@type": "Question",
          name: "¿Cómo puedo cancelar mi contrato?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Con 30 días de aviso previo, según lo estipulado en tu contrato.",
          },
        },
        {
          "@type": "Question",
          name: "¿Puedo cambiar el tamaño de mi bodega?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sí, ofrecemos flexibilidad para adaptarte a tus necesidades. Puedes solicitar un cambio de tamaño sujeto a disponibilidad.",
          },
        },
        {
          "@type": "Question",
          name: "¿Qué documentos necesito para rentar?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Identificación oficial y comprobante de domicilio. Además se requiere un depósito de garantía equivalente a 1 mes de renta.",
          },
        },
        {
          "@type": "Question",
          name: "¿Los precios incluyen IVA?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No, todos los precios publicados son más IVA.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
