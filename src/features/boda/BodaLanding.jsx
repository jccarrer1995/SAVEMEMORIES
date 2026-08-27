import { Gift, Music2, Users, Wine } from 'lucide-react'
import { BODA } from './data.js'
import { Countdown } from './components/Countdown.jsx'
import { FadeInOnScroll } from './components/FadeInOnScroll.jsx'
import { FloralMotif, FrameLine, OrnamentLine } from './components/FloralMotif.jsx'
import { RsvpForm } from './components/RsvpForm.jsx'

/**
 * @param {{ grupoInvitados: string, cupos: number }} props
 */
export function BodaLanding({ grupoInvitados, cupos }) {
  return (
    <div className="boda-cream min-h-[100dvh]">
      <HeroSection />
      <SaveTheDateSection />
      <QuoteAndParents />
      <GallerySection />
      <VenueSection venue={BODA.recepcion} floral="right" />
      <TimelineSection />
      <GiftsSection />
      <DressCodeSection />
      <NoKidsAndRsvp grupoInvitados={grupoInvitados} cupos={cupos} />
    </div>
  )
}

function HeroSection() {
  return (
    <section className="relative isolate min-h-[100dvh] overflow-hidden text-center">
      <img
        src={BODA.fotos.hero}
        alt=""
        className="boda-hero-photo absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="boda-hero-veil pointer-events-none absolute inset-0" />
      <FloralMotif className="pointer-events-none absolute -left-12 -top-8 z-10 w-52 opacity-40 brightness-[2.4]" />
      <FloralMotif className="pointer-events-none absolute -right-10 top-16 z-10 w-40 rotate-12 opacity-30 brightness-[2.4]" />

      <div className="relative z-10 flex min-h-[100dvh] flex-col items-center px-6 pb-28 pt-[14vh]">
        <p className="boda-hero-kicker">Nuestra Boda</p>
        <h1 className="boda-hero-name mt-6">{BODA.novio}</h1>
        <p className="boda-hero-amp">&</p>
        <h1 className="boda-hero-name">{BODA.novia}</h1>
      </div>
    </section>
  )
}

function SaveTheDateSection() {
  return (
    <section className="boda-cream px-6 py-12 text-center">
      <FadeInOnScroll>
        <FrameLine className="mx-auto mb-6 w-64" />
        <p className="boda-serif text-[32px] text-[#2c2c2c]">Nuestra Boda</p>
        <Countdown className="mt-3 text-[20px]" />
        <p className="mt-3 text-sm text-[#5c5c5c]">{BODA.fechaLabel}</p>
        <FrameLine className="mx-auto mt-6 w-64" />
      </FadeInOnScroll>
    </section>
  )
}

function QuoteAndParents() {
  return (
    <>
      <section className="boda-quote-bg px-8 py-14 text-center">
        <FadeInOnScroll>
          <p className="text-[15px] leading-relaxed text-[#3a3a3a]">“{BODA.cita}”</p>
        </FadeInOnScroll>
      </section>
      <section className="boda-cream-warm relative overflow-hidden px-6 py-14 text-center">
        <FloralMotif className="pointer-events-none absolute -left-8 top-8 w-36" variant="spray" />
        <FadeInOnScroll>
          <OrnamentLine className="mx-auto mb-6 w-48" />
          <h2 className="boda-serif text-[34px] text-[#2c2c2c]">Nuestros Padres</h2>
          <div className="relative z-10 mt-8 space-y-6 text-sm text-[#3a3a3a]">
            <div>
              <p className="mb-2 text-[11px] tracking-[0.2em] text-[#7a7368]">PADRES DEL NOVIO</p>
              {BODA.padres.novio.map((name) => (
                <p key={name} className="leading-7">
                  {name}
                </p>
              ))}
            </div>
            <div>
              <p className="mb-2 text-[11px] tracking-[0.2em] text-[#7a7368]">PADRES DE LA NOVIA</p>
              {BODA.padres.novia.map((name) => (
                <p key={name} className="leading-7">
                  {name}
                </p>
              ))}
            </div>
          </div>
          <OrnamentLine className="mx-auto mt-8 w-48" />
        </FadeInOnScroll>
      </section>
    </>
  )
}

function GallerySection() {
  return (
    <section className="boda-cream space-y-4 px-5 py-8">
      {BODA.fotos.galeria.map((src, index) => (
        <FadeInOnScroll key={src} delay={index * 0.08}>
          <img
            src={src}
            alt={`${BODA.novio} y ${BODA.novia} ${index + 1}`}
            className="aspect-[4/5] w-full object-cover"
          />
        </FadeInOnScroll>
      ))}
    </section>
  )
}

/**
 * @param {{ venue: typeof BODA.recepcion, icon?: import('react').ReactNode, darkButton?: boolean, floral?: 'left' | 'right' }} props
 */
function VenueSection({ venue, icon, darkButton = false, floral = 'left' }) {
  return (
    <section className="boda-cream relative overflow-hidden px-8 py-16 text-center">
      <FloralMotif
        className={`pointer-events-none absolute w-40 opacity-90 ${
          floral === 'right' ? '-right-10 top-0' : '-left-10 top-0'
        }`}
      />
      <FadeInOnScroll>
        {icon ? <div className="mb-3 flex justify-center text-[#2c2c2c]">{icon}</div> : null}
        <h2 className="boda-serif text-[36px] text-[#6b5744]">{venue.titulo}</h2>
        <p className="mt-1 text-sm text-[#3a3a3a]">{venue.hora}</p>
        <p className="mt-5 text-[15px] font-medium text-[#2c2c2c]">{venue.lugar}</p>
        <p className="mx-auto mt-2 max-w-xs text-[12px] leading-relaxed text-[#7a7368]">
          {venue.direccion}
        </p>
        <a
          href={venue.mapsUrl}
          target="_blank"
          rel="noreferrer"
          className={`mt-6 inline-flex rounded-lg px-8 py-2.5 text-sm ${
            darkButton ? 'boda-map-btn' : 'boda-map-btn-light'
          }`}
        >
          Ver Mapa
        </a>
      </FadeInOnScroll>
    </section>
  )
}

function TimelineSection() {
  return (
    <section className="boda-bluegray px-6 py-16">
      <div className="mx-auto flex max-w-xs flex-col items-center">
        {BODA.cronograma.map((item, index) => (
          <FadeInOnScroll key={item.id} delay={index * 0.05} className="flex w-full flex-col items-center">
            <div className="flex flex-col items-center">
              <TimelineIcon type={item.icon} />
              <p className="boda-serif mt-3 text-[26px] text-[#2c2c2c]">{item.hora}</p>
              <p className="mt-1 text-[12px] tracking-[0.28em] text-[#4a4a4a]">{item.label}</p>
            </div>
            {index < BODA.cronograma.length - 1 ? (
              <div className="my-5 h-8 w-px bg-[#b7bdc6]" aria-hidden />
            ) : null}
          </FadeInOnScroll>
        ))}
      </div>
    </section>
  )
}

function GiftsSection() {
  return (
    <section className="boda-cream-warm relative overflow-hidden px-6 py-16">
      <FloralMotif className="pointer-events-none absolute -left-6 bottom-0 w-40" variant="spray" />
      <FadeInOnScroll>
        <div className="relative mx-auto max-w-sm bg-white px-6 py-10 text-center shadow-[0_12px_30px_rgba(0,0,0,0.08)]">
          <Gift className="mx-auto h-10 w-10 text-[#2c2c2c]" strokeWidth={1.3} />
          <h2 className="boda-serif mt-4 text-[30px] text-[#2c2c2c]">Mesa de Regalos</h2>
          <p className="mt-4 whitespace-pre-line text-[13px] leading-relaxed text-[#6b645c]">
            {BODA.regalos.texto}
          </p>
        </div>
      </FadeInOnScroll>
    </section>
  )
}

function DressCodeSection() {
  return (
    <section className="boda-cream px-0 py-4">
      <FadeInOnScroll>
        <div className="boda-bluegray mx-6 px-6 py-10 text-center">
          <div className="mb-3 flex items-center justify-center gap-3 text-[#2c2c2c]">
            <ShirtIcon />
            <DressIcon />
          </div>
          <h2 className="boda-serif text-[30px] text-[#2c2c2c]">Dress Code</h2>
          <p className="mt-2 text-[17px] text-[#2c2c2c]">{BODA.dressCode.estilo}</p>
          <p className="mt-2 text-[12px] text-[#6b645c]">{BODA.dressCode.detalle}</p>
        </div>
      </FadeInOnScroll>
    </section>
  )
}

/**
 * @param {{ grupoInvitados: string, cupos: number }} props
 */
function NoKidsAndRsvp({ grupoInvitados, cupos }) {
  return (
    <section className="boda-cream relative overflow-hidden px-6 pb-24 pt-10 text-center">
      <FloralMotif className="pointer-events-none absolute -right-8 top-0 w-36" />
      <FadeInOnScroll>
        <FloralMotif className="mx-auto w-48" variant="divider" />
        <h2 className="boda-serif mt-4 text-[32px] text-[#b7b0a6]">No niños</h2>
        <p className="mx-auto mt-4 max-w-sm text-[13px] leading-relaxed text-[#6b645c]">
          {BODA.noNinos}
        </p>
      </FadeInOnScroll>

      <FadeInOnScroll delay={0.1} className="mt-10">
        <div className="relative mx-auto max-w-sm rounded-md bg-white px-5 py-8 shadow-[0_12px_30px_rgba(0,0,0,0.08)]">
          <FloralMotif className="mx-auto mb-3 w-28" variant="divider" />
          <p className="text-[13px] text-[#3a3a3a]">
            Pase reservado para: {grupoInvitados} ({cupos} {cupos === 1 ? 'persona' : 'personas'})
          </p>
          <h3 className="boda-serif mt-4 text-[26px] text-[#2c2c2c]">Confirma tu Asistencia</h3>
          <div className="mt-5">
            <RsvpForm grupoInvitados={grupoInvitados} cupos={cupos} />
          </div>
        </div>
      </FadeInOnScroll>
    </section>
  )
}

/**
 * @param {{ className?: string }} props
 */
function ChurchIcon({ className = 'h-10 w-10 text-[#2c2c2c]' }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" aria-hidden>
      <path d="M24 4v8M20 8h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M10 44V22l14-10 14 10v22" stroke="currentColor" strokeWidth="1.4" />
      <path d="M20 44v-10h8v10" stroke="currentColor" strokeWidth="1.4" />
      <path d="M10 22h28" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  )
}

/**
 * @param {{ type: string }} props
 */
function TimelineIcon({ type }) {
  const className = 'h-8 w-8 text-[#2c2c2c]'
  if (type === 'church') return <ChurchIcon className={className} />
  if (type === 'people') return <Users className={className} strokeWidth={1.3} />
  if (type === 'glasses') return <Wine className={className} strokeWidth={1.3} />
  if (type === 'music') return <Music2 className={className} strokeWidth={1.3} />
  return <RingsIcon />
}

function RingsIcon() {
  return (
    <svg viewBox="0 0 48 32" className="h-8 w-10 text-[#2c2c2c]" fill="none" aria-hidden>
      <circle cx="18" cy="16" r="10" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="30" cy="16" r="10" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  )
}

function ShirtIcon() {
  return (
    <svg viewBox="0 0 40 40" className="h-8 w-8" fill="none" aria-hidden>
      <path d="M13 8l7 4 7-4 5 4v6l-5-2v16H13V16l-5 2V12l5-4z" stroke="#2c2c2c" strokeWidth="1.3" />
    </svg>
  )
}

function DressIcon() {
  return (
    <svg viewBox="0 0 40 40" className="h-8 w-8" fill="none" aria-hidden>
      <path d="M16 6h8l2 8 6 16H8l6-16 2-8z" stroke="#2c2c2c" strokeWidth="1.3" />
      <path d="M16 6c0 3 8 3 8 0" stroke="#2c2c2c" strokeWidth="1.3" />
    </svg>
  )
}
