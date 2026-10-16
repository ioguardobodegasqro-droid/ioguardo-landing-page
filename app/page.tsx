"use client";

import Image from "next/image";
import type { SVGProps } from "react";
import { useState, useEffect, useCallback } from "react";
import storageOptionsData from "@/data/storageOptions.json";

type StorageOption = {
  id: string;
  title: string;
  tipo: string;
  size: string;
  monthlyPrice: number;
  cta: string;
};

const storageOptions = storageOptionsData as StorageOption[];

const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Bodegas y Precios", href: "#bodegas" },
  { label: "Planos", href: "#planos" },
  { label: "Ubicación", href: "#ubicacion" },
  { label: "Contacto", href: "#contacto" },
  { label: "FAQ", href: "#faq" },
];

const benefits = [
  {
    title: "Almacenamiento Seguro",
    description:
      "Instalaciones dentro de parque industrial con acceso controlado para la protección de tus pertenencias.",
    icon: ShieldIcon,
  },
  {
    title: "Flexibilidad de Espacios",
    description:
      "Desde lockers de 3 m² hasta bodegas de 22.5 m². Plazos desde 3 meses con opción de cambiar de tamaño.",
    icon: ResizeIcon,
  },
  {
    title: "Descuentos por Pago Anticipado",
    description:
      "4% de descuento en pago bimestral y 7% en pago semestral o anual.",
    icon: TagIcon,
  },
  {
    title: "Ubicación Estratégica",
    description:
      "Parque Industrial TerraPark Centenario, Querétaro. Fácil acceso y estacionamiento.",
    icon: PinIcon,
  },
];

const faqItems = [
  {
    question: "¿Qué puedo guardar en mi bodega?",
    answer:
      "Objetos personales, muebles, documentos, inventario y más. Está prohibido almacenar materiales peligrosos, sustancias inflamables u objetos que infrinjan la ley.",
  },
  {
    question: "¿Cuál es el horario de acceso?",
    answer:
      "Contamos con acceso las 24 horas los 7 días de la semana. (24/7)",
  },
  {
    question: "¿Cuál es el plazo mínimo de renta?",
    answer: "El plazo mínimo de renta es de 3 meses.",
  },
  {
    question: "¿Cómo puedo cancelar mi contrato?",
    answer:
      "Con 30 días de aviso previo, según lo estipulado en tu contrato.",
  },
  {
    question: "¿Puedo cambiar el tamaño de mi bodega?",
    answer:
      "Sí, ofrecemos flexibilidad para adaptarte a tus necesidades. Puedes solicitar un cambio de tamaño sujeto a disponibilidad.",
  },
  {
    question: "¿Qué documentos necesito para rentar?",
    answer:
      "Identificación oficial y comprobante de domicilio. Además se requiere un depósito de garantía equivalente a 1 mes de renta.",
  },
  {
    question: "¿Los precios incluyen IVA?",
    answer:
      "No, todos los precios publicados son más IVA.",
  },
];

export default function Home() {
  return (
    <div className="bg-surface text-primary" id="inicio">
      <Header />
      <div className="mx-auto min-h-screen max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <Hero />
        <Benefits />
        <StorageSection />
        <FloorPlans />
        <Location />
        <Contact />
        <FAQ />
      </div>
      <WhatsAppButton />
    </div>
  );
}

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-primary/10 bg-surface/90 shadow-xs backdrop-blur-md transition-colors">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <a href="#inicio" className="flex items-center gap-3">
            <Image
              src="/logo.svg"
              alt="logo io guardo"
              width={411}
              height={153}
              className="h-9 w-auto sm:h-11"
              priority
            />
          </a>
          <span className="hidden text-xs uppercase tracking-[0.2em] text-muted sm:inline">
            Bodegas en Querétaro
          </span>
        </div>

        {/* Navegación Desktop */}
        <nav className="hidden items-center gap-6 text-sm font-semibold text-primary md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="transition hover:text-secondary"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://wa.me/5214422833260?text=Hola,%20quiero%20cotizar%20una%20bodega%20en%20io%20guardo."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-secondary/90"
          >
            <WhatsAppIcon className="h-4 w-4 shrink-0 fill-white" />
            <span>Cotizar</span>
          </a>
        </nav>

        {/* Botón Menú Móvil */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/15 bg-white/60 text-primary transition hover:bg-white hover:text-secondary focus:outline-none md:hidden"
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* Menú Desplegable Móvil */}
      {isOpen && (
        <div className="border-t border-primary/10 bg-surface/95 px-4 pb-6 pt-3 shadow-xl backdrop-blur-lg md:hidden">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between rounded-xl px-4 py-3 text-base font-semibold text-primary transition hover:bg-primary/5 hover:text-secondary"
              >
                <span>{link.label}</span>
                <svg
                  className="h-4 w-4 text-muted/60"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </a>
            ))}
          </nav>

          <div className="mt-4 border-t border-primary/10 pt-4">
            <a
              href="https://wa.me/5214422833260?text=Hola,%20quiero%20cotizar%20una%20bodega%20en%20io%20guardo."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex w-full items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-6 py-3.5 text-center text-sm font-bold text-[#063f1a] shadow-md transition hover:bg-[#20ba59]"
            >
              <WhatsAppIcon className="h-5 w-5 fill-[#063f1a]" />
              <span>Contactar por WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section className="grid gap-10 pt-8 sm:pt-12 lg:grid-cols-2 lg:items-center">
      <div className="space-y-6">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-secondary">
          Bodegas en Querétaro
        </p>
        <h1 className="font-heading text-4xl font-semibold leading-tight text-primary sm:text-5xl">
          Almacenamiento simple, seguro y eficiente.
        </h1>
        <p className="text-lg text-muted">
          Espacios diseñados para ofrecer almacenamiento confiable con acceso
          práctico y sin complicaciones en Parque Industrial TerraPark
          Centenario, Querétaro.
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href="#bodegas"
            className="rounded-full bg-secondary px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-secondary/30 transition hover:-translate-y-0.5"
          >
            Ver Bodegas y Precios
          </a>
          <a
            href="#contacto"
            className="rounded-full border border-primary/30 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-primary transition hover:bg-primary/5"
          >
            Contáctanos
          </a>
        </div>
      </div>
      <PhotoCarousel />
    </section>
  );
}

function Benefits() {
  return (
    <section className="mt-(--section-space) scroll-mt-24" id="beneficios">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-secondary">
        ¿Por qué io guardo?
      </p>
      <h2 className="mt-4 font-heading text-3xl font-semibold text-primary">
        Tu espacio de confianza
      </h2>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {benefits.map((benefit) => (
          <article
            key={benefit.title}
            className="rounded-2xl border border-primary/10 bg-white p-6 shadow-sm"
          >
            <benefit.icon className="h-10 w-10 text-secondary" />
            <h3 className="mt-4 text-xl font-semibold text-primary">
              {benefit.title}
            </h3>
            <p className="mt-2 text-muted">{benefit.description}</p>
          </article>
        ))}
      </div>
      <div className="relative mt-10 w-full overflow-hidden rounded-3xl shadow-2xl md:mx-auto md:max-w-[75%] lg:max-w-[70%]">
        <div className="relative h-72 w-full sm:h-96 lg:h-[440px]">
          <Image
            src="/img/fachada.webp"
            alt="Fachada de las instalaciones io guardo en Parque Industrial TerraPark"
            fill
            sizes="(min-width: 1024px) 70vw, (min-width: 768px) 75vw, 100vw"
            className="object-cover object-center"
          />
          {/* Gradiente para armonizar y asegurar legibilidad */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
        </div>

        {/* Backdrop con frase inspiradora */}
        <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:max-w-lg md:max-w-md">
          <div className="rounded-2xl border border-white/20 bg-primary/80 p-4 shadow-2xl backdrop-blur-md sm:p-5">
            <p className="font-heading text-base font-semibold leading-snug text-white sm:text-lg">
              “Más que un espacio de almacenamiento, la extensión segura de tu hogar y negocio.”
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function formatPrice(price: number): string {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function StorageSection() {
  return (
    <section className="mt-(--section-space) scroll-mt-24" id="bodegas">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-secondary">
        Bodegas y precios
      </p>
      <h2 className="mt-4 font-heading text-3xl font-semibold text-primary">
        Encuentra el Espacio Ideal
      </h2>
      <p className="mt-2 text-sm text-muted">
        Tarifa base: $350 MXN por m² + IVA · Precios mensuales
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {storageOptions.map((option) => (
          <article
            key={option.id}
            className="flex flex-col items-center rounded-2xl border border-primary/10 bg-white px-4 py-6 text-center shadow-sm transition hover:-translate-y-1 hover:border-secondary/50"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">
              {option.title}
            </p>
            <p className="mt-0.5 text-xs text-muted">Tipo {option.tipo} · {option.size}</p>
            <p className="mt-3 text-3xl font-bold text-primary">
              ${formatPrice(option.monthlyPrice)}
              <span className="text-sm font-normal text-muted">/mes</span>
            </p>
            <p className="mt-0.5 text-xs text-muted">+ IVA</p>
            <a
              href="#contacto"
              className="mt-4 w-full rounded-full bg-secondary px-3 py-2.5 text-xs font-semibold uppercase tracking-wide text-white transition hover:-translate-y-0.5"
            >
              {option.cta}
            </a>
          </article>
        ))}
      </div>

      <p className="mt-6 text-sm text-muted">
        Tarifa base: $350 MXN/m² + IVA · Depósito: 1 mes de renta ·
        <strong className="text-primary"> 4% dto. pago bimestral</strong> ·
        <strong className="text-primary"> 7% dto. pago semestral/anual</strong>
      </p>

    </section>
  );
}

const carouselPhotos = [
  { src: "/slides/slide_01.webp", alt: "Instalaciones y pasillos de bodegas io guardo" },
  { src: "/slides/slide_02.webp", alt: "Área de bodegas privadas con iluminación y seguridad" },
  { src: "/slides/slide_03.webp", alt: "Pasillo principal con bodegas de almacenamiento seguro" },
  { src: "/slides/slide_04.webp", alt: "Instalaciones limpias y modernas en Parque Industrial TerraPark" },
  { src: "/slides/slide_05.webp", alt: "Módulos y bodegas numeradas para fácil localización" },
  { src: "/slides/slide_06.webp", alt: "Espacios de almacenamiento amplios y bien ventilados" },
  { src: "/slides/slide_07.webp", alt: "Pasillos amplios para carga, descarga y maniobra" },
  { src: "/slides/slide_08.webp", alt: "Estructura segura con acabados de alta calidad" },
  { src: "/slides/slide_09.webp", alt: "Bodegas y mini bodegas disponibles en io guardo Querétaro" },
];

function PhotoCarousel() {
  const [current, setCurrent] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const next = useCallback(
    () => setCurrent((c) => (c + 1) % carouselPhotos.length),
    []
  );
  const prev = useCallback(
    () => setCurrent((c) => (c - 1 + carouselPhotos.length) % carouselPhotos.length),
    []
  );

  useEffect(() => {
    if (isLightboxOpen) {
      return;
    }
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [isLightboxOpen, next]);

  useEffect(() => {
    if (!isLightboxOpen) {
      document.body.style.overflow = "";
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsLightboxOpen(false);
      }
      if (event.key === "ArrowRight") {
        next();
      }
      if (event.key === "ArrowLeft") {
        prev();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isLightboxOpen, next, prev]);

  return (
    <>
      <div className="relative overflow-hidden rounded-3xl shadow-xl">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {carouselPhotos.map((photo) => (
            <div key={photo.src} className="w-full shrink-0">
              <button
                type="button"
                onClick={() => setIsLightboxOpen(true)}
                className="relative block aspect-4/3 w-full cursor-zoom-in sm:aspect-16/10"
                aria-label={`Abrir ${photo.alt}`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 640px) 80vw, 100vw"
                  className="object-cover object-center"
                />
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-primary shadow backdrop-blur-sm transition hover:bg-white"
          aria-label="Foto anterior"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12 15l-5-5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <button
          type="button"
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-primary shadow backdrop-blur-sm transition hover:bg-white"
          aria-label="Siguiente foto"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M8 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
          {carouselPhotos.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all ${
                i === current ? "w-6 bg-white" : "w-2 bg-white/50"
              }`}
              aria-label={`Ir a foto ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {isLightboxOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 py-6 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Vista completa de la foto"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            type="button"
            onClick={() => setIsLightboxOpen(false)}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20"
            aria-label="Cerrar foto"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              prev();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20"
            aria-label="Foto anterior"
          >
            <svg width="22" height="22" viewBox="0 0 20 20" fill="none"><path d="M12 15l-5-5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>

          <div
            className="relative flex max-h-full w-full max-w-6xl items-center justify-center"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={carouselPhotos[current].src}
              alt={carouselPhotos[current].alt}
              width={1600}
              height={1067}
              className="max-h-[85vh] w-auto max-w-full rounded-2xl object-contain"
            />
          </div>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              next();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20"
            aria-label="Siguiente foto"
          >
            <svg width="22" height="22" viewBox="0 0 20 20" fill="none"><path d="M8 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
      ) : null}
    </>
  );
}

function FloorPlans() {
  const [floor, setFloor] = useState<"baja" | "alta">("baja");
  return (
    <section className="mt-(--section-space) scroll-mt-24" id="planos">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-secondary">
        Planos
      </p>
      <h2 className="mt-4 font-heading text-3xl font-semibold text-primary">
        Conoce la Distribución
      </h2>
      <div className="mt-6 flex items-center gap-3">
        <button
          type="button"
          onClick={() => setFloor("baja")}
          className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
            floor === "baja"
              ? "bg-secondary text-white"
              : "border border-primary/20 text-primary hover:bg-primary/5"
          }`}
        >
          Planta Baja
        </button>
        <button
          type="button"
          onClick={() => setFloor("alta")}
          className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
            floor === "alta"
              ? "bg-secondary text-white"
              : "border border-primary/20 text-primary hover:bg-primary/5"
          }`}
        >
          Planta Alta
        </button>
      </div>
      <div className="mt-6 rounded-3xl border border-primary/10 bg-white p-4 shadow-sm sm:p-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={
            floor === "baja"
              ? "/plano-planta-baja.svg"
              : "/plano-planta-alta.svg"
          }
          alt={`Plano ${floor === "baja" ? "Planta Baja" : "Planta Alta"} — io guardo`}
          className="mx-auto h-auto max-h-[60vh] max-w-md object-contain"
        />
      </div>
    </section>
  );
}

function Location() {
  return (
    <section className="mt-(--section-space) scroll-mt-24" id="ubicacion">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-secondary">
        Ubicación
      </p>
      <h2 className="mt-4 font-heading text-3xl font-semibold text-primary">
        Encuéntranos
      </h2>
      <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:items-center">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <LocationIcon className="mt-1 h-5 w-5 shrink-0 text-secondary" />
            <div>
              <p className="font-semibold text-primary">Dirección</p>
              <p className="text-muted">
                Parque Industrial TerraPark Centenario, Querétaro, México
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <KeyIcon className="mt-1 h-5 w-5 shrink-0 text-secondary" />
            <div>
              <p className="font-semibold text-primary">Horario de acceso</p>
              <p className="text-muted">24 horas, 7 días a la semana. Entra cuando lo necesites.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <ClockIcon className="mt-1 h-5 w-5 shrink-0 text-secondary" />
            <div>
              <p className="font-semibold text-primary">Atención a clientes por whatsapp</p>
              <p className="text-muted">Lunes a viernes: 9:00 – 18:00 hrs</p>
              <p className="text-muted">Sábado: 10:00 – 14:00 hrs</p>
              <p className="text-muted">Domingo: sin atención</p>
            </div>
          </div>

          <a
            href="https://www.google.com/maps/place/20%C2%B039'56.9%22N+100%C2%B017'49.9%22W/@20.6658,-100.297199,17z"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-secondary px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:-translate-y-0.5"
          >
            <PinIcon className="h-4 w-4" />
            Ver en Google Maps
          </a>
        </div>
        <div className="overflow-hidden rounded-3xl shadow-lg">
          <Image
            src="/img/fachada_desde_abajo.webp"
            alt="Fachada exterior de las instalaciones io guardo vista desde abajo"
            width={1600}
            height={1067}
            className="h-auto w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

const contactFacilityPhotos = [
  {
    src: "/img/mini_bodegas.webp",
    alt: "Módulos de mini bodegas y lockers privados para resguardo de pertenencias",
    title: "Mini bodegas y lockers",
    subtitle: "Para documentos y objetos personales",
  },
  {
    src: "/img/pasillos_amplios.webp",
    alt: "Pasillos amplios e iluminados para fácil maniobra, carga y descarga",
    title: "Pasillos para maniobra",
    subtitle: "Comodidad total para carga y descarga",
  },
  {
    src: "/img/asensor.webp",
    alt: "Elevador de carga para acceso cómodo a bodegas en segundo nivel",
    title: "Acceso con elevador",
    subtitle: "Acceso ágil y sin esfuerzo a bodegas en segundo nivel",
  },
  {
    src: "/img/bodegas_amplias.webp",
    alt: "Almacenes grandes y bodegas de gran capacidad para empresas o mudanzas",
    title: "Almacenes grandes",
    subtitle: "Máxima capacidad para inventario, mudanzas y archivo",
  },
];

function PhotoAccordion() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex flex-col gap-3 md:h-[420px] md:flex-row md:gap-3">
      {contactFacilityPhotos.map((photo, index) => {
        const isActive = activeIndex === index;
        return (
          <div
            key={photo.src}
            role="button"
            tabIndex={0}
            onClick={() => setActiveIndex(index)}
            onMouseEnter={() => setActiveIndex(index)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setActiveIndex(index);
              }
            }}
            aria-label={`${photo.title}: ${photo.subtitle}`}
            className={`group relative cursor-pointer overflow-hidden rounded-2xl border border-white/15 bg-white/5 shadow-xl transition-all duration-500 ease-out md:rounded-3xl ${
              isActive
                ? "h-72 flex-none md:h-full md:flex-[3.8]"
                : "h-20 flex-none opacity-80 hover:opacity-100 md:h-full md:flex-1"
            }`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className={`object-cover transition-all duration-700 ease-out ${
                isActive ? "scale-105" : "scale-100 filter brightness-90 md:grayscale-20"
              }`}
            />
            {/* Overlay con degradado */}
            <div
              className={`absolute inset-0 bg-linear-to-t from-primary/95 via-primary/30 to-transparent transition-opacity duration-500 ${
                isActive ? "opacity-100" : "opacity-50 group-hover:opacity-75"
              }`}
            />

            {/* Información al estar activo o en móvil */}
            <div
              className={`absolute bottom-0 left-0 right-0 p-4 transition-all duration-500 md:p-6 ${
                isActive
                  ? "translate-y-0 opacity-100"
                  : "translate-y-1 opacity-90 md:translate-y-4 md:opacity-0"
              }`}
            >
              <h3 className="font-heading text-lg font-semibold text-white sm:text-xl">
                {photo.title}
              </h3>
              {isActive && (
                <p className="mt-1 line-clamp-1 text-xs text-white/80 sm:text-sm">
                  {photo.subtitle}
                </p>
              )}
            </div>

            {/* Título vertical en desktop cuando está comprimido */}
            {!isActive && (
              <div className="absolute inset-0 hidden items-center justify-center p-3 md:flex">
                <span className="rotate-90 whitespace-nowrap text-xs font-semibold uppercase tracking-[0.25em] text-white/70 drop-shadow transition-colors group-hover:text-white">
                  {photo.title}
                </span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function Contact() {
  const whatsappUrl =
    "https://wa.me/5214422833260?text=" +
    encodeURIComponent("Hola, quiero cotizar una bodega en io guardo.");

  return (
    <section className="mt-(--section-space) scroll-mt-24" id="contacto">
      <div className="rounded-[40px] bg-primary px-6 py-10 text-white shadow-2xl lg:px-12 lg:py-16">
        {/* Call to action principal en la parte superior */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
            <span className="h-2 w-2 rounded-full bg-[#25D366] animate-pulse" />
            Atención directa e inmediata
          </div>
          <h2 className="mt-4 font-heading text-3xl font-semibold leading-tight text-white sm:text-4xl">
            ¿Listo para cotizar o agendar tu visita? Escríbenos por WhatsApp
          </h2>
          <p className="mt-4 text-base text-white/80">
            Te respondemos al instante para darte disponibilidad, cotización según tus necesidades de espacio o resolver cualquier duda sin compromiso.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3.5 rounded-full bg-[#25D366] px-8 py-4 text-base font-bold text-[#063f1a] shadow-lg shadow-black/20 transition-all duration-300 hover:scale-105 hover:bg-[#20ba59] hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
            >
              <WhatsAppIcon className="h-8 w-8 shrink-0 fill-[#063f1a]" />
              <span>Enviar mensaje por WhatsApp</span>
            </a>
          </div>
          <p className="mt-3 text-xs text-white/70">
            Respuesta en pocos minutos · Tel. +52 442 283 3260
          </p>
        </div>

        {/* Acordeón de fotografías en la parte inferior */}
        <div className="mt-12 border-t border-white/15 pt-8">
          <div className="mb-5">
            <p className="text-xs uppercase tracking-[0.25em] text-white/70">
              Espacios limpios, seguros y listos para usar
            </p>
          </div>

          <PhotoAccordion />
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section className="mt-(--section-space) scroll-mt-24" id="faq">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-secondary">
        Preguntas frecuentes
      </p>
      <h2 className="mt-4 font-heading text-3xl font-semibold text-primary">
        ¿Tienes dudas?
      </h2>
      <div className="mt-8 space-y-3">
        {faqItems.map((item) => (
          <FAQItem
            key={item.question}
            question={item.question}
            answer={item.answer}
          />
        ))}
      </div>
    </section>
  );
}

function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-primary/10 bg-white">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-6 py-4 text-left"
      >
        <span className="font-semibold text-primary">{question}</span>
        <ChevronIcon
          className={`h-5 w-5 shrink-0 text-muted transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="border-t border-primary/5 px-6 py-4">
          <p className="text-sm text-muted">{answer}</p>
        </div>
      )}
    </div>
  );
}

// Icons
function ResizeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      {...props}
    >
      <path d="M10 4H4v6" />
      <path d="m14 4 6 6" />
      <path d="M20 14v6h-6" />
      <path d="m4 14 6 6" />
    </svg>
  );
}

function ClockIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      {...props}
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function PinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      {...props}
    >
      <path d="M12 21s7-6.158 7-11a7 7 0 0 0-14 0c0 4.842 7 11 7 11z" />
      <circle cx="12" cy="10" r="2" />
    </svg>
  );
}


function ShieldIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      {...props}
    >
      <path d="M12 22s8-3.5 8-11V5l-8-3-8 3v6c0 7.5 8 11 8 11z" />
    </svg>
  );
}

function TagIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      {...props}
    >
      <path d="M12 2 2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  );
}

function LocationIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      {...props}
    >
      <path d="M12 22s6-5 6-10a6 6 0 1 0-12 0c0 5 6 10 6 10z" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

function ChevronIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      {...props}
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}
function KeyIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Reloj en la cabeza de la llave */}
      <circle cx="8" cy="8" r="5" />
      <polyline points="8 5.5 8 8 10 8.5" />
      {/* Espiga y dientes de la llave de candado */}
      <path d="M11.5 11.5L20 20" />
      <path d="M16 16l2-2" />
      <path d="M18 18l2-2" />
    </svg>
  );
}

function WhatsAppButton() {
  const whatsappUrl =
    "https://wa.me/5214422833260?text=" +
    encodeURIComponent("Hola, quiero conocer más sobre las bodegas");

  return (
    <aside
      aria-label="Contacto por WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center"
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp: quiero conocer más sobre las bodegas"
        className="group flex items-center gap-3 rounded-full bg-[#25D366] px-6 py-3.5 text-[#063f1a] shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#20ba59] hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
      >
        <WhatsAppIcon className="h-7 w-7 shrink-0 fill-[#063f1a]" />
        <span className="text-xs font-bold tracking-wide sm:text-sm">
          Quiero conocer más
        </span>
      </a>
    </aside>
  );
}

function WhatsAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.67 12.05 3.67ZM8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7.02 8.48 7.02 9.68C7.02 10.88 7.89 12.04 8.01 12.2C8.13 12.37 9.71 14.81 12.14 15.86C14.16 16.73 14.57 16.56 15.01 16.52C15.45 16.48 16.43 15.94 16.63 15.37C16.83 14.81 16.83 14.32 16.77 14.22C16.71 14.12 16.55 14.06 16.3 13.94C16.05 13.82 14.83 13.22 14.6 13.14C14.38 13.06 14.21 13.02 14.05 13.26C13.88 13.51 13.41 14.06 13.27 14.22C13.12 14.39 12.98 14.41 12.73 14.29C12.49 14.16 11.71 13.91 10.78 13.08C10.05 12.43 9.56 11.63 9.42 11.39C9.28 11.14 9.4 11.01 9.53 10.88C9.64 10.77 9.77 10.6 9.89 10.45C10.02 10.31 10.06 10.21 10.14 10.04C10.22 9.88 10.18 9.74 10.12 9.61C10.06 9.49 9.58 8.31 9.38 7.82C9.18 7.35 8.98 7.41 8.83 7.41C8.68 7.4 8.52 7.39 8.53 7.33Z" />
    </svg>
  );
}
