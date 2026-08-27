const FEATURES = [
  {
    title: 'Plantillas',
    text: 'Boda, quinceañera, baby shower y más. Cada evento con su propia identidad visual.',
  },
  {
    title: 'Enlaces seguros',
    text: 'Cupos por invitado validados en la nube, sin manipular la URL.',
  },
  {
    title: 'Panel cliente',
    text: 'Respuestas en tiempo real, exportación a Excel y control de invitaciones.',
  },
]

export function MarketingFeatures() {
  return (
    <section className="relative z-10 mx-auto max-w-5xl px-6 pb-20 pt-10">
      <div className="grid gap-5 md:grid-cols-3">
        {FEATURES.map((item) => (
          <article key={item.title} className="marketing-card rounded-2xl p-6">
            <div className="mb-4 h-1 w-10 rounded-full bg-[#d4926f]/60" />
            <h2 className="marketing-serif text-2xl text-[#6b3f2a]">{item.title}</h2>
            <p className="marketing-muted mt-3 text-sm leading-relaxed">{item.text}</p>
          </article>
        ))}
      </div>

      <p className="marketing-muted mx-auto mt-14 max-w-lg text-center text-sm italic">
        “Tu evento merece una invitación tan bonita como el recuerdo que quieres dejar.”
      </p>
    </section>
  )
}
