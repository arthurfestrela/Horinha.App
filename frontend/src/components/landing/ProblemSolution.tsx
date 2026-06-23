const problems = [
  {
    title: 'WhatsApp lotado de áudio',
    text: '"Tem horário pra sábado?" se perde entre cinquenta outras conversas do dia.',
  },
  {
    title: 'Caderno rasurado',
    text: 'Horário marcado a lápis, riscado, remarcado — e ninguém mais entende a letra.',
  },
  {
    title: 'Cliente que esquece',
    text: 'Falta sem avisar é horário perdido que não volta e cliente que some.',
  },
]

export function ProblemSolution() {
  return (
    <section className="bg-parchment py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-xl">
          <span className="font-hand text-2xl text-leather">o problema de sempre</span>
          <h2 className="mt-1 text-3xl font-semibold sm:text-4xl">Você conhece bem essa cena.</h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {problems.map((problem) => (
            <div key={problem.title} className="relative rounded-xl bg-cream p-6">
              <span className="absolute right-5 top-5 font-display text-3xl text-leather/15">
                ✕
              </span>
              <h3 className="font-display text-xl font-semibold text-espresso">{problem.title}</h3>
              <p className="mt-2 text-espresso/70">{problem.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
