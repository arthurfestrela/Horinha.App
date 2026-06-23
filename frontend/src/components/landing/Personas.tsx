const personas = [
  {
    tag: 'dono do negócio',
    title: 'Quer parar de perder horário e cliente.',
    text: 'Controle financeiro simples, agenda organizada e menos faltas — sem precisar de planilha.',
  },
  {
    tag: 'cliente final',
    title: 'Quer marcar rápido, sem fricção.',
    text: 'Escolhe o serviço, o horário e confirma — sem precisar criar conta nem esperar resposta.',
  },
]

export function Personas() {
  return (
    <section className="bg-parchment py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-xl">
          <span className="font-hand text-2xl text-leather">feito pra quem cuida de gente</span>
          <h2 className="mt-1 text-3xl font-semibold sm:text-4xl">Dois lados, uma agenda só.</h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {personas.map((persona) => (
            <div
              key={persona.tag}
              className="relative rounded-2xl border-2 border-espresso/10 bg-cream p-8"
            >
              <span className="stamp px-3 py-1 text-sm text-leather-dark">{persona.tag}</span>
              <h3 className="mt-5 font-display text-2xl font-semibold text-espresso">
                {persona.title}
              </h3>
              <p className="mt-3 text-espresso/70">{persona.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
