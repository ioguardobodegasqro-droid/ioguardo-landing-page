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

const legalLinks = [
  { label: "Aviso de Privacidad", href: "#" },
  { label: "Términos y Condiciones", href: "#" },
];

export default function Home() {
  return (
    <div className="bg-surface text-primary" id="inicio">
      <div className="mx-auto min-h-screen max-w-6xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <Header />
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
  return (
    <header className="flex flex-col gap-4 border-b border-primary/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <Image
          src="/logo_new.webp"
          alt="logo io guardo"
          width={988}
          height={365}
          className="h-12 w-auto"
          priority
        />
        <span className="text-xs uppercase tracking-[0.2em] text-muted">
          Bodegas en Querétaro
        </span>
      </div>
      <nav className="flex flex-wrap items-center gap-4 text-sm font-semibold text-primary">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="transition hover:text-secondary"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="grid gap-10 pt-12 lg:grid-cols-2 lg:items-center">
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
    <section className="mt-[var(--section-space)]" id="beneficios">
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
      <div className="mt-8 overflow-hidden rounded-3xl shadow-lg">
        <Image
          src="/hero-exterior.webp"
          alt="Fachada de las instalaciones io guardo en Parque Industrial TerraPark"
          width={1600}
          height={1067}
          className="h-64 w-full object-cover lg:h-96"
        />
      </div>
    </section>
  );
}

function StorageSection() {
  return (
    <section className="mt-[var(--section-space)]" id="bodegas">
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
              ${option.monthlyPrice.toLocaleString()}
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
  { src: "/interior-twofloor-wide.webp", alt: "Estructura de dos pisos con escaleras" },
  { src: "/interior-lockers-wide.webp", alt: "Pasillo de lockers y bodegas pequeñas numeradas" },
  { src: "/interior-corridor-wide.webp", alt: "Pasillo de bodegas grandes en planta baja" },
  { src: "/location-exterior.webp", alt: "Exterior de las instalaciones" },
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
            <div key={photo.src} className="w-full flex-shrink-0">
              <button
                type="button"
                onClick={() => setIsLightboxOpen(true)}
                className="relative block aspect-[4/3] w-full cursor-zoom-in sm:aspect-[16/10]"
                aria-label={`Abrir ${photo.alt}`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 640px) 80vw, 100vw"
                  className="object-cover"
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
    <section className="mt-[var(--section-space)]" id="planos">
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
    <section className="mt-[var(--section-space)]" id="ubicacion">
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
            <ClockIcon className="mt-1 h-5 w-5 shrink-0 text-secondary" />
            <div>
              <p className="font-semibold text-primary">Horario de atención</p>
              <p className="text-muted">Lunes a viernes: 9:00 – 18:00 hrs</p>
              <p className="text-muted">Sábado: 10:00 – 14:00 hrs</p>
              <p className="text-muted">Domingo: Cerrado</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <KeyIcon className="mt-1 h-5 w-5 shrink-0 text-secondary" />
            <p className="font-semibold text-primary">Horario de acceso</p>
            <div>
              <p className="text-muted">24 horas, 7 días a la semana.</p>
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
            src="/location-exterior.webp"
            alt="Vista exterior de las instalaciones io guardo"
            width={1600}
            height={1067}
            className="h-auto w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="mt-[var(--section-space)]" id="contacto">
      <div className="rounded-[40px] bg-primary px-6 py-10 text-white shadow-2xl lg:px-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-secondary/70">
              Hablemos
            </p>
            <h2 className="mt-4 font-heading text-3xl font-semibold text-white">
              Cuéntanos qué necesitas guardar
            </h2>
            <p className="mt-3 text-sm text-white/80">
              Envíanos un mensaje para agendar una visita, solicitar una
              cotización o resolver cualquier duda.
            </p>
            <div className="mt-8 space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <LocationIcon className="mt-1 h-5 w-5 text-secondary" />
                <div>
                  <p className="font-semibold">Dirección</p>
                  <p className="text-white/80">
                    Parque Industrial TerraPark Centenario, Querétaro, México
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ClockIcon className="mt-1 h-5 w-5 text-secondary" />
                <div>
                  <p className="font-semibold">Horario</p>
                  <p className="text-white/80">
                    L-V 9:00–18:00 · Sáb 10:00–14:00
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ClockIcon className="mt-1 h-5 w-5 text-secondary" />
                <div>
                  <p className="font-semibold">Horario de acceso</p>
                  <p className="text-white/80">
                    Contamos con acceso las 24 horas los 7 días de la semana. (24/7)
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <form
              action="https://formsubmit.co/ioguardoadmon@gmail.com"
              method="POST"
              className="space-y-4"
            >
              {/* FormSubmit config */}
              <input type="hidden" name="_subject" value="Nuevo contacto desde io guardo" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_next" value="https://ioguardo.mx/#contacto" />
              <input type="text" name="_honey" className="hidden" />

              <label className="block text-sm font-semibold">
                Nombre completo
                <input
                  type="text"
                  name="nombre"
                  required
                  className="mt-2 w-full rounded-2xl border border-white/25 bg-transparent px-4 py-3 text-sm placeholder:text-white/60 focus:border-secondary focus:outline-none"
                  placeholder="Tu nombre"
                />
              </label>
              <label className="block text-sm font-semibold">
                Email
                <input
                  type="email"
                  name="email"
                  required
                  className="mt-2 w-full rounded-2xl border border-white/25 bg-transparent px-4 py-3 text-sm placeholder:text-white/60 focus:border-secondary focus:outline-none"
                  placeholder="tu@email.com"
                />
              </label>
              <label className="block text-sm font-semibold">
                Teléfono
                <input
                  type="tel"
                  name="telefono"
                  className="mt-2 w-full rounded-2xl border border-white/25 bg-transparent px-4 py-3 text-sm placeholder:text-white/60 focus:border-secondary focus:outline-none"
                  placeholder="Tu teléfono"
                />
              </label>
              <label className="block text-sm font-semibold">
                Tipo de mensaje
                <select
                  name="tipo_mensaje"
                  className="mt-2 w-full rounded-2xl border border-white/25 bg-transparent px-4 py-3 text-sm text-white focus:border-secondary focus:outline-none"
                >
                  <option className="text-primary" value="cotizacion">
                    Quiero una cotización
                  </option>
                  <option className="text-primary" value="visita">
                    Quiero agendar una visita
                  </option>
                  <option className="text-primary" value="dudas">
                    Otras dudas
                  </option>
                </select>
              </label>
              <button
                type="submit"
                className="w-full rounded-full bg-secondary px-4 py-3 text-sm font-semibold uppercase tracking-wide text-primary"
              >
                Contáctame
              </button>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section className="mt-[var(--section-space)]" id="faq">
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

function Footer() {
  return (
    <footer className="mt-12 border-t border-white/20 pt-6 text-sm text-white/80">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <WarehouseIcon className="h-6 w-6 text-secondary" />
            <span className="font-heading text-lg font-semibold text-white">
              io guardo
            </span>
          </div>
          <p className="text-xs text-white/60">
            Parque Industrial TerraPark Centenario, Querétaro, México
          </p>
          <div className="flex flex-wrap gap-4 text-xs uppercase tracking-[0.3em]">
            {legalLinks.map((link) => (
              <a key={link.label} href={link.href} className="hover:text-white">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
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

function WarehouseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      {...props}
    >
      <path d="M2 10 12 4l10 6" />
      <path d="M4 10v10h16V10" />
      <path d="M9 21V9h6v12" />
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
      {...props}
    >
      <rect x="2" y="10" width="20" height="12" rx="2" />
      <path d="M6 10V6a6 6 0 0 1 12 0v4" />
      <line x1="6" x2="6" y1="10" y2="14" />
      <line x1="18" x2="18" y1="10" y2="14" />
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
        className="group flex items-center gap-2.5 rounded-full bg-[#25D366] px-4 py-3 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#20ba59] hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
      >
        <WhatsAppIcon className="h-6 w-6 shrink-0 fill-white" />
        <span className="text-xs font-semibold tracking-wide sm:text-sm">
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
